export type Size = "small" | "medium" | "large";
export type Base = "thin" | "classic" | "thick" | "cheese";

export interface Ingredient {
  id: string;
  name: string;
  emoji: string;
  category: string;
  price: number;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  color: string;
}

export interface SavedRecipe {
  id: string;
  name: string;
  base: Base;
  size: Size;
  ingredients: string[];
  price: number;
}

export const BASES: { id: Base; label: string; desc: string; price: number }[] = [
  { id: "thin", label: "Тонкое", desc: "Хрустящее, лёгкое", price: 0 },
  { id: "classic", label: "Классическое", desc: "Воздушное, мягкое", price: 0 },
  { id: "thick", label: "Толстое", desc: "Пышное, сытное", price: 100 },
  { id: "cheese", label: "Сырный борт", desc: "С моцареллой", price: 200 },
];

export const SIZES: { id: Size; label: string; diameter: string; price: number; scale: number }[] = [
  { id: "small", label: "25 см", diameter: "Маленькая", price: 490, scale: 0.75 },
  { id: "medium", label: "33 см", diameter: "Средняя", price: 690, scale: 0.88 },
  { id: "large", label: "41 см", diameter: "Большая", price: 890, scale: 1 },
];

export const INGREDIENTS: Ingredient[] = [
  { id: "tomato", name: "Томатный соус", emoji: "🍅", category: "Соус", price: 0, calories: 25, protein: 1, fat: 0, carbs: 5, color: "#c0392b" },
  { id: "cream", name: "Сливочный соус", emoji: "🥛", category: "Соус", price: 0, calories: 45, protein: 1, fat: 4, carbs: 2, color: "#f5f0e8" },
  { id: "pesto", name: "Песто", emoji: "🌿", category: "Соус", price: 80, calories: 60, protein: 2, fat: 5, carbs: 3, color: "#27ae60" },
  { id: "mozzarella", name: "Моцарелла", emoji: "🧀", category: "Сыр", price: 120, calories: 85, protein: 6, fat: 6, carbs: 1, color: "#f9e4b7" },
  { id: "parmesan", name: "Пармезан", emoji: "🧀", category: "Сыр", price: 150, calories: 110, protein: 10, fat: 7, carbs: 1, color: "#d4a854" },
  { id: "gorgonzola", name: "Горгонзола", emoji: "🫙", category: "Сыр", price: 180, calories: 100, protein: 7, fat: 8, carbs: 1, color: "#b8d4a8" },
  { id: "prosciutto", name: "Прошутто", emoji: "🥩", category: "Мясо", price: 220, calories: 145, protein: 14, fat: 9, carbs: 0, color: "#e57373" },
  { id: "pepperoni", name: "Пепперони", emoji: "🌶️", category: "Мясо", price: 190, calories: 130, protein: 11, fat: 10, carbs: 1, color: "#d32f2f" },
  { id: "chicken", name: "Куриное филе", emoji: "🍗", category: "Мясо", price: 160, calories: 95, protein: 16, fat: 3, carbs: 0, color: "#f5c842" },
  { id: "bacon", name: "Бекон", emoji: "🥓", category: "Мясо", price: 170, calories: 140, protein: 9, fat: 12, carbs: 0, color: "#b05030" },
  { id: "tomatoes", name: "Томаты черри", emoji: "🍒", category: "Овощи", price: 90, calories: 20, protein: 1, fat: 0, carbs: 4, color: "#e53935" },
  { id: "mushrooms", name: "Белые грибы", emoji: "🍄", category: "Овощи", price: 130, calories: 35, protein: 3, fat: 0, carbs: 5, color: "#8d6e63" },
  { id: "olives", name: "Чёрные оливки", emoji: "🫒", category: "Овощи", price: 110, calories: 50, protein: 0, fat: 5, carbs: 1, color: "#424242" },
  { id: "arugula", name: "Руккола", emoji: "🌱", category: "Овощи", price: 80, calories: 15, protein: 1, fat: 0, carbs: 2, color: "#558b2f" },
  { id: "pepper", name: "Болгарский перец", emoji: "🫑", category: "Овощи", price: 70, calories: 20, protein: 1, fat: 0, carbs: 4, color: "#ff8f00" },
  { id: "truffle", name: "Чёрный трюфель", emoji: "⚫", category: "Деликатесы", price: 490, calories: 55, protein: 2, fat: 1, carbs: 10, color: "#212121" },
  { id: "salmon", name: "Лосось", emoji: "🐟", category: "Деликатесы", price: 280, calories: 120, protein: 13, fat: 7, carbs: 0, color: "#ff7043" },
  { id: "shrimp", name: "Тигровые креветки", emoji: "🦐", category: "Деликатесы", price: 250, calories: 90, protein: 14, fat: 2, carbs: 0, color: "#ff5722" },
];

export const CATEGORIES = ["Все", ...Array.from(new Set(INGREDIENTS.map((i) => i.category)))];

export const SAVED_RECIPES: SavedRecipe[] = [
  { id: "r1", name: "Маргарита Нера", base: "thin", size: "medium", ingredients: ["tomato", "mozzarella", "arugula"], price: 880 },
  { id: "r2", name: "Тартуфо Реале", base: "classic", size: "large", ingredients: ["cream", "mozzarella", "truffle", "parmesan"], price: 1660 },
  { id: "r3", name: "Дьяволо", base: "thin", size: "medium", ingredients: ["tomato", "mozzarella", "pepperoni", "pepper"], price: 1090 },
];
