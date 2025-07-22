import React from 'react'

const Navbar = () => {
    const navLinks = [
        { href: "#home", label: "Home" },
        { href: "#about", label: "About Us" },
        { href: "#services", label: "Our Service" },
        { href: "#testimonials", label: "Testimonials" },
    ]

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm z-50 border-b border-gray-100 shadow-sm">
        <div className="w-full flex justify-between items-center container mx-auto px-4 sm:px-6 lg:px-8 md:h-20 h-16">
            
        </div>
    </nav>
    
  )
}

export default Navbar