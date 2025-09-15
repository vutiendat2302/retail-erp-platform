import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../ui/card';
import { Table, TableBody, TableCell, TableHead, TableRow, TableHeader } from '../../ui/table';
import { ScrollArea } from '../../ui/scroll-area';
import { formatCurrency, formatDate, formatNumber } from '../Convert';
import type { Inventory } from '../../../types/InventoryServiceType';
import { Tooltip, TooltipTrigger} from '../../ui/tooltip';
import { Button } from '../../ui/button';
import { Eye, Trash, Pencil, Tag, Calendar } from 'lucide-react';

interface InventoryTable {
  data: Inventory[];
  loading: boolean,
  totalInventory: number,
}

function monthsRemaining(expiryDate: string) {
  const now = new Date();
  const expiry = new Date(expiryDate);

  if (expiry < now) {
    return <span className="bg-red-100 text-red-700 rounded px-3 py-1">Đã hết hạn</span>;
  }

  let years = expiry.getFullYear() - now.getFullYear();
  let months = expiry.getMonth() - now.getMonth();

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const totalMonths = years * 12 + months;

  // Mặc định màu xanh
  let color = "bg-green-100 text-green-700 rounded px-3 py-1";
  if (totalMonths < 3) {
    color = "bg-orange-200 text-orange-700 rounded px-3 py-1";
  }

  // Tính text hiển thị
  let text = "";
  if (years > 0 && months === 0) {
    text = `${years} năm`;
  } else if (years === 0 && months === 0) {
    text = "< 1 tháng";
  } else if (years > 0) {
    text = `${years} năm ${months} tháng`;
  } else {
    text = `${months} tháng`;
  }

  return <span className={color}>{text}</span>;
}

export function WarehouseTableComponent({data, loading, totalInventory} : InventoryTable) {
  return (
    <div className='w-full mx-auto items-center '>
      <Card>
        <CardHeader>
          <CardTitle>Danh Sách kho</CardTitle>
          <CardDescription className='mt-2'>
            Hiển thị {data.length} sản phẩm trong kho
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='rounded-md border relative'>
            <div className='w-full h-[400px] overflow-auto scroll-smooth'
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(155,155,155,0.5) transparent'
              }}
            >
                <Table className='relative'>
                  <TableHeader className=" sticky top-0 z-50 !border-b border-gray-900 bg-gray-100 dark:bg-gray-900">
                    <TableRow className='hover:bg-transparent'>
                      <TableHead className='text-center !border-r !border-gray-300'>Tên lô hàng</TableHead>
                      <TableHead className='text-center !border-r !border-gray-300'>Tên sản phẩm</TableHead>
                      <TableHead className='text-center !border-r !border-gray-300'>Giá gốc</TableHead>
                      <TableHead className='text-center !border-r !border-gray-300'>Số lượng</TableHead>
                      <TableHead className='text-center !border-r !border-gray-300'>Ngày nhập</TableHead>
                      <TableHead className='text-center !border-r !border-gray-300'>Ngày hết hạn</TableHead>
                      <TableHead className='text-center !border-r !border-gray-300'>Hạn sử dụng</TableHead>
                      <TableHead className='text-center !border-r !border-gray-300'>Chức năng</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={8} className='px-4 py-6 text-center'>
                          Đang tải dữ liệu
                        </TableCell>
                      </TableRow>
                    ) : data.length > 0 ? (
                      data.map((warehouse) => (
                        <TableRow key={warehouse.id} className="!border-b">
                          <TableCell className='text-center !border-r !border-gray-300'>{warehouse.productBatchName}</TableCell>
                          <TableCell className='text-left !border-r !border-gray-300'>{warehouse.productName}</TableCell>
                          <TableCell className='text-center !border-r !border-gray-300'>{formatCurrency(warehouse.priceNormal)}</TableCell>
                          <TableCell className='text-center !border-r !border-gray-300'>{formatNumber(warehouse.quantityAvailable)}</TableCell>
                          <TableCell className='text-center !border-r !border-gray-300'>{formatDate(warehouse.importDate)}</TableCell>
                          <TableCell className='text-center !border-r !border-gray-300'>{formatDate(warehouse.expiryDate)}</TableCell>
                          <TableCell className='text-center !border-r !border-gray-300'>
                            {monthsRemaining(warehouse.expiryDate)}
                          </TableCell>
                          <TableCell className='text-center'>
                            <div className='flex gap-2 items-center justify-center'>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="icon"
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
                                    className='!rounded-md text-red-500 border-red-500 hover:bg-red-500 hover:text-white transition-colors'
                                  >
                                    <Trash className="w-4 h-4" />
                                  </Button>
                                </TooltipTrigger>
                              </Tooltip>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))) : (
                        <TableRow>
                          <TableCell colSpan={8} className="px-4 py-6 text-center">
                            Không có dữ liệu
                          </TableCell>
                        </TableRow>
                      )
                    }
                  </TableBody>
                </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}