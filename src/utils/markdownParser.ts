export interface BlogPost {
  id: number;
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
  featured: boolean;
  slug: string;
  content: string;
}

export function parseMarkdown(markdown: string, filename: string): BlogPost {
  const lines = markdown.split('\n');
  let currentSection = '';
  let title = '';
  let description = '';
  let date = '';
  let tags: string[] = [];
  let featured = false;
  let bodyStart = -1;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (line.startsWith('#title')) {
      currentSection = 'title';
      continue;
    } else if (line.startsWith('#description')) {
      currentSection = 'description';
      continue;
    } else if (line.startsWith('#date')) {
      currentSection = 'date';
      continue;
    } else if (line.startsWith('#tags')) {
      currentSection = 'tags';
      continue;
    } else if (line.startsWith('#featured')) {
      currentSection = 'featured';
      continue;
    } else if (line.startsWith('#body')) {
      bodyStart = i + 1;
      break;
    } else if (line && currentSection) {
      switch (currentSection) {
        case 'title':
          title = line;
          break;
        case 'description':
          description = line;
          break;
        case 'date':
          date = line;
          break;
        case 'tags':
          try {
            tags = JSON.parse(line);
          } catch {
            tags = line.split(',').map(tag => tag.trim().replace(/"/g, ''));
          }
          break;
        case 'featured':
          featured = line.toLowerCase() === 'true';
          break;
      }
    }
  }
  
  const content = bodyStart > -1 ? lines.slice(bodyStart).join('\n') : '';
  const slug = filename.replace('.md', '');
  
  // Estimate read time (assuming 200 words per minute)
  const wordCount = content.split(/\s+/).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200)) + ' min read';
  
  // Generate a simple numeric ID based on filename
  const id = filename.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  return {
    id,
    title,
    description,
    date,
    readTime,
    tags,
    featured,
    slug,
    content
  };
}

export function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}