import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { TableBody, TableCell, TableHead, TableRow, TableHeader, Table } from '../../ui/table';
import { Button } from '../../ui/button';
import { Tooltip, TooltipTrigger} from '../../ui/tooltip';
import { Eye, Trash, Pencil, Tag, Calendar, Edit } from 'lucide-react';
import { DialogHeader, Dialog, DialogContent, DialogDescription, DialogTitle } from '../../ui/dialog';
import { formatCurrency, formatDate } from '../Convert';
interface Product {
  id: string;
  name: string;
  description: string;
  priceNormal: number;
  status: string;
  brandName: string;
  categoryName: string;
  manufacturingLocationName: string;
  sku: string;
  tag: string;
  priceSell: number;
  promotionPrice: number;
  metaKeyword: string;
  seoTitle: string;
  updateBy: string;
  updateAt: string;
  createBy: string;
  createAt: string;
  brandId: string;
  categoryId: string;
  manufacturingLocationId: string;
  weight: number;
  vat: number;
}

interface ProductTable {
  data: Product[];
  loading: boolean;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  totalElements: number
}


export const ProductTableComponent: React.FC<ProductTable> = ({
  data,
  loading,
  onEdit,
  onDelete,
  totalElements,
}) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [openInformationProduct, setOpenInformationProduct] = useState<boolean>(false);

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setOpenInformationProduct(true);
  }

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
              Hiển thị {data.length} trong tổng số {totalElements} sản phẩm
            </CardDescription>
          </div>
          <div className="text-sm text-muted-foreground">
            Cuộn để xem thêm • Click tiêu đề để sắp xếp
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border relative overflow-hidden">
          <div className='w-full h-[400px] overflow-auto scroll-smooth'
            style = {{
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(155,155,155,0.5) transparent'
            }}
          >
            <Table className='relative'>
              <TableHeader className=" sticky top-0 z-50 !border-b border-gray-900 bg-gray-100 dark:bg-gray-900">
                <TableRow className='hover:bg-transparent'>
                  <TableHead className='text-center !border-r !border-gray-300'>
                    Name
                  </TableHead>
                  <TableHead className='text-center !border-r !border-gray-300'>SKU</TableHead>
                  <TableHead className='text-center !border-r !border-gray-300'>PriceNormal</TableHead>
                  <TableHead className='text-center !border-r !border-gray-300'>Brand</TableHead>
                  <TableHead className='text-center !border-r !border-gray-300'>Category</TableHead>
                  <TableHead className='text-center !border-r !border-gray-300'>Status</TableHead>
                  <TableHead className='text-center '>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={8} className='px-4 py-6 text-center'>
                      Đang tải dữ liệu
                    </TableCell>
                  </TableRow>
                ): data.length>0 ? (
                  data.map((product) => (
                    <TableRow key = {product.id}>
                      <TableCell className='!border-r !border-gray-300'>
                        <div>
                          <div className='font-medium'>{product.name}</div>
                          <p>{product.seoTitle}</p>
                        </div>
                      </TableCell>
                      <TableCell className='text-center !border-r !border-gray-300'>{product.sku} </TableCell>
                      <TableCell className='text-center !border-r !border-gray-300'>{formatCurrency(product.priceNormal)}</TableCell>
                      <TableCell className='text-left !border-r !border-gray-300'>{product.brandName || '-'}</TableCell>
                      <TableCell className='text-left !border-r !border-gray-300'>{product.categoryName || '-'}</TableCell>
                      <TableCell className='text-center !border-r !border-gray-300 '>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          product.status === 'active' ? 'bg-green-100 text-green-700'
                          :'bg-red-100 text-red-700'
                        }`}
                        >
                          {product.status}
                        </span>
                      </TableCell>
                      <TableCell className='text-center'>
                        <div className='flex gap-2 items-center justify-center'>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => {handleViewProduct(product)}}
                                className='!rounded-md text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white transition-colors'
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                            </TooltipTrigger>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => onEdit(product)}
                                className='!rounded-md text-green-500 border-green-500 hover:bg-green-500 hover:text-white transition-colors'
                              >
                                <Pencil className="w-4 h-4" />
                              </Button>
                            </TooltipTrigger>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => onDelete(product.id)}
                                className='!rounded-md text-red-500 border-red-500 hover:bg-red-500 hover:text-white transition-colors'
                              >
                                <Trash className="w-4 h-4" />
                              </Button>
                            </TooltipTrigger>
                          </Tooltip>
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
        </div>
        </div>
      </CardContent>
    </Card>

    {selectedProduct && (
      <Dialog open = {openInformationProduct} onOpenChange={setOpenInformationProduct}>
        <DialogContent className='max-w-2x1'>
          <DialogHeader>
            <DialogTitle className='flex items-center space-x-2'>
              <span>{selectedProduct.name}</span>
            </DialogTitle>
            <DialogDescription>
              Chi tiết thông tin sản phẩm
            </DialogDescription>
          </DialogHeader>

          <div className='grid grid-cols-2 gap-6'>
            <div className='space-y-4'>
              <div>
                <h4 className='font-medium mb-2'>Thông tin cơ bản</h4>
                <div className='space-y-2 text-sm'>
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>SKU:</span>
                    <code className='bg-muted px-2 py-1 rounded text-xs'>
                      {selectedProduct.sku}
                    </code>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Danh mục:</span>
                    <span>{selectedProduct.categoryName}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Thương hiệu:</span>
                    <span>{selectedProduct.brandName}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Giá mua vào:</span>
                    <span className="font-medium">
                      {formatCurrency(selectedProduct.priceNormal)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Giá bán:</span>
                    <span className="font-medium">
                      {formatCurrency(selectedProduct.priceSell)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Giá khuyến mãi:</span>
                    <span className="font-medium">
                      {formatCurrency(selectedProduct.promotionPrice)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <span className="font-medium">
                      {selectedProduct.status}
                    </span>
                  </div>
                </div>
              </div>

            {selectedProduct.weight && (
              <div>
              <h4 className="font-medium mb-2">Thông số kỹ thuật</h4>
              <div className="space-y-2 text-sm">
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Trọng lượng:</span>
                  <span>{selectedProduct.weight}</span>
                </div>
              </div>
              </div>
            )}
            </div>

            <div className='space-y-4'>
              <div>
                <h4 className="font-medium mb-2">Mô tả</h4>
                <p className="text-sm text-muted-foreground">
                      {selectedProduct.description}
                </p>
              </div>
              
              {selectedProduct.tag && (
                <div>
                  <h4 className="font-medium mb-2">Tags</h4>
                  <div className='flex flex-wrap gap-1'>
                    <span>
                      <Tag className="w-3 h-3 mr-1" />
                      {selectedProduct.tag}
                    </span>
                  </div>
                </div>
              )}

              <div>
                <h4 className="font-medium mb-2">Thông tin khác</h4>
                <div className='space-y-2 text-sm'>
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>Nhà cung cấp:</span>
                    <span>{selectedProduct.manufacturingLocationName}</span>
                  </div>

                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>Ngày tạo:</span>
                    <span className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {formatDate(selectedProduct.createAt)}
                    </span>
                  </div>

                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>Cập nhật:</span>
                    <span className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {formatDate(selectedProduct.updateAt)}
                    </span>
                  </div>

                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>Tạo bởi:</span>
                    <span className="flex items-center">
                      {selectedProduct.createBy}
                    </span>
                  </div>

                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>Update bởi:</span>
                    <span className="flex items-center">
                      {selectedProduct.createBy}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className='flex justify-end space-x-2 pt-4 border-t'>
            <Button variant="outline" onClick={() => setOpenInformationProduct(false)}>
              Đóng
            </Button>

            <Button onClick={() => {
              setOpenInformationProduct(false);
              onEdit(selectedProduct);
            }}>
              Chỉnh sửa
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )}
    </div>
  )
}

