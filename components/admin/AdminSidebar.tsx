"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Tag,
  UtensilsCrossed,
  DollarSign,
  Settings,
  LogOut,
  ChefHat,
} from "lucide-react";
import { useMenu } from "@/lib/store/MenuContext";

const navItems = [
  { href: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/categories", icon: Tag, label: "Categorías" },
  { href: "/admin/products", icon: UtensilsCrossed, label: "Productos" },
  { href: "/admin/pricing", icon: DollarSign, label: "Precios" },
  { href: "/admin/settings", icon: Settings, label: "Restaurante" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { dispatch } = useMenu();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    router.push("/admin");
  };

  return (
    <aside className="w-56 bg-neutral-900 flex flex-col h-full flex-shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-6 border-b border-white/10">
        <div className="w-9 h-9 bg-brand-500 rounded-xl flex items-center justify-center">
          <ChefHat className="h-5 w-5 text-white" />
        </div>
        <div>
          <p className="text-white text-sm font-bold leading-tight">La Trattoria</p>
          <p className="text-neutral-400 text-xs">Panel admin</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.97 }}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-brand-500 text-white"
                    : "text-neutral-400 hover:text-white hover:bg-white/10"
                }`}
              >
                <item.icon className="h-4 w-4 flex-shrink-0" />
                {item.label}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-white/10 space-y-2">
        <Link href="/" target="_blank">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs text-neutral-500 hover:text-neutral-300 transition-colors">
            Ver carta pública →
          </div>
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-neutral-400 hover:text-red-400 hover:bg-red-400/10 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}
