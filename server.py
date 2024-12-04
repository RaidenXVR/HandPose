from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import json
from classes import Pose
import logging
from fastapi.staticfiles import StaticFiles

# with open('poses.json', "r", encoding='utf-8') as p:
#     poses_json = json.load(p)

# poses: list[Pose] = [Pose(pose_item["output"], pose_item["thumb"], pose_item["index"],
#                           pose_item["middle"], pose_item["ring"], pose_item["pinky"]) for pose_item in [poses_json[pose]
#                                                                                                         for pose in poses_json]]

app = FastAPI()

processed_datas = {}

origins = [
    "http://localhost:3000",  # React app URL
    "http://localhost:3001",
    "http://localhost:3002"
    # You can add more origins if needed
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)


@app.post("/data")
async def receive_data(data: dict):
    # Process the received data

    global processed_datas
    # print(f"Poses: {poses}")
    processed_datas = data

    return JSONResponse(processed_datas)


@app.get("/data")
async def send_data():
    global processed_datas
    print(f"data: {processed_datas}")
    return JSONResponse(processed_datas)
