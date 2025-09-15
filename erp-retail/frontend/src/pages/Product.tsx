import React, {useState, useEffect} from 'react';
import ProductForm from '../components/inventory_components/products/ProductForm';

import {
  createProduct,
  updateProduct,
  deleteProduct,
  getCountProductActive,
  getCountBrandActive,
  getCountCategoryActive,
  getCategoryName,
  getBrandName,
  getSearchProducts,
} from '../services/inventery-api/ProductService';
import { DialogContent, DialogDescription, DialogTitle, DialogTrigger, Dialog, DialogHeader } from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import { Plus, Search, Package, AlertTriangle, TrendingUp, DollarSign, University } from 'lucide-react';
import ProductStatic from '../components/inventory_components/products/ProductStatic';
import { ProductSearch } from '../components/inventory_components/products/ProductSearch';
import { ProductTableComponent } from '../components/inventory_components/products/ProductTableComponent';
import type { Product, ProductFormData, CategoryName, ManufacturingLocationName, BrandName } from '../types/InventoryServiceType';

const Product: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(20);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [formOpen, setFormOpen] = useState<boolean>(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [countProductActive, setCountProductActive] = useState<number>(0);
  const [countBrandActive, setCountBrandActive] = useState<number>(0);
  const [countCategoryActive, setCountCategoryActive] = useState<number>(0);
  const [categories, setCategories] = useState<CategoryName[]>([]);
  const [brands, setBrands] = useState<BrandName[]>([]);
  const [openFindCategory, setOpenFindCategory] = useState<boolean>(false);
  const [openFindBrand, setOpenFindBrand] = useState<boolean>(false);
  const [openFindStatus, setOpenFindStatus] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [brand, setBrand] = useState<string>('');
  const [status, setStatus] = useState<string>('');

  const loadProducts = async (pageNum: number) => {
    setLoading(true);
    try {
      const res = await getSearchProducts({
        search: search || undefined,
        category: category || undefined,
        brand: brand || undefined,
        status: status || undefined,
        page: pageNum, size, sort: 'name,asc'});
      
      setProducts(res.data.content);
      setTotalPages(res.data.totalPages);
      setTotalElements(res.data.totalElements);

      setCountProductActive((await getCountProductActive()).data);
      setCountBrandActive((await getCountBrandActive()).data);
      setCountCategoryActive((await getCountCategoryActive()).data);
      setCategories((await getCategoryName()).data);
      setBrands((await getBrandName()).data);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (size > 0) {
      loadProducts(page);
    }
  }, [page, size, search, category, brand, status]);
  
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

const handleSearch = (
  search: string | null,
  category: string | null,
  brand: string | null,
  status: string | null
) => {
  setSearch(search ?? "");       // nếu null thì set ""
  setCategory(category ?? "");
  setBrand(brand ?? "");
  setStatus(status ?? "");
  setPage(0); // reset về trang 0 mỗi khi search/filter
};

  const handleFormSubmit = async (data: ProductFormData) => {
    if (currentProduct) {
      console.log('Cập nhật sản phẩm', data);
      await updateProduct(currentProduct.id, data);
      console.log('Update thành công');
      // Gọi loadProducts trực tiếp để làm mới dữ liệu
      loadProducts(page);
    } else {
      console.log('Tạo sản phẩm mới', data);
      await createProduct(data);
      console.log('Create thành công');
      // Gọi loadProducts trực tiếp để làm mới dữ liệu trên trang hiện tại
      loadProducts(page);
    }

    setFormOpen(false);
  };

  const goToPage = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  }

  return (
    <div className='px-6'>
      <div className='md:px-10 -mt-10 '>
        <div className='flex items-center justify-between'>
          <div >
            <h3 className='mb-2'>Quản lý sản phẩm</h3>
            <p className="text-muted-foreground">
              Theo dõi và quản lý sản phẩm của bạn
            </p>
          </div>

          <div>
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
                  onSubmit={handleFormSubmit}
                  onClose={handleFormClose}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div>
          <ProductStatic
            totalElements={totalElements}
            countProducActive = {countProductActive}
            countCategoryActive = {countCategoryActive}
            countBrandActive = {countBrandActive}
          />
        </div>

      

        <div>
          <ProductSearch
            categories = {categories}
            brands = {brands}
            openFindCategory = {openFindCategory}
            setOpenFindCategory = {setOpenFindCategory}
            openFindBrand = {openFindBrand}
            setOpenFindBrand = {setOpenFindBrand}
            onSearch={handleSearch}
          />
        </div>
        

        <div>
          <ProductTableComponent
            data={products}
            loading={loading}
            onEdit={handleUpdate}
            onDelete={handleDelete}
            totalElements={totalElements}
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
            Trang <strong>{totalPages === 0 ? 0 : page + 1}</strong> / <strong>{totalPages}</strong>
          </span>

          <button
            onClick={() => goToPage(page + 1)}
            disabled={page + 1 >= totalPages}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
