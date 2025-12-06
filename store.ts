import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/sanity.types";

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  deleteCartProduct: (productId: string) => void;
  resetCart: () => void;
  getTotalPrice: () => number;
  getSubtotalPrice: () => number;  //  Removed optional
  getItemCount: (productId: string) => number;
  getGroupedItems: () => CartItem[];
}

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product._id === product._id
          );
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product._id === product._id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          } else {
            return {
              items: [...state.items, { product, quantity: 1 }],
            };
          }
        }),
        
      removeItem: (productId) => set((state) => ({
        items: state.items.reduce((acc, item) => {
          if (item.product._id === productId) {
            if (item.quantity > 1) {
              acc.push({ ...item, quantity: item.quantity - 1 });
            } 
          } else {
            acc.push(item);
          }
          return acc;
        }, [] as CartItem[])
      })),
      
      deleteCartProduct: (productId) => 
        set((state) => ({
          items: state.items.filter(
            ({ product }) => product?._id !== productId
          ),
        })),
        
      resetCart: () => set({ items: [] }),
      
      //  Total price WITH discount applied
      getTotalPrice: () => {
        return get().items.reduce((total, item) => {
          const price = item.product.price ?? 0;
          const discountPercent = item.product.discount ?? 0;
          const discountAmount = (price * discountPercent) / 100;
          const finalPrice = price - discountAmount;
          return total + finalPrice * item.quantity;
        }, 0);
      },
      
      //  Subtotal price WITHOUT discount (original prices)
      getSubtotalPrice: () => {
        return get().items.reduce((total, item) => {
          const price = item.product.price ?? 0;
          return total + price * item.quantity;
        }, 0);
      },
      
      getItemCount: (productId) => {
        const item = get().items.find((item) => item.product._id === productId);
        return item ? item.quantity : 0;
      },
      
      getGroupedItems: () => get().items,
    }),
    { name: "cart-storage" }
  )
);

export default useCartStore;