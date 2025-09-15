import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PlayCircle, Star, ArrowRight, Sparkles } from 'lucide-react';
import { resortData } from '@/data/resortData';
import heroImage1 from '@/assets/hero-resort-1.jpg';
import heroImage2 from '@/assets/hero-resort-2.jpg';
import heroImage3 from '@/assets/hero-resort-3.jpg';

const HeroSection = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const heroImages = [heroImage1, heroImage2, heroImage3];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-background">
      {/* Background Images with Parallax Effect */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImage ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image}
              alt={`Resort view ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/40 to-background/80" />
          </div>
        ))}
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-float opacity-30">
        <Sparkles className="h-8 w-8 text-primary" />
      </div>
      <div className="absolute bottom-32 right-16 animate-float opacity-30" style={{ animationDelay: '2s' }}>
        <Star className="h-6 w-6 text-secondary" />
      </div>
      <div className="absolute top-1/3 right-20 animate-float opacity-30" style={{ animationDelay: '4s' }}>
        <Sparkles className="h-10 w-10 text-accent" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass border border-primary/30">
            <Star className="h-4 w-4 text-primary animate-pulse" />
            <span className="text-sm font-medium text-foreground">Premium Investment Opportunity</span>
          </div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
              <span className="text-luxury text-glow">{resortData.name}</span>
            </h1>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-light text-muted-foreground">
              {resortData.tagline}
            </h2>
          </div>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {resortData.description}
          </p>

          {/* Investment Highlight */}
          <div className="inline-flex items-center space-x-6 p-6 rounded-2xl glass border border-primary/20">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Starting Investment</p>
              <p className="text-3xl font-bold text-luxury">₹5,00,000</p>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Expected ROI</p>
              <p className="text-3xl font-bold text-secondary">12-28%</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button variant="hero" size="xl" asChild>
              <Link to="/memberships">
                Invest Now
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
            <Button variant="glass" size="xl" asChild>
              <Link to="/virtual-tour">
                <PlayCircle className="h-5 w-5 mr-2" />
                Virtual Tour
              </Link>
            </Button>
          </div>

          {/* Quick Navigation */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-8">
            <Link
              to="/gallery"
              className="px-6 py-3 rounded-full border border-primary/30 text-sm font-medium text-foreground hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
            >
              Gallery
            </Link>
            <Link
              to="/progress"
              className="px-6 py-3 rounded-full border border-primary/30 text-sm font-medium text-foreground hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
            >
              Progress
            </Link>
            <Link
              to="/about"
              className="px-6 py-3 rounded-full border border-primary/30 text-sm font-medium text-foreground hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
            >
              About Resort
            </Link>
          </div>
        </div>
      </div>

      {/* Image Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImage
                  ? 'bg-primary scale-110'
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;