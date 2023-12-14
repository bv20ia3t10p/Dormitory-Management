from flask import Flask, render_template,request,jsonify
from chat import get_response
from datetime import datetime
from pymongo.server_api import ServerApi
from pymongo import MongoClient
app = Flask(__name__)

client = MongoClient("mongodb+srv://hotuantrung29:123456tt@cluster0.dhtbvs5.mongodb.net/?retryWrites=true&w=majority", server_api=ServerApi('1'))
db = client["chatbotDB"]
messages_collection = db["chat"]

@app.get("/")
def index_get():
    return render_template("base.html")

@app.post("/predict")
def predict():
    user_message = request.get_json().get("message")
    chatbot_response = get_response(user_message)

    save_to_mongodb(user_id="some_user_id", message=user_message, chat_by="user")
    save_to_mongodb(user_id="some_user_id", message=chatbot_response, chat_by="chatbot")

    message = {"answer": chatbot_response}
    return jsonify(message)

def save_to_mongodb(user_id, message, chat_by):
    # Create a document update query
    update_query = {
        "$push": {
            "boxchat": {
                "message": message,
                "timestamp": int(datetime.timestamp(datetime.now())),
                "dateTime": datetime.now().isoformat(),
                "chatBy": chat_by
            }
        }
    }

    # Update the document based on the User_id
    messages_collection.update_one({"User_id": user_id}, update_query, upsert=True)



if __name__ == "__main__":
    app.run(debug=True)