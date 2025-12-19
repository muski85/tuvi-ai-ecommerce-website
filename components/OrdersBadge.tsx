"use client"

import { useEffect, useState } from 'react'
import { useAuth } from '@clerk/nextjs'
import { ListOrdered } from 'lucide-react'
import Link from 'next/link'

export default function OrdersBadge() {
  const { userId } = useAuth()
  const [orderCount, setOrderCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchOrderCount() {
      if (userId) {
        try {
          const response = await fetch('/api/orders')
          const data = await response.json()
          setOrderCount(data.count || 0)
        } catch (error) {
          console.error('Error fetching order count:', error)
          setOrderCount(0)
        } finally {
          setIsLoading(false)
        }
      } else {
        setIsLoading(false)
      }
    }

    fetchOrderCount()
  }, [userId])

  if (!userId) return null

  return (
    <Link href="/orders" className="group relative">
      <ListOrdered className="w-5 h-5 group-hover:text-darkColor hoverEffect" />
      <span className="absolute -top-1 -right-1 bg-darkColor text-white h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center">
        {isLoading ? '0' : orderCount}
      </span>
    </Link>
  )
}