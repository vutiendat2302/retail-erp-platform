import React, { useState, useEffect} from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Label } from '../../ui/label';
import { Textarea } from '../../../components/ui/textarea';
import { Button } from '../../ui/button';
import { getBrandName, getCategoryName, getManufacturingName } from '../../../services/inventery-api/ProductService';
import type { ProductFormData, Product, CategoryName, ManufacturingLocationName, BrandName, ProductFormProps } from '../../../types/InventoryServiceType';

const ProductForm: React.FC<ProductFormProps> = ({
  initialData, onSubmit, onClose }) => {
  const [formData, setFormData] = useState<ProductFormData>({
    id: '',
    name: '',
    description: '',
    priceNormal: 0,
    brandName: '',
    categoryName: '',
    manufacturingLocationName: '',
    status: 'inactive',
    sku: '',
    tag: '',
    priceSell: 0,
    promotionPrice: 0,
    metaKeyword: '',
    seoTitle: '',
    updateBy: '',
    brandId: '',
    categoryId: '',
    manufacturingLocationId: '',
  });

  const [categoryName, setCategoryName] = useState<CategoryName[]>([]);
  useEffect(() => {
    const fetchCategoryName = async () => {
      try {
        const res = await getCategoryName();
        setCategoryName(res.data);
      } catch (error) {
        console.error("Fail to fetch error category name: ", error);
      }
    }

    fetchCategoryName();
  }, []);

  const [brandName, setBrandName] = useState<BrandName[]>([]);
  useEffect(() => {
    const fetchBrandName = async () => {
      try {
        const res = await getBrandName();
        setBrandName(res.data);
      } catch (error) {
        console.error("Fali to fetch error brand", error);
      }
    }
    fetchBrandName();
  }, []);

  const [manufacturingLocationName, setManufacturingLocationName] = useState<ManufacturingLocationName[]>([]);
  useEffect(() => {
    const fetchManufacturingLocationName = async () => {
      try {
        const res = await getManufacturingName();
        setManufacturingLocationName(res.data);
      } catch (error) {
        console.error("Fali to fetch error manufacturing", error);
      }
    }
    fetchManufacturingLocationName();
  }, []);

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
        status: initialData.status || 'inactive',
        sku: initialData.sku || '',
        tag: initialData.tag || '',
        priceSell: initialData.priceSell || 0,
        promotionPrice: initialData.promotionPrice || 0,
        metaKeyword: initialData.metaKeyword || '',
        seoTitle: initialData.seoTitle || '',
        updateBy: initialData.updateBy || '',
        brandId: initialData.brandId || '',
        categoryId: initialData.categoryId || '',
        manufacturingLocationId: initialData.manufacturingLocationId || '',
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
        status: 'inactive',
        sku: '',
        tag: '',
        priceSell: 0,
        promotionPrice: 0,
        metaKeyword: '',
        seoTitle: '',
        updateBy: '',
        brandId: '',
        categoryId: '',
        manufacturingLocationId: '',
      })
    }
  }, [initialData]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    setFormData((prev) => ({...prev, [name]: value}));
    if (name === "categoryId") {
      const selectedCategory = categoryName.find((cat) => cat.id === value);
      setFormData((prev) => ({
        ...prev,
        categoryId: value,
        categoryName: selectedCategory ? selectedCategory.name : "",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    if (name == "brandId") {
      const selectedBrand = brandName.find((brand) => brand.id === value);
      setFormData((prev) => ({
        ...prev,
        brandId: value,
        brandName: selectedBrand ? selectedBrand.name: "",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    if (name == "manufacturingLocationId") {
      const selectedManufacturing = manufacturingLocationName.find((manu) => manu.id === value);
      setFormData((prev) => ({
        ...prev,
        manufacturingLocationId: value,
        manufacturingLocationName: selectedManufacturing ? selectedManufacturing.name: "",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
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

            {/* sku */}
            <div className='space-y-2'>
              <Label htmlFor="sku">SKU</Label>
              <input
                id = 'sku'
                type = 'text'
                name = 'sku'
                value = {formData.sku}
                onChange={handleChange}
                placeholder='Nhập mã sản phẩm'
                required
                className='w-full border px-2 py-1 rounded'
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

            {/*brand*/}
            <div>
              <Label className='block mb-1'>Brand</Label>
              <select
                id = "brandId"
                name = "brandId"
                value = {formData.brandId}
                onChange={handleChange}
                className='w-full border px-2 py-1 rounded'
              >
                <option value = "">--Chọn brand--</option>
                {brandName.map(brand => (
                  <option key = {brand.id} value = {brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>

            {/*category*/}
            <div>
              <Label className='block mb-1'>Category</Label>
              <select
                id="categoryId"
                name="categoryId"
                value={formData.categoryId}
                onChange= {handleChange}
                className="w-full border px-2 py-1 rounded"
              >
                <option value="">-- Chọn Category --</option>
                {categoryName.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
        

            {/*manufacturing*/}
            <div>
              <Label className='block mb-1'>ManufacturingLocation</Label>
              <select
                id = "manufacturingLocationId"
                name = "manufacturingLocationId"
                value = {formData.manufacturingLocationId}
                className='w-full border px-2 py-1 rounded'
                onChange={handleChange}
              >
                <option value = "">--Chọn manufacturing--</option>
                {manufacturingLocationName.map(manu => (
                  <option key = {manu.id} value = {manu.id}>
                    {manu.name}
                  </option>
                ))}
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

export default ProductForm;