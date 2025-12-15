import { redirect } from 'next/navigation';
import { auth, currentUser } from '@clerk/nextjs/server';
import React from 'react'
import { requiredUser } from '@/hooks/requiredUser';
import { getMyOrders } from '@/sanity/lib/helpers/queries';
import  Container  from '@/components/Container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileX} from 'lucide-react';
import { Title } from '@radix-ui/react-toast';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ScrollBar } from '@/components/ui/scroll-area';
import { TableHeader, TableRow, TableHead, Table } from '@/components/ui/table';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import OrdersComponent from '@/components/OrdersComponent';

const OrdersPage = async() => {
  await requiredUser();
  const {userId} = await auth()
  if(!userId){
    return redirect("/");
  }
  const orders = await getMyOrders(userId);
  return(
  <Container className='py-10'>
    {orders?.length ? (
      <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl">Order List</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="w-full">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-auto">Order Number</TableHead>
                    <TableHead className="hidden md:table-cell">Date</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead className="hidden sm:table-cell">
                      Email
                    </TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden sm:table-cell">
                      Invoice Number
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <OrdersComponent orders={orders} />
                <ScrollBar orientation="horizontal" />
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>
    ): (
      <div className='flex flex-col items-center justify-center py-5 md:py-10 px-4'>
        <FileX className='h-24 w-24 text-gray-400 mb-4'/>
        <Title>No orders found</Title>
        <p className='mt-2 text-sm text-gray-600 text-center max-w-md'>It looks like you haven&apos;t placed any orders yet. Start Shopping
          to see your orders here!
        </p>
        <Button asChild className='mt-6'>
          <Link href={"/"}>Browse Products</Link>
        </Button>
      </div>
    )}
  </Container>
  );
}

export default OrdersPage