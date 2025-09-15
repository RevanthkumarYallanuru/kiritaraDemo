import React, { useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { resortData } from '@/data/resortData';

const VirtualTour = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedHighlight, setSelectedHighlight] = useState(0);

  const tourHighlights = resortData.virtualTour.highlights;

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-dark">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-luxury mb-6">
            Virtual Resort Tour
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Experience Kiritara Resort from the comfort of your home. Take an immersive 
            360° tour through our luxury facilities and premium amenities.
          </p>
        </div>
      </section>

      {/* Main Tour Interface */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Video Player */}
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-luxury mb-8">
              <div className="w-full h-full bg-gradient-dark flex items-center justify-center relative">
                {/* Video Placeholder */}
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-6 bg-primary/20 rounded-full flex items-center justify-center border-2 border-primary animate-pulse">
                      <Play className="h-12 w-12 text-primary ml-1" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      Immersive Resort Experience
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Click to start your virtual tour
                    </p>
                    <Button 
                      variant="luxury" 
                      size="lg"
                      onClick={() => setIsPlaying(!isPlaying)}
                    >
                      {isPlaying ? (
                        <>
                          <Pause className="h-5 w-5 mr-2" />
                          Pause Tour
                        </>
                      ) : (
                        <>
                          <Play className="h-5 w-5 mr-2" />
                          Start Virtual Tour
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {/* Tour Controls */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="glass"
                      size="sm"
                      onClick={() => setIsPlaying(!isPlaying)}
                    >
                      {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="glass"
                      size="sm"
                      onClick={() => setIsMuted(!isMuted)}
                    >
                      {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </Button>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button variant="glass" size="sm">
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                    <Button variant="glass" size="sm">
                      <Maximize className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/50">
                  <div className="h-full bg-primary w-1/3 transition-all duration-300"></div>
                </div>
              </div>
            </div>

            {/* Tour Navigation */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tourHighlights.map((highlight, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedHighlight(index)}
                  className={`p-6 rounded-2xl text-left transition-all duration-300 hover:scale-105 ${
                    selectedHighlight === index
                      ? 'bg-primary/20 border-2 border-primary shadow-luxury'
                      : 'glass border border-border hover:border-primary/50'
                  }`}
                >
                  <div className="w-12 h-12 mb-4 bg-gradient-primary rounded-full flex items-center justify-center">
                    <Camera className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {highlight.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {highlight.description}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Features */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Interactive Tour Features
            </h2>
            <p className="text-lg text-muted-foreground mb-12">
              Explore every detail with our advanced virtual tour technology
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 rounded-2xl glass border border-primary/20 hover:border-primary/40 transition-all duration-300">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-primary rounded-full flex items-center justify-center">
                  <Camera className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">360° Views</h3>
                <p className="text-muted-foreground">
                  Complete panoramic views of every room and facility
                </p>
              </div>

              <div className="p-8 rounded-2xl glass border border-secondary/20 hover:border-secondary/40 transition-all duration-300">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-secondary to-primary rounded-full flex items-center justify-center">
                  <Play className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Guided Tours</h3>
                <p className="text-muted-foreground">
                  Professional narration highlighting key features
                </p>
              </div>

              <div className="p-8 rounded-2xl glass border border-accent/20 hover:border-accent/40 transition-all duration-300">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-accent to-primary rounded-full flex items-center justify-center">
                  <Maximize className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">HD Quality</h3>
                <p className="text-muted-foreground">
                  Ultra-high resolution imagery for crystal clear details
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Sections */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Tour Experiences
              </h2>
              <p className="text-lg text-muted-foreground">
                Choose your preferred way to explore the resort
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Self-Guided Tour */}
              <div className="space-y-6">
                <div className="aspect-video rounded-2xl overflow-hidden shadow-luxury">
                  <div className="w-full h-full bg-gradient-dark flex items-center justify-center">
                    <div className="text-center">
                      <Play className="h-16 w-16 mx-auto mb-4 text-primary animate-pulse" />
                      <p className="text-lg font-semibold text-foreground">Self-Guided Tour</p>
                      <p className="text-sm text-muted-foreground">Explore at your own pace</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-foreground">Self-Guided Experience</h3>
                  <p className="text-muted-foreground">
                    Navigate through the resort independently with interactive hotspots 
                    and detailed information about each area.
                  </p>
                  <Button variant="luxury">
                    Start Self-Guided Tour
                  </Button>
                </div>
              </div>

              {/* Live Virtual Tour */}
              <div className="space-y-6">
                <div className="aspect-video rounded-2xl overflow-hidden shadow-luxury">
                  <div className="w-full h-full bg-gradient-dark flex items-center justify-center">
                    <div className="text-center">
                      <Camera className="h-16 w-16 mx-auto mb-4 text-secondary animate-bounce" />
                      <p className="text-lg font-semibold text-foreground">Live Virtual Tour</p>
                      <p className="text-sm text-muted-foreground">Guided by our experts</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-foreground">Live Guided Tour</h3>
                  <p className="text-muted-foreground">
                    Join our resort specialists for a personalized live tour with 
                    Q&A sessions about investment opportunities.
                  </p>
                  <Button variant="premium">
                    Schedule Live Tour
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Ready to Experience Luxury?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              After exploring our virtual tour, take the next step towards 
              securing your investment in this exceptional resort.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="hero" size="xl">
                Invest Now
              </Button>
              <Button variant="glass" size="xl">
                Schedule Site Visit
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VirtualTour;