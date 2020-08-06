from flask import Flask

app = Flask(__name__)

pathName = 'saapi'

from application import routes
