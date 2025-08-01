import React, {useState, useEffect} from 'react';
import ProductTable from '../../component/common/ProductTable.jsx';
import EmployeeForm from '../../component/common/ProductForm.jsx';
import {
    getPageProducts,
    createProduct,
    updateProduct,
    deleteProduct
} from '../../services/product';
const Product = () => {
    const [product, setProduct] = useState([]);
    const [page, setPage] = useState(0);
    const [size] = useState(50);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);

    const [formOpen, setFormOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);

    useEffect(() => {
    const loadProduct = async () => {
        console.log("print");
        try {
        const data = await getPageProducts(0, 50, "name,asc");
        console.log(data);
        } catch (error) {
        console.error("Lỗi khi load sản phẩm:", error);
        }
    };
    loadProduct();
    }, []);

    

    const loadProduct = async pageNum => {
        setLoading(true);
        console.log("print");
        try {
            const res = await getPageProducts({ page: pageNum, size, sort: 'name, asc'});
            setProduct(res.data.content);
            setTotalPages(res.data.totalPages);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async id => {
        if (!window.confirm('Xac nhan xoa product nay?')) return;
        await deleteProduct(id);

        if (product.length === 1 && page > 0) {
            setPage(page - 1);
        } else {
            loadProduct(page);
        }
    }

    const handleEdit = emp => {
        setCurrentProduct(emp);
        setFormOpen(true);
    };

    const handleAdd = () => {
        setCurrentProduct(null);
        setFormOpen(true);
    };

    const handleFormClose = () => {
        setFormOpen(false);
    };

    const handleFormSubmit = async data => {
        if (currentProduct) {
            await updateProduct(currentProduct.id, data);
        } else {
            await createProduct(data);
        }
        setFormOpen(false);
        loadEmployees(page);
    };

    const goToPage = newPage => {
        if (newPage >= 0 && newPage < totalPages) {
            setPage(newPage);
        }
    };

    return (
        <div className='p-6'>
            <h1 className='text-2x1 font-semibold mb-4'>
                Quản lý sản phẩm
            </h1>
            <ProductTable
                data={product}
                loading={loading}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onAdd={handleAdd}
            />
            {/* Pagination */}

            <div className="flex justify-center items-center mt-4 space-x-4">
                <button
                    onClick={() => goToPage(page - 1)}
                    disabled={page === 0}
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                    >
                    Prev
                </button>

                        <span>
                        Trang <strong>{page + 1}</strong> / <strong>{totalPages}</strong>
                        </span>

                <button
                    onClick={() => goToPage(page + 1)}
                    disabled={page + 1 === totalPages}
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                    >
                    Next
                </button>
            </div>'

            {formOpen && (
                <ProductFrom
                    initialData={currentProduct}
                    onSubmit={handleFormSubmit}
                    onClose={handleFormClose}
                />
            )}
        </div>
    );
};

export default Product;
