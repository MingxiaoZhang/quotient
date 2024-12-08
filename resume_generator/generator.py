import os
from dotenv import load_dotenv
import cohere
from datetime import datetime

load_dotenv()
api_key = os.getenv("COHERE_API_KEY")
co = cohere.Client(api_key=api_key)

def build_experience_document(experience):
    return {
        "title": f"Work Experience: {experience.job_title} at {experience.company}",
        "snippet": f"The candidate worked as a {experience.job_title} at {experience.company} "
                   f"from {experience.start_date.strftime('%Y-%m-%d')} to "
                   f"{experience.end_date.strftime('%Y-%m-%d') if experience.end_date else 'Present'}. "
                   f"Their achievements in their work are as follows: \n{experience.accomplishments}"
    }

def build_education_document(education):
    return {
        "title": f"Education: {education.degree} at {education.school}",
        "snippet": f"The candidate studied {education.degree} at {education.school} "
                   f"from {education.start_date.strftime('%Y-%m-%d')} to "
                   f"{education.end_date.strftime('%Y-%m-%d') if education.end_date else 'Present'}. "
                   f"Courses taken: {education.courses_taken}"
    }

def build_project_document(project):
    return {
        "title": f"Project: {project.project_name}",
        "snippet": f"The candidate worked on {project.project_name} "
                   f"{'at ' + project.project_org if project.project_org else ''} "
                   f"from {project.start_date.strftime('%Y-%m-%d')} to "
                   f"{project.end_date.strftime('%Y-%m-%d') if project.end_date else 'Present'}. "
                   f"Project link: {project.project_link}. "
                   f"Accomplishments: {project.accomplishments}"
    }

def generate_section(section_name, documents, job_data):
    prompt = f"Generate the {section_name} section of a resume for the job of {job_data['title']} at {job_data['company']} based on the following information:\n"
    res = co.chat(
        model="command-r-plus",
        message=prompt,
        documents=documents
    )
    return res.text

def get_resume(user_info, experiences, educations, projects, job_data):
    experience_documents = [build_experience_document(exp) for exp in experiences]
    education_documents = [build_education_document(edu) for edu in educations]
    project_documents = [build_project_document(proj) for proj in projects]
    
    job_document = {
        "title": f"Job Description: {job_data['title']} at {job_data['company']}",
        "snippet": f"The job the candidate is applying to has the following description: \n{job_data['description']}"
    }
    
    all_documents = experience_documents + education_documents + project_documents + [job_document]
    
    summary = generate_section("Professional Summary", all_documents, job_data)
    experience_section = generate_section("Work Experience", experience_documents + [job_document], job_data)
    education_section = generate_section("Education", education_documents + [job_document], job_data)
    projects_section = generate_section("Projects", project_documents + [job_document], job_data)
    skills_section = generate_section("Skills", all_documents, job_data)
    
    full_resume = f"""
        Professional Summary:
        {summary}

        Work Experience:
        {experience_section}

        Education:
        {education_section}

        Projects:
        {projects_section}

        Skills:
        {skills_section}
    """

    return full_resume