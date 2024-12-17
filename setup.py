import sys
import os
from cx_Freeze import setup, Executable

# Paths for React build folder and detection script
react_static_folder = "build_react"
detection_script = "detection.py"

# Include additional files (React build folder and other dependencies)
include_files = [
    (react_static_folder, "build_react"),  # Copy React build
    detection_script,                # Include detection.py
    "poses.json",                    # Include any data files you need
    "server.py",
    "classes.py",
    "Functions.py"
]

# Dependencies for FastAPI server and detection script
packages = [
    "fastapi",
    "uvicorn",
    "httpx",
    "mediapipe",
    "cv2",
    "json",
    "threading",
    "time",
    "subprocess",
    "asyncio",
]

# Define the executable
executables = [
    Executable("main.py", base=None, target_name="HandPose.exe"),
]

# Build configuration
setup(
    name="HandPoseApp",
    version="1.0",
    description="FastAPI + React + Detection Module App",
    options={
        "build_exe": {
            "packages": packages,
            "include_files": include_files,
            # Ensure subprocess is included
            "includes": ["os", "sys", "subprocess"],
            "build_exe": "build_output",  # Output folder for the executable
        }
    },
    executables=executables
)
