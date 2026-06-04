import urllib.request
import urllib.parse
import json

def translate_to_hinglish(text):
    url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=hi&dt=t&dt=rm&q=" + urllib.parse.quote(text)
    
    req = urllib.request.Request(
        url, 
        headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
    )
    
    try:
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode('utf-8'))
            
            # The structure of Google Translate single API response:
            # data[0] contains translation segments.
            # Inside data[0], each segment is [translation, original, transliteration, ...]
            # The last element of data[0] or some elements might contain the Romanized transliteration.
            # Let's inspect the data structure.
            print("Response structure:")
            print(json.dumps(data, indent=2))
            
            # Usually, transliteration is in data[0][-1][3] or similar, let's find it.
    except Exception as e:
        print(f"Error: {e}")

test_text = "React Native's runtime environment has undergone a complete architectural rewrite. To show senior-level engineering depth, you must contrast the legacy JSON Bridge model with the modern JSI-based New Architecture."
translate_to_hinglish(test_text)
