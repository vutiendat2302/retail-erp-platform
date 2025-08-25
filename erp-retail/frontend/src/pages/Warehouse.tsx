import React, {useState, useEffect} from 'react';

import { Button } from '../components/ui/button';

import ProductStatic from '../components/inventory_components/products/ProductStatic';
import { ProductSearch } from '../components/inventory_components/products/ProductSearch';
import { WarehouseChoose } from '../components/inventory_components/warehouses/WarehouseChoose';
import { getWarehouses } from '../services/inventery-api/WarehouseService';
import { WarehouseTableComponent } from '../components/inventory_components/warehouses/WarehouseTable';
import { getInventoryByNameWarehouse, getTotalPriceNormalByWarehouse } from '../services/inventery-api/WarehouseService';
import WarehouseStatic from '../components/inventory_components/warehouses/WarehouseStatic';
interface Warehouse {
  id: string;
  name: string;
  description: string;
  address: string;
  status: string;
  createBy: string;
  updateBy: string;
}

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

const Warehouse: React.FC = () => {
  const [dataWarehouse, setDataWarehouse] = useState<Warehouse[]>([]);
  const [openFindWarehouse, setOpenWarehouse] = useState(false);
  const [selectWarehouse, setSelectWarehouse] = useState<string | null>('');
  const [inventories, setInventories] = useState<Inventory[]>([]);
  const [totalInventory, setTotalInventory] = useState<number>(0);
  const [totalPriceNormal, setTotalPriceNormal] = useState<number>(0);

  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const response = await getWarehouses();
        const warehouseData: Warehouse[] = response.data;
        setDataWarehouse(warehouseData);
        if (warehouseData.length > 0) {
          setSelectWarehouse(warehouseData[0].id);
        }
      } catch (error) {
      console.error("Failed to fetch warehouse data: ", error);
      }
    };

    fetchWarehouses();
  }, []);

  useEffect(() => {
    const fetchInventories = async () => {
      if (selectWarehouse) {
        try {
          const response = await getInventoryByNameWarehouse(selectWarehouse);
          setInventories(response.data);
          setTotalInventory(response.data.length);
          const total = await getTotalPriceNormalByWarehouse(selectWarehouse);
          setTotalPriceNormal(total.data);
        } catch (error) {
          console.error("Failed to fetch inventory data: ", error);
        }
      }
    };

    fetchInventories();
  }, [selectWarehouse]);

  return (
    <div>
      <div className='px-6 md:px-10 -mt-10 space-y-6'>
        <div className='flex items-center justify-between '>
          <div className='mb-2'>
            <h3 className='mb-6'>Quản lý kho hàng</h3>
            <p className="text-muted-foreground">
              Theo dõi và quản lý tồn kho của bạn
            </p>
          </div>
        
          <div>
            <WarehouseChoose
              selectWarehouse={selectWarehouse}
              setSelectWarehouse={setSelectWarehouse}
              openFindWarehouse={openFindWarehouse}
              setOpenWarehouse={setOpenWarehouse}
              dataWarehouse={dataWarehouse}
            />
          </div>
        </div>

        <div>
          <WarehouseStatic
            totalElements={totalInventory}
            totalPriceNormal={totalPriceNormal}
          />
        </div>

        <div>
          <ProductSearch />
        </div>

        <div className='mt-6'>
          <WarehouseTableComponent
            data={inventories}
          />
        </div>
      </div>
    </div>
  );
};
export default Warehouse;