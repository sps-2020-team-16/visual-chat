# 1. Test Sentiment Analysis Server

## 1.1 echo api

https://flask-dot-rqian-sps-summer20.df.r.appspot.com/saapi/echo/

| methods |  |
|--|--|
| GET | plain string 'hello world' |
| POST | echo the json (please don't send content other than json) |

## 1.2 RNN (Recurrent Neural Network) api

https://flask-dot-rqian-sps-summer20.df.r.appspot.com/saapi/rnn/

| methods |  |
|--|--|
| GET | e.g. curl https://flask-dot-rqian-sps-summer20.df.r.appspot.com/saapi/rnn/?s=Nice |
| POST | e.g. curl https://flask-dot-rqian-sps-summer20.df.r.appspot.com/saapi/rnn/ -X POST -H 'Content-Type: application/json' -d '{"sentence":"This is too slow!"}' |

### examples

```
curl https://flask-dot-rqian-sps-summer20.df.r.appspot.com/saapi/rnn/?s=Nice
  Tweet   Emotion
0  Nice  Surprise
```

```
curl https://flask-dot-rqian-sps-summer20.df.r.appspot.com/saapi/rnn/ -X POST -H 'Content-Type: application/json' -d '{"sentence":"This seems much faster!"}'
                     Tweet Emotion
0  This seems much faster!     Joy
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
pip install keras==1.1.0 theano==0.8.2
gunicorn -b :5000 -w 1 main:app --timeout 600
```
