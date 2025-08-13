import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Badge } from '../../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../ui/dialog';
import { Plus, Search, Package, AlertTriangle, TrendingUp, DollarSign } from 'lucide-react';
import { Label } from '../../ui/label';
import { Select } from '../../ui/select';
import { SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../../ui/select';
export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  quantity: number;
  price: number;
  minStock: number;
  description: string;
  createdAt: string;
}

const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Laptop Dell Inspiron 15',
    sku: 'DELL-INS-15-001',
    category: 'Laptop',
    quantity: 25,
    price: 15000000,
    minStock: 5,
    description: 'Laptop Dell Inspiron 15 inch, Intel Core i5',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'Chuột Logitech MX Master 3',
    sku: 'LOG-MX3-001',
    category: 'Phụ kiện',
    quantity: 3,
    price: 2500000,
    minStock: 10,
    description: 'Chuột không dây Logitech MX Master 3',
    createdAt: '2024-01-10'
  },
  {
    id: '3',
    name: 'Bàn phím cơ Keychron K8',
    sku: 'KEY-K8-001',
    category: 'Phụ kiện',
    quantity: 15,
    price: 3500000,
    minStock: 8,
    description: 'Bàn phím cơ Keychron K8 wireless',
    createdAt: '2024-01-12'
  },
  {
    id: '4',
    name: 'Màn hình Samsung 27 inch',
    sku: 'SAM-MON-27-001',
    category: 'Màn hình',
    quantity: 0,
    price: 8500000,
    minStock: 3,
    description: 'Màn hình Samsung 27 inch 4K',
    createdAt: '2024-01-08'
  }
];

  // const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  // const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  // const handleViewProduct = (product: Product) => {
  //   setSelectedProduct(product);
  //   setIsDetailDialogOpen(true);
  // };

export function ProductSearch() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  // const [isDialogOpen, setIsDialogOpen] = useState(false);
  // const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // const totalProducts = products.length;
  // const totalValue = products.reduce((sum, product) => sum + (product.quantity * product.price), 0);
  // const lowStockProducts = products.filter(p => p.quantity <= p.minStock).length;
  // const outOfStockProducts = products.filter(p => p.quantity === 0).length;

  // const formatCurrency = (amount: number) => {
  //   return new Intl.NumberFormat('vi-VN', {
  //     style: 'currency',
  //     currency: 'VND'
  //   }).format(amount);
  // };

  // const getStockStatus = (product: Product) => {
  //   if (product.quantity === 0) return { label: 'Hết hàng', variant: 'destructive' as const };
  //   if (product.quantity <= product.minStock) return { label: 'Sắp hết', variant: 'secondary' as const };
  //   return { label: 'Còn hàng', variant: 'default' as const };
  // };


  // const [selectedTimezone, setSelectedTimezone] = useState('');

  // const handleSaveProduct = (productData: Omit<Product, 'id' | 'createdAt'>) => {
  //   if (editingProduct) {
  //     setProducts(prev => prev.map(p =>
  //       p.id === editingProduct.id
  //         ? { ...productData, id: editingProduct.id, createdAt: editingProduct.createdAt }
  //         : p
  //     ));
  //   } else {
  //     const newProduct: Product = {
  //       ...productData,
  //       id: Date.now().toString(),
  //       createdAt: new Date().toISOString().split('T')[0]
  //     };
  //     setProducts(prev => [...prev, newProduct]);
  //   }
  //   setIsDialogOpen(false);
  //   setEditingProduct(null);
  // };

  // const handleEditProduct = (product: Product) => {
  //   setEditingProduct(product);
  //   setIsDialogOpen(true);
  // };

  // const handleDeleteProduct = (productId: string) => {
  //   setProducts(prev => prev.filter(p => p.id !== productId));
  // };

  
  

  const categories = [
  { value: 'laptop', label: 'Laptop' },
  { value: 'desktop', label: 'Desktop' },
  { value: 'accessories', label: 'Phụ kiện' },
  { value: 'monitor', label: 'Màn hình' },
  { value: 'components', label: 'Linh kiện' }
  ];

  const brands = [
    { value: 'dell', label: 'Dell' },
    { value: 'hp', label: 'HP' },
    { value: 'lenovo', label: 'Lenovo' },
    { value: 'asus', label: 'ASUS' },
    { value: 'logitech', label: 'Logitech' }
  ];

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  return (
    <div className="p-6 w-[98%] mx-auto">

      {/* Search and Filter */}
      <Card >
        <CardContent >
          <div className="flex flex-col flex-wrap sm:flex-row gap-4">
            <div className="relative flex-1 !rounded-md ">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Tìm kiếm sản phẩm, SKU, tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="!pl-10"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px] !rounded-md">
                <SelectValue placeholder="Danh mục" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả danh mục</SelectItem>
                {categories.map(cat => (
                  <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedBrand} onValueChange={setSelectedBrand}>
              <SelectTrigger className="w-[180px] !rounded-md">
                <SelectValue placeholder="Thương hiệu" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả thương hiệu</SelectItem>
                {brands.map(brand => (
                  <SelectItem key={brand.value} value={brand.value}>{brand.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px] !rounded-md">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="active">Đang bán</SelectItem>
                <SelectItem value="inactive">Ngừng bán</SelectItem>
                <SelectItem value="draft">Nháp</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      
  </div>
)}
