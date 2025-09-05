import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { ScrollArea } from '../../ui/scroll-area';
import { Loader2, Search, TrendingUp } from 'lucide-react';
import { searchProduct as searchProductAPI } from '../../../services/pos-api/PosService';
import { toast } from 'sonner';

interface SearchSuggestionsProps {
  query: string;
  onSelectProduct: (productId: string) => void;
  isVisible: boolean;
  onClose: () => void;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  barcode?: string;
  category?: string;
  stock?: number;
}

export interface orderDetail {
  Id: string;
  productId?: string; // Product ID for API calls
  productName: string;
  quantity: number;
  price: number;
  totalAmount: number;
}

export interface Invoice extends BaseOrder {
  status : 'pending'
}
export interface PromoCode {
  Id: string;
  codePromotion: string;
  discountType: 'percent' | 'fixed';
  percentDiscountValue: number;
  minOrderAmount?: number;
  maxDiscountValue?: number;
  isActive: boolean;
  descriptionPromotion?: string;
}
export interface BaseOrder {
  Id: string;
  orderDetails: orderDetail[];
  discount: number;
  taxAmount: number;
  taxRate: number;
  finalAmountBeforeTax: number;
  finalAmountAfterTax: number;
  finalAmountAfterTaxAndPromotion: number;
  notes: string;
  promotionDiscount?: number;
}
export interface CompletedOrder extends BaseOrder {
  createdAt: string;
}
export interface SearchResult {
  id: string;
  name: string;
  match_score: number;
  score: number;
  category_id: number;
  sales: number;
}

export default function SearchSuggestions({
  query,
  onSelectProduct,
  isVisible,
  onClose
}: SearchSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Debounced search
  useEffect(() => {
    const searchTimeout = setTimeout(async () => {
      setIsLoading(true);
      try {
        const response = await searchProductAPI(query.trim());
        const results = response.data.data || response;
        setSuggestions(Array.isArray(results) ? results : []);
      } catch (error) {
        console.error('Error searching products:', error);
        setSuggestions([]);
        toast.error('Lỗi khi tìm kiếm sản phẩm');
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [query, isVisible]);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isVisible, onClose]);

  const handleSelectProduct = (product: SearchResult) => {
    onSelectProduct(product.id);
    onClose();
  };

  const formatScore = (score: number) => {
    return Math.round(score * 100) / 100;
  };

  const getScoreColor = (matchScore: number) => {
    if (matchScore >= 0.8) return 'bg-green-100 text-green-800';
    if (matchScore >= 0.6) return 'bg-blue-100 text-blue-800';
    if (matchScore >= 0.4) return 'bg-yellow-100 text-yellow-800';
    return 'bg-gray-100 text-gray-800';
  };

  if (!isVisible || (!query.trim() && suggestions.length === 0)) {
    return null;
  }

  return (
    <div ref={containerRef} className="absolute top-full left-0 right-0 z-50 mt-1">
      <Card className="border border-blue-200 shadow-lg">
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="w-4 h-4 animate-spin text-blue-600 mr-2" />
              <span className="text-sm text-blue-600">Đang tìm kiếm...</span>
            </div>
          ) : suggestions.length === 0 && query.trim() ? (
            <div className="flex items-center justify-center py-4 text-gray-500">
              <Search className="w-4 h-4 mr-2" />
              <span className="text-sm">Không tìm thấy sản phẩm nào</span>
            </div>
          ) : suggestions.length > 0 ? (
            <ScrollArea className="max-h-80">
              <div className="py-2">
                {suggestions.map((product, index) => (
                  <div
                    key={product.id}
                    onClick={() => handleSelectProduct(product)}
                    className="flex items-center justify-between px-4 py-3 hover:bg-blue-50 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-gray-900 truncate">
                          {product.name}
                        </span>
                        <Badge 
                          variant="secondary" 
                          className={`text-xs ${getScoreColor(product.match_score)}`}
                        >
                          {Math.round(product.match_score * 100)}%
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>ID: {product.id}</span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          <span>{product.sales} đã bán</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-2">
                      <Badge variant="outline" className="text-xs">
                        Điểm: {formatScore(product.score)}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}