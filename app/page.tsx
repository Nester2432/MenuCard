"use client";

import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useMenu } from "@/lib/store/MenuContext";
import HeroSection from "@/components/menu/HeroSection";
import SearchBar from "@/components/menu/SearchBar";
import CategoryChips from "@/components/menu/CategoryChips";
import ProductGrid from "@/components/menu/ProductGrid";

export default function MenuPage() {
  const { state } = useMenu();
  const { restaurant, categories, products } = state;

  const [search, setSearch] = useState("");
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return products;
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.ingredients.some((i) => i.toLowerCase().includes(q))
    );
  }, [products, search]);

  const handleCategorySelect = (id: string | null) => {
    setActiveCategoryId(id);
    setSearch("");
  };

  return (
    <main className="min-h-screen bg-[#fafafa] max-w-2xl mx-auto">
      {/* Hero */}
      <HeroSection restaurant={restaurant} />

      {/* Sticky search + categories */}
      <div className="sticky top-0 z-20 bg-[#fafafa]/95 backdrop-blur-sm pt-4 pb-3 space-y-3 shadow-[0_1px_0_rgba(0,0,0,0.06)]">
        <div className="px-4">
          <SearchBar value={search} onChange={setSearch} />
        </div>
        <AnimatePresence>
          {!search && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <CategoryChips
                categories={categories}
                activeId={activeCategoryId}
                onSelect={handleCategorySelect}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Product grid */}
      <div className="mt-6">
        <ProductGrid
          products={filteredProducts}
          categories={categories}
          activeCategoryId={search ? null : activeCategoryId}
          showUnavailable={restaurant.settings.showUnavailableProducts}
        />
      </div>
    </main>
  );
}
