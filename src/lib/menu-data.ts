export type MenuItem = {
  name: string;
  price: string;
  description: string;
};

export type MenuCategory = {
  name: string;
  items: MenuItem[];
};

export const menuCategories: MenuCategory[] = [
  {
    name: "Breakfast",
    items: [
      {
        name: "Breakfast Sandwich",
        price: "$8.50",
        description: "Egg, cheese, and your choice of bacon or sausage on a toasted bun",
      },
      {
        name: "Cheese & Egg Muffin",
        price: "$6.00",
        description: "Classic egg and melted cheese on an English muffin",
      },
      {
        name: "Breakfast Burrito",
        price: "$10.00",
        description: "Best seller with eggs, potatoes, cheese, salsa, and your choice of meat wrapped in a flour tortilla",
      },
    ],
  },
  {
    name: "Tacos",
    items: [
      {
        name: "Fish Tacos (Tacos de Pescado)",
        price: "$6.00",
        description: "Crispy battered fish with cabbage slaw and creamy sauce",
      },
      {
        name: "Shrimp Tacos",
        price: "$7.00",
        description: "Grilled shrimp with fresh pico de gallo and avocado",
      },
      {
        name: "Asada Tacos",
        price: "$5.00",
        description: "Grilled marinated steak with onions and cilantro",
      },
      {
        name: "Al Pastor Tacos",
        price: "$5.00",
        description: "Spiced pork with pineapple, onion, and cilantro",
      },
    ],
  },
  {
    name: "Mains",
    items: [
      {
        name: "Quesabirria Combo",
        price: "$15.00",
        description: "Crispy cheese birria tacos with consommé, rice, and beans",
      },
      {
        name: "Quesadilla with Shrimp",
        price: "$16.88",
        description: "Large flour tortilla stuffed with shrimp and melted cheese",
      },
      {
        name: "Torta Oaxaqueña",
        price: "$17.50",
        description: "Oaxacan-style sandwich with choice of meat, avocado, and queso fresco",
      },
      {
        name: "Milanese Plate (Plato de Milanesa)",
        price: "$17.50",
        description: "Crispy breaded cutlet served with rice, beans, and salad",
      },
      {
        name: "Shrimp Fajitas Plate",
        price: "$18.75",
        description: "Sizzling shrimp fajitas with peppers, onions, rice, and beans",
      },
      {
        name: "Burrito de Camarón o Pescado",
        price: "$17.50",
        description: "Large burrito with your choice of shrimp or fish, rice, beans, and fixings",
      },
    ],
  },
  {
    name: "Seafood Cocktails",
    items: [
      {
        name: "Coctel Mixto",
        price: "$23.75",
        description: "Shrimp, octopus, and crab in a chilled tomato-based cocktail sauce",
      },
      {
        name: "Coctel Campechano",
        price: "$20.63",
        description: "Mixed seafood cocktail with fresh lime, avocado, and cilantro",
      },
      {
        name: "Tostada Aguachile",
        price: "$9.38",
        description: "Crispy tostada topped with shrimp cured in lime and chili",
      },
    ],
  },
  {
    name: "Drinks",
    items: [
      {
        name: "Horchata",
        price: "$4.00",
        description: "Creamy cinnamon rice milk drink",
      },
      {
        name: "Jamaica",
        price: "$3.50",
        description: "Chilled hibiscus tea",
      },
      {
        name: "Mexican Coke",
        price: "$3.00",
        description: "Made with real cane sugar",
      },
      {
        name: "Jarritos",
        price: "$3.00",
        description: "Assorted Mexican fruit sodas",
      },
    ],
  },
];

export const featuredItems = [
  menuCategories[0].items[2],
  menuCategories[1].items[0],
  menuCategories[1].items[1],
  menuCategories[2].items[2],
];
