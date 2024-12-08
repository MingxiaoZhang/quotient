import redis
import json
import requests
from quotient.resume_generator import generator
import time

redis_conn = redis.Redis(host="localhost", port=6379, db=0)

def process_job(job):
    user_profile = job["user_profile"]
    webhook_url = job["webhook_url"]
    job_id = job["job_id"]

    # Generate the resume
    resume_md = generator.get_resume(user_profile)

    # Send notification to the webhook
    payload = {"job_id": job_id, "status": "completed", "resume": resume_md}
    try:
        response = requests.post(webhook_url, json=payload)
        response.raise_for_status()
        print(f"Notification sent successfully for job {job_id}")
    except requests.exceptions.RequestException as e:
        print(f"Failed to notify for job {job_id}: {e}")

def worker():
    print("Worker started...")
    while True:
        # Fetch job from queue
        job_data = redis_conn.lpop("resume_jobs")
        if job_data:
            job = json.loads(job_data)
            print(f"Processing job: {job['job_id']}")
            process_job(job)
        else:
            time.sleep(1)  # Sleep to avoid busy waiting

if __name__ == "__main__":
    worker()
