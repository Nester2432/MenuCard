"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Instagram, Facebook, MessageCircle } from "lucide-react";
import { RestaurantInfo } from "@/lib/types";

interface HeroSectionProps {
  restaurant: RestaurantInfo;
}

export default function HeroSection({ restaurant }: HeroSectionProps) {
  return (
    <div className="relative">
      {/* Cover image */}
      <div className="relative h-64 sm:h-80 w-full overflow-hidden">
        <Image
          src={restaurant.coverImage}
          alt={`${restaurant.name} portada`}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/60" />
      </div>

      {/* Restaurant info card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative -mt-16 mx-4 bg-white rounded-3xl shadow-elevated p-5 z-10"
      >
        {/* Logo + name */}
        <div className="flex items-center gap-4 mb-4">
          <div className="relative h-16 w-16 rounded-2xl overflow-hidden border-2 border-white shadow-card flex-shrink-0">
            <Image
              src={restaurant.logo}
              alt={`${restaurant.name} logo`}
              fill
              className="object-cover"
              sizes="64px"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold text-neutral-900 leading-tight">
              {restaurant.name}
            </h1>
            <p className="text-sm text-brand-500 font-medium mt-0.5">
              {restaurant.tagline}
            </p>
          </div>
        </div>

        <p className="text-sm text-neutral-600 leading-relaxed mb-4">
          {restaurant.description}
        </p>

        {/* Info rows */}
        <div className="space-y-2.5">
          <InfoRow icon={<Clock className="h-4 w-4 text-brand-500" />}>
            <div>
              <p className="text-xs text-neutral-500">{restaurant.hours.weekdays}</p>
              <p className="text-xs text-neutral-500">{restaurant.hours.weekends}</p>
            </div>
          </InfoRow>
          <InfoRow icon={<MapPin className="h-4 w-4 text-brand-500" />}>
            <span className="text-xs text-neutral-600">{restaurant.address}</span>
          </InfoRow>
          <InfoRow icon={<Phone className="h-4 w-4 text-brand-500" />}>
            <a
              href={`tel:${restaurant.phone}`}
              className="text-xs text-neutral-600 hover:text-brand-500 transition-colors"
            >
              {restaurant.phone}
            </a>
          </InfoRow>
        </div>

        {/* Social links */}
        <div className="flex gap-3 mt-4 pt-4 border-t border-neutral-100">
          {restaurant.social.whatsapp && (
            <SocialLink
              href={restaurant.social.whatsapp}
              icon={<MessageCircle className="h-4 w-4" />}
              label="WhatsApp"
              color="bg-green-500"
            />
          )}
          {restaurant.social.instagram && (
            <SocialLink
              href={restaurant.social.instagram}
              icon={<Instagram className="h-4 w-4" />}
              label="Instagram"
              color="bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400"
            />
          )}
          {restaurant.social.facebook && (
            <SocialLink
              href={restaurant.social.facebook}
              icon={<Facebook className="h-4 w-4" />}
              label="Facebook"
              color="bg-blue-600"
            />
          )}
        </div>
      </motion.div>
    </div>
  );
}

function InfoRow({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="flex-shrink-0 mt-0.5">{icon}</span>
      {children}
    </div>
  );
}

function SocialLink({
  href, icon, label, color,
}: {
  href: string; icon: React.ReactNode; label: string; color: string;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className={`flex items-center gap-1.5 text-white text-xs font-medium px-3 py-1.5 rounded-xl ${color}`}
    >
      {icon}
      {label}
    </motion.a>
  );
}
