"use client";
import React, { useState } from 'react';
import Image  from "next/image";
import Link from 'next/link';

import { Home, User, Bookmark, Bell, X , Menu, LogOut } from 'lucide-react';
const nav = () => {
  const [isMenuOpen,setIsMenuOpen] = useState(false);
  const toggleMenu = ()=>{
    setIsMenuOpen(!isMenuOpen);
  }
  return (
    <nav className="bg-gray-900 text-white p-6 border-b border-gray-300 sticky top-0 left-0 right-0 z-10 w-screen">
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
        <div className="hidden md:flex space-x-12 justify-center flex-grow">
          <NavLink href="/pages/homepage" icon={<Home className="w-6 h-6 mr-2 ml-2 basis-1/5" />} text="Home" />
          <NavLink href="/pages/profile" icon={<User className="w-6 h-6 mr-2 basis-1/5" />} text="Profile" />
          <NavLink href="/pages/yourdebate" icon={<Bookmark className="w-8 h-6 mr-1 basis-1/5" />} text="Your Debate" />
          <NavLink href="/notifications" icon={
             <div className="flex items-center bg-gray-900 p-2 rounded-lg">
             <div className="relative">
             <Bell className="w-6 h-6 " />
               <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                 3
               </span>
             </div>
           </div>
            } text="Notifications" >
            
          </NavLink>
          <NavLink href="/login" icon={<LogOut  className="w-6 h-6 mr-2 basis-1/5"  />} text="Logout" />
        </div>

        {/* Mobile menu */}
        <div 
          className={`z-40 md:hidden absolute top-16 left-0 right-0 bg-gray-900 transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <div className="flex flex-col items-stretch py-4">
            <NavLink href="/" icon={<Home className="w-6 h-6 mr-2" />} text="Home" mobileJustify onClick={toggleMenu} />
            <NavLink href="/profile" icon={<User className="w-6 h-6 mr-2" />} text="Profile" mobileJustify onClick={toggleMenu} />
            <NavLink href="/yourdebate" icon={<Bookmark className="w-6 h-6 mr-2" />} text="Bookmarks" mobileJustify onClick={toggleMenu} />
            <NavLink href="/notifications" icon={
           
              <div className="flex  bg-gray-900 pr-2 rounded-lg ml-0">
                <div className="relative">
                <Bell className="w-6 h-6 " />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    3
                  </span>
                </div>
             
              </div>
              } text="Notifications" mobileJustify onClick={toggleMenu} />
            <NavLink href="/login" icon={<LogOut  className="w-6 h-6 mr-2 "  />} text="Logout" />
            
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