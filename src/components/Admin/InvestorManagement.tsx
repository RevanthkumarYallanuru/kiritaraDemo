import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Eye, Download, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import InvestorForm from './InvestorForm';
import InvestorDetails from './InvestorDetails';
import {
  getInvestors,
  deleteInvestor,
  formatCurrency,
  formatDate,
  exportToCSV,
  type Investor
} from '@/lib/adminUtils';

const InvestorManagement = () => {
  const [investors, setInvestors] = useState<Investor[]>([]);
  const [filteredInvestors, setFilteredInvestors] = useState<Investor[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedInvestor, setSelectedInvestor] = useState<Investor | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadInvestors();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = investors.filter(investor =>
        investor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        investor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        investor.phone.includes(searchTerm) ||
        investor.membershipPlan.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredInvestors(filtered);
    } else {
      setFilteredInvestors(investors);
    }
  }, [searchTerm, investors]);

  const loadInvestors = () => {
    const data = getInvestors();
    setInvestors(data);
    setFilteredInvestors(data);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this investor?')) {
      const success = deleteInvestor(id);
      if (success) {
        loadInvestors();
        toast({
          title: 'Investor deleted',
          description: 'Investor has been successfully deleted.',
        });
      }
    }
  };

  const handleEdit = (investor: Investor) => {
    setSelectedInvestor(investor);
    setShowForm(true);
  };

  const handleView = (investor: Investor) => {
    setSelectedInvestor(investor);
    setShowDetails(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setSelectedInvestor(null);
    loadInvestors();
  };

  const handleDetailsClose = () => {
    setShowDetails(false);
    setSelectedInvestor(null);
  };

  const handleExport = () => {
    const exportData = filteredInvestors.map(investor => ({
      Name: investor.name,
      Email: investor.email,
      Phone: investor.phone,
      'Membership Plan': investor.membershipPlan,
      'Total Investment': investor.totalInvestment,
      'Downpayment Paid': investor.downpaymentPaid,
      'Total Paid': investor.totalPaid,
      'Pending Amount': investor.pendingAmount,
      'Installment Type': investor.installmentType,
      'Join Date': investor.joinDate,
      Status: investor.status
    }));
    
    exportToCSV(exportData, 'kiritara-investors');
    toast({
      title: 'Export completed',
      description: 'Investor data has been exported to CSV.',
    });
  };

  if (showForm) {
    return (
      <InvestorForm
        investor={selectedInvestor}
        onClose={handleFormClose}
      />
    );
  }

  if (showDetails && selectedInvestor) {
    return (
      <InvestorDetails
        investor={selectedInvestor}
        onClose={handleDetailsClose}
        onEdit={() => {
          setShowDetails(false);
          setShowForm(true);
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Investor Management</h1>
          <p className="text-muted-foreground">Manage all investor profiles and their investments</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={() => setShowForm(true)}>
            <UserPlus className="h-4 w-4 mr-2" />
            Add Investor
          </Button>
        </div>
      </div>

      {/* Search and Filter */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search investors by name, email, phone, or plan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">{filteredInvestors.length}</p>
            <p className="text-sm text-muted-foreground">Total Investors</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">
              {formatCurrency(filteredInvestors.reduce((sum, inv) => sum + inv.totalInvestment, 0))}
            </p>
            <p className="text-sm text-muted-foreground">Total Investment</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">
              {formatCurrency(filteredInvestors.reduce((sum, inv) => sum + inv.totalPaid, 0))}
            </p>
            <p className="text-sm text-muted-foreground">Total Collected</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">
              {filteredInvestors.filter(inv => inv.status === 'active').length}
            </p>
            <p className="text-sm text-muted-foreground">Active Investors</p>
          </div>
        </Card>
      </div>

      {/* Investors Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-4 font-semibold text-foreground">Investor</th>
                <th className="text-left p-4 font-semibold text-foreground">Contact</th>
                <th className="text-left p-4 font-semibold text-foreground">Plan</th>
                <th className="text-left p-4 font-semibold text-foreground">Investment</th>
                <th className="text-left p-4 font-semibold text-foreground">Progress</th>
                <th className="text-left p-4 font-semibold text-foreground">Status</th>
                <th className="text-center p-4 font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvestors.length > 0 ? (
                filteredInvestors.map((investor) => {
                  const progressPercentage = (investor.totalPaid / investor.totalInvestment) * 100;
                  return (
                    <tr key={investor.id} className="border-b border-border hover:bg-muted/30">
                      <td className="p-4">
                        <div>
                          <p className="font-medium text-foreground">{investor.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Joined: {formatDate(investor.joinDate)}
                          </p>
                        </div>
                      </td>
                      <td className="p-4">
                        <div>
                          <p className="text-sm text-foreground">{investor.email}</p>
                          <p className="text-sm text-muted-foreground">{investor.phone}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <div>
                          <p className="font-medium text-foreground capitalize">{investor.membershipPlan}</p>
                          <p className="text-sm text-muted-foreground capitalize">
                            {investor.installmentType} payments
                          </p>
                        </div>
                      </td>
                      <td className="p-4">
                        <div>
                          <p className="font-medium text-foreground">
                            {formatCurrency(investor.totalInvestment)}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Paid: {formatCurrency(investor.totalPaid)}
                          </p>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="space-y-2">
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full transition-all"
                              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                            />
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {progressPercentage.toFixed(1)}% complete
                          </p>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          investor.status === 'active'
                            ? 'bg-green-100 text-green-600 dark:bg-green-950/20 dark:text-green-400'
                            : 'bg-red-100 text-red-600 dark:bg-red-950/20 dark:text-red-400'
                        }`}>
                          {investor.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleView(investor)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(investor)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(investor.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="p-8 text-center">
                    <div className="space-y-3">
                      <UserPlus className="h-12 w-12 text-muted-foreground mx-auto" />
                      <div>
                        <p className="text-foreground font-medium">No investors found</p>
                        <p className="text-muted-foreground text-sm">
                          {searchTerm ? 'Try adjusting your search' : 'Add your first investor to get started'}
                        </p>
                      </div>
                      {!searchTerm && (
                        <Button onClick={() => setShowForm(true)}>
                          <Plus className="h-4 w-4 mr-2" />
                          Add First Investor
                        </Button>
                      )}
                    </div>
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

export default InvestorManagement;