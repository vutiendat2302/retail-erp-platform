import React, { useState, useEffect} from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Label } from '../../ui/label';
import { Textarea } from '../../../components/ui/textarea';
import { Button } from '../../ui/button';
interface Product {
  id: string;
  name: string;
  description: string;
  priceNormal: number;
  status: boolean;
  brandName: string;
  categoryName: string;
  manufacturingLocationName: string;
}

interface ProductFormProps {
  initialData?: Product | null;
  onSubmit: (data: Product) => void | Promise<void>;
  onClose: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
  initialData, onSubmit, onClose }) => {
  const [formData, setFormData] = useState<Product>({
    id: '',
    name: '',
    description: '',
    priceNormal: 0,
    brandName: '',
    categoryName: '',
    manufacturingLocationName: '',
    status: true,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id || '',
        name: initialData.name || '',
        description: initialData.description || '',
        priceNormal: initialData.priceNormal || 0,
        brandName: initialData.brandName || '',
        categoryName: initialData.categoryName || '',
        manufacturingLocationName: initialData.manufacturingLocationName || '',
        status: initialData.status,
      });
    } else {
      setFormData({
        id: '',
        name: '',
        description: '',
        priceNormal: 0,
        brandName: '',
        categoryName: '',
        manufacturingLocationName: '',
        status: true,
          })
        }
  }, [initialData]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    setFormData((prev) => ({...prev, [name]: value}));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Form data gửi đi:", formData);
    onSubmit(formData);
  };

  return (
        <form onSubmit={handleSubmit} className='space-y-4'>
          {/*name*/}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Tên sản phẩm</Label>
              <input
                id = 'name'
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nhập tên sản phẩm"
                required
                className="w-full border px-2 py-1 rounded"
              />
            </div>

            {/*priceNormal*/}
            <div className="space-y-2">
              <Label htmlFor="priceNormal">Price Normal</Label>
              <input
                id = 'priceNormal'
                type="number"
                name="priceNormal"
                value={formData.priceNormal}
                onChange={handleChange}
                required
                className="w-full border px-2 py-1 rounded"
                placeholder="Nhập giá sản phẩm"
              />
            </div>

            {/*status*/}
            <div className="space-y-2">
              <Label className='block mb-1'>Status</Label>
              <input
                id="status"
                type="checkbox"
                name="status"
                checked={formData.status}
                onChange={handleChange}
                required
              />
            </div>

            {/*brand*/}
            <div>
              <Label className='block mb-1'>Brand</Label>
              <input
              id="brandName"
              type="text"
              name="brandName"
              value={formData.brandName}
              onChange={handleChange}
              className="w-full border px-2 py-1 rounded"
              />
            </div>

            {/*category*/}
            <div>
              <Label className='block mb-1'>Category</Label>
              <input
                id="categoryName"
                type="text"
                name="categoryName"
                value={formData.categoryName}
                onChange={handleChange}
                className="w-full border px-2 py-1 rounded"
              />
            </div>
        

            {/*manufacturing*/}
            <div>
              <Label className='block mb-1'>ManufacturingLocation</Label>
              <input
                id="manufacturingLocationName"
                type="text"
                name="manufacturingLocationName"
                value={formData.manufacturingLocationName}
                onChange={handleChange}
                className="w-full border px-2 py-1 rounded"
              />
            </div>
        </div>

          {/*description*/}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id = "description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Nhập mô tả sản phẩm"
              className="w-full border px-2 py-1 rounded"
            />
          </div>

            {/*buttuon*/}
            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type='button'
                variant="outline"
                onClick={onClose}
                className='bg-gray-900 rounded hover:bg-gray-400'
              >
                Hủy
              </Button>

              <Button
                type='submit'
                variant="outline"
                onClick={onClose}
                className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
              >
                {initialData ? 'Cập nhật' : 'Thêm sản phẩm'}
              </Button>
            </div>

        </form>
  );
};

export default ProductForm;