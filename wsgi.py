from labelu import create_app
from waitress import serve
serve(create_app(), listen="*:8080")
