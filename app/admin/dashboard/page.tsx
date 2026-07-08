"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useMenu } from "@/lib/store/MenuContext";
import { UtensilsCrossed, Tag, CheckCircle2, XCircle, TrendingUp, ArrowRight } from "lucide-react";
import { formatPrice } from "@/lib/utils";

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08 } }),
};

export default function DashboardPage() {
  const { state } = useMenu();
  const { products, categories } = state;

  const available = products.filter((p) => p.available).length;
  const unavailable = products.filter((p) => !p.available).length;
  const bestsellers = products.filter((p) => p.isBestseller);
  const recentProducts = [...products].reverse().slice(0, 5);

  const stats = [
    { label: "Total de platos", value: products.length, icon: UtensilsCrossed, color: "bg-blue-50 text-blue-600" },
    { label: "Disponibles", value: available, icon: CheckCircle2, color: "bg-green-50 text-green-600" },
    { label: "No disponibles", value: unavailable, icon: XCircle, color: "bg-red-50 text-red-500" },
    { label: "Categorías", value: categories.filter((c) => c.active).length, icon: Tag, color: "bg-brand-50 text-brand-500" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Dashboard</h1>
        <p className="text-neutral-500 text-sm mt-1">Resumen de tu carta digital</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-2xl p-5 shadow-card"
          >
            <div className={`inline-flex p-2.5 rounded-xl mb-3 ${stat.color}`}>
              <stat.icon className="h-5 w-5" />
            </div>
            <p className="text-2xl font-bold text-neutral-900">{stat.value}</p>
            <p className="text-xs text-neutral-500 mt-0.5">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-sm font-semibold text-neutral-500 uppercase tracking-wide mb-3">Acceso rápido</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { href: "/admin/products", label: "Gestionar productos", desc: "Crear, editar y eliminar platos" },
            { href: "/admin/pricing", label: "Actualizar precios", desc: "Edición rápida de precios" },
            { href: "/admin/categories", label: "Gestionar categorías", desc: "Organizar la carta" },
          ].map((action) => (
            <Link key={action.href} href={action.href}>
              <motion.div
                whileHover={{ y: -2 }}
                className="bg-white rounded-2xl p-4 shadow-card hover:shadow-card-hover transition-shadow cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-neutral-900 text-sm">{action.label}</p>
                    <p className="text-xs text-neutral-400 mt-0.5">{action.desc}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-neutral-300 group-hover:text-brand-500 transition-colors" />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

      {/* Bestsellers */}
      {bestsellers.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="h-4 w-4 text-brand-500" />
            <h2 className="text-sm font-semibold text-neutral-900">Más vendidos</h2>
          </div>
          <div className="bg-white rounded-2xl shadow-card overflow-hidden">
            {bestsellers.slice(0, 5).map((p, i) => (
              <div
                key={p.id}
                className={`flex items-center justify-between px-5 py-3.5 ${i < bestsellers.length - 1 ? "border-b border-neutral-50" : ""}`}
              >
                <div>
                  <p className="text-sm font-medium text-neutral-900">{p.name}</p>
                  <p className="text-xs text-neutral-400">
                    {state.categories.find((c) => c.id === p.categoryId)?.name}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-neutral-900">{formatPrice(p.price)}</p>
                  <span className={`text-xs font-medium ${p.available ? "text-green-500" : "text-red-400"}`}>
                    {p.available ? "Disponible" : "No disponible"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent */}
      <div>
        <h2 className="text-sm font-semibold text-neutral-500 uppercase tracking-wide mb-3">Últimos productos</h2>
        <div className="bg-white rounded-2xl shadow-card overflow-hidden">
          {recentProducts.map((p, i) => (
            <div
              key={p.id}
              className={`flex items-center justify-between px-5 py-3.5 ${i < recentProducts.length - 1 ? "border-b border-neutral-50" : ""}`}
            >
              <p className="text-sm font-medium text-neutral-800">{p.name}</p>
              <span className={`text-xs font-semibold ${p.available ? "text-green-500" : "text-red-400"}`}>
                {p.available ? "✓ Activo" : "✗ Inactivo"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
