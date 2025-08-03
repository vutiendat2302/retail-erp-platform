import '@/App.css'
import Product from './pages/Product';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import ProductTableComponent from './components/products/ProductTableComponent';
import ProductComponent from './components/products/ProductComponent';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path = "/products" element = {<Product />}>
            <Route index element = {<ProductTableComponent />} />
            <Route path = "add-product" element = {<ProductComponent />} />
            <Route path = "edit-product/:id" element = {<ProductComponent />} />
            <Route path = "delete-product/:id" element = {<ProductComponent />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
