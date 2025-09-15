import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';

import {
  Folder,
  Tag,
  Grid3x3
} from 'lucide-react';

export interface CategoryStaticData {
  totalElements: number;
  countCategoryActive: number;
  totalProduct: number;

}

const CategoryStatic: React.FC<CategoryStaticData> = ({
  totalElements,
  countCategoryActive,
  totalProduct,
}) => {
  return (
    <div className="p-6 w-auto mx-auto">
      {/* Header */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader  className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng danh mục</CardTitle>
            <Folder className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalElements}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Danh mục đang hoạt động</CardTitle>
            <Grid3x3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{countCategoryActive}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng sản phẩm</CardTitle>
            <Tag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalProduct}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default CategoryStatic;