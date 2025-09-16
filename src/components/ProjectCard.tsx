import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  name: string;
  url?: string;
  technologies: string[];
  date: string;
  description: string[];
  className?: string;
}

const ProjectCard = ({ name, url, technologies, date, description, className }: ProjectCardProps) => {
  return (
    <Card className={cn("bg-gradient-card shadow-card hover:shadow-lg transition-all duration-300", className)}>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold">
              {url ? (
                <a 
                  href={url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  {name}
                </a>
              ) : (
                name
              )}
            </CardTitle>
            <div className="mt-2 space-y-1">
              {description.map((desc, index) => (
                <p key={index} className="text-sm text-text-light">{desc}</p>
              ))}
            </div>
          </div>
          <span className="text-sm text-text-light whitespace-nowrap">{date}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <Badge key={tech} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;