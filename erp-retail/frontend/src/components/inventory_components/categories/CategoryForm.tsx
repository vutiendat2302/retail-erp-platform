import React, { useState, useEffect} from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Label } from '../../ui/label';
import { Textarea } from '../../../components/ui/textarea';
import { Button } from '../../ui/button';
import type {CategoryFormData, Category, CategoryFormProps } from '../../../types/InventoryServiceType';

const CategoryForm: React.FC<CategoryFormProps> = ({
  initialData, onSubmit, onClose }) => {
  const [formData, setFormData] = useState<CategoryFormData>({
    id: '',
    name: '',
    description: '',
    status: 'inactive',
    metaKeyword: '',
    seoTitle: '',
    updateBy: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id || '',
        name: initialData.name || '',
        description: initialData.description || '',
        status: initialData.status || 'inactive',
        metaKeyword: initialData.metaKeyword || '',
        seoTitle: initialData.seoTitle || '',
        updateBy: initialData.updateBy || '',
      });

    } else {
      setFormData({
        id: '',
        name: '',
        description: '',
        status: 'inactive',
        metaKeyword: '',
        seoTitle: '',
        updateBy: '',
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-auto">
            <div className="space-y-2">
              <Label htmlFor="name">Tên danh mục</Label>
              <input
                id = 'name'
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nhập tên danh mục"
                required
                className="w-full border px-2 py-1 rounded"
              />
            </div>

            {/* seoTitile */}
            <div className='space-y-2'>
              <Label htmlFor="seoTitle"></Label>
              <input
                id = 'seoTitle'
                type = 'text'
                name = 'seoTitle'
                value = {formData.seoTitle}
                onChange={handleChange}
                placeholder='Nhập tiêu đề'
                required
                className='w-full border px-2 py-1 rounded'
              />
            </div>

            {/*status*/}
            <div className="space-y-2">
              <Label className='block mb-1'>Status</Label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border px-2 py-1 rounded"
                required
              >
                <option value = "active">Active</option>
                <option value = "inactive">Inactive</option>
              </select>
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

export default CategoryForm;