"use client";

import {
  Heart,
  Minus,
  Plus,
  Search,
  ShoppingCart,
  SlidersHorizontal,
  Star,
  Trash2,
  X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { PixelBadge } from "@/components/ui/pixel/pixel-badge";
import { PixelButton } from "@/components/ui/pixel/pixel-button";
import {
  PixelCard,
  PixelCardContent,
  PixelCardFooter,
  PixelCardHeader,
  PixelCardTitle,
} from "@/components/ui/pixel/pixel-card";
import { PixelInput } from "@/components/ui/pixel/pixel-input";
import {
  PixelSelect,
  PixelSelectContent,
  PixelSelectItem,
  PixelSelectTrigger,
  PixelSelectValue,
} from "@/components/ui/pixel/pixel-select";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectAvailableCategories,
  selectFilteredProducts,
  selectPriceStats,
} from "@/store/selectors/productSelectors";
import {
  resetFilters,
  type SortOption,
  setPriceRange,
  setSearchTerm,
  setSortBy,
  toggleCategory,
} from "@/store/slices/filterSlice";
import {
  addToCart,
  addToWishlist,
  clearCart,
  decrementQuantity,
  incrementQuantity,
  moveToCart,
  type Product,
  removeFromCart,
  removeFromWishlist,
} from "@/store/slices/shoppingCartSlice";

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
  const {
    items: cartItems,
    wishlist,
    total,
    itemCount,
  } = useAppSelector((state) => state.shoppingCart);
  const { searchTerm, selectedCategories, priceRange, sortBy } = useAppSelector(
    (state) => state.filter,
  );

  // Use memoized selector for filtered products
  const filteredProducts = useAppSelector((state) =>
    selectFilteredProducts(state, sampleProducts),
  );
  const availableCategories = useAppSelector((state) =>
    selectAvailableCategories(state, sampleProducts),
  );
  const priceStats = useAppSelector((state) =>
    selectPriceStats(state, sampleProducts),
  );

  const [showFilters, setShowFilters] = useState(true);
  const [minPrice, setMinPrice] = useState(priceRange.min);
  const [maxPrice, setMaxPrice] = useState(priceRange.max);

  const handlePriceRangeChange = () => {
    dispatch(setPriceRange({ min: minPrice, max: maxPrice }));
  };

  const activeFiltersCount =
    (searchTerm ? 1 : 0) +
    selectedCategories.length +
    (priceRange.min !== 0 || priceRange.max !== 1000 ? 1 : 0) +
    (sortBy !== "none" ? 1 : 0);

  return (
    <div className="min-h-screen bg-pixel-light-bg dark:bg-black p-8">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-4xl font-bold uppercase tracking-wider font-pixel dark:text-pixel-dark-secondary">
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
                <PixelButton variant="secondary">Dashboard</PixelButton>
              </Link>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <PixelCard>
              <PixelCardHeader>
                <div className="flex items-center justify-between">
                  <PixelCardTitle className="flex items-center gap-2">
                    <SlidersHorizontal className="h-5 w-5" />
                    Filters
                    {activeFiltersCount > 0 && (
                      <PixelBadge variant="default" className="ml-2">
                        {activeFiltersCount}
                      </PixelBadge>
                    )}
                  </PixelCardTitle>
                  <PixelButton
                    size="sm"
                    variant="ghost"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    {showFilters ? "Hide" : "Show"}
                  </PixelButton>
                </div>
              </PixelCardHeader>

              {showFilters && (
                <PixelCardContent className="space-y-6">
                  {/* Search */}
                  <div>
                    <label className="text-sm font-bold mb-2 block">
                      Search
                    </label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <PixelInput
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) =>
                          dispatch(setSearchTerm(e.target.value))
                        }
                        className="pl-10"
                      />
                      {searchTerm && (
                        <button
                          onClick={() => dispatch(setSearchTerm(""))}
                          className="absolute right-3 top-1/2 -translate-y-1/2"
                          aria-label="Clear search"
                          title="Clear search"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Categories */}
                  <div>
                    <label className="text-sm font-bold mb-2 block">
                      Categories
                    </label>
                    <div className="space-y-2">
                      {availableCategories.map((category) => (
                        <label
                          key={category}
                          className="flex items-center gap-2 cursor-pointer hover:bg-muted p-2 rounded"
                        >
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(category)}
                            onChange={() => dispatch(toggleCategory(category))}
                            className="w-4 h-4 cursor-pointer"
                          />
                          <span className="text-sm">{category}</span>
                          <span className="text-xs text-muted-foreground ml-auto">
                            (
                            {
                              sampleProducts.filter(
                                (p) => p.category === category,
                              ).length
                            }
                            )
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className="text-sm font-bold mb-2 block">
                      Price Range
                    </label>
                    <div className="space-y-3">
                      <div className="flex gap-2 items-center">
                        <PixelInput
                          type="number"
                          placeholder="Min"
                          value={minPrice}
                          onChange={(e) => setMinPrice(Number(e.target.value))}
                          className="w-full"
                        />
                        <span>-</span>
                        <PixelInput
                          type="number"
                          placeholder="Max"
                          value={maxPrice}
                          onChange={(e) => setMaxPrice(Number(e.target.value))}
                          className="w-full"
                        />
                      </div>
                      <PixelButton
                        size="sm"
                        onClick={handlePriceRangeChange}
                        className="w-full"
                      >
                        Apply
                      </PixelButton>
                      <p className="text-xs text-muted-foreground">
                        Range: ${priceStats.min} - ${priceStats.max}
                      </p>
                    </div>
                  </div>

                  {/* Sort By */}
                  <div>
                    <label className="text-sm font-bold mb-2 block">
                      Sort By
                    </label>
                    <PixelSelect
                      value={sortBy}
                      onValueChange={(value) =>
                        dispatch(setSortBy(value as SortOption))
                      }
                    >
                      <PixelSelectTrigger>
                        <PixelSelectValue placeholder="Select sort order" />
                      </PixelSelectTrigger>
                      <PixelSelectContent>
                        <PixelSelectItem value="none">Default</PixelSelectItem>
                        <PixelSelectItem value="price-asc">
                          Price: Low to High
                        </PixelSelectItem>
                        <PixelSelectItem value="price-desc">
                          Price: High to Low
                        </PixelSelectItem>
                        <PixelSelectItem value="name-asc">
                          Name: A to Z
                        </PixelSelectItem>
                        <PixelSelectItem value="name-desc">
                          Name: Z to A
                        </PixelSelectItem>
                      </PixelSelectContent>
                    </PixelSelect>
                  </div>

                  {/* Reset Filters */}
                  {activeFiltersCount > 0 && (
                    <PixelButton
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        dispatch(resetFilters());
                        setMinPrice(0);
                        setMaxPrice(1000);
                      }}
                      className="w-full"
                    >
                      Reset All Filters
                    </PixelButton>
                  )}
                </PixelCardContent>
              )}
            </PixelCard>
          </aside>

          {/* Products Section */}
          <section className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold uppercase tracking-wider dark:text-pixel-dark-secondary">
                Available Items
              </h2>
              <PixelBadge variant="default">
                {filteredProducts.length} of {sampleProducts.length} products
              </PixelBadge>
            </div>

            {filteredProducts.length === 0 ? (
              <PixelCard>
                <PixelCardContent className="text-center py-12">
                  <p className="text-muted-foreground text-lg mb-4">
                    No products found
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Try adjusting your filters or search terms
                  </p>
                  <PixelButton
                    variant="secondary"
                    onClick={() => {
                      dispatch(resetFilters());
                      setMinPrice(0);
                      setMaxPrice(1000);
                    }}
                  >
                    Clear All Filters
                  </PixelButton>
                </PixelCardContent>
              </PixelCard>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProducts.map((product) => {
                  const inCart = cartItems.find(
                    (item) => item.id === product.id,
                  );
                  const inWishlist = wishlist.find(
                    (item) => item.id === product.id,
                  );

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
                            aria-label={
                              inWishlist
                                ? "Remove from wishlist"
                                : "Add to wishlist"
                            }
                            title={
                              inWishlist
                                ? "Remove from wishlist"
                                : "Add to wishlist"
                            }
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
                        <div className="text-6xl text-center my-4">
                          {product.image}
                        </div>
                        <div className="flex items-center justify-between">
                          <PixelBadge variant="default">
                            {product.category}
                          </PixelBadge>
                          <span className="text-xl font-bold dark:text-pixel-dark-secondary">
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
                              onClick={() =>
                                dispatch(decrementQuantity(product.id))
                              }
                            >
                              <Minus className="h-4 w-4" />
                            </PixelButton>
                            <span className="font-bold text-lg px-4">
                              {inCart.quantity}
                            </span>
                            <PixelButton
                              size="sm"
                              variant="ghost"
                              onClick={() =>
                                dispatch(incrementQuantity(product.id))
                              }
                            >
                              <Plus className="h-4 w-4" />
                            </PixelButton>
                            <PixelButton
                              size="sm"
                              variant="destructive"
                              onClick={() =>
                                dispatch(removeFromCart(product.id))
                              }
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
            )}
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
                        <p className="font-bold dark:text-pixel-dark-secondary">
                          ${(item.quantity * item.price).toFixed(2)}
                        </p>
                      </div>
                    ))}
                    <div className="pt-4 border-t-4 border-black dark:border-[#ff8c00]">
                      <div className="flex justify-between items-center text-xl font-bold">
                        <span>Total:</span>
                        <span className="dark:text-pixel-dark-secondary">
                          ${total.toFixed(2)}
                        </span>
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
                            onClick={() =>
                              dispatch(removeFromWishlist(item.id))
                            }
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
