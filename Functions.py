import numpy as np
import math


def distance(a, b):
    """Calculates the Euclidean distance between two landmarks."""
    return np.linalg.norm(np.array([a.x, a.y]) - np.array([b.x, b.y]))


def calculate_angle(x, y):
    """
    Calculate the angle of fingertip (in degrees).
    """
    angle = np.degrees(math.atan2(y, x))
    if angle < 0:
        angle = 360+angle
    return angle


def is_finger_curled(finger_landmarks, finger_name, orientation):
    """
    Determines if a finger is curled by comparing distances between
    the fingertip and palm, and between knuckle and palm.
    """
    fingertip = finger_landmarks[3]  # Fingertip landmark
    fingermid1 = finger_landmarks[1]
    finger_base = finger_landmarks[0]  # Knuckle base
    # print("")
    # print(f"{finger_name}: {distance(fingertip, finger_base)}")

    # print(f"{finger_name}: {finger_base.y}, {fingertip.y}")
    if distance(fingertip, finger_base) < 0.2:

        match orientation:
            case 'up':
                return fingertip.y >= finger_base.y or fingertip.y >= fingermid1.y
            case 'down':
                return fingertip.y <= finger_base.y or fingertip.y <= fingermid1.y
            case 'right':
                return fingertip.x <= finger_base.x or fingertip.x <= fingermid1.x
            case 'left':
                return fingertip.x >= finger_base.x or fingertip.x >= fingermid1.x
    return False


def finger_orientation(finger_landmarks, palm):
    """
    Determines the orientation of the finger based on landmark coordinates.
    Returns one of four possible orientations: 'up', 'down', 'left', 'right'.
    """
    fingertip = finger_landmarks[3]

    fingerbase = finger_landmarks[0]
    vector = [fingertip.x - fingerbase.x, fingertip.y-fingerbase.y]

    if distance(fingertip, fingerbase) < 0.15:
        finger_mid1 = finger_landmarks[1]
        vector = [(finger_mid1.x - fingerbase.x)*2,
                  (finger_mid1.y-fingerbase.y)*2]

    angle = calculate_angle(vector[0], vector[1])

    # print(angle)
    orientation = "right"
    if angle < 135 and angle >= 45:
        orientation = 'down'

    elif angle < 225 and angle >= 135:
        orientation = "left"
    elif angle < 315 and angle >= 225:
        orientation = "up"
    else:
        orientation = "right"

    return orientation


def thumb_orientation_helper(thumb_vector: list):
    angle = calculate_angle(thumb_vector[0], thumb_vector[1])

    # print(angle)
    orientation = "right"
    if angle < 125 and angle >= 55:
        orientation = 'down'

    elif angle < 225 and angle >= 125:
        orientation = "left"
    elif angle < 315 and angle >= 225:
        orientation = "up"
    else:
        orientation = "right"

    return orientation


def check_hand_landmarks(landmarks):
    """
    Main function to determine finger curl and orientation for all fingers.
    Takes the hand landmarks and processes each finger.
    """

    # Palm landmark (wrist, usually landmark[0])
    palm_landmark = landmarks.landmark[0]

    # Finger landmarks: thumb, index, middle, ring, pinky
    finger_indices = {

        'index': [5, 6, 7, 8],
        'middle': [9, 10, 11, 12],
        'ring': [13, 14, 15, 16],
        'pinky': [17, 18, 19, 20]
    }

    results = {}

    thumb = 'thumb'
    thumb_indices = [1, 2, 3, 4]

    is_thumb_curled = (distance(
        landmarks.landmark[4], landmarks.landmark[2]) < 0.1 or distance(
        landmarks.landmark[4], landmarks.landmark[5]) < 0.06 or distance(
        landmarks.landmark[4], landmarks.landmark[9]) < 0.09 or distance(
        landmarks.landmark[4], landmarks.landmark[13]) < 0.09 or distance(
        landmarks.landmark[4], landmarks.landmark[17]) < 0.09)
    # print("")
    # print(
    #     f"thumb thumb: {distance(landmarks.landmark[4], landmarks.landmark[2])}")
    # print(
    #     f"thumb index: {distance(landmarks.landmark[4], landmarks.landmark[5])}")
    # print(
    #     f"thumb middle: {distance(landmarks.landmark[4], landmarks.landmark[9])}")
    # print(
    #     f"thumb ring: {distance(landmarks.landmark[4], landmarks.landmark[13])}")
    # print(
    #     f"thumb pinky: {distance(landmarks.landmark[4], landmarks.landmark[17])}")

    thumb_vector_x = landmarks.landmark[4].x - landmarks.landmark[2].x
    thumb_vector_y = landmarks.landmark[4].y - landmarks.landmark[2].y

    thumb_orientation = thumb_orientation_helper(
        [thumb_vector_x, thumb_vector_y])

    results[thumb] = {'curled': bool(is_thumb_curled),
                      "direction": thumb_orientation}

    for finger, indices in finger_indices.items():
        finger_landmarks = [landmarks.landmark[i] for i in indices]

        # Determine finger orientation
        orientation = finger_orientation(finger_landmarks, palm_landmark)

        # Check if the finger is curled
        curled = is_finger_curled(finger_landmarks, finger, orientation)

        results[finger] = {
            'curled': bool(curled),
            'direction': orientation
        }

    return results
