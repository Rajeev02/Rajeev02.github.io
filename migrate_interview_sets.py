import os
import json
import shutil
import re

source_dir = 'src/prepration/Interview-Sets'
dest_dir = 'public/content/interview-sets'

if not os.path.exists(dest_dir):
    os.makedirs(dest_dir)

topics = []

# Regex to get title from the first heading, or we can just derive from filename
# The files are named like Set-01-JavaScript-Fundamentals.md
files = sorted(os.listdir(source_dir))

for i, filename in enumerate(files):
    if not filename.endswith('.md'):
        continue
        
    src_path = os.path.join(source_dir, filename)
    
    # derive id from filename without extension
    topic_id = filename.replace('.md', '').lower()
    dest_path = os.path.join(dest_dir, f"{topic_id}.md")
    
    # Copy the file
    shutil.copyfile(src_path, dest_path)
    
    # Read the title from the first line or just make it nice
    with open(src_path, 'r', encoding='utf-8') as f:
        first_line = f.readline().strip()
        title = first_line.replace('#', '').strip()
        if not title:
            title = filename.replace('.md', '').replace('-', ' ')
            
    topics.append({
        "id": topic_id,
        "title": title,
        "description": f"Interview questions and answers for {title}",
        "readingTimeMinutes": 15,
        "practiceTimeMinutes": 20
    })

# Write index.json
index_data = {
    "id": "interview-sets",
    "title": "Complete Interview Handbook",
    "description": "Progressive interview sets for React Native engineers.",
    "topics": topics
}

with open(os.path.join(dest_dir, 'index.json'), 'w', encoding='utf-8') as f:
    json.dump(index_data, f, indent=2)

# Update categories.json
categories_path = 'public/content/categories.json'
with open(categories_path, 'r', encoding='utf-8') as f:
    categories = json.load(f)

# check if it already exists
if not any(c['id'] == 'interview-sets' for c in categories):
    categories.append({
        "id": "interview-sets",
        "title": "Complete Interview Handbook",
        "description": "Progressive interview sets for React Native engineers."
    })
    
with open(categories_path, 'w', encoding='utf-8') as f:
    json.dump(categories, f, indent=2)

print("Migration successful! Created interview-sets index and updated categories.json")
