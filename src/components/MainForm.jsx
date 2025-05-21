import DiscountButtons from "./DiscountButtons";

function MainForm({
  amount,
  setAmount,
  unit,
  setUnit,
  price,
  setPrice,
  discountType,
  setDiscountType,
  customDiscount,
  setCustomDiscount
}) {
  return (
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
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-azure2 focus:border-transparent cursor-pointer"
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
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-azure2 focus:border-transparent bg-blue-violet2 cursor-pointer"
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
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-azure2 focus:border-transparent cursor-pointer"
          placeholder="Ej. 45.90"
        />
      </div>

      <DiscountButtons
        discountType={discountType}
        setDiscountType={setDiscountType}
      />

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
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-azure2 focus:border-transparent cursor-pointer"
            placeholder="Ej. 50"
          />
        </div>
      )}
    </form>
  );
}

export default MainForm;