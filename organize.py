import re
import os

file_path = "/Users/rajeevjoshi/Documents/GitHub/Rajeev02.github.io/src/prepration/topic-wise/09-Daily-Coding/daily-coding.md"
new_file_path = "/Users/rajeevjoshi/Documents/GitHub/Rajeev02.github.io/src/prepration/topic-wise/09-Daily-Coding/coding.md"

with open(file_path, "r") as f:
    lines = f.readlines()

# Remove IBM references
# "IBM HackerRank Preparation Guide" -> "Daily Coding Preparation Guide"
# "Expected IBM Patterns" -> "Expected Interview Patterns"

for i in range(len(lines)):
    if "IBM HackerRank Preparation Guide" in lines[i]:
        lines[i] = lines[i].replace("IBM HackerRank Preparation Guide", "Daily Coding Preparation Guide")
    if "Expected IBM Patterns" in lines[i]:
        lines[i] = lines[i].replace("Expected IBM Patterns", "Expected Interview Patterns")

# Process headings to extract index and fix numbers
question_counter = 1
new_lines = []
index_entries = []

# State variables
current_section = None
skip_mode = False

for i in range(len(lines)):
    line = lines[i]
    
    # Check if it's a section
    if line.startswith("# DSA SECTION") or line.startswith("# JavaScript Core Section") or line.startswith("# Logical and Output Problems") or line.startswith("# React Native Daily Life Interview Questions"):
        section_name = line.replace("# ", "").strip()
        index_entries.append(f"- **{section_name}**\n")
        new_lines.append(line)
        continue
        
    # Check if it's a question heading
    # Usually starts with "## 1. Two Sum"
    match = re.match(r'^##\s+\d+\.\s+(.*)', line)
    if match:
        question_title = match.group(1).strip()
        
        # Rewrite the line with continuous numbering
        new_line = f"## {question_counter}. {question_title}\n"
        new_lines.append(new_line)
        
        # Add to index
        index_entries.append(f"  - {question_counter}. [{question_title}](#{question_counter}-{question_title.lower().replace(' ', '-').replace('*', '').replace('`', '')})\n")
        
        question_counter += 1
    else:
        new_lines.append(line)

# Now we need to insert the Index right after the Interview Strategy section
insert_idx = 0
for i in range(len(new_lines)):
    if "Must Know JavaScript Methods" in new_lines[i]:
        insert_idx = i - 2 # Insert before "---" above Must Know
        break

index_content = ["# Index\n", "\n"] + index_entries + ["\n", "---\n", "\n"]

final_lines = new_lines[:insert_idx] + index_content + new_lines[insert_idx:]

with open(new_file_path, "w") as f:
    f.writelines(final_lines)

# Remove the old file
os.remove(file_path)

print("Processed and renamed successfully.")

