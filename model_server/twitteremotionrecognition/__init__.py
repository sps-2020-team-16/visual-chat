from twitteremotionrecognition.emotion_predictor import EmotionPredictor

model = EmotionPredictor(classification='ekman', setting='mc', use_unison_model=True)

def predictOneSentence(aSentence):
    tweets = [
        aSentence
    ]
    predictions = model.predict_classes(tweets)

    return predictions
