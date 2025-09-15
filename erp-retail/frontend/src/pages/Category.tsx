import React, {useState, useEffect} from 'react';
import { DialogContent, DialogDescription, DialogTitle, DialogTrigger, Dialog, DialogHeader } from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import { Plus, } from 'lucide-react';
import { createCategory, updateCategory, deleteCategory, getCountCategoryActive, getSearchCategory } from '../services/inventery-api/CategoryService';
import type { Category, CategoryFormData, CategoryFormProps, CategoryTableProp} from '../types/InventoryServiceType';
import {CategoryTable } from '../components/inventory_components/categories/CategoryTable';
import CategoryForm from '../components/inventory_components/categories/CategoryForm'
import CategoryStatic from '../components/inventory_components/categories/CategoryStatic';
import { getCountProductActive } from '../services/inventery-api/ProductService';

export function Category() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(5);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [formOpen, setFormOpen] = useState<boolean>(false);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [countCategoryActive, setCountCategoryActive] = useState<number>(0);
  const [search, setSearch] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [countProduct, setCountProduct] = useState<number>(0);

  const loadCategories = async (pageNumber: number) => {
    setLoading(true);
    try {
      const res = await getSearchCategory({
        search: search || undefined,
        status: status || undefined,
        page: pageNumber, size, sort: 'name,asc'});
        
      setCategories(res.data.content);
      setTotalPages(res.data.totalPages);
      setTotalElements(res.data.totalElements);
      setCountCategoryActive((await getCountCategoryActive()).data);
      setCountProduct((await getCountProductActive()).data)
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (size > 0) {
      loadCategories(page);
    }
  }, [page, size, search, status]);
  
  const handleDelete = async (id: string) => {
    if (!window.confirm('Xác nhận xóa category này?')) return;
    await deleteCategory(id);

    if (categories.length === 1 && page > 0) {
      setPage(page - 1);
    } else {
      loadCategories(page);
    }
  };

  const handleUpdate = (category: Category) => {
    setCurrentCategory(category);
    setFormOpen(true);
  };

  const handleCreate = () => {
    setCurrentCategory(null);
    setFormOpen(true);
  };

  const handleFormClose = () => {
    setFormOpen(false);
  };

  const handleFormSubmit = async (data: CategoryFormData) => {
    if (currentCategory) {
      console.log('Cập nhật danh mục', data);
      await updateCategory(currentCategory.id, data);
      console.log('Update thành công');
      // Gọi loadProducts trực tiếp để làm mới dữ liệu
      loadCategories(page);
    } else {
      console.log('Tạo danh mục mới', data);
      await createCategory(data);
      console.log('Create thành công');
      // Gọi loadProducts trực tiếp để làm mới dữ liệu trên trang hiện tại
      loadCategories(page);
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
            <h3 className='mb-2'>Quản lý danh mục</h3>
            <p className="text-muted-foreground">
              Quản lý dnah mục sản phẩm và phân loại hàng hóa
            </p>
          </div>

          <div>
            <Dialog open={formOpen} onOpenChange={setFormOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" onClick={() => {
                  setCurrentCategory(null);
                  setFormOpen(true);
                }}
                  className="!rounded-lg bg-gray-950 text-white hover:bg-gray-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Thêm danh mục
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader className="text-right">
                  <DialogTitle >
                    {currentCategory ? 'Sửa danh mục' : 'Thêm danh mục mới'}
                  </DialogTitle>
                  <DialogDescription>
                    {currentCategory ? 'Cập nhật thông tin danh mục' : 'Nhập thông tin danh mục mới'}
                  </DialogDescription>
                </DialogHeader>
                <CategoryForm
                  initialData={currentCategory}
                  onSubmit={handleFormSubmit}
                  onClose={handleFormClose}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div>
          <CategoryStatic
            totalElements={totalElements}
            countCategoryActive={countCategoryActive}
            totalProduct={countProduct}
          />
        </div>

      

        <div>
        </div>
        

        <div>
          <CategoryTable
            data={categories}
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
}