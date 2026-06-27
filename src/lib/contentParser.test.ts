import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchCategories, fetchTopicContent } from './contentParser';

describe('contentParser', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe('fetchCategories', () => {
    it('should successfully fetch categories and their indexes', async () => {
      // Mock global fetch
      global.fetch = vi.fn().mockImplementation((url: string) => {
        if (url === '/content/categories.json') {
          return Promise.resolve({
            json: () => Promise.resolve([{ id: 'cat1', title: 'Category 1' }])
          });
        }
        if (url === '/content/cat1/index.json') {
          return Promise.resolve({
            json: () => Promise.resolve({ id: 'cat1', title: 'Category 1', topics: [] })
          });
        }
        return Promise.reject(new Error('Not found'));
      });

      const categories = await fetchCategories();
      expect(categories).toEqual([{ id: 'cat1', title: 'Category 1', topics: [] }]);
    });

    it('should handle failure when fetching categories.json', async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));
      const categories = await fetchCategories();
      expect(categories).toEqual([]);
    });

    it('should fallback gracefully if a specific category index fails to load', async () => {
      global.fetch = vi.fn().mockImplementation((url: string) => {
        if (url === '/content/categories.json') {
          return Promise.resolve({
            json: () => Promise.resolve([{ id: 'cat1', title: 'Category 1' }])
          });
        }
        if (url === '/content/cat1/index.json') {
          return Promise.reject(new Error('Index not found'));
        }
        return Promise.reject(new Error('Not found'));
      });

      const categories = await fetchCategories();
      // Should return the category with an empty topics array
      expect(categories).toEqual([{ id: 'cat1', title: 'Category 1', topics: [] }]);
    });
  });

  describe('fetchTopicContent', () => {
    const mockMetadata = { id: 'topic1', title: 'Topic 1' };
    
    it('should fetch topic content and strip frontmatter', async () => {
      global.fetch = vi.fn().mockImplementation((url: string) => {
        if (url === '/content/cat1/index.json') {
          return Promise.resolve({
            json: () => Promise.resolve({ topics: [mockMetadata] })
          });
        }
        if (url === '/content/cat1/topic1.md') {
          return Promise.resolve({
            ok: true,
            text: () => Promise.resolve('---\ntitle: Topic 1\n---\n\n# Hello World')
          });
        }
        return Promise.reject(new Error('Not found'));
      });

      const result = await fetchTopicContent('cat1', 'topic1');
      expect(result).not.toBeNull();
      expect(result?.metadata).toEqual(mockMetadata);
      expect(result?.content).toBe('# Hello World');
    });

    it('should return null if topic is not found in the index', async () => {
      global.fetch = vi.fn().mockImplementation((url: string) => {
        if (url === '/content/cat1/index.json') {
          return Promise.resolve({
            json: () => Promise.resolve({ topics: [] })
          });
        }
        return Promise.reject(new Error('Not found'));
      });

      const result = await fetchTopicContent('cat1', 'topic1');
      expect(result).toBeNull();
    });

    it('should return null if markdown file fetch fails', async () => {
      global.fetch = vi.fn().mockImplementation((url: string) => {
        if (url === '/content/cat1/index.json') {
          return Promise.resolve({
            json: () => Promise.resolve({ topics: [mockMetadata] })
          });
        }
        if (url === '/content/cat1/topic1.md') {
          return Promise.resolve({ ok: false, status: 404 });
        }
        return Promise.reject(new Error('Not found'));
      });

      const result = await fetchTopicContent('cat1', 'topic1');
      expect(result).toBeNull();
    });
  });
});
