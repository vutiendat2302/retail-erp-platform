import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { TableBody, TableCell, TableHead, TableRow, TableHeader, Table } from '../../ui/table';
import { Button } from '../../ui/button';
import { Tooltip, TooltipTrigger} from '../../ui/tooltip';
import { Eye, Trash, Pencil, Tag, Calendar } from 'lucide-react';
import { DialogHeader, Dialog, DialogContent, DialogDescription, DialogTitle } from '../../ui/dialog';
import { formatCurrency, formatDate } from '../Convert';
import type { Category, CategoryTableProp } from '../../../types/InventoryServiceType';

export const CategoryTable: React.FC<CategoryTableProp> = ({
  data,
  loading,
  onEdit,
  onDelete,
  totalElements,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [openInformationCategory, setOpenInformationCategory] = useState<boolean>(false);
  const handleViewCategory = (category: Category) => {
    setSelectedCategory(category);
    setOpenInformationCategory(true);
  }

  return (
  <div className='w-full mx-auto items-center '>
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div>
            <CardTitle>
              Danh sách danh mục sản phẩm
            </CardTitle>
            <CardDescription className='mt-2'>
              Hiển thị {data.length} trong tổng số {totalElements} danh mục
            </CardDescription>
          </div>
          <div className="text-sm text-muted-foreground">
            Cuộn để xem thêm • Click tiêu đề để sắp xếp
          </div>
        </div>

      </CardHeader>
      <CardContent>
        <div className="rounded-md border relative">
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
                    Tên danh mục
                  </TableHead>
                  <TableHead className='text-center !border-r !border-gray-300'>Tiêu đề</TableHead>
                  <TableHead className='text-center !border-r !border-gray-300'>Mô tả</TableHead>
                  <TableHead className='text-center !border-r !border-gray-300'>Trạng thái</TableHead>
                  <TableHead className='text-center '>Chức năng</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className='px-4 py-6 text-center'>
                      Đang tải dữ liệu
                    </TableCell>
                  </TableRow>
                ): data.length>0 ? (
                  data.map((cat) => (
                    <TableRow key = {cat.id} className="!border-b">
                      <TableCell className='!border-r !border-gray-300'>
                        <div>
                          <div className='font-medium'>{cat.name}</div>
                          <p>{cat.metaKeyword}</p>
                        </div>
                      </TableCell>
                      <TableCell className='text-center !border-r !border-gray-300'>{cat.seoTitle} </TableCell>
                      <TableCell className='text-center !border-r !border-gray-300'>{cat.description}</TableCell>
                      <TableCell className='text-center !border-r !border-gray-300 '>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          cat.status === 'active' ? 'bg-green-100 text-green-700'
                          :'bg-red-100 text-red-700'
                        }`}
                        >
                          {cat.status}
                        </span>
                      </TableCell>
                      <TableCell className='text-center'>
                        <div className='flex gap-2 items-center justify-center'>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => {handleViewCategory(cat)}}
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
                                onClick={() => onEdit(cat)}
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
                                onClick={() => onDelete(cat.id)}
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
                    <TableCell colSpan={5} className='px-4 py-6 text-center'>
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

    {selectedCategory && (
      <Dialog open = {openInformationCategory} onOpenChange={setOpenInformationCategory}>
        <DialogContent className='max-w-2x1'>
          <DialogHeader>
            <DialogTitle className='flex items-center space-x-2'>
              <span>{selectedCategory.name}</span>
            </DialogTitle>
            <DialogDescription>
              Chi tiết thông tin danh mục
            </DialogDescription>
          </DialogHeader>

          <div className='grid grid-cols-2 gap-6'>
            <div className='space-y-4'>
              <div>
                <h4 className='font-medium mb-2'>Thông tin cơ bản</h4>
                <div className='space-y-2 text-sm'>
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>Tiêu đề:</span>
                    <code className='bg-muted px-2 py-1 rounded text-xs'>
                      {selectedCategory.seoTitle}
                    </code>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Từ khóa</span>
                    <span>{selectedCategory.metaKeyword}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <span className="font-medium">
                      {selectedCategory.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className='space-y-4'>
              <div>
                <h4 className="font-medium mb-2">Mô tả</h4>
                <p className="text-sm text-muted-foreground">
                      {selectedCategory.description}
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-2">Thông tin khác</h4>
                <div className='space-y-2 text-sm'>
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>Ngày tạo:</span>
                    <span className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {formatDate(selectedCategory.createAt)}
                    </span>
                  </div>

                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>Cập nhật:</span>
                    <span className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {formatDate(selectedCategory.updateAt)}
                    </span>
                  </div>

                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>Tạo bởi:</span>
                    <span className="flex items-center">
                      {selectedCategory.createBy}
                    </span>
                  </div>

                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>Update bởi:</span>
                    <span className="flex items-center">
                      {selectedCategory.createBy}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className='flex justify-end space-x-2 pt-4 border-t'>
            <Button variant="outline" onClick={() => setOpenInformationCategory(false)}>
              Đóng
            </Button>

            <Button onClick={() => {
              setOpenInformationCategory(false);
              onEdit(selectedCategory);
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


