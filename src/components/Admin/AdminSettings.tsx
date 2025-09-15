import React, { useState } from 'react';
import { Save, Download, Upload, Settings, Shield, Bell, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { exportAllData } from '@/lib/adminUtils';

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const { toast } = useToast();

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'data', label: 'Data Management', icon: Database }
  ];

  const handleExportData = () => {
    exportAllData();
    toast({
      title: 'Data exported',
      description: 'All admin data has been exported successfully.',
    });
  };

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        
        // Import data to localStorage
        if (data.investors) localStorage.setItem('kiritara_investors', JSON.stringify(data.investors));
        if (data.installments) localStorage.setItem('kiritara_installments', JSON.stringify(data.installments));
        if (data.payments) localStorage.setItem('kiritara_payments', JSON.stringify(data.payments));
        if (data.membershipPlans) localStorage.setItem('kiritara_membership_plans', JSON.stringify(data.membershipPlans));

        toast({
          title: 'Data imported',
          description: 'Admin data has been imported successfully.',
        });
        
        // Refresh the page to load new data
        window.location.reload();
      } catch (error) {
        toast({
          title: 'Import failed',
          description: 'Failed to import data. Please check the file format.',
          variant: 'destructive'
        });
      }
    };
    reader.readAsText(file);
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Resort Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Resort Name
            </label>
            <input
              type="text"
              defaultValue="Kiritara Resort"
              className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Tagline
            </label>
            <input
              type="text"
              defaultValue="Where Luxury Meets Innovation"
              className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-foreground mb-2">
              Description
            </label>
            <textarea
              rows={3}
              defaultValue="Experience the future of luxury hospitality with cutting-edge architecture, premium amenities, and exceptional investment opportunities."
              className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>
        <div className="mt-4">
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Email
            </label>
            <input
              type="email"
              defaultValue="revanthkumaryallanuru103@gmail.com"
              className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Phone
            </label>
            <input
              type="tel"
              defaultValue="+91 98765 43210"
              className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-foreground mb-2">
              Address
            </label>
            <textarea
              rows={2}
              defaultValue="Luxury Resort Boulevard, Premium District, Hyderabad, Telangana 500001, India"
              className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>
        <div className="mt-4">
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </Card>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Admin Security</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Current Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              New Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>
        <div className="mt-4">
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Update Password
          </Button>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Session Management</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
            <div>
              <p className="font-medium text-foreground">Current Session</p>
              <p className="text-sm text-muted-foreground">Chrome on Windows • Started 2 hours ago</p>
            </div>
            <Button variant="outline" size="sm">
              End Session
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Email Notifications</h3>
        <div className="space-y-4">
          {[
            { id: 'new_investor', label: 'New Investor Registration', desc: 'Get notified when a new investor joins' },
            { id: 'payment_received', label: 'Payment Received', desc: 'Get notified when payments are received' },
            { id: 'overdue_payments', label: 'Overdue Payments', desc: 'Daily digest of overdue payments' },
            { id: 'monthly_reports', label: 'Monthly Reports', desc: 'Automated monthly investment reports' }
          ].map((notification) => (
            <div key={notification.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div>
                <p className="font-medium text-foreground">{notification.label}</p>
                <p className="text-sm text-muted-foreground">{notification.desc}</p>
              </div>
              <input
                type="checkbox"
                defaultChecked
                className="rounded border-border text-primary focus:ring-primary"
              />
            </div>
          ))}
        </div>
        <div className="mt-4">
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Save Preferences
          </Button>
        </div>
      </Card>
    </div>
  );

  const renderDataManagement = () => (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Data Backup & Export</h3>
        <div className="space-y-4">
          <div>
            <p className="text-muted-foreground mb-4">
              Export all admin data including investors, installments, payments, and membership plans.
            </p>
            <Button onClick={handleExportData}>
              <Download className="h-4 w-4 mr-2" />
              Export All Data
            </Button>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Data Import</h3>
        <div className="space-y-4">
          <div>
            <p className="text-muted-foreground mb-4">
              Import previously exported admin data. This will replace all existing data.
            </p>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportData}
                  className="hidden"
                />
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Import Data
                </Button>
              </label>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Only JSON files exported from this system are supported.
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-6 border-red-200 dark:border-red-900">
        <h3 className="text-lg font-semibold text-red-600 mb-4">Danger Zone</h3>
        <div className="space-y-4">
          <div>
            <p className="text-muted-foreground mb-4">
              Clear all data permanently. This action cannot be undone.
            </p>
            <Button variant="destructive" onClick={() => {
              if (window.confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
                localStorage.removeItem('kiritara_investors');
                localStorage.removeItem('kiritara_installments');
                localStorage.removeItem('kiritara_payments');
                localStorage.removeItem('kiritara_membership_plans');
                toast({
                  title: 'Data cleared',
                  description: 'All admin data has been cleared.',
                });
                window.location.reload();
              }
            }}>
              Clear All Data
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings();
      case 'security':
        return renderSecuritySettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'data':
        return renderDataManagement();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Admin Settings</h1>
        <p className="text-muted-foreground">Manage your admin panel preferences and configurations</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-64">
          <Card className="p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeTab === tab.id
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </Card>
        </div>

        {/* Content */}
        <div className="flex-1">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;