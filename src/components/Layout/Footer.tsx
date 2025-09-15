import React from 'react';
import { Link } from 'react-router-dom';
import { Crown, Mail, Phone, MapPin, Instagram, Facebook, MessageCircle, Youtube } from 'lucide-react';
import { resortData } from '@/data/resortData';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Memberships', href: '/memberships' },
    { name: 'Progress', href: '/progress' },
    { name: 'Virtual Tour', href: '/virtual-tour' },
    { name: 'Contact', href: '/contact' },
  ];

  const socialIcons = {
    instagram: Instagram,
    facebook: Facebook,
    whatsapp: MessageCircle,
    youtube: Youtube,
  };

  return (
    <footer className="bg-card border-t border-border/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Crown className="h-8 w-8 text-primary" />
              <div>
                <h3 className="text-xl font-bold text-luxury">{resortData.name}</h3>
                <p className="text-sm text-muted-foreground">{resortData.tagline}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {resortData.description}
            </p>
            <div className="flex space-x-4">
              {Object.entries(resortData.socialMedia).map(([platform, url]) => {
                const Icon = socialIcons[platform as keyof typeof socialIcons];
                if (!Icon) return null;
                return (
                  <a
                    key={platform}
                    href={url as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <a 
                    href={`mailto:${resortData.contact.email}`}
                    className="text-sm text-foreground hover:text-primary transition-colors"
                  >
                    {resortData.contact.email}
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <a 
                    href={`tel:${resortData.contact.phone}`}
                    className="text-sm text-foreground hover:text-primary transition-colors"
                  >
                    {resortData.contact.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="text-sm text-foreground">
                    {resortData.contact.address.line1}<br />
                    {resortData.contact.address.line2}<br />
                    {resortData.contact.address.city}, {resortData.contact.address.state} {resortData.contact.address.pincode}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Investment Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Investment</h4>
            <div className="space-y-3">
              <div className="p-4 rounded-lg bg-gradient-primary/10 border border-primary/20">
                <p className="text-sm font-semibold text-primary">Starting Investment</p>
                <p className="text-2xl font-bold text-foreground">₹5,00,000</p>
                <p className="text-xs text-muted-foreground">Expected ROI: 12-28%</p>
              </div>
              <Link
                to="/memberships"
                className="block w-full text-center py-2 px-4 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300 text-sm font-medium"
              >
                View Investment Plans
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              <p>© {currentYear} {resortData.name}. All rights reserved.</p>
              <p className="mt-1">Registration: {resortData.legal.registrationNumber}</p>
            </div>
            <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
              {resortData.legal.approvals.map((approval, index) => (
                <span key={index} className="px-2 py-1 rounded bg-primary/10 text-primary">
                  {approval}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-4 text-xs text-muted-foreground text-center md:text-left">
            <p>{resortData.legal.investmentTerms}</p>
            <p className="mt-1">{resortData.legal.riskDisclaimer}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;