import React from 'react';
import HeroSection from '@/components/Hero/HeroSection';
import LocationMap from '@/components/Map/LocationMap';
import { resortData } from '@/data/resortData';

const Index = () => {
  return (
    <div className="pt-16">
      <HeroSection />
      <LocationMap />
    </div>
  );
};

export default Index;
