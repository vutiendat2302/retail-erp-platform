import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  Download, 
  Calendar, 
  TrendingUp, 
  TrendingDown,
  Package,
  DollarSign
} from 'lucide-react';

export function Report() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const monthlyData = [
    { month: 'T1', revenue: 120000000, products: 45, orders: 28 },
    { month: 'T2', revenue: 130000000, products: 52, orders: 32 },
    { month: 'T3', revenue: 145000000, products: 48, orders: 35 },
    { month: 'T4', revenue: 160000000, products: 58, orders: 42 },
    { month: 'T5', revenue: 155000000, products: 51, orders: 38 },
    { month: 'T6', revenue: 170000000, products: 62, orders: 45 }
  ];

  const categoryData = [
    { name: 'Laptop', value: 45, fill: '#8884d8' },
    { name: 'Phụ kiện', value: 30, fill: '#82ca9d' },
    { name: 'Màn hình', value: 15, fill: '#ffc658' },
    { name: 'Khác', value: 10, fill: '#ff7c7c' }
  ];

  const topProducts = [
    { name: 'Laptop Dell Inspiron 15', sold: 125, revenue: 1875000000, growth: 12 },
    { name: 'Chuột Logitech MX Master 3', sold: 89, revenue: 222500000, growth: 8 },
    { name: 'Bàn phím cơ Keychron K8', sold: 67, revenue: 234500000, growth: -3 },
    { name: 'Màn hình Samsung 27 inch', sold: 45, revenue: 382500000, growth: 15 },
    { name: 'Tai nghe Sony WH-1000XM4', sold: 34, revenue: 272000000, growth: 5 }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      notation: 'compact'
    }).format(amount);
  };

  const summaryStats = [
    {
      title: 'Tổng doanh thu',
      value: formatCurrency(980000000),

      icon: DollarSign
    },
    {
      title: 'Sản phẩm bán ra',
      value: '1,247',
 
      icon: Package
    },
    {
      title: 'Đơn hàng',
      value: '856',

      icon: TrendingUp
    },
    {
      title: 'Sản phẩm',
      value: '462',
      icon: Package
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2">Báo cáo & Thống kê</h1>
          <p className="text-muted-foreground">
            Phân tích hiệu suất và xu hướng kinh doanh
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Chọn thời gian
          </Button>
          <Button size="sm">
            <Download className="w-4 h-4 mr-2" />
            Xuất báo cáo
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {summaryStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
                
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <Tabs defaultValue="revenue" className="space-y-4">
        <TabsList>
          <TabsTrigger value="revenue">Doanh thu</TabsTrigger>
          <TabsTrigger value="products">Sản phẩm</TabsTrigger>
          <TabsTrigger value="categories">Danh mục</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Xu hướng doanh thu</CardTitle>
              <CardDescription>
                Doanh thu theo tháng trong 6 tháng gần đây
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis 
                      tickFormatter={(value) => formatCurrency(value)}
                    />
                    <Tooltip 
                      formatter={(value) => [formatCurrency(Number(value)), 'Doanh thu']}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#8884d8" 
                      strokeWidth={2}
                      dot={{ fill: '#8884d8' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sản phẩm bán chạy</CardTitle>
              <CardDescription>
                Top 5 sản phẩm có doanh số cao nhất
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Đã bán: {product.sold} sản phẩm
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{formatCurrency(product.revenue)}</p>
                      <div className="flex items-center">
                        {product.growth > 0 ? (
                          <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                        )}
                        <span className={product.growth > 0 ? 'text-green-600' : 'text-red-600'}>
                          {product.growth > 0 ? '+' : ''}{product.growth}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Phân bố theo danh mục</CardTitle>
                <CardDescription>
                  Tỷ lệ phần trăm sản phẩm theo từng danh mục
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Số lượng theo danh mục</CardTitle>
                <CardDescription>
                  Biểu đồ cột hiển thị số lượng sản phẩm
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={categoryData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}