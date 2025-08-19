import { useState } from "react";
import MainForm from "./MainForm";
import PriceSummary from "./PriceSummary";
import BrandInput from "./BrandInput";
import OptionsList from "./OptionsList";

const UNIT_LABELS = {
  g: "kilo",
  ml: "litro",
  p: "pieza"
};

function normalize(amount, unit) {
  const value = parseFloat(amount);
  if (!value || value < 0) return 0;
  switch (unit) {
    case "g":
    case "ml":
      return value / 1000;
    case "p":
      return Math.floor(value);
    default:
      return value;
  }
}

function applyDiscount(price, discountType, customDiscount) {
  const original = parseFloat(price);
  if (!original || original < 0) return 0;
  switch (discountType) {
    case "2x1":
      return original / 2;
    case "3x2":
      return original * (2 / 3);
    case "second-x": {
      const x = parseFloat(customDiscount) || 0;
      return (original * (1 + x / 100)) / 2;
    }
    case "custom": {
      const d = parseFloat(customDiscount) || 0;
      return original * (1 - d / 100);
    }
    default:
      return original;
  }
}

function getPricePerUnit(amount, unit, price, discountType, customDiscount) {
  const normalized = normalize(amount, unit);
  if (!normalized || !price) return 0;
  const finalPrice = applyDiscount(price, discountType, customDiscount);
  return finalPrice / normalized;
}

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

  const unitLabel = UNIT_LABELS[unit] || unit;
  const pricePerUnit = getPricePerUnit(amount, unit, price, discountType, customDiscount);

  return (
    <section
      aria-labelledby="price-calc-title"
      className="bg-blue-violet2 text-white shadow-xl rounded-2xl p-6 w-full max-w-md space-y-6"
    >
      <h1 id="price-calc-title" className="text-2xl font-bold">
        Calculadora de Precio
      </h1>

      <MainForm
        amount={amount}
        setAmount={setAmount}
        unit={unit}
        setUnit={setUnit}
        price={price}
        setPrice={setPrice}
        discountType={discountType}
        setDiscountType={setDiscountType}
        customDiscount={customDiscount}
        setCustomDiscount={setCustomDiscount}
      />

      <div className="pt-4 border-t">
        <PriceSummary
          unitLabel={unitLabel}
          pricePerUnit={pricePerUnit}
          onAddBrand={() => setShowBrandInput((prev) => !prev)}
        />

        {showBrandInput && (
          <BrandInput
            brand={brand}
            setBrand={setBrand}
            onAdd={() => {
              if (brand.trim()) {
                setOptions([
                  ...options,
                  {
                    brand: brand.trim(),
                    pricePerUnit
                  }
                ]);
                setBrand("");
                setShowBrandInput(false);
              }
            }}
          />
        )}

        {options.length > 0 && (
          <OptionsList
            options={options}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            unitLabel={unitLabel}
            onRemoveOption={(idx) => {
              setOptions(options.filter((_, i) => i !== idx));
              if (selectedOption === idx) setSelectedOption(null);
              else if (selectedOption > idx)
                setSelectedOption(selectedOption - 1);
            }}
          />
        )}
      </div>
    </section>
  );
}

export default PriceCalculator;