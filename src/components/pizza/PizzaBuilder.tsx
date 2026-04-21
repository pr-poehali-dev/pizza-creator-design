import { Base, Size, Ingredient, BASES, SIZES } from "./types";
import PizzaVisual from "./PizzaVisual";

interface PizzaBuilderProps {
  selectedBase: Base;
  selectedSize: Size;
  selectedIngredients: Ingredient[];
  onBaseChange: (base: Base) => void;
  onSizeChange: (size: Size) => void;
}

export default function PizzaBuilder({
  selectedBase,
  selectedSize,
  selectedIngredients,
  onBaseChange,
  onSizeChange,
}: PizzaBuilderProps) {
  return (
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
              onClick={() => onSizeChange(s.id)}
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
              onClick={() => onBaseChange(b.id)}
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
  );
}
