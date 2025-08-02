const Features = () => {
  const features = [
    {
      emoji: "🛰️",
      title: "Multi-Source Data",
      description: "Integrates both Optical and Synthetic Aperture Radar (SAR) data for all-weather, day-and-night monitoring."
    },
    {
      emoji: "🧠",
      title: "Proprietary AI Models",
      description: "Our models are trained on vast, diverse datasets, leading to industry-leading accuracy and fewer false positives."
    },
    {
      emoji: "⚡",
      title: "Instant Alerts",
      description: "From detection to alert in minutes, providing actionable intelligence when it matters most."
    },
    {
      emoji: "📈",
      title: "Scalable & Global",
      description: "Our cloud-based architecture allows for monitoring of any marine area on Earth, from small reserves to entire oceans."
    }
  ];

  return (
    <section id="features" className="py-20 bg-card">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-primary">
            Key Features & Technology
          </h3>
          <p className="text-lg text-muted-foreground mt-2">
            Powered by cutting-edge technology for unparalleled performance.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="p-6 text-center card-hover bg-secondary rounded-lg border border-border"
            >
              <div className="text-4xl mb-3">{feature.emoji}</div>
              <h4 className="font-bold text-lg text-primary mb-2">{feature.title}</h4>
              <p className="text-sm text-primary-glow">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;