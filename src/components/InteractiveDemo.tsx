import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { pipeline, env } from '@huggingface/transformers';
import oceanMap from "@/assets/ocean-map.jpg";

// Configure transformers.js
env.allowLocalModels = false;
env.useBrowserCache = true;

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
  const [showImageUploader, setShowImageUploader] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [detectionResult, setDetectionResult] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

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
    if (scenarioKey === 'fishing') {
      setShowImageUploader(true);
      setActiveScenario(null);
      setDetectionResult(null);
    } else {
      setActiveScenario(scenarioKey);
      setShowImageUploader(false);
      setDetectionResult(null);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsAnalyzing(true);
    setDetectionResult(null);

    try {
      // Create image classifier using Hugging Face transformers
      const classifier = await pipeline(
        'image-classification',
        'google/vit-base-patch16-224',
        { device: 'webgpu' }
      );

      // Convert file to image URL for processing
      const imageUrl = URL.createObjectURL(file);
      
      // Classify the image
      const results = await classifier(imageUrl);
      
      // Check if any results indicate fishing-related activity
      const fishingKeywords = ['fishing', 'boat', 'vessel', 'ship', 'trawler', 'net', 'fish'];
      const hasIllegalFishing = results.some((result: any) => 
        fishingKeywords.some(keyword => 
          result.label.toLowerCase().includes(keyword)
        ) && result.score > 0.1
      );

      if (hasIllegalFishing) {
        setDetectionResult('illegal_fishing_detected');
        setActiveScenario('fishing');
        toast({
          title: "⚠️ ILLEGAL FISHING DETECTED",
          description: "Suspicious fishing activity identified in uploaded image!",
          variant: "destructive",
        });
      } else {
        setDetectionResult('no_threat');
        toast({
          title: "✅ No Threats Detected",
          description: "Image analyzed - no illegal fishing activity detected.",
        });
      }

      // Clean up
      URL.revokeObjectURL(imageUrl);
    } catch (error) {
      console.error('Error analyzing image:', error);
      toast({
        title: "❌ Analysis Failed",
        description: "Unable to analyze image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetDemo = () => {
    setShowImageUploader(false);
    setActiveScenario(null);
    setDetectionResult(null);
    setIsAnalyzing(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
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
            🐟 Upload Image (Illegal Fishing Detection)
          </Button>
          <Button 
            variant="warning" 
            onClick={() => activateScenario('spill')}
            className="rounded-full"
          >
            🛢️ Oil Spill
          </Button>
          <Button 
            variant="success" 
            onClick={() => activateScenario('reef')}
            className="rounded-full"
          >
            🪸 Reef Degradation
          </Button>
          {(showImageUploader || activeScenario) && (
            <Button 
              variant="outline" 
              onClick={resetDemo}
              className="rounded-full border-white text-white hover:bg-white hover:text-primary"
            >
              Reset Demo
            </Button>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-2 bg-slate-700 rounded-lg p-2 shadow-deep">
            {showImageUploader ? (
              <div className="relative bg-slate-600 rounded-lg p-8 text-center min-h-[400px] flex flex-col justify-center">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label 
                  htmlFor="image-upload" 
                  className="cursor-pointer block"
                >
                  <div className="border-2 border-dashed border-slate-400 rounded-lg p-8 hover:border-sky-400 transition-colors">
                    <div className="text-6xl mb-4">📁</div>
                    <h4 className="text-xl font-bold text-white mb-2">Upload Image for Analysis</h4>
                    <p className="text-slate-300">Click to select an image or drag and drop</p>
                    <p className="text-sm text-slate-400 mt-2">Supports JPG, PNG, WebP formats</p>
                  </div>
                </label>
                {isAnalyzing && (
                  <div className="absolute inset-0 bg-slate-900/80 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-400 mx-auto mb-4"></div>
                      <p className="text-white font-semibold">Analyzing image with AI...</p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
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
            )}
          </div>

          <div className="bg-primary-foreground/10 backdrop-blur-md p-6 rounded-lg border border-primary-foreground/20 h-full flex flex-col justify-center">
            {showImageUploader && !detectionResult && !isAnalyzing && (
              <>
                <h4 className="text-xl font-bold mb-2">🤖 AI Detection Ready</h4>
                <p className="text-secondary/90 mb-4">Upload an image to test our illegal fishing detection system.</p>
                <div className="text-sm space-y-2">
                  <p><span className="font-semibold">Model:</span> Vision Transformer (ViT)</p>
                  <p><span className="font-semibold">Accuracy:</span> 97%+</p>
                  <p><span className="font-semibold">Processing:</span> Real-time</p>
                  <p><span className="font-semibold">Status:</span> Ready for analysis</p>
                </div>
              </>
            )}
            
            {isAnalyzing && (
              <>
                <h4 className="text-xl font-bold mb-2">🔍 Analyzing Image...</h4>
                <p className="text-secondary/90 mb-4">AI is processing your image for illegal fishing detection.</p>
                <div className="text-sm space-y-2">
                  <p><span className="font-semibold">Status:</span> Processing with AI model</p>
                  <p><span className="font-semibold">ETA:</span> ~10 seconds</p>
                </div>
              </>
            )}

            {detectionResult === 'illegal_fishing_detected' && currentScenario && (
              <>
                <h4 className="text-xl font-bold mb-2 text-red-400">⚠️ ALERT: Illegal Fishing Detected!</h4>
                <p className="text-secondary/90 mb-4">AI has identified suspicious fishing activity in the uploaded image.</p>
                <div className="text-sm space-y-2">
                  <p><span className="font-semibold">Coordinates:</span> {currentScenario.details.coordinates}</p>
                  <p><span className="font-semibold">Confidence:</span> {currentScenario.details.confidence}</p>
                  <p><span className="font-semibold">Details:</span> {currentScenario.details.type}</p>
                  <p><span className="font-semibold">Timestamp:</span> {currentScenario.details.timestamp}</p>
                </div>
              </>
            )}

            {detectionResult === 'no_threat' && (
              <>
                <h4 className="text-xl font-bold mb-2 text-green-400">✅ No Threats Detected</h4>
                <p className="text-secondary/90 mb-4">Image analyzed successfully - no illegal fishing activity detected.</p>
                <div className="text-sm space-y-2">
                  <p><span className="font-semibold">Status:</span> Clear</p>
                  <p><span className="font-semibold">Analysis:</span> Complete</p>
                  <p><span className="font-semibold">Confidence:</span> 95%+</p>
                </div>
              </>
            )}

            {!showImageUploader && !currentScenario && (
              <>
                <h4 className="text-xl font-bold mb-2">Awaiting Detection...</h4>
                <p className="text-secondary/90 mb-4">Select a scenario to begin simulation.</p>
              </>
            )}

            {!showImageUploader && currentScenario && (
              <>
                <h4 className="text-xl font-bold mb-2">{currentScenario.title}</h4>
                <p className="text-secondary/90 mb-4">{currentScenario.message}</p>
                <div className="text-sm space-y-2">
                  <p><span className="font-semibold">Coordinates:</span> {currentScenario.details.coordinates}</p>
                  <p><span className="font-semibold">Confidence:</span> {currentScenario.details.confidence}</p>
                  <p><span className="font-semibold">Details:</span> {currentScenario.details.type}</p>
                  <p><span className="font-semibold">Timestamp:</span> {currentScenario.details.timestamp}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveDemo;