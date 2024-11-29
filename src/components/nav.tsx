"use client";
import React, { useState } from 'react';
import Image  from "next/image";
import Link from 'next/link';

import { Home, User, Bookmark, Bell, X , Menu, LogOut, ChevronRight } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
const nav = () => {
  const [isMenuOpen,setIsMenuOpen] = useState(false);
  const toggleMenu = ()=>{
    setIsMenuOpen(!isMenuOpen);
  }
  const [isNotifOpen, setIsNotifOpen] = useState(false)

  const notifications = [
    { id: 1, action: "Commented on Your Debate" },
    { id: 2, action: "Joined Your Debate" },
    { id: 3, action: "Commented on Your Debate" },
    { id: 4, action: "Commented on Your Debate" },
  ]

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
          <div className={`flex items-center transition-colors cursor-pointer relative`} onClick={()=>setIsNotifOpen(!isNotifOpen)}>
            <div className="flex items-center hover:text-teal-500 ">
                    <div className="relative mr-2">
                      <Bell className="w-6 h-6 " />
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                        3
                      </span>
                    </div>
                
                    <span>Notifications</span>
            </div>
                {isNotifOpen && (
                      <div className="absolute right-0  w-80 top-12 bg-gray-800 rounded-lg shadow-lg overflow-hidden z-10">
                      {notifications.map((notification) => (
                        <div key={notification.id} className="flex items-center p-4 border-b border-gray-700 last:border-b-0">
                          <Avatar className="w-10 h-10 mr-3">
                            <AvatarImage src="/placeholder.svg" alt="Jhersy Fernandez" />
                            <AvatarFallback>JF</AvatarFallback>
                          </Avatar>
                          <div className="flex-grow">
                            <p className="font-semibold">Jhersy Fernandez</p>
                            <p className="text-sm text-gray-400">
                              {notification.action}
                            </p>
                          </div>
                          <span className="text-sm text-gray-400">1 min</span>
                        </div>
                      ))}
                        <div className="p-4 text-center">
                          <a href="#" className="text-blue-400 hover:text-blue-300 flex items-center justify-center">
                            See all
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </a>
                        </div>
                    </div>
                    )}
          </div>
            <NavLink href="/" icon={<LogOut  className="w-6 h-6 mr-2 basis-1/5"  />} text="Logout" />
        </div>

        {/* Mobile menu */}
        <div 
          className={`z-40 md:hidden absolute top-16 left-0 right-0 bg-gray-900 transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
          }`}
          >
          <div className="flex flex-col items-stretch py-4">
            <NavLink href="/pagess/homepage" icon={<Home className="w-6 h-6 mr-2" />} text="Home" mobileJustify onClick={toggleMenu} />
            <NavLink href="/pages/profile" icon={<User className="w-6 h-6 mr-2" />} text="Profile" mobileJustify onClick={toggleMenu} />
            <NavLink href="/yourdebate" icon={<Bookmark className="w-6 h-6 mr-2" />} text="Bookmarks" mobileJustify onClick={toggleMenu} />
           
            <div className='flex items-center transition-colors cursor-pointer justify-between px-4 py-2 border-b border-gray-700 last:border-b-0 ' onClick={()=>setIsNotifOpen(!isNotifOpen)}>
              <div className="flex items-center hover:text-teal-500 ">
                <div className="relative mr-2">
                  <Bell className="w-6 h-6 " />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    3
                    </span>
                    
                  </div>
                  <span>Notifications</span>
              </div>
               
            </div>
            <NavLink href="/" mobileJustify icon={<LogOut  className="w-6 h-6  "  />} text="Logout" />
            
          </div>
          {isNotifOpen && (
                        <div className="absolute top-44 left-4 bg-gray-800 rounded-lg shadow-lg overflow-hidden z-10 w-4/5">
                        {notifications.map((notification) => (
                          <div key={notification.id} className="flex items-center p-4 border-b border-gray-700 last:border-b-0">
                            <Avatar className="w-10 h-10 mr-3">
                              <AvatarImage src="/placeholder.svg" alt="Jhersy Fernandez" />
                              <AvatarFallback>JF</AvatarFallback>
                            </Avatar>
                            <div className="flex-grow">
                              <p className="font-semibold">Jhersy Fernandez</p>
                              <p className="text-sm text-gray-400">
                                {notification.action}
                              </p>
                            </div>
                            <span className="text-sm text-gray-400">1 min</span>
                          </div>
                        ))}
                          <div className="p-4 text-center">
                            <a href="#" className="text-blue-400 hover:text-blue-300 flex items-center justify-center">
                              See all
                              <ChevronRight className="w-4 h-4 ml-1" />
                            </a>
                          </div>
                      </div>
                      )}  
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