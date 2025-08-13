import { Button } from "../../ui/button";
import { Label } from "../../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Search, Check } from "lucide-react";
import { Command, CommandInput, CommandEmpty, CommandList, CommandGroup, CommandItem } from "../../ui/command";
import { useState } from "react";
import { cn } from "../../../lib/utils";

interface Warehouse {
  id: string;
  name: string;
  description: string;
  address: string;
  status: string;
  createBy: string;
  updateBy: string;
}

export function WarehouseChoose({
  openFindWarehouse,
  setOpenWarehouse,
  dataWarehouse,
  selectWarehouse,
  setSelectWarehouse,
} : {
  openFindWarehouse: boolean,
  setOpenWarehouse: (open: boolean) => void;
  dataWarehouse: Warehouse[];
  selectWarehouse: string | null;
  setSelectWarehouse: (id: string | null) => void;
}) {
  return (
    <div className='flex items-center justify-between gap-[12px]'>
      <Button variant="outline"
        className='!bg-gray-900 text-white hover:bg-gray-700 border p-2 !rounded-md'>
        <Label className=' font-bold'>Warehouse:</Label>
      </Button>

      <Popover open={openFindWarehouse} onOpenChange={setOpenWarehouse}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="!w-[250px] p-2 !rounded-md text-left"
          >
          <span className='grow text-center'>
          {selectWarehouse
          ? dataWarehouse.find((warehouse) => warehouse.id === selectWarehouse)?.name
          : "Chọn kho hàng"}
          </span>
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50"/>
          </Button>
            </PopoverTrigger>
              <PopoverContent className="!w-[250px] p-0">
                <Command>
                  <CommandInput
                    className="w-full !border-gray-700"
                    placeholder="Tìm kiếm kho hàng..." />
                  <CommandList>
                    <CommandEmpty>Không tìm thấy</CommandEmpty>
                    <CommandGroup>
                      {dataWarehouse.map((warehouse) => (
                        <CommandItem
                          key={warehouse.id}
                          value={warehouse.name}
                          onSelect={() => {
                            setSelectWarehouse(warehouse.id);
                            setOpenWarehouse(false); // đóng dropdown
                          }}
                        >
                          {warehouse.name}
                        <Check
                          className={cn("ml-auto h-4 w-4",
                          warehouse.id === selectWarehouse ? "opacity-100" : "opacity-0"
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
  )
}