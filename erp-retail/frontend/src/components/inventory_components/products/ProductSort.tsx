import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Badge } from '../../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../ui/dialog';
import { Plus, ArrowUp,ArrowDown,ArrowUpDown,SortAsc,SortDesc, Search, Package, AlertTriangle, TrendingUp, DollarSign } from 'lucide-react';
import { Label } from '../../ui/label';
import { Select } from '../../ui/select';
import { SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../../ui/select';
import { Tooltip } from '../../ui/tooltip';
import { TooltipContent, TooltipTrigger } from '@radix-ui/react-tooltip';

type SortField = 'name' | 'sku' | 'category' | 'quantity' | 'price' | 'createdAt' | 'updatedAt';
type SortDirection = 'asc' | 'desc';
const sortOptions = [
  { value: 'name', label: 'Tên sản phẩm' },
  { value: 'sku', label: 'SKU' },
  { value: 'category', label: 'Danh mục' },
  { value: 'quantity', label: 'Số lượng' },
  { value: 'price', label: 'Giá' },
  { value: 'createdAt', label: 'Ngày tạo' },
  { value: 'updatedAt', label: 'Cập nhật cuối' }
];
const [sortField, setSortField] = useState<SortField>('name');
const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
const toggleSortDirection = () => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.sku.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // Sorting logic
    filtered.sort((a, b) => {
      let aValue: any = a[sortField];
      let bValue: any = b[sortField];

      // Handle special cases
      if (sortField === 'createdAt' || sortField === 'updatedAt') {
        aValue = new Date(aValue || '').getTime();
        bValue = new Date(bValue || '').getTime();
      } else if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue?.toLowerCase() || '';
      }

      // Handle null/undefined values
      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return sortDirection === 'asc' ? -1 : 1;
      if (bValue == null) return sortDirection === 'asc' ? 1 : -1;

      let comparison = 0;
      if (aValue < bValue) {
        comparison = -1;
      } else if (aValue > bValue) {
        comparison = 1;
      }

      return sortDirection === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [products, searchTerm, selectedCategory, sortField, sortDirection]);

  
export const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
export const getSortIcon = (field: SortField) => {
    if (sortField !== field) return <ArrowUpDown className="w-4 h-4 text-muted-foreground" />;
    return sortDirection === 'asc' ? 
      <ArrowUp className="w-4 h-4 text-foreground" /> : 
      <ArrowDown className="w-4 h-4 text-foreground" />;
  };

function ProductSortSingle() {

  <div className='space-y-4'>
    <div className='flex flex-col sm:flex-row gap-4'>
      <span className="text-sm font-medium text-muted-foreground">
        Sắp xếp theo:
      </span>

      <Select value={sortField} onValueChange={(value:SortField) => setSortField(value)}>
        <SelectTrigger className='w-48'>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map(option => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Tooltip>
        <TooltipTrigger>
          <Button
            variant="outline"
            size='sm'
            onClick={toggleSortDirection}
            className='px-3'
          >
            {sortDirection === 'asc' ? (
                      <SortAsc className="w-4 h-4" />
                    ) : (
                      <SortDesc className="w-4 h-4" />
                    )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{sortDirection === 'asc' ? 'Tăng dần' : 'Giảm dần'}</p>
        </TooltipContent>
      </Tooltip>

      <div className="text-sm text-muted-foreground flex items-center">
        Đang sắp xếp theo <span className="font-medium mx-1">{sortOptions.find(opt => opt.value === sortField)?.label}</span>
        ({sortDirection === 'asc' ? 'tăng dần' : 'giảm dần'})
      </div>
    </div>
  </div>



}

function ProductSortMany() {

}



export {ProductSortSingle, ProductSortMany};