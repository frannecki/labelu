from uuid import uuid4
from . import model, factory
from typing import Tuple, Union, Dict

def update_image_label(uid: str, label: int) -> Tuple[str, bool]:
    session = factory()
    try:
        session.query(model.Instance).filter_by(
            uid=uid).update(dict(label=label))
        session.commit()
    except Exception as e:
        session.rollback()
        return str(e), False
    return "Image label updated", True

def get_image_label(uid: str) -> Union[dict, None]:
    session = factory()
    try:
        instance = session.query(
            model.Instance).filter_by(
            uid=uid).first()
        return {"label": instance.label, "image": instance.image.file}
    except Exception as e:
        return None

def get_batch_info() -> Union(dict, None):
    session = factory()
    try:
        instances = session.query(model.Instance).all()
        return [{
            "uid": instance.uid, 
            "file": instance.file, 
            "image": instance.image.file, 
            "label": instance.label
        } for instance in instances]
    else:
        return None
