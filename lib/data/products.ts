import { Product } from "@/lib/types";

export const products: Product[] = [
  // ── ENTRADAS ──────────────────────────────────────────
  {
    id: "p-1", name: "Bruschetta Clásica", description: "Pan tostado con tomate fresco, albahaca y aceite de oliva extra virgen.", ingredients: ["Pan ciabatta", "Tomate cherry", "Albahaca fresca", "Ajo", "AOVE"], price: 3200, categoryId: "cat-1", image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=600&q=80", available: true, isBestseller: true, order: 1, createdAt: "2024-01-01",
  },
  {
    id: "p-2", name: "Tabla de Fiambres", description: "Selección de embutidos importados con quesos artesanales y encurtidos.", ingredients: ["Prosciutto", "Salame", "Queso brie", "Queso azul", "Aceitunas", "Pepinillos"], price: 6800, categoryId: "cat-1", image: "https://images.unsplash.com/photo-1541614101331-1a5a3a194e92?w=600&q=80", available: true, order: 2, createdAt: "2024-01-01",
  },
  {
    id: "p-3", name: "Carpaccio de Res", description: "Finas láminas de lomo crudo con rúcula, parmesano y alcaparras.", ingredients: ["Lomo", "Rúcula", "Parmesano", "Alcaparras", "Limón", "AOVE"], price: 5400, categoryId: "cat-1", image: "https://images.unsplash.com/photo-1548943487-a2e4e43b4853?w=600&q=80", available: true, isNew: true, order: 3, createdAt: "2024-06-01",
  },
  {
    id: "p-4", name: "Croquetas de Ricota", description: "Croquetas cremosas de ricota y espinaca con salsa de tomate casera.", ingredients: ["Ricota", "Espinaca", "Huevo", "Pan rallado", "Salsa de tomate"], price: 3800, categoryId: "cat-1", image: "https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?w=600&q=80", available: false, order: 4, createdAt: "2024-01-01",
  },
  {
    id: "p-5", name: "Sopa de Cebolla Gratinada", description: "Caldo de res con cebolla caramelizada, cubierto con queso gruyere fundido.", ingredients: ["Cebolla", "Caldo de res", "Pan", "Queso gruyere", "Manteca"], price: 3500, categoryId: "cat-1", image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&q=80", available: true, order: 5, createdAt: "2024-01-01",
  },
  // ── PASTAS ────────────────────────────────────────────
  {
    id: "p-6", name: "Ravioles de Ricota", description: "Pasta rellena con ricota y espinaca, cocinada al momento.", ingredients: ["Harina", "Huevo", "Ricota", "Espinaca", "Nuez moscada"],
    options: [{ id: "opt-1", label: "Elegir salsa", required: true, choices: ["Tuco", "Crema", "Mixta", "Bolognesa", "Pesto"] }],
    price: 7990, categoryId: "cat-2", image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=600&q=80", available: true, isBestseller: true, order: 1, createdAt: "2024-01-01",
  },
  {
    id: "p-7", name: "Tallarines al Pesto", description: "Pasta fresca con pesto genovés de albahaca, piñones y parmesano.", ingredients: ["Tallarines frescos", "Albahaca", "Piñones", "Parmesano", "Ajo", "AOVE"],
    options: [{ id: "opt-2", label: "Punto de cocción", required: false, choices: ["Al dente", "Bien cocido"] }],
    price: 7370, categoryId: "cat-2", image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&q=80", available: true, order: 2, createdAt: "2024-01-01",
  },
  {
    id: "p-8", name: "Lasagna Bolognesa", description: "Capas de pasta fresca con ragú de carne, bechamel y parmesano gratinado.", ingredients: ["Pasta fresca", "Carne picada", "Tomate", "Bechamel", "Parmesano"], price: 8850, categoryId: "cat-2", image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=600&q=80", available: false, isBestseller: true, order: 3, createdAt: "2024-01-01",
  },
  {
    id: "p-9", name: "Ñoquis de Papa", description: "Ñoquis artesanales de papa con tu salsa favorita.", ingredients: ["Papa", "Harina", "Huevo", "Sal"],
    options: [{ id: "opt-3", label: "Elegir salsa", required: true, choices: ["Tuco", "Crema", "Bolognesa", "Cuatro quesos"] }],
    price: 6900, categoryId: "cat-2", image: "https://images.unsplash.com/photo-1551183053-bf91798d634c?w=600&q=80", available: true, order: 4, createdAt: "2024-01-01",
  },
  {
    id: "p-10", name: "Fettuccine al Funghi", description: "Pasta con crema, mix de hongos silvestres y trufa negra.", ingredients: ["Fettuccine fresco", "Hongos porcini", "Trufa negra", "Crema", "Cebolla"], price: 9200, categoryId: "cat-2", image: "https://images.unsplash.com/photo-1556761223-4c4282c73f77?w=600&q=80", available: true, isNew: true, order: 5, createdAt: "2024-07-01",
  },
  {
    id: "p-11", name: "Canelones de Carne", description: "Rollitos de pasta rellenos con carne estofada y bechamel gratinada.", ingredients: ["Pasta", "Carne estofada", "Bechamel", "Parmesano", "Tomate"], price: 8100, categoryId: "cat-2", image: "https://images.unsplash.com/photo-1598866594230-a7c12756260f?w=600&q=80", available: true, order: 6, createdAt: "2024-01-01",
  },
  // ── PIZZAS ────────────────────────────────────────────
  {
    id: "p-12", name: "Margherita", description: "La clásica napolitana con salsa de tomate San Marzano, mozzarella fior di latte y albahaca fresca.", ingredients: ["Masa madre", "Tomate San Marzano", "Mozzarella fior di latte", "Albahaca", "AOVE"], price: 7500, categoryId: "cat-3", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&q=80", available: true, isBestseller: true, order: 1, createdAt: "2024-01-01",
  },
  {
    id: "p-13", name: "Quattro Formaggi", description: "Mozzarella, gorgonzola, parmesano y fontina sobre base blanca.", ingredients: ["Masa madre", "Mozzarella", "Gorgonzola", "Parmesano", "Fontina"], price: 8900, categoryId: "cat-3", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80", available: true, order: 2, createdAt: "2024-01-01",
  },
  {
    id: "p-14", name: "Prosciutto e Rúcula", description: "Base tomate, mozzarella, prosciutto crudo y rúcula fresca post-horneado.", ingredients: ["Masa madre", "Tomate", "Mozzarella", "Prosciutto crudo", "Rúcula"], price: 9400, categoryId: "cat-3", image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=600&q=80", available: true, isNew: true, order: 3, createdAt: "2024-08-01",
  },
  {
    id: "p-15", name: "Calabresa", description: "Salchicha calabresa, pimiento morrón y aceitunas negras.", ingredients: ["Masa madre", "Tomate", "Mozzarella", "Calabresa", "Morrón", "Aceitunas"], price: 8200, categoryId: "cat-3", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80", available: true, order: 4, createdAt: "2024-01-01",
  },
  {
    id: "p-16", name: "Funghi Tartufo", description: "Base crema, mix de hongos, trufa y parmesano. Sin tomate.", ingredients: ["Masa madre", "Crema", "Hongos mixtos", "Trufa", "Parmesano"], price: 10200, categoryId: "cat-3", image: "https://images.unsplash.com/photo-1528137871618-79d2761e3fd5?w=600&q=80", available: false, order: 5, createdAt: "2024-01-01",
  },
  // ── CARNES ────────────────────────────────────────────
  {
    id: "p-17", name: "Bife de Chorizo", description: "Corte premium de 350 g a la parrilla con guarnición a elección.", ingredients: ["Bife de chorizo", "Sal gruesa", "Chimichurri"],
    options: [{ id: "opt-4", label: "Punto de cocción", required: true, choices: ["Jugoso", "A punto", "Bien cocido"] }, { id: "opt-5", label: "Guarnición", required: true, choices: ["Papas fritas", "Puré", "Ensalada", "Vegetales grillados"] }],
    price: 14500, categoryId: "cat-4", image: "https://images.unsplash.com/photo-1558030006-450675393462?w=600&q=80", available: true, isBestseller: true, order: 1, createdAt: "2024-01-01",
  },
  {
    id: "p-18", name: "Ojo de Bife", description: "El rey de los cortes, 400 g madurado en seco con hierbas provenzales.", ingredients: ["Ojo de bife", "Hierbas provenzales", "Sal de Himalaya", "Manteca"],
    options: [{ id: "opt-6", label: "Punto de cocción", required: true, choices: ["Jugoso", "A punto", "Bien cocido"] }],
    price: 17800, categoryId: "cat-4", image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80", available: true, order: 2, createdAt: "2024-01-01",
  },
  {
    id: "p-19", name: "Milanesa Napolitana", description: "Milanesa de ternera con salsa de tomate, jamón y mozzarella gratinada.", ingredients: ["Ternera", "Pan rallado", "Tomate", "Jamón cocido", "Mozzarella"],
    options: [{ id: "opt-7", label: "Guarnición", required: true, choices: ["Papas fritas", "Puré", "Ensalada mixta"] }],
    price: 11200, categoryId: "cat-4", image: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=600&q=80", available: true, isBestseller: true, order: 3, createdAt: "2024-01-01",
  },
  {
    id: "p-20", name: "Pollo a la Provenzal", description: "Pechuga de pollo grillada con ajo, perejil y papas al romero.", ingredients: ["Pechuga de pollo", "Ajo", "Perejil", "Limón", "Papas", "Romero"], price: 9800, categoryId: "cat-4", image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=600&q=80", available: true, order: 4, createdAt: "2024-01-01",
  },
  {
    id: "p-21", name: "Costillar de Cerdo", description: "Costillas de cerdo braseadas con salsa barbacoa casera y papas rústicas.", ingredients: ["Costillar de cerdo", "Salsa barbacoa", "Papas", "Ajo", "Pimentón"], price: 13600, categoryId: "cat-4", image: "https://images.unsplash.com/photo-1544025162-d76594e8bb36?w=600&q=80", available: false, isNew: true, order: 5, createdAt: "2024-09-01",
  },
  // ── PESCADOS ──────────────────────────────────────────
  {
    id: "p-22", name: "Salmón a la Plancha", description: "Filet de salmón atlántico con limón, alcaparras y puré de coliflor.", ingredients: ["Salmón atlántico", "Limón", "Alcaparras", "Coliflor", "Manteca"], price: 13200, categoryId: "cat-5", image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&q=80", available: true, isBestseller: true, order: 1, createdAt: "2024-01-01",
  },
  {
    id: "p-23", name: "Lenguado al Limón", description: "Filet de lenguado en manteca noisette con alcaparras y perejil.", ingredients: ["Lenguado", "Manteca", "Limón", "Alcaparras", "Perejil"], price: 11800, categoryId: "cat-5", image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&q=80", available: true, order: 2, createdAt: "2024-01-01",
  },
  {
    id: "p-24", name: "Paella de Mariscos", description: "Arroz con azafrán, mejillones, camarones, calamares y langostinos.", ingredients: ["Arroz arbóreo", "Azafrán", "Mejillones", "Camarones", "Calamares", "Langostinos"], price: 16500, categoryId: "cat-5", image: "https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=600&q=80", available: true, isNew: true, order: 3, createdAt: "2024-10-01",
  },
  {
    id: "p-25", name: "Cazuela de Mariscos", description: "Caldo de mariscos con tomate y hierbas mediterráneas. Para compartir.", ingredients: ["Caldo de pescado", "Tomate", "Mariscos mixtos", "Azafrán", "Laurel"], price: 14900, categoryId: "cat-5", image: "https://images.unsplash.com/photo-1551248429-40975aa4de74?w=600&q=80", available: false, order: 4, createdAt: "2024-01-01",
  },
  // ── ENSALADAS ─────────────────────────────────────────
  {
    id: "p-26", name: "Caprese Clásica", description: "Tomate perita, mozzarella fresca, albahaca y aceite de oliva.", ingredients: ["Tomate perita", "Mozzarella fresca", "Albahaca", "AOVE", "Sal gruesa"], price: 5200, categoryId: "cat-6", image: "https://images.unsplash.com/photo-1592417817038-d13fd7342605?w=600&q=80", available: true, order: 1, createdAt: "2024-01-01",
  },
  {
    id: "p-27", name: "Ensalada César", description: "Lechuga romana, croutones, parmesano, pollo grillado y salsa César casera.", ingredients: ["Lechuga romana", "Pollo grillado", "Parmesano", "Croutones", "Salsa César", "Limón"], price: 6800, categoryId: "cat-6", image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=600&q=80", available: true, isBestseller: true, order: 2, createdAt: "2024-01-01",
  },
  {
    id: "p-28", name: "Ensalada Mediterránea", description: "Rúcula, tomates cherry, pepino, aceitunas kalamata y queso feta.", ingredients: ["Rúcula", "Tomates cherry", "Pepino", "Aceitunas kalamata", "Queso feta", "AOVE"], price: 5900, categoryId: "cat-6", image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80", available: true, isNew: true, order: 3, createdAt: "2024-07-01",
  },
  {
    id: "p-29", name: "Panzanella Toscana", description: "Pan tostado, tomate, pepino, cebolla roja, albahaca y vinagreta.", ingredients: ["Pan toscano", "Tomate", "Pepino", "Cebolla roja", "Albahaca", "Vinagre balsámico"], price: 5400, categoryId: "cat-6", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80", available: false, order: 4, createdAt: "2024-01-01",
  },
  // ── POSTRES ───────────────────────────────────────────
  {
    id: "p-30", name: "Tiramisú Clásico", description: "El postre italiano por excelencia: bizcochuelo, café, mascarpone y cacao.", ingredients: ["Savoiardi", "Café espresso", "Mascarpone", "Huevo", "Azúcar", "Cacao"], price: 4800, categoryId: "cat-7", image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&q=80", available: true, isBestseller: true, order: 1, createdAt: "2024-01-01",
  },
  {
    id: "p-31", name: "Panna Cotta", description: "Crema cocida con vainilla de Madagascar y coulis de frutos rojos.", ingredients: ["Crema de leche", "Gelatina", "Vainilla", "Frutos rojos", "Azúcar"], price: 4200, categoryId: "cat-7", image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&q=80", available: true, order: 2, createdAt: "2024-01-01",
  },
  {
    id: "p-32", name: "Lava Cake de Chocolate", description: "Bizcocho de chocolate fundente con interior líquido y helado de vainilla.", ingredients: ["Chocolate 70%", "Manteca", "Huevo", "Azúcar", "Harina", "Helado de vainilla"], price: 5100, categoryId: "cat-7", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&q=80", available: true, isNew: true, order: 3, createdAt: "2024-09-01",
  },
  {
    id: "p-33", name: "Cannoli Siciliani", description: "Barquillos crujientes rellenos de ricota dulce y chips de chocolate.", ingredients: ["Harina", "Ricota", "Azúcar impalpable", "Chips de chocolate", "Ralladura de naranja"], price: 3900, categoryId: "cat-7", image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&q=80", available: true, order: 4, createdAt: "2024-01-01",
  },
  {
    id: "p-34", name: "Gelato Artesanal", description: "Dos bochas de helado artesanal a elección con toppings.", ingredients: ["Leche", "Crema", "Azúcar", "Yema de huevo"],
    options: [{ id: "opt-8", label: "Elegir sabores (2)", required: true, choices: ["Vainilla", "Chocolate", "Frutilla", "Limón", "Pistacho", "Dulce de leche"] }],
    price: 3600, categoryId: "cat-7", image: "https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?w=600&q=80", available: true, order: 5, createdAt: "2024-01-01",
  },
  // ── BEBIDAS ───────────────────────────────────────────
  {
    id: "p-35", name: "Agua Mineral", description: "Agua mineral sin gas o con gas. 500 ml.", ingredients: ["Agua"],
    options: [{ id: "opt-9", label: "Tipo", required: true, choices: ["Sin gas", "Con gas"] }],
    price: 1200, categoryId: "cat-8", image: "https://images.unsplash.com/photo-1559839914-17aae19cec71?w=600&q=80", available: true, order: 1, createdAt: "2024-01-01",
  },
  {
    id: "p-36", name: "Vino de la Casa", description: "Malbec o Torrontés de bodega mendocina seleccionada. Por copa.", ingredients: ["Uvas"],
    options: [{ id: "opt-10", label: "Variedad", required: true, choices: ["Malbec", "Torrontés", "Cabernet Sauvignon"] }],
    price: 3400, categoryId: "cat-8", image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&q=80", available: true, isBestseller: true, order: 2, createdAt: "2024-01-01",
  },
  {
    id: "p-37", name: "Sangría Casera", description: "Vino tinto, frutas frescas de temporada y naranja. Jarra 1L.", ingredients: ["Vino tinto", "Naranja", "Durazno", "Manzana", "Azúcar", "Canela"], price: 8900, categoryId: "cat-8", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&q=80", available: true, order: 3, createdAt: "2024-01-01",
  },
  {
    id: "p-38", name: "Negroni", description: "Gin, Campari y vermouth rosso en proporciones perfectas. Con esfera de hielo.", ingredients: ["Gin", "Campari", "Vermouth rosso", "Esfera de hielo", "Piel de naranja"], price: 5200, categoryId: "cat-8", image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&q=80", available: true, isNew: true, order: 4, createdAt: "2024-10-01",
  },
  {
    id: "p-39", name: "Café Espresso", description: "Shot doble de café de origen. Acompañado de agua fría y turrón artesanal.", ingredients: ["Café de origen", "Agua"], price: 1800, categoryId: "cat-8", image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=600&q=80", available: true, order: 5, createdAt: "2024-01-01",
  },
  {
    id: "p-40", name: "Limonada Italiana", description: "Limonada casera con albahaca, miel y soda. Fresca y aromática.", ingredients: ["Limón", "Albahaca", "Miel", "Soda", "Hielo"], price: 2900, categoryId: "cat-8", image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=600&q=80", available: true, order: 6, createdAt: "2024-01-01",
  },
];
