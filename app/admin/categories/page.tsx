"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, GripVertical, X, Check } from "lucide-react";
import { useMenu } from "@/lib/store/MenuContext";
import { Category } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { generateId } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

const EMOJIS = ["🍝","🥩","🐟","🍕","🥗","🍷","🍰","🥙","🍔","🌮","🥘","🫕","🍜","🍣","🍱","🥞","🧆","🥐"];

export default function CategoriesPage() {
  const { state, dispatch } = useMenu();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", emoji: "🍽️", description: "" });

  const openCreate = () => {
    setEditing(null);
    setForm({ name: "", emoji: "🍽️", description: "" });
    setIsFormOpen(true);
  };

  const openEdit = (cat: Category) => {
    setEditing(cat);
    setForm({ name: cat.name, emoji: cat.emoji, description: cat.description || "" });
    setIsFormOpen(true);
  };

  const handleSave = () => {
    if (!form.name.trim()) return;
    if (editing) {
      dispatch({ type: "UPDATE_CATEGORY", payload: { ...editing, ...form } });
      toast({ title: "Categoría actualizada" });
    } else {
      dispatch({
        type: "ADD_CATEGORY",
        payload: {
          id: `cat-${generateId()}`,
          name: form.name,
          emoji: form.emoji,
          slug: form.name.toLowerCase().replace(/\s+/g, "-"),
          description: form.description,
          order: state.categories.length + 1,
          active: true,
        },
      });
      toast({ title: "Categoría creada" });
    }
    setIsFormOpen(false);
  };

  const handleDelete = (id: string) => {
    dispatch({ type: "DELETE_CATEGORY", payload: id });
    setDeleteId(null);
    toast({ title: "Categoría eliminada", variant: "destructive" });
  };

  const toggleActive = (cat: Category) => {
    dispatch({ type: "UPDATE_CATEGORY", payload: { ...cat, active: !cat.active } });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Categorías</h1>
          <p className="text-neutral-500 text-sm mt-0.5">{state.categories.length} categorías</p>
        </div>
        <Button onClick={openCreate} className="gap-2">
          <Plus className="h-4 w-4" /> Nueva
        </Button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-card overflow-hidden">
        {state.categories.sort((a,b) => a.order - b.order).map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.04 }}
            className={`flex items-center gap-4 px-5 py-4 ${i < state.categories.length - 1 ? "border-b border-neutral-50" : ""}`}
          >
            <GripVertical className="h-4 w-4 text-neutral-300 flex-shrink-0" />
            <span className="text-2xl">{cat.emoji}</span>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-neutral-900 text-sm">{cat.name}</p>
              {cat.description && <p className="text-xs text-neutral-400 truncate">{cat.description}</p>}
            </div>
            <div className="flex items-center gap-1.5 ml-auto flex-shrink-0">
              <button
                onClick={() => toggleActive(cat)}
                className={`text-xs font-semibold px-2.5 py-1 rounded-full transition-colors ${
                  cat.active ? "bg-green-50 text-green-600 hover:bg-green-100" : "bg-neutral-100 text-neutral-400 hover:bg-neutral-200"
                }`}
              >
                {cat.active ? "Activa" : "Inactiva"}
              </button>
              <button onClick={() => openEdit(cat)} className="p-2 rounded-xl text-neutral-400 hover:text-brand-500 hover:bg-brand-50 transition-colors">
                <Pencil className="h-4 w-4" />
              </button>
              <button onClick={() => setDeleteId(cat.id)} className="p-2 rounded-xl text-neutral-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Slide-in form */}
      <AnimatePresence>
        {isFormOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsFormOpen(false)}
              className="fixed inset-0 bg-black/40 z-40"
            />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-full max-w-sm bg-white z-50 shadow-elevated flex flex-col"
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-100">
                <h2 className="font-bold text-neutral-900">{editing ? "Editar categoría" : "Nueva categoría"}</h2>
                <button onClick={() => setIsFormOpen(false)} className="p-2 rounded-xl text-neutral-400 hover:bg-neutral-100">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-500 uppercase">Nombre</label>
                  <Input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="Ej: Pastas" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-500 uppercase">Descripción</label>
                  <Input value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} placeholder="Descripción breve (opcional)" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-neutral-500 uppercase">Emoji</label>
                  <div className="grid grid-cols-6 gap-2">
                    {EMOJIS.map((em) => (
                      <button
                        key={em}
                        onClick={() => setForm((f) => ({ ...f, emoji: em }))}
                        className={`h-10 w-10 text-xl rounded-xl flex items-center justify-center transition-all ${form.emoji === em ? "bg-brand-100 ring-2 ring-brand-500" : "bg-neutral-50 hover:bg-neutral-100"}`}
                      >
                        {em}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="px-6 py-5 border-t border-neutral-100">
                <Button onClick={handleSave} className="w-full gap-2">
                  <Check className="h-4 w-4" /> {editing ? "Guardar cambios" : "Crear categoría"}
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Delete confirm */}
      <AnimatePresence>
        {deleteId && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
            >
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl p-6 max-w-xs w-full shadow-elevated text-center"
              >
                <div className="text-4xl mb-3">⚠️</div>
                <h3 className="font-bold text-neutral-900 mb-1">¿Eliminar categoría?</h3>
                <p className="text-sm text-neutral-500 mb-5">Esta acción no se puede deshacer.</p>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setDeleteId(null)} className="flex-1">Cancelar</Button>
                  <Button variant="destructive" onClick={() => handleDelete(deleteId)} className="flex-1">Eliminar</Button>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
