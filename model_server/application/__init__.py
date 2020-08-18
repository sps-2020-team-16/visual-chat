from flask import Flask

app = Flask(__name__)

pathName = 'saapi'
fullPathToRnn = '/{}/rnn/'.format( pathName )

from application import routes
