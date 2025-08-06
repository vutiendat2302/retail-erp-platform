import { Outlet } from "react-router-dom";
import ProductTableComponent from "../components/inventory_components/products/ProductTableComponent";


const Product: React.FC = () =>  {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Quản lý sản phẩm</h1>
      <Outlet />
    </div>
  );
}

export default Product