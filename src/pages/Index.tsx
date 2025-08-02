import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";
import InteractiveDemo from "@/components/InteractiveDemo";
import Features from "@/components/Features";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <InteractiveDemo />
        <Features />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
