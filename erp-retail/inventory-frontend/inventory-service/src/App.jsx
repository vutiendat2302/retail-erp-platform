import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Product from './pages/product/Product.jsx'
import Warehouse from './pages/warehouse/Warehouse.jsx'
import Store from './pages/store/Store.jsx'
import MainLayout from './layout/MainLayout.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/warehouse" element={<Warehouse />} />
          <Route path="/store" element={<Store />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App