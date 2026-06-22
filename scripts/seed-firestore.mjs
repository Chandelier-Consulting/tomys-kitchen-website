import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { readFile } from "node:fs/promises";

const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;

if (!serviceAccountPath) {
  throw new Error("Set GOOGLE_APPLICATION_CREDENTIALS to a Firebase service account JSON file.");
}

const serviceAccount = JSON.parse(await readFile(serviceAccountPath, "utf8"));

if (!getApps().length) {
  initializeApp({ credential: cert(serviceAccount) });
}

const tomysImages = {
  logo: "/images/tomys/logo.jpg",
  truck: "/images/tomys/truck-still.jpg",
  breakfastBurrito: "/images/tomys/breakfast-burrito.jpg",
  fishTacos: "/images/tomys/fish-tacos.jpg",
  shrimpTacos: "/images/tomys/shrimp-tacos.jpg",
  torta: "/images/tomys/torta-oaxaquena.jpg",
  cateringSalmon: "/images/tomys/catering-salmon.jpg",
  cateringPasta: "/images/tomys/catering-pasta.jpg",
  cateringSteak: "/images/tomys/catering-steak.jpg",
};

const orderLinks = [
  { label: "DoorDash", href: "https://order.online/store/-30486102" },
  { label: "Uber Eats", href: "https://postmates.com/store/tomys-kitchen/JFvmxjFvUy2gaYKongCWeg" },
  { label: "Grubhub", href: "https://www.grubhub.com/search?searchTerm=Tomy%27s%20Kitchen%20239%20W%20El%20Camino%20Real%20Mountain%20View" },
  { label: "Yelp", href: "https://www.yelp.com/search?find_desc=Tomy%27s+Kitchen&find_loc=239+W+El+Camino+Real%2C+Mountain+View%2C+CA" },
];

const menuCategories = [
  {
    name: "Breakfast",
    items: [
      { name: "Breakfast Sandwich", price: "$8.50", description: "Egg, cheese, and your choice of bacon or sausage on a toasted bun" },
      { name: "Cheese & Egg Muffin", price: "$6.00", description: "Classic egg and melted cheese on an English muffin" },
      { name: "Breakfast Burrito", price: "$10.00", description: "Best seller with eggs, potatoes, cheese, salsa, and your choice of meat wrapped in a flour tortilla" },
    ],
  },
  {
    name: "Tacos",
    items: [
      { name: "Fish Tacos (Tacos de Pescado)", price: "$6.00", description: "Crispy battered fish with cabbage slaw and creamy sauce" },
      { name: "Shrimp Tacos", price: "$7.00", description: "Grilled shrimp with fresh pico de gallo and avocado" },
      { name: "Asada Tacos", price: "$5.00", description: "Grilled marinated steak with onions and cilantro" },
      { name: "Al Pastor Tacos", price: "$5.00", description: "Spiced pork with pineapple, onion, and cilantro" },
    ],
  },
  {
    name: "Mains",
    items: [
      { name: "Quesabirria Combo", price: "$15.00", description: "Crispy cheese birria tacos with consomme, rice, and beans" },
      { name: "Quesadilla with Shrimp", price: "$16.88", description: "Large flour tortilla stuffed with shrimp and melted cheese" },
      { name: "Torta Oaxaquena", price: "$17.50", description: "Oaxacan-style sandwich with choice of meat, avocado, and queso fresco" },
      { name: "Milanese Plate (Plato de Milanesa)", price: "$17.50", description: "Crispy breaded cutlet served with rice, beans, and salad" },
      { name: "Shrimp Fajitas Plate", price: "$18.75", description: "Sizzling shrimp fajitas with peppers, onions, rice, and beans" },
      { name: "Burrito de Camaron o Pescado", price: "$17.50", description: "Large burrito with your choice of shrimp or fish, rice, beans, and fixings" },
    ],
  },
  {
    name: "Seafood Cocktails",
    items: [
      { name: "Coctel Mixto", price: "$23.75", description: "Shrimp, octopus, and crab in a chilled tomato-based cocktail sauce" },
      { name: "Coctel Campechano", price: "$20.63", description: "Mixed seafood cocktail with fresh lime, avocado, and cilantro" },
      { name: "Tostada Aguachile", price: "$9.38", description: "Crispy tostada topped with shrimp cured in lime and chili" },
    ],
  },
  {
    name: "Drinks",
    items: [
      { name: "Horchata", price: "$4.00", description: "Creamy cinnamon rice milk drink" },
      { name: "Jamaica", price: "$3.50", description: "Chilled hibiscus tea" },
      { name: "Mexican Coke", price: "$3.00", description: "Made with real cane sugar" },
      { name: "Jarritos", price: "$3.00", description: "Assorted Mexican fruit sodas" },
    ],
  },
];

const db = getFirestore();

await db.doc("siteContent/settings").set({ orderLinks, images: tomysImages }, { merge: true });

for (const category of menuCategories) {
  for (const item of category.items) {
    const id = `${category.name}-${item.name}`.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    await db.doc(`menuItems/${id}`).set({ ...item, category: category.name, visible: true }, { merge: true });
  }
}

console.log("Seeded Tomy's Kitchen Firestore content.");
