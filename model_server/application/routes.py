from application import app, pathName
from flask import request, jsonify
import json

@app.route( '/{}/echo/'.format( pathName ) , methods=['GET'] )
def doGet_echo():
    return 'hello world\n'

@app.route( '/{}/echo/'.format( pathName ) , methods=['POST'] )
def doPost_echo():
    return jsonify( json.loads( request.data ) )
