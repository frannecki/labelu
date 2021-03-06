from flask import Blueprint, jsonify, request
from ..util import update_group_label, get_group_label, get_group_info

bp = Blueprint("data", __name__)


@bp.route("/test")
def hello():
    return jsonify({"code": 200, "message": "hello", "success": True})


@bp.route("/group/label/<uid>", methods=['PUT', 'GET'])
def instance_label(uid):
    if uid == "":
        return jsonify({
            "code": 400, "success": False,
            "message": "Expecting group uid"
        }), 400
    if request.method == 'PUT':
        if not request.is_json:
            return jsonify({
                "code": 400, "success": False,
                "message": "Expecting json body"
            }), 400
        label = request.json.get("label")

        if label is None:
            return jsonify({
                "code": 400, "success": False,
                "message": "Expecting group label in json body"
            }), 400
        msg, ok = update_group_label(uid, int(label))
        return jsonify({
            "code": 200 if ok else 500, "success": ok, "message": msg
        })
    else:
        data = get_group_label(uid)
        return jsonify({
            "code": 404 if data is None else 200,
            "success": False if data is None else True,
            "message": "Instance not found" if data is None else "Success",
            "data": data
        })


@bp.route("/group/info", methods=['GET'])
def instance_info():
    info = get_group_info()
    return jsonify({
        "code": 404 if info is None else 200,
        "success": False if info is None else True,
        "message": "",
        "data": info
    })
