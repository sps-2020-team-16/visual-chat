from application import app, pathName, fullPathToRnn
from flask import request, jsonify, render_template


# @app.route( '/_ah/health' )
# def doGet_ah_health():
#     return 'ok'


# @app.route( '/_ah/warmup' )
# def doGet_ah_warmup():
#     loadTheRNNModel()
#     return '', 200, {}


def loadTheRNNModel():
    from twitteremotionrecognition import predictOneSentence
    return predictOneSentence


@app.route( '/{}/echo/'.format( pathName ) , methods=['GET'] )
def doGet_echo():
    return 'hello world\n'


@app.route( '/{}/echo/'.format( pathName ) , methods=['POST'] )
def doPost_echo():
    return jsonify( request.json )


@app.route( '/{}/rnn/'.format( pathName ) , methods=['GET'] )
def doGet_rnn():
    return render_template( 'index.html' , pathOfEmotionClassification = fullPathToRnn )


import traceback
import logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


@app.route( '/{}/rnn/'.format( pathName ) , methods=['POST'] )
def doPost_rnn():

    try:

        RNNStrToEmotion = loadTheRNNModel()
        sentence = ( request.json ).get( 'sentence' , '' )
        result = str( RNNStrToEmotion( sentence )[ 'Emotion' ][ 0 ] )
        if( len( sentence ) > 0 ):
            return jsonify({
                'status' : 0,
                'result' : result
            })
        else:
            raise ValueError( 'empty sentence' )

    except Exception as e:

        logger.info( 'repr(e):\n'            + repr( e ) )
        logger.info( 'traceback.format_exc():\n%s' % traceback.format_exc() )
        return jsonify({
            'status' : -1,
            'result' : 'error'
        })


loadTheRNNModel()

