import React, { useState, useEffect } from 'react';
import { ArrowLeft, Edit, Calendar, CreditCard, User, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  getInstallments,
  getPayments,
  getMembershipPlans,
  formatCurrency,
  formatDate,
  type Investor,
  type Installment,
  type Payment
} from '@/lib/adminUtils';

interface InvestorDetailsProps {
  investor: Investor;
  onClose: () => void;
  onEdit: () => void;
}

const InvestorDetails: React.FC<InvestorDetailsProps> = ({ investor, onClose, onEdit }) => {
  const [installments, setInstallments] = useState<Installment[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [membershipPlan, setMembershipPlan] = useState<any>(null);

  useEffect(() => {
    // Load investor-specific data
    const allInstallments = getInstallments();
    const investorInstallments = allInstallments.filter(inst => inst.investorId === investor.id);
    setInstallments(investorInstallments);

    const allPayments = getPayments();
    const investorPayments = allPayments.filter(pay => pay.investorId === investor.id);
    setPayments(investorPayments);

    const plans = getMembershipPlans();
    const plan = plans.find(p => p.id === investor.membershipPlan);
    setMembershipPlan(plan);
  }, [investor.id]);

  const progressPercentage = (investor.totalPaid / investor.totalInvestment) * 100;
  const pendingInstallments = installments.filter(inst => inst.status === 'pending');
  const paidInstallments = installments.filter(inst => inst.status === 'paid');
  const overdueInstallments = installments.filter(inst => 
    inst.status === 'pending' && new Date(inst.dueDate) < new Date()
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onClose}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{investor.name}</h1>
            <p className="text-muted-foreground">Investor Profile & Payment History</p>
          </div>
        </div>
        <Button onClick={onEdit}>
          <Edit className="h-4 w-4 mr-2" />
          Edit Details
        </Button>
      </div>

      {/* Investor Info Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personal Information */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <User className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Personal Information</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="text-foreground">{investor.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="text-foreground">{investor.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Join Date</p>
                <p className="text-foreground">{formatDate(investor.joinDate)}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                investor.status === 'active'
                  ? 'bg-green-100 text-green-600 dark:bg-green-950/20 dark:text-green-400'
                  : 'bg-red-100 text-red-600 dark:bg-red-950/20 dark:text-red-400'
              }`}>
                {investor.status}
              </span>
            </div>
          </div>
        </Card>

        {/* Investment Overview */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <CreditCard className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Investment Overview</h3>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Membership Plan</p>
              <p className="text-lg font-semibold text-foreground capitalize">
                {investor.membershipPlan} Tier
              </p>
              {membershipPlan && (
                <p className="text-sm text-muted-foreground">
                  {formatCurrency(membershipPlan.totalAmount)} • {membershipPlan.duration}
                </p>
              )}
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Investment</p>
              <p className="text-xl font-bold text-foreground">
                {formatCurrency(investor.totalInvestment)}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Payment Progress</p>
              <div className="mt-2">
                <div className="w-full bg-muted rounded-full h-3">
                  <div 
                    className="bg-primary h-3 rounded-full transition-all"
                    style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                  />
                </div>
                <div className="flex justify-between mt-2 text-sm">
                  <span className="text-muted-foreground">
                    {formatCurrency(investor.totalPaid)}
                  </span>
                  <span className="text-muted-foreground">
                    {progressPercentage.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Installment Type</p>
              <p className="text-foreground capitalize">{investor.installmentType} payments</p>
            </div>
          </div>
        </Card>

        {/* Payment Summary */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Payment Summary</h3>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 rounded-lg bg-green-50 dark:bg-green-950/20">
                <p className="text-2xl font-bold text-green-600">{paidInstallments.length}</p>
                <p className="text-sm text-green-600">Paid</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-yellow-50 dark:bg-yellow-950/20">
                <p className="text-2xl font-bold text-yellow-600">{pendingInstallments.length}</p>
                <p className="text-sm text-yellow-600">Pending</p>
              </div>
            </div>
            {overdueInstallments.length > 0 && (
              <div className="text-center p-3 rounded-lg bg-red-50 dark:bg-red-950/20">
                <p className="text-2xl font-bold text-red-600">{overdueInstallments.length}</p>
                <p className="text-sm text-red-600">Overdue</p>
              </div>
            )}
            <div>
              <p className="text-sm text-muted-foreground">Remaining Amount</p>
              <p className="text-lg font-semibold text-foreground">
                {formatCurrency(investor.pendingAmount)}
              </p>
            </div>
            {investor.nextDueDate && (
              <div>
                <p className="text-sm text-muted-foreground">Next Due Date</p>
                <p className="text-foreground">{formatDate(investor.nextDueDate)}</p>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Installment Schedule */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Installment Schedule</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-3 font-semibold text-foreground">Due Date</th>
                <th className="text-left p-3 font-semibold text-foreground">Amount</th>
                <th className="text-left p-3 font-semibold text-foreground">Status</th>
                <th className="text-left p-3 font-semibold text-foreground">Paid Date</th>
                <th className="text-left p-3 font-semibold text-foreground">Payment Mode</th>
                <th className="text-left p-3 font-semibold text-foreground">Remarks</th>
              </tr>
            </thead>
            <tbody>
              {installments.length > 0 ? (
                installments
                  .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
                  .map((installment) => (
                    <tr key={installment.id} className="border-b border-border">
                      <td className="p-3 text-foreground">{formatDate(installment.dueDate)}</td>
                      <td className="p-3 text-foreground font-medium">
                        {formatCurrency(installment.amount)}
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          installment.status === 'paid'
                            ? 'bg-green-100 text-green-600 dark:bg-green-950/20 dark:text-green-400'
                            : installment.status === 'overdue'
                            ? 'bg-red-100 text-red-600 dark:bg-red-950/20 dark:text-red-400'
                            : 'bg-yellow-100 text-yellow-600 dark:bg-yellow-950/20 dark:text-yellow-400'
                        }`}>
                          {installment.status}
                        </span>
                      </td>
                      <td className="p-3 text-muted-foreground">
                        {installment.paidDate ? formatDate(installment.paidDate) : '-'}
                      </td>
                      <td className="p-3 text-muted-foreground">
                        {installment.paymentMode || '-'}
                      </td>
                      <td className="p-3 text-muted-foreground">
                        {installment.remarks || '-'}
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-6 text-center text-muted-foreground">
                    No installment schedule found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Payment History */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Payment History</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-3 font-semibold text-foreground">Date</th>
                <th className="text-left p-3 font-semibold text-foreground">Amount</th>
                <th className="text-left p-3 font-semibold text-foreground">Payment Mode</th>
                <th className="text-left p-3 font-semibold text-foreground">Remarks</th>
              </tr>
            </thead>
            <tbody>
              {payments.length > 0 ? (
                payments
                  .sort((a, b) => new Date(b.paymentDate).getTime() - new Date(a.paymentDate).getTime())
                  .map((payment) => (
                    <tr key={payment.id} className="border-b border-border">
                      <td className="p-3 text-foreground">{formatDate(payment.paymentDate)}</td>
                      <td className="p-3 text-foreground font-medium">
                        {formatCurrency(payment.amount)}
                      </td>
                      <td className="p-3 text-muted-foreground">{payment.paymentMode}</td>
                      <td className="p-3 text-muted-foreground">{payment.remarks}</td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-6 text-center text-muted-foreground">
                    No payment history found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default InvestorDetails;