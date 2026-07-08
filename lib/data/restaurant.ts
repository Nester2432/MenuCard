import { RestaurantInfo } from "@/lib/types";

export const restaurant: RestaurantInfo = {
  name: "La Trattoria",
  tagline: "Cocina italiana con alma porteña",
  description:
    "Desde 1998 llevamos la auténtica cocina italiana a tu mesa. Pastas artesanales, carnes seleccionadas y los mejores vinos en un ambiente cálido y familiar.",
  logo: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=200&q=80",
  coverImage:
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=90",
  address: "Av. Corrientes 1234, CABA, Argentina",
  phone: "+54 11 4567-8900",
  email: "info@latrattoria.com.ar",
  hours: {
    weekdays: "Lun – Vie: 12:00 – 15:30 | 20:00 – 00:00",
    weekends: "Sáb – Dom: 12:00 – 16:00 | 19:30 – 01:00",
  },
  social: {
    instagram: "https://instagram.com/latrattoria",
    facebook: "https://facebook.com/latrattoria",
    whatsapp: "https://wa.me/5491145678900",
  },
  settings: {
    showUnavailableProducts: true,
    currency: "ARS",
    currencySymbol: "$",
    primaryColor: "#ff6b35",
  },
};
