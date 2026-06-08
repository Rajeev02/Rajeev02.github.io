import os
import re

base_dir = "/Users/rajeevjoshi/Documents/GitHub/Rajeev02.github.io/src/prepration/topic-wise"

for folder in os.listdir(base_dir):
    folder_path = os.path.join(base_dir, folder)
    if not os.path.isdir(folder_path):
        continue
        
    theory_path = os.path.join(folder_path, "theory.md")
    if not os.path.exists(theory_path):
        continue

    print(f"Splitting {folder}...")

    with open(theory_path, "r", encoding="utf-8") as f:
        lines = f.readlines()

    sections = []
    current_section = []
    current_title = "Introduction"
    current_slug = "introduction"

    def make_slug(title):
        s = re.sub(r'[^a-zA-Z0-9\s]', '', title)
        s = s.replace("Section", "").strip()
        s = re.sub(r'^\d+\s*', '', s)
        s = s.lower().replace(" ", "_")
        return s or "section"

    for line in lines:
        if re.match(r'^##\s+.*?Section', line) or (folder == "08-React-Native-Projects" and re.match(r'^##\s+\d+\.\s+', line)):
            if current_section:
                sections.append({"title": current_title, "slug": current_slug, "lines": current_section})
            
            current_title = line.strip().replace("##", "").strip()
            current_slug = make_slug(current_title)
            current_section = [line]
        else:
            current_section.append(line)
            
    if current_section:
        sections.append({"title": current_title, "slug": current_slug, "lines": current_section})

    if len(sections) > 2:
        for idx, sec in enumerate(sections):
            if idx == 0 and ("Introduction" in sec["title"] or "Table of Contents" in "".join(sec["lines"])):
                continue
                
            out_file = os.path.join(folder_path, f"{idx:02d}_{sec['slug']}.md")
            with open(out_file, "w", encoding="utf-8") as f:
                content = "".join(sec['lines'])
                if not content.lstrip().startswith("# "):
                    f.write(f"# {sec['title']}\n\n")
                    f.write(content.replace(f"## {sec['title']}\n", ""))
                else:
                    f.write(content)
                    
        os.rename(theory_path, theory_path + ".backup")
        
        hinglish_path = os.path.join(folder_path, "theory_hinglish.md")
        if os.path.exists(hinglish_path):
            with open(hinglish_path, "r", encoding="utf-8") as f:
                h_lines = f.readlines()
            
            h_sections = []
            h_curr_sec = []
            
            for line in h_lines:
                if re.match(r'^##\s+.*?अनुभाग', line) or re.match(r'^##\s+.*?धारा', line) or re.match(r'^##\s+.*?Section', line) or (folder == "08-React-Native-Projects" and re.match(r'^##\s+\d+\.\s+', line)):
                    if h_curr_sec:
                        h_sections.append(h_curr_sec)
                    h_curr_sec = [line]
                else:
                    h_curr_sec.append(line)
            if h_curr_sec:
                h_sections.append(h_curr_sec)
                
            if len(h_sections) >= len(sections) - 2:
                h_idx = 1 if len(h_sections) < len(sections) else 0
                
                for idx, sec in enumerate(sections):
                    if idx == 0 and ("Introduction" in sec["title"] or "Table of Contents" in "".join(sec["lines"])):
                        continue
                    
                    if h_idx < len(h_sections):
                        h_content = "".join(h_sections[h_idx])
                        h_out_file = os.path.join(folder_path, f"{idx:02d}_{sec['slug']}_hinglish.md")
                        
                        first_line = h_sections[h_idx][0]
                        if first_line.startswith("## "):
                            h_content = "# " + first_line[3:] + "\n" + "".join(h_sections[h_idx][1:])
                            
                        with open(h_out_file, "w", encoding="utf-8") as f:
                            f.write(h_content)
                        h_idx += 1
                
                os.rename(hinglish_path, hinglish_path + ".backup")

print("Splitting complete.")
