function BrandInput({ brand, setBrand, onAdd }) {
  return (
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
        onClick={onAdd}
      >
        Agregar
      </button>
    </div>
  );
}

export default BrandInput;