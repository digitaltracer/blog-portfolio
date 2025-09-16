import { BlogPost, parseMarkdown } from '@/utils/markdownParser';

// Import all markdown files from the blog directory
const blogFiles = import.meta.glob('../blog/*.md', { 
  query: '?raw',
  import: 'default'
});

export async function loadBlogPosts(): Promise<BlogPost[]> {
  const posts: BlogPost[] = [];
  
  for (const [path, loader] of Object.entries(blogFiles)) {
    try {
      const content = await loader() as string;
      const filename = path.split('/').pop() || '';
      const post = parseMarkdown(content, filename);
      posts.push(post);
    } catch (error) {
      console.error(`Error loading blog post from ${path}:`, error);
    }
  }
  
  // Sort posts by date (newest first)
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export { formatDate } from '@/utils/markdownParser';