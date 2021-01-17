import os.path as osp
from datetime import datetime
from uuid import uuid4
from typing import Tuple, Union, Dict

import labelu.db as model

DBURI = f"sqlite:///{osp.dirname(__file__)}/../instance/db/instances.sqlite"
factory = model.db_factory(DBURI)

def update_image_label(uid: str, filename: str, label: int) -> Tuple[str, bool]:
    session = factory()
    msg, ok = "", False
    try:
        instance = session.query(model.Instance).filter_by(
            file=filename).join(model.Instance.image).filter_by(
            uid=uid).first()
        instance.label = label
        instance.modified_at = datetime.now()
        session.commit()
        msg = "Image label updated"
        ok = True
    except Exception as e:
        session.rollback()
        msg = str(e)
    session.close()
    return msg, ok

def get_image_label(uid: str, filename: str) -> Union[dict, None]:
    session = factory()
    result = None
    try:
        instance = session.query(
            model.Instance).filter_by(
            file=filename).join(model.Instance.image).filter_by(
            uid=uid).first()
        result = {"label": instance.label, "image": instance.image.file}
    except Exception as e:
        pass
    session.close()
    return result

def get_batch_info() -> Union[list, None]:
    session = factory()
    result = None
    try:
        instances = session.query(model.Instance).all()
        result = [{
            "uid": instance.image.uid, 
            "file": instance.file, 
            "image": instance.image.file, 
            "label": instance.label
        } for instance in instances]
    except:
        pass
    session.close()
    return result
