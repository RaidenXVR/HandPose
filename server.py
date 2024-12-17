import os
import sys
from fastapi import FastAPI
from fastapi.responses import FileResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import json
from classes import Pose
import logging
from fastapi.staticfiles import StaticFiles

app = FastAPI()

processed_datas = {}


app.mount(
    "/static", StaticFiles(directory=os.path.join("build_react", "static")), name="static")
app.mount("/hand_images", StaticFiles(directory=os.path.join("build_react", "hand_images")),
          name="hand_images")
app.mount("/categories", StaticFiles(directory=os.path.join("build_react", "categories")),
          name="categories")
app.mount("/food_images", StaticFiles(directory=os.path.join("build_react", "food_images")),
          name="food_images")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can restrict this if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def serve_react_app():
    file_path = os.path.join("build_react", "index.html")
    return FileResponse(file_path)


@ app.post("/data")
async def receive_data(data: dict):
    # Process the received data

    global processed_datas
    # print(f"Poses: {poses}")
    processed_datas = data

    return JSONResponse(processed_datas)


@ app.get("/data")
async def send_data():
    global processed_datas
    print(f"data: {processed_datas}")
    return JSONResponse(processed_datas)
