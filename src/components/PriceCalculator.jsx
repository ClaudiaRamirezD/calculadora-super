import { useState } from "react";

function PriceCalculator() {
  const [amount, setAmount] = useState("");
  const [unit, setUnit] = useState("g");
  const [price, setPrice] = useState("");
  const [discountType, setDiscountType] = useState("none");
  const [customDiscount, setCustomDiscount] = useState("");
  const [showBrandInput, setShowBrandInput] = useState(false);
  const [brand, setBrand] = useState("");
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  const normalize = (amount, unit) => {
    if (!amount) return 0;
    const value = parseFloat(amount);
    switch (unit) {
      case "g":
      case "ml":
        return value / 1000;
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

  const unitLabel = unit === "g" ? "kilo" : "litro";

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
            <option value="ml" className="bg-blue-violet3">
              mililitros (ml)
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
            Precio por {unitLabel}: ${getPricePerUnit().toFixed(2)}
          </p>
          <button
            onClick={() => setShowBrandInput((prev) => !prev)}
            className="text-white bg-rose2 size-9 rounded-full text-2xl font-bold flex items-stretch justify-center"
            aria-label="Agregar marca"
            type="button"
          >
            +
          </button>
        </div>

        {showBrandInput && (
          <div className="flex gap-2 mt-2">
            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="Marca o tienda"
              className="w-full p-2 rounded-lg border border-gray-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-azure2 focus:border-transparent"
            />
            <button
              type="button"
              className="bg-azure2 text-white px-3 rounded-lg font-bold"
              onClick={() => {
                if (brand.trim()) {
                  setOptions([
                    ...options,
                    {
                      brand: brand.trim(),
                      pricePerUnit: getPricePerUnit()
                    }
                  ]);
                  setBrand("");
                  setShowBrandInput(false);
                }
              }}
            >
              Agregar
            </button>
          </div>
        )}

        {options.length > 0 && (
          <div className="mt-4">
            <p className="text-white font-semibold mb-2">Opciones guardadas:</p>
            <ul className="space-y-2">
              {options.map((opt, idx) => (
                <li
                  key={idx}
                  className={`flex items-center justify-between p-2 rounded-lg ${
                    selectedOption === idx ? "bg-rose2" : "bg-blue-violet3"
                  }`}
                >
                  <span>
                    <span className="font-medium">{opt.brand}</span> — $
                    {opt.pricePerUnit.toFixed(2)} por kilo/litro
                  </span>
                  <button
                    className="ml-2 px-2 py-1 rounded bg-azure2 text-white text-xs"
                    onClick={() => setSelectedOption(idx)}
                  >
                    Elegir
                  </button>
                </li>
              ))}
            </ul>
            {selectedOption !== null && (
              <p className="mt-2 text-white">
                Seleccionado:{" "}
                <span className="font-bold">
                  {options[selectedOption].brand}
                </span>{" "}
                — ${options[selectedOption].pricePerUnit.toFixed(2)}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default PriceCalculator;
