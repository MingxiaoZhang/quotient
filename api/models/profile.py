from typing import Optional, List
from pydantic import BaseModel
from beanie import Document
from datetime import datetime

class Experience(BaseModel):
    job_title: Optional[str]
    company: Optional[str]
    skills: Optional[List[str]]
    start_date: Optional[datetime]
    end_date: Optional[datetime]
    description: Optional[str]

class Education(BaseModel):
    school: Optional[str] = None
    degree: Optional[str] = None
    field_of_study: Optional[str] = None
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    courses: Optional[List[str]] = None

class Project(BaseModel):
    title: Optional[str]
    description: Optional[str]
    start_date: Optional[datetime]
    end_date: Optional[datetime]

#TODO: Add metaclass for storing metadata of professional info
 
class Profile(Document):
    user_id: str
    experience: List[Experience] = []
    education: List[Education] = []
    project: List[Project] = []

    class Settings:
        name = "profiles"
