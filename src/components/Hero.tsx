import { Button } from "@/components/ui/button";
import oceanHero from "@/assets/ocean-hero.jpg";

const Hero = () => {
  const scrollToDemo = () => {
    const element = document.getElementById('demo');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      className="relative text-primary-foreground min-h-screen flex items-center"
      style={{
        backgroundImage: `var(--gradient-deep-ocean), url(${oceanHero})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="container mx-auto px-6 py-24 md:py-32 text-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
          Instant Eyes on the Entire Ocean
        </h2>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-secondary/90 leading-relaxed">
          Our AI-powered platform analyzes satellite data in real-time to detect illegal fishing, 
          oil spills, and reef degradation, enabling authorities to protect our most vital resource.
        </p>
        <Button 
          variant="hero" 
          size="hero"
          onClick={scrollToDemo}
          className="animate-pulse hover:animate-none"
        >
          See a Live Demo
        </Button>
      </div>
    </section>
  );
};

export default Hero;