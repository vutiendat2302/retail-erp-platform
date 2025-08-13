import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeIn } from '../../utils/motion';
import Dropdown from 'react-bootstrap/Dropdown';

interface NavLink {
  href: string;
  label: string;
}

const Navbar: React.FC = () => {
  const location = useLocation();

  const singleLinks: NavLink[] = [
    {href: '/', label: 'Home'},
  ];

  const dropdownHRMLinks: NavLink[] = [
    { href: '/employee', label: 'Employee' },
    { href: '/schedule', label: 'Schedule' },
    { href: '/attendance', label: 'Attendance' },
  ];

  const dropdownInventoryLinks: NavLink[] = [
    {href: '/product', label: 'Product'},
    {href: '/inventory', label: 'Inventory'},
    {href: '/warehouse', label: 'Warehouse'},
    {href: '/store', label: 'Store'},
  ]

  const isDropdownActive = dropdownHRMLinks.some(link => location.pathname === link.href);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm z-50 border-b border-gray-100 shadow-sm">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 md:h-20 items-center justify-between">
          
          {/* Logo */}
          <div className="md:flex md:items-center md:gap-12">
            <Link to="/" className="block text-teal-600 text-xl font-bold">
              Optima HRMs
            </Link>
          </div>

          {/* Desktop Menu */}
          <motion.div
            variants={fadeIn('down', 0.3)}
            className="hidden md:flex items-center gap-10"
          >
            {singleLinks.map((link, index) => (
              <motion.div key={index} variants={fadeIn('down', 0.1 * (index + 1))}>
                <Link
                  to = {link.href}
                  className={`text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-teal-600 after:transition-all
                    ${location.pathname === link.href ? 'text-teal-600 after:w-full' : 'text-gray-600 hover:text-gray-900'}`}>
                  {link.label}
                </Link>
              </motion.div>
            ))}

          {/* Dropdown HRM*/}
          <Dropdown as = {motion.div} variants={fadeIn('down', 0.4)}>
            <Dropdown.Toggle
              className={`text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-teal-600 after:transition-all
                    ${isDropdownActive ? 'text-teal-600 after:w-full' : 'text-gray-600 hover:text-gray-900'}`}
              id="dropdown-custom-components"
              as="div"
            >
              <span className='block'>HRM-Manager</span>
            </Dropdown.Toggle>

            <Dropdown.Menu className="mt-2 rounded-md shadow-lg">
              {dropdownHRMLinks.map((link, index) => (
                <Dropdown.Item
                  key={index}
                  as={Link}
                  to={link.href}
                  className={`block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors
                          ${location.pathname === link.href ? 'bg-gray-100 text-teal-600 font-bold' : ''}`}>
                  {link.label}
              </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          {/* Dropdown Inventory*/}
          <Dropdown as = {motion.div} variants={fadeIn('down', 0.4)}>
            <Dropdown.Toggle
              className={`text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-teal-600 after:transition-all
                    ${isDropdownActive ? 'text-teal-600 after:w-full' : 'text-gray-600 hover:text-gray-900'}`}
              id="dropdown-custom-components"
              as="div"
            >
              <span className='block'>Inventory-Manager</span>
            </Dropdown.Toggle>

            <Dropdown.Menu className="mt-2 rounded-md shadow-lg">
              {dropdownInventoryLinks.map((link, index) => (
                <Dropdown.Item
                  key={index}
                  as={Link}
                  to={link.href}
                  className={`block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors
                          ${location.pathname === link.href ? 'bg-gray-100 text-teal-600 font-bold' : ''}`}>
                  {link.label}
              </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </motion.div>


          {/* Auth Buttons */}
          <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">

              {/* Login Button */}
              <motion.a
                href="#"
                variants={fadeIn('left', 0.4)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-teal-700 transition-all"
              >
                Login
              </motion.a>

              {/* Register Button */}
              <motion.div
                className="hidden sm:flex"
                variants={fadeIn('left', 0.5)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a
                  href="#"
                  className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 hover:bg-gray-200 transition-all"
                >
                  Register
                </a>
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;
