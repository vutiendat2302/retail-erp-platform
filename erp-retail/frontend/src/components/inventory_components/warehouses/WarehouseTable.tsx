import React, {useState, useEffect} from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../ui/card';
import { Table, TableBody, TableCell, TableHead, TableRow, TableHeader } from '../../ui/table';
import { ScrollArea } from '../../ui/scroll-area';
import { formatCurrency, formatDate } from '../Convert';
interface Inventory {
  id: string;
  productName: string;
  quantityAvailable: number;
  warehouseName: string;
  status: string;
  minimumQuantity: number;
  maximumQuantity: number;
  productBatchName: string;
  expiryDate: string;
  importDate: string;
  priceNormal: number;
}

interface InventoryTable {
  data: Inventory[];
}


export function WarehouseTableComponent({data} : InventoryTable) {

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
          <ScrollArea className='h-[400px]'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ProductBatchName</TableHead>
                  <TableHead>ProductName</TableHead>
                  <TableHead>PriceNormal</TableHead>
                  <TableHead>QuantityAvailable</TableHead>
                  <TableHead>ImportDate</TableHead>
                  <TableHead>ExpiryDate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((warehouse) => (
                  <TableRow key={warehouse.id}>
                    <TableCell>{warehouse.productBatchName}</TableCell>
                    <TableCell>{warehouse.productName}</TableCell>
                    <TableCell>{formatCurrency(warehouse.priceNormal)}</TableCell>
                    <TableCell>{warehouse.quantityAvailable}</TableCell>
                    <TableCell>{formatDate(warehouse.importDate)}</TableCell>
                    <TableCell>{formatDate(warehouse.expiryDate)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}