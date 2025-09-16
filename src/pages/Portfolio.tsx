import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Mail, Phone, Linkedin, Github, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import SkillBadge from "@/components/SkillBadge";
import ProjectCard from "@/components/ProjectCard";
import ExperienceTimeline from "@/components/ExperienceTimeline";

interface PortfolioData {
  name: string;
  contact: {
    phone: string;
    email: string;
    linkedin: string;
    github: string;
  };
  education: Array<{
    university: string;
    location: string;
    degree: string;
    date: string;
  }>;
  summary: string;
  experience: Array<{
    title: string;
    company: string;
    location: string;
    dates: string;
    responsibilities: string[];
  }>;
  projects: Array<{
    name: string;
    url?: string;
    technologies: string[];
    date: string;
    description: string[];
  }>;
  skills: {
    Languages: string[];
    "Soft Skills": string[];
    Others: string[];
  };
}

const Portfolio = () => {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/portfolio.json')
      .then(response => response.json())
      .then(data => {
        setPortfolioData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading portfolio data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-light">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (!portfolioData) {
    return (
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive">Error loading portfolio data</p>
        </div>
      </div>
    );
  }

  // Get user's initials for avatar
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Profile */}
          <div className="lg:col-span-1">
            <Card className="bg-gradient-card shadow-card sticky top-24">
              <CardContent className="p-6">
                {/* Profile Image */}
                <div className="relative mb-6">
                  <div className="w-32 h-32 mx-auto relative">
                    <div className="absolute inset-0 bg-primary rounded-full transform rotate-12 opacity-20"></div>
                    <div className="relative w-full h-full bg-gradient-primary rounded-full shadow-avatar flex items-center justify-center text-2xl font-bold text-primary-foreground">
                      {getInitials(portfolioData.name)}
                    </div>
                  </div>
                </div>

                {/* Basic Info */}
                <div className="text-center mb-6">
                  <p className="text-text-light text-sm mb-1">
                    {portfolioData.experience[0]?.title || "Backend Engineer"}
                  </p>
                  <h1 className="text-2xl font-bold text-foreground mb-2">{portfolioData.name}</h1>
                  <div className="flex items-center justify-center gap-1 text-text-light mb-3">
                    <MapPin size={14} />
                    <span className="text-sm">
                      {portfolioData.experience[0]?.location || "Location"}
                    </span>
                  </div>
                  <Badge variant="secondary" className="mb-4">Available for hire</Badge>
                  
                  {/* Contact Info */}
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-center gap-2 text-text-light">
                      <Mail size={14} />
                      <a href={`mailto:${portfolioData.contact.email}`} className="hover:text-primary transition-colors">
                        {portfolioData.contact.email}
                      </a>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-text-light">
                      <Phone size={14} />
                      <span>{portfolioData.contact.phone}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-text-light">
                      <Linkedin size={14} />
                      <a 
                        href={`https://${portfolioData.contact.linkedin}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors"
                      >
                        LinkedIn
                      </a>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-text-light">
                      <Github size={14} />
                      <a 
                        href={`https://${portfolioData.contact.github}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors"
                      >
                        GitHub
                      </a>
                    </div>
                  </div>
                </div>

                {/* Company */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-text-light mb-1">COMPANY</h3>
                  <p className="text-foreground font-medium">
                    {portfolioData.experience[0]?.company || "Current Company"}
                  </p>
                </div>

                {/* Education */}
                {portfolioData.education && portfolioData.education.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-text-light mb-2">EDUCATION</h3>
                    {portfolioData.education.map((edu, index) => (
                      <div key={index} className="mb-2">
                        <p className="text-foreground font-medium">{edu.university}</p>
                        <p className="text-sm text-text-light">{edu.degree}</p>
                        <p className="text-sm text-text-light">{edu.location} • {edu.date}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Focus */}
                <div>
                  <h3 className="text-sm font-medium text-text-light mb-1">FOCUSED ON</h3>
                  <p className="text-foreground">Distributed systems & Backend Engineering</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Skills */}
            <section>
              <h2 className="text-sm font-medium text-text-light mb-4">TOP SKILLS</h2>
              <div className="flex gap-6 mb-8 flex-wrap">
                {portfolioData.skills.Languages.slice(0, 3).map((skill, index) => {
                  const variants = ["python", "scala", "java"] as const;
                  return (
                    <SkillBadge 
                      key={skill} 
                      name={skill} 
                      variant={variants[index] || "default"} 
                    />
                  );
                })}
              </div>

              <h2 className="text-sm font-medium text-text-light mb-4">MAIN TOOLS & TECHNOLOGIES</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div>
                  <h3 className="text-sm font-medium text-foreground mb-2">Languages</h3>
                  <div className="flex gap-2 flex-wrap">
                    {portfolioData.skills.Languages.map(skill => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-foreground mb-2">Tools & Platforms</h3>
                  <div className="flex gap-2 flex-wrap">
                    {portfolioData.skills.Others.map(skill => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-foreground mb-2">Soft Skills</h3>
                  <div className="flex gap-2 flex-wrap">
                    {portfolioData.skills["Soft Skills"].map(skill => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* About */}
            <section>
              <h2 className="text-sm font-medium text-text-light mb-4">ABOUT</h2>
              <p className="text-foreground leading-relaxed">
                {portfolioData.summary}
              </p>
            </section>

            {/* Projects */}
            <section>
              <h2 className="text-sm font-medium text-text-light mb-4">PROJECTS</h2>
              <div className="space-y-4">
                {portfolioData.projects.map((project, index) => (
                  <ProjectCard
                    key={index}
                    name={project.name}
                    url={project.url}
                    description={project.description}
                    date={project.date}
                    technologies={project.technologies}
                  />
                ))}
              </div>
            </section>

            {/* Experience */}
            <section>
              <h2 className="text-sm font-medium text-text-light mb-6">EXPERIENCE</h2>
              <ExperienceTimeline experiences={portfolioData.experience} />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;