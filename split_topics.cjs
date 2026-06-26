const fs = require('fs');
const path = require('path');

const contentDir = path.join(__dirname, 'public/content');

const slugify = (text) => {
  return text.toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const cleanCategoryTitle = (title) => {
  return title.replace(/^\d+-/, '').replace(/-/g, ' ');
};

const cleanTopicTitle = (title) => {
  let cleaned = title.replace(/_/g, ' ');
  return cleaned.trim();
};

const calculateReadingTime = (content) => {
  const wordCount = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / 200));
};

function splitMarkdownByTopic(filePath, categoryId) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  const topics = [];
  let currentTopic = null;
  let currentLines = [];

  for (const line of lines) {
    if (line.startsWith('> 🎯 **Topic:**')) {
      if (currentTopic) {
        topics.push({
          title: currentTopic,
          slug: slugify(currentTopic),
          content: currentLines.join('\n')
        });
      }
      currentTopic = line.replace('> 🎯 **Topic:**', '').trim();
      currentLines = [line];
    } else {
      currentLines.push(line);
    }
  }

  if (currentTopic) {
    topics.push({
      title: currentTopic,
      slug: slugify(currentTopic),
      content: currentLines.join('\n')
    });
  } else if (topics.length === 0) {
    const baseName = path.basename(filePath, '.md');
    topics.push({
      title: cleanTopicTitle(baseName),
      slug: slugify(baseName),
      content: content
    });
  }

  const validTopics = topics.filter(t => !t.title.toLowerCase().includes('table of contents') && !t.title.toLowerCase().includes('react native coding programs'));

  return validTopics;
}

function processDirectory() {
  const categories = [];
  const dirs = fs.readdirSync(contentDir);
  
  for (const dir of dirs) {
    const dirPath = path.join(contentDir, dir);
    if (!fs.statSync(dirPath).isDirectory()) continue;
    
    const indexFile = path.join(dirPath, 'index.json');
    if (!fs.existsSync(indexFile)) continue;

    const catData = JSON.parse(fs.readFileSync(indexFile, 'utf-8'));
    catData.title = cleanCategoryTitle(catData.title);
    
    const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.md') && !f.includes('.backup'));
    let allTopics = [];

    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const splitTopics = splitMarkdownByTopic(filePath, dir);
      
      if (splitTopics.length > 1) {
        fs.renameSync(filePath, filePath + '.backup');
      }

      for (const [idx, t] of splitTopics.entries()) {
        const difficulty = t.content.toLowerCase().includes('advanced') ? 'Advanced' : 'Intermediate';
        const readingTime = calculateReadingTime(t.content);
        const practiceTime = t.content.includes('```') ? Math.min(60, readingTime * 2) : 5;

        const prefix = (idx + 1).toString().padStart(2, '0');
        const topicSlug = splitTopics.length > 1 ? `${prefix}-${t.slug}` : t.slug;

        const topicMeta = {
          id: topicSlug,
          title: cleanTopicTitle(t.title),
          readingTimeMinutes: readingTime,
          revisionTimeMinutes: Math.max(1, Math.ceil(readingTime / 3)),
          practiceTimeMinutes: practiceTime,
          difficulty: difficulty,
          importanceRating: 8,
          interviewFrequency: 4,
          tags: [catData.title, "Interview"]
        };
        allTopics.push(topicMeta);

        fs.writeFileSync(path.join(dirPath, `${topicSlug}.md`), t.content, 'utf-8');
      }
    }

    if (allTopics.length > 0) {
      catData.topics = allTopics;
      fs.writeFileSync(indexFile, JSON.stringify(catData, null, 2), 'utf-8');
    }

    categories.push({
      id: catData.id,
      title: catData.title,
      description: catData.description
    });
  }

  fs.writeFileSync(path.join(contentDir, 'categories.json'), JSON.stringify(categories, null, 2), 'utf-8');
  console.log('Splitting topics completed.');
}

processDirectory();
