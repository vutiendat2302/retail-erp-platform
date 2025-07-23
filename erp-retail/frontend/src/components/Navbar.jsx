import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeIn } from '../utils/motion'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('#home')

  const navLinks = [
    { href: "home", label: "Home" },
    { href: "employee", label: "Employee" },
    { href: "schedule", label: "Schedule" },
    { href: "attendance", label: "Attendance" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm z-50 border-b border-gray-100 shadow-sm">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 md:h-20 items-center justify-between">
          {/* Logo / Title */}
          <div className="md:flex md:items-center md:gap-12">
            <a className="block text-teal-600 text-xl font-bold" href="#">
              <span className="sr-only">Home</span>
              Optima HRMs
            </a>
          </div>

          {/* Desktop Menu */}
          <motion.div 
            variants={fadeIn('down', 0.3)}
            className="hidden md:flex items-center gap-10"
          >
            {navLinks.map((link, index) => (
              <motion.a 
                key={index}
                variants={fadeIn('down', 0.1 * (index + 1))}
                href={link.href}
                onClick={() => setActiveLink(link.href)}
                className={`text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-blue-600 after:transition-all
                  ${activeLink === link.href ? 'text-blue-600 after:w-full' : 'text-gray-600 hover:text-gray-900'}`}
              >
                {link.label}
              </motion.a>
            ))}
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
  )
}

export default Navbar
