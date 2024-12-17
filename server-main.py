import subprocess
import sys
import multiprocessing
from server import app
import uvicorn

if __name__ == "__main__":
    multiprocessing.freeze_support()
    uvicorn.run(app, host="127.0.0.1", port=8000, reload=False, workers=1)
