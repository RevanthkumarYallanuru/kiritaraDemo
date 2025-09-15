import React, { useState, useEffect } from 'react';
import { Users, DollarSign, Calendar, AlertTriangle, TrendingUp, Eye } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getAdminData } from '@/lib/adminUtils';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalInvestors: 0,
    totalInvestment: 0,
    pendingInstallments: 0,
    overduePayments: 0,
    recentInvestors: [],
    upcomingPayments: []
  });

  useEffect(() => {
    const loadDashboardData = () => {
      const data = getAdminData();
      setDashboardData(data);
    };

    loadDashboardData();
    // Refresh data every 30 seconds
    const interval = setInterval(loadDashboardData, 30000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      name: 'Total Investors',
      value: dashboardData.totalInvestors.toString(),
      icon: Users,
      color: 'text-blue-600',
      bg: 'bg-blue-50 dark:bg-blue-950/20',
      change: '+12%',
      changeType: 'positive'
    },
    {
      name: 'Total Investment',
      value: `₹${(dashboardData.totalInvestment / 100000).toFixed(1)}L`,
      icon: DollarSign,
      color: 'text-green-600',
      bg: 'bg-green-50 dark:bg-green-950/20',
      change: '+8%',
      changeType: 'positive'
    },
    {
      name: 'Pending Installments',
      value: dashboardData.pendingInstallments.toString(),
      icon: Calendar,
      color: 'text-yellow-600',
      bg: 'bg-yellow-50 dark:bg-yellow-950/20',
      change: '-3%',
      changeType: 'negative'
    },
    {
      name: 'Overdue Payments',
      value: dashboardData.overduePayments.toString(),
      icon: AlertTriangle,
      color: 'text-red-600',
      bg: 'bg-red-50 dark:bg-red-950/20',
      change: '+2%',
      changeType: 'negative'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
          <p className="text-muted-foreground mt-2">
            Welcome back! Here's what's happening at Kiritara Resort today.
          </p>
        </div>
        <Button asChild>
          <Link to="/admin-panel/investors">
            <Users className="h-4 w-4 mr-2" />
            Manage Investors
          </Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.name} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">{stat.name}</p>
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className={`h-3 w-3 ${
                      stat.changeType === 'positive' ? 'text-green-500' : 'text-red-500'
                    }`} />
                    <span className={`text-xs ${
                      stat.changeType === 'positive' ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {stat.change}
                    </span>
                    <span className="text-xs text-muted-foreground">vs last month</span>
                  </div>
                </div>
                <div className={`p-3 rounded-full ${stat.bg}`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Button asChild variant="outline" className="w-full justify-start">
              <Link to="/admin-panel/investors">
                <Users className="h-4 w-4 mr-2" />
                Add New Investor
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link to="/admin-panel/memberships">
                <DollarSign className="h-4 w-4 mr-2" />
                Manage Plans
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link to="/admin-panel/installments">
                <Calendar className="h-4 w-4 mr-2" />
                Track Payments
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link to="/">
                <Eye className="h-4 w-4 mr-2" />
                View Public Site
              </Link>
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Recent Investors</h3>
          <div className="space-y-3">
            {dashboardData.recentInvestors.length > 0 ? (
              dashboardData.recentInvestors.map((investor: any, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-accent">
                  <div>
                    <p className="font-medium text-foreground">{investor.name}</p>
                    <p className="text-sm text-muted-foreground">{investor.plan}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-foreground">{investor.amount}</p>
                    <p className="text-xs text-muted-foreground">{investor.date}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">No recent investors</p>
            )}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Upcoming Payments</h3>
          <div className="space-y-3">
            {dashboardData.upcomingPayments.length > 0 ? (
              dashboardData.upcomingPayments.map((payment: any, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-accent">
                  <div>
                    <p className="font-medium text-foreground">{payment.investor}</p>
                    <p className="text-sm text-muted-foreground">{payment.dueDate}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-foreground">{payment.amount}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      payment.status === 'overdue' 
                        ? 'bg-red-100 text-red-600 dark:bg-red-950/20 dark:text-red-400'
                        : 'bg-yellow-100 text-yellow-600 dark:bg-yellow-950/20 dark:text-yellow-400'
                    }`}>
                      {payment.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">No upcoming payments</p>
            )}
          </div>
        </Card>
      </div>

      {/* Performance Chart Placeholder */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Investment Performance</h3>
        <div className="h-64 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Performance charts will be displayed here</p>
            <p className="text-sm text-muted-foreground mt-2">Connect to Supabase for advanced analytics</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AdminDashboard;