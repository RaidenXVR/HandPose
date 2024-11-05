import requests
import cv2
import mediapipe as mp
import threading
import time
from Functions import check_hand_landmarks


# Function to check hand landmarks and update every 2 seconds
def update_landmarks():
    global result
    res = {}
    while True:
        if result is not None:
            res = check_hand_landmarks(result[0])
            # print(res)

        else:
            res = {}
        response = requests.post("http://localhost:8000/data", json=res)
        print(response.text)
        time.sleep(0.8)  # Update every second


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


if __name__ == "__main__":
    # def start_daemon():
    mp_drawing = mp.solutions.drawing_utils
    mp_hands = mp.solutions.hands

    cap = cv2.VideoCapture(0)
    result = None

    left_or_right = None

    detection_thread = threading.Thread(target=_start_detection)
    landmark_thread = threading.Thread(target=update_landmarks)

    detection_thread.daemon = True
    landmark_thread.daemon = True  # Daemon thread will exit when the main thread exits

    detection_thread.start()
    landmark_thread.start()

    detection_thread.join()
