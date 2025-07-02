from flask import Flask, request, jsonify
from model.chatbot_model import get_chatbot_response
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "AI Chatbot Backend is Running"

@app.route("/api/chat", methods=["POST"])
def chat():
    user_input = request.json.get("message")
    if not user_input:
        return jsonify({"message": "No message received"}), 400

    response = get_chatbot_response(user_input)
    return jsonify({"message": response})

if __name__ == "__main__":
    app.run(debug=True)
