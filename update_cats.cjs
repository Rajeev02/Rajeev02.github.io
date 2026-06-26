const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'public/content/categories.json');
const cats = JSON.parse(fs.readFileSync(file, 'utf8'));

const missing = [
  {
    "id": "javascript",
    "title": "JavaScript Mastery",
    "description": "Deep dive into JS core concepts."
  },
  {
    "id": "react-native",
    "title": "Senior React Native",
    "description": "Advanced architecture, threading, and performance."
  },
  {
    "id": "dsa-mobile",
    "title": "Mobile DSA (Kotlin/Java)",
    "description": "Data Structures & Algorithms tailored for mobile engineers."
  },
  {
    "id": "lead-engineering",
    "title": "Lead & App Lifecycle",
    "description": "App lifecycle, scaling to millions, profiling, and architecture."
  },
  {
    "id": "testing",
    "title": "Testing Mastery",
    "description": "Jest, Detox, and React Native Testing Library."
  }
];

// Add missing if not exist
missing.forEach(m => {
  if (!cats.find(c => c.id === m.id)) {
    cats.push(m);
  }
});

fs.writeFileSync(file, JSON.stringify(cats, null, 2), 'utf8');
