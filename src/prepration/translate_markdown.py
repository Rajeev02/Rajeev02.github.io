import os
import re
import sys
import urllib.request
import urllib.parse
import json
import time

def translate_to_hinglish_api(text):
    if not text.strip():
        return text
    # Skip if only numbers/punctuation
    if re.match(r'^[\s\d\W]+$', text):
        return text
        
    url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=hi&dt=t&dt=rm&q=" + urllib.parse.quote(text)
    req = urllib.request.Request(
        url, 
        headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
    )
    
    for attempt in range(3):
        try:
            with urllib.request.urlopen(req, timeout=10) as response:
                data = json.loads(response.read().decode('utf-8'))
                if data and len(data) > 0 and data[0]:
                    last_elem = data[0][-1]
                    if len(last_elem) > 2 and isinstance(last_elem[2], str):
                        return last_elem[2]
                    
                    # Fallback to translations if romansh is null
                    parts = []
                    for seg in data[0]:
                        if seg and len(seg) > 0 and seg[0]:
                            parts.append(seg[0])
                    return "".join(parts)
        except Exception as e:
            print(f"Error on attempt {attempt + 1}: {e}")
            time.sleep(2)
    return text

def translate_markdown(content):
    # Regexes for extracting blocks to preserve using numeric placeholders that won't be translated
    code_blocks = []
    def save_code_block(match):
        code_blocks.append(match.group(0))
        return f" 9999000{len(code_blocks)-1} " # padded with spaces to keep translation separate
    
    # Preserve code blocks (```js ... ```)
    content = re.sub(r'```[\s\S]*?```', save_code_block, content)
    
    # Preserve inline code (`code`)
    inline_codes = []
    def save_inline_code(match):
        inline_codes.append(match.group(0))
        return f" 8888000{len(inline_codes)-1} "
    content = re.sub(r'`[^`\n]+`', save_inline_code, content)
    
    # Preserve links but extract text for translation
    # [text](link) -> we translate text, keep link
    links = []
    def save_link(match):
        text = match.group(1)
        link = match.group(2)
        # Translate the link text
        translated_text = translate_to_hinglish_api(text)
        links.append(f"[{translated_text}]({link})")
        return f" 7777000{len(links)-1} "
    content = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', save_link, content)
    
    # Preserve HTML tags
    html_tags = []
    def save_html(match):
        html_tags.append(match.group(0))
        return f" 6666000{len(html_tags)-1} "
    content = re.sub(r'<[^>]+>', save_html, content)
    
    # Chunk the text into segments of up to 4000 characters
    max_chars = 4000
    chunks = []
    lines = content.split('\n')
    current_chunk = []
    current_length = 0
    
    for line in lines:
        if current_length + len(line) + 1 > max_chars:
            chunks.append('\n'.join(current_chunk))
            current_chunk = [line]
            current_length = len(line)
        else:
            current_chunk.append(line)
            current_length += len(line) + 1
            
    if current_chunk:
        chunks.append('\n'.join(current_chunk))
        
    # Translate each chunk
    translated_chunks = []
    for i, chunk in enumerate(chunks):
        print(f"  Translating chunk {i+1}/{len(chunks)} ({len(chunk)} chars)...")
        translated_chunk = translate_to_hinglish_api(chunk)
        translated_chunks.append(translated_chunk)
        time.sleep(0.5) # rate limit buffer
        
    translated_content = '\n'.join(translated_chunks)
    
    # Restore HTML tags
    for i, tag in enumerate(html_tags):
        translated_content = translated_content.replace(f" 6666000{i} ", tag)
        translated_content = translated_content.replace(f"6666000{i}", tag)
        
    # Restore links
    for i, link in enumerate(links):
        translated_content = translated_content.replace(f" 7777000{i} ", link)
        translated_content = translated_content.replace(f"7777000{i}", link)
        
    # Restore inline codes
    for i, code in enumerate(inline_codes):
        translated_content = translated_content.replace(f" 8888000{i} ", code)
        translated_content = translated_content.replace(f"8888000{i}", code)
        
    # Restore code blocks
    for i, block in enumerate(code_blocks):
        translated_content = translated_content.replace(f" 9999000{i} ", block)
        translated_content = translated_content.replace(f"9999000{i}", block)
        
    # Clean up double spacing
    translated_content = re.sub(r' +', ' ', translated_content)
    
    return translated_content

def process_file(file_path):
    print(f"Translating {file_path}...")
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    translated = translate_markdown(content)
    
    # Write to theory_hinglish.md
    dir_name = os.path.dirname(file_path)
    base_name = os.path.basename(file_path)
    new_name = base_name.replace(".md", "_hinglish.md")
    out_path = os.path.join(dir_name, new_name)
    
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(translated)
        
    print(f"Saved Hinglish version to {out_path}")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        process_file(sys.argv[1])
    else:
        # Translate all theory.md files
        base_dir = "/Users/rajeevjoshi/Documents/GitHub/Rajeev02.github.io/src/prepration/topic-wise"
        for root, dirs, files in os.walk(base_dir):
            for file in files:
                if file == "theory.md":
                    file_path = os.path.join(root, file)
                    process_file(file_path)
                    time.sleep(1) # Be nice to the API
