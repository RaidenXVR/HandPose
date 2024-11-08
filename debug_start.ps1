# Activate VENV

. "venv/Scripts/Activate.ps1"


Write-Host "Turning on Servers..."
# Turning on FastAPI Server
$server_job = Start-Process uvicorn -PassThru -ArgumentList "server:app --reload"  
$server_pid = $server_job.Id

# Turning on React Server
$react_job = Start-Process -FilePath "npm.cmd" -PassThru -ArgumentList "--prefix hand_pose_react start" 
$react_pid = $react_job.Id

Write-Host "Servers PID: $react_pid"
Write-Host "FastAPI Server: $server_pid"
# Write-Host "NPM React Server: $react_pid"

Write-Host "Turning on Detection Module..."
Start-Process python -Wait -ArgumentList "detection.py"

Write-Host "Turning off servers..."
Stop-Process $server_pid
Stop-Process $react_pid

deactivate