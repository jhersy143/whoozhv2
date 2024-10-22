"use client";
import React, { useState } from 'react';
import Image  from "next/image";
import Link from 'next/link';

import { Home, User, Bookmark, Bell, X , Menu} from 'lucide-react';
const nav = () => {
  const [isMenuOpen,setIsMenuOpen] = useState(false);
  const toggleMenu = ()=>{
    setIsMenuOpen(!isMenuOpen);
  }
  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/landingpage" className="flex items-center">
          <Image
            src="/images/LOGO5.png"
            alt="W Logo"
            width={40}
            height={40}
            className="text-teal-500"
          />
        </Link>
        
        {/* Hamburger menu for mobile */}
        <button 
          className="md:hidden focus:outline-none" 
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Desktop menu */}
        <div className="hidden md:flex space-x-16 justify-center flex-grow">
          <NavLink href="/" icon={<Home className="w-6 h-6 mr-2 basis-1/4" />} text="Home" />
          <NavLink href="/pages/login" icon={<User className="w-6 h-6 mr-2 basis-1/4" />} text="Profile" />
          <NavLink href="/bookmarks" icon={<Bookmark className="w-6 h-6 mr-2 basis-1/4" />} text="Bookmarks" />
          <NavLink href="/notifications" icon={<Bell className="w-6 h-6 mr-2 basis-1/4"  />} text="Notifications" />
        </div>

        {/* Mobile menu */}
        <div 
          className={`md:hidden absolute top-16 left-0 right-0 bg-gray-900 transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <div className="flex flex-col items-stretch py-4">
            <NavLink href="/" icon={<Home className="w-6 h-6 mr-2" />} text="Home" mobileJustify onClick={toggleMenu} />
            <NavLink href="/profile" icon={<User className="w-6 h-6 mr-2" />} text="Profile" mobileJustify onClick={toggleMenu} />
            <NavLink href="/bookmarks" icon={<Bookmark className="w-6 h-6 mr-2" />} text="Bookmarks" mobileJustify onClick={toggleMenu} />
            <NavLink href="/notifications" icon={<Bell className="w-6 h-6 mr-2" />} text="Notifications" mobileJustify onClick={toggleMenu} />
          </div>
        </div>
      </div>
    </nav>
  )
}

function NavLink({ 
  href, 
  icon, 
  text, 
  mobileJustify = false, 
  onClick 
}: { 
  href: string; 
  icon: React.ReactNode; 
  text: string; 
  mobileJustify?: boolean;
  onClick?: () => void;
}) {
  return (
    <Link 
      href={href} 
      className={`flex items-center hover:text-teal-500 transition-colors
        ${mobileJustify ? 'justify-between px-4 py-2 border-b border-gray-700 last:border-b-0' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-center">
        {icon}
        <span>{text}</span>
      </div>
      {mobileJustify && <span className="text-gray-400">›</span>}
    </Link>
  )
}

export default nav