# Activate VENV

. "venv/Scripts/Activate.ps1"


Write-Host "Turning on Servers..."
# Turning on FastAPI Server
$server_job = Start-Job -ScriptBlock { uvicorn server:app --reload } 
$server_pid = $server_job.Id

# Turning on React Server
$react_job = Start-Job -ScriptBlock { npm --prefix hand_pose_react start }
$react_pid = $react_job.Id

Write-Host "Servers PID:"
Write-Host "FastAPI Server: $server_pid"
Write-Host "NPM React Server: $react_pid"

Write-Host "Turning on Detection Module..."
Start-Process python -Wait -ArgumentList "detection.py"

Write-Host "Turning off servers..."
stop-job $server_pid
stop-job $react_pid

deactivate