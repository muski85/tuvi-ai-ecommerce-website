import { Metadata } from 'next'

import React from 'react'

export const metadata: Metadata = {
  title: "Ecommerce Backend",
  description: "Ecommerce Backend built with Next.js and Sanity", 
};

const Rootlayout = ({children}: {children: React.ReactNode}) => {
  return (
    <html lang='en'>
      <body>
        {children}
      </body>
    </html>
  )
}

export default Rootlayout