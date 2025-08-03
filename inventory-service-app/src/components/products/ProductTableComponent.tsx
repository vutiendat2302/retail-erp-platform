import { listProducts } from '@/services/ProductService';
import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';

const ProductTableComponent = () => {
  type Product = {
    id: string;
    name: string;
    description: string;
    priceNormal: number;
    brandId: bigint;
    categoryId: bigint;
    status: boolean;
  };
  
  const navigator = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    listProducts().then((response) => {
      setProducts(response.data);
    }).catch(error => {
      console.error(error);
    })
  },[]);

  function addNewProduct() {
    navigator("add-product")
  }

  function updateProduct(id: string) {
    navigator(`edit-product/${id}`)
  }

  function deleteProduct(id: string) {
    navigator(`delete-product/${id}`)
  }

  

  return (
    <div className='container'>
      <h2 className='text-center'> List of Employee </h2>
      <button type="button" className="btn btn-primary" onClick={addNewProduct}>Add Product</button>
      <table className='table table-striped table-bordered'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>PriceNormal</th>
            <th>BrandId</th>
            <th>CategoryId</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.priceNormal}</td>
                <td>{product.brandId}</td>
                <td>{product.categoryId}</td>
                <td>{product.status.toString()}</td>
                <td style={{display: 'flex', gap: '8px'}}>
                  <button className='btn btn-info' onClick={() => updateProduct(product.id)}>Update</button>
                  <button className='btn btn-info' onClick={() => deleteProduct(product.id)}>Delete</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default ProductTableComponent;