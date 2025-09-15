import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import MainLayout from './components/layouts/MainLayout';
import Employee from './pages/Employee';
import Schedule from './pages/Schedule';
import Attendance from './pages/Attendance';
import Dashboard from './pages/Dashboard';
import { useState, useEffect } from 'react';
import { Report } from './components/inventory_components/Report';
import Warehouse from './pages/Warehouse';
import Product from './pages/Product';
import { LoginForm } from './pages/Login';
import POSPage from './pages/POSPage';
import {Category} from './pages/Category';
import OrderManagementPage from './pages/OrderManagementPage';
import PromoCodeManagementPage from './pages/PromoCodeManagementPage';
import { Toaster } from 'sonner';

interface UserData {
  username: string;
  role: string;
}

export type PageType = 'pos' | 'orders' | 'promocodes';

const AppRouter = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const navigate = useNavigate();

  const handleLogin = (user: UserData) => {
    setUserData(user);
    console.log("User data set:", user);
    navigate('/');
  };

  const handleLogout = () => {
    setUserData(null);
    navigate('/login');
  };
  

   const goToPage = (page: PageType) => {
    switch (page) {
      case 'pos':
        navigate('/pos');
        break;
      case 'orders':
        navigate('/orders');
        break;
      case 'promocodes':
        navigate('/promocodes');
        break;
    }
  };

  useEffect(() => {
    if (!userData && window.location.pathname !== '/login') {
      navigate('/login');
    }
  }, [userData, navigate]);

  return (
    
    <Routes>
      <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
      <Route
        path="/"
        element={<MainLayout userData={userData} onLogout={handleLogout} />}
      >
        <Route index element={<Dashboard />} />
        <Route path='employee' element={<Employee />} />
        <Route path='schedule' element={<Schedule />} />
        <Route path='attendance' element={<Attendance />} />
        <Route path='inventory' element={<Warehouse />} />
        <Route path='report' element={<Report />} />
        <Route path='product' element={<Product />} />
        <Route path='post-of-link' element={<POSPage/>} />
        <Route path = 'category' element={<Category />} />
        <Route path="pos" element={<POSPage />} />
        <Route path="orders" element={<OrderManagementPage onNavigate={goToPage} />} />
        <Route path="promocodes" element={<PromoCodeManagementPage onNavigate={goToPage} />} />
      </Route>
    </Routes>
  );
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('pos');
  return (
    <BrowserRouter>
      <AppRouter />
      <Toaster />
    </BrowserRouter>
  );
}
