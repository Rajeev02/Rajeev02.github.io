import json
import os
import re
import math

# Paths
INPUT_FILE = "public/prepration/embedded_data.js"
OUTPUT_DIR = "public/content"

def extract_data():
    with open(INPUT_FILE, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Strip the javascript assignment part
    json_str = content.replace("const embeddedFileData =", "").strip()
    if json_str.endswith(";"):
        json_str = json_str[:-1]
    
    try:
        # It's a JSON string disguised as JS object, so json.loads should work if it's strictly formatted
        data = json.loads(json_str)
        return data
    except Exception as e:
        print("Standard JSON failed. Using a more robust extraction...")
        # Since it's a huge JS object, writing a quick node script to dump it to clean JSON is safer
        return None

if __name__ == "__main__":
    pass
