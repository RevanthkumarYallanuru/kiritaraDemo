import React, { useState } from 'react';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { resortData } from '@/data/resortData';
import heroImage1 from '@/assets/hero-resort-1.jpg';
import heroImage2 from '@/assets/hero-resort-2.jpg';
import heroImage3 from '@/assets/hero-resort-3.jpg';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  
  // Enhanced gallery with imported images
  const galleryImages = [
    {
      id: 1,
      url: heroImage1,
      title: "Resort Aerial View",
      description: "Stunning aerial perspective of our futuristic resort complex with infinity pools and luxury suites."
    },
    {
      id: 2,
      url: heroImage2,
      title: "Luxury Interior Design",
      description: "Premium interiors featuring modern amenities, gold accents, and floor-to-ceiling windows."
    },
    {
      id: 3,
      url: heroImage3,
      title: "Presidential Suite",
      description: "Ultimate luxury accommodation with ocean views, premium furnishings, and private amenities."
    },
    // Add more placeholder images for variety
    ...Array.from({ length: 6 }, (_, i) => ({
      id: i + 4,
      url: `https://images.unsplash.com/photo-${1580000000000 + i * 1000000}?w=800&h=600&fit=crop&crop=center`,
      title: `Resort Feature ${i + 1}`,
      description: `Premium amenity showcase featuring world-class facilities and luxury design elements.`
    }))
  ];

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % galleryImages.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1);
    }
  };

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="py-20 bg-gradient-dark">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-luxury mb-6">
            Resort Gallery
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Explore the stunning architecture, luxury amenities, and breathtaking views 
            that make Kiritara Resort the ultimate investment opportunity.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {['All', 'Exterior', 'Interiors', 'Amenities', 'Suites'].map((category) => (
              <Button
                key={category}
                variant={category === 'All' ? 'luxury' : 'glass'}
                size="sm"
                className="text-sm"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Masonry Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {galleryImages.map((image, index) => (
              <div
                key={image.id}
                className="group relative overflow-hidden rounded-2xl cursor-pointer hover-3d animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => openLightbox(index)}
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {image.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {image.description}
                    </p>
                  </div>
                  
                  <div className="absolute top-4 right-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 flex items-center justify-center">
                      <ZoomIn className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div className="fixed inset-0 z-50 lightbox-overlay flex items-center justify-center p-4">
          <div className="relative max-w-7xl w-full max-h-full">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-background transition-colors"
            >
              <X className="h-6 w-6 text-foreground" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-background transition-colors"
            >
              <ChevronLeft className="h-6 w-6 text-foreground" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-background transition-colors"
            >
              <ChevronRight className="h-6 w-6 text-foreground" />
            </button>

            {/* Image */}
            <div className="relative">
              <img
                src={galleryImages[selectedImage].url}
                alt={galleryImages[selectedImage].title}
                className="w-full h-auto max-h-[80vh] object-contain rounded-2xl shadow-luxury"
              />
              
              {/* Image Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background/90 to-transparent rounded-b-2xl">
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {galleryImages[selectedImage].title}
                </h3>
                <p className="text-muted-foreground">
                  {galleryImages[selectedImage].description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;