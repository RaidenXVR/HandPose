from enum import Enum


class Finger:
    class FingerEnum(Enum):
        THUMB = 0
        INDEX = 1
        MIDDLE = 2
        RING = 3
        PINKY = 4

    class CurlEnum(Enum):
        FULL = 0
        CURLED = 1

    class DirectionEnum(Enum):
        UP = 0
        DOWN = 1
        LEFT = 2
        RIGHT = 3
        ANY = 4

    def __init__(self, finger_type: FingerEnum, curled: str, direction: str):
        self.finger_type = finger_type

        match (curled):
            case 'curled':
                self.curled = Finger.CurlEnum.CURLED
            case 'full':
                self.curled = Finger.CurlEnum.FULL

        match (direction):
            case 'up':
                self.direction = Finger.DirectionEnum.UP
            case 'down':
                self.direction = Finger.DirectionEnum.DOWN
            case 'left':
                self.direction = Finger.DirectionEnum.LEFT
            case 'right':
                self.direction = Finger.DirectionEnum.RIGHT
            case 'any':
                self.direction = Finger.DirectionEnum.ANY

    def check_equal(self, to_check: dict):

        _curled = to_check['curled']
        _direction = to_check['direction']
        curled: Finger.CurlEnum
        direction: Finger.DirectionEnum
        if _curled:
            curled = Finger.CurlEnum.CURLED
        else:
            curled = Finger.CurlEnum.FULL

        match (_direction):
            case 'up':
                direction = Finger.DirectionEnum.UP
            case 'down':
                direction = Finger.DirectionEnum.DOWN
            case 'left':
                direction = Finger.DirectionEnum.LEFT
            case 'right':
                direction = Finger.DirectionEnum.RIGHT

        return self.curled == curled and (self.direction == direction or self.direction == Finger.DirectionEnum.ANY)


class Pose:
    output: str
    thumb: Finger
    index: Finger
    middle: Finger
    ring: Finger
    pinky: Finger

    def __init__(self, output: str, thumb: dict, index: dict, middle: dict, ring: dict, pinky: dict):
        # self.pose_name = pose_name
        self.output = output

        thumb_finger = Finger(Finger.FingerEnum.THUMB, thumb.get(
            "curled"), thumb.get("direction"))
        self.thumb = thumb_finger

        index_finger = Finger(Finger.FingerEnum.INDEX, index.get(
            'curled'), index.get('direction'))
        self.index = index_finger

        middle_finger = Finger(Finger.FingerEnum.MIDDLE, middle.get(
            'curled'), middle.get('direction'))
        self.middle = middle_finger

        ring_finger = Finger(Finger.FingerEnum.RING, ring.get(
            'curled'), ring.get('direction'))
        self.ring = ring_finger

        pinky_finger = Finger(Finger.FingerEnum.PINKY, pinky.get(
            'curled'), pinky.get('direction'))
        self.pinky = pinky_finger

    def check_pose_equal(self, fingers_to_check: dict):
        return (self.thumb.check_equal(fingers_to_check['thumb']) and
                self.index.check_equal(fingers_to_check['index']) and
                self.middle.check_equal(fingers_to_check['middle']) and
                self.ring.check_equal(fingers_to_check['ring']) and
                self.pinky.check_equal(fingers_to_check["pinky"]))
