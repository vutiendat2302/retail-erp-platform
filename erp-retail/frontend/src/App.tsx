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
interface UserData {
  username: string;
  role: string;
}

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
      </Route>
    </Routes>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}
export default App;