from uuid import uuid4

def generate_uuid_string():
    return str(uuid4()).replace("-", "")

def update_image_label(uid: str, label: int):
    return True