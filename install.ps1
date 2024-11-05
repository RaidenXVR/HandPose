python -m venv venv

. "./venv/Scripts/Activate.ps1"

pip install -r requirements.txt

Set-Location ./hand_pose_react

npm install

Set-Location ..

deactivate