import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BookOpen, User, CalendarDays, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { loadBlogPosts, formatDate } from "@/data/blogLoader";
import { BlogPost } from "@/utils/markdownParser";
import { useEffect, useState } from "react";

const Index = () => {
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    loadBlogPosts().then(posts => {
      setFeaturedPosts(posts.filter(post => post.featured));
    });
  }, []);

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Adarsh N B
              </span>
            </h1>
            <p className="text-xl text-text-light mb-8 max-w-2xl mx-auto">
              Backend Engineer with 9+ years of experience building scalable distributed systems. 
              Passionate about Kafka, microservices, and clean architecture.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link to="/portfolio">
                  <User className="mr-2" size={20} />
                  View Portfolio
                  <ArrowRight className="ml-2" size={20} />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/blog">
                  <BookOpen className="mr-2" size={20} />
                  Read Blog
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Blog Posts */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Latest from the Blog
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="bg-gradient-card shadow-card hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <User className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Professional Portfolio</h3>
                <p className="text-text-light">
                  Showcase your skills, experience, and projects with a clean, 
                  professional layout that impresses recruiters and clients.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card shadow-card hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Developer Blog</h3>
                <p className="text-text-light">
                  Share your knowledge and experiences. Automatic updates from 
                  markdown files with GitHub Actions integration.
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Featured Blog Posts */}
          <div className="mt-12 space-y-6">
            {featuredPosts.map(post => (
              <Card key={post.id} className="bg-gradient-card shadow-card hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-primary text-primary-foreground">Featured</Badge>
                  </div>
                  <CardTitle className="text-2xl hover:text-primary transition-colors cursor-pointer">
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
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
