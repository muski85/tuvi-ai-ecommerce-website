"use client";

import Loading from "@/components/Loading";
import useCartStore from "@/store";
import React from "react";
import { useEffect, useState } from "react";
import { useUser, useAuth } from "@clerk/nextjs";
import Container from "@/components/Container";
import NoAccessToCart from "@/components/NoAccessToCart";
import EmptyCart from "@/components/EmptyCart";
import { Heart, ShoppingBag, Trash } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { Tooltip, TooltipProvider } from "@radix-ui/react-tooltip";
import { TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import toast from "react-hot-toast";
import PriceFormatter from "@/components/PriceFormatter";
import QuantityButtons from "@/components/QuantityButtons";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import paypaLogo from "@/images/paypalLogo.png";
import { motion } from "motion/react";
import AnimatedHeart from "@/components/AnimatedHeart";
import { createCheckoutSession, Metadata } from "@/actions/createCheckoutSession";

const CartPage = () => {
  const [isClient, setIsClient] = useState(false);
  const { isSignedIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const {
    deleteCartProduct,
    getTotalPrice,
    getItemCount,
    getSubtotalPrice,
    resetCart,
    getGroupedItems,
  } = useCartStore();
  const { user } = useUser();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleResetCart = () => {
    const confirmed = window.confirm(
      "Are you sure you want to reset the cart?"
    );
    if (confirmed) {
      resetCart();
      toast.success("Your cart has been reset successfully!");
    }
  };

  const handleDeleteProduct = (id: string | undefined) => {
    if (!id) return;
    deleteCartProduct(id);
    toast.success("Product removed from cart successfully");
  };

  const handleCheckout = async() => {
    // toast.error("Checkout functionality is not implemented yet.");
    setLoading(true);
    try{
      const metadata: Metadata={
        orderNumber:crypto.randomUUID(),
        customerName:user?.fullName ?? 'Unknown',
        customerEmail:user?.emailAddresses[0]?.emailAddress ?? 'Unknown',
        clerkUserId:user!.id,
      }
      const checkoutUrl = await createCheckoutSession(cartProducts, metadata);
      if(checkoutUrl){
        window.location.href=checkoutUrl;
      }
    } catch (error){
      console.error('Error creating checkout session: ', error);
    } finally{
      setLoading(false);
    }

  }

  if (!isClient) {
    return <Loading />;
  }

  const cartProducts = getGroupedItems();
  const subtotal = getSubtotalPrice();
  const total = getTotalPrice();
  const discount = subtotal - total;

  return (
    <div className="bg-gray-50 min-h-screen pb-52 md:pb-10">
      {isSignedIn ? (
        <Container className="py-6">
          {cartProducts?.length ? (
            <>
              {/* Header */}
              <motion.div
                className="flex items-center gap-2 py-5"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ShoppingBag className="w-6 h-6" />
                <h1 className="text-2xl font-semibold">Shopping Cart</h1>
                <span className="text-sm text-gray-500 ml-2">
                  ({cartProducts.length}{" "}
                  {cartProducts.length === 1 ? "item" : "items"})
                </span>
              </motion.div>

              <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
                {/* Products List */}
                <div className="lg:col-span-2">
                  <motion.div
                    className="border bg-white rounded-lg shadow-sm"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    {cartProducts.map(({ product }, index) => {
                      const itemCount = getItemCount(product?._id);
                      return (
                        <motion.div
                          key={product?._id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="border-b p-3 md:p-4 last:border-b-0 hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex gap-3 md:gap-4">
                            {/* Product Image */}
                            {product?.images && (
                              <Link
                                href={`/product/${product?.slug?.current}`}
                                className="border p-1 rounded-md overflow-hidden group shrink-0"
                              >
                                <Image
                                  src={urlFor(product?.images[0]).url()}
                                  alt="productImage"
                                  loading="lazy"
                                  width={500}
                                  height={500}
                                  className="w-24 h-24 md:w-32 md:h-32 object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                              </Link>
                            )}

                            {/* Product Details */}
                            <div className="flex flex-1 flex-col justify-between min-w-0">
                              <div className="space-y-1">
                                <Link
                                  href={`/product/${product?.slug?.current}`}
                                >
                                  <h2 className="font-semibold line-clamp-2 hover:text-darkColor transition-colors">
                                    {product?.name}
                                  </h2>
                                </Link>
                                <p className="text-xs md:text-sm text-lightColor line-clamp-2">
                                  {product?.intro}
                                </p>
                                <div className="flex flex-wrap gap-2 text-xs md:text-sm">
                                  <span className="text-gray-600">
                                    Variant:{" "}
                                    <span className="font-medium capitalize">
                                      {product?.variant}
                                    </span>
                                  </span>
                                  <span className="text-gray-600">•</span>
                                  <span className="text-gray-600">
                                    Status:{" "}
                                    <span className="font-medium capitalize">
                                      {product?.status}
                                    </span>
                                  </span>
                                </div>
                              </div>

                              {/* Actions */}
                              <div className="flex items-center justify-between mt-2">
                                <div className="flex items-center gap-3">
                                  <TooltipProvider>
                                    {/* Animated Heart - New! */}
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <div>
                                          <AnimatedHeart
                                            onToggle={(isLiked) => {
                                              if (isLiked) {
                                                toast.success(
                                                  `${product?.name} added to wishlist! ❤️`
                                                );
                                              } else {
                                                toast.success(
                                                  "Removed from wishlist"
                                                );
                                              }
                                            }}
                                          />
                                        </div>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p className="text-xs">
                                          Add to Wishlist
                                        </p>
                                      </TooltipContent>
                                    </Tooltip>

                                    {/* Delete Button */}
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <button
                                          onClick={() =>
                                            handleDeleteProduct(product?._id)
                                          }
                                          className="text-gray-400 hover:text-red-600 transition-colors"
                                        >
                                          <Trash className="w-4 h-4" />
                                        </button>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p className="text-xs">Remove item</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </div>

                                <QuantityButtons product={product} />
                              </div>
                            </div>

                            {/* Price */}
                            <div className="flex flex-col items-end justify-between shrink-0">
                              <PriceFormatter
                                amount={(product?.price ?? 0) * itemCount}
                                className="font-bold text-base md:text-lg whitespace-nowrap"
                              />
                              {product?.discount && product.discount > 0 && (
                                <span className="text-xs text-green-600 font-medium">
                                  {product.discount}% off
                                </span>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}

                    {/* Reset Cart Button */}
                    <div className="p-4 border-t bg-gray-50">
                      <Button
                        className="font-semibold border-gray-300 hover:bg-red-50 hover:border-red-500 hover:text-red-600 transition-all duration-200 group"
                        variant="outline"
                        onClick={handleResetCart}
                      >
                        <Trash className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                        Clear Cart
                      </Button>
                    </div>
                  </motion.div>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="hidden md:block sticky top-24"
                  >
                    <div className="bg-white p-6 rounded-lg border shadow-sm">
                      <h2 className="text-xl font-semibold mb-6">
                        Order Summary
                      </h2>

                      <div className="space-y-4">
                        {/* Subtotal */}
                        <div className="flex justify-between text-gray-600">
                          <span>Subtotal</span>
                          <PriceFormatter amount={subtotal} />
                        </div>

                        {/* Discount */}
                        {discount > 0 && (
                          <div className="flex justify-between text-green-600">
                            <span>Discount</span>
                            <PriceFormatter amount={-discount} />
                          </div>
                        )}

                        {/* Shipping */}
                        <div className="flex justify-between text-gray-600">
                          <span>Shipping</span>
                          <span className="font-semibold text-green-600">
                            Free
                          </span>
                        </div>

                        <Separator />

                        {/* Total */}
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-semibold">Total</span>
                          <PriceFormatter
                            amount={total}
                            className="text-2xl font-bold text-darkColor"
                          />
                        </div>

                        {/* Checkout Button */}
                        <Button
                          className="w-full rounded-full font-semibold tracking-wide text-base h-12"
                          size="lg"
                          onClick={handleCheckout}
                        >
                          Proceed to Checkout
                        </Button>

                        {/* PayPal */}
                        <div className="relative">
                          <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                          </div>
                          <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-gray-500">
                              Or pay with
                            </span>
                          </div>
                        </div>

                        <Link
                          href={"/"}
                          className="flex items-center justify-center py-3 border border-gray-300 rounded-full hover:border-darkColor hover:bg-gray-50 transition-all duration-200"
                        >
                          <Image
                            src={paypaLogo}
                            alt="PayPal Logo"
                            className="w-20"
                          />
                        </Link>

                        <p className="text-xs text-gray-500 text-center mt-4">
                          Tax calculated at checkout
                        </p>
                      </div>
                    </div>

                    {/* Trust Badges */}
                    <div className="mt-4 bg-white p-4 rounded-lg border">
                      <div className="grid grid-cols-2 gap-3 text-xs text-center">
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                            <span className="text-green-600 text-lg">✓</span>
                          </div>
                          <span className="text-gray-600">Secure Payment</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <ShoppingBag className="w-4 h-4 text-blue-600" />
                          </div>
                          <span className="text-gray-600">Free Shipping</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Mobile Summary */}
              <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-40">
                <div className="p-4 max-w-screen-xl mx-auto">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-sm text-gray-600">Total</p>
                      <PriceFormatter
                        amount={total}
                        className="text-xl font-bold text-darkColor"
                      />
                    </div>
                    <Button
                      className="rounded-full font-semibold px-8"
                      size="lg"
                    >
                      Checkout
                    </Button>
                  </div>

                  {discount > 0 && (
                    <p className="text-xs text-green-600 text-center">
                      You saved{" "}
                      <PriceFormatter
                        amount={discount}
                        className="font-semibold"
                      />
                    </p>
                  )}
                </div>
              </div>
            </>
          ) : (
            <EmptyCart />
          )}
        </Container>
      ) : (
        <NoAccessToCart />
      )}
    </div>
  );
};

export default CartPage;
