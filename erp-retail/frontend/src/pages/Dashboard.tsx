import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import PieChart from '../components/charts/PieChart';
import JoinDateBarChart from '../components/charts/JoinDateBarChart';
import BranchEmployeeBarChart from '../components/charts/BranchEmployeeBarChart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { Check, Search } from "lucide-react";
import { cn } from "../lib/utils";

import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem
} from "../components/ui/command";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";

import {
  Package,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  ShoppingCart,
  Users,
  BarChart3,
  Activity
} from 'lucide-react';
import { getStores } from '../services/inventery-api/StoreServices';
import { StoreChoose } from '../components/inventory_components/stores/StoreChoose';

interface Store {
  id: string;
  name: string;
  description: string;
  address: string;
  status: string;
  createBy: string;
  updateBy: string;
}


const Dashboard: React.FC = () => {

  const [dataStore, setDataStore] = useState<Store[]>([]);
  const [openFindStore, setOpenFindStore] = useState(false);
  const [selecteStore, setSelecteStore] = useState<string | null>('');

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const response = await getStores();
        const storeData: Store[] = response.data;
        setDataStore(storeData);

        if (storeData.length > 0) {
          setSelecteStore(storeData[0].id);
        }
      } catch (error) {
        console.log("Failed to fetch store data");
      }
    };

    fetchStore();
  }, [])


  const stats = [
    {
      title: 'Tổng sản phẩm',
      value: '1,247',
      change: '+12%',
      changeType: 'increase' as const,
      icon: Package,
      color: 'text-blue-600'
    },
    {
      title: 'Tổng giá trị kho',
      value: '₫2.4M',
      change: '+8%',
      changeType: 'increase' as const,
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'Đơn hàng tuần này',
      value: '156',
      change: '-3%',
      changeType: 'decrease' as const,
      icon: ShoppingCart,
      color: 'text-orange-600'
    },
    {
      title: 'Sản phẩm sắp hết',
      value: '23',
      change: '+5',
      changeType: 'warning' as const,
      icon: AlertTriangle,
      color: 'text-red-600'
    }
  ];
  
  const recentActivity = [
    {
      id: 1,
      action: 'Nhập kho',
      product: 'Laptop Dell Inspiron 15',
      quantity: 10,
      time: '2 giờ trước',
      type: 'import'
    },
    {
      id: 2,
      action: 'Xuất kho',
      product: 'Chuột Logitech MX Master 3',
      quantity: 5,
      time: '4 giờ trước',
      type: 'export'
    },
    {
      id: 3,
      action: 'Cập nhật giá',
      product: 'Màn hình Samsung 27 inch',
      quantity: 0,
      time: '6 giờ trước',
      type: 'update'
    },
    {
      id: 4,
      action: 'Cảnh báo tồn kho',
      product: 'Bàn phím cơ Keychron K8',
      quantity: 3,
      time: '8 giờ trước',
      type: 'warning'
    }
  ];

  const lowStockProducts = [
    { name: 'Chuột Logitech MX Master 3', current: 3, min: 10, percentage: 30 },
    { name: 'Màn hình Samsung 27 inch', current: 0, min: 3, percentage: 0 },
    { name: 'Bàn phím cơ Keychron K8', current: 5, min: 8, percentage: 62 },
    { name: 'Tai nghe Sony WH-1000XM4', current: 2, min: 5, percentage: 40 }
  ];


  const getChangeColor = (type: string) => {
    switch (type) {
      case 'increase': return 'text-green-600';
      case 'decrease': return 'text-red-600';
      case 'warning': return 'text-orange-600';
      default: return 'text-muted-foreground';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'import': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'export': return <Activity className="h-4 w-4 text-blue-600" />;
      case 'update': return <BarChart3 className="h-4 w-4 text-purple-600" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-orange-600" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  return (
    <div className="px-6 md:px-10">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="mb-6 -mt-10 flex justify-between items-center">
          <div>
            <h3 className='mb-2'>Tổng Quan Cửa Hàng</h3>
            <p className='text-muted-foreground'>Quản lý cửa hàng</p>
          </div>

          <div>
            <StoreChoose
              selectStore={selecteStore}
              setSelectStore={setSelecteStore}
              openFindStore={openFindStore}
              setOpenFindStore={setOpenFindStore}
              dataStore={dataStore}
            />
          </div>
        </div>

        

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className={`text-xs ${getChangeColor(stat.changeType)}`}>
                  {stat.change} so với tháng trước
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          {/* Hoat dong gan day */}
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Hoạt động gần đây</CardTitle>
              <CardDescription>
                Các thay đổi mới nhất trong kho hàng
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">
                        {activity.action}: {activity.product}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {activity.quantity > 0 && `Số lượng: ${activity.quantity} • `}
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Canh bao hang ton kho */}
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                <span>Cảnh báo kho</span>
              </CardTitle>
              <CardDescription>
                Sản phẩm sắp hết hàng
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {lowStockProducts.map((product, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{product.name}</p>
                      <Badge variant={product.current === 0 ? 'destructive' : 'secondary'}>
                        {product.current}/{product.min}
                      </Badge>
                    </div>
                    <Progress
                      value={product.percentage}
                      className="h-2"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
      </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Thao tác nhanh</CardTitle>
            <CardDescription>
              Các tác vụ thường dùng để quản lý kho hàng
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="p-4 hover:bg-accent transition-colors cursor-pointer">
                <div className="flex items-center space-x-3">
                  <Package className="h-8 w-8 text-blue-600" />
                  <div>
                    <p className="font-medium">Thêm sản phẩm</p>
                    <p className="text-sm text-muted-foreground">Nhập sản phẩm mới</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4 hover:bg-accent transition-colors cursor-pointer">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                  <div>
                    <p className="font-medium">Nhập kho</p>
                    <p className="text-sm text-muted-foreground">Cập nhật số lượng</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4 hover:bg-accent transition-colors cursor-pointer">
                <div className="flex items-center space-x-3">
                  <BarChart3 className="h-8 w-8 text-purple-600" />
                  <div>
                    <p className="font-medium">Xem báo cáo</p>
                    <p className="text-sm text-muted-foreground">Thống kê chi tiết</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4 hover:bg-accent transition-colors cursor-pointer">
                <div className="flex items-center space-x-3">
                  <Users className="h-8 w-8 text-orange-600" />
                  <div>
                    <p className="font-medium">Quản lý người dùng</p>
                    <p className="text-sm text-muted-foreground">Phân quyền access</p>
                  </div>
                </div>
              </Card>
            </div>
          </CardContent>
        </Card>
    </div>

    {/* Tiêu đề */}
      <div className='mt-8'>
        <h1>
          Quản Lý Nhân Sự
        </h1>
      </div>

      <motion.p
        className="text-xl font-semibold text-center text-gray-600 mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Quản lý nhân sự toàn diện, dễ dàng và hiệu quả.
      </motion.p>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Cột 1: Biểu đồ 1 nhỏ hơn */}
        <div className="col-span-1">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4 text-center">Phân bố giới tính</h2>
            <div className="h-80">
              <PieChart />
            </div>
          </div>
        </div>

        {/* Cột 2: chứa 2 biểu đồ chồng dọc */}
        <div className="col-span-2 grid grid-rows-2 gap-6">
          {/* Biểu đồ A */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4 text-center">
              Phân bố nhân viên theo tháng/năm bắt đầu làm
            </h2>
            <JoinDateBarChart />
          </div>

          {/* Biểu đồ B */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4 text-center">
              Số nhân viên theo chi nhánh
            </h2>
            <div className="bg-white rounded-xl shadow-md p-6">
              <BranchEmployeeBarChart />
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default Dashboard;
