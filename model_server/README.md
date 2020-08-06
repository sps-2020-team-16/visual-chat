# Temp test deployment: (https://flask-dot-rqian-sps-summer20.df.r.appspot.com/saapi/echo/)[https://flask-dot-rqian-sps-summer20.df.r.appspot.com/saapi/echo/]

# Deployment for app engine
```
cd
git clone https://github.com/sps-2020-team-16/visual-chat.git
cd visual-chat/model_server/
gcloud app deploy app.yaml
```

# Local test
```
cd
git clone https://github.com/sps-2020-team-16/visual-chat.git
cd visual-chat/model_server/
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
gunicorn -b :5000 -w 1 main:app
```
