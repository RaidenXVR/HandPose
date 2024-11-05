from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import json
from classes import Pose
import logging

with open('poses.json', "r", encoding='utf-8') as p:
    poses_json = json.load(p)

poses: list[Pose] = []
for pose in poses_json:
    _pose = poses_json[pose]
    poses.append(Pose(pose, _pose["output"], _pose["thumb"], _pose["index"],
                      _pose["middle"], _pose["ring"], _pose["pinky"]))
app = FastAPI()

processed_datas = {}

origins = [
    "http://localhost:3000",  # React app URL
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
    if data:
        # print(f"Data: {data}")
        processed_data = [pose.output
                          for pose in poses if pose.check_pose_equal(data)]
        if processed_data:
            processed_datas = {"output": processed_data[0]}
        else:
            processed_datas = {}

        print(f"Processed Data: {poses[0].check_pose_equal(data), data}")
    else:
        processed_datas = {}
        # print(f"Processed Data: {processed_datas}")

    return JSONResponse(processed_datas)


@app.get("/data")
async def send_data():
    global processed_datas
    print(f"data: {processed_datas}")
    return JSONResponse(processed_datas)
