function OptionsList({
  options,
  selectedOption,
  setSelectedOption,
  unitLabel,
  onRemoveOption,
}) {
  return (
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
              {opt.pricePerUnit.toFixed(2)} por {unitLabel}
            </span>
            <button
              className="ml-2 px-2 py-1 rounded bg-azure2 text-white text-xs"
              onClick={() => setSelectedOption(idx)}
            >
              Elegir
            </button>
            <button
              className=" size-9 rounded-full bg-rose2 text-white text-xl font-bold"
              aria-label="Eliminar opción"
              onClick={() => onRemoveOption(idx)}
              type="button"
            >
              ×
            </button>
          </li>
        ))}
      </ul>
      {selectedOption !== null && (
        <p className="mt-2 text-white">
          Seleccionado:{" "}
          <span className="font-bold">{options[selectedOption].brand}</span> — $
          {options[selectedOption].pricePerUnit.toFixed(2)} por {unitLabel}
        </p>
      )}
    </div>
  );
}

export default OptionsList;