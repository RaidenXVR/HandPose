import os
import sys
import time
import threading
import subprocess


def start_fastapi():
    """Start FastAPI server using Uvicorn."""
    try:
        print("Starting FastAPI server...")
        subprocess.Popen([
            sys.executable, "-m", "uvicorn", "server:app",
            "--host", "127.0.0.1", "--port", "8000"
        ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        print("FastAPI server started.")
    except Exception as e:
        print(f"Error starting FastAPI server: {e}")


def start_detection():
    """Start the detection module."""
    try:
        print("Starting detection module...")
        detection_path = os.path.join(os.getcwd(), "detection.py")
        subprocess.run([sys.executable, detection_path])
        print("Detection module completed.")
    except Exception as e:
        print(f"Error in detection module: {e}")


def main():
    if getattr(sys, 'frozen', False):
        # Fix for frozen executables
        os.environ["PYTHONOPTIMIZE"] = "1"

    # Start FastAPI server in a separate thread (to avoid recursion issues)
    server_thread = threading.Thread(target=start_fastapi, daemon=True)
    server_thread.start()

    # Start detection module in the main thread
    start_detection()

    print("All tasks completed. Press Ctrl+C to exit.")
    while True:
        time.sleep(1)  # Keep main thread alive


if __name__ == "__main__":
    main()
