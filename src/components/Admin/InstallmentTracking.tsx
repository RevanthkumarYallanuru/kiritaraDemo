import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle, Clock, AlertTriangle, Download, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import {
  getInstallments,
  getInvestors,
  markInstallmentPaid,
  formatCurrency,
  formatDate,
  exportToCSV,
  type Installment,
  type Investor
} from '@/lib/adminUtils';

const InstallmentTracking = () => {
  const [installments, setInstallments] = useState<Installment[]>([]);
  const [investors, setInvestors] = useState<Investor[]>([]);
  const [filteredInstallments, setFilteredInstallments] = useState<Installment[]>([]);
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'paid' | 'overdue'>('all');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedInstallment, setSelectedInstallment] = useState<Installment | null>(null);
  const [paymentData, setPaymentData] = useState({
    paymentMode: 'bank_transfer',
    remarks: '',
    paidDate: new Date().toISOString().split('T')[0]
  });
  const { toast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    filterInstallments();
  }, [installments, statusFilter]);

  const loadData = () => {
    const allInstallments = getInstallments();
    const allInvestors = getInvestors();
    
    // Update installment status based on due dates
    const today = new Date().toISOString().split('T')[0];
    const updatedInstallments = allInstallments.map(inst => ({
      ...inst,
      status: inst.status === 'pending' && inst.dueDate < today ? 'overdue' as const : inst.status
    }));

    setInstallments(updatedInstallments);
    setInvestors(allInvestors);
  };

  const filterInstallments = () => {
    let filtered = installments;
    
    if (statusFilter !== 'all') {
      filtered = installments.filter(inst => inst.status === statusFilter);
    }

    // Sort by due date (overdue first, then by date)
    filtered.sort((a, b) => {
      if (a.status === 'overdue' && b.status !== 'overdue') return -1;
      if (a.status !== 'overdue' && b.status === 'overdue') return 1;
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    });

    setFilteredInstallments(filtered);
  };

  const getInvestorName = (investorId: string): string => {
    const investor = investors.find(inv => inv.id === investorId);
    return investor?.name || 'Unknown Investor';
  };

  const handleMarkAsPaid = (installment: Installment) => {
    setSelectedInstallment(installment);
    setShowPaymentModal(true);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedInstallment) return;

    const success = markInstallmentPaid(selectedInstallment.id, paymentData);
    
    if (success) {
      toast({
        title: 'Payment recorded',
        description: 'Installment has been marked as paid successfully.',
      });
      
      setShowPaymentModal(false);
      setSelectedInstallment(null);
      setPaymentData({
        paymentMode: 'bank_transfer',
        remarks: '',
        paidDate: new Date().toISOString().split('T')[0]
      });
      loadData();
    } else {
      toast({
        title: 'Error',
        description: 'Failed to record payment.',
        variant: 'destructive'
      });
    }
  };

  const handleExport = () => {
    const exportData = filteredInstallments.map(installment => {
      const investor = investors.find(inv => inv.id === installment.investorId);
      return {
        'Investor Name': investor?.name || 'Unknown',
        'Due Date': installment.dueDate,
        'Amount': installment.amount,
        'Status': installment.status,
        'Paid Date': installment.paidDate || '',
        'Payment Mode': installment.paymentMode || '',
        'Remarks': installment.remarks || ''
      };
    });
    
    exportToCSV(exportData, `installments-${statusFilter}-${new Date().toISOString().split('T')[0]}`);
    toast({
      title: 'Export completed',
      description: 'Installment data has been exported to CSV.',
    });
  };

  const stats = {
    total: installments.length,
    pending: installments.filter(inst => inst.status === 'pending').length,
    paid: installments.filter(inst => inst.status === 'paid').length,
    overdue: installments.filter(inst => inst.status === 'overdue').length,
    totalAmount: installments.reduce((sum, inst) => sum + inst.amount, 0),
    paidAmount: installments.filter(inst => inst.status === 'paid').reduce((sum, inst) => sum + inst.amount, 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Installment Tracking</h1>
          <p className="text-muted-foreground">Monitor and manage payment schedules</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Calendar className="h-8 w-8 text-blue-600" />
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.total}</p>
              <p className="text-sm text-muted-foreground">Total Installments</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.paid}</p>
              <p className="text-sm text-muted-foreground">Paid</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Clock className="h-8 w-8 text-yellow-600" />
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.pending}</p>
              <p className="text-sm text-muted-foreground">Pending</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-8 w-8 text-red-600" />
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.overdue}</p>
              <p className="text-sm text-muted-foreground">Overdue</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex items-center gap-4">
          <Filter className="h-5 w-5 text-muted-foreground" />
          <div className="flex gap-2">
            {[
              { value: 'all', label: 'All' },
              { value: 'pending', label: 'Pending' },
              { value: 'overdue', label: 'Overdue' },
              { value: 'paid', label: 'Paid' }
            ].map(filter => (
              <Button
                key={filter.value}
                variant={statusFilter === filter.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter(filter.value as any)}
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Installments Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-4 font-semibold text-foreground">Investor</th>
                <th className="text-left p-4 font-semibold text-foreground">Due Date</th>
                <th className="text-left p-4 font-semibold text-foreground">Amount</th>
                <th className="text-left p-4 font-semibold text-foreground">Status</th>
                <th className="text-left p-4 font-semibold text-foreground">Paid Date</th>
                <th className="text-left p-4 font-semibold text-foreground">Payment Mode</th>
                <th className="text-center p-4 font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInstallments.length > 0 ? (
                filteredInstallments.map((installment) => {
                  const investor = investors.find(inv => inv.id === installment.investorId);
                  const isOverdue = installment.status === 'overdue';
                  
                  return (
                    <tr key={installment.id} className={`border-b border-border hover:bg-muted/30 ${
                      isOverdue ? 'bg-red-50/50 dark:bg-red-950/10' : ''
                    }`}>
                      <td className="p-4">
                        <div>
                          <p className="font-medium text-foreground">
                            {investor?.name || 'Unknown Investor'}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {investor?.membershipPlan} • {investor?.installmentType}
                          </p>
                        </div>
                      </td>
                      <td className="p-4">
                        <p className={`font-medium ${isOverdue ? 'text-red-600' : 'text-foreground'}`}>
                          {formatDate(installment.dueDate)}
                        </p>
                        {isOverdue && (
                          <p className="text-xs text-red-600">
                            {Math.ceil((Date.now() - new Date(installment.dueDate).getTime()) / (1000 * 60 * 60 * 24))} days overdue
                          </p>
                        )}
                      </td>
                      <td className="p-4">
                        <p className="font-semibold text-foreground">
                          {formatCurrency(installment.amount)}
                        </p>
                      </td>
                      <td className="p-4">
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
                      <td className="p-4 text-muted-foreground">
                        {installment.paidDate ? formatDate(installment.paidDate) : '-'}
                      </td>
                      <td className="p-4 text-muted-foreground">
                        {installment.paymentMode || '-'}
                      </td>
                      <td className="p-4 text-center">
                        {installment.status !== 'paid' && (
                          <Button
                            size="sm"
                            onClick={() => handleMarkAsPaid(installment)}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Mark Paid
                          </Button>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="p-8 text-center">
                    <div className="space-y-3">
                      <Calendar className="h-12 w-12 text-muted-foreground mx-auto" />
                      <div>
                        <p className="text-foreground font-medium">No installments found</p>
                        <p className="text-muted-foreground text-sm">
                          {statusFilter !== 'all' ? `No ${statusFilter} installments` : 'No installment records available'}
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Payment Modal */}
      {showPaymentModal && selectedInstallment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/50" onClick={() => setShowPaymentModal(false)} />
          <Card className="relative w-full max-w-md p-6 m-4">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Record Payment
            </h3>
            <div className="mb-4">
              <p className="text-sm text-muted-foreground">Investor:</p>
              <p className="font-medium text-foreground">{getInvestorName(selectedInstallment.investorId)}</p>
              <p className="text-sm text-muted-foreground mt-1">
                Amount: {formatCurrency(selectedInstallment.amount)}
              </p>
            </div>
            
            <form onSubmit={handlePaymentSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Payment Date
                </label>
                <input
                  type="date"
                  value={paymentData.paidDate}
                  onChange={(e) => setPaymentData(prev => ({ ...prev, paidDate: e.target.value }))}
                  required
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Payment Mode
                </label>
                <select
                  value={paymentData.paymentMode}
                  onChange={(e) => setPaymentData(prev => ({ ...prev, paymentMode: e.target.value }))}
                  required
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="bank_transfer">Bank Transfer</option>
                  <option value="cash">Cash</option>
                  <option value="cheque">Cheque</option>
                  <option value="upi">UPI</option>
                  <option value="credit_card">Credit Card</option>
                  <option value="debit_card">Debit Card</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Remarks (Optional)
                </label>
                <input
                  type="text"
                  value={paymentData.remarks}
                  onChange={(e) => setPaymentData(prev => ({ ...prev, remarks: e.target.value }))}
                  placeholder="Payment reference, notes..."
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div className="flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowPaymentModal(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  Record Payment
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};

export default InstallmentTracking;