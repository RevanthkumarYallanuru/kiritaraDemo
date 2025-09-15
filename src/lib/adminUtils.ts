// Admin utility functions for localStorage data management

export interface Investor {
  id: string;
  name: string;
  email: string;
  phone: string;
  membershipPlan: string;
  downpaymentPaid: number;
  totalInvestment: number;
  installmentType: 'monthly' | 'quarterly';
  joinDate: string;
  status: 'active' | 'inactive';
  nextDueDate?: string;
  totalPaid: number;
  pendingAmount: number;
}

export interface MembershipPlan {
  id: string;
  name: string;
  totalAmount: number;
  downpaymentPercent: number;
  monthlyInstallment: number;
  quarterlyInstallment: number;
  benefits: string[];
  duration: string;
  roi: string;
}

export interface Installment {
  id: string;
  investorId: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: 'pending' | 'paid' | 'overdue';
  paymentMode?: string;
  remarks?: string;
}

export interface Payment {
  id: string;
  investorId: string;
  installmentId: string;
  amount: number;
  paymentDate: string;
  paymentMode: string;
  remarks: string;
}

// Storage keys
const STORAGE_KEYS = {
  INVESTORS: 'kiritara_investors',
  MEMBERSHIP_PLANS: 'kiritara_membership_plans',
  INSTALLMENTS: 'kiritara_installments',
  PAYMENTS: 'kiritara_payments'
};

// Generate unique ID
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Format currency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

// Format date
export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Calculate next due date
export const calculateNextDueDate = (lastDueDate: string, installmentType: 'monthly' | 'quarterly'): string => {
  const date = new Date(lastDueDate);
  if (installmentType === 'monthly') {
    date.setMonth(date.getMonth() + 1);
  } else {
    date.setMonth(date.getMonth() + 3);
  }
  return date.toISOString().split('T')[0];
};

// Investors CRUD operations
export const getInvestors = (): Investor[] => {
  const data = localStorage.getItem(STORAGE_KEYS.INVESTORS);
  return data ? JSON.parse(data) : [];
};

export const saveInvestor = (investor: Omit<Investor, 'id'>): Investor => {
  const investors = getInvestors();
  const newInvestor: Investor = {
    ...investor,
    id: generateId()
  };
  investors.push(newInvestor);
  localStorage.setItem(STORAGE_KEYS.INVESTORS, JSON.stringify(investors));
  return newInvestor;
};

export const updateInvestor = (id: string, updates: Partial<Investor>): Investor | null => {
  const investors = getInvestors();
  const index = investors.findIndex(inv => inv.id === id);
  if (index === -1) return null;
  
  investors[index] = { ...investors[index], ...updates };
  localStorage.setItem(STORAGE_KEYS.INVESTORS, JSON.stringify(investors));
  return investors[index];
};

export const deleteInvestor = (id: string): boolean => {
  const investors = getInvestors();
  const filtered = investors.filter(inv => inv.id !== id);
  localStorage.setItem(STORAGE_KEYS.INVESTORS, JSON.stringify(filtered));
  return filtered.length < investors.length;
};

// Membership Plans CRUD operations
export const getMembershipPlans = (): MembershipPlan[] => {
  const data = localStorage.getItem(STORAGE_KEYS.MEMBERSHIP_PLANS);
  if (!data) {
    // Initialize with default plans from resortData
    const defaultPlans: MembershipPlan[] = [
      {
        id: 'silver',
        name: 'Silver Tier',
        totalAmount: 500000,
        downpaymentPercent: 20,
        monthlyInstallment: 16667,
        quarterlyInstallment: 50000,
        benefits: ['Luxury Suite Access (7 days/year)', 'Premium Dining Credits', 'Spa & Wellness Benefits'],
        duration: '3 Years',
        roi: '12-15%'
      },
      {
        id: 'gold',
        name: 'Gold Tier',
        totalAmount: 1200000,
        downpaymentPercent: 25,
        monthlyInstallment: 30000,
        quarterlyInstallment: 90000,
        benefits: ['Premium Suite Access (14 days/year)', 'VIP Dining & Bar Credits', 'Full Spa Access'],
        duration: '5 Years',
        roi: '15-18%'
      }
    ];
    localStorage.setItem(STORAGE_KEYS.MEMBERSHIP_PLANS, JSON.stringify(defaultPlans));
    return defaultPlans;
  }
  return JSON.parse(data);
};

export const saveMembershipPlan = (plan: Omit<MembershipPlan, 'id'>): MembershipPlan => {
  const plans = getMembershipPlans();
  const newPlan: MembershipPlan = {
    ...plan,
    id: generateId()
  };
  plans.push(newPlan);
  localStorage.setItem(STORAGE_KEYS.MEMBERSHIP_PLANS, JSON.stringify(plans));
  return newPlan;
};

export const updateMembershipPlan = (id: string, updates: Partial<MembershipPlan>): MembershipPlan | null => {
  const plans = getMembershipPlans();
  const index = plans.findIndex(plan => plan.id === id);
  if (index === -1) return null;
  
  plans[index] = { ...plans[index], ...updates };
  localStorage.setItem(STORAGE_KEYS.MEMBERSHIP_PLANS, JSON.stringify(plans));
  return plans[index];
};

export const deleteMembershipPlan = (id: string): boolean => {
  const plans = getMembershipPlans();
  const filtered = plans.filter(plan => plan.id !== id);
  localStorage.setItem(STORAGE_KEYS.MEMBERSHIP_PLANS, JSON.stringify(filtered));
  return filtered.length < plans.length;
};

// Installments CRUD operations
export const getInstallments = (): Installment[] => {
  const data = localStorage.getItem(STORAGE_KEYS.INSTALLMENTS);
  return data ? JSON.parse(data) : [];
};

export const generateInstallmentSchedule = (investor: Investor): void => {
  const plan = getMembershipPlans().find(p => p.id === investor.membershipPlan);
  if (!plan) return;

  const installments: Installment[] = [];
  const remainingAmount = investor.totalInvestment - investor.downpaymentPaid;
  const installmentAmount = investor.installmentType === 'monthly' 
    ? plan.monthlyInstallment 
    : plan.quarterlyInstallment;
  
  const numberOfInstallments = Math.ceil(remainingAmount / installmentAmount);
  let currentDate = new Date(investor.joinDate);

  for (let i = 0; i < numberOfInstallments; i++) {
    if (investor.installmentType === 'monthly') {
      currentDate.setMonth(currentDate.getMonth() + 1);
    } else {
      currentDate.setMonth(currentDate.getMonth() + 3);
    }

    const isLastInstallment = i === numberOfInstallments - 1;
    const amount = isLastInstallment 
      ? remainingAmount - (installmentAmount * i)
      : installmentAmount;

    installments.push({
      id: generateId(),
      investorId: investor.id,
      amount,
      dueDate: currentDate.toISOString().split('T')[0],
      status: 'pending'
    });
  }

  const existingInstallments = getInstallments();
  const updatedInstallments = [...existingInstallments, ...installments];
  localStorage.setItem(STORAGE_KEYS.INSTALLMENTS, JSON.stringify(updatedInstallments));
};

export const markInstallmentPaid = (installmentId: string, paymentData: {
  paymentMode: string;
  remarks: string;
  paidDate?: string;
}): boolean => {
  const installments = getInstallments();
  const index = installments.findIndex(inst => inst.id === installmentId);
  if (index === -1) return false;

  installments[index] = {
    ...installments[index],
    status: 'paid' as const,
    paidDate: paymentData.paidDate || new Date().toISOString().split('T')[0],
    paymentMode: paymentData.paymentMode,
    remarks: paymentData.remarks
  };

  localStorage.setItem(STORAGE_KEYS.INSTALLMENTS, JSON.stringify(installments));

  // Create payment record
  const payment: Payment = {
    id: generateId(),
    investorId: installments[index].investorId,
    installmentId: installmentId,
    amount: installments[index].amount,
    paymentDate: paymentData.paidDate || new Date().toISOString().split('T')[0],
    paymentMode: paymentData.paymentMode,
    remarks: paymentData.remarks
  };

  const payments = getPayments();
  payments.push(payment);
  localStorage.setItem(STORAGE_KEYS.PAYMENTS, JSON.stringify(payments));

  return true;
};

// Payments operations
export const getPayments = (): Payment[] => {
  const data = localStorage.getItem(STORAGE_KEYS.PAYMENTS);
  return data ? JSON.parse(data) : [];
};

// Dashboard data aggregation
export const getAdminData = () => {
  const investors = getInvestors();
  const installments = getInstallments();
  const payments = getPayments();

  const totalInvestors = investors.length;
  const totalInvestment = investors.reduce((sum, inv) => sum + inv.totalInvestment, 0);
  
  const pendingInstallments = installments.filter(inst => inst.status === 'pending').length;
  
  // Check for overdue payments (due date passed and still pending)
  const today = new Date().toISOString().split('T')[0];
  const overduePayments = installments.filter(inst => 
    inst.status === 'pending' && inst.dueDate < today
  ).length;

  // Recent investors (last 5)
  const recentInvestors = investors
    .sort((a, b) => new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime())
    .slice(0, 5)
    .map(inv => ({
      name: inv.name,
      plan: inv.membershipPlan,
      amount: formatCurrency(inv.totalInvestment),
      date: formatDate(inv.joinDate)
    }));

  // Upcoming payments (next 10 pending)
  const upcomingPayments = installments
    .filter(inst => inst.status === 'pending')
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 10)
    .map(inst => {
      const investor = investors.find(inv => inv.id === inst.investorId);
      return {
        investor: investor?.name || 'Unknown',
        amount: formatCurrency(inst.amount),
        dueDate: formatDate(inst.dueDate),
        status: inst.dueDate < today ? 'overdue' : 'pending'
      };
    });

  return {
    totalInvestors,
    totalInvestment,
    pendingInstallments,
    overduePayments,
    recentInvestors,
    upcomingPayments
  };
};

// Export functions
export const exportToCSV = (data: any[], filename: string): void => {
  if (data.length === 0) return;

  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => headers.map(header => `"${row[header] || ''}"`).join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}.csv`;
  a.click();
  window.URL.revokeObjectURL(url);
};

export const exportAllData = (): void => {
  const investors = getInvestors();
  const installments = getInstallments();
  const payments = getPayments();
  const plans = getMembershipPlans();

  // Create combined data export
  const exportData = {
    investors,
    installments,
    payments,
    membershipPlans: plans,
    exportDate: new Date().toISOString()
  };

  const jsonContent = JSON.stringify(exportData, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `kiritara-admin-data-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  window.URL.revokeObjectURL(url);
};