"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Product } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  showUnavailable: boolean;
}

export default function ProductCard({ product, showUnavailable }: ProductCardProps) {
  if (!product.available && !showUnavailable) return null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.25 }}
      className="group"
    >
      <Link href={`/product/${product.id}`} className="block">
        <div className="bg-white rounded-2xl shadow-card overflow-hidden hover:shadow-card-hover transition-shadow duration-300">
          {/* Image */}
          <div className="relative h-44 w-full overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
                !product.available ? "grayscale opacity-60" : ""
              }`}
              sizes="(max-width: 640px) 50vw, 33vw"
            />
            {/* Badges top-left */}
            <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
              {product.isBestseller && (
                <Badge variant="bestseller">🔥 Más vendido</Badge>
              )}
              {product.isNew && <Badge variant="new">✨ Nuevo</Badge>}
            </div>
            {/* Unavailable overlay */}
            {!product.available && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <Badge variant="unavailable" className="text-xs font-semibold px-3 py-1">
                  No disponible
                </Badge>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-3.5">
            <h3 className="font-semibold text-neutral-900 text-sm leading-tight line-clamp-1">
              {product.name}
            </h3>
            <p className="text-neutral-500 text-xs mt-1 line-clamp-2 leading-relaxed">
              {product.description}
            </p>
            <div className="mt-3 flex items-center justify-between">
              <span className={`font-bold text-base ${product.available ? "text-neutral-900" : "text-neutral-400"}`}>
                {formatPrice(product.price)}
              </span>
              <span className="text-xs text-brand-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Ver →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
