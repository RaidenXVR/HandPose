import os
import sys
import cv2
import mediapipe as mp
import threading
import time
from Functions import check_hand_landmarks
import json
from classes import Pose
import httpx
import asyncio

# Function to check hand landmarks and update every half seconds


async def update_landmarks():
    global result
    res = {}
    async with httpx.AsyncClient() as client:
        while True:
            if result is not None:
                _res = check_hand_landmarks(result[0])
                # print(res)
                processed_data = [pose.output
                                  for pose in poses if pose.check_pose_equal(_res)]
                # print(processed_data)
                if processed_data:
                    res = {"output": processed_data[0]}
                else:
                    res = {}

            else:
                res = {}
            # start_time = time.time()
            try:
                response = await client.post("http://localhost:8000/data", json=res)
                # print(response.text)
            except httpx.RequestError as e:
                print(f"An error occurred: {e}")
            print(response.text)
            # print("Request duration:", time.time() - start_time)
            time.sleep(0.5)  # Update every half second


def _start_detection():
    global result, cap
    with mp_hands.Hands(min_detection_confidence=0.8, min_tracking_confidence=0.5) as hands:
        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break

            # Flip and process the image for hand detection
            image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            image = cv2.flip(image, 1)
            image.flags.writeable = False
            results = hands.process(image)
            image.flags.writeable = True
            image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

            # Draw hand landmarks on the image
            if results.multi_hand_landmarks:
                result = results.multi_hand_landmarks  # Store the latest landmarks
                for num, hand in enumerate(results.multi_hand_landmarks):
                    mp_drawing.draw_landmarks(
                        image, hand, mp_hands.HAND_CONNECTIONS,
                        mp_drawing.DrawingSpec(
                            color=(121, 22, 76), thickness=2, circle_radius=4),
                        mp_drawing.DrawingSpec(
                            color=(121, 44, 250), thickness=2, circle_radius=2)
                    )
            else:
                result = None
            cv2.imshow("Hand Tracking", image)

            # Exit the loop when 'q' is pressed
            if cv2.waitKey(10) & 0xFF == ord('q'):
                break

    cap.release()
    cv2.destroyAllWindows()


# def start_daemon():

def _update_landmarks():
    asyncio.run(update_landmarks())


if __name__ == "__main__":
    poses_path = os.path.join(os.getcwd(), "poses.json")
    # def start_daemon():
    with open(poses_path, "r", encoding='utf-8') as p:
        poses_json = json.load(p)

    poses: list[Pose] = [Pose(pose_item["output"], pose_item["thumb"], pose_item["index"],
                              pose_item["middle"], pose_item["ring"], pose_item["pinky"]) for pose_item in [poses_json[pose]
                                                                                                            for pose in poses_json]]
    mp_drawing = mp.solutions.drawing_utils
    mp_hands = mp.solutions.hands

    cap = cv2.VideoCapture(0)
    result = None

    left_or_right = None

    detection_thread = threading.Thread(target=_start_detection)
    landmark_thread = threading.Thread(target=_update_landmarks)

    detection_thread.daemon = True
    landmark_thread.daemon = True  # Daemon thread will exit when the main thread exits

    detection_thread.start()
    landmark_thread.start()

    detection_thread.join()
