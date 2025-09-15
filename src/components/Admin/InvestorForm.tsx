import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import {
  saveInvestor,
  updateInvestor,
  getMembershipPlans,
  generateInstallmentSchedule,
  type Investor,
  type MembershipPlan
} from '@/lib/adminUtils';

interface InvestorFormProps {
  investor?: Investor | null;
  onClose: () => void;
}

const InvestorForm: React.FC<InvestorFormProps> = ({ investor, onClose }) => {
  const [membershipPlans, setMembershipPlans] = useState<MembershipPlan[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    membershipPlan: '',
    downpaymentPaid: 0,
    installmentType: 'monthly' as 'monthly' | 'quarterly',
    joinDate: new Date().toISOString().split('T')[0],
    status: 'active' as 'active' | 'inactive'
  });

  useEffect(() => {
    setMembershipPlans(getMembershipPlans());
    
    if (investor) {
      setFormData({
        name: investor.name,
        email: investor.email,
        phone: investor.phone,
        membershipPlan: investor.membershipPlan,
        downpaymentPaid: investor.downpaymentPaid,
        installmentType: investor.installmentType,
        joinDate: investor.joinDate,
        status: investor.status
      });
    }
  }, [investor]);

  const selectedPlan = membershipPlans.find(p => p.id === formData.membershipPlan);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'downpaymentPaid' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!selectedPlan) {
        throw new Error('Please select a membership plan');
      }

      const investorData = {
        ...formData,
        totalInvestment: selectedPlan.totalAmount,
        totalPaid: formData.downpaymentPaid,
        pendingAmount: selectedPlan.totalAmount - formData.downpaymentPaid,
        nextDueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 30 days from now
      };

      if (investor) {
        // Update existing investor
        updateInvestor(investor.id, investorData);
        toast({
          title: 'Investor updated',
          description: 'Investor information has been successfully updated.',
        });
      } else {
        // Create new investor
        const newInvestor = saveInvestor(investorData);
        
        // Generate installment schedule for new investor
        generateInstallmentSchedule(newInvestor);
        
        toast({
          title: 'Investor added',
          description: 'New investor has been successfully added and installment schedule generated.',
        });
      }

      onClose();
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Something went wrong',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onClose}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {investor ? 'Edit Investor' : 'Add New Investor'}
          </h1>
          <p className="text-muted-foreground">
            {investor ? 'Update investor information and settings' : 'Add a new investor to the resort'}
          </p>
        </div>
      </div>

      {/* Form */}
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter email address"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter phone number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Join Date *
              </label>
              <input
                type="date"
                name="joinDate"
                value={formData.joinDate}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          {/* Investment Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Investment Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Membership Plan *
                </label>
                <select
                  name="membershipPlan"
                  value={formData.membershipPlan}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Select a plan</option>
                  {membershipPlans.map(plan => (
                    <option key={plan.id} value={plan.id}>
                      {plan.name} - ₹{(plan.totalAmount / 100000).toFixed(1)}L
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Installment Type *
                </label>
                <select
                  name="installmentType"
                  value={formData.installmentType}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Down Payment Paid *
                </label>
                <input
                  type="number"
                  name="downpaymentPaid"
                  value={formData.downpaymentPaid}
                  onChange={handleInputChange}
                  required
                  min="0"
                  max={selectedPlan?.totalAmount || 0}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter down payment amount"
                />
                {selectedPlan && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Recommended: ₹{(selectedPlan.totalAmount * selectedPlan.downpaymentPercent / 100).toLocaleString()}
                    ({selectedPlan.downpaymentPercent}% of ₹{(selectedPlan.totalAmount / 100000).toFixed(1)}L)
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          {/* Investment Summary */}
          {selectedPlan && (
            <Card className="p-4 bg-muted/30">
              <h4 className="font-semibold text-foreground mb-3">Investment Summary</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Total Investment:</p>
                  <p className="font-medium text-foreground">₹{(selectedPlan.totalAmount / 100000).toFixed(1)}L</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Down Payment:</p>
                  <p className="font-medium text-foreground">₹{(formData.downpaymentPaid / 100000).toFixed(2)}L</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Remaining Amount:</p>
                  <p className="font-medium text-foreground">
                    ₹{((selectedPlan.totalAmount - formData.downpaymentPaid) / 100000).toFixed(2)}L
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">{formData.installmentType === 'monthly' ? 'Monthly' : 'Quarterly'} Payment:</p>
                  <p className="font-medium text-foreground">
                    ₹{((formData.installmentType === 'monthly' ? selectedPlan.monthlyInstallment : selectedPlan.quarterlyInstallment) / 1000).toFixed(0)}K
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  {investor ? 'Update' : 'Save'} Investor
                </>
              )}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default InvestorForm;