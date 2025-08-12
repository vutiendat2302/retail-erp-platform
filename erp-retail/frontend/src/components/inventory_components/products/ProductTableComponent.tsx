import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { TableBody, TableCell, TableHead, TableRow, TableHeader, Table } from '../../ui/table';
import { Button } from '../../ui/button';
import { ScrollArea } from '../../ui/scroll-area';
import { Tooltip, TooltipTrigger, TooltipContent } from '../../ui/tooltip';
import { Eye } from 'lucide-react';
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

interface ProductTable {
  data: Product[];
  loading: boolean;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
  onSetSize: (size: number) => void;
}

const ProductTableComponent: React.FC<ProductTable> = ({
  data,
  loading,
  onEdit,
  onDelete,
  onAdd,
  onSetSize,
}) => {
  useEffect(() => {
      const container = document.getElementById("product-table-container");
      const item =  document.querySelector(".product-row") as HTMLElement;

      if (container && item) {
        const containerHeight = container.offsetHeight || 0;
        const itemHeight = item.offsetHeight || 1;

        const newSize = Math.floor(containerHeight / itemHeight);
        onSetSize?.(newSize);
      }
    }, [data, onSetSize]);

  
  return (
  <div className='w-full mx-auto items-center '>
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div>
            <CardTitle>
              Danh Sách sản phẩm
            </CardTitle>
            <CardDescription className='mt-2'>
              Hiển thị 50 trong tổng số 100 sản phẩm
            </CardDescription>
          </div>
          <div className="text-sm text-muted-foreground">
            Cuộn để xem thêm • Click tiêu đề để sắp xếp
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <div className='relative'>
            <ScrollArea className="h-[320px] w-full ">
            <Table>
              <TableHeader className="!border-b border-gray-700 bg-gray-100 dark:bg-gray-800">
                <TableRow className='!relative'>
                  <TableHead className='text-center w-[20%] !border-r !border-gray-300'>
                    Name
                  </TableHead>
                  <TableHead className='text-center w-[10%] !border-r !border-gray-300'>PriceNormal</TableHead>
                  <TableHead className='text-center !border-r !border-gray-300'>Brand</TableHead>
                  <TableHead className='text-center !border-r !border-gray-300'>Category</TableHead>
                  
                  <TableHead className='text-center !border-r !border-gray-300'>Status</TableHead>
                  <TableHead className='text-center '>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={7} className='px-4 py-6 text-center'>
                      Đang tải dữ liệu
                    </TableCell>
                  </TableRow>
                ): data.length>0 ? (
                  data.map((product) => (
                    <TableRow key = {product.id}>
                      <TableCell className='w-[20%] !border-r !border-gray-300'>
                        <div>
                          <div className='font-medium'>{product.name}</div>
                        </div>
                      </TableCell>
                      <TableCell className='text-center w-[10%] !border-r !border-gray-300'>{product.priceNormal}</TableCell>
                      <TableCell>{product.brandName || '-'}</TableCell>
                      <TableCell>{product.categoryName || '-'}</TableCell>
                
                      <TableCell>{product.status.toString()}</TableCell>
                      <TableCell className='text-right'>
                        <div className='flex justify-end gap-2'>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => console.log("Xem chi tieest san pham")}
                                className='rounded'
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Xem chi tiết</p>
                            </TooltipContent>
                          </Tooltip>

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onEdit(product)}
                            className='rounded'
                          >
                            Sửa
                          </Button>

                          <Button
                              variant="outline"
                              size="sm"
                              onClick={() => onDelete(product.id)}
                              className='rounded bg-red-400'
                            >
                              Xóa
                            </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className='px-4 py-6 text-center'>
                      Không có dữ liệu
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
        </div>
      </CardContent>
    </Card>
    </div>
  )
}
export default ProductTableComponent;

export function ProductViewData() {

}
