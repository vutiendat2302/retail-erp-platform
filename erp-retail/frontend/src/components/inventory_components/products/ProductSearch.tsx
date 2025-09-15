import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Search, Check } from 'lucide-react';
import { Select } from '../../ui/select';
import { SelectContent,SelectItem, SelectLabel, SelectTrigger} from '../../ui/select';
import type { BrandName, CategoryName, Product } from '../../../types/InventoryServiceType';
import { Popover } from '../../ui/popover';
import { PopoverContent, PopoverTrigger } from '../../ui/popover';
import { Command } from '../../ui/command';
import { CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../../ui/command';
import {cn} from "../../../lib/utils"

interface ProductSearchData {
  categories: CategoryName[];
  brands: BrandName[];
  openFindCategory: boolean;
  setOpenFindCategory: (open: boolean) => void;
  openFindBrand: boolean;
  setOpenFindBrand: (open: boolean) => void;
  onSearch: (search: string | null, category: string | null, brand: string | null, status: string | null) => void;
}

export const ProductSearch: React.FC<ProductSearchData> = ({
  categories,
  brands,
  openFindCategory,
  setOpenFindCategory,
  openFindBrand,
  setOpenFindBrand,
  onSearch
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [brand, setBrand] = useState<string>("all");
  const [status, setStatus] = useState("all");
  
  React.useEffect(() => {
  onSearch(
    searchTerm.trim() === "" ? null : searchTerm.trim(),
    category === "all" ? null : category,
    brand === "all" ? null : brand,
    status === "all" ? null : status
  );
}, [searchTerm, category, brand, status]);

  console.log(categories, brands);
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="!pl-10"
              />
            </div>

            {/* Tìm kiếm danh mục */}
            <Popover open = {openFindCategory} onOpenChange={setOpenFindCategory}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded = {openFindCategory}
                  className="w-60 rounded text-left justify-between"
                >
                  <span className='grow text-center'>
                    {category === "all"
                      ? "Tất cả danh mục"
                      : categories.find((s) => s.id === category)?.name || "Tất cả danh mục"
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
                        
                        value="Tất cả danh mục"
                        onSelect={() => {
                          setCategory("all");
                          setOpenFindCategory(false);
                        }}
                      >
                        Tất cả danh mục
                        <Check
                          className={cn(
                            "ml-auto h-4 w-4",
                            category === "all" ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                      {categories.map((cat) => (
                        <CommandItem
                          key = {cat.id}
                          value = {cat.name}
                          onSelect={() => {
                            setCategory(cat.id);
                            setOpenFindCategory(false);
                          }}
                        >
                          {cat.name}
                          <Check
                            className={cn("ml-auto h-4 w-4",
                              cat.id === category ? "opacity-100" : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            
            {/* Tìm kiếm Thương hiệu */}
            <Popover open = {openFindBrand} onOpenChange={setOpenFindBrand}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded = {openFindBrand}
                  className="w-60 rounded text-left justify-between"
                >
                  <span className='grow text-center'>
                    {brand === "all"
                      ? "Tất cả thương hiệu"
                      : brands.find((s) => s.id === brand)?.name || "Tất cả thương hiệu"
                    }
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-60 p-0 z-100'>
                <Command>
                  <CommandInput placeholder='Tìm kiếm thương hiệu...'/>
                  <CommandList>
                    <CommandEmpty>Không tìm thấy</CommandEmpty>
                    <CommandGroup>
                      <CommandItem
                        key="all"
                        
                        value="Tất cả thương hiệu"
                        onSelect={() => {
                          setBrand("all");
                          setOpenFindBrand(false);
                        }}
                      >
                        Tất cả thương hiệu
                        <Check
                          className={cn(
                            "ml-auto h-4 w-4",
                            brand === "all" ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                      {brands.map((b) => (
                        <CommandItem
                          key = {b.id}
                          value = {b.name}
                          onSelect={() => {
                            setBrand(b.id);
                            setOpenFindBrand(false);
                          }}
                        >
                          {b.name}
                          <Check
                            className={cn("ml-auto h-4 w-4",
                              b.id === brand ? "opacity-100" : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            
            {/* Trạng thái */}
            <Select value = {status} onValueChange={setStatus}>
              <SelectTrigger className='w-40 !rounded-md !justify-between '>
                <span className="font-semibold">{status === "all" ? "Trạng thái" : status === "active" ? "Đang bán" : "Ngừng bán"}</span>
              </SelectTrigger>
              <SelectContent className='w-40'>
                <SelectItem value='all'>Tất cả</SelectItem>
                <SelectItem value = 'active'>Đang bán</SelectItem>
                <SelectItem value = 'inactive'>Ngừng bán</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
