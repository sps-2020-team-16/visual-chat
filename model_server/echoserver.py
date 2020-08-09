from flask import Flask, request, jsonify

app = Flask(__name__)

pathName = 'saapi'

@app.route( '/{}/echo/'.format( pathName ) , methods=['GET'] )
def doGet_echo():
    return 'hello world\n'

@app.route( '/{}/echo/'.format( pathName ) , methods=['POST'] )
def doPost_echo():
    return jsonify( request.json )

