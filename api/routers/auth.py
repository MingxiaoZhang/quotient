from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from api.utils.jwt_utils import create_access_token, verify_token
from api.models.user import User
import logging

from api.models.profile import Profile

logger = logging.getLogger(__name__)

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

@router.post("/login/")
async def login(email: str, password: str):
    # Fetch user from database
    user = await User.find_one({"email": email})
    if not user or not user.verify_password(password):
        raise HTTPException(status_code=401, detail="Invalid username or password")
    
    # Create access token
    access_token = create_access_token(data={"sub": email, "user_id": str(user.id)})
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/me/")
async def get_current_user(token: str = Depends(oauth2_scheme)):
    payload = verify_token(token)
    email: str = payload.get("sub")
    if not email:
        raise HTTPException(status_code=401, detail="Invalid token payload")
    
    # Fetch the user from the database
    user = await User.find_one({"email": email})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.post("/register/")
async def register_user(email: str, password: str):
    logger.info(f"Registering user: {email}")
    # Check if user exists
    existing_user = await User.find_one({"email": email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already exists")
    
    hashed_password = User.hash_password(password)
    user = User(email=email, hashed_password=hashed_password)
    await user.create()
    profile = Profile(user_id=str(user.id))
    await profile.create()
    return {"message": "User registered successfully"}