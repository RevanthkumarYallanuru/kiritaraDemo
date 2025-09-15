import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, MessageCircle, Clock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { resortData } from '@/data/resortData';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    investmentInterest: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate email sending (in production, this would connect to your backend)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would typically send the email to revanthkumaryallanuru103@gmail.com
      // using your preferred email service (EmailJS, Nodemailer, etc.)
      
      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for your interest. We'll get back to you within 24 hours.",
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        investmentInterest: ''
      });
    } catch (error) {
      toast({
        title: "Error Sending Message",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-dark">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-luxury mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Ready to start your luxury investment journey? Get in touch with our 
            expert team for personalized guidance and exclusive opportunities.
          </p>
        </div>
      </section>

      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  Get In Touch
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Our dedicated team is here to answer your questions about investment 
                  opportunities, resort amenities, and membership benefits.
                </p>
              </div>

              {/* Contact Methods */}
              <div className="space-y-6">
                <div className="flex items-start space-x-4 p-6 rounded-2xl glass border border-primary/20 hover:border-primary/40 transition-all duration-300">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Email Us</h3>
                    <a 
                      href={`mailto:${resortData.contact.email}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {resortData.contact.email}
                    </a>
                    <p className="text-sm text-muted-foreground mt-1">
                      Response within 24 hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-6 rounded-2xl glass border border-secondary/20 hover:border-secondary/40 transition-all duration-300">
                  <div className="p-3 rounded-lg bg-secondary/10">
                    <Phone className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Call Us</h3>
                    <a 
                      href={`tel:${resortData.contact.phone}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {resortData.contact.phone}
                    </a>
                    <p className="text-sm text-muted-foreground mt-1">
                      Mon-Sat: 9:00 AM - 7:00 PM
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-6 rounded-2xl glass border border-accent/20 hover:border-accent/40 transition-all duration-300">
                  <div className="p-3 rounded-lg bg-accent/10">
                    <MapPin className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Visit Us</h3>
                    <p className="text-muted-foreground">
                      {resortData.contact.address.line1}<br />
                      {resortData.contact.address.line2}<br />
                      {resortData.contact.address.city}, {resortData.contact.address.state} {resortData.contact.address.pincode}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      By appointment only
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 rounded-2xl glass border border-border">
                  <Clock className="h-8 w-8 text-primary mx-auto mb-3" />
                  <p className="text-2xl font-bold text-foreground">24hrs</p>
                  <p className="text-sm text-muted-foreground">Response Time</p>
                </div>
                <div className="text-center p-6 rounded-2xl glass border border-border">
                  <User className="h-8 w-8 text-secondary mx-auto mb-3" />
                  <p className="text-2xl font-bold text-foreground">500+</p>
                  <p className="text-sm text-muted-foreground">Happy Investors</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="card-luxury p-8">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Send Us a Message
                </h2>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll get back to you with detailed 
                  information about investment opportunities.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <label htmlFor="investmentInterest" className="block text-sm font-medium text-foreground mb-2">
                      Investment Interest
                    </label>
                    <select
                      id="investmentInterest"
                      name="investmentInterest"
                      value={formData.investmentInterest}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                    >
                      <option value="">Select investment tier</option>
                      <option value="silver">Silver Tier (₹5L)</option>
                      <option value="gold">Gold Tier (₹12L)</option>
                      <option value="platinum">Platinum Tier (₹25L)</option>
                      <option value="elite">Elite Tier (₹50L)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 resize-vertical"
                    placeholder="Tell us about your investment goals and any questions you have..."
                  />
                </div>

                <Button
                  type="submit"
                  variant="luxury"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground mr-2" />
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>

                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    By submitting this form, you agree to receive communications about 
                    investment opportunities at Kiritara Resort.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Need Immediate Assistance?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Connect with us instantly through your preferred communication channel
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <a
                href={`tel:${resortData.contact.phone}`}
                className="p-8 rounded-2xl glass border border-primary/20 hover:border-primary hover:shadow-luxury transition-all duration-300 group"
              >
                <Phone className="h-12 w-12 text-primary mx-auto mb-4 group-hover:animate-bounce" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Call Now</h3>
                <p className="text-muted-foreground">Speak with our investment advisor</p>
              </a>

              <a
                href={resortData.socialMedia.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="p-8 rounded-2xl glass border border-secondary/20 hover:border-secondary hover:shadow-luxury transition-all duration-300 group"
              >
                <MessageCircle className="h-12 w-12 text-secondary mx-auto mb-4 group-hover:animate-bounce" />
                <h3 className="text-lg font-semibold text-foreground mb-2">WhatsApp</h3>
                <p className="text-muted-foreground">Quick chat with our team</p>
              </a>

              <a
                href={`mailto:${resortData.contact.email}`}
                className="p-8 rounded-2xl glass border border-accent/20 hover:border-accent hover:shadow-luxury transition-all duration-300 group"
              >
                <Mail className="h-12 w-12 text-accent mx-auto mb-4 group-hover:animate-bounce" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Email</h3>
                <p className="text-muted-foreground">Detailed investment information</p>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;