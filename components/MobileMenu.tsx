"use client";
import { AlignLeft } from 'lucide-react'
import React, {useState} from 'react'
import Sidebar from './Sidebar'
import { CATEGORIES_QUERY_RESULT } from '@/sanity.types';


interface MobileMenuProps {
  categories: CATEGORIES_QUERY_RESULT; 
}

const MobileMenu = ({ categories }: MobileMenuProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <>
    <button onClick={()=> setIsSidebarOpen(!isSidebarOpen)}>
      <AlignLeft className='hover:text-darkColor hoverEffect md:hidden'/>
    </button>
    <div className="md:hidden">
      <Sidebar 
      isOpen={isSidebarOpen}
      onClose={() => setIsSidebarOpen(false)}
      categories={categories}
      />
    </div>
    </>
  )
}

export default MobileMenu