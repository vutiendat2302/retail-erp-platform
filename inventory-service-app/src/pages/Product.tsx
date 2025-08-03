import FooterComponent from "@/components/products/FooterComponent";
import HeaderComponent from "@/components/products/HeaderComponent";
import { Outlet } from "react-router-dom";


function Product() {
  return (
    <>
      <div>
        <HeaderComponent />
        <Outlet />
        <FooterComponent />
      </div>
    </>
  );
}

export default Product