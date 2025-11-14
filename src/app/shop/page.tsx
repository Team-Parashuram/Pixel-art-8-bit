"use client";

import { PixelButton } from "@/components/ui/pixel/pixel-button";
import { PixelCard, PixelCardContent, PixelCardFooter, PixelCardHeader, PixelCardTitle } from "@/components/ui/pixel/pixel-card";
import { PixelBadge } from "@/components/ui/pixel/pixel-badge";
import { ShoppingCart, Heart, Trash2, Plus, Minus, Star } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { 
  addToCart, 
  removeFromCart, 
  incrementQuantity, 
  decrementQuantity, 
  addToWishlist, 
  removeFromWishlist,
  moveToCart,
  clearCart,
  type Product 
} from "@/store/slices/shoppingCartSlice";
import Link from "next/link";

// Sample products for demo
const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Pixel Sword",
    price: 49.99,
    image: "🗡️",
    category: "Weapons",
  },
  {
    id: "2",
    name: "Health Potion",
    price: 9.99,
    image: "🧪",
    category: "Consumables",
  },
  {
    id: "3",
    name: "Magic Shield",
    price: 79.99,
    image: "🛡️",
    category: "Armor",
  },
  {
    id: "4",
    name: "Gold Coin",
    price: 0.99,
    image: "🪙",
    category: "Currency",
  },
  {
    id: "5",
    name: "Wizard Hat",
    price: 34.99,
    image: "🎩",
    category: "Armor",
  },
  {
    id: "6",
    name: "Fire Spell Book",
    price: 129.99,
    image: "📕",
    category: "Magic",
  },
];

export default function ShopPage() {
  const dispatch = useAppDispatch();
  const { items: cartItems, wishlist, total, itemCount } = useAppSelector((state) => state.shoppingCart);

  return (
    <div className="min-h-screen bg-[#f5f5dc] dark:bg-[#000000] p-8">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-4xl font-bold uppercase tracking-wider font-[family-name:var(--font-pixel)] dark:text-[#ffd700]">
              Pixel Shop
            </h1>
            <div className="flex gap-4">
              <PixelBadge variant="default">
                <ShoppingCart className="mr-2 h-4 w-4" />
                {itemCount} Items
              </PixelBadge>
              <PixelBadge variant="success">
                Total: ${total.toFixed(2)}
              </PixelBadge>
              <Link href="/examples">
                <PixelButton variant="secondary">
                  Dashboard
                </PixelButton>
              </Link>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Products Section */}
          <section className="lg:col-span-2">
            <h2 className="text-2xl font-bold uppercase tracking-wider mb-6 dark:text-[#ffd700]">
              Available Items
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sampleProducts.map((product) => {
                const inCart = cartItems.find((item) => item.id === product.id);
                const inWishlist = wishlist.find((item) => item.id === product.id);

                return (
                  <PixelCard key={product.id}>
                    <PixelCardHeader>
                      <div className="flex items-center justify-between">
                        <PixelCardTitle>{product.name}</PixelCardTitle>
                        <button
                          onClick={() => {
                            if (inWishlist) {
                              dispatch(removeFromWishlist(product.id));
                            } else {
                              dispatch(addToWishlist(product));
                            }
                          }}
                          className="hover:scale-110 transition-transform"
                        >
                          <Heart
                            className={`h-5 w-5 ${
                              inWishlist ? "fill-red-500 text-red-500" : ""
                            }`}
                          />
                        </button>
                      </div>
                    </PixelCardHeader>
                    <PixelCardContent>
                      <div className="text-6xl text-center my-4">{product.image}</div>
                      <div className="flex items-center justify-between">
                        <PixelBadge variant="default">{product.category}</PixelBadge>
                        <span className="text-xl font-bold dark:text-[#ffd700]">
                          ${product.price}
                        </span>
                      </div>
                    </PixelCardContent>
                    <PixelCardFooter>
                      {inCart ? (
                        <div className="flex items-center gap-2 w-full">
                          <PixelButton
                            size="sm"
                            variant="ghost"
                            onClick={() => dispatch(decrementQuantity(product.id))}
                          >
                            <Minus className="h-4 w-4" />
                          </PixelButton>
                          <span className="font-bold text-lg px-4">{inCart.quantity}</span>
                          <PixelButton
                            size="sm"
                            variant="ghost"
                            onClick={() => dispatch(incrementQuantity(product.id))}
                          >
                            <Plus className="h-4 w-4" />
                          </PixelButton>
                          <PixelButton
                            size="sm"
                            variant="destructive"
                            onClick={() => dispatch(removeFromCart(product.id))}
                            className="ml-auto"
                          >
                            <Trash2 className="h-4 w-4" />
                          </PixelButton>
                        </div>
                      ) : (
                        <PixelButton
                          onClick={() => dispatch(addToCart(product))}
                          className="w-full"
                        >
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Add to Cart
                        </PixelButton>
                      )}
                    </PixelCardFooter>
                  </PixelCard>
                );
              })}
            </div>
          </section>

          {/* Cart & Wishlist Sidebar */}
          <section className="space-y-6">
            {/* Cart Summary */}
            <PixelCard>
              <PixelCardHeader>
                <div className="flex items-center justify-between">
                  <PixelCardTitle>Shopping Cart</PixelCardTitle>
                  {cartItems.length > 0 && (
                    <PixelButton
                      size="sm"
                      variant="ghost"
                      onClick={() => dispatch(clearCart())}
                    >
                      Clear
                    </PixelButton>
                  )}
                </div>
              </PixelCardHeader>
              <PixelCardContent>
                {cartItems.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    Cart is empty
                  </p>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between border-b-2 border-black dark:border-[#ff8c00] pb-2"
                      >
                        <div>
                          <p className="font-bold">{item.name}</p>
                          <p className="text-sm">
                            {item.quantity} × ${item.price}
                          </p>
                        </div>
                        <p className="font-bold dark:text-[#ffd700]">
                          ${(item.quantity * item.price).toFixed(2)}
                        </p>
                      </div>
                    ))}
                    <div className="pt-4 border-t-4 border-black dark:border-[#ff8c00]">
                      <div className="flex justify-between items-center text-xl font-bold">
                        <span>Total:</span>
                        <span className="dark:text-[#ffd700]">${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                )}
              </PixelCardContent>
              {cartItems.length > 0 && (
                <PixelCardFooter>
                  <PixelButton className="w-full">
                    Checkout ({itemCount} items)
                  </PixelButton>
                </PixelCardFooter>
              )}
            </PixelCard>

            {/* Wishlist */}
            <PixelCard>
              <PixelCardHeader>
                <PixelCardTitle>
                  <Heart className="inline mr-2 h-5 w-5" />
                  Wishlist ({wishlist.length})
                </PixelCardTitle>
              </PixelCardHeader>
              <PixelCardContent>
                {wishlist.length === 0 ? (
                  <p className="text-center text-muted-foreground py-4">
                    No items in wishlist
                  </p>
                ) : (
                  <div className="space-y-3">
                    {wishlist.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <span>{item.image}</span>
                          <div>
                            <p className="font-bold text-sm">{item.name}</p>
                            <p className="text-xs">${item.price}</p>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <PixelButton
                            size="sm"
                            variant="ghost"
                            onClick={() => dispatch(moveToCart(item.id))}
                          >
                            <ShoppingCart className="h-3 w-3" />
                          </PixelButton>
                          <PixelButton
                            size="sm"
                            variant="ghost"
                            onClick={() => dispatch(removeFromWishlist(item.id))}
                          >
                            <Trash2 className="h-3 w-3" />
                          </PixelButton>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </PixelCardContent>
            </PixelCard>

            {/* Redux Info Card */}
            <PixelCard>
              <PixelCardHeader>
                <PixelCardTitle className="text-sm">
                  <Star className="inline mr-2 h-4 w-4" />
                  Redux Features Used
                </PixelCardTitle>
              </PixelCardHeader>
              <PixelCardContent>
                <ul className="text-xs space-y-2">
                  <li>✅ Global state management</li>
                  <li>✅ Cart & wishlist sync</li>
                  <li>✅ Real-time total calculation</li>
                  <li>✅ Quantity management</li>
                  <li>✅ Move items between lists</li>
                  <li>✅ Persistent across navigation</li>
                </ul>
              </PixelCardContent>
            </PixelCard>
          </section>
        </div>
      </div>
    </div>
  );
}
