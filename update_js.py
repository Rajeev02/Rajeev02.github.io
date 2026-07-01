import json

with open("public/prepration/embedded_data.js", "r", encoding="utf-8") as f:
    js_content = f.read()

with open("new_scenarios.md", "r", encoding="utf-8") as f:
    new_md = f.read()

# We want to replace the entire object that has "name": "Senior_RN_Scenarios.md"
# It starts around:
#   "InterviewGuide": [
#     {
#   "name": "Senior_RN_Scenarios.md",
#   "type": "md",
#   "content": "..."
# },

# And ends right before:
#     {
#       "name": "01-JavaScript.md",

# Let's find the start
start_marker = '"InterviewGuide": [\n    {\n  "name": "Senior_RN_Scenarios.md",'
if start_marker not in js_content:
    # Try another combination
    start_marker = '"name": "Senior_RN_Scenarios.md"'
    start_idx = js_content.find(start_marker)
    # find the opening brace before it
    start_brace_idx = js_content.rfind('{', 0, start_idx)
else:
    start_brace_idx = js_content.find('{', js_content.find(start_marker))

end_marker = '"name": "01-JavaScript.md"'
end_idx = js_content.find(end_marker)
# Find the opening brace of 01-JavaScript.md
end_brace_idx = js_content.rfind('{', 0, end_idx)
# Find the comma before that brace
comma_idx = js_content.rfind(',', 0, end_brace_idx)

# So the old object goes from start_brace_idx to comma_idx

import json
new_obj = {
    "name": "Senior_RN_Scenarios.md",
    "type": "md",
    "content": new_md
}

new_obj_str = json.dumps(new_obj, ensure_ascii=False, indent=4)

new_js_content = js_content[:start_brace_idx] + new_obj_str + js_content[comma_idx:]

with open("public/prepration/embedded_data.js", "w", encoding="utf-8") as f:
    f.write(new_js_content)
print("Updated successfully.")
