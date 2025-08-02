import aiDashboard from "@/assets/ai-dashboard.jpg";

const Solution = () => {
  return (
    <section id="solution" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Real-Time AI Surveillance
            </h3>
            <p className="text-lg text-primary-glow mb-6 leading-relaxed">
              We have developed an AI platform that acts as a 24/7 watchdog for our oceans. 
              Our system analyzes satellite imagery (both Optical and Radar) in real-time to 
              automatically detect anomalies and instantly send alerts with precise location data to authorities.
            </p>
            
            <div className="bg-card p-6 rounded-lg shadow-surface border border-border">
              <h4 className="font-bold text-lg mb-2 text-primary-glow">How It Works</h4>
              <ol className="list-decimal list-inside space-y-2 text-primary">
                <li>
                  <span className="font-semibold">Analyze Data:</span> Our AI continuously ingests 
                  live feeds from satellite providers.
                </li>
                <li>
                  <span className="font-semibold">Detect Threats:</span> It identifies illegal vessels, 
                  oil slicks, and changes in reef health with high accuracy.
                </li>
                <li>
                  <span className="font-semibold">Alert Authorities:</span> A verified alert with 
                  coordinates and evidence is sent directly to the response team in minutes.
                </li>
              </ol>
            </div>
          </div>
          
          <div className="p-4 bg-card rounded-lg shadow-ocean">
            <img 
              src={aiDashboard} 
              alt="AI Dashboard Interface" 
              className="rounded-md w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solution;