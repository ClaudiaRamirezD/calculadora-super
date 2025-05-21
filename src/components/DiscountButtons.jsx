function DiscountButtons({ discountType, setDiscountType }) {
  return (
    <div className="space-y-2">
      <p className="font-semibold text-white">Tipo de descuento:</p>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setDiscountType("none")}
          className={`px-3 py-1 rounded-full text-white cursor-pointer ${
            discountType === "none" ? "bg-rose2" : "bg-gray-400"
          }`}
        >
          Sin descuento
        </button>
        <button
          type="button"
          onClick={() => setDiscountType("2x1")}
          className={`px-3 py-1 rounded-full text-white cursor-pointer ${
            discountType === "2x1" ? "bg-rose2" : "bg-gray-400"
          }`}
        >
          2x1
        </button>
        <button
          type="button"
          onClick={() => setDiscountType("3x2")}
          className={`px-3 py-1 rounded-full text-white cursor-pointer ${
            discountType === "3x2" ? "bg-rose2" : "bg-gray-400"
          }`}
        >
          3x2
        </button>
        <button
          type="button"
          onClick={() => setDiscountType("second-x")}
          className={`px-3 py-1 rounded-full text-white cursor-pointer ${
            discountType === "second-x" ? "bg-rose2" : "bg-gray-400"
          }`}
        >
          2° al (%)
        </button>
        <button
          type="button"
          onClick={() => setDiscountType("custom")}
          className={`px-3 py-1 rounded-full text-white cursor-pointer ${
            discountType === "custom" ? "bg-rose2" : "bg-gray-400"
          }`}
        >
          Descuento (%)
        </button>
      </div>
    </div>
  );
}

export default DiscountButtons;