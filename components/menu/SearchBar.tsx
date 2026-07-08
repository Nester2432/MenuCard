"use client";

import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
      <input
        type="search"
        placeholder="Buscar platos..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-12 pl-11 pr-10 rounded-2xl border border-neutral-200 bg-white text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all shadow-card"
      />
      <AnimatePresence>
        {value && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => onChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors"
          >
            <X className="h-3.5 w-3.5 text-neutral-500" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
