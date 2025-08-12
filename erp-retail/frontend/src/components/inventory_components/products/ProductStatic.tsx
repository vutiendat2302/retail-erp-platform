import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Badge } from '../../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../ui/dialog';
import { Plus, Search, Package, AlertTriangle, TrendingUp, DollarSign } from 'lucide-react';


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

export function ProductStatic() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(products.map(p => p.category)));
    return ['all', ...cats];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.sku.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  const totalProducts = products.length;
  const totalValue = products.reduce((sum, product) => sum + (product.quantity * product.price), 0);
  const lowStockProducts = products.filter(p => p.quantity <= p.minStock).length;
  const outOfStockProducts = products.filter(p => p.quantity === 0).length;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const handleSaveProduct = (productData: Omit<Product, 'id' | 'createdAt'>) => {
    if (editingProduct) {
      setProducts(prev => prev.map(p =>
        p.id === editingProduct.id
          ? { ...productData, id: editingProduct.id, createdAt: editingProduct.createdAt }
          : p
      ));
    } else {
      const newProduct: Product = {
        ...productData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString().split('T')[0]
      };
      setProducts(prev => [...prev, newProduct]);
    }
    setIsDialogOpen(false);
    setEditingProduct(null);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsDialogOpen(true);
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  const getStockStatus = (product: Product) => {
    if (product.quantity === 0) return { label: 'Hết hàng', variant: 'destructive' as const };
    if (product.quantity <= product.minStock) return { label: 'Sắp hết', variant: 'secondary' as const };
    return { label: 'Còn hàng', variant: 'default' as const };
  };


  return (
    <div className="p-6 w-[98%] mx-auto">
      {/* Stats Cards */}
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng sản phẩm</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng giá trị</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalValue)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sắp hết hàng</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">{lowStockProducts}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hết hàng</CardTitle>
            <TrendingUp className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">{outOfStockProducts}</div>
          </CardContent>
        </Card>
      </div>
      </div>
  )
}

export default ProductStatic;