import os.path as osp
from datetime import datetime
from typing import Tuple, Union

import labelu.db as model

DBURI = f"sqlite:///{osp.dirname(__file__)}/../instance/db/instances.sqlite"
factory = model.db_factory(DBURI)


def update_group_label(uid: str,
                       label: int) -> Tuple[str, bool]:
    session = factory()
    msg, ok = "", False
    try:
        group = session.query(
            model.Group).filter_by(uid=uid).first()
        group.label = label
        group.modified_at = datetime.now()
        session.commit()
        msg = "Image label updated"
        ok = True
    except Exception as e:
        session.rollback()
        msg = str(e)
    session.close()
    return msg, ok


def get_group_label(uid: str) -> Union[dict, None]:
    session = factory()
    result = None
    try:
        instance = session.query(
            model.Group).filter_by(uid=uid).first()
        result = {"label": instance.label}
    except Exception:
        pass
    session.close()
    return result


def get_batch_info() -> Union[list, None]:
    session = factory()
    result = None
    try:
        groups = session.query(model.Group).all()
        result = [{
            "uid": group.uid,
            "label": group.label,
            "instances": [{
                "uid": instance.uid,
                "file": instance.file
            } for instance in group.instances]
        } for group in groups]
    except Exception:
        pass
    session.close()
    return result
