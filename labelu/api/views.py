from flask import Blueprint, jsonify, request
from ..util import update_image_label, get_image_label, get_batch_info

bp = Blueprint("data", __name__)

@bp.route("/test")
def hello():
    return jsonify({"code": 200, "message": "hello", "success": True})

@bp.route("/instance/label", methods=['PUT', 'GET'])
def instance_label():
    if not request.is_json:
        return jsonify({
            "code": 400, "success": False,
            "message": "Expecting json body"
        }), 400
    uid = request.json.get("uid")
    filename = request.json.get("file")
    label = request.json.get("label")
    
    for field, name in zip([uid, filename, label], ["uid", "file", "label"]):
        if field is not None or (name == "label" and request.method == 'GET'):
            continue
        return jsonify({
            "code": 400, "success": False,
            "message": f"Expecting image {name} in json body"
        }), 400

    if request.method == 'PUT':
        msg, ok = update_image_label(uid, filename, label)
        return jsonify({
            "code": 200 if ok else 500, "success": ok, "message": msg
        })
    else:
        data = get_image_label(uid, filename)
        return jsonify({
            "code": 404 if data is None else 200,
            "success": False if data is None else True,
            "message": "Instance not found" if data is None else "Success",
            "data": data
        })

@bp.route("/instance/info", methods=['GET', 'HEAD'])
def instance_info():
    info = get_batch_info()
    return jsonify({
        "code": 404 if info is None else 200,
        "success": False if info is None else True,
        "message": "",
        "data": info
    })
