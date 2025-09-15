import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '@/components/Admin/AdminLayout';
import AdminDashboard from '@/components/Admin/AdminDashboard';
import InvestorManagement from '@/components/Admin/InvestorManagement';
import MembershipManagement from '@/components/Admin/MembershipManagement';
import InstallmentTracking from '@/components/Admin/InstallmentTracking';
import AdminSettings from '@/components/Admin/AdminSettings';

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication status
    const authData = localStorage.getItem('kiritara_auth');
    if (authData) {
      try {
        const auth = JSON.parse(authData);
        if (auth.token && auth.user) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        localStorage.removeItem('kiritara_auth');
      }
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <AdminLayout>
      <Routes>
        <Route index element={<AdminDashboard />} />
        <Route path="investors" element={<InvestorManagement />} />
        <Route path="memberships" element={<MembershipManagement />} />
        <Route path="installments" element={<InstallmentTracking />} />
        <Route path="settings" element={<AdminSettings />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminPanel;