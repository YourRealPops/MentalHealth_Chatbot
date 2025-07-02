# model/chatbot_model.py
import pandas as pd

# Load cleaned dataset
df = pd.read_csv("data/cleaned_dataset.csv")

def get_chatbot_response(user_input):
    # Search for relevant responses (example)
    result = df[df['question'].str.contains(user_input, case=False, na=False)]
    if not result.empty:
        return result.iloc[0]['response']
    return "Sorry, I couldn't find an answer to that."
