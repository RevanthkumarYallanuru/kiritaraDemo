import React from 'react';
import { Building2, Waves, Sparkles, ChefHat, Palmtree, Plane } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { resortData } from '@/data/resortData';
import heroImage2 from '@/assets/hero-resort-2.jpg';

const About = () => {
  const iconMap = {
    Building2,
    Waves,
    Sparkles,
    ChefHat,
    Palmtree,
    Plane,
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage2}
            alt="Resort concept"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/70" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-luxury mb-6">
              About {resortData.name}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Experience the perfect fusion of cutting-edge architecture, luxury hospitality, 
              and smart investment opportunities. Our resort represents the future of premium 
              vacation ownership.
            </p>
            <Button variant="luxury" size="lg">
              Explore Investment Plans
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-luxury mb-4">
              World-Class Amenities
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every detail crafted for an exceptional experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resortData.features.map((feature, index) => {
              const IconComponent = iconMap[feature.icon as keyof typeof iconMap];
              return (
                <div
                  key={index}
                  className="card-luxury p-8 text-center hover-3d group animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-primary rounded-full flex items-center justify-center shadow-luxury group-hover:shadow-glow transition-all duration-300">
                    <IconComponent className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Investment Concept */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-luxury mb-6">
                  Smart Investment
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Our unique investment model combines luxury vacation ownership with 
                  guaranteed returns, creating a win-win opportunity for discerning investors.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 rounded-2xl glass border border-primary/20">
                  <p className="text-3xl font-bold text-primary mb-2">12-28%</p>
                  <p className="text-sm text-muted-foreground">Expected ROI</p>
                </div>
                <div className="text-center p-6 rounded-2xl glass border border-secondary/20">
                  <p className="text-3xl font-bold text-secondary mb-2">₹5L+</p>
                  <p className="text-sm text-muted-foreground">Starting Investment</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">Investment Benefits</h3>
                <ul className="space-y-3">
                  {[
                    "Guaranteed annual returns",
                    "Luxury vacation access",
                    "Property appreciation",
                    "Rental income sharing",
                    "Premium amenities usage",
                    "Resale opportunities"
                  ].map((benefit, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button variant="luxury" size="lg">
                Learn More About Investment
              </Button>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-luxury hover:shadow-glow transition-all duration-500">
                <div className="w-full h-full bg-gradient-dark flex items-center justify-center">
                  <div className="text-center text-foreground">
                    <Building2 className="h-24 w-24 mx-auto mb-4 text-primary animate-float" />
                    <p className="text-xl font-semibold">3D Resort Model</p>
                    <p className="text-muted-foreground">Interactive visualization coming soon</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Legal & Approvals */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Trusted & Approved
            </h2>
            <p className="text-lg text-muted-foreground">
              All necessary approvals and certifications in place
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {resortData.legal.approvals.map((approval, index) => (
              <div
                key={index}
                className="px-6 py-4 rounded-lg glass border border-primary/20 text-center hover:border-primary/40 transition-all duration-300"
              >
                <p className="font-semibold text-primary">{approval}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground max-w-3xl mx-auto">
              Registration Number: {resortData.legal.registrationNumber}
            </p>
            <p className="text-xs text-muted-foreground mt-4 max-w-4xl mx-auto">
              {resortData.legal.investmentTerms}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;