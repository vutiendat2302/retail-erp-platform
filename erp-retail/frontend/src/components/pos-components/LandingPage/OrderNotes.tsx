import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Textarea } from '../../ui/textarea';

interface OrderNotesProps {
  orderNote: string;
  setOrderNote: (value: string) => void;
}

export default function OrderNotes({ orderNote, setOrderNote }: OrderNotesProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm">Ghi chú đơn hàng</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="Thêm ghi chú cho đơn hàng..."
          value={orderNote}
          onChange={(e) => setOrderNote(e.target.value)}
          className="min-h-[80px] border border-border rounded-md"
        />
      </CardContent>
    </Card>
  );
}