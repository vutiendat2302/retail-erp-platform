import React, { useState } from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeIn } from '../../utils/motion';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '../ui/dropdown-menu';
import {
  Package,
  Bell,
  User,
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react';

interface NavLink {
  href: string;
  label: string;
}

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const posLink: NavLink[] = [
    {href: '/post-of-link', label: "Post Of Sale"}
  ];

  const reportLink: NavLink[] = [
    {href: '/report', label: 'Report'}
  ];

  const dashboardLink: NavLink[] = [
    {href: '/', label: 'Dashboard'},
  ];

  const dropdownHRMLinks: NavLink[] = [
    { href: '/employee', label: 'Employee' },
    { href: '/schedule', label: 'Schedule' },
    { href: '/attendance', label: 'Attendance' },
  ];

  const dropdownInventoryLinks: NavLink[] = [
    {href: '/inventory', label: 'Hàng tồn kho'},
    {href: '/book', label: 'Nhập hàng'},
    {href: '/return', label: 'Trả hàng'},
    {href: '/supplier', label: 'Nhà cung cấp'},
    {href: '/batch-product', label: 'Lô hàng'},
  ]

  const dropdownProductLinks: NavLink[] = [
    {href: '/product', label: 'Danh sách sản phẩm '},
    {href: '/book', label: 'Danh mục sản phẩm'},
    {href: '/return', label: 'Thương hiệu'},
  ]

  const mobileNavItems = [
    ...dashboardLink,
    ...posLink,
    ...reportLink,
    ...dropdownHRMLinks,
    ...dropdownInventoryLinks,
    ...dropdownProductLinks,
  ];

  const isDropdownHRMActive = dropdownHRMLinks.some(link => location.pathname === link.href);
  const isDropdownIventoryActive = dropdownInventoryLinks.some(link => location.pathname === link.href);
  const isDropdownProductActive = dropdownProductLinks.some(link => location.pathname === link.href);
  const [openDropdownHRM, setOpenDropdownHRM] = useState(false);
  const [openDropdownInventory, setOpenDropdownInventory] = useState(false);
  const [openDropdownProduct, setOpenDropdownProduct] = useState(false);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => navigate('/')}
              className='relative p-2 rounded-full transition-colors hover:bg-foreground/10 flex items-center justify-center'
            >
              <Package className="h-10 w-10 text-primary" />
              <span className="font-bold text-2xl hidden sm:inline-block">WinMart Pro</span>
              <span className="font-bold text-lg sm:hidden">WM Pro</span>
            </button>
            
          </div>

        <div className='flex items-center justify-center'>
          <motion.div className="hidden md:flex items-center justify-between space-x-10 text-base font-medium ml-auto" variants={fadeIn('down',  0.3)}>
          <div>
            {/* Desktop Menu */}
              {dashboardLink.map((link, index) => (
                  <button
                    key = {index}
                    onClick={() => navigate(link.href)}
                    className={`transition-colors hover:text-gray-700 text-black/80 !text-sm ${
                    location.pathname === link.href
                      ? 'text-foreground border-b-2 border-primary pb-1'
                      : 'text-foreground/60'
                    }`}
                  >
                    {link.label}
                  </button>
              ))}
          </div>

          <div>
            {/* Dropdown HRM*/}
              <DropdownMenu open={openDropdownHRM} onOpenChange={setOpenDropdownHRM}>
                <DropdownMenuTrigger asChild>
                  <button
                    className={` relative transition-colors  hover:text-gray-700 text-black/80 !text-sm ${
                      isDropdownHRMActive ? 'text-foreground border-b-2 border-primary pb-1' : 'text-foreground/60'
                    }`}
                  >
                    Human Resources
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="center" sideOffset={18} forceMount>
                  <DropdownMenuLabel className='font-normal'>
                    <div className="flex flex-col space-y-1">
                      
                      {dropdownHRMLinks.map((link, index) => (
                        <DropdownMenuItem asChild key = {index}>
                          <motion.button
                            onClick={() => {
                              setOpenDropdownHRM(false);
                              navigate(link.href);
                            }}
                              className={` relative transition-colors hover:text-foreground/80 ${
                              location.pathname === link.href
                                ? 'text-foreground border-b-2 border-primary pb-1'
                                : 'text-foreground/60'
                              }`}
                              style={{ textDecoration: "none", color: "inherit" }}
                              variants={fadeIn('down', 0.4 + index * 0.1)}
                            >
                              {link.label}
                          </motion.button>
                        </DropdownMenuItem>
                        ))}
                        
                    </div>
                  </DropdownMenuLabel>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div>
              {/* Dropdown Warehouse*/}
              <DropdownMenu  open={openDropdownInventory} onOpenChange={setOpenDropdownInventory}>
                <DropdownMenuTrigger asChild>
                  <button
                    className={`relative transition-colors  hover:text-gray-700 text-black/80 !text-sm ${
                      isDropdownIventoryActive ? 'text-foreground border-b-2 border-primary pb-1' : 'text-foreground/60'
                    }`}
                  >
                    Warehouse
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-56' align="center" sideOffset={18} forceMount>
                  <DropdownMenuLabel className='font-normal'>
                    <div className="flex flex-col space-y-1">
                      {dropdownInventoryLinks.map((link, index) => (
                        <DropdownMenuItem asChild key = {index}>
                          <motion.button
                            onClick={() => {
                              setOpenDropdownInventory(false);
                              navigate(link.href);
                            }}
                              className={` relative transition-colors hover:text-foreground/80 ${
                              location.pathname === link.href
                                ? 'text-foreground border-b-2 border-primary pb-1'
                                : 'text-foreground/60'
                              }`}
                              style={{ textDecoration: "none", color: "inherit" }}
                              variants={fadeIn('down', 0.4 + index * 0.1)}
                            >
                              {link.label}
                          </motion.button>
                        </DropdownMenuItem>
                        ))}
                    </div>
                  </DropdownMenuLabel>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div>
              {/* Dropdown Product*/}
              <DropdownMenu  open={openDropdownProduct} onOpenChange={setOpenDropdownProduct}>
                <DropdownMenuTrigger asChild>
                  <button
                    className={`relative transition-colors  hover:text-gray-700 text-black/80 !text-sm ${
                      isDropdownProductActive ? 'text-foreground border-b-2 border-primary pb-1' : 'text-foreground/60'
                    }`}
                  >
                    Product
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-56' align="center" sideOffset={18} forceMount>
                  <DropdownMenuLabel className='font-normal'>
                    <div className="flex flex-col space-y-1">
                      {dropdownProductLinks.map((link, index) => (
                        <DropdownMenuItem asChild key = {index}>
                          <motion.button
                            onClick={() => {
                              setOpenDropdownProduct(false);
                              navigate(link.href);
                            }}
                              className={` relative transition-colors hover:text-foreground/80 ${
                              location.pathname === link.href
                                ? 'text-foreground border-b-2 border-primary pb-1'
                                : 'text-foreground/60'
                              }`}
                              style={{ textDecoration: "none", color: "inherit" }}
                              variants={fadeIn('down', 0.4 + index * 0.1)}
                            >
                              {link.label}
                          </motion.button>
                        </DropdownMenuItem>
                        ))}
                    </div>
                  </DropdownMenuLabel>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div>
            {/* Pos Of Sale */}
              {posLink.map((link, index) => (
                  <button
                    key = {index}
                    onClick={() => navigate(link.href)}
                    className={`transition-colors  hover:text-gray-700 text-black/80 !text-sm ${
                    location.pathname === link.href
                      ? 'text-foreground border-b-2 border-primary pb-1'
                      : 'text-foreground/60'
                    }`}
                  >
                    {link.label}
                  </button>
              ))}
            </div>

            <div>
            {/* Report */}
              {reportLink.map((link, index) => (
                  <button
                    key = {index}
                    onClick={() => navigate(link.href)}
                    className={`transition-colors  hover:text-gray-700 text-black/80 !text-sm ${
                    location.pathname === link.href
                      ? 'text-foreground border-b-2 border-primary pb-1'
                      : 'text-foreground/60'
                    }`}
                  >
                    {link.label}
                  </button>
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* Right side - Notifications and User Menu */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="relative p-2 rounded-full transition-colors hover:bg-foreground/10">
            <Bell className="h-5 w-6" />
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              3
            </Badge>
          </button>
          {/* User Menu */}
              <button className="relative p-2 rounded-full transition-colors hover:bg-foreground/10">
                <User className="h-8 w-6" />
              </button>
          {/* Settings */}
          <button className="relative p-2 rounded-full transition-colors hover:bg-foreground/10">
            <Settings className="h-6 w-6" />
          </button>

          {/* Menu */}
          <Button
            variant="ghost"
            className='md:hidden'
            size="sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="flex flex-col space-y-1 p-4">
            {mobileNavItems.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  navigate(item.href);
                  setIsMobileMenuOpen(false);
                }}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === item.href
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground/60 hover:text-foreground hover:bg-accent'
                }`}
              >
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
