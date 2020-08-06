# 1. Temp test deployment: 

## 1.1 Echo Server

http://20200806t113641-dot-flask-dot-rqian-sps-summer20.df.r.appspot.com/saapi/echo/

The older version of this python server, used for prototype.

| methods |  |
|--|--|
| GET | plain string 'hello world' |
| POST | echo the json (please don't send content other than json) |

## 1.2 Echo + Rnn Server

I'm trying to add a feature to classify sentences into emotions.
So these servers are unstable.

https://flask-dot-rqian-sps-summer20.df.r.appspot.com/saapi/echo/
https://flask-dot-rqian-sps-summer20.df.r.appspot.com/saapi/rnn/

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
