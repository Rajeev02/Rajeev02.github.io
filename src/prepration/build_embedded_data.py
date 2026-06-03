import os
import json

def build_embedded_data():
    base_dir = "/Users/rajeevjoshi/Documents/GitHub/Rajeev02.github.io/src/prepration"
    topic_wise_dir = os.path.join(base_dir, "topic-wise")
    
    embedded_data = {}
    
    # Sort folders to maintain order (01-React-Native, 02-JavaScript, etc.)
    categories = sorted([d for d in os.listdir(topic_wise_dir) if os.path.isdir(os.path.join(topic_wise_dir, d))])
    
    for category in categories:
        category_path = os.path.join(topic_wise_dir, category)
        embedded_data[category] = []
        
        # Sort files inside category
        files = sorted(os.listdir(category_path))
        for filename in files:
            file_path = os.path.join(category_path, filename)
            if not os.path.isfile(file_path):
                continue
            
            # Skip hidden files
            if filename.startswith('.'):
                continue
                
            file_ext = filename.split('.')[-1].lower()
            if file_ext not in ['md', 'js', 'ts', 'tsx']:
                continue
                
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                embedded_data[category].append({
                    "name": filename,
                    "content": content,
                    "type": "md" if file_ext == "md" else file_ext
                })
                print(f"Bundled: {category}/{filename} ({len(content)} bytes)")
            except Exception as e:
                print(f"Error reading {file_path}: {e}")
                
    js_content = f"const embeddedFileData = {json.dumps(embedded_data, indent=2)};\n"
    
    # Paths to write embedded_data.js
    targets = [
        "/Users/rajeevjoshi/Documents/GitHub/Rajeev02.github.io/public/prepration/embedded_data.js",
        "/Users/rajeevjoshi/Documents/GitHub/Rajeev02.github.io/dist/prepration/embedded_data.js"
    ]
    
    for target in targets:
        target_dir = os.path.dirname(target)
        if os.path.exists(target_dir):
            try:
                with open(target, 'w', encoding='utf-8') as f:
                    f.write(js_content)
                print(f"Successfully wrote embedded_data.js to {target}")
            except Exception as e:
                print(f"Error writing to {target}: {e}")
        else:
            print(f"Target directory {target_dir} does not exist, skipping.")

if __name__ == "__main__":
    build_embedded_data()
