import { cn } from "@/lib/utils";

interface SkillBadgeProps {
  name: string;
  variant?: "python" | "scala" | "java" | "default";
  className?: string;
}

const SkillBadge = ({ name, variant = "default", className }: SkillBadgeProps) => {
  const variants = {
    python: "bg-skill-python border-skill-python/30",
    scala: "bg-skill-scala border-skill-scala/30", 
    java: "bg-skill-java border-skill-java/30",
    default: "bg-secondary border-border",
  };

  return (
    <div
      className={cn(
        "w-24 h-24 rounded-full border-2 flex items-center justify-center text-sm font-medium text-foreground transition-all hover:scale-105 shadow-soft",
        variants[variant],
        className
      )}
    >
      {name}
    </div>
  );
};

export default SkillBadge;