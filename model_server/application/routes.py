from application import app, pathName
from flask import request, jsonify
import json

from twitteremotionrecognition import predictOneSentence

@app.route( '/{}/echo/'.format( pathName ) , methods=['GET'] )
def doGet_echo():
    return 'hello world\n'

@app.route( '/{}/echo/'.format( pathName ) , methods=['POST'] )
def doPost_echo():
    return jsonify( request.json )

@app.route( '/{}/rnn/'.format( pathName ) , methods=['GET'] )
def doGet_rnn():
    sentence = request.args.get('s','')
    if( len(sentence) > 0 ):
        return str( predictOneSentence( sentence ) )
    return 'ok'

@app.route( '/{}/rnn/'.format( pathName ) , methods=['POST'] )
def doPost_rnn():
    sentence = ( request.json ).get('sentence','')
    if( len(sentence) > 0 ):
        return str( predictOneSentence( sentence ) )
    return 'ok'
