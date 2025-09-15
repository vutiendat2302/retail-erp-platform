import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Search, Check } from 'lucide-react';
import { Select } from '../../ui/select';
import { SelectContent,SelectItem, SelectLabel, SelectTrigger} from '../../ui/select';
import type {ProductBatch} from '../../../types/InventoryServiceType';
import { Popover } from '../../ui/popover';
import { PopoverContent, PopoverTrigger } from '../../ui/popover';
import { Command } from '../../ui/command';
import { CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../../ui/command';
import {cn} from "../../../lib/utils"

interface InventorySearchData {
  productBatches: ProductBatch[];
  openFindProductBatch: boolean;
  setOpenFindProductBatch: (open: boolean) => void;
  onSearch: (productName: string | null, product: string | null) => void;
}

export const InventorySearch: React.FC<InventorySearchData> = ({
  productBatches,
  openFindProductBatch,
  setOpenFindProductBatch,
  onSearch
}) => {
  const [productName, setProductName] = useState("");
  const [productBatch, setProductBatch] = useState<string>("all");

  React.useEffect(() => {
    onSearch(
      productName.trim() === "" ? null: productName,
      productBatch === "all" ? null : productBatch
    );
  }, [productName, productBatch])

  console.log(productName, productBatch);

  return (
      <div className="p-6 mx-auto">
        {/* Search and Filter */}
        <Card>
          <CardContent>
            <div className='flex flex-col flex-wrap sm:flex-row gap-4'>
              <div className="relative flex-1 !rounded-md ">
                <Search className='absolute !left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4' />
                <Input
                  placeholder='Tìm kiếm sản phẩm...'
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="!pl-10"
                />
              </div>
  
              {/* Tìm kiemes batch */}
              <Popover open = {openFindProductBatch} onOpenChange={setOpenFindProductBatch}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded = {openFindProductBatch}
                    className="w-60 rounded text-left justify-between"
                  >
                    <span className='grow text-center'>
                      {productBatch === "all"
                        ? "Tất cả các lô hàng"
                        : productBatches.find((s) => s.id === productBatch)?.name || "Tất cả lô hàng"
                      }
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-60 p-0 z-100'>
                  <Command>
                    <CommandInput placeholder='Tìm kiếm danh mục...'/>
                    <CommandList>
                      <CommandEmpty>Không tìm thấy</CommandEmpty>
                      <CommandGroup>
                        <CommandItem
                          key="all"
                          value="Tất cả lô hàng"
                          onSelect={() => {
                            setProductBatch("all");
                            setOpenFindProductBatch(false);
                          }}
                        >
                          Tất cả lô hàng
                          <Check
                            className={cn(
                              "ml-auto h-4 w-4",
                              productBatch === "all" ? "opacity-100" : "opacity-0"
                            )}
                          />
                        </CommandItem>
                        {productBatches.map((batch) => (
                          <CommandItem
                            key = {batch.id}
                            value = {batch.name}
                            onSelect={() => {
                              setProductBatch(batch.id);
                              setOpenFindProductBatch(false);
                            }}
                          >
                            {batch.name}
                            <Check
                              className={cn("ml-auto h-4 w-4",
                                batch.id === productBatch ? "opacity-100" : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </CardContent>
        </Card>
      </div>
    );
}