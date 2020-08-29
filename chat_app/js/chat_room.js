// Hard-coded current user
// Let's assume that there are only four people using this chat room:
// Cathy, Ron, Julia, and David
// and their avatars are Hiyori, Natori, Haru, Mark respectively, from left to right.
current_user = "David"

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
function loadChatHistory() {
    for (var i = 0; i < data.length; i++) {
        // Add to the chat box
        addMsg(data[i]);
    }

    // Hard-coded for demo: display Cathy's unhappy emotion
    displayEmotion(window.avatarA, null, null, "motion:Idle:8", 3000);
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

    var expression = null; // should be fetched from server response
    var motion = 'motion:Idle:3'; // should be fetched from server response

    // Call displayEmotion to display emotions and words
    // Need to modify window.avatarD according to current user
    // Now current_user is always set to David, and David is avatarD(the fourth avatar)
    displayEmotion(window.avatarD, msg, expression, motion);
    
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
