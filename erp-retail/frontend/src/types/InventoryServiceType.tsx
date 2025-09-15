
// Warehouse
export type WarehouseResponseDto = any;
export interface Warehouse {
  id: string;
  name: string;
  description: string;
  address: string;
  status: string;
  createBy: string;
  updateBy: string;
}

export interface Inventory {
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

export interface ProductBatch {
  id: string;
  name: string;
}

// Product
export interface Product {
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

export interface ProductFormData {
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
  brandId: string;
  categoryId: string;
  manufacturingLocationId: string;
}

export interface ProductTable {
  data: Product[];
  loading: boolean;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  totalElements: number
}

export interface ProductStaticData {
  totalElements: number;
  countProducActive: number;
  countCategoryActive: number;
  countBrandActive: number;
}

export interface CategoryName {
  id: string;
  name: string;
}

export interface BrandName {
  id: string;
  name: string;
}

export interface ManufacturingLocationName {
  id: string;
  name: string;
}

export interface ProductFormProps {
  initialData?: Product | null;
  onSubmit: (data: ProductFormData) => void | Promise<void>;
  onClose: () => void;
}

// Category
export interface CategoryFormProps {
  initialData?: Category | null;
  onSubmit: (data: CategoryFormData) => void | Promise<void>;
  onClose: () => void;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  status: string;
  metaKeyword: string;
  seoTitle: string;
  updateBy: string;
  updateAt: string;
  createBy: string;
  createAt: string;
  smallImage: string;
  parentId: string;
}

export interface CategoryFormData {
  id: string;
  name: string;
  description: string;
  status: string;
  metaKeyword: string;
  seoTitle: string;
  updateBy: string;
}

export interface CategoryTableProp {
  data: Category[];
  loading: boolean;
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void;
  totalElements: number
}