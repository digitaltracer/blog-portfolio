import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock } from "lucide-react";
import { loadBlogPosts, formatDate } from "@/data/blogLoader";
import { BlogPost } from "@/utils/markdownParser";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadBlogPosts().then(posts => {
      setBlogPosts(posts);
      setLoading(false);
    });
  }, []);

  const handlePostClick = (slug: string) => {
    navigate(`/blog/${slug}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Loading blog posts...</h2>
          <p className="text-text-light">Please wait while we fetch the latest content.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Development Blog
          </h1>
          <p className="text-text-light text-lg max-w-2xl mx-auto">
            Thoughts, insights, and experiences from the world of backend development, 
            distributed systems, and software architecture.
          </p>
        </div>

        {/* Featured Post */}
        {blogPosts.filter(post => post.featured).map(post => (
          <Card 
            key={post.id} 
            className="mb-8 bg-gradient-card shadow-card hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary cursor-pointer"
            onClick={() => handlePostClick(post.slug)}
          >
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-primary text-primary-foreground">Featured</Badge>
                <Badge variant="outline">Latest</Badge>
              </div>
              <CardTitle className="text-2xl hover:text-primary transition-colors">
                {post.title}
              </CardTitle>
              <CardDescription className="text-base leading-relaxed">
                {post.description}
              </CardDescription>
              <div className="flex items-center gap-4 text-sm text-text-light mt-4">
                <div className="flex items-center gap-1">
                  <CalendarDays size={14} />
                  {formatDate(post.date)}
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  {post.readTime}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Regular Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.filter(post => !post.featured).map(post => (
            <Card 
              key={post.id} 
              className="bg-gradient-card shadow-card hover:shadow-lg transition-all duration-300 cursor-pointer group"
              onClick={() => handlePostClick(post.slug)}
            >
              <CardHeader>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {post.title}
                </CardTitle>
                <CardDescription className="line-clamp-3">
                  {post.description}
                </CardDescription>
                <div className="flex items-center gap-4 text-sm text-text-light">
                  <div className="flex items-center gap-1">
                    <CalendarDays size={12} />
                    {formatDate(post.date)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={12} />
                    {post.readTime}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1">
                  {post.tags.slice(0, 3).map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {post.tags.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{post.tags.length - 3}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Blog;