"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { useMenu } from "@/lib/store/MenuContext";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { state } = useMenu();
  const product = state.products.find((p) => p.id === params.id);

  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-neutral-500">Producto no encontrado</p>
          <button onClick={() => router.back()} className="mt-4 text-brand-500 font-medium">
            Volver al menú
          </button>
        </div>
      </div>
    );
  }

  const category = state.categories.find((c) => c.id === product.categoryId);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen bg-[#fafafa] max-w-2xl mx-auto pb-10"
    >
      {/* Hero image */}
      <div className="relative h-72 sm:h-96 w-full">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className={`object-cover ${!product.available ? "grayscale" : ""}`}
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Back button */}
        <motion.button
          onClick={() => router.back()}
          whileTap={{ scale: 0.92 }}
          className="absolute top-4 left-4 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-neutral-900 text-sm font-semibold px-3.5 py-2 rounded-full shadow-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver
        </motion.button>

        {/* Badges */}
        <div className="absolute bottom-4 left-4 flex gap-2">
          {product.isBestseller && <Badge variant="bestseller">🔥 Más vendido</Badge>}
          {product.isNew && <Badge variant="new">✨ Nuevo</Badge>}
          {!product.available && <Badge variant="unavailable">No disponible</Badge>}
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-t-3xl -mt-6 relative z-10 px-5 pt-6 pb-4">
        {/* Category breadcrumb */}
        {category && (
          <div className="flex items-center gap-1 text-xs text-neutral-400 mb-2">
            <span>{category.emoji}</span>
            <span>{category.name}</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-neutral-600 font-medium">{product.name}</span>
          </div>
        )}

        <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">
          {product.name}
        </h1>

        {/* Price */}
        <div className="mt-2 mb-4">
          <span className={`text-3xl font-extrabold tracking-tight ${product.available ? "text-brand-500" : "text-neutral-400"}`}>
            {formatPrice(product.price)}
          </span>
        </div>

        {/* Description */}
        <p className="text-neutral-600 leading-relaxed text-sm mb-5">
          {product.description}
        </p>

        {/* Ingredients */}
        {product.ingredients.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-neutral-900 mb-2">Ingredientes</h2>
            <div className="flex flex-wrap gap-2">
              {product.ingredients.map((ing) => (
                <span
                  key={ing}
                  className="bg-neutral-100 text-neutral-600 text-xs px-3 py-1 rounded-full font-medium"
                >
                  {ing}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Options */}
        {product.options && product.options.length > 0 && (
          <div className="space-y-5">
            {product.options.map((opt) => (
              <div key={opt.id}>
                <h2 className="text-sm font-semibold text-neutral-900 mb-3 flex items-center gap-2">
                  {opt.label}
                  {opt.required && (
                    <span className="text-xs bg-brand-100 text-brand-600 px-2 py-0.5 rounded-full">
                      Requerido
                    </span>
                  )}
                </h2>
                <div className="space-y-2">
                  {opt.choices.map((choice) => {
                    const isSelected = selectedOptions[opt.id] === choice;
                    return (
                      <motion.button
                        key={choice}
                        onClick={() =>
                          setSelectedOptions((prev) => ({ ...prev, [opt.id]: choice }))
                        }
                        whileTap={{ scale: 0.98 }}
                        className={`w-full flex items-center gap-3 p-3.5 rounded-xl border-2 text-left transition-all duration-150 ${
                          isSelected
                            ? "border-brand-500 bg-brand-50"
                            : "border-neutral-100 bg-white hover:border-neutral-200"
                        }`}
                      >
                        <span
                          className={`h-5 w-5 rounded-full border-2 flex-shrink-0 transition-all ${
                            isSelected
                              ? "border-brand-500 bg-brand-500"
                              : "border-neutral-300"
                          }`}
                        >
                          {isSelected && (
                            <span className="flex h-full w-full items-center justify-center">
                              <span className="h-2 w-2 rounded-full bg-white" />
                            </span>
                          )}
                        </span>
                        <span className={`text-sm font-medium ${isSelected ? "text-brand-700" : "text-neutral-700"}`}>
                          {choice}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
