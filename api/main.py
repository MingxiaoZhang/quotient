from fastapi import FastAPI
from api.config import settings
from api.db.mongodb import client, db
from api.routers import auth
from beanie import init_beanie
from api.models.user import User
from api.models.profile import Profile

import logging

from api.routers import profile

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="FastAPI with MongoDB",
    description="A FastAPI application connected to MongoDB",
    version="1.0.0"
)

# MongoDB connection check
@app.on_event("startup")
async def startup_db_client():
    try:
        # Test connection
        await client.server_info()
        await init_beanie(db, document_models=[User, Profile])
        logger.info("Connected to MongoDB!")
    except Exception as e:
        logger.error("Could not connect to MongoDB:", str(e))
        raise

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
    logger.info("Disconnected from MongoDB!")

# Include routers
app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
app.include_router(profile.router, prefix="/profile", tags=["Profile"])
# Root endpoint
@app.get("/")
async def root():
    logger.info(f"Hello World")
    return {"message": "Welcome to the FastAPI-MongoDB application!"}
