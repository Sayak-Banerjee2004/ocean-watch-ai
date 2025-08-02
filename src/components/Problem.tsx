const Problem = () => {
  const problems = [
    {
      emoji: "🐟",
      title: "Illegal Fishing",
      description: "Depletes vital fish stocks, threatening food security and local economies worth billions annually."
    },
    {
      emoji: "🛢️",
      title: "Environmental Disasters",
      description: "Oil spills and coral reef degradation cause irreversible damage, often going unnoticed for critical periods."
    },
    {
      emoji: "✈️",
      title: "Ineffective Patrols",
      description: "Traditional sea and air patrols are slow, costly, and can only cover a tiny fraction of our vast oceans."
    }
  ];

  return (
    <section id="problem" className="py-20 bg-card">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-primary">
            Our Oceans Are in Crisis
          </h3>
          <p className="text-lg text-muted-foreground mt-2">
            Current monitoring methods are too slow and expensive to be effective.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {problems.map((problem, index) => (
            <div key={index} className="p-6 card-hover bg-secondary rounded-lg">
              <div className="text-5xl mb-4">{problem.emoji}</div>
              <h4 className="text-xl font-bold mb-2 text-primary">{problem.title}</h4>
              <p className="text-primary-glow">{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Problem;