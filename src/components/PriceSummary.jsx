function PriceSummary({ unitLabel, pricePerUnit, onAddBrand }) {
  return (
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
  );
}

export default PriceSummary;
