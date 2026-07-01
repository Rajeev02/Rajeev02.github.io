import json
import re

file_path = "public/prepration/embedded_data.js"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Since embedded_data.js is just a JS object assignment, let's just do a regex replace to add "type": "md"
# Look for "name": "Senior_RN_Scenarios.md",
# then add "type": "md", after the content field or name field.
# Actually, since it's a huge file, a safe replace:
search_str = '"name": "Senior_RN_Scenarios.md",'
replace_str = '"name": "Senior_RN_Scenarios.md",\n      "type": "md",'
content = content.replace(search_str, replace_str)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Fixed type!")
