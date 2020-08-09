# 1. Temp test deployment: 

## 1.1 slow Echo Server

I'm trying to add a feature to classify sentences into emotions.
So these servers are unstable.

https://flask-dot-rqian-sps-summer20.df.r.appspot.com/saapi/echo/

| methods |  |
|--|--|
| GET | plain string 'hello world' |
| POST | echo the json (please don't send content other than json) |

https://flask-dot-rqian-sps-summer20.df.r.appspot.com/saapi/rnn/

| methods |  |
|--|--|
| GET | e.g. curl https://flask-dot-rqian-sps-summer20.df.r.appspot.com/saapi/rnn/?s=Nice |
| POST | e.g. curl https://flask-dot-rqian-sps-summer20.df.r.appspot.com/saapi/rnn/ -X POST -H 'Content-Type: application/json' -d '{"sentence":"This is too slow!"}' |

```
curl https://flask-dot-rqian-sps-summer20.df.r.appspot.com/saapi/rnn/?s=Nice
  Tweet   Emotion
0  Nice  Surprise
```

```
curl https://flask-dot-rqian-sps-summer20.df.r.appspot.com/saapi/rnn/ -X POST -H 'Content-Type: application/json' -d '{"sentence":"This is too slow!"}'
               Tweet Emotion
0  This is too slow!     Joy
```

## 1.2 new Echo + Rnn Server

I'm trying to make this quicker. The default 'runtime: python38' doesn't have g++, so theano:

```
WARNING (theano.configdefaults): g++ not detected ! Theano will be unable to execute optimized C-implementations (for both CPU and GPU) and will default to Python implementations. Performance will be severely degraded. To remove this warning, set Theano flags cxx to an empty string.
```

# 2. Deployment for app engine
```
cd
git clone https://github.com/sps-2020-team-16/visual-chat.git
cd visual-chat/model_server/
gcloud app deploy app.yaml
```

# 3. Local test
```
cd
git clone https://github.com/sps-2020-team-16/visual-chat.git
cd visual-chat/model_server/
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
gunicorn -b :5000 -w 1 main:app
```
