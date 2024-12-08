from motor.motor_asyncio import AsyncIOMotorClient
from api.config import settings

client = AsyncIOMotorClient(settings.mongo_uri)
db = client[settings.database_name]
