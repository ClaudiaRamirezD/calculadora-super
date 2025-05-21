import { useState } from "react";
import MainForm from "./MainForm";
import PriceSummary from "./PriceSummary";
import BrandInput from "./BrandInput";
import OptionsList from "./OptionsList";

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
          pricePerUnit={getPricePerUnit()}
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
                    pricePerUnit: getPricePerUnit()
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
