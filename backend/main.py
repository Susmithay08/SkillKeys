from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
from routes import auth_routes, typing_routes

Base.metadata.create_all(bind=engine)

app = FastAPI(title="SkillKeys API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_routes.router)
app.include_router(typing_routes.router)

@app.get("/")
def read_root():
    return {"message": "SkillKeys API is running 🚀"}
