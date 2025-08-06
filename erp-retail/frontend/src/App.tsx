import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layouts/MainLayout';
import Home from './pages/Home';
import Employee from './pages/Employee';
import Schedule from './pages/Schedule';
import Attendance from './pages/Attendance';

import Product from './pages/Product';
import ProductComponent from './components/inventory_components/products/ProductComponent';
import ProductTableComponent from './components/inventory_components/products/ProductTableComponent';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="employee" element={<Employee />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="attendance" element={<Attendance />} />

          <Route path="/product" element={<Product />}>
            <Route index element={<ProductTableComponent />} />
            <Route path="add-product" element={<ProductComponent />} />
            <Route path="edit-product/:id" element={<ProductComponent />} />
          </Route>
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;