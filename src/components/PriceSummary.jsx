function PriceSummary({ unitLabel, pricePerUnit, finalPrice, onAddBrand }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <p className="text-lg text-white font-bold">
          Precio por {unitLabel}: ${pricePerUnit.toFixed(2)}
        </p>
        <button
          onClick={onAddBrand}
          className="text-white cursor-pointer bg-rose2 size-9 rounded-full text-2xl font-bold flex items-stretch justify-center"
          aria-label="Agregar marca"
          type="button"
        >
          +
        </button>
      </div>

      <p className="text-md text-gray-200 font-semibold">
        Total a pagar: ${finalPrice.toFixed(2)}
      </p>
    </div>
  );
}

export default PriceSummary;