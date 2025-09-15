import React from 'react';
import { MapPin, Navigation, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { resortData } from '@/data/resortData';

const LocationMap = () => {
  const { coordinates, address, phone, email } = resortData.contact;
  
  const googleMapsUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${coordinates.lat},${coordinates.lng}&zoom=15`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${coordinates.lat},${coordinates.lng}`;

  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-luxury mb-4">
            Prime Location
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Strategically located in the heart of luxury, offering easy access to premium amenities and breathtaking views.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Map */}
          <div className="relative">
            <div className="aspect-video rounded-2xl overflow-hidden glass border border-primary/20 shadow-luxury">
              {/* Interactive Map Placeholder */}
              <div className="w-full h-full bg-gradient-dark flex items-center justify-center relative">
                <div className="text-center space-y-4">
                  <MapPin className="h-16 w-16 text-primary mx-auto animate-bounce" />
                  <div>
                    <p className="text-xl font-semibold text-foreground">Kiritara Resort Location</p>
                    <p className="text-muted-foreground">
                      {address.city}, {address.state}
                    </p>
                  </div>
                  <Button variant="luxury" asChild>
                    <a href={directionsUrl} target="_blank" rel="noopener noreferrer">
                      <Navigation className="h-4 w-4 mr-2" />
                      Get Directions
                    </a>
                  </Button>
                </div>
                
                {/* Coordinates overlay */}
                <div className="absolute top-4 right-4 bg-background/80 rounded-lg px-3 py-2 backdrop-blur-sm">
                  <p className="text-xs text-muted-foreground">
                    {coordinates.lat}°N, {coordinates.lng}°E
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Location Details */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Address</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {address.line1}<br />
                    {address.line2}<br />
                    {address.city}, {address.state} {address.pincode}<br />
                    {address.country}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-lg bg-secondary/10 border border-secondary/20">
                  <Phone className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Contact</h3>
                  <div className="space-y-1">
                    <a 
                      href={`tel:${phone}`}
                      className="block text-muted-foreground hover:text-primary transition-colors"
                    >
                      {phone}
                    </a>
                    <a 
                      href={`mailto:${email}`}
                      className="block text-muted-foreground hover:text-primary transition-colors"
                    >
                      {email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Location Features */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Location Advantages</h3>
              <div className="grid grid-cols-1 gap-3">
                {[
                  "15 minutes from city center",
                  "Private beach access",
                  "Helicopter landing pad",
                  "Premium shopping district nearby",
                  "International airport connectivity",
                  "Golf course within resort"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <p className="text-muted-foreground">{feature}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="luxury" asChild>
                <a href={directionsUrl} target="_blank" rel="noopener noreferrer">
                  <Navigation className="h-4 w-4 mr-2" />
                  Get Directions
                </a>
              </Button>
              <Button variant="glass" asChild>
                <a href={`tel:${phone}`}>
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationMap;