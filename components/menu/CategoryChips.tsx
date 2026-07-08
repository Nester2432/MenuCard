"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Category } from "@/lib/types";

interface CategoryChipsProps {
  categories: Category[];
  activeId: string | null;
  onSelect: (id: string | null) => void;
}

export default function CategoryChips({ categories, activeId, onSelect }: CategoryChipsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const active = categories.filter((c) => c.active);

  return (
    <div
      ref={scrollRef}
      className="flex gap-2.5 overflow-x-auto no-scrollbar px-4 py-1"
    >
      {/* "Todos" chip */}
      <Chip
        label="Todo"
        emoji="✨"
        isActive={activeId === null}
        onClick={() => onSelect(null)}
      />
      {active
        .sort((a, b) => a.order - b.order)
        .map((cat) => (
          <Chip
            key={cat.id}
            label={cat.name}
            emoji={cat.emoji}
            isActive={activeId === cat.id}
            onClick={() => onSelect(cat.id)}
          />
        ))}
    </div>
  );
}

function Chip({
  label,
  emoji,
  isActive,
  onClick,
}: {
  label: string;
  emoji: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      className={`
        flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium
        transition-all duration-200 whitespace-nowrap border
        ${
          isActive
            ? "bg-neutral-900 text-white border-neutral-900 shadow-sm"
            : "bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400 hover:text-neutral-900"
        }
      `}
    >
      <span>{emoji}</span>
      <span>{label}</span>
    </motion.button>
  );
}
