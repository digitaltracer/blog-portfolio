import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User, BookOpen, Home } from "lucide-react";

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/portfolio", label: "Portfolio", icon: User },
    { path: "/blog", label: "Blog", icon: BookOpen },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Home
          </Link>
          
          <div className="flex items-center gap-2">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Button
                key={path}
                variant={location.pathname === path ? "default" : "ghost"}
                size="sm"
                asChild
                className={location.pathname === path ? "bg-primary text-primary-foreground" : ""}
              >
                <Link to={path} className="flex items-center gap-2">
                  <Icon size={16} />
                  {label}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
