import { Button } from "../../ui/button";
import { Label } from "../../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Search, Check } from "lucide-react";
import { Command, CommandInput, CommandEmpty, CommandList, CommandGroup, CommandItem } from "../../ui/command";
import { useState } from "react";
import { cn } from "../../../lib/utils";

interface Store {
  id: string;
  name: string;
  description: string;
  address: string;
  status: string;
  createBy: string;
  updateBy: string;
}

export function StoreChoose({
  openFindStore,
  setOpenFindStore,
  selectStore,
  setSelectStore,
  dataStore,
} : {
  openFindStore: boolean;
  setOpenFindStore: (open: boolean) => void;
  dataStore: Store[];
  selectStore: string | null;
  setSelectStore: (id: string | null) => void;
}) {
  return (
    <div className='flex items-center justify-between gap-[12px]'>
      <Button variant="outline"
        className='!bg-gray-900 text-white hover:bg-gray-700 border p-2 rounded'>
        <Label className='font-bold'>Store:</Label>
      </Button>

      <Popover open={openFindStore} onOpenChange={setOpenFindStore}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={openFindStore}
            className="w-70 p-2 rounded text-left justify-between"
          >
            <span className='grow text-center'>
              {selectStore
                ? dataStore.find((s) => s.id === selectStore)?.name
                : "Chọn cửa hàng"}
            </span>
            <Search className="h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Tìm kiếm cửa hàng..." />
            <CommandList>
              <CommandEmpty>Không tìm thấy</CommandEmpty>
              <CommandGroup>
                {dataStore.map((store) => (
                  <CommandItem
                    key={store.id}
                    value={store.name}
                    onSelect={() => {
                      setSelectStore(store.id);
                      setOpenFindStore(false);
                    }}
                  >
                    {store.name}
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        store.id === selectStore ? "opacity-100" : "opacity-0"
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
};