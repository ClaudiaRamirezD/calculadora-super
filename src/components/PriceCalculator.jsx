import { useState } from "react";

function PriceCalculator() {
  const [amount, setAmount] = useState("");
  const [unit, setUnit] = useState("g");
  const [price, setPrice] = useState("");
  const [discountType, setDiscountType] = useState("none");
  const [customDiscount, setCustomDiscount] = useState("");

  const normalize = (amount, unit) => {
    if (!amount) return 0;
    const value = parseFloat(amount);
    switch (unit) {
      case "g":
      case "ml":
        return value / 1000;
      case "kg":
      case "L":
        return value;
      default:
        return value;
    }
  };

  const applyDiscount = (price) => {
    const original = parseFloat(price);
    switch (discountType) {
      case "2x1":
        return original / 2;
      case "3x2":
        return original * (2 / 3);
      case "second-x":
        const x = parseFloat(customDiscount) || 0;
        return (original * (1 + x / 100)) / 2;
      case "custom":
        const d = parseFloat(customDiscount) || 0;
        return original * (1 - d / 100);
      default:
        return original;
    }
  };

  const getPricePerUnit = () => {
    const normalized = normalize(amount, unit);
    if (!normalized || !price) return 0;
    const finalPrice = applyDiscount(price);
    return finalPrice / normalized;
  };

  return (
    <section
      aria-labelledby="price-calc-title"
      className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md space-y-6"
    >
      <h1
        id="price-calc-title"
        className="text-2xl font-bold text-blue-violet2"
      >
        Calculadora de Precio
      </h1>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Cantidad
          </label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-violet2"
            placeholder="Ej. 500"
          />
        </div>

        <div>
          <label
            htmlFor="unit"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Unidad
          </label>
          <select
            id="unit"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-violet2"
          >
            <option value="g">gramos (g)</option>
            <option value="kg">kilos (kg)</option>
            <option value="ml">mililitros (ml)</option>
            <option value="L">litros (L)</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Precio total ($)
          </label>
          <input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-violet2"
            placeholder="Ej. 45.90"
          />
        </div>
      </form>

      <div className="space-y-2">
        <p className="font-semibold text-gray-700">Tipo de descuento:</p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setDiscountType("none")}
            className={`px-3 py-1 rounded-full text-white ${
              discountType === "none" ? "bg-blue-violet2" : "bg-gray-400"
            }`}
          >
            Sin descuento
          </button>
          <button
            type="button"
            onClick={() => setDiscountType("2x1")}
            className={`px-3 py-1 rounded-full text-white ${
              discountType === "2x1" ? "bg-orange-pantone2" : "bg-gray-400"
            }`}
          >
            2x1
          </button>
          <button
            type="button"
            onClick={() => setDiscountType("3x2")}
            className={`px-3 py-1 rounded-full text-white ${
              discountType === "3x2" ? "bg-rose2" : "bg-gray-400"
            }`}
          >
            3x2
          </button>
          <button
            type="button"
            onClick={() => setDiscountType("second-x")}
            className={`px-3 py-1 rounded-full text-white ${
              discountType === "second-x" ? "bg-amber2" : "bg-gray-400"
            }`}
          >
            2° al (%)
          </button>
          <button
            type="button"
            onClick={() => setDiscountType("custom")}
            className={`px-3 py-1 rounded-full text-white ${
              discountType === "custom" ? "bg-azure2" : "bg-gray-400"
            }`}
          >
            Descuento (%)
          </button>
        </div>

        {(discountType === "second-x" || discountType === "custom") && (
          <div className="mt-2">
            <label
              htmlFor="customDiscount"
              className="block text-sm text-gray-700 mb-1"
            >
              Ingresá el % de descuento
            </label>
            <input
              id="customDiscount"
              type="number"
              value={customDiscount}
              onChange={(e) => setCustomDiscount(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-violet2"
              placeholder="Ej. 50"
            />
          </div>
        )}
      </div>

      <div className="pt-4 border-t">
        <p className="text-lg text-orange-pantone2 font-semibold">
          Precio por kilo/litro: ${getPricePerUnit().toFixed(2)}
        </p>
      </div>
    </section>
  );
}

export default PriceCalculator;
