import { listProducts, deleteProduct } from '../../../services/inventery-api/ProductService'
import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import type { AxiosResponse } from 'axios';

const ProductTableComponent = () => {
  type Product = {
    id: string;
    name: string;
    description: string;
    priceNormal: number;
    status: boolean;
    brandResponseDto: {
      id: string;
      name: string;
    }
    categoryResponseDto: {
      id: string;
      name: string;
    }
    manufacturingLocationResponseDto: {
      id: string;
      name: string;
    }
  };
  
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getAllProduct();
  },[]);

  function getAllProduct() {
    listProducts().then((response) => {
      setProducts(response.data);
    }).catch(error => {
      console.error(error);
    })
  }

  function addNewProduct() {
    navigate("add-product")
  }

  function updateProduct(id: string) {
    navigate(`edit-product/${id}`)
  }

  function removeProduct(id: string) {
    console.log(id);
    deleteProduct(id).then((reponse: AxiosResponse<Product[]>) => {
      getAllProduct();
    }).catch(error => {
      console.error(error);
    })
  }

  

  return (
    <div className='container'>
      <button type="button" className="btn btn-primary" onClick={addNewProduct}>Add Product</button>
      <table className='table table-striped table-bordered'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>PriceNormal</th>
            <th>Brand</th>
            <th>Category</th>
            <th>ManufacturingLocation</th>
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
                <td>{product.brandResponseDto.name}</td>
                <td>{product.categoryResponseDto.name}</td>
                <td>{product.manufacturingLocationResponseDto.name}</td>
                <td>{product.status.toString()}</td>
                <td style={{display: 'flex', gap: '8px'}}>
                  <button className='btn btn-info' onClick={() => updateProduct(product.id)}>Update</button>
                  <button className='btn btn-danger' onClick={() => removeProduct(product.id)}>Delete</button>
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