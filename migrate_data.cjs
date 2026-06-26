const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, 'public/prepration/embedded_data.js');
const outputDir = path.join(__dirname, 'public/content');

// Helper to make URLs / IDs safe
const slugify = (text) => {
  return text.toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// Calculate realistic reading time
const calculateReadingTime = (content) => {
  const wordCount = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / 200));
};

async function migrateData() {
  console.log('Reading embedded_data.js...');
  const content = fs.readFileSync(inputFile, 'utf-8');
  
  console.log('Parsing JavaScript object...');
  // Strip the 'const embeddedFileData =' and evaluate the object
  const jsonStr = content.replace("const embeddedFileData =", "").trim().replace(/;$/, "");
  
  let data;
  try {
    // We use eval or Function to safely parse the JS object string
    data = new Function("return " + jsonStr)();
  } catch (err) {
    console.error("Failed to parse the JS data", err);
    process.exit(1);
  }

  const categoriesList = [];

  for (const [categoryName, files] of Object.entries(data)) {
    console.log(`Processing category: ${categoryName}`);
    
    const catId = slugify(categoryName);
    const catDir = path.join(outputDir, catId);
    
    // Create category directory
    if (!fs.existsSync(catDir)) {
      fs.mkdirSync(catDir, { recursive: true });
    }

    const topicsList = [];

    for (const file of files) {
      const topicName = file.name.replace('.md', '');
      const topicId = slugify(topicName);
      const markdownContent = file.content;
      
      const readingTime = calculateReadingTime(markdownContent);
      const practiceTime = markdownContent.includes('```') ? Math.min(60, readingTime * 2) : 5;
      
      // Determine difficulty heuristically based on keywords or random distribution for now
      let difficulty = "Intermediate";
      if (markdownContent.toLowerCase().includes('advanced') || markdownContent.toLowerCase().includes('architecture')) {
        difficulty = "Advanced";
      } else if (markdownContent.toLowerCase().includes('basic') || markdownContent.toLowerCase().includes('introduction')) {
        difficulty = "Beginner";
      }

      // Metadata object
      const topicMetadata = {
        id: topicId,
        title: topicName,
        readingTimeMinutes: readingTime,
        revisionTimeMinutes: Math.max(1, Math.ceil(readingTime / 3)),
        practiceTimeMinutes: practiceTime,
        difficulty: difficulty,
        importanceRating: 8,
        interviewFrequency: 4,
        tags: [categoryName, "Interview"]
      };

      topicsList.push(topicMetadata);

      // Write Markdown file
      const mdPath = path.join(catDir, `${topicId}.md`);
      fs.writeFileSync(mdPath, markdownContent, 'utf-8');
    }

    // Write index.json for category
    const catIndexData = {
      id: catId,
      title: categoryName,
      description: `Comprehensive interview preparation for ${categoryName}`,
      topics: topicsList
    };
    fs.writeFileSync(path.join(catDir, 'index.json'), JSON.stringify(catIndexData, null, 2), 'utf-8');

    // Add to master categories list
    categoriesList.push({
      id: catId,
      title: categoryName,
      description: `Comprehensive interview preparation for ${categoryName}`
    });
  }

  // Write master categories.json
  fs.writeFileSync(path.join(outputDir, 'categories.json'), JSON.stringify(categoriesList, null, 2), 'utf-8');
  console.log('Migration completed successfully!');
}

migrateData();
