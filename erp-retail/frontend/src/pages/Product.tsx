import React, {useState, useEffect} from 'react';
import ProductTableComponent from '../components/inventory_components/products/ProductTableComponent';
import ProductForm from '../components/inventory_components/products/ProductForm';

import {
  getPageProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
} from '../services/inventery-api/ProductService';
import { DialogContent, DialogDescription, DialogTitle, DialogTrigger,  Dialog, DialogHeader  } from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import { Plus, Search, Package, AlertTriangle, TrendingUp, DollarSign } from 'lucide-react';
import ProductStatic from '../components/inventory_components/products/ProductStatic';
import { ProductSearch } from '../components/inventory_components/products/ProductSearch';

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


const Product: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(0);
  const [totalPgaes, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [formOpen, setFormOpen] = useState<boolean>(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  useEffect(() => {
      loadProducts(page);
  }, [page]);
  

  const loadProducts = async (pageNum: number) => {
    setLoading(true);
    try {
      const res = await getPageProducts({page: pageNum, size, sort: 'name,asc'});
      setProducts(res.data.content);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleDelete = async (id: string) => {
    if (!window.confirm('Xác nhận xóa product này?')) return;
    await deleteProduct(id);

    if (products.length === 1 && page > 0) {
      setPage(page - 1);
    } else {
      loadProducts(page);
    }
  };
  
  const handleUpdate = (product: Product) => {
    setCurrentProduct(product);
    setFormOpen(true);
  };

  const handleCreate = () => {
    setCurrentProduct(null);
    setFormOpen(true);
  };

  const handleFormClose = () => {
    setFormOpen(false);
  };

  const handleFormSubmit = async (data: Product) => {
    if (currentProduct) {
      await updateProduct(currentProduct.id, data);
    } else {
      await createProduct(data);
    }

    setFormOpen(false);
    loadProducts(page);
  };

  const goToPage = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPgaes) {
      setPage(newPage);
    }
  }

  const handleChangeSize = (newSize: number) => {
    setSize(newSize > 0 ? newSize : 5);
    console.log("newSize:", newSize);
  }

  

  return (
    <div className='px-6'>
      <div className='md:px-10 -mt-10 '>
        <div className='flex items-center justify-between -mt-10'>
          <div className='mb-2'>
            <h3>Quản lý kho hàng</h3>
            <p className="text-muted-foreground">
              Theo dõi và quản lý tồn kho của bạn
            </p>
          </div>
        
          <div  className='mb-2'>
            <Dialog open={formOpen} onOpenChange={setFormOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" onClick={() => {
                  setCurrentProduct(null);
                  setFormOpen(true);
                }}
                  className="!rounded-lg bg-gray-950 text-white hover:bg-gray-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Thêm sản phẩm
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader className="text-right">
                  <DialogTitle >
                    {currentProduct ? 'Sửa sản phẩm' : 'Thêm sản phẩm mới'}
                  </DialogTitle>
                  <DialogDescription>
                    {currentProduct ? 'Cập nhật thông tin sản phẩm' : 'Nhập thông tin sản phẩm mới'}
                  </DialogDescription>
                </DialogHeader>
                <ProductForm
                  initialData={currentProduct}
                  onSubmit = {handleFormSubmit}
                  onClose = {handleFormClose}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div>
          <ProductStatic/>
        </div>

        
      </div>
          <ProductSearch />

      <div className= "mt-6 mx-auto px-6 md:px-10">
        <ProductTableComponent
          data = {products}
          loading = {loading}
          onEdit = {handleUpdate}
          onDelete = {handleDelete}
          onAdd = {handleCreate}
          onSetSize = {handleChangeSize}
        />
      </div>

      <div className="flex justify-center items-center mt-4 space-x-4">
        <button
          onClick={() => goToPage(page - 1)}
          disabled={page === 0}
          className='px-3 py-1 bg-gray-200 rounded disabled:opacity-50'
        >
          Prev
        </button>

        <span>
          Trang <strong>{totalPgaes === 0 ? 0: page + 1}</strong> / <strong>{totalPgaes}</strong>
        </span>

        <button
          onClick={() => goToPage(page + 1)}
          disabled={page + 1 === totalPgaes}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
    );
  };
export default Product;