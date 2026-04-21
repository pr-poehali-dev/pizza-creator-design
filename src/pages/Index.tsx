import { useState } from "react";
import Icon from "@/components/ui/icon";

// ─── Types ───────────────────────────────────────────────
type Size = "small" | "medium" | "large";
type Base = "thin" | "classic" | "thick" | "cheese";

interface Ingredient {
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

interface SavedRecipe {
  id: string;
  name: string;
  base: Base;
  size: Size;
  ingredients: string[];
  price: number;
}

// ─── Data ────────────────────────────────────────────────
const BASES: { id: Base; label: string; desc: string; price: number }[] = [
  { id: "thin", label: "Тонкое", desc: "Хрустящее, лёгкое", price: 0 },
  { id: "classic", label: "Классическое", desc: "Воздушное, мягкое", price: 0 },
  { id: "thick", label: "Толстое", desc: "Пышное, сытное", price: 100 },
  { id: "cheese", label: "Сырный борт", desc: "С моцареллой", price: 200 },
];

const SIZES: { id: Size; label: string; diameter: string; price: number; scale: number }[] = [
  { id: "small", label: "25 см", diameter: "Маленькая", price: 490, scale: 0.75 },
  { id: "medium", label: "33 см", diameter: "Средняя", price: 690, scale: 0.88 },
  { id: "large", label: "41 см", diameter: "Большая", price: 890, scale: 1 },
];

const INGREDIENTS: Ingredient[] = [
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

const CATEGORIES = ["Все", ...Array.from(new Set(INGREDIENTS.map((i) => i.category)))];

const SAVED_RECIPES: SavedRecipe[] = [
  { id: "r1", name: "Маргарита Нера", base: "thin", size: "medium", ingredients: ["tomato", "mozzarella", "arugula"], price: 880 },
  { id: "r2", name: "Тартуфо Реале", base: "classic", size: "large", ingredients: ["cream", "mozzarella", "truffle", "parmesan"], price: 1660 },
  { id: "r3", name: "Дьяволо", base: "thin", size: "medium", ingredients: ["tomato", "mozzarella", "pepperoni", "pepper"], price: 1090 },
];

// ─── Pizza Visual ─────────────────────────────────────────
function PizzaVisual({
  base,
  size,
  selectedIngredients,
}: {
  base: Base;
  size: Size;
  selectedIngredients: Ingredient[];
}) {
  const sizeData = SIZES.find((s) => s.id === size)!;
  const baseColors: Record<Base, string> = {
    thin: "#c8953a",
    classic: "#d4a040",
    thick: "#c07830",
    cheese: "#e8c060",
  };

  const toppingPositions = [
    { x: 50, y: 30 }, { x: 65, y: 45 }, { x: 35, y: 48 },
    { x: 55, y: 62 }, { x: 42, y: 35 }, { x: 68, y: 30 },
    { x: 30, y: 60 }, { x: 70, y: 58 }, { x: 50, y: 68 },
    { x: 38, y: 55 }, { x: 62, y: 55 }, { x: 48, y: 45 },
    { x: 58, y: 38 }, { x: 44, y: 63 }, { x: 60, y: 68 },
    { x: 36, y: 40 }, { x: 64, y: 38 }, { x: 52, y: 52 },
  ];

  const pizzaSize = sizeData.scale * 300;

  return (
    <div className="flex items-center justify-center w-full h-full relative">
      <div
        className="relative rounded-full transition-all duration-500 ease-out flex-shrink-0"
        style={{
          width: `${pizzaSize}px`,
          height: `${pizzaSize}px`,
          background: `radial-gradient(circle at 38% 32%, ${baseColors[base]}ee, ${baseColors[base]}99 55%, #7a4a1888)`,
          boxShadow: `0 8px 60px rgba(180, 120, 40, 0.3), 0 0 0 2px rgba(200,160,50,0.1), inset 0 0 50px rgba(0,0,0,0.35)`,
        }}
      >
        {/* Crust */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle at 50% 50%, transparent 78%, rgba(100, 55, 15, 0.7) 100%)`,
          }}
        />
        {/* Cheese crust */}
        {base === "cheese" && (
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle at 50% 50%, transparent 76%, rgba(240,200,80,0.5) 82%, transparent 100%)`,
            }}
          />
        )}
        {/* Sauce */}
        <div
          className="absolute rounded-full transition-all duration-400"
          style={{
            inset: "9%",
            background: selectedIngredients.find((i) => i.category === "Соус")
              ? `radial-gradient(circle at 38% 33%, ${selectedIngredients.find((i) => i.category === "Соус")!.color}cc, ${selectedIngredients.find((i) => i.category === "Соус")!.color}55)`
              : `radial-gradient(circle at 38% 33%, rgba(160,80,20,0.3), rgba(100,50,10,0.15))`,
          }}
        />
        {/* Mozzarella base */}
        {selectedIngredients.find((i) => i.id === "mozzarella") && (
          <div
            className="absolute rounded-full"
            style={{
              inset: "13%",
              background: `radial-gradient(circle at 42% 38%, rgba(255,248,225,0.65), rgba(245,230,180,0.35))`,
            }}
          />
        )}
        {/* Toppings */}
        {selectedIngredients
          .filter((i) => i.category !== "Соус" && i.id !== "mozzarella")
          .map((ing, idx) => {
            const pos = toppingPositions[idx % toppingPositions.length];
            const extras = [
              { x: pos.x - 13, y: pos.y + 9 },
              { x: pos.x + 15, y: pos.y - 7 },
              { x: pos.x - 5, y: pos.y - 15 },
            ];
            return [pos, ...extras.slice(0, 2)].map((p, pi) => (
              <div
                key={`${ing.id}-${pi}`}
                className="pizza-topping absolute flex items-center justify-center select-none pointer-events-none"
                style={{
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  transform: "translate(-50%, -50%)",
                  fontSize: `${sizeData.scale * 16}px`,
                  animationDelay: `${pi * 0.07}s`,
                }}
              >
                {ing.emoji}
              </div>
            ));
          })}

        {/* Gloss */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            top: "7%", left: "14%", width: "32%", height: "26%",
            background: "radial-gradient(ellipse, rgba(255,255,255,0.1), transparent)",
          }}
        />
      </div>

      {selectedIngredients.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <p
            className="font-display text-lg italic text-center px-8"
            style={{ color: "hsl(43, 74%, 58%, 0.45)" }}
          >
            Добавьте ингредиенты
          </p>
        </div>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────
export default function Index() {
  const [selectedBase, setSelectedBase] = useState<Base>("classic");
  const [selectedSize, setSelectedSize] = useState<Size>("medium");
  const [selectedIds, setSelectedIds] = useState<string[]>(["tomato", "mozzarella"]);
  const [activeCategory, setActiveCategory] = useState("Все");
  const [activeTab, setActiveTab] = useState<"build" | "saved">("build");

  const selectedIngredients = INGREDIENTS.filter((i) => selectedIds.includes(i.id));

  const toggleIngredient = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const loadRecipe = (recipe: SavedRecipe) => {
    setSelectedBase(recipe.base);
    setSelectedSize(recipe.size);
    setSelectedIds(recipe.ingredients);
    setActiveTab("build");
  };

  const sizeData = SIZES.find((s) => s.id === selectedSize)!;
  const baseData = BASES.find((b) => b.id === selectedBase)!;
  const ingredientsPrice = selectedIngredients.reduce((sum, i) => sum + i.price, 0);
  const totalPrice = sizeData.price + baseData.price + ingredientsPrice;
  const totalCalories = selectedIngredients.reduce((sum, i) => sum + i.calories, 0);
  const totalProtein = selectedIngredients.reduce((sum, i) => sum + i.protein, 0);
  const totalFat = selectedIngredients.reduce((sum, i) => sum + i.fat, 0);
  const totalCarbs = selectedIngredients.reduce((sum, i) => sum + i.carbs, 0);

  const filteredIngredients =
    activeCategory === "Все"
      ? INGREDIENTS
      : INGREDIENTS.filter((i) => i.category === activeCategory);

  return (
    <div className="min-h-screen" style={{ background: "hsl(20, 10%, 6%)" }}>
      {/* Header */}
      <header
        className="border-b px-6 py-4 flex items-center justify-between animate-fade-in"
        style={{ borderColor: "hsl(20, 10%, 14%)" }}
      >
        <div>
          <h1 className="font-display text-3xl font-light tracking-widest text-gold">
            PIZZERIA NERA
          </h1>
          <p className="text-xs tracking-[0.3em] uppercase mt-0.5" style={{ color: "hsl(40, 10%, 50%)" }}>
            Авторский конструктор
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-3">
          <span className="text-xs tracking-widest uppercase" style={{ color: "hsl(40, 10%, 45%)" }}>
            Создайте свою пиццу
          </span>
          <div className="w-px h-4" style={{ background: "hsl(20, 10%, 22%)" }} />
          <span className="font-display text-gold text-lg">{selectedIngredients.length} ингр.</span>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row" style={{ minHeight: "calc(100vh - 73px)" }}>
        {/* ─ LEFT: Pizza visual + selectors ─ */}
        <div className="lg:w-[44%] flex flex-col border-r" style={{ borderColor: "hsl(20, 10%, 13%)" }}>
          {/* Pizza Preview */}
          <div
            className="flex items-center justify-center p-6 relative"
            style={{
              minHeight: "340px",
              background: "radial-gradient(ellipse at 50% 60%, hsl(20,10%,11%) 0%, hsl(20,10%,6%) 65%)",
            }}
          >
            <PizzaVisual
              base={selectedBase}
              size={selectedSize}
              selectedIngredients={selectedIngredients}
            />
            {/* Size label */}
            <div
              className="absolute top-4 right-4 text-xs px-2 py-1 rounded-full border"
              style={{ borderColor: "hsl(20,10%,20%)", color: "hsl(40,10%,50%)", background: "hsl(20,10%,9%)" }}
            >
              ⌀ {SIZES.find((s) => s.id === selectedSize)?.label}
            </div>
          </div>

          <div className="gold-divider" />

          {/* Size selector */}
          <div className="px-5 py-4 animate-fade-in-2">
            <p className="text-xs tracking-[0.25em] uppercase mb-3 text-gold" style={{ opacity: 0.65 }}>
              Размер
            </p>
            <div className="grid grid-cols-3 gap-2.5">
              {SIZES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedSize(s.id)}
                  className="py-3 px-2 rounded-xl border text-center transition-all duration-200"
                  style={{
                    borderColor: selectedSize === s.id ? "hsl(43, 74%, 58%)" : "hsl(20, 10%, 18%)",
                    background: selectedSize === s.id ? "hsl(20, 10%, 13%)" : "hsl(20, 10%, 9%)",
                    boxShadow: selectedSize === s.id ? "0 0 18px rgba(200,160,50,0.12)" : "none",
                  }}
                >
                  <div
                    className="font-display text-xl"
                    style={{ color: selectedSize === s.id ? "hsl(43, 74%, 62%)" : "hsl(40, 20%, 72%)" }}
                  >
                    {s.label}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: "hsl(40, 10%, 48%)" }}>
                    {s.diameter}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="gold-divider opacity-40" />

          {/* Base selector */}
          <div className="px-5 py-4 animate-fade-in-3">
            <p className="text-xs tracking-[0.25em] uppercase mb-3 text-gold" style={{ opacity: 0.65 }}>
              Тесто
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              {BASES.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setSelectedBase(b.id)}
                  className="py-3 px-4 rounded-xl border text-left transition-all duration-200"
                  style={{
                    borderColor: selectedBase === b.id ? "hsl(43, 74%, 58%)" : "hsl(20, 10%, 18%)",
                    background: selectedBase === b.id ? "hsl(20, 10%, 13%)" : "hsl(20, 10%, 9%)",
                    boxShadow: selectedBase === b.id ? "0 0 18px rgba(200,160,50,0.12)" : "none",
                  }}
                >
                  <div
                    className="text-sm font-medium"
                    style={{ color: selectedBase === b.id ? "hsl(43, 74%, 62%)" : "hsl(40, 20%, 78%)" }}
                  >
                    {b.label}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: "hsl(40, 10%, 48%)" }}>
                    {b.desc}
                    {b.price > 0 && (
                      <span className="text-gold ml-1" style={{ opacity: 0.7 }}>
                        +{b.price}₽
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ─ RIGHT: Ingredients / Saved + Order ─ */}
        <div className="lg:flex-1 flex flex-col">
          {/* Tabs */}
          <div className="flex border-b animate-fade-in-1" style={{ borderColor: "hsl(20, 10%, 14%)" }}>
            {(["build", "saved"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="flex-1 flex items-center justify-center gap-2 py-4 text-xs tracking-widest uppercase transition-all duration-200"
                style={{
                  color: activeTab === tab ? "hsl(43, 74%, 58%)" : "hsl(40, 10%, 48%)",
                  borderBottom: activeTab === tab ? "2px solid hsl(43, 74%, 58%)" : "2px solid transparent",
                }}
              >
                <Icon
                  name={tab === "build" ? "ChefHat" : "BookOpen"}
                  size={14}
                />
                {tab === "build" ? "Состав" : "Рецепты"}
              </button>
            ))}
          </div>

          {/* ─ BUILD tab ─ */}
          {activeTab === "build" && (
            <>
              {/* Category pills */}
              <div className="px-4 pt-4 pb-2">
                <div className="flex gap-2 overflow-x-auto scroll-hidden pb-1">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className="px-3 py-1.5 rounded-full text-xs whitespace-nowrap tracking-wide transition-all duration-200"
                      style={{
                        background: activeCategory === cat ? "hsl(43, 74%, 58%)" : "transparent",
                        color: activeCategory === cat ? "hsl(20, 10%, 6%)" : "hsl(40, 10%, 52%)",
                        fontWeight: activeCategory === cat ? 600 : 400,
                        border: activeCategory === cat ? "1px solid hsl(43, 74%, 58%)" : "1px solid hsl(20, 10%, 20%)",
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Ingredient grid */}
              <div className="flex-1 overflow-y-auto scroll-hidden px-4 py-2">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pb-2">
                  {filteredIngredients.map((ing) => {
                    const isSelected = selectedIds.includes(ing.id);
                    return (
                      <button
                        key={ing.id}
                        onClick={() => toggleIngredient(ing.id)}
                        className="ingredient-card rounded-xl border p-3 text-left"
                        style={{
                          borderColor: isSelected ? "hsl(43, 74%, 58%)" : "hsl(20, 10%, 18%)",
                          background: isSelected ? "hsl(20, 10%, 13%)" : "hsl(20, 10%, 9%)",
                          boxShadow: isSelected ? "0 0 16px rgba(200,160,50,0.18)" : "none",
                        }}
                      >
                        <div className="flex items-start justify-between mb-1.5">
                          <span className="text-2xl">{ing.emoji}</span>
                          {isSelected && (
                            <div
                              className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                              style={{ background: "hsl(43, 74%, 58%)" }}
                            >
                              <Icon name="Check" size={11} style={{ color: "hsl(20, 10%, 6%)" }} />
                            </div>
                          )}
                        </div>
                        <div
                          className="text-xs font-medium leading-tight"
                          style={{ color: isSelected ? "hsl(43, 74%, 72%)" : "hsl(40, 20%, 78%)" }}
                        >
                          {ing.name}
                        </div>
                        <div className="text-xs mt-1" style={{ color: "hsl(40, 10%, 48%)" }}>
                          {ing.price === 0 ? "Включено" : `+${ing.price}₽`}
                        </div>
                        <div className="text-xs" style={{ color: "hsl(40, 10%, 38%)" }}>
                          {ing.calories} ккал
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {/* ─ SAVED tab ─ */}
          {activeTab === "saved" && (
            <div className="flex-1 overflow-y-auto scroll-hidden px-4 py-4">
              <p
                className="text-xs tracking-widest uppercase mb-4"
                style={{ color: "hsl(43, 74%, 58%, 0.6)" }}
              >
                Фирменные рецепты
              </p>
              <div className="space-y-3">
                {SAVED_RECIPES.map((recipe) => {
                  const recipeIngredients = INGREDIENTS.filter((i) =>
                    recipe.ingredients.includes(i.id)
                  );
                  return (
                    <div
                      key={recipe.id}
                      className="rounded-xl border p-4 transition-all duration-200 group"
                      style={{
                        borderColor: "hsl(20, 10%, 18%)",
                        background: "hsl(20, 10%, 9%)",
                      }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3
                            className="font-display text-lg transition-colors"
                            style={{ color: "hsl(40, 20%, 88%)" }}
                          >
                            {recipe.name}
                          </h3>
                          <p className="text-xs mt-0.5" style={{ color: "hsl(40, 10%, 48%)" }}>
                            {BASES.find((b) => b.id === recipe.base)?.label} ·{" "}
                            {SIZES.find((s) => s.id === recipe.size)?.label}
                          </p>
                        </div>
                        <span className="font-display text-xl text-gold">{recipe.price}₽</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {recipeIngredients.map((i) => (
                          <span
                            key={i.id}
                            className="text-xs px-2 py-0.5 rounded-full border"
                            style={{
                              borderColor: "hsl(20, 10%, 22%)",
                              color: "hsl(40, 10%, 55%)",
                            }}
                          >
                            {i.emoji} {i.name}
                          </span>
                        ))}
                      </div>
                      <button
                        onClick={() => loadRecipe(recipe)}
                        className="w-full py-2 rounded-lg border text-xs tracking-widest uppercase transition-all duration-200"
                        style={{
                          borderColor: "hsl(43, 74%, 58%)",
                          color: "hsl(43, 74%, 58%)",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.background = "hsl(43, 74%, 58%)";
                          (e.currentTarget as HTMLButtonElement).style.color = "hsl(20, 10%, 6%)";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                          (e.currentTarget as HTMLButtonElement).style.color = "hsl(43, 74%, 58%)";
                        }}
                      >
                        Собрать этот рецепт
                      </button>
                    </div>
                  );
                })}
              </div>

              <div
                className="mt-5 p-4 rounded-xl border border-dashed text-center"
                style={{ borderColor: "hsl(20, 10%, 20%)" }}
              >
                <Icon
                  name="Plus"
                  size={20}
                  className="mx-auto mb-2"
                  style={{ color: "hsl(43, 74%, 58%, 0.35)" }}
                />
                <p className="text-xs" style={{ color: "hsl(40, 10%, 42%)" }}>
                  Сохранение своих рецептов
                  <br />
                  появится в следующей версии
                </p>
              </div>
            </div>
          )}

          {/* ─ Order Panel ─ */}
          <div
            className="border-t p-4"
            style={{ borderColor: "hsl(20, 10%, 16%)", background: "hsl(20, 10%, 8%)" }}
          >
            {/* Nutrition */}
            <div className="grid grid-cols-4 gap-2 mb-4">
              {[
                { label: "Ккал", value: String(totalCalories) },
                { label: "Белки", value: `${totalProtein}г` },
                { label: "Жиры", value: `${totalFat}г` },
                { label: "Углев.", value: `${totalCarbs}г` },
              ].map((item) => (
                <div
                  key={item.label}
                  className="text-center py-2 rounded-lg"
                  style={{ background: "hsl(20, 10%, 11%)" }}
                >
                  <div className="text-sm font-semibold" style={{ color: "hsl(40, 20%, 82%)" }}>
                    {item.value}
                  </div>
                  <div className="text-xs" style={{ color: "hsl(40, 10%, 45%)" }}>
                    {item.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Price breakdown */}
            <div className="space-y-1 mb-3 text-xs" style={{ color: "hsl(40, 10%, 48%)" }}>
              <div className="flex justify-between">
                <span>Основа ({sizeData.diameter})</span>
                <span>{sizeData.price}₽</span>
              </div>
              {baseData.price > 0 && (
                <div className="flex justify-between">
                  <span>{baseData.label} борт</span>
                  <span>+{baseData.price}₽</span>
                </div>
              )}
              {selectedIngredients
                .filter((i) => i.price > 0)
                .map((i) => (
                  <div key={i.id} className="flex justify-between">
                    <span>{i.name}</span>
                    <span>+{i.price}₽</span>
                  </div>
                ))}
            </div>

            <div className="gold-divider opacity-25 mb-3" />

            <div className="flex items-center justify-between mb-4">
              <span
                className="text-xs tracking-widest uppercase"
                style={{ color: "hsl(40, 10%, 52%)" }}
              >
                Итого
              </span>
              <span className="font-display text-3xl text-gold">{totalPrice} ₽</span>
            </div>

            <button
              className="w-full py-3.5 rounded-xl font-semibold text-sm tracking-widest uppercase transition-all duration-200 active:scale-[0.98]"
              style={{
                background: "hsl(43, 74%, 58%)",
                color: "hsl(20, 10%, 6%)",
                boxShadow: "0 4px 24px rgba(200,160,50,0.3)",
              }}
            >
              Оформить заказ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
