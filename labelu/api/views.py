from flask import Blueprint, jsonify, request
from util import update_image_label

bp = Blueprint("data", __name__)

@bp.route("/test")
def hello():
    return jsonify({"code": 200, "message": "hello", "success": True})

@bp.route("/label", methods=['POST'])
def label_image():
    if not request.is_json:
        return jsonify({
            "code": 400, 
            "message": "Expecting json body", 
            "success": False
        }), 400
    uid = request.json.get("uid")
    label = request.json.get("label")
    
    for field, name in zip([uid, label], ["uid", "label"]):
        if field is not None:
            continue
        return jsonify({
            "code": 400, 
            "message": f"Expecting image {name} in json body", 
            "success": False}), 400

    ok = update_image_label(uid, label)
    # success?

    return jsonify({
        "code": 200, 
        "success": True, 
        "message": "Image label updated"
    })
