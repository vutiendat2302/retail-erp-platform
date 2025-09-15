import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import {Package, AlertTriangle, TrendingUp, DollarSign } from 'lucide-react';
import { formatCurrency, formatCurrencyShort, formatNumber } from '../Convert';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../ui/tooltip';

interface WarehouseStaticData {
  totalPriceNormal: number;
  countProductInWarehouse: number;
  sumQuantityProductInWarehouse: number;
  countProductsNearExpiry: number;
  countProductsNearOut: number;
}

const WarehouseStatic: React.FC<WarehouseStaticData> = ({
  totalPriceNormal,
  countProductInWarehouse,
  sumQuantityProductInWarehouse,
  countProductsNearExpiry,
  countProductsNearOut
}) =>  {
  return (
    <div className="p-6 w-[98%] mx-auto">
      {/* Stats Cards */}
      <div className="grid md:grid-cols-1 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <CardTitle className="text-sm font-medium whitespace-nowrap truncate max-w-[150px] cursor-help">
                    Số sản phẩm
                  </CardTitle>
                </TooltipTrigger>
                <TooltipContent className='!bg-[rgba(229,231,235)] text-lg text-black px-2 py-1 rounded-xl shadow-lg'>
                  <p>Số sản phẩm</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(countProductInWarehouse)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <CardTitle className="text-sm font-medium whitespace-nowrap truncate overflow-hidden text-ellipsis cursor-help">
                    Tổng số lượng sản phẩm
                  </CardTitle>
                </TooltipTrigger>
                <TooltipContent className='!bg-[rgba(229,231,235)] text-lg text-black px-2 py-1 rounded-xl shadow-lg'>
                  <p>Tổng số lượng sản phẩm</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{formatNumber(sumQuantityProductInWarehouse)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng giá trị kho</CardTitle>
          </CardHeader>
          <CardContent>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="text-2xl font-bold">{formatCurrencyShort(totalPriceNormal)}</div>
                </TooltipTrigger>
                <TooltipContent className='!bg-[rgba(229,231,235)] text-lg text-black px-2 py-1 rounded-xl shadow-lg'>
                  <p>{formatCurrency(totalPriceNormal)}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <CardTitle className="text-sm font-medium whitespace-nowrap truncate overflow-hidden text-ellipsis cursor-help">
                    Tổng số sản phẩm sắp hết hạn
                  </CardTitle>
                </TooltipTrigger>
                <TooltipContent className='!bg-[rgba(229,231,235)] text-lg text-black px-2 py-1 rounded-xl shadow-lg'>
                  <p>Tổng số sản phẩm sắp hết hạn</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <AlertTriangle className="h-4 w-4 text-muted-foreground text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">{countProductsNearExpiry}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <CardTitle className="text-sm font-medium whitespace-nowrap truncate overflow-hidden text-ellipsis cursor-help">
                    Tổng số sản phẩm sắp hết hàng
                  </CardTitle>
                </TooltipTrigger>
                <TooltipContent className='!bg-[rgba(229,231,235)] text-lg text-black px-2 py-1 rounded-xl shadow-lg'>
                  <p>Tổng số sản phẩm sắp hết hàng</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TrendingUp className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">{countProductsNearOut}</div>
          </CardContent>
        </Card>


      </div>
    </div>
  )
}
export default WarehouseStatic;