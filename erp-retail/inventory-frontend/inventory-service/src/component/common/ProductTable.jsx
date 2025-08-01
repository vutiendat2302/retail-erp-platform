import React from "react";

const ProductTable = ({ data, loading, onEdit, onDelete, onAdd}) => {
    return (
        <div>
            <div className="mb-4 flex justify-end">
                <button
                    onClick={onAdd}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    Thêm sản phẩm
                </button>
            </div>
            <table className="min-w-full bg-white border">
                <thead>
                    <tr className="bg-gray-100 text-left">
                        <th className="px-4 py-2">Tên</th>
                        <th className="px-4 py-2">Mô tả</th>
                        <th className="px-4 py-2">Trạng thái</th>
                        <th className="px-4 py-2">Giá mua vào</th>
                        <th className="px-4 py-2">Giá bán</th>
                        <th className="px-4 py-2">Giá khuyến mại</th>
                        <th className="px-4 py-2">brand</th>
                        <th className="px-4 py-2">category</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan="7" className="px-4 py-6 text-center">
                                Đang tải dữ liệu...
                            </td>
                        </tr>
                    ) : data.length > 0 ? (
                        data.map(emp => (
                        <tr key={emp.id} className="border-t">
                            <td className="px-4 py-2">{emp.name}</td>
                            <td className="px-4 py-2">{emp.seoTitle}</td>
                            <td className="px-4 py-2">{emp.description}</td>
                            <td className="px-4 py-2">{emp.status}</td>
                            <td className="px-4 py-2">{emp.priceNormal || '—'}</td>
                            <td className="px-4 py-2">{emp.priceSell || '—'}</td>
                            <td className="px-4 py-2">{emp.weight || '—'}</td>
                            <td className="px-4 py-2">{emp.viewCount || '—'}</td>
                            <td className="px-4 py-2 space-x-2">
                                <button
                                    onClick={() => onEdit(emp)}
                                    className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Sửa
                                </button>
                                <button
                                    onClick={() => onDelete(emp.id)}
                                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                >
                                    Xóa
                                </button>
                            </td>
                        </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="px-4 py-6 text-center">
                                Không có dữ liệu
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ProductTable;