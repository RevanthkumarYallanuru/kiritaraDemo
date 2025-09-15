import React from 'react';
import { Calendar, TrendingUp, CheckCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { resortData } from '@/data/resortData';

const Progress = () => {
  const getStatusIcon = (completion: number) => {
    if (completion >= 100) return CheckCircle;
    if (completion > 0) return Clock;
    return TrendingUp;
  };

  const getStatusColor = (completion: number) => {
    if (completion >= 100) return 'text-green-500';
    if (completion > 50) return 'text-primary';
    if (completion > 0) return 'text-secondary';
    return 'text-muted-foreground';
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-dark">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-luxury mb-6">
            Construction Progress
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Track the development of your luxury investment. Transparent updates 
            on every milestone of the Kiritara Resort construction journey.
          </p>
        </div>
      </section>

      {/* Overall Progress */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-foreground mb-4">Overall Progress</h2>
              <p className="text-lg text-muted-foreground">Current construction status</p>
            </div>

            {/* Progress Ring */}
            <div className="flex justify-center mb-12">
              <div className="relative w-64 h-64">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  {/* Background Circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="hsl(var(--muted))"
                    strokeWidth="8"
                  />
                  {/* Progress Circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${25 * 2.83} ${100 * 2.83}`}
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary">25%</div>
                    <div className="text-sm text-muted-foreground">Complete</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="text-center p-6 rounded-2xl glass border border-primary/20">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-foreground mb-2">3</h3>
                <p className="text-muted-foreground">Milestones Completed</p>
              </div>
              <div className="text-center p-6 rounded-2xl glass border border-secondary/20">
                <Clock className="h-12 w-12 text-secondary mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-foreground mb-2">2</h3>
                <p className="text-muted-foreground">In Progress</p>
              </div>
              <div className="text-center p-6 rounded-2xl glass border border-accent/20">
                <TrendingUp className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-foreground mb-2">8</h3>
                <p className="text-muted-foreground">Upcoming Phases</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">Construction Timeline</h2>
              <p className="text-lg text-muted-foreground">
                Detailed progress updates with photos and milestones
              </p>
            </div>

            {/* Timeline */}
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>
              
              <div className="space-y-12">
                {resortData.progress.map((update, index) => {
                  const StatusIcon = getStatusIcon(update.completion);
                  const statusColor = getStatusColor(update.completion);
                  
                  return (
                    <div key={update.id} className="relative flex items-start space-x-8 animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                      {/* Timeline Icon */}
                      <div className={`relative z-10 p-3 rounded-full bg-card border-2 border-border ${statusColor}`}>
                        <StatusIcon className="h-6 w-6" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                          {/* Text Content */}
                          <div className="space-y-4">
                            <div className="flex items-center space-x-4">
                              <Calendar className="h-5 w-5 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">
                                {new Date(update.date).toLocaleDateString('en-IN', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </span>
                            </div>
                            
                            <h3 className="text-2xl font-bold text-foreground">
                              {update.title}
                            </h3>
                            
                            <p className="text-muted-foreground leading-relaxed">
                              {update.description}
                            </p>

                            {/* Progress Bar */}
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Progress</span>
                                <span className={statusColor}>{update.completion}%</span>
                              </div>
                              <div className="w-full bg-muted rounded-full h-2">
                                <div 
                                  className="bg-primary h-2 rounded-full transition-all duration-1000"
                                  style={{ width: `${update.completion}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>

                          {/* Image */}
                          <div className="aspect-video rounded-2xl overflow-hidden shadow-luxury">
                            <div className="w-full h-full bg-gradient-dark flex items-center justify-center">
                              <div className="text-center text-muted-foreground">
                                <StatusIcon className="h-16 w-16 mx-auto mb-4 opacity-50" />
                                <p className="text-sm">Progress Photo</p>
                                <p className="text-xs">Coming Soon</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Milestones */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Upcoming Milestones
            </h2>
            <p className="text-lg text-muted-foreground mb-12">
              What's coming next in our construction journey
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Structural Framework",
                  date: "Q4 2024",
                  description: "Main building structure and framework completion"
                },
                {
                  title: "Interior Design Phase",
                  date: "Q1 2025",
                  description: "Luxury interiors and premium finishing work"
                },
                {
                  title: "Amenities Installation",
                  date: "Q2 2025",
                  description: "Pool, spa, and recreational facility setup"
                },
                {
                  title: "Landscaping & Exteriors",
                  date: "Q3 2025",
                  description: "Gardens, pathways, and outdoor beautification"
                },
                {
                  title: "Final Testing & QA",
                  date: "Q4 2025",
                  description: "Systems testing and quality assurance"
                },
                {
                  title: "Grand Opening",
                  date: "Q1 2026",
                  description: "Resort launch and investor benefit activation"
                }
              ].map((milestone, index) => (
                <div key={index} className="p-6 rounded-2xl glass border border-border hover:border-primary/30 transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-4 bg-gradient-primary rounded-full flex items-center justify-center">
                      <Clock className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-primary font-medium mb-3">{milestone.date}</p>
                    <p className="text-sm text-muted-foreground">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <Button variant="luxury" size="lg">
                Get Progress Updates
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Progress;