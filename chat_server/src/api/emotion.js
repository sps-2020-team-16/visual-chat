const fetch = require("node-fetch");
const url = "https://jsonplaceholder.typicode.com/posts/1";

const getEmotion = async (text) => {
    try {
        const response = await fetch("http://flask-dot-rqian-sps-summer20.df.r.appspot.com/saapi/rnn/",
            {
                method: "post",
                body: JSON.stringify({sentence: text}),
                headers: {
                    'Content-Type': 'application/json'
                },
            });
        const json = await response.json();
        return json.result || "";
    } catch (error) {
        return "";
    }
};

const getEmotionWithTimeout = async (text) => {
    let timeout = new Promise((resolve, reject) => {
        let id = setTimeout(() => {
            clearTimeout(id);
            resolve("")
        }, 2000);
    })
    return Promise.race([
        getEmotion(text),
        timeout
    ]);
}

exports.getEmotion = getEmotion;
exports.getEmotionWithTimeout = getEmotionWithTimeout;