import { Base, Size, Ingredient, SIZES } from "./types";

interface PizzaVisualProps {
  base: Base;
  size: Size;
  selectedIngredients: Ingredient[];
}

export default function PizzaVisual({ base, size, selectedIngredients }: PizzaVisualProps) {
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
