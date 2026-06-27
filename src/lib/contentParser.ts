import { CategoryIndex, TopicContent, TopicMetadata } from "@/types/content";

export async function fetchCategories(): Promise<CategoryIndex[]> {
  try {
    const res = await fetch("/content/categories.json");
    const basicCategories = await res.json();

    // Fetch the index for each category
    const fullCategories = await Promise.all(
      basicCategories.map(async (cat: CategoryIndex) => {
        try {
          const catRes = await fetch(`/content/${cat.id}/index.json`);
          const catData = await catRes.json();
          return catData;
        } catch (e) {
          console.warn(`Could not load index for category ${cat.id}`);
          return { ...cat, topics: [] };
        }
      })
    );

    return fullCategories;
  } catch (err) {
    console.error("Failed to fetch categories:", err);
    return [];
  }
}

export async function fetchTopicContent(categoryId: string, topicId: string): Promise<TopicContent | null> {
  try {
    // 1. Get the category index to find the metadata
    const catRes = await fetch(`/content/${categoryId}/index.json`);
    const catData = await catRes.json();
    const metadata = catData.topics.find((t: TopicMetadata) => t.id === topicId);
    
    if (!metadata) {
      throw new Error("Topic not found in index");
    }

    // 2. Fetch the markdown file
    const mdRes = await fetch(`/content/${categoryId}/${topicId}.md`);
    if (!mdRes.ok) {
      throw new Error("Markdown file not found");
    }
    const rawMarkdown = await mdRes.text();

    // 3. Strip frontmatter if present
    const content = rawMarkdown.replace(/^---[\s\S]*?---/, '').trim();

    return { metadata, content };
  } catch (err) {
    console.error(`Failed to fetch topic ${categoryId}/${topicId}:`, err);
    return null;
  }
}
