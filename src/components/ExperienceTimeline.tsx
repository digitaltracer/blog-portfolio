import { Card, CardContent } from "@/components/ui/card";

interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  dates: string;
  responsibilities: string[];
}

interface ExperienceTimelineProps {
  experiences: ExperienceItem[];
}

const ExperienceTimeline = ({ experiences }: ExperienceTimelineProps) => {
  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent"></div>
      
      <div className="space-y-12">
        {experiences.map((exp, index) => (
          <div key={index} className="relative animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
            {/* Timeline dot */}
            <div className={`absolute left-4 top-6 z-10 w-4 h-4 rounded-full border-4 transition-all duration-300 ${
              index === 0 
                ? "bg-primary border-primary shadow-lg shadow-primary/30 scale-125" 
                : "bg-background border-primary/30 hover:border-primary/60 hover:scale-110"
            }`}>
              {index === 0 && (
                <div className="absolute inset-0.5 rounded-full bg-primary-foreground animate-pulse"></div>
              )}
            </div>
            
            {/* Experience card */}
            <Card className="ml-16 bg-gradient-card shadow-card hover:shadow-lg transition-all duration-300 hover-scale">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground mb-1">{exp.title}</h3>
                    <p className="text-lg font-semibold text-primary mb-1">{exp.company}</p>
                    <p className="text-sm text-text-light flex items-center gap-1">
                      <span>📍</span>
                      {exp.location}
                    </p>
                  </div>
                  <div className="md:text-right">
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                      {exp.dates}
                    </span>
                  </div>
                </div>
                
                {/* Responsibilities */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground text-sm uppercase tracking-wide">Key Achievements</h4>
                  <ul className="space-y-2">
                    {exp.responsibilities.map((responsibility, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-text-light leading-relaxed">
                        <span className="flex-shrink-0 w-1.5 h-1.5 bg-primary rounded-full mt-2"></span>
                        <span>{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
      
      {/* Bottom fade effect */}
      <div className="absolute left-6 bottom-0 w-0.5 h-8 bg-gradient-to-b from-primary/20 to-transparent"></div>
    </div>
  );
};

export default ExperienceTimeline;