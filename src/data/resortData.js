// Kiritara Resort - Main Data Configuration
// Update this file to modify all resort information across the website

export const resortData = {
  // Basic Resort Information
  name: "Kiritara Resort",
  tagline: "Where Luxury Meets Innovation",
  description: "Experience the future of luxury hospitality with cutting-edge architecture, premium amenities, and exceptional investment opportunities.",
  
  // Contact Information
  contact: {
    email: "revanthkumaryallanuru103@gmail.com",
    phone: "+91 98765 43210",
    address: {
      line1: "Luxury Resort Boulevard",
      line2: "Premium District, Hyderabad",
      city: "Hyderabad",
      state: "Telangana",
      pincode: "500001",
      country: "India"
    },
    coordinates: {
      lat: 17.4065,
      lng: 78.4772
    }
  },

  // Social Media Links
  socialMedia: {
    instagram: "https://instagram.com/kiritara_resort",
    facebook: "https://facebook.com/kiritara.resort",
    whatsapp: "https://wa.me/919876543210",
    youtube: "https://youtube.com/@kiritara-resort"
  },

  // Investment Plans (Starting from ₹5 Lakhs)
  investmentPlans: [
    {
      id: "silver",
      name: "Silver Tier",
      price: "₹5,00,000",
      priceNumeric: 500000,
      duration: "3 Years",
      expectedROI: "12-15%",
      features: [
        "Luxury Suite Access (7 days/year)",
        "Premium Dining Credits",
        "Spa & Wellness Benefits",
        "Priority Booking",
        "Annual Investment Returns"
      ],
      highlights: ["Most Popular", "Best Value"],
      color: "silver"
    },
    {
      id: "gold",
      name: "Gold Tier",
      price: "₹12,00,000",
      priceNumeric: 1200000,
      duration: "5 Years",
      expectedROI: "15-18%",
      features: [
        "Premium Suite Access (14 days/year)",
        "VIP Dining & Bar Credits",
        "Full Spa Access",
        "Concierge Services",
        "Investment Appreciation",
        "Rental Income Share"
      ],
      highlights: ["Premium Choice", "Higher Returns"],
      color: "gold"
    },
    {
      id: "platinum",
      name: "Platinum Tier",
      price: "₹25,00,000",
      priceNumeric: 2500000,
      duration: "7 Years",
      expectedROI: "18-22%",
      features: [
        "Luxury Villa Access (21 days/year)",
        "Unlimited Premium Services",
        "Private Chef Services",
        "Helicopter Transfers",
        "Maximum Investment Returns",
        "Property Ownership Benefits"
      ],
      highlights: ["Exclusive", "Maximum ROI"],
      color: "platinum"
    },
    {
      id: "elite",
      name: "Elite Tier",
      price: "₹50,00,000",
      priceNumeric: 5000000,
      duration: "10 Years",
      expectedROI: "22-28%",
      features: [
        "Presidential Suite Access (30 days/year)",
        "Complete Resort Privileges",
        "Personal Butler Service",
        "Private Jet Access",
        "Business Partnership Opportunities",
        "Lifetime Benefits"
      ],
      highlights: ["Ultra Exclusive", "Partnership Level"],
      color: "elite"
    }
  ],

  // Resort Features & Amenities
  features: [
    {
      title: "Futuristic Architecture",
      description: "Cutting-edge design with smart technology integration",
      icon: "Building2"
    },
    {
      title: "Infinity Pools",
      description: "Multiple levels of luxury pools with ocean views",
      icon: "Waves"
    },
    {
      title: "World-Class Spa",
      description: "Premium wellness and rejuvenation facilities",
      icon: "Sparkles"
    },
    {
      title: "Gourmet Dining",
      description: "Multiple restaurants with international cuisine",
      icon: "ChefHat"
    },
    {
      title: "Private Beach",
      description: "Exclusive beachfront with water sports",
      icon: "Palmtree"
    },
    {
      title: "Helipad Access",
      description: "Premium transportation for elite guests",
      icon: "Plane"
    }
  ],

  // Gallery Images (Update these paths as needed)
  gallery: [
    {
      id: 1,
      url: "/src/assets/hero-resort-1.jpg",
      title: "Resort Aerial View",
      description: "Stunning aerial perspective of our futuristic resort"
    },
    {
      id: 2,
      url: "/src/assets/hero-resort-2.jpg",
      title: "Luxury Interior",
      description: "Premium interiors with modern amenities"
    },
    {
      id: 3,
      url: "/src/assets/hero-resort-3.jpg",
      title: "Presidential Suite",
      description: "Ultimate luxury accommodation experience"
    }
  ],

  // Construction Progress Updates
  progress: [
    {
      id: 1,
      date: "2024-09-01",
      title: "Foundation Complete",
      description: "Strong foundation laid for the future of luxury",
      completion: 25,
      image: "/api/placeholder/800/600"
    },
    {
      id: 2,
      date: "2024-07-15",
      title: "Architectural Planning",
      description: "Detailed blueprints and 3D modeling completed",
      completion: 15,
      image: "/api/placeholder/800/600"
    },
    {
      id: 3,
      date: "2024-06-01",
      title: "Project Launch",
      description: "Kiritara Resort project officially commenced",
      completion: 5,
      image: "/api/placeholder/800/600"
    }
  ],

  // Virtual Tour Configuration
  virtualTour: {
    mainVideo: "https://youtu.be/fJtCKwEkN4U?si=o2_6fYJi7Bf4IkvF",
    highlights: [
      {
        title: "Grand Entrance",
        description: "Welcome to luxury redefined"
      },
      {
        title: "Infinity Pool Complex",
        description: "Multi-level aquatic paradise"
      },
      {
        title: "Presidential Suites",
        description: "Ultimate in luxury accommodation"
      },
      {
        title: "Spa & Wellness Center",
        description: "Rejuvenation and relaxation"
      }
    ]
  },

  // SEO & Meta Information
  seo: {
    title: "Kiritara Resort - Luxury Investment Opportunities | Premium Hospitality",
    description: "Invest in India's most futuristic luxury resort. Starting from ₹5 Lakhs with 12-28% ROI. Premium suites, world-class amenities, and guaranteed returns.",
    keywords: "luxury resort investment, premium hospitality, resort investment India, luxury vacation investment, high ROI investment, premium real estate",
    author: "Kiritara Resort"
  },

  // Legal & Investment Information
  legal: {
    registrationNumber: "KR-2024-001",
    approvals: ["RERA Approved", "Environmental Clearance", "Tourism Board Certified"],
    investmentTerms: "All investments are subject to terms and conditions. Returns are projected based on market analysis.",
    riskDisclaimer: "Investment involves market risks. Please read all investment documents carefully."
  }
};

// Helper functions for data manipulation
export const getInvestmentPlanById = (id) => {
  return resortData.investmentPlans.find(plan => plan.id === id);
};

export const getProgressByCompletion = () => {
  return resortData.progress.sort((a, b) => b.completion - a.completion);
};

export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price);
};

export default resortData;