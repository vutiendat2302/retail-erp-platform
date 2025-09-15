import React, {useState} from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Tag } from 'lucide-react';
import { ShoppingCart } from 'lucide-react';
import { 
  Search, 
  Plus, 
  ShoppingBag, 
  Undo, 
  Printer, 
  Settings,
  Minus,
  Loader2
} from 'lucide-react';
import SearchSuggestions from './SearchSuggestions';
import type  { PageType } from '../../App';
interface POSHeaderProps {
  searchProduct: string;
  setSearchProduct: (value: string) => void;
  searchProductId: string;
  setSearchProductId: (value: string) => void;
  quantity: number;
  adjustQuantity: (delta: number) => void;
  onProductIdSearch: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  isLoading: boolean;
  onSearchSuggestionSelect: (productId: string) => void;
  onNavigate?: (page: PageType) => void;
}

export default function POSHeader({
  searchProduct,
  setSearchProduct,
  searchProductId,
  setSearchProductId,
  quantity,
  adjustQuantity,
  onProductIdSearch,
  onKeyPress,
  isLoading,
  onSearchSuggestionSelect,
  onNavigate
}: POSHeaderProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  return (
    <div className="w-screen bg-blue-600 border-b border-gray-200 px-4 lg:px-6 py-3 lg:py-4 fixed top-0 left-0 z-50">
      <div className="flex justify-between items-center gap-4">
        <div className="flex items-center space-x-3 lg:space-x-4 flex-1 min-w-0">
          {/* Product Search */}
          <div className="relative flex-1 max-w-sm lg:max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-900 w-4 h-4" />
            <Input
              placeholder="Tìm kiếm sản phẩm..."
              value={searchProduct}
              onChange={(e) => {
                setSearchProduct(e.target.value);
                setShowSuggestions(e.target.value.length >= 0);
              }}
              onFocus={() => setShowSuggestions(searchProduct.length >= 0)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              className="pl-9 text-sm bg-white/95 text-slate-900 placeholder:text-slate-500 focus-visible:ring-white"
            />
            <Badge variant="secondary" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs bg-blue-100 text-blue-600">
              F3
            </Badge>
            <SearchSuggestions
              query={searchProduct}
              onSelectProduct={onSearchSuggestionSelect}
              isVisible={showSuggestions}
              onClose={() => setShowSuggestions(false)}
            />
          </div>

          {/* Product ID Search */}
          <div className="hidden sm:flex items-center space-x-2">
            <div className="relative">
              <Input
                placeholder="ID sản phẩm..."
                value={searchProductId}
                onChange={(e) => setSearchProductId(e.target.value)}
                className="pl-9 text-sm bg-white/95 text-slate-900 placeholder:text-slate-500 focus-visible:ring-white"
                onKeyPress={onKeyPress}
                disabled={isLoading}
              />
              <Button
                size="sm"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 bg-blue-200 text-slate-900"
                onClick={onProductIdSearch}
                disabled={isLoading || !searchProductId.trim()}
              >
                {isLoading ? (
                  <Loader2 className="w-3 h-3 text-white animate-spin" />
                ) : (
                  <Search className="w-3 h-3 text-slate-900" />
                )}
              </Button>
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-white hidden lg:inline">Số lượng:</span>
            <div className="flex items-center border border-blue-200 rounded-lg bg-blue-50">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => adjustQuantity(-1)}
                className="h-8 w-8 p-0 text-blue-600 hover:bg-blue-100"
              >
                <Minus className="w-3 h-3" />
              </Button>
              <span className="px-2 lg:px-3 py-1 min-w-[2.5rem] lg:min-w-[3rem] text-center text-blue-600">{quantity}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => adjustQuantity(1)}
                className="h-8 w-8 p-0 text-blue-600 hover:bg-blue-100"
              >
                <Plus className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center space-x-1 lg:space-x-2 flex-shrink-0">
           {onNavigate && (
            <>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 lg:h-9 lg:w-9 text-white"
                onClick={() => onNavigate('orders')}
                title="Quản lý đơn hàng"
              >
                <ShoppingCart className="w-4 h-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 lg:h-9 lg:w-9 text-white"
                onClick={() => onNavigate('promocodes')}
                title="Quản lý mã khuyến mãi"
              >
                <Tag className="w-4 h-4" />
              </Button>
            </>
          )}
          <Button variant="ghost" size="sm" className="h-8 w-8 lg:h-9 lg:w-9 text-white">
            <ShoppingBag className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 lg:h-9 lg:w-9 text-white">
            <Undo className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 lg:h-9 lg:w-9 text-white">
            <Printer className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 lg:h-9 lg:w-9 text-white ">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
