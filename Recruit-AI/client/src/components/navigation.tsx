import { Link, useLocation } from "wouter";
import logoImage from "@assets/Gemini_Generated_Image_cjy2wtcjy2wtcjy2_1765374075392.png";

const navLinks = [
  { id: "home", href: "/screening", label: "Home" },
  { id: "candidates", href: "/candidate", label: "Candidates" },
  { id: "screening", href: "/screening", label: "Screening" },
];

export default function Navigation() {
  const [location] = useLocation();

  return (
    <nav className="sticky top-0 z-50 h-16 border-b border-border bg-background" data-testid="navigation">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        <Link href="/screening" className="flex items-center gap-3">
          <img 
            src={logoImage} 
            alt="Recruit-AI Logo" 
            className="h-10 w-auto"
            data-testid="img-logo"
          />
        </Link>

        <div className="flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              className={`text-sm font-medium transition-colors hover-elevate active-elevate-2 px-3 py-2 rounded-md ${
                location === link.href
                  ? "text-foreground"
                  : "text-muted-foreground"
              }`}
              data-testid={`link-${link.label.toLowerCase()}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
