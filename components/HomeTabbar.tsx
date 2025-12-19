import React from 'react'
import { productType } from '../constants/index';
import { Repeat } from 'lucide-react';

interface Props {
  selectedTab: string;
  onTabSelect: (tab: string) => void;
}

const HomeTabbar = ({selectedTab, onTabSelect}: Props) => {
  return (
    <div className='flex justify-center w-full'>
      {/* Mobile: Scrollable | Desktop: Centered */}
      <div className='flex items-center gap-2 md:gap-3 overflow-x-auto md:overflow-visible scrollbar-hide pb-2 md:pb-0'>
        {/* Tabs */}
        <div className='flex items-center gap-2 md:gap-3'>
          {productType?.map((item) => (
            <button 
              key={item?.title} 
              className={`
                border border-darkColor 
                px-3 py-1.5 md:px-6 md:py-2 
                rounded-full 
                text-xs md:text-sm 
                font-semibold 
                whitespace-nowrap
                hover:bg-darkColor hover:text-white 
                hoverEffect 
                ${selectedTab === item?.title && 'bg-darkColor text-white'}
              `} 
              onClick={() => onTabSelect(item?.title)}
            >
              {item?.title}
            </button>
          ))}
        </div>
        
        {/* Refresh Button */}
        <button 
          className="
            border border-darkColor 
            p-1.5 md:p-2 
            rounded-full 
            hover:bg-darkColor hover:text-white 
            hoverEffect
            flex-shrink-0
          "
        >
          <Repeat className='w-4 h-4 md:w-5 md:h-5'/>
        </button>
      </div>
    </div>
  )
}

export default HomeTabbar