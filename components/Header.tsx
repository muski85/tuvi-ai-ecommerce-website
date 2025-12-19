import React from "react";
import HeaderMenu from "./HeaderMenu";
import Logo from "./Logo";
import Container from "./Container";
import MobileMenu from "./MobileMenu";
import SearchBar from "./SearchBar";
import CartIcon from "./CartIcon";
import { currentUser } from "@clerk/nextjs/server";
import { ClerkLoaded, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";
import { getAllCategories } from "@/sanity/lib/helpers/queries";
import OrdersBadge from "./OrdersBadge"; 

const Header = async () => {
  const user = await currentUser();
  const categories = await getAllCategories();

  return (
    <header className="border-b border-b-gray-400 py-5 sticky top-0 z-50 bg-white/95 shadow-sm">
      <Container>
        {/* Mobile Layout (< md) */}
        <div className="flex md:hidden items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <MobileMenu categories={categories} />
            <Logo>Tuvi</Logo>
          </div>
          <div className="flex items-center gap-3">
            <SearchBar />
            <CartIcon />
            <ClerkLoaded>
              <SignedIn>
                <OrdersBadge /> {/*  Use client component */}
                <UserButton />
              </SignedIn>
              {!user && (
                <SignInButton mode="modal">
                  <button className="text-sm font-semibold">Login</button>
                </SignInButton>
              )}
            </ClerkLoaded>
          </div>
        </div>

        {/* Desktop Layout (>= md) */}
        <div className="hidden md:flex items-center justify-between gap-7 text-lightColor">
          <HeaderMenu categories={categories} />
          <div className="w-1/3 flex items-center justify-center">
            <Logo>Tuvi</Logo>
          </div>
          <div className="w-1/3 flex items-center justify-end gap-5">
            <SearchBar />
            <CartIcon />
            <ClerkLoaded>
              <SignedIn>
                <OrdersBadge /> {/*  Use client component */}
                <UserButton />
              </SignedIn>
              {!user && (
                <SignInButton mode="modal">
                  <button className="text-sm font-semibold hover:text-darkColor hoverEffect">
                    Login
                  </button>
                </SignInButton>
              )}
            </ClerkLoaded>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;