"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Store, Clock, MapPin, Phone, Mail, Instagram, Facebook, MessageCircle } from "lucide-react";
import { useMenu } from "@/lib/store/MenuContext";
import { RestaurantInfo } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import ImageUploader from "@/components/admin/ImageUploader";
import { toast } from "@/hooks/use-toast";

export default function SettingsPage() {
  const { state, dispatch } = useMenu();
  const [form, setForm] = useState<RestaurantInfo>(state.restaurant);

  const set = <K extends keyof RestaurantInfo>(key: K, value: RestaurantInfo[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSave = () => {
    dispatch({ type: "UPDATE_RESTAURANT", payload: form });
    toast({ title: "Configuración guardada" });
  };

  return (
    <div className="space-y-8 max-w-2xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Restaurante</h1>
          <p className="text-neutral-500 text-sm mt-0.5">Información pública del restaurante</p>
        </div>
        <Button onClick={handleSave} className="gap-2"><Check className="h-4 w-4" />Guardar</Button>
      </div>

      {/* Identity */}
      <Section icon={<Store className="h-4 w-4" />} title="Identidad">
        <div className="space-y-4">
          <Field label="Nombre del restaurante">
            <Input value={form.name} onChange={(e) => set("name", e.target.value)} />
          </Field>
          <Field label="Eslogan">
            <Input value={form.tagline} onChange={(e) => set("tagline", e.target.value)} />
          </Field>
          <Field label="Descripción">
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </Field>
          <Field label="Logo">
            <ImageUploader value={form.logo} onChange={(url) => set("logo", url)} />
          </Field>
          <Field label="Imagen de portada">
            <ImageUploader value={form.coverImage} onChange={(url) => set("coverImage", url)} />
          </Field>
        </div>
      </Section>

      {/* Contact */}
      <Section icon={<Phone className="h-4 w-4" />} title="Contacto">
        <div className="space-y-4">
          <Field label="Dirección"><Input value={form.address} onChange={(e) => set("address", e.target.value)} /></Field>
          <Field label="Teléfono"><Input value={form.phone} onChange={(e) => set("phone", e.target.value)} /></Field>
          <Field label="Email"><Input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} /></Field>
        </div>
      </Section>

      {/* Hours */}
      <Section icon={<Clock className="h-4 w-4" />} title="Horarios">
        <div className="space-y-4">
          <Field label="Lunes a Viernes">
            <Input value={form.hours.weekdays} onChange={(e) => set("hours", { ...form.hours, weekdays: e.target.value })} placeholder="Lun – Vie: 12:00 – 23:00" />
          </Field>
          <Field label="Sábado y Domingo">
            <Input value={form.hours.weekends} onChange={(e) => set("hours", { ...form.hours, weekends: e.target.value })} placeholder="Sáb – Dom: 12:00 – 01:00" />
          </Field>
        </div>
      </Section>

      {/* Social */}
      <Section icon={<Instagram className="h-4 w-4" />} title="Redes sociales">
        <div className="space-y-4">
          <Field label="Instagram URL">
            <Input value={form.social.instagram || ""} onChange={(e) => set("social", { ...form.social, instagram: e.target.value })} placeholder="https://instagram.com/..." />
          </Field>
          <Field label="Facebook URL">
            <Input value={form.social.facebook || ""} onChange={(e) => set("social", { ...form.social, facebook: e.target.value })} placeholder="https://facebook.com/..." />
          </Field>
          <Field label="WhatsApp URL">
            <Input value={form.social.whatsapp || ""} onChange={(e) => set("social", { ...form.social, whatsapp: e.target.value })} placeholder="https://wa.me/549..." />
          </Field>
        </div>
      </Section>

      {/* Settings */}
      <Section icon={<Store className="h-4 w-4" />} title="Configuración de carta">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-900">Mostrar productos no disponibles</p>
              <p className="text-xs text-neutral-400 mt-0.5">Si está desactivado, los platos sin stock se ocultarán de la carta</p>
            </div>
            <Switch
              checked={form.settings.showUnavailableProducts}
              onCheckedChange={(v) => set("settings", { ...form.settings, showUnavailableProducts: v })}
            />
          </div>
        </div>
      </Section>

      <Button onClick={handleSave} className="w-full gap-2"><Check className="h-4 w-4" />Guardar configuración</Button>
    </div>
  );
}

function Section({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-card p-6">
      <div className="flex items-center gap-2 mb-5 pb-4 border-b border-neutral-100">
        <span className="text-brand-500">{icon}</span>
        <h2 className="font-bold text-neutral-900 text-sm">{title}</h2>
      </div>
      {children}
    </motion.div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">{label}</label>
      {children}
    </div>
  );
}
