import { useState } from "react";

function PriceCalculator() {
  const [amount, setAmount] = useState("");
  const [unit, setUnit] = useState("g");
  const [price, setPrice] = useState("");
  const [discountType, setDiscountType] = useState("none");
  const [customDiscount, setCustomDiscount] = useState("");
  const [showBrandInput, setShowBrandInput] = useState(false);
  const [brand, setBrand] = useState("");

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
      className="bg-blue-violet2 text-white shadow-xl rounded-2xl p-6 w-full max-w-md space-y-6"
    >
      <h1 id="price-calc-title" className="text-2xl font-bold">
        Calculadora de Precio
      </h1>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="amount" className="block text-sm font-medium  mb-1">
            Cantidad
          </label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-azure2 focus:border-transparent"
            placeholder="Ej. 500"
          />
        </div>

        <div>
          <label
            htmlFor="unit"
            className="block text-sm font-medium text-white mb-1"
          >
            Unidad
          </label>
          <select
            id="unit"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-azure2 focus:border-transparent bg-blue-violet2
            cursor-pointer"
          >
            <option value="g" className="bg-blue-violet3">
              gramos (g)
            </option>
            <option value="kg" className="bg-blue-violet3">
              kilos (kg)
            </option>
            <option value="ml" className="bg-blue-violet3">
              mililitros (ml)
            </option>
            <option value="L" className="bg-blue-violet3">
              litros (L)
            </option>
          </select>
        </div>

        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-white mb-1"
          >
            Precio total ($)
          </label>
          <input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-azure2 focus:border-transparent"
            placeholder="Ej. 45.90"
          />
        </div>
      </form>

      <div className="space-y-2">
        <p className="font-semibold text-white">Tipo de descuento:</p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setDiscountType("none")}
            className={`px-3 py-1 rounded-full text-white ${
              discountType === "none" ? "bg-rose2" : "bg-gray-400"
            }`}
          >
            Sin descuento
          </button>
          <button
            type="button"
            onClick={() => setDiscountType("2x1")}
            className={`px-3 py-1 rounded-full text-white ${
              discountType === "2x1" ? "bg-rose2" : "bg-gray-400"
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
              discountType === "second-x" ? "bg-rose2" : "bg-gray-400"
            }`}
          >
            2° al (%)
          </button>
          <button
            type="button"
            onClick={() => setDiscountType("custom")}
            className={`px-3 py-1 rounded-full text-white ${
              discountType === "custom" ? "bg-rose2" : "bg-gray-400"
            }`}
          >
            Descuento (%)
          </button>
        </div>

        {(discountType === "second-x" || discountType === "custom") && (
          <div className="mt-6">
            <label
              htmlFor="customDiscount"
              className="block text-sm text-white mb-1 font-medium"
            >
              Ingresa el % de descuento
            </label>
            <input
              id="customDiscount"
              type="number"
              value={customDiscount}
              onChange={(e) => setCustomDiscount(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-azure2 focus:border-transparent"
              placeholder="Ej. 50"
            />
          </div>
        )}
      </div>

      <div className="pt-4 border-t">
        <div className="flex items-center justify-between">
          <p className="text-lg text-white font-bold">
            Precio por kilo/litro: ${getPricePerUnit().toFixed(2)}
          </p>

          <button
            onClick={() => setShowBrandInput((prev) => !prev)}
            className="text-white bg-rose2 size-9  rounded-full text-2xl font-bold  flex items-stretch justify-center"
            aria-label="Agregar marca"
            type="button"
          >
            +
          </button>
        </div>

        {showBrandInput && (
          <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            placeholder="Marca o tienda"
            className="mt-2 w-full p-2 rounded-lg border border-gray-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-azure2 focus:border-transparent"
          />
        )}

        {brand && (
          <p className="mt-2 text-sm text-white italic">
            Marca: <span className="font-medium">{brand}</span>
          </p>
        )}
      </div>
    </section>
  );
}

export default PriceCalculator;
