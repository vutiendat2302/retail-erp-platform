import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layouts/MainLayout';
import Home from './pages/Dashboard';
import Employee from './pages/Employee';
import Schedule from './pages/Schedule';
import Attendance from './pages/Attendance';
import Dashboard from './pages/Dashboard';
import { useState } from 'react';
import { Report } from './components/inventory_components/Report';
import Warehouse from './pages/Warehouse';
import Product from './pages/Product';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path='employee' element={<Employee />} />
          <Route path='schedule' element={<Schedule />} />
          <Route path='attendance' element={<Attendance />} />
          <Route path='inventory' element={<Warehouse />}/>
          <Route path='report' element={<Report />}/>
          <Route path = 'product' element={<Product/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    
  );
}
export default App;