import json
import os
import glob

content_dir = "public/content"
index_files = glob.glob(f"{content_dir}/*/index.json")

missing_files = []

for index_file in index_files:
    category_dir = os.path.dirname(index_file)
    with open(index_file, 'r') as f:
        try:
            data = json.load(f)
            topics = data.get('topics', [])
            for topic in topics:
                topic_id = topic.get('id')
                md_path = os.path.join(category_dir, f"{topic_id}.md")
                if not os.path.exists(md_path):
                    missing_files.append((index_file, topic_id, md_path))
        except Exception as e:
            print(f"Error reading {index_file}: {e}")

print("Missing files:")
for m in missing_files:
    print(f"Category: {os.path.basename(os.path.dirname(m[0]))}, Topic ID: {m[1]}")
