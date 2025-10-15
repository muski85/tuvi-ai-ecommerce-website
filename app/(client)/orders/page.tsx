import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';
import React from 'react'
import { requiredUser } from '@/hooks/requiredUser';

const OrdersPage = async() => {
  await requiredUser();
  return (
    <div>OrdersPage</div>
  )
}

export default OrdersPage