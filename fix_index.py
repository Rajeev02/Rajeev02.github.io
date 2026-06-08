import re

file_path = "/Users/rajeevjoshi/Documents/GitHub/Rajeev02.github.io/src/prepration/topic-wise/09-Daily-Coding/coding.md"

with open(file_path, "r") as f:
    content = f.read()

# Replace the `# Index\n` with the HTML wrapper
index_start = content.find("# Index\n")
if index_start != -1:
    end_of_index = content.find("\n---\n", index_start)
    if end_of_index != -1:
        index_text = content[index_start + 8 : end_of_index] # extract the list
        
        # Build new index
        new_index = "<!-- INDEX_START -->\n<details>\n  <summary>📖 <b>Table of Contents (Click to expand)</b></summary>\n" + index_text + "</details>\n<!-- INDEX_END -->\n"
        
        new_content = content[:index_start] + new_index + content[end_of_index:]
        with open(file_path, "w") as f:
            f.write(new_content)
        print("Index wrapped successfully.")
    else:
        print("End of index not found.")
else:
    print("Index heading not found.")

