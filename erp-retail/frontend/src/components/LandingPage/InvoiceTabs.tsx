import React from 'react';
import { Button } from '../ui/button';
import { TabsList, TabsTrigger } from '../ui/tabs';
import { Plus } from 'lucide-react';

interface InvoiceTabsProps {
  invoiceCount: number;
  addNewInvoice: () => void;
}

export default function InvoiceTabs({
  invoiceCount,
  addNewInvoice
}: InvoiceTabsProps) {
  return (
    <div className="flex items-center justify-between">
      <TabsList className="bg-white border border-gray-200">
        {Array.from({ length: invoiceCount }, (_, i) => (
          <TabsTrigger key={i + 1} value={`invoice-${i + 1}`}>
            Hóa đơn {i + 1}
          </TabsTrigger>
        ))}
      </TabsList>
      <Button
        variant="outline"
        size="sm"
        onClick={addNewInvoice}
        className="flex items-center space-x-1"
      >
        <Plus className="w-4 h-4" />
        <span>Thêm hóa đơn</span>
      </Button>
    </div>
  );
}