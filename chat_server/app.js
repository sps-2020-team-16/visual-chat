const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const PullClient = require('./src/controller/push/pull_client');
const PushService = require('./src/controller/push/push_service');

const UserHandler = require('./src/controller/user/user_handler')
const ChatHandler = require('./src/controller/chat/chat_handler')

app.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: 'visual_chat'
}));

app.use(bodyParser.json());
// app.use('/', express.static(path.join(__dirname, '../chat_app')))

app.use(
    (req , res , next) => {
        if( 
            req.session.user && [ '/index.html' , '/' ].includes( req.path ) 
            ){
            res.redirect('/chat_room.html')
        }else if( 
            !req.session.user && [ '/chat_room.html' ].includes( req.path ) 
            ){
            res.redirect('/index.html')
        }else{
            next()
        }
    }
)
app.use(
    ( req , res , next ) => {
        if( req.path == '/chat_room.html' ){
            const targetOriURL = `/chat_room.html?user=${ req.session.user }&avatar=${ req.session.avatar }`
            if( req.originalUrl != targetOriURL ){
                res.redirect( targetOriURL )
            }else{
                next()
            }
        }else{
            next()
        }
    }
)

app.use( express.static(path.join(__dirname, '../chat_app')))

app.use(
    (req , res , next) => {
        if(!req.session.user && !( [ '/index.html' , '/' , '/api/login' , '/api/register' ].includes( req.path ) ) ){
            res.redirect('/index.html')
        }else{
            next()
        }
    }
)

app.post('/api/register', UserHandler.register);
app.post('/api/login', UserHandler.login);
app.post('/api/logout', UserHandler.logout);
app.get('/api/current', UserHandler.current);

app.post('/api/chat/send', ChatHandler.send_message);

// It's too expensive in computing to do a query for each post. Datastore only has 50000 free quota for queries per day.
// app.post('/api/chat/pull', ChatHandler.pull_update);

app.post('/api/chat/pulllight', ChatHandler.pull_update_light)

app.get('/', function(req, res){
//   res.send('Hello World');
  
  if (req.session.views) {
    ++req.session.views;
  } else {
    req.session.views = 1;
  }

  res.send("Views: " + req.session.views + " User: " + req.session.user);
});

/* istanbul ignore next */
if (!module.parent) {
  app.listen(8080);
  console.log('Express started on port 8080');
}
