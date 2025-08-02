import { Button } from "@/components/ui/button";

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 text-center">
        <h3 className="text-3xl md:text-4xl font-bold mb-4">
          Join Us in Protecting Our Oceans
        </h3>
        <p className="text-lg max-w-2xl mx-auto mb-8 text-secondary/90 leading-relaxed">
          We are seeking strategic partners, clients, and investors to accelerate our mission. 
          Contact us to learn more or request a personalized demo.
        </p>
        <Button 
          variant="hero" 
          size="hero"
          onClick={() => window.location.href = 'mailto:contact@marineai.com'}
          className="bg-accent hover:bg-accent/90"
        >
          contact@marineai.com
        </Button>
      </div>
    </section>
  );
};

export default Contact;