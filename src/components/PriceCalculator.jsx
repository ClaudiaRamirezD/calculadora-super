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
  const [piecesPerUnit, setPiecesPerUnit] = useState("");

  const [showBrandInput, setShowBrandInput] = useState(false);
  const [brand, setBrand] = useState("");
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  const unitLabel =
    unit === "g"
      ? "kilo"
      : unit === "ml"
      ? "litro"
      : unit === "p"
      ? "pieza"
      : unit;

  // Aplica descuentos a precio total
  const applyDiscount = (numPackages, pricePerPackage) => {
    let totalCost = numPackages * pricePerPackage;

    switch (discountType) {
      case "2x1":
        totalCost = Math.ceil(numPackages / 2) * pricePerPackage;
        break;
      case "3x2": {
        const setsOfThree = Math.floor(numPackages / 3);
        const remaining = numPackages % 3;
        totalCost = (setsOfThree * 2 + remaining) * pricePerPackage;
        break;
      }
      case "second-x": {
        const x = parseFloat(customDiscount) || 0;
        let cost = 0;
        for (let i = 0; i < numPackages; i++) {
          cost += i % 2 === 1 ? pricePerPackage * (1 - x / 100) : pricePerPackage;
        }
        totalCost = cost;
        break;
      }
      case "custom": {
        const d = parseFloat(customDiscount) || 0;
        totalCost = totalCost * (1 - d / 100);
        break;
      }
      default:
        break;
    }

    return totalCost;
  };

  // Precio por unidad (pieza real / kilo / litro)
  const getPricePerUnit = () => {
    if (!price || !amount) return 0;

    if (unit === "p") {
      // piezas
      const numPackages = parseInt(amount, 10) || 0;
      const piecesPerPack = parseFloat(piecesPerUnit) || 1;
      const totalUnits = numPackages * piecesPerPack;
      if (!totalUnits) return 0;
      const totalCost = applyDiscount(numPackages, parseFloat(price));
      return totalCost / totalUnits;
    } else if (unit === "g" || unit === "ml") {
      // gramos o mililitros → convertir a kilo/litro
      const value = parseFloat(amount) || 0;
      const totalUnits = value / 1000; // en kilos/litros
      if (!totalUnits) return 0;
      const totalCost = parseFloat(price); // precio del paquete/cantidad indicada
      return totalCost / totalUnits;
    }

    return 0;
  };

  // Total a pagar
  const getFinalPrice = () => {
    if (!price || !amount) return 0;

    if (unit === "p") {
      return applyDiscount(parseInt(amount, 10) || 0, parseFloat(price));
    } else if (unit === "g" || unit === "ml") {
      return parseFloat(price); // precio ya corresponde a esa cantidad
    }

    return 0;
  };

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
        piecesPerUnit={piecesPerUnit}
        setPiecesPerUnit={setPiecesPerUnit}
      />

      <div className="pt-4 border-t">
        <PriceSummary
          unitLabel={unitLabel}
          pricePerUnit={getPricePerUnit()}
          finalPrice={getFinalPrice()}
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
                    pricePerUnit: getPricePerUnit(),
                  },
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
