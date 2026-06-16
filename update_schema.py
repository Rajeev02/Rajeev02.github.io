import json
import re

files_to_update = [
    '/Users/rajeevjoshi/Documents/GitHub/Rajeev02.github.io/index.html',
    '/Users/rajeevjoshi/Documents/GitHub/Rajeev02.github.io/public/prepration/index.html',
    '/Users/rajeevjoshi/Documents/GitHub/Rajeev02.github.io/public/prepration/viewer.html',
    '/Users/rajeevjoshi/Documents/GitHub/Rajeev02.github.io/public/resume-2026.html'
]

faq_schema = {
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Who is Rajeev Kumar Joshi?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Rajeev Kumar Joshi is a Senior React Native Developer and Mobile Engineer based in Bengaluru, India, with over 9 years of experience in Android and cross-platform app development."
            }
        },
        {
            "@type": "Question",
            "name": "What technologies does Rajeev Kumar Joshi specialize in?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "He specializes in React Native, Android SDK, TypeScript, JavaScript, Kotlin, Java, and modern state management tools like Redux Toolkit and React Query."
            }
        },
        {
            "@type": "Question",
            "name": "How many years of experience does Rajeev Kumar Joshi have?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Rajeev has 9+ years of professional software development experience."
            }
        },
        {
            "@type": "Question",
            "name": "What is Rajeev Kumar Joshi known for?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "He is known for his deep expertise in Mobile Architecture, performance optimization using Hermes and JSI, building fintech/SaaS applications, and migrating large codebases to the React Native New Architecture."
            }
        },
        {
            "@type": "Question",
            "name": "What companies has Rajeev Kumar Joshi worked with?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "He has worked with LetsVenture Technologies, WildTrails Technology, Dunst Technologies, and Plurebus Technologies."
            }
        },
        {
            "@type": "Question",
            "name": "Does Rajeev Kumar Joshi work on Android and iOS applications?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, he builds, maintains, and deploys high-performance production applications for both Android and iOS platforms."
            }
        },
        {
            "@type": "Question",
            "name": "What experience does Rajeev Kumar Joshi have with React Native New Architecture?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "He has extensive practical experience navigating the React Native New Architecture, having executed version upgrades from 0.63 through 0.83, and leveraging Fabric renderer, TurboModules, and the JavaScript Interface (JSI)."
            }
        }
    ]
}

website_schema = {
    "@type": "WebSite",
    "url": "https://rajeev02.github.io/",
    "name": "Rajeev Kumar Joshi - Portfolio",
    "author": {
        "@type": "Person",
        "name": "Rajeev Kumar Joshi"
    },
    "description": "Portfolio and technical blog of Rajeev Kumar Joshi, a Senior React Native Developer and Mobile Engineer."
}

for file_path in files_to_update:
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Find the JSON-LD script block
        match = re.search(r'<script type="application/ld\+json">\s*({.*?})\s*</script>', content, re.DOTALL)
        if not match:
            print(f"Could not find JSON-LD in {file_path}")
            continue

        person_schema_str = match.group(1)
        person_schema = json.loads(person_schema_str)

        # If it's already a combined schema (contains @graph), extract the Person object
        if "@graph" in person_schema:
            person_items = person_schema["@graph"]
            person_schema = next((item for item in person_items if item.get("@type") == "Person"), None)
            if not person_schema:
                print(f"Could not find Person schema in @graph for {file_path}")
                continue

        # Remove @context from person_schema if it's going into @graph
        if "@context" in person_schema:
            del person_schema["@context"]

        new_schema = {
            "@context": "https://schema.org",
            "@graph": [
                person_schema,
                website_schema,
                faq_schema
            ]
        }

        new_schema_str = json.dumps(new_schema, indent=2)
        new_block = f'<script type="application/ld+json">\n    {new_schema_str}\n    </script>'

        new_content = content[:match.start()] + new_block + content[match.end():]

        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"Successfully updated {file_path}")

    except Exception as e:
        print(f"Error processing {file_path}: {e}")
