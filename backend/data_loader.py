import json

def load_data():
    with open("backend/data.json", "r") as f:
        return json.load(f)