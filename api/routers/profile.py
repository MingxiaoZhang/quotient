from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from api.utils.jwt_utils import create_access_token, verify_token
from api.models.user import User
from api.routers.auth import get_current_user
import logging
from api.models.profile import Education, Experience, Profile
from bson import ObjectId

logger = logging.getLogger(__name__)

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

@router.get("/education/all/")
async def get_education_list(token: str = Depends(oauth2_scheme)):
    payload = verify_token(token)
    user_id: str = payload.get("user_id")
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid token payload")
    profile = await Profile.find_one({"user_id": user_id})
    if not profile:
        raise HTTPException(status_code=401, detail=f"Unable to find user_id {user_id}")

    return profile.education

@router.get("/experience/all/")
async def get_experience_list(token: str = Depends(oauth2_scheme)):
    payload = verify_token(token)
    user_id: str = payload.get("user_id")
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid token payload")
    profile = await Profile.find_one({"user_id": user_id})
    if not profile:
        raise HTTPException(status_code=401, detail=f"Unable to find user_id {user_id}")

    return profile.experience

@router.get("/project/all/")
async def get_project_list(token: str = Depends(oauth2_scheme)):
    payload = verify_token(token)
    user_id: str = payload.get("user_id")
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid token payload")
    profile = await Profile.find_one({"user_id": user_id})
    if not profile:
        raise HTTPException(status_code=401, detail=f"Unable to find user_id {user_id}")

    return profile.project

@router.post("/education/")
async def add_education(education_data: Education, token: str = Depends(oauth2_scheme)):
    payload = verify_token(token)
    user_id: str = payload.get("user_id")
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid token payload")
    profile = await Profile.find_one({"user_id": user_id})
    if not profile:
        raise HTTPException(status_code=401, detail=f"Unable to find user_id {user_id}")
    profile.education.append(education_data)
    await profile.save()
    return {"message": "Education added"}

@router.post("/experience/")
async def add_experience(experience_data: Experience, token: str = Depends(oauth2_scheme)):
    payload = verify_token(token)
    user_id: str = payload.get("user_id")
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid token payload")
    profile = await Profile.find_one({"user_id": user_id})
    if not profile:
        raise HTTPException(status_code=401, detail=f"Unable to find user_id {user_id}")
    profile.experience.append(experience_data)
    await profile.save()
    return {"message": "Experience added"}