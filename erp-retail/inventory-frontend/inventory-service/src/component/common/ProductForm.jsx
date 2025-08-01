import React, { useState, useEffect } from 'react';

const ProductForm = ({ initialData, onSubmit, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        seoTitle: '',
        description: '',
        status: 'active',
        priceNormal: '0',
        priceSell: '0',
        promotionPrice: '0',
        brand: '',
        category: ''
        // nếu cần: branchId, positionId...
    });

    useEffect(() => {
        if (initialData) {
        setFormData({
            name:  initialData.name  || '',
            seoTitle: initialData.seoTitle || '',
            description: initialData.description || '',
            status: initialData.status || 'active',
            priceNormal:  initialData.priceNormal  || '',
            priceSell:  initialData.priceSell || '',
            promotionPrice:  initialData.promotionPrice  || '',
            brand:  initialData.brand  || '',
            category:  initialData.category  || ''

        });
        } else {
        setFormData({
            name: '',
            seoTitle: '',
            description: '',
            status: 'active',
            priceNormal: '0',
            priceSell: '0',
            promotionPrice: '0',
            brand: '',
            category: '',
            manufacturingLocation: ''
        });
        }
    }, [initialData]);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = e => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
        <div className="bg-white rounded shadow-lg w-full max-w-md p-6">
            <h2 className="text-xl mb-4">
            {initialData ? 'Cập nhật' : 'Thêm'} product
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
            {/* Tên */}
            <div>
                <label className="block mb-1">Tên</label>
                <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border px-2 py-1 rounded"
                />
            </div>
            {/* description */}
            <div>
                <label className="block mb-1">Mô tả</label>
                <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full border px-2 py-1 rounded"
                />
            </div>
            
            
            {/* Trạng thái */}
            <div>
                <label className="block mb-1">Trạng thái</label>
                <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border px-2 py-1 rounded"
                >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                </select>
            </div>

            {/* Giá mua vào */}
            <div>
                <label className="block mb-1">priceNormal</label>
                <input
                type="decimal"
                name="priceNormal"
                value={formData.priceNormal}
                onChange={handleChange}
                required
                className="w-full border px-2 py-1 rounded"
                />
            </div>

            {/* Giá bán */}
            <div>
                <label className="block mb-1">priceSell</label>
                <input
                type="decimal"
                name="priceSell"
                value={formData.priceSell}
                onChange={handleChange}
                required
                className="w-full border px-2 py-1 rounded"
                />
            </div>

            {/* Giá mua vào */}
            <div>
                <label className="block mb-1">promotionPrice</label>
                <input
                type="decimal"
                name="promotionPrice"
                value={formData.promotionPrice}
                onChange={handleChange}
                required
                className="w-full border px-2 py-1 rounded"
                />
            </div>

            {/* Brand */}
            <div>
                <label className="block mb-1">Thương hiệu</label>
                <select
                    name="brandId"
                    value={formData.brandId}
                    onChange={handleChange}
                    className="w-full border px-2 py-1 rounded"
                    required
                >
                    <option value="">-- Chọn thương hiệu --</option>
                    {brands.map((brand) => (
                    <option key={brand.id} value={brand.id}>
                        {brand.name}
                    </option>
                    ))}
                </select>
            </div>

            {/* Category */}
            <div>
            <label className="block mb-1">Danh mục</label>
            <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                className="w-full border px-2 py-1 rounded"
                required
            >
                <option value="">-- Chọn danh mục --</option>
                {categories.map((category) => (
                <option key={category.id} value={category.id}>
                    {category.name}
                </option>
                ))}
            </select>
            </div>


            {/* Buttons */}
            <div className="flex justify-end space-x-2 mt-6">
                <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                Hủy
                </button>
                <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                {initialData ? 'Lưu' : 'Thêm'}
                </button>
            </div>
            </form>
        </div>
        </div>
    );
};

export default ProductForm;