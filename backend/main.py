from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
from routes import auth_routes, typing_routes

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="One Month to Type Better API")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth_routes.router)
app.include_router(typing_routes.router)


@app.get("/")
def read_root():
    return {"message": "One Month to Type Better API"}