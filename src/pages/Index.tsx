import { useState } from "react";
import { Base, Size, INGREDIENTS, SavedRecipe } from "@/components/pizza/types";
import PizzaBuilder from "@/components/pizza/PizzaBuilder";
import PizzaPanel from "@/components/pizza/PizzaPanel";

export default function Index() {
  const [selectedBase, setSelectedBase] = useState<Base>("classic");
  const [selectedSize, setSelectedSize] = useState<Size>("medium");
  const [selectedIds, setSelectedIds] = useState<string[]>(["tomato", "mozzarella"]);

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
  };

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
        <PizzaBuilder
          selectedBase={selectedBase}
          selectedSize={selectedSize}
          selectedIngredients={selectedIngredients}
          onBaseChange={setSelectedBase}
          onSizeChange={setSelectedSize}
        />
        <PizzaPanel
          selectedBase={selectedBase}
          selectedSize={selectedSize}
          selectedIngredients={selectedIngredients}
          selectedIds={selectedIds}
          onToggleIngredient={toggleIngredient}
          onLoadRecipe={loadRecipe}
        />
      </div>
    </div>
  );
}
