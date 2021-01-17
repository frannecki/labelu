import os
from . import api
import os.path as osp
from flask import Flask, jsonify


def create_app():
	r"""Creating a configured flask app
	Returns:
		app (flask.Flask): the global flask app
	"""
	app = Flask(__name__)

	app.config.from_mapping(
		SECRET_KEY="labelu"
	)

	if not osp.exists(osp.join(app.instance_path, 'db')):
		os.makedirs(osp.join(app.instance_path, 'db'))

	app.register_blueprint(api.bp, url_prefix="/api/v1")
	
	@app.errorhandler(404)
	def resource_not_found(e):
		return jsonify({"code": 404, "msg": "Not Found", "success": False}), 404

	return app
