import React, {useState, useEffect} from 'react';
import { ProductSearch } from '../components/inventory_components/products/ProductSearch';
import { WarehouseChoose } from '../components/inventory_components/warehouses/WarehouseChoose';
import { getCountProductInWarehouse, getCountProductsNearExpiry, getCountProductsNearOut, getProductBatch, getSumQuantityProductInWarehouse, getWarehouses } from '../services/inventery-api/WarehouseService';
import { WarehouseTableComponent } from '../components/inventory_components/warehouses/WarehouseTable';
import { getInventoryByNameWarehouse, getTotalPriceNormalByWarehouse, getSearchInventory} from '../services/inventery-api/WarehouseService';
import WarehouseStatic from '../components/inventory_components/warehouses/WarehouseStatic';
import type { Warehouse, Inventory, ProductBatch } from '../types/InventoryServiceType';
import { HardDrive } from 'lucide-react';
import { InventorySearch } from '../components/inventory_components/warehouses/WarehouseSearch';

const Warehouse: React.FC = () => {
  //data
  const [dataWarehouse, setDataWarehouse] = useState<Warehouse[]>([]);
  const [openFindWarehouse, setOpenWarehouse] = useState(false);
  const [selectWarehouse, setSelectWarehouse] = useState<string | null>('');
  const [inventories, setInventories] = useState<Inventory[]>([]);

  //static
  const [totalInventory, setTotalInventory] = useState<number>(0); // tổng số bản ghi trong page
  const [totalPriceNormal, setTotalPriceNormal] = useState<number>(0); // Tổng số tiền của các sản phẩm
  const [countProductInWarehouse, setCountProductInWarehouse] = useState<number>(0); // Số lượng sản phẩm có trong kho
  const [sumQuantityProductInWarehouse, setSumQuantityProductInWarehouse] = useState<number>(0); // Tổng số lượng sản phẩm trong kho
  const [countProductsNearExpiry, setCountProductsNearExpiry] = useState<number>(0);
  const [countProductsNearOut, setCountProductsNearOut] = useState<number>(0);
  const [totalElements, setTotalElements] = useState<number>(0); // tổng số bản ghi trong database
  const [productBatches, setProductBatches] = useState<ProductBatch[]>([]);

  //search
  const [productName, setProductName] = useState<string>('');
  const [productBatch, setProductBatch] = useState<string>('');
  const [openFindProductBatch, setOpenFindProductBatch] = useState<boolean>(false);

  //page
  const [page, setPage] = useState<number>(0); // set page
  const [size, setSize] = useState<number>(20); // set size cua page
  const [loading, setLoading] = useState<boolean>(false); // loading lai trang page khi co thay doi
  const [totalPages, setTotalPages] = useState<number>(0);
  

  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const response = await getWarehouses();
        const warehouseData: Warehouse[] = response.data;
        setDataWarehouse(warehouseData);
        if (warehouseData.length > 0) {
          setSelectWarehouse(warehouseData[0].id);
        }

        setProductBatches((await getProductBatch()).data);
      } catch (error) {
      console.error("Failed to fetch warehouse data: ", error);
      }
    };

    fetchWarehouses();
  }, []);

  const loadInventory = async (pageNum: number, warehouseId: string) => {
    setLoading(true);
    try {
      const res = await getSearchInventory(warehouseId, {
        productName: productName || undefined,
        productBatch: productBatch || undefined,
        page: pageNum,
        size,
        sort: 'productName,asc'
      });

      setInventories(res.data.content || []);
      setTotalPages(res.data.totalPages || 0);
      setTotalInventory(res.data.length || 0);
      console.log('settotalInventory');
      setTotalElements(res.data.totalElements);
    } catch (error) {
      console.error('Failed to fetch inventory: ', error);
    } finally {
      setLoading(false);
    }
  }
  
  // load khi warehouse thay doi
  useEffect(() => {
    const fetchStatics = async () => {
      if (!selectWarehouse) return;
      try {
        const [
          totalPriceRes,
          countProductRes,
          sumQuantityRes,
          countNearExpiryRes,
          countNearOutRes
        ] = await Promise.all([
          getTotalPriceNormalByWarehouse(selectWarehouse),
          getCountProductInWarehouse(selectWarehouse),
          getSumQuantityProductInWarehouse(selectWarehouse),
          getCountProductsNearExpiry(selectWarehouse),
          getCountProductsNearOut(selectWarehouse)
        ]);

        setTotalPriceNormal(totalPriceRes.data);
        setCountProductInWarehouse(countProductRes.data);
        setSumQuantityProductInWarehouse(sumQuantityRes.data);
        setCountProductsNearExpiry(countNearExpiryRes.data);
        setCountProductsNearOut(countNearOutRes.data);
      } catch (err) {
        console.error('Failed to fetch warehouse statistics: ', err);
      }
    };

    fetchStatics();
  }, [selectWarehouse]);

  // loadPage
  useEffect(() => {
    if (size > 0 && selectWarehouse) {
      loadInventory(page, selectWarehouse);
    }
  }, [page, size, productName, productBatch, selectWarehouse]);

  // chuyen page
  const goToPage = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  }

  const handleSearch = (
    productName: string | null,
    productBatch: string | null,
  ) => {
    setProductName(productName ?? "");
    setProductBatch(productBatch ?? "");
    setPage(0);
  }


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
            totalPriceNormal={totalPriceNormal}
            countProductInWarehouse={countProductInWarehouse}
            sumQuantityProductInWarehouse={sumQuantityProductInWarehouse}
            countProductsNearExpiry={countProductsNearExpiry}
            countProductsNearOut={countProductsNearOut}
          />
        </div>

        <div>
          <InventorySearch
            productBatches = {productBatches}
            openFindProductBatch = {openFindProductBatch}
            setOpenFindProductBatch = {setOpenFindProductBatch}
            onSearch={handleSearch}
          />
        </div>

        <div className='mt-6'>
          <WarehouseTableComponent
            data={inventories}
            loading={loading}
            totalInventory={totalInventory}
          />
        </div>

        <div className="flex justify-center items-center mt-4 space-x-4">
          <button
            onClick={() => goToPage(page - 1)}
            disabled={page === 0}
            className='px-3 py-1 bg-gray-200 rounded disabled:opacity-50'
          >
            Prev
          </button>

          <span>
            Trang <strong>{totalPages === 0 ? 0 : page + 1}</strong> / <strong>{totalPages}</strong>
          </span>

          <button
            onClick={() => goToPage(page + 1)}
            disabled={page + 1 >= totalPages}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>

      </div>
    </div>
  );
};
export default Warehouse;