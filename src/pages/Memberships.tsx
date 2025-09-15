import React, { useState } from 'react';
import { Check, Star, Crown, Gem, Zap, ArrowRight, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { resortData, formatPrice } from '@/data/resortData';

const Memberships = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const tierIcons = {
    silver: Star,
    gold: Crown,
    platinum: Gem,
    elite: Zap,
  };

  const tierColors = {
    silver: 'border-slate-300 bg-slate-50/10',
    gold: 'border-yellow-400 bg-yellow-400/10',
    platinum: 'border-purple-400 bg-purple-400/10',
    elite: 'border-cyan-400 bg-cyan-400/10',
  };

  const calculateProjectedReturns = (plan: any) => {
    const minReturn = plan.priceNumeric * (parseInt(plan.expectedROI.split('-')[0]) / 100);
    const maxReturn = plan.priceNumeric * (parseInt(plan.expectedROI.split('-')[1]) / 100);
    return { min: minReturn, max: maxReturn };
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-dark">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass border border-primary/30 mb-6">
              <Calculator className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Smart Investment Calculator</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-luxury mb-6">
              Investment Memberships
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Choose your investment tier and start earning guaranteed returns while enjoying 
              luxury resort privileges. Starting from just ₹5,00,000 with up to 28% ROI.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
              <div className="text-center">
                <p className="text-4xl font-bold text-primary">12-28%</p>
                <p className="text-sm text-muted-foreground">Expected ROI Range</p>
              </div>
              <div className="w-px h-12 bg-border hidden sm:block" />
              <div className="text-center">
                <p className="text-4xl font-bold text-secondary">₹5L+</p>
                <p className="text-sm text-muted-foreground">Minimum Investment</p>
              </div>
              <div className="w-px h-12 bg-border hidden sm:block" />
              <div className="text-center">
                <p className="text-4xl font-bold text-accent">3-10 Years</p>
                <p className="text-sm text-muted-foreground">Investment Terms</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Plans */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {resortData.investmentPlans.map((plan, index) => {
              const IconComponent = tierIcons[plan.id as keyof typeof tierIcons];
              const projectedReturns = calculateProjectedReturns(plan);
              const isPopular = plan.highlights.includes('Most Popular');
              const isPremium = plan.highlights.includes('Premium Choice');
              
              return (
                <div
                  key={plan.id}
                  className={`relative tier-card p-8 rounded-3xl border-2 transition-all duration-500 hover:scale-105 animate-fade-in ${
                    selectedPlan === plan.id ? 'shadow-glow border-primary' : 'card-luxury'
                  } ${tierColors[plan.id as keyof typeof tierColors]}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Popular Badge */}
                  {isPopular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="px-4 py-1 bg-primary text-primary-foreground rounded-full text-sm font-semibold">
                        Most Popular
                      </div>
                    </div>
                  )}

                  {/* Premium Badge */}
                  {isPremium && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="px-4 py-1 bg-secondary text-secondary-foreground rounded-full text-sm font-semibold">
                        Premium Choice
                      </div>
                    </div>
                  )}

                  {/* Header */}
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-primary rounded-full flex items-center justify-center shadow-luxury">
                      <IconComponent className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                    <div className="text-4xl font-bold text-luxury mb-2">{plan.price}</div>
                    <p className="text-sm text-muted-foreground">{plan.duration} Investment</p>
                  </div>

                  {/* ROI Highlight */}
                  <div className="text-center mb-8 p-4 rounded-2xl glass border border-primary/20">
                    <p className="text-lg font-bold text-primary mb-1">{plan.expectedROI} ROI</p>
                    <p className="text-xs text-muted-foreground">
                      ₹{Math.round(projectedReturns.min / 100000)}L - ₹{Math.round(projectedReturns.max / 100000)}L annual returns
                    </p>
                  </div>

                  {/* Features */}
                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start space-x-3">
                        <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Button */}
                  <Button
                    variant={selectedPlan === plan.id ? 'luxury' : 'investment'}
                    className="w-full"
                    onClick={() => setSelectedPlan(selectedPlan === plan.id ? null : plan.id)}
                  >
                    {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>

                  {/* Highlights */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {plan.highlights.map((highlight, highlightIndex) => (
                      <span
                        key={highlightIndex}
                        className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Investment Calculator */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-luxury mb-6">
              Investment Calculator
            </h2>
            <p className="text-lg text-muted-foreground mb-12">
              Calculate your potential returns with our transparent investment model
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {resortData.investmentPlans.slice(0, 3).map((plan) => {
                const returns = calculateProjectedReturns(plan);
                const annualMin = Math.round(returns.min / 100000);
                const annualMax = Math.round(returns.max / 100000);
                
                return (
                  <div key={plan.id} className="p-8 rounded-2xl glass border border-primary/20">
                    <h3 className="text-xl font-semibold text-foreground mb-4">{plan.name}</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Investment:</span>
                        <span className="font-semibold text-foreground">{plan.price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Annual Returns:</span>
                        <span className="font-semibold text-primary">₹{annualMin}L - ₹{annualMax}L</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">ROI:</span>
                        <span className="font-semibold text-secondary">{plan.expectedROI}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Resort Access:</span>
                        <span className="font-semibold text-accent">{plan.features[0].split('(')[1]?.replace(')', '') || 'Premium'}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Ready to Invest?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join our exclusive community of investors and start earning guaranteed returns 
              while enjoying luxury resort privileges.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="hero" size="xl">
                Start Your Investment
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <Button variant="glass" size="xl">
                Schedule Consultation
              </Button>
            </div>

            <div className="mt-12 text-sm text-muted-foreground">
              <p>{resortData.legal.investmentTerms}</p>
              <p className="mt-2">{resortData.legal.riskDisclaimer}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Memberships;