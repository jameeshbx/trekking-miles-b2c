"use client"


import React, { useState } from 'react'
import Nav from './Nav'
import MobileNav from './MobileNav'

const ResponsiveNav = () => {

  const [showNav, setShowNav] = useState(false);

  const handleNavOpen = () => {
      setShowNav(prev => !prev) 
  }

  return (
    <div>
      <Nav openNav={handleNavOpen} />
      <MobileNav showNav={showNav} closeNav={handleNavOpen} />
    </div>
  )
}

export default ResponsiveNav