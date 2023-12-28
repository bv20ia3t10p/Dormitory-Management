from flask import Flask, render_template, request, jsonify
from chat import get_response
from datetime import datetime
from pymongo.server_api import ServerApi
from pymongo.mongo_client import MongoClient
from flask_cors import CORS, cross_origin
import pymongo
import pandas as pd
import json
from bson import ObjectId
import nltk

nltk.download("punkt")


class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)


app = Flask(__name__)
cors = CORS(app)

client = MongoClient(
    "mongodb+srv://hotuantrung29:123456tt@cluster0.dhtbvs5.mongodb.net/?retryWrites=true",
    server_api=ServerApi("1"),
)
db = client["chatbotDB"]
session_collection = db["chatSession"]
seperated_collection = db["seperatedChat"]


@app.get("/")
def index_get():
    return render_template("base.html")


# # @app.post("/predict")
# @app.route('/predict', methods=['POST'])
# @cross_origin()
# def predict():
#     user_message = request.get_json().get("message")
#     chatbot_response = get_response(user_message)
#     save_to_mongodb(user_id="some_user_id", message=user_message, chat_by="user")
#     save_to_mongodb(user_id="some_user_id", message=chatbot_response, chat_by="chatbot")
#     message = {"answer": chatbot_response}
#     return jsonify(message)


@app.route("/sessions/<string:sessionId>/", methods=["POST"])
@cross_origin()
def chat_with_bot(sessionId):
    msg = request.form["msg"]
    chatbot_response = get_response(msg)
    user = insert_new_chat(sessionId, msg, "user")
    bot = insert_new_chat(sessionId, chatbot_response, "bot")
    return jsonify({"user": user, "bot": bot})


@app.route("/sessions/new/<string:userId>", methods=["GET"])
@cross_origin()
def create_new_session(userId):
    return jsonify({"sessionId": str(insert_new_sesion(userId))})


@app.get("/sessions/<string:userId>")
@cross_origin()
def get_sessions_for_user(userId):
    return get_sessions_for_user(userId)


@app.get("/sessions/<string:sessionId>/messages")
@cross_origin()
def controller_get_history_for_session(sessionId):
    return get_chat_for_session(sessionId)


# Chatbot ID = "chatbot"
def insert_new_chat(sessionId, message, msgType):
    newSequence = seperated_collection.find_one(
        {"sessionId": sessionId}, sort=[("sequenceInSession", -1)]
    )
    newInsertId = seperated_collection.insert_one(
        {
            "sequenceInSession": int(newSequence["sequenceInSession"]) + 1
            if newSequence
            else 0,
            "sessionId": sessionId,
            "message": message,
            "timestamp": int(datetime.timestamp(datetime.now())),
            "type": msgType,
        }
    ).inserted_id
    returnChat = seperated_collection.find_one({"_id": newInsertId})
    returnChat["_id"] = str(returnChat["_id"])
    print(returnChat)
    return returnChat


def insert_new_sesion(userId):
    return session_collection.insert_one(
        {"user": userId, "timestamp": int(datetime.timestamp(datetime.now()))}
    ).inserted_id


def get_sessions_for_user(userId):
    result = pd.DataFrame(session_collection.find({"user": userId}))
    result.columns = ["sessionId", "user", "timestamp"]
    result["sessionId"] = result["sessionId"].apply(lambda x: str(x))
    return result.to_dict(orient="records")


from pandas import json_normalize


def get_chat_for_session(sessionId):
    result_cursor = seperated_collection.find({"sessionId": sessionId}).sort(
        [("timestamp", pymongo.ASCENDING)]
    )

    result_list = list(result_cursor)

    if result_list:
        result_df = json_normalize(result_list)
        result_df.columns = [
            "_id",
            "chatId",
            "sessionId",
            "message",
            "timestamp",
            "type",
        ]
        result_df["_id"] = result_df["_id"].astype(str)
        result_df["sessionId"] = result_df["sessionId"].astype(str)
        result_df["chatId"] = result_df["chatId"].astype(str)
        return result_df.to_dict(orient="records")
    else:
        return []


# def save_to_mongodb(user_id, message, chat_by):
#     # Create a document update query
#     update_query = {
#         "$push": {
#             "boxchat": {
#                 "message": message,
#                 "timestamp": int(datetime.timestamp(datetime.now())),
#                 "dateTime": datetime.now().isoformat(),
#                 "chatBy": chat_by
#             }
#         }
#     }

# # Update the document based on the User_id
# messages_collection.update_one({"User_id": user_id}, update_query, upsert=True)


if __name__ == "__main__":
    app.run(debug=True)
