from application import app, pathName, fullPathToRnn
from flask import request, jsonify, render_template

from twitteremotionrecognition import predictOneSentence


@app.route( '/_ah/health' )
def doGet_ah_health():
    return 'ok'


@app.route( '/{}/echo/'.format( pathName ) , methods=['GET'] )
def doGet_echo():
    return 'hello world\n'


@app.route( '/{}/echo/'.format( pathName ) , methods=['POST'] )
def doPost_echo():
    return jsonify( request.json )


@app.route( '/{}/rnn/'.format( pathName ) , methods=['GET'] )
def doGet_rnn():
    return render_template( 'index.html' , pathOfEmotionClassification = fullPathToRnn )


@app.route( '/{}/rnn/'.format( pathName ) , methods=['POST'] )
def doPost_rnn():
    sentence = ( request.json ).get( 'sentence' , '' )
    if( len(sentence) > 0 ):
        return str( predictOneSentence( sentence ) )
    return 'ok'
