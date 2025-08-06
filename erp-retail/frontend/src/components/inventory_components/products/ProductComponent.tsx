import { createProduct, getProduct, updateProduct,fetchAllBrands } from '../../../services/inventery-api/ProductService'
import React, {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import type { BrandResponseDto } from '../../../services/inventery-api/ProductService'

const ProductComponent = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState(true)
  const [priceNormal, setPriceNormal] = useState(0)
  const [brandId, setBrandId] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [manufacturingLocationId, setManufacturingLocationId] = useState('');
  const [brandOptions, setBrandOptions] = useState<BrandResponseDto[]>([])
  const navigator = useNavigate();
  const{id} = useParams();

  const [error, setErrors] = useState({
    id: '',
    name: '',
    priceNormal: '',
    status: '',
    description: '',
    brandId: '',
    categoryId: '',
    manufacturingLocationId: ''
  })

  useEffect(() => {
    if (id) {
      getProduct(id).then((response) => {
        setName(response.data.name);
        setDescription(response.data.description);
        setPriceNormal(response.data.priceNormal);
        setStatus(response.data.status);
        setBrandId(response.data.brandResponseDto.id);
        setCategoryId(response.data.categoryResponseDto.id);
        setManufacturingLocationId(response.data.manufacturingLocationResponseDto.id);
      }).catch(error => {
        console.error(error);
      })
    }
  }, [id]);

  useEffect(() => {
    fetchAllBrands().then((response)  => setBrandOptions(response.data)).catch(console.error)
  }, [])

  function pageTitle() {
    if (id) {
      return <h2 className='text-center'> Update </h2>
    } else {
      return <h2 className='text-center'> Add </h2>
    }
  }

  function saveUpdateProduct(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    const product1 = {name, description, priceNormal, status, brandId, categoryId, manufacturingLocationId};
    console.log(product1);

    if (!validateForm()) return;

    if (id) {
      updateProduct(id, product1).then((response) => {
        console.log(response.data);
        navigator('/products');
      }).catch(error => {
        console.error(error);
      });
    } else {
      createProduct(product1).then((response) => {
        console.log(response.data);
        navigator('/products');
      }).catch(error => {
        console.error(error);
      });
    }
  }

  function validateForm() {
    let valid = true;
    const errorsCopy = {... error}
    if (!name.trim()) {
      errorsCopy.name = 'First name is required';
      valid = false;
    }
    if (priceNormal <= 0) {
      errorsCopy.priceNormal = "Lỗi"
      valid = false;
    }

    if (!brandId.trim()) {
        errorsCopy.brandId = "Brand ID is required";
        valid = false;
    }

    if (!categoryId.trim()) {
        errorsCopy.categoryId = "Category ID is required";
        valid = false;
    }

    if (!manufacturingLocationId.trim()) {
        errorsCopy.manufacturingLocationId = "manuLocation ID is required";
        valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  }

  
  return (
    <div className='container'>
      <br /> <br />
      <div className='row'>
        <div className='card col-md-6 offset-md-3 offset-md-3'>
          {
            pageTitle()
          }
          <div className='card-body'>
            <form>
              <div className='form-group mb-2'>
                <label className='form-label'>Name:</label>
                <input
                  type='text'
                  placeholder='Enter product name'
                  name='name'
                  value={name}
                  className={`form-control ${error.name ? 'is-invalid' : ''}`}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setName(e.target.value)
                  }}
                ></input>
                { error.name && <div className='invalid-feedback'> {error.name} </div>}
              </div>

              <div className='form-group mb-2'>
                <label className='form-label'>Description:</label>
                <input
                  type='text'
                  placeholder='Enter Description name'
                  name='description'
                  value={description}
                  className='form-control'
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setDescription(e.target.value)}}
                ></input>
              </div>

              <div className='form-group mb-2'>
                <label className='form-label'>Status:</label>
                <input
                  type='checkbox'
                  placeholder='Enter status name'
                  name='status'
                  checked={status}
                  className='form-check-input'
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setStatus(e.target.checked)
                  }}
                ></input>
              </div>


              <div className='form-group mb-2'>
                <label className='form-label'>BrandName:</label>
                <select
                  className={`form-control ${error.brandId ? 'is-invalid' : ''}`}
                  name='brandId'
                  value={brandId}
                  onChange={(e : React.ChangeEvent<HTMLSelectElement>) => {
                    setBrandId(e.target.value)
                  }}
                >
                  <option value=''>--Select a Brand -- </option>
                  {brandOptions.map(brand => (
                    <option key = {brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  ))}
                </select>
                { error.brandId && <div className='invalid-feedback'> {error.brandId} </div>}
              </div>

              <div className='form-group mb-2'>
                <label className='form-label'>ManufacturingId:</label>
                <input
                  type='text'
                  placeholder='Enter manufacturing name'
                  name = 'manufacturingLocationId'
                  value={manufacturingLocationId}
                  className={`form-control ${error.manufacturingLocationId ? 'is-invalid' : ''}`}
                  onChange={(e : React.ChangeEvent<HTMLInputElement>) => {
                    setManufacturingLocationId(e.target.value)
                  }}
                ></input>
              </div>

              <div className='form-group mb-2'>
                <label className='form-label'>CategoryId:</label>
                <input
                  type='text'
                  placeholder='Enter category name'
                  name = 'categoryId'
                  value={categoryId}
                  className={`form-control ${error.categoryId ? 'is-invalid' : ''}`}
                  onChange={(e : React.ChangeEvent<HTMLInputElement>) => {
                    setCategoryId(e.target.value)
                  }}
                ></input>
              </div>

              <div className='form-group mb-2'>
                <label className='form-label'>PriceNormal:</label>
                <input
                  type='number'
                  placeholder='Enter PriceNormal name'
                  name='priceNormal'
                  value={priceNormal}
                  className={`form-control ${error.priceNormal ? 'is-invalid' : ''}`}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setPriceNormal(Number(e.target.value))
                  }}
                ></input>
                { error.priceNormal && <div className='invalid-feedback'> {error.priceNormal} </div>}
              </div>

              <button className='btn btn-success' onClick={saveUpdateProduct}>Summit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductComponent