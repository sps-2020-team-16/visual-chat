// Hard-coded current user
current_user = "David"

// Mapping emotions to expressions
const emotionToExpression = {
    'Haru': {
        'Anger': 'expression:f02',
        'Disgust': 'expression:f07',
        'Fear': 'expression:f05',
        'Joy': 'expression:f04',
        'Sadness': 'expression:f03',
        'Surprise': 'expression:f01'
    },
    'Hiyori': {
        'Anger': null,
        'Disgust': null,
        'Fear': null,
        'Joy': null,
        'Sadness': null,
        'Surprise': null
    },
    'Mark': {
        'Anger': null,
        'Disgust': null,
        'Fear': null,
        'Joy': null,
        'Sadness': null,
        'Surprise': null
    },
    'Natori': {
        'Anger': 'expression:exp_05.exp3.json',
        'Disgust': 'expression:exp_01.exp3.json',
        'Fear': 'expression:exp_02.exp3.json',
        'Joy': 'expression:exp_00.exp3.json',
        'Sadness': 'expression:exp_04.exp3.json',
        'Surprise': 'expression:exp_00.exp3.json'
    },
    'Rice': {
        'Anger': null,
        'Disgust': null,
        'Fear': null,
        'Joy': null,
        'Sadness': null,
        'Surprise': null
    }
}

// Mapping emotions to motions
const emotionToMotion = {
    'Haru': {
        'Anger': 'motion:Idle:1',
        'Disgust': 'motion:TapBody:2',
        'Fear': 'motion:TapBody:0',
        'Joy': 'motion:TapBody:1',
        'Sadness': 'motion:Idle:0',
        'Surprise': 'motion:TapBody:3'
    },
    'Hiyori': {
        'Anger': 'motion:Idle:8',
        'Disgust': 'motion:Idle:5',
        'Fear': 'motion:Idle:5',
        'Joy': 'motion:Idle:6',
        'Sadness': 'motion:Idle:8',
        'Surprise': 'motion:Idle:4'
    },
    'Mark': {
        'Anger': 'motion:Idle:2',
        'Disgust': 'motion:Idle:3',
        'Fear': 'motion:Idle:4',
        'Joy': 'motion:Idle:1',
        'Sadness': 'motion:Idle:2',
        'Surprise': 'motion:Idle:5'
    },
    'Natori': {
        'Anger': 'motion:TapBody:5',
        'Disgust': 'motion:TapBody:4',
        'Fear': 'motion:TapBody:6',
        'Joy': 'motion:TapBody:0',
        'Sadness': 'motion:TapBody:7',
        'Surprise': 'motion:TapBody:1'
    },
    'Rice': {
        'Anger': 'motion:TapBody:0',
        'Disgust': 'motion:TapBody:0',
        'Fear': 'motion:TapBody:1',
        'Joy': 'motion:TapBody:2',
        'Sadness': 'motion:Idle:0',
        'Surprise': 'motion:TapBody:2'
    }
}

// Made-up temporary chat history data
data = [
	{
		"timestamp": 1598694384395,
		"user_name": "Cathy",
		"text": "I'm hungry!"
	},
	{
		"timestamp": 1598694384397,
		"user_name": "David",
		"text": "Hi hungry, nice to meet you. I'm Dad."
	},
	{
		"timestamp": 1598694384399,
		"user_name": "Cathy",
		"text": "DAD! I'm serious!"
	},
	{
		"timestamp": 1598694384400,
		"user_name": "David",
		"text": "I thought your name was hungry...?"
	}
];

// On loading
function loadPage() {
    // Set current user name in navigation bar
    var navbarUserName = document.getElementById('navbar-username');
    var userNameItem = document.createElement('a');
    userNameItem.setAttribute('href', "#");
    var name = document.createTextNode(current_user);
    userNameItem.appendChild(name);
    navbarUserName.appendChild(userNameItem);

    for (var i = 0; i < data.length; i++) {
        // Add to the chat box
        addMsg(data[i]);
    }

    // Load models
    loadModelToChatRoom("Hiyori", "Cathy", "avatar1");
    loadModelToChatRoom("Natori", "Ron", "avatar2");
    loadModelToChatRoom("Haru", "Julia", "avatar3");
    loadModelToChatRoom("Mark", "David", "avatar4");

    // Hard-coded for demo: display Cathy's unhappy emotion
    displayEmotion(window.avatar1, null, emotionToExpression["Hiyori"]["Anger"], emotionToMotion["Hiyori"]["Anger"], 10000);
}

// Load avatar model and its user name to chat room
function loadModelToChatRoom(modelName, userName, divId) {
    var avatar = loadModel(modelName);
    avatar.moveTo(divId);
    window[divId] = avatar;
    
    var nameItem = document.createElement("span");
    nameItem.setAttribute("class", "name");
    var name = document.createTextNode(userName);
    nameItem.appendChild(name);

    document.getElementById(divId).appendChild(nameItem);
}

// Current user sends a message
function sendMsg() {
    var msg = window.document.getElementById('msg').value;
    window.document.getElementById('msg').value = "";
    
    // TODO: interact with backend server

    // Add the newly-sent msg to chat box
    var msgObj = {
        "timestamp": Date.now(),
		"user_name": current_user,
		"text": msg
    };
    addMsg(msgObj);

    var emotion = "Sadness"; // should be fetched from server response

    // Call displayEmotion to display emotions and words
    // Need to modify window.avatarD according to current user
    // Now current_user is always set to David, and David is avatarD(the fourth avatar)
    displayEmotion(window.avatar4, msg, emotionToExpression["Mark"][emotion], emotionToMotion["Mark"][emotion]);
    
}

// Display the message sent or received and the corresponding emotion on the specified avatar
function displayEmotion(avatar, msg, expression, motion, time=0) {
    // avatar say sth in the bubble
    if(msg != null) {
        setTimeout( ()=>{ avatar.say( msg , 5000 ) } , time );
    }

    // show expression
    if(expression != null) {
        setTimeout( ()=>{ avatar.setExpression( expression , true ) } , time );
    }

    // show motion
    if(motion != null) {
        setTimeout( ()=>{ avatar.setMotion( motion , true ) } , time );
    }
}

// Add a message to the chat box
function addMsg(obj) {
    var chatMsgs = document.getElementById("chatMsgs");

    var chatItem = document.createElement("li");
    var logoItem = document.createElement("img");
    logoItem.setAttribute("class", "logo");
    var msg = document.createElement("p");
    var node = document.createTextNode(obj["text"]);
    msg.appendChild(node);
    var nameItem = document.createElement("div");
    nameItem.setAttribute("class", "name");
    var name = document.createTextNode(obj["user_name"]);
    nameItem.appendChild(name);

    if (obj["user_name"] == current_user) {
        chatItem.setAttribute("class", "message right");
        logoItem.setAttribute("src", "imgs/67.jpg"); // hard-coded
    } else {
        chatItem.setAttribute("class", "message left");
        logoItem.setAttribute("src", "imgs/17.jpg"); // hard-coded
    }

    chatItem.appendChild(logoItem);
    chatItem.appendChild(msg);
    chatItem.appendChild(nameItem);

    chatMsgs.appendChild(chatItem);
}
