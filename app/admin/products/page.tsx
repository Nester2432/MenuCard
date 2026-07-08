"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, X, Check, Search, Star, Sparkles } from "lucide-react";
import { useMenu } from "@/lib/store/MenuContext";
import { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import ImageUploader from "@/components/admin/ImageUploader";
import { formatPrice, generateId } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

const emptyForm = (): Omit<Product, "id" | "createdAt"> => ({
  name: "", description: "", ingredients: [], price: 0,
  categoryId: "", image: "", available: true,
  isBestseller: false, isNew: false, options: [], order: 0,
});

export default function ProductsPage() {
  const { state, dispatch } = useMenu();
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm());
  const [ingredientsInput, setIngredientsInput] = useState("");

  const filtered = useMemo(() => {
    return state.products.filter((p) => {
      const q = search.toLowerCase();
      const matchSearch = !q || p.name.toLowerCase().includes(q);
      const matchCat = !filterCat || p.categoryId === filterCat;
      return matchSearch && matchCat;
    });
  }, [state.products, search, filterCat]);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm());
    setIngredientsInput("");
    setIsFormOpen(true);
  };

  const openEdit = (p: Product) => {
    setEditing(p);
    setForm({ name: p.name, description: p.description, ingredients: p.ingredients, price: p.price, categoryId: p.categoryId, image: p.image, available: p.available, isBestseller: !!p.isBestseller, isNew: !!p.isNew, options: p.options || [], order: p.order });
    setIngredientsInput(p.ingredients.join(", "));
    setIsFormOpen(true);
  };

  const handleSave = () => {
    if (!form.name.trim() || !form.categoryId) {
      toast({ title: "Completá nombre y categoría", variant: "destructive" }); return;
    }
    const ingredients = ingredientsInput.split(",").map((s) => s.trim()).filter(Boolean);
    const payload = { ...form, ingredients };
    if (editing) {
      dispatch({ type: "UPDATE_PRODUCT", payload: { ...editing, ...payload } });
      toast({ title: "Producto actualizado" });
    } else {
      dispatch({ type: "ADD_PRODUCT", payload: { ...payload, id: `p-${generateId()}`, createdAt: new Date().toISOString() } });
      toast({ title: "Producto creado" });
    }
    setIsFormOpen(false);
  };

  const handleDelete = (id: string) => {
    dispatch({ type: "DELETE_PRODUCT", payload: id });
    setDeleteId(null);
    toast({ title: "Producto eliminado", variant: "destructive" });
  };

  const getCatName = (id: string) => state.categories.find((c) => c.id === id)?.name ?? "";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Productos</h1>
          <p className="text-neutral-500 text-sm mt-0.5">{state.products.length} platos en la carta</p>
        </div>
        <Button onClick={openCreate} className="gap-2"><Plus className="h-4 w-4" /> Nuevo plato</Button>
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar..." className="pl-9 h-10" />
        </div>
        <select
          value={filterCat}
          onChange={(e) => setFilterCat(e.target.value)}
          className="h-10 px-3 rounded-xl border border-neutral-200 text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
        >
          <option value="">Todas</option>
          {state.categories.map((c) => <option key={c.id} value={c.id}>{c.emoji} {c.name}</option>)}
        </select>
      </div>

      {/* Product list */}
      <div className="bg-white rounded-2xl shadow-card overflow-hidden">
        <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-0 text-xs font-semibold text-neutral-400 uppercase tracking-wide px-5 py-3 border-b border-neutral-100">
          <span className="w-10" />
          <span>Nombre</span>
          <span className="w-20 text-right">Precio</span>
          <span className="w-16 text-center">Estado</span>
          <span className="w-16 text-right">Acciones</span>
        </div>
        {filtered.length === 0 ? (
          <div className="py-12 text-center text-neutral-400 text-sm">No hay productos</div>
        ) : (
          filtered.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.03 }}
              className={`grid grid-cols-[auto_1fr_auto_auto_auto] items-center gap-0 px-5 py-3.5 ${i < filtered.length - 1 ? "border-b border-neutral-50" : ""}`}
            >
              {/* Image */}
              <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 mr-3">
                {p.image ? (
                  <Image src={p.image} alt={p.name} fill className="object-cover" sizes="40px" unoptimized={p.image.startsWith("data:")} />
                ) : (
                  <div className="w-full h-full bg-neutral-100 flex items-center justify-center text-neutral-300 text-xl">🍽️</div>
                )}
              </div>
              {/* Name & cat */}
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="text-sm font-semibold text-neutral-900 truncate">{p.name}</p>
                  {p.isBestseller && <Star className="h-3 w-3 text-brand-500 fill-brand-500 flex-shrink-0" />}
                  {p.isNew && <Sparkles className="h-3 w-3 text-blue-500 flex-shrink-0" />}
                </div>
                <p className="text-xs text-neutral-400">{getCatName(p.categoryId)}</p>
              </div>
              {/* Price */}
              <span className="text-sm font-bold text-neutral-900 w-20 text-right">{formatPrice(p.price)}</span>
              {/* Toggle */}
              <div className="w-16 flex justify-center">
                <Switch
                  checked={p.available}
                  onCheckedChange={() => dispatch({ type: "TOGGLE_AVAILABILITY", payload: p.id })}
                />
              </div>
              {/* Actions */}
              <div className="flex gap-1 justify-end w-16">
                <button onClick={() => openEdit(p)} className="p-1.5 rounded-lg text-neutral-400 hover:text-brand-500 hover:bg-brand-50 transition-colors">
                  <Pencil className="h-3.5 w-3.5" />
                </button>
                <button onClick={() => setDeleteId(p.id)} className="p-1.5 rounded-lg text-neutral-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Slide-in form */}
      <AnimatePresence>
        {isFormOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsFormOpen(false)} className="fixed inset-0 bg-black/40 z-40" />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-elevated flex flex-col"
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-100">
                <h2 className="font-bold text-neutral-900">{editing ? "Editar plato" : "Nuevo plato"}</h2>
                <button onClick={() => setIsFormOpen(false)} className="p-2 rounded-xl text-neutral-400 hover:bg-neutral-100"><X className="h-5 w-5" /></button>
              </div>
              <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-500 uppercase">Imagen</label>
                  <ImageUploader value={form.image} onChange={(url) => setForm((f) => ({ ...f, image: url }))} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-500 uppercase">Nombre *</label>
                  <Input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="Nombre del plato" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-500 uppercase">Descripción</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                    rows={3}
                    placeholder="Descripción del plato..."
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-500 uppercase">Ingredientes (separados por coma)</label>
                  <Input value={ingredientsInput} onChange={(e) => setIngredientsInput(e.target.value)} placeholder="Tomate, albahaca, mozzarella..." />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-neutral-500 uppercase">Precio (ARS) *</label>
                    <Input type="number" value={form.price || ""} onChange={(e) => setForm((f) => ({ ...f, price: Number(e.target.value) }))} placeholder="0" min={0} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-neutral-500 uppercase">Categoría *</label>
                    <select
                      value={form.categoryId}
                      onChange={(e) => setForm((f) => ({ ...f, categoryId: e.target.value }))}
                      className="w-full h-11 px-3 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                    >
                      <option value="">Seleccionar...</option>
                      {state.categories.map((c) => <option key={c.id} value={c.id}>{c.emoji} {c.name}</option>)}
                    </select>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  {[
                    { key: "available", label: "Disponible" },
                    { key: "isBestseller", label: "🔥 Más vendido" },
                    { key: "isNew", label: "✨ Nuevo" },
                  ].map(({ key, label }) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-sm font-medium text-neutral-700">{label}</span>
                      <Switch
                        checked={!!form[key as keyof typeof form]}
                        onCheckedChange={(v) => setForm((f) => ({ ...f, [key]: v }))}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="px-6 py-5 border-t border-neutral-100">
                <Button onClick={handleSave} className="w-full gap-2"><Check className="h-4 w-4" />{editing ? "Guardar cambios" : "Crear plato"}</Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Delete confirm */}
      <AnimatePresence>
        {deleteId && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="bg-white rounded-2xl p-6 max-w-xs w-full shadow-elevated text-center">
              <div className="text-4xl mb-3">🗑️</div>
              <h3 className="font-bold text-neutral-900 mb-1">¿Eliminar plato?</h3>
              <p className="text-sm text-neutral-500 mb-5">Esta acción no se puede deshacer.</p>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setDeleteId(null)} className="flex-1">Cancelar</Button>
                <Button variant="destructive" onClick={() => handleDelete(deleteId)} className="flex-1">Eliminar</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
