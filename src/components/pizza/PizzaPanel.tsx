import { useState } from "react";
import Icon from "@/components/ui/icon";
import {
  Base,
  Size,
  Ingredient,
  SavedRecipe,
  BASES,
  SIZES,
  INGREDIENTS,
  CATEGORIES,
  SAVED_RECIPES,
} from "./types";

interface PizzaPanelProps {
  selectedBase: Base;
  selectedSize: Size;
  selectedIngredients: Ingredient[];
  selectedIds: string[];
  onToggleIngredient: (id: string) => void;
  onLoadRecipe: (recipe: SavedRecipe) => void;
}

export default function PizzaPanel({
  selectedBase,
  selectedSize,
  selectedIngredients,
  selectedIds,
  onToggleIngredient,
  onLoadRecipe,
}: PizzaPanelProps) {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [activeTab, setActiveTab] = useState<"build" | "saved">("build");

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
            <Icon name={tab === "build" ? "ChefHat" : "BookOpen"} size={14} />
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
                    onClick={() => onToggleIngredient(ing.id)}
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
                    onClick={() => onLoadRecipe(recipe)}
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
  );
}
