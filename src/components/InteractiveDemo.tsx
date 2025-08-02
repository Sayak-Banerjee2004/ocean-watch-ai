import { useState } from "react";
import { Button } from "@/components/ui/button";
import oceanMap from "@/assets/ocean-map.jpg";

interface Scenario {
  dotPosition: { top: string; left: string };
  title: string;
  message: string;
  details: {
    coordinates: string;
    confidence: string;
    type: string;
    timestamp: string;
  };
}

const InteractiveDemo = () => {
  const [activeScenario, setActiveScenario] = useState<string | null>(null);

  const scenarios: Record<string, Scenario> = {
    fishing: {
      dotPosition: { top: '45%', left: '60%' },
      title: 'ALERT: Illegal Fishing Vessel Detected',
      message: 'A vessel has been detected operating in a restricted marine protected area.',
      details: {
        coordinates: '14.123 N, 121.456 W',
        confidence: '97%',
        type: 'Trawler (unregistered)',
        timestamp: new Date().toUTCString()
      }
    },
    spill: {
      dotPosition: { top: '65%', left: '30%' },
      title: 'ALERT: Potential Oil Spill Detected',
      message: 'An anomalous dark slick consistent with an oil spill has been identified.',
      details: {
        coordinates: '13.887 N, 120.912 W',
        confidence: '94%',
        type: 'Estimated Area: 2.5 sq km',
        timestamp: new Date().toUTCString()
      }
    },
    reef: {
      dotPosition: { top: '30%', left: '75%' },
      title: 'ALERT: Coral Bleaching Event Detected',
      message: 'Significant change in coral color detected, indicating a potential bleaching event.',
      details: {
        coordinates: '15.054 N, 122.118 W',
        confidence: '91%',
        type: 'Affected Area: ~15 hectares',
        timestamp: new Date().toUTCString()
      }
    }
  };

  const activateScenario = (scenarioKey: string) => {
    setActiveScenario(scenarioKey);
  };

  const currentScenario = activeScenario ? scenarios[activeScenario] : null;

  return (
    <section id="demo" className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold">
            Live Demo: AI Agent in Action
          </h3>
          <p className="text-lg text-secondary/90 mt-2">
            Select a threat to simulate its detection by our AI agent.
          </p>
        </div>

        <div className="flex justify-center flex-wrap gap-4 mb-8">
          <Button 
            variant="warning" 
            onClick={() => activateScenario('fishing')}
            className="rounded-full"
          >
            Illegal Fishing
          </Button>
          <Button 
            variant="warning" 
            onClick={() => activateScenario('spill')}
            className="rounded-full bg-warning hover:bg-warning/90"
          >
            Oil Spill
          </Button>
          <Button 
            variant="success" 
            onClick={() => activateScenario('reef')}
            className="rounded-full"
          >
            Reef Degradation
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-2 bg-slate-700 rounded-lg p-2 shadow-deep">
            <div className="relative">
              <img 
                src={oceanMap} 
                alt="Ocean surveillance map" 
                className="rounded w-full h-auto"
              />
              {currentScenario && (
                <div 
                  className="absolute w-4 h-4 bg-red-500 rounded-full border-2 border-white pulse-dot"
                  style={{
                    top: currentScenario.dotPosition.top,
                    left: currentScenario.dotPosition.left,
                    transform: 'translate(-50%, -50%)'
                  }}
                />
              )}
            </div>
          </div>

          <div className="bg-primary-foreground/10 backdrop-blur-md p-6 rounded-lg border border-primary-foreground/20 h-full flex flex-col justify-center">
            <h4 className="text-xl font-bold mb-2">
              {currentScenario ? currentScenario.title : 'Awaiting Detection...'}
            </h4>
            <p className="text-secondary/90 mb-4">
              {currentScenario ? currentScenario.message : 'Select a scenario to begin simulation.'}
            </p>
            
            {currentScenario && (
              <div className="text-sm space-y-2">
                <p>
                  <span className="font-semibold">Coordinates:</span> {currentScenario.details.coordinates}
                </p>
                <p>
                  <span className="font-semibold">Confidence:</span> {currentScenario.details.confidence}
                </p>
                <p>
                  <span className="font-semibold">Details:</span> {currentScenario.details.type}
                </p>
                <p>
                  <span className="font-semibold">Timestamp:</span> {currentScenario.details.timestamp}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveDemo;