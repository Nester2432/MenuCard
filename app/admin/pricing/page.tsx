"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Check, Search } from "lucide-react";
import { useMenu } from "@/lib/store/MenuContext";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

export default function PricingPage() {
  const { state, dispatch } = useMenu();
  const [search, setSearch] = useState("");
  const [localPrices, setLocalPrices] = useState<Record<string, string>>({});

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return state.products.filter((p) => !q || p.name.toLowerCase().includes(q));
  }, [state.products, search]);

  const handlePriceChange = (id: string, raw: string) => {
    setLocalPrices((prev) => ({ ...prev, [id]: raw }));
  };

  const handleSavePrice = (id: string) => {
    const raw = localPrices[id];
    if (!raw) return;
    const num = parseInt(raw.replace(/\D/g, ""), 10);
    if (!isNaN(num) && num > 0) {
      dispatch({ type: "UPDATE_PRICE", payload: { id, price: num } });
      setLocalPrices((prev) => { const n = { ...prev }; delete n[id]; return n; });
      toast({ title: "Precio actualizado" });
    }
  };

  const handleSaveAll = () => {
    let count = 0;
    Object.entries(localPrices).forEach(([id, raw]) => {
      const num = parseInt(raw.replace(/\D/g, ""), 10);
      if (!isNaN(num) && num > 0) {
        dispatch({ type: "UPDATE_PRICE", payload: { id, price: num } });
        count++;
      }
    });
    setLocalPrices({});
    if (count > 0) toast({ title: `${count} precio${count > 1 ? "s" : ""} actualizado${count > 1 ? "s" : ""}` });
  };

  const pendingCount = Object.keys(localPrices).length;

  const getCatName = (id: string) => {
    const cat = state.categories.find((c) => c.id === id);
    return cat ? `${cat.emoji} ${cat.name}` : "";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Precios</h1>
          <p className="text-neutral-500 text-sm mt-0.5">Edición rápida de precios y disponibilidad</p>
        </div>
        {pendingCount > 0 && (
          <Button onClick={handleSaveAll} className="gap-2">
            <Check className="h-4 w-4" />
            Guardar todo ({pendingCount})
          </Button>
        )}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar plato..." className="pl-9" />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-card overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 px-5 py-3 border-b border-neutral-100 text-xs font-semibold text-neutral-400 uppercase tracking-wide">
          <span>Producto</span>
          <span className="w-36">Precio (ARS)</span>
          <span className="w-24 text-center">Disponible</span>
          <span className="w-16" />
        </div>

        {filtered.length === 0 ? (
          <div className="py-12 text-center text-neutral-400 text-sm">Sin resultados</div>
        ) : (
          filtered.map((p, i) => {
            const isDirty = localPrices[p.id] !== undefined;
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.02 }}
                className={`grid grid-cols-[1fr_auto_auto_auto] items-center gap-4 px-5 py-3.5 ${i < filtered.length - 1 ? "border-b border-neutral-50" : ""} ${isDirty ? "bg-brand-50/40" : ""}`}
              >
                {/* Name */}
                <div>
                  <p className="text-sm font-semibold text-neutral-900 leading-tight">{p.name}</p>
                  <p className="text-xs text-neutral-400">{getCatName(p.categoryId)}</p>
                </div>

                {/* Price input */}
                <div className="w-36">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-neutral-400 font-medium">$</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={isDirty ? localPrices[p.id] : p.price.toLocaleString("es-AR")}
                      onChange={(e) => handlePriceChange(p.id, e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter") handleSavePrice(p.id); }}
                      className={`w-full h-9 pl-7 pr-2 rounded-xl border text-sm font-semibold text-neutral-900 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-colors ${isDirty ? "border-brand-400 bg-white" : "border-neutral-200 bg-neutral-50"}`}
                    />
                  </div>
                </div>

                {/* Toggle */}
                <div className="w-24 flex justify-center">
                  <Switch
                    checked={p.available}
                    onCheckedChange={() => dispatch({ type: "TOGGLE_AVAILABILITY", payload: p.id })}
                  />
                </div>

                {/* Save row button */}
                <div className="w-16 flex justify-end">
                  {isDirty && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      onClick={() => handleSavePrice(p.id)}
                      className="p-2 rounded-xl bg-brand-500 text-white hover:bg-brand-600 transition-colors"
                    >
                      <Check className="h-3.5 w-3.5" />
                    </motion.button>
                  )}
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      {/* Summary */}
      <div className="text-xs text-neutral-400 text-center">
        Tip: presioná <kbd className="px-1.5 py-0.5 bg-neutral-100 rounded font-mono">Enter</kbd> para guardar un precio o usá "Guardar todo"
      </div>
    </div>
  );
}
