import re
import os

file_path = "/Users/rajeevjoshi/Documents/GitHub/Rajeev02.github.io/src/prepration/topic-wise/09-Daily-Coding/coding.md"

with open(file_path, "r") as f:
    lines = f.readlines()

new_lines = []
index_entries = []
question_counter = 1

# First pass: strip old Index block
i = 0
in_index = False
cleaned_lines = []
while i < len(lines):
    line = lines[i]
    if line.startswith("# Index"):
        in_index = True
        i += 1
        continue
    
    if in_index:
        # End of index is usually a "---" or "# Must Know JavaScript Methods"
        if line.startswith("# Must Know") or line.startswith("---") and i < len(lines)-1 and lines[i+1].startswith("---"):
            in_index = False
        else:
            i += 1
            continue
            
    cleaned_lines.append(line)
    i += 1

# Second pass: clean up all ## headings and number them
for line in cleaned_lines:
    if line.startswith("# DSA SECTION") or line.startswith("# JavaScript Core Section") or line.startswith("# Logical and Output Problems") or line.startswith("# React Native Daily Life Interview Questions"):
        section_name = line.replace("# ", "").strip()
        index_entries.append(f"- **{section_name}**\n")
        new_lines.append(line)
        continue
        
    if line.startswith("## ") and "Senior React Native Developer" not in line:
        # Strip existing numbers
        title = re.sub(r'^##\s*(Program\s+)?(\d+\.)?\s*', '', line).strip()
        
        new_line = f"## {question_counter}. {title}\n"
        new_lines.append(new_line)
        
        # Add to index
        slug = f"{question_counter}-{title.lower().replace(' ', '-').replace('*', '').replace('`', '').replace('(', '').replace(')', '').replace('.', '')}"
        index_entries.append(f"  - {question_counter}. [{title}](#{slug})\n")
        
        question_counter += 1
    else:
        new_lines.append(line)

# Insert index before "Must Know JavaScript Methods"
insert_idx = 0
for i in range(len(new_lines)):
    if "Must Know JavaScript Methods" in new_lines[i]:
        insert_idx = max(0, i - 1)
        # If there's an empty line or --- before it, go up
        while insert_idx > 0 and (new_lines[insert_idx-1].strip() == "" or new_lines[insert_idx-1].startswith("---")):
            insert_idx -= 1
        break

index_content = ["# Index\n", "\n"] + index_entries + ["\n", "---\n", "\n"]

final_lines = new_lines[:insert_idx] + index_content + new_lines[insert_idx:]

with open(file_path, "w") as f:
    f.writelines(final_lines)

print("Formatting complete.")
