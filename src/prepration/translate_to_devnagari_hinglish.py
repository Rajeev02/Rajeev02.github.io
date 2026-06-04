import os
import re
import sys
import urllib.request
import urllib.parse
import json
import time

tech_keywords = [
    # Multi-word phrases first to ensure priority matching
    "Continuous Learning", "continuous learning",
    "Problem-Solving Skills", "problem-solving skills",
    "Problem-Solving", "problem-solving",
    "Industry Trends", "industry trends",
    "Practical Projects", "practical projects",
    "React Native", "React-Native", "react-native",
    "Clean Architecture", "clean architecture",
    "SOLID Principles", "solid principles",
    "SOLID", "solid",
    "State Management", "state management",
    "Context API", "context api",
    "Redux Toolkit", "redux toolkit",
    "custom hooks", "custom hook",
    "React Navigation", "react navigation",
    "Android Studio", "android studio",
    "SSL Pinning", "ssl pinning",
    "Jailbreak Detection", "jailbreak detection",
    "Root Detection", "root detection",
    "Magisk Manager", "magisk manager",
    "App Store", "app store",
    "Play Store", "play store",
    "Google Play", "google play",
    "Expo Updates", "expo updates",
    "Config Plugins", "config plugins",
    "Xcode Instruments", "xcode instruments",
    "Android Profiler", "android profiler",
    "Time Profiler", "time profiler",
    "Memory Profiler", "memory profiler",
    "CPU Profiler", "cpu profiler",
    "Network Profiler", "network profiler",
    "memory leak", "memory leaks",
    "garbage collection", "garbage collector",
    "Cell Recycling", "cell recycling",
    "estimatedItemSize", "estimateditemsize",
    "EstimatedItemSize",
    "provisioning profile", "provisioning profiles",
    "App Store Connect", "app store connect",
    "TestFlight", "testflight",
    "Decision Matrix", "decision matrix",
    "three-point estimation", "Three-Point Estimation",
    "technical debt", "Technical Debt",
    "Git hooks", "git hooks",
    "merge conflicts", "merge conflict",
    "Time Complexity", "time complexity",
    "Space Complexity", "space complexity",
    "Constant Time", "constant time",
    "Logarithmic Time", "logarithmic time",
    "Linear Time", "linear time",
    "Linearithmic Time", "linearithmic time",
    "Quadratic Time", "quadratic time",
    "Exponential Time", "exponential time",
    "Big O Notation", "Big O notation",
    "Big O", "big o",
    "Hash Set", "hash set",
    "HashMap", "hashmap",
    "Two Pointers", "two pointers",
    "Sliding Window", "sliding window",
    "Floyd cycle", "floyd cycle",
    "Binary Search Tree", "binary search tree",
    "adjacency list", "Adjacency List",
    "push notification", "push notifications",
    "Push Notification", "Push Notifications",
    "Shopify Storefront", "Shopify REST",
    "OneSignal", "onesignal",
    "JWT verification", "JWT",
    "Helmet headers", "helmet headers",
    "rate limiting", "Rate Limiting",
    "leaky bucket", "Leaky Bucket",
    "webhook authentication", "webhook", "webhooks",
    "code signing", "Code Signing",
    "privacy manifests", "privacy manifest",
    "Privacy Manifest",
    "closure scopes", "closure scope",
    "type coercions", "type coercion",

    # Single keywords
    "Frameworks", "Framework", "frameworks", "framework",
    "Tools", "Tool", "tools", "tool",
    "Developer", "Developers", "developer", "developers",
    "Professional", "Professionals", "professional", "professionals",
    "Knowledge", "knowledge", "Growth", "growth",
    "Communication", "communication", "Teamwork", "teamwork",
    "Apply", "apply", "Applied", "applied",
    "UI", "UX", "REST", "GraphQL", "SDK", "SDKs", "Vite", "Babel", "Metro",
    "bundler", "bytecode", "dSYM", "ProGuard", "Hermes", "JSI", "Bridge", "bridge",
    "TurboModules", "TurboModule", "Fabric", "Codegen", "Yoga", "Flexbox", "flexbox",
    "StyleSheet", "Props", "props", "Redux", "Zustand", "MobX", "Context", "Recoil",
    "reducer", "reducers", "selector", "selectors", "action", "actions", "thunks", "thunk",
    "saga", "sagas", "hooks", "hook", "useState", "useEffect", "useContext", "useReducer",
    "useMemo", "useCallback", "useRef", "navigation", "stack", "tab", "iOS", "Android",
    "macOS", "Xcode", "Gradle", "Podfile", "Keychain", "Keystore", "AsyncStorage",
    "MMKV", "SQLite", "Realm", "WatermelonDB", "OkHttpClient", "TrustKit", "Jailbreak",
    "Root", "Frida", "Magisk", "Fastlane", "Match", "OTA", "CodePush", "Expo", "CNG",
    "leak", "leaks", "heap", "ANR", "ANRs", "crashes", "crash", "Sentry", "PostHog",
    "Azure", "telemetry", "analytics", "FlashList", "FlatList", "ScrollView",
    "virtualized", "SOLID", "SRP", "OCP", "LSP", "ISP", "DIP", "Monorepos", "Monorepo",
    "Multirepos", "Multirepo", "Nx", "pnpm", "Yarn", "workspaces", "workspace",
    "complexity", "complexities", "Set", "set", "subarray", "subarrays", "substring",
    "substrings", "LIFO", "FIFO", "Queue", "queue", "BST", "DFS", "BFS", "Graph", "graph",
    "Shopify", "token", "tokens", "HMAC"
]

# Sort keywords by length in descending order to avoid partial matches
tech_keywords = sorted(list(set(tech_keywords)), key=len, reverse=True)

def translate_to_hindi_devnagari(text):
    if not text.strip():
        return text
    if re.match(r'^[\s\d\W]+$', text):
        return text
        
    url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=hi&dt=t&q=" + urllib.parse.quote(text)
    req = urllib.request.Request(
        url, 
        headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
    )
    
    for attempt in range(3):
        try:
            with urllib.request.urlopen(req, timeout=10) as response:
                data = json.loads(response.read().decode('utf-8'))
                if data and len(data) > 0 and data[0]:
                    parts = []
                    for seg in data[0]:
                        if seg and len(seg) > 0 and seg[0]:
                            parts.append(seg[0])
                    return "".join(parts)
        except Exception as e:
            print(f"Error on attempt {attempt + 1}: {e}")
            time.sleep(2)
    return text

def translate_markdown_to_devnagari_hinglish(content):
    # 1. Protect code blocks (99990000)
    code_blocks = []
    def save_code_block(match):
        code_blocks.append(match.group(0))
        return f" 9999{len(code_blocks)-1:04d} "
    content = re.sub(r'```[\s\S]*?```', save_code_block, content)
    
    # 2. Protect inline code (88880000)
    inline_codes = []
    def save_inline_code(match):
        inline_codes.append(match.group(0))
        return f" 8888{len(inline_codes)-1:04d} "
    content = re.sub(r'`[^`\n]+`', save_inline_code, content)
    
    # 3. Protect HTML tags (66660000)
    html_tags = []
    def save_html(match):
        html_tags.append(match.group(0))
        return f" 6666{len(html_tags)-1:04d} "
    content = re.sub(r'<[^>]+>', save_html, content)

    # 4. Protect markdown links (77770000)
    links = []
    def save_link(match):
        text = match.group(1)
        link = match.group(2)
        links.append((text, link))
        return f" 7777{len(links)-1:04d} "
    content = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', save_link, content)
    
    # 5. Protect technical keywords using regex word boundaries (55550000)
    protected_terms = []
    
    pattern_parts = [r'\b' + re.escape(kw) + r'\b' for kw in tech_keywords]
    keyword_regex = re.compile('|'.join(pattern_parts))
    
    def save_tech_term(match):
        term = match.group(0)
        protected_terms.append(term)
        return f" 5555{len(protected_terms)-1:04d} "
        
    content = keyword_regex.sub(save_tech_term, content)
    
    # Chunk the text into segments of up to 3500 characters
    max_chars = 3500
    chunks = []
    lines = content.split('\n')
    current_chunk = []
    current_length = 0
    
    for line in lines:
        if current_length + len(line) + 1 > max_chars:
            chunks.append('\n'.join(current_chunk))
            current_chunk = [line]
            current_length = len(line)
        else:
            current_chunk.append(line)
            current_length += len(line) + 1
            
    if current_chunk:
        chunks.append('\n'.join(current_chunk))
        
    # Translate chunks to Devnagari Hindi
    translated_chunks = []
    for i, chunk in enumerate(chunks):
        print(f"  Translating chunk {i+1}/{len(chunks)} ({len(chunk)} chars)...")
        translated_chunk = translate_to_hindi_devnagari(chunk)
        translated_chunks.append(translated_chunk)
        time.sleep(0.5)
        
    translated_content = '\n'.join(translated_chunks)
    
    # Clean up spacing around numeric tokens first
    translated_content = re.sub(r'(\d+)\s+(\d+)', r'\1\2', translated_content)
    
    # 6. Restore technical keywords
    for i, term in enumerate(protected_terms):
        translated_content = translated_content.replace(f"5555{i:04d}", f" {term} ")
        
    # 7. Restore links
    for i, (text, link) in enumerate(links):
        clean_text = text.strip()
        if clean_text in tech_keywords:
            translated_text = clean_text
        else:
            translated_text = translate_to_hindi_devnagari(clean_text)
        restored_link = f"[{translated_text.strip()}]({link})"
        translated_content = translated_content.replace(f"7777{i:04d}", f" {restored_link} ")
        
    # 8. Restore HTML tags
    for i, tag in enumerate(html_tags):
        translated_content = translated_content.replace(f"6666{i:04d}", f" {tag} ")
        
    # 9. Restore inline codes
    for i, code in enumerate(inline_codes):
        translated_content = translated_content.replace(f"8888{i:04d}", f" {code} ")
        
    # 10. Restore code blocks
    for i, block in enumerate(code_blocks):
        translated_content = translated_content.replace(f"9999{i:04d}", f"\n\n{block}\n\n")
        
    # Clean up excess whitespace and double-spacing
    translated_content = re.sub(r'[ \t]+', ' ', translated_content)
    translated_content = re.sub(r'\n\s*\n', '\n\n', translated_content)
    
    return translated_content.strip()

def process_file(file_path):
    print(f"Processing {file_path} to Devnagari Hinglish...")
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    translated = translate_markdown_to_devnagari_hinglish(content)
    
    dir_name = os.path.dirname(file_path)
    base_name = os.path.basename(file_path)
    new_name = base_name.replace(".md", "_hinglish.md")
    out_path = os.path.join(dir_name, new_name)
    
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(translated)
        
    print(f"Saved dynamic Devnagari Hinglish version to {out_path}")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        process_file(sys.argv[1])
    else:
        base_dir = "/Users/rajeevjoshi/Documents/GitHub/Rajeev02.github.io/src/prepration/topic-wise"
        for root, dirs, files in os.walk(base_dir):
            for file in files:
                if file == "theory.md":
                    file_path = os.path.join(root, file)
                    process_file(file_path)
                    time.sleep(1)
