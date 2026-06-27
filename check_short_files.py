import json
import os
import glob

content_dir = "public/content"
index_files = glob.glob(f"{content_dir}/*/index.json")

short_files = []

for index_file in index_files:
    category_dir = os.path.dirname(index_file)
    with open(index_file, 'r') as f:
        try:
            data = json.load(f)
            topics = data.get('topics', [])
            for topic in topics:
                topic_id = topic.get('id')
                read_time = topic.get('readingTimeMinutes', 0)
                md_path = os.path.join(category_dir, f"{topic_id}.md")
                
                if os.path.exists(md_path):
                    with open(md_path, 'r') as md_file:
                        lines = md_file.readlines()
                        line_count = len(lines)
                        
                        # Rough metric: assume ~15 lines of markdown per minute of read time
                        if line_count < (read_time * 15):
                            short_files.append((category_dir, topic_id, read_time, line_count))
        except Exception as e:
            print(f"Error reading {index_file}: {e}")

print("Potentially missing/placeholder content files:")
print(f"{'Category':<25} | {'Topic ID':<50} | {'Read Time (m)':<15} | {'Lines':<10}")
print("-" * 110)
for s in short_files:
    cat = os.path.basename(s[0])
    print(f"{cat:<25} | {s[1]:<50} | {s[2]:<15} | {s[3]:<10}")
