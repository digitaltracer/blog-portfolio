import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, ArrowLeft } from "lucide-react";
import { loadBlogPosts, formatDate } from "@/data/blogLoader";
import { BlogPost } from "@/utils/markdownParser";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import 'highlight.js/styles/github-dark.css';

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    loadBlogPosts().then(posts => {
      const foundPost = posts.find(p => p.slug === slug);
      if (foundPost) {
        setPost(foundPost);
      } else {
        setNotFound(true);
      }
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Loading blog post...</h2>
          <p className="text-text-light">Please wait while we fetch the content.</p>
        </div>
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Blog post not found</h2>
          <p className="text-text-light mb-4">The blog post you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/blog')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Back Button - Fixed Position */}
      <div className="fixed top-6 left-6 z-50">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/blog')}
          className="bg-background/80 backdrop-blur-sm border border-border/50 hover:bg-background/90 transition-all duration-200"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Button>
      </div>

      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-muted/20 z-40">
        <div className="h-full bg-gradient-to-r from-primary to-primary/60 transition-all duration-150 ease-out w-0" />
      </div>

      {/* Article Container */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <article className="animate-fade-in">
          {/* Article Header */}
          <header className="text-center mb-16 pt-8">
            {post.featured && (
              <div className="flex justify-center mb-6">
                <Badge className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-4 py-2 text-sm font-medium">
                  ✨ Featured Post
                </Badge>
              </div>
            )}
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              {post.title}
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-10">
              {post.description}
            </p>
            
            {/* Meta Information */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-muted-foreground mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary/20 to-primary/10 flex items-center justify-center">
                  <CalendarDays size={18} />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider font-medium opacity-70">Published</div>
                  <time dateTime={post.date} className="text-sm font-medium">{formatDate(post.date)}</time>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-accent/20 to-accent/10 flex items-center justify-center">
                  <Clock size={18} />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider font-medium opacity-70">Read Time</div>
                  <span className="text-sm font-medium">{post.readTime}</span>
                </div>
              </div>
            </div>
            
            {/* Tags */}
            <div className="flex flex-wrap justify-center gap-3">
              {post.tags.map(tag => (
                <Badge 
                  key={tag} 
                  variant="outline" 
                  className="px-4 py-2 text-sm font-medium border-border/50 hover:border-border transition-colors duration-200 hover-scale"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </header>

          {/* Separator */}
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary/60 mx-auto mb-16 rounded-full" />

          {/* Article Content */}
          <div className="prose prose-xl max-w-none dark:prose-invert
            prose-headings:scroll-mt-20 prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground
            prose-h1:text-5xl prose-h1:mb-10 prose-h1:mt-12 prose-h1:leading-[1.1] prose-h1:font-black
            prose-h2:text-4xl prose-h2:mb-6 prose-h2:mt-12 prose-h2:leading-[1.2] prose-h2:border-b prose-h2:border-border/30 prose-h2:pb-4 prose-h2:font-bold
            prose-h3:text-3xl prose-h3:mb-4 prose-h3:mt-10 prose-h3:leading-[1.3] prose-h3:font-bold
            prose-h4:text-2xl prose-h4:mb-3 prose-h4:mt-8 prose-h4:leading-[1.4] prose-h4:font-semibold
            prose-h5:text-xl prose-h5:mb-3 prose-h5:mt-6 prose-h5:leading-[1.4] prose-h5:font-semibold
            prose-p:text-foreground/95 prose-p:leading-[1.6] prose-p:mb-6 prose-p:text-[1.125rem] prose-p:font-normal
            prose-li:text-foreground/95 prose-li:text-[1.125rem] prose-li:my-2 prose-li:leading-[1.5] prose-li:pl-1
            prose-ul:my-6 prose-ul:space-y-2 prose-ul:pl-6
            prose-ol:my-6 prose-ol:space-y-2 prose-ol:pl-6
            prose-strong:text-foreground prose-strong:font-semibold
            prose-em:text-foreground/90 prose-em:italic prose-em:font-medium
            prose-code:text-[0.875rem] prose-code:bg-muted/60 prose-code:px-2 prose-code:py-1 prose-code:rounded-md prose-code:font-mono prose-code:border prose-code:border-border/40 prose-code:text-primary
            prose-pre:!bg-slate-900 prose-pre:border prose-pre:border-border/30 prose-pre:rounded-xl prose-pre:!p-6 prose-pre:shadow-2xl prose-pre:overflow-x-auto prose-pre:relative prose-pre:my-6
            prose-blockquote:border-l-4 prose-blockquote:border-l-primary prose-blockquote:bg-muted/40 prose-blockquote:pl-6 prose-blockquote:py-4 prose-blockquote:my-8 prose-blockquote:rounded-r-lg prose-blockquote:italic prose-blockquote:text-foreground/90 prose-blockquote:text-[1.125rem] prose-blockquote:leading-[1.6]
            prose-a:text-primary prose-a:font-medium prose-a:no-underline hover:prose-a:underline prose-a:underline-offset-4 prose-a:decoration-2 hover:prose-a:decoration-primary/80 prose-a:transition-all prose-a:duration-200
            prose-table:border prose-table:border-collapse prose-table:shadow-lg prose-table:rounded-lg prose-table:overflow-hidden prose-table:my-6
            prose-th:border prose-th:border-border prose-th:bg-muted/60 prose-th:px-6 prose-th:py-4 prose-th:font-semibold prose-th:text-left prose-th:text-foreground
            prose-td:border prose-td:border-border prose-td:px-6 prose-td:py-4 prose-td:text-foreground/90
            prose-img:rounded-xl prose-img:shadow-xl prose-img:border prose-img:border-border/30 prose-img:my-8
            prose-hr:border-border/30 prose-hr:my-10
            [&>*]:mb-6 [&>ul]:space-y-2 [&>ol]:space-y-2">
            
            
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight, rehypeRaw]}
              components={{
                code({ node, inline, className, children, ...props }: any) {
                  const match = /language-(\w+)/.exec(className || '');
                  const language = match ? match[1] : '';
                  
                  if (!inline && match) {
                    return (
                      <div className="relative group">
                        <div className="flex items-center justify-between bg-slate-800 px-4 py-3 rounded-t-xl border border-border/30">
                          <span className="text-sm font-medium text-slate-300 capitalize">{language}</span>
                          <button 
                            className="text-slate-400 hover:text-slate-200 transition-colors duration-200 text-sm"
                            onClick={() => {
                              navigator.clipboard.writeText(String(children));
                            }}
                          >
                            Copy
                          </button>
                        </div>
                        <pre className="!mt-0 !rounded-t-none">
                          <code className={className} {...props}>
                            {children}
                          </code>
                        </pre>
                      </div>
                    );
                  }
                  
                  return (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
                h2({ children, ...props }) {
                  return (
                    <h2 className="group" {...props}>
                      {children}
                      <span className="ml-3 text-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200">#</span>
                    </h2>
                  );
                },
                h3({ children, ...props }) {
                  return (
                    <h3 className="group" {...props}>
                      {children}
                      <span className="ml-2 text-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200">#</span>
                    </h3>
                  );
                }
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </article>

        {/* Navigation */}
        <div className="mt-20 text-center border-t border-border/50 pt-12">
          <Button 
            onClick={() => navigate('/blog')} 
            variant="outline" 
            size="lg"
            className="px-8 py-3 text-base font-medium hover-scale bg-background/50 backdrop-blur-sm"
          >
            <ArrowLeft className="mr-3 h-5 w-5" />
            View All Posts
          </Button>
        </div>
      </div>
    </div>
  );
};


export default BlogPostPage;