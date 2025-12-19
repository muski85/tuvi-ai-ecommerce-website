import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { getMyOrders } from "@/sanity/lib/helpers/queries";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ count: 0 }, { status: 200 });
    }

    const orders = await getMyOrders(userId);
    
    return NextResponse.json({ 
      count: orders?.length || 0 
    });

  } catch (error) {
    console.error('Orders API error:', error);
    return NextResponse.json({ count: 0 }, { status: 200 });
  }
}