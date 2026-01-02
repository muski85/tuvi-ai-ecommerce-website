import React, { FC } from 'react'
import { motion } from "motion/react"
import Logo from './Logo';
import { X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import headerData from '@/constants';
import SocialMedia from './SocialMedia';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { CATEGORIES_QUERY_RESULT } from '@/sanity.types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  categories: CATEGORIES_QUERY_RESULT,
}

const Sidebar: FC<SidebarProps>= ({
  isOpen, 
  onClose,
  categories

}) => {
  const pathname = usePathname();
  const sidebarRef = useOutsideClick<HTMLDivElement>(onClose);
  return (
    <div className={`fixed inset-y-0 left-0 z-[90] bg-darkColor/50 shadow-xl hoverEffect cursor-auto w-full
      ${isOpen ? 'translate-x-0': '-translate-x-full'}
    `}>
      <motion.div className="min-w-72 max-w-96 bg-darkColor text-white/70 h-full p-10 border-r border-r-white flex flex-col gap-6"
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{duration: 0.4, delay: 0.3}}
        ref={sidebarRef}
        >
        <div className='flex items-center justify-between'>
          <button onClick={onClose}>
          <Logo className="text-white">Tuvi</Logo>
          </button>
          <button className='hover:text-red-500 hoverEffect
          ' onClick= {onClose}>
            <X/>
          </button>
        </div>
         <div className= "flex flex-col gap-3.5 text-base font-semibold tracking-wide">
      {categories?.map((category) => (
        <Link 
  onClick={onClose}
  key={category?._id} 
  href={`/category/${category?.slug?.current}`}
  className={`px-4 py-2.5 rounded-lg transition-all hoverEffect
    ${pathname === `/category/${category?.slug?.current}`
      ? "bg-gradient-to-r from-darkColor to-gray-800 text-white" 
      : "text-gray-700 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-200"}
  `}
>
  {category?.title}
</Link>
      ))}
       
    </div>
      <SocialMedia/>
      </motion.div>
     
    </div>
    
  )
}

export default Sidebar