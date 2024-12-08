from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    mongo_uri: str = "mongodb://localhost:27017"
    database_name: str = "quo-db"

    class Config:
        env_file = ".env"

settings = Settings()

print(settings.mongo_uri)
print(settings.database_name)