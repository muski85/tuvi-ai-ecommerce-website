import React from 'react'
import { productType } from '../constants/index';
import { Repeat } from 'lucide-react';

interface Props {
  selectedTab: string;
  onTabSelect: (tab: string) => void;
   
}

const HomeTabbar = ({selectedTab, onTabSelect}: Props) => {
  return (
    <div className='flex items-center gap-1.5 text-sm font-semibold'>
      <div className='flex items-center gap-1.5'>
      {productType?.map((item)=> (
        <button key={item?.title} className={`border border-darkColor px-4 py-1.5 md:px-6 md:py-2 rounded-full 
          hover:bg-darkColor hover:text-white hoverEffect ${selectedTab === item?.title && 'bg-darkColor text-white'}`} 
        onClick={() => onTabSelect(item?.title)}
        >
          {item?.title}
        </button>
      ))}
      </div>
      <button className="border border-darkColor p-2 rounded-full 
          hover:bg-darkColor hover:text-white hoverEffect">
        <Repeat className='w-5 h-5'/>
      </button>
    </div>
  )
}

export default HomeTabbar