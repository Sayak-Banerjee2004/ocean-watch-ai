import { useState } from "react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-primary/80 backdrop-blur-lg sticky top-0 z-50 text-primary-foreground">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold">Marine AI</h1>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
          <button onClick={() => scrollToSection('problem')} className="nav-link">
            The Problem
          </button>
          <button onClick={() => scrollToSection('solution')} className="nav-link">
            Solution
          </button>
          <button onClick={() => scrollToSection('demo')} className="nav-link">
            Live Demo
          </button>
          <Button 
            variant="ocean" 
            onClick={() => scrollToSection('contact')}
            className="rounded-full"
          >
            Contact Us
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="focus:outline-none text-3xl"
          >
            ≡
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden px-6 pb-4 space-y-2">
          <button 
            onClick={() => scrollToSection('problem')} 
            className="block nav-link w-full text-left"
          >
            The Problem
          </button>
          <button 
            onClick={() => scrollToSection('solution')} 
            className="block nav-link w-full text-left"
          >
            Solution
          </button>
          <button 
            onClick={() => scrollToSection('demo')} 
            className="block nav-link w-full text-left"
          >
            Live Demo
          </button>
          <button 
            onClick={() => scrollToSection('contact')} 
            className="block nav-link w-full text-left"
          >
            Contact Us
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;