import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, DollarSign, Users, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import {
  getMembershipPlans,
  saveMembershipPlan,
  updateMembershipPlan,
  deleteMembershipPlan,
  formatCurrency,
  type MembershipPlan
} from '@/lib/adminUtils';

const MembershipManagement = () => {
  const [plans, setPlans] = useState<MembershipPlan[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPlan, setEditingPlan] = useState<MembershipPlan | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    totalAmount: 0,
    downpaymentPercent: 20,
    monthlyInstallment: 0,
    quarterlyInstallment: 0,
    benefits: [''],
    duration: '',
    roi: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    loadPlans();
  }, []);

  useEffect(() => {
    if (editingPlan) {
      setFormData({
        name: editingPlan.name,
        totalAmount: editingPlan.totalAmount,
        downpaymentPercent: editingPlan.downpaymentPercent,
        monthlyInstallment: editingPlan.monthlyInstallment,
        quarterlyInstallment: editingPlan.quarterlyInstallment,
        benefits: editingPlan.benefits.length > 0 ? editingPlan.benefits : [''],
        duration: editingPlan.duration,
        roi: editingPlan.roi
      });
    } else {
      resetForm();
    }
  }, [editingPlan]);

  const loadPlans = () => {
    const data = getMembershipPlans();
    setPlans(data);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      totalAmount: 0,
      downpaymentPercent: 20,
      monthlyInstallment: 0,
      quarterlyInstallment: 0,
      benefits: [''],
      duration: '',
      roi: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name.includes('Amount') || name.includes('Percent') || name.includes('Installment')
        ? Number(value) 
        : value
    }));
  };

  const handleBenefitChange = (index: number, value: string) => {
    const newBenefits = [...formData.benefits];
    newBenefits[index] = value;
    setFormData(prev => ({ ...prev, benefits: newBenefits }));
  };

  const addBenefit = () => {
    setFormData(prev => ({ ...prev, benefits: [...prev.benefits, ''] }));
  };

  const removeBenefit = (index: number) => {
    const newBenefits = formData.benefits.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, benefits: newBenefits.length > 0 ? newBenefits : [''] }));
  };

  const calculateInstallments = () => {
    if (formData.totalAmount > 0) {
      const downpayment = (formData.totalAmount * formData.downpaymentPercent) / 100;
      const remainingAmount = formData.totalAmount - downpayment;
      
      // Estimate installments (can be customized)
      const monthly = Math.round(remainingAmount / 24); // 2 years
      const quarterly = Math.round(remainingAmount / 8); // 2 years
      
      setFormData(prev => ({
        ...prev,
        monthlyInstallment: monthly,
        quarterlyInstallment: quarterly
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const cleanedBenefits = formData.benefits.filter(b => b.trim() !== '');
      const planData = {
        ...formData,
        benefits: cleanedBenefits
      };

      if (editingPlan) {
        updateMembershipPlan(editingPlan.id, planData);
        toast({
          title: 'Plan updated',
          description: 'Membership plan has been successfully updated.',
        });
      } else {
        saveMembershipPlan(planData);
        toast({
          title: 'Plan created',
          description: 'New membership plan has been successfully created.',
        });
      }

      setShowForm(false);
      setEditingPlan(null);
      loadPlans();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save membership plan.',
        variant: 'destructive'
      });
    }
  };

  const handleEdit = (plan: MembershipPlan) => {
    setEditingPlan(plan);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this membership plan?')) {
      const success = deleteMembershipPlan(id);
      if (success) {
        loadPlans();
        toast({
          title: 'Plan deleted',
          description: 'Membership plan has been successfully deleted.',
        });
      }
    }
  };

  if (showForm) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {editingPlan ? 'Edit Membership Plan' : 'Create New Plan'}
            </h1>
            <p className="text-muted-foreground">
              {editingPlan ? 'Update plan details and settings' : 'Create a new investment tier for investors'}
            </p>
          </div>
          <Button variant="outline" onClick={() => {
            setShowForm(false);
            setEditingPlan(null);
          }}>
            Cancel
          </Button>
        </div>

        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Plan Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="e.g., Silver Tier, Gold Tier"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Total Investment Amount (₹) *
                </label>
                <input
                  type="number"
                  name="totalAmount"
                  value={formData.totalAmount}
                  onChange={handleInputChange}
                  onBlur={calculateInstallments}
                  required
                  min="0"
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="e.g., 500000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Down Payment (%) *
                </label>
                <input
                  type="number"
                  name="downpaymentPercent"
                  value={formData.downpaymentPercent}
                  onChange={handleInputChange}
                  onBlur={calculateInstallments}
                  required
                  min="0"
                  max="100"
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Duration *
                </label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="e.g., 3 Years, 5 Years"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Expected ROI *
                </label>
                <input
                  type="text"
                  name="roi"
                  value={formData.roi}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="e.g., 12-15%, 18-22%"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Monthly Installment (₹)
                </label>
                <input
                  type="number"
                  name="monthlyInstallment"
                  value={formData.monthlyInstallment}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="mt-1 text-primary"
                  onClick={calculateInstallments}
                >
                  Auto Calculate
                </Button>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Quarterly Installment (₹)
                </label>
                <input
                  type="number"
                  name="quarterlyInstallment"
                  value={formData.quarterlyInstallment}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Plan Benefits
              </label>
              <div className="space-y-2">
                {formData.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={benefit}
                      onChange={(e) => handleBenefitChange(index, e.target.value)}
                      className="flex-1 px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Enter benefit..."
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeBenefit(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addBenefit}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Benefit
                </Button>
              </div>
            </div>

            {/* Investment Summary */}
            {formData.totalAmount > 0 && (
              <Card className="p-4 bg-muted/30">
                <h4 className="font-semibold text-foreground mb-3">Investment Breakdown</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Total Amount:</p>
                    <p className="font-medium text-foreground">{formatCurrency(formData.totalAmount)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Down Payment:</p>
                    <p className="font-medium text-foreground">
                      {formatCurrency((formData.totalAmount * formData.downpaymentPercent) / 100)}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Remaining Amount:</p>
                    <p className="font-medium text-foreground">
                      {formatCurrency(formData.totalAmount - ((formData.totalAmount * formData.downpaymentPercent) / 100))}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Monthly Payment:</p>
                    <p className="font-medium text-foreground">{formatCurrency(formData.monthlyInstallment)}</p>
                  </div>
                </div>
              </Card>
            )}

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => {
                setShowForm(false);
                setEditingPlan(null);
              }}>
                Cancel
              </Button>
              <Button type="submit">
                {editingPlan ? 'Update' : 'Create'} Plan
              </Button>
            </div>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Membership Plans</h1>
          <p className="text-muted-foreground">Manage investment tiers and pricing</p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Plan
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Crown className="h-8 w-8 text-primary" />
            <div>
              <p className="text-2xl font-bold text-foreground">{plans.length}</p>
              <p className="text-sm text-muted-foreground">Active Plans</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <DollarSign className="h-8 w-8 text-green-600" />
            <div>
              <p className="text-2xl font-bold text-foreground">
                ₹{Math.min(...plans.map(p => p.totalAmount / 100000)).toFixed(1)}L
              </p>
              <p className="text-sm text-muted-foreground">Starting From</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Users className="h-8 w-8 text-blue-600" />
            <div>
              <p className="text-2xl font-bold text-foreground">
                ₹{Math.max(...plans.map(p => p.totalAmount / 100000)).toFixed(1)}L
              </p>
              <p className="text-sm text-muted-foreground">Premium Tier</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card key={plan.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => handleEdit(plan)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleDelete(plan.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="space-y-3 mb-4">
              <div>
                <p className="text-2xl font-bold text-primary">
                  {formatCurrency(plan.totalAmount)}
                </p>
                <p className="text-sm text-muted-foreground">{plan.duration} • {plan.roi} ROI</p>
              </div>
              
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Down Payment</p>
                  <p className="font-medium text-foreground">
                    {formatCurrency((plan.totalAmount * plan.downpaymentPercent) / 100)}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Monthly</p>
                  <p className="font-medium text-foreground">
                    {formatCurrency(plan.monthlyInstallment)}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <h4 className="font-semibold text-foreground mb-2">Benefits</h4>
              <ul className="space-y-1">
                {plan.benefits.slice(0, 3).map((benefit, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-center">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                    {benefit}
                  </li>
                ))}
                {plan.benefits.length > 3 && (
                  <li className="text-sm text-primary">
                    +{plan.benefits.length - 3} more benefits
                  </li>
                )}
              </ul>
            </div>
          </Card>
        ))}
      </div>

      {plans.length === 0 && (
        <Card className="p-12 text-center">
          <Crown className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No membership plans</h3>
          <p className="text-muted-foreground mb-6">
            Create your first membership plan to start accepting investments
          </p>
          <Button onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create First Plan
          </Button>
        </Card>
      )}
    </div>
  );
};

export default MembershipManagement;