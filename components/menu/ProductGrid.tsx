"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Product, Category } from "@/lib/types";
import ProductCard from "./ProductCard";
import { PackageOpen } from "lucide-react";

interface ProductGridProps {
  products: Product[];
  categories: Category[];
  activeCategoryId: string | null;
  showUnavailable: boolean;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

export default function ProductGrid({
  products,
  categories,
  activeCategoryId,
  showUnavailable,
}: ProductGridProps) {
  // Group products by category
  const categoriesToShow = activeCategoryId
    ? categories.filter((c) => c.id === activeCategoryId && c.active)
    : categories.filter((c) => c.active).sort((a, b) => a.order - b.order);

  const hasAny = categoriesToShow.some((cat) =>
    products.filter((p) => p.categoryId === cat.id && (showUnavailable || p.available)).length > 0
  );

  if (!hasAny) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-20 text-center"
      >
        <PackageOpen className="h-12 w-12 text-neutral-300 mb-3" />
        <p className="text-neutral-500 font-medium">No se encontraron platos</p>
        <p className="text-neutral-400 text-sm mt-1">Intentá con otra búsqueda</p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      {categoriesToShow.map((cat) => {
        const catProducts = products.filter(
          (p) => p.categoryId === cat.id && (showUnavailable || p.available)
        );
        if (catProducts.length === 0) return null;

        return (
          <section key={cat.id} id={`cat-${cat.slug}`}>
            <div className="flex items-center gap-2 mb-4 px-4">
              <span className="text-2xl">{cat.emoji}</span>
              <h2 className="text-lg font-bold text-neutral-900">{cat.name}</h2>
              <span className="ml-auto text-xs text-neutral-400 font-medium">
                {catProducts.length} {catProducts.length === 1 ? "plato" : "platos"}
              </span>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={cat.id}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-2 gap-3 px-4 sm:grid-cols-3"
              >
                {catProducts
                  .sort((a, b) => a.order - b.order)
                  .map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      showUnavailable={showUnavailable}
                    />
                  ))}
              </motion.div>
            </AnimatePresence>
          </section>
        );
      })}
    </div>
  );
}
