import { createProduct, getProduct } from '@/services/ProductService'
import React, {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const ProductComponent = () => {
  
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState(true)
  const [priceNormal, setPriceNormal] = useState(0)

  const navigator = useNavigate();

  const [erros, setErrors] = useState({
    id: '',
    name: '',
    priceNormal: '',
    status: true,
    brandId: 0,
    categoryId: 0,
    description: ''
  })

  const{id} = useParams();

  useEffect(() => {
    if (id) {
      getProduct(id).then((response) => {
        setName(response.data.name);
        setDescription(response.data.description);
        setPriceNormal(response.data.priceNormal);
        setStatus(response.data.status);
      }).catch(erros => {
        console.error(erros);
      })
    }
  }, [id]);

  function pageTitle() {
    if (id) {
      return <h2 className='text-center'> Update </h2>
    } else {
      return <h2 className='text-center'> Add </h2>
    }
  }

   {/* nene viet lai thanh 1 ham chung, hoặc viết luôn ở chỗ onChange (e) => ...  */}
  function handleName(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  function handleDescription(e: React.ChangeEvent<HTMLInputElement>) {
    setDescription(e.target.value);
  }

  function handleStatus(e: React.ChangeEvent<HTMLInputElement>) {
    setStatus(e.target.checked);
  }

  function handlePriceNormal(e: React.ChangeEvent<HTMLInputElement>) {
    setPriceNormal(Number(e.target.value));
  }

  function saveProduct(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    if (validateForm()) {
      const product1 = {name, description, priceNormal, status}
      console.log(product1)

      createProduct(product1).then((response) => {
        console.log(response.data);
        navigator('/products')
      })
    }

    
  }

  function validateForm() {
    let valid = true;

    const errorsCopy = {... erros}

    if (name.trim()) {
      errorsCopy.name = ''
    } else {
      errorsCopy.name = 'First name is required';
      valid = false;
    }

    if (priceNormal <= 0) {
      errorsCopy.priceNormal = "Lỗi"
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
                  className={`form-control ${erros.name ? 'is-invalid' : ''}`}
                  onChange={handleName}
                ></input>
                { erros.name && <div className='invalid-feedback'> {erros.name} </div>}
              </div>

              <div className='form-group mb-2'>
                <label className='form-label'>Description:</label>
                <input
                  type='text'
                  placeholder='Enter Description name'
                  name='description'
                  value={description}
                  className='form-control'
                  onChange={handleDescription}
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
                  onChange={handleStatus}
                ></input>
              </div>

              <div className='form-group mb-2'>
                <label className='form-label'>PriceNormal:</label>
                <input
                  type='number'
                  placeholder='Enter PriceNormal name'
                  name='priceNormal'
                  value={priceNormal}
                  className={`form-control ${erros.priceNormal ? 'is-invalid' : ''}`}
                  onChange={handlePriceNormal}
                ></input>
                { erros.priceNormal && <div className='invalid-feedback'> {erros.priceNormal} </div>}
              </div>

              <button className='btn btn-success' onClick={saveProduct}>Summit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductComponent