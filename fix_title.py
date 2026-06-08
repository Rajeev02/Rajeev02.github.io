import re

file_path = "/Users/rajeevjoshi/Documents/GitHub/Rajeev02.github.io/src/prepration/topic-wise/09-Daily-Coding/coding.md"

with open(file_path, "r") as f:
    content = f.read()

content = content.replace("# Daily Coding Preparation Guide", "# 💻 Daily Coding Programs")
content = content.replace("## Senior React Native Developer (9 Years Experience)\n\n", "")

with open(file_path, "w") as f:
    f.write(content)
