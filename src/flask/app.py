import os
from flask_cors import CORS
import openai
from flask import Flask, request
from youtube_transcript_api import YouTubeTranscriptApi
import requests
import wikipedia

app = Flask(__name__)
CORS(app)


openai.api_key = os.getenv("OPENAI_API_KEY")


@app.route("/analyze", methods=["POST"])
def analyze():
    req = request.get_json()

    print("notes:", req)

    response = openai.Completion.create(
        model="text-davinci-002",
        prompt=generate_analysis(req),
        temperature=0.5,
        max_tokens= 200,

    )

    print(response)

    return {
        'prediction': response.choices[0].text
    }        

@app.route("/summary", methods=["POST"])
def summarize():
    req = request.get_json()
  
    transcript = YouTubeTranscriptApi.get_transcript(req)
    transcript, max = get_transcript(transcript)

    response = openai.Completion.create(
        model="text-davinci-002",
        prompt=generate_summary(transcript),
        temperature=0.5,
        max_tokens= 200,

    )
    print(response)

    return {
        'prediction': response.choices[0].text
    }        


@app.route("/topTen", methods=["POST"])
def topTen():
    req = request.get_json()
    genre = req["genre"]
    transcript = YouTubeTranscriptApi.get_transcript(req['videoId'])
    transcript, max = get_transcript(transcript)

    response = openai.Completion.create(
        model="text-davinci-002",
        prompt=generate_title(transcript, genre),
        temperature=0.5,
        max_tokens=200,
    )
    print(response.choices[0].text)

    # words = ['strawberries', 'sugar', 'cake', 'cream', 'eggs', 'pound', 'vanilla', "pineapple", "banana", "flowers"]


    word_list = response.choices[0].text
    # word_list = words

    words_dict = []
    current_word = ""
    for i in range(len(word_list)):
        if word_list[i].isalpha() or word_list[i].isspace() and current_word != "":
            current_word += word_list[i]
        if word_list[i] == "," or i == (len(word_list) - 1):
            words_dict.append(current_word)
            current_word = ""
    print(words_dict)


    
    
    # ask_dict = []
    output = {}
    count = 0

    for i in words_dict:
    # for i in word_list:
        try:
            wiki_summary = wikipedia.summary(i, sentences = 2)
            output[count] = {}
            output[count]["name"] = i
            output[count]["definition"] = wiki_summary
            count += 1
        except:
            print(f"{i} not in wikipedia")
            # ask_dict.append(i)

    # for i in ask_dict:
    #     try:
    #         word_summary = requests.get(f"https://api.dictionaryapi.dev/api/v2/entries/en/{i}")
    #         word_summary = word_summary.json()[0]['meanings'][0]["definitions"][0]['definition']
    #         output[count] = {}
    #         output[count]["name"] = i
    #         output[count]["definition"] = word_summary
    #         count += 1

    #     except:
    #         print(f"{i} not in dictionary")

        
    print(output)
    
    return {
        'prediction': output
    }        





def generate_summary(text):
    return f"""
    
    Video transcript: {text}
    Summarize this for a college level student:
    """

def generate_analysis(text):
    return f"""
    
    Notes: {text}
    Find internet links based on these notes:
    """


def generate_title(text, genre):
    return f"""
    
    Video transcript: {text}
    What are 15 key words relating to {genre} in the form of a python array with bracket syntax:
    """

def get_transcript(body):
    transcript = ""
    max_tokens = 0
    for i in body:
        transcript += i.get('text')
        transcript += " "
        max_tokens += 1
    
  
    return transcript, max_tokens