import { useState } from "react"

interface ColorPickerProps {
  color: string
  onChange: (color: string) => void
}

export default function ColorPicker({ color, onChange }: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false)

  const colors = [
    "#ffffff",
    "#f8f9fa",
    "#e9ecef",
    "#dee2e6",
    "#ced4da",
    "#adb5bd",
    "#6c757d",
    "#495057",
    "#343a40",
    "#212529",
    "#f8d7da",
    "#f1aeb5",
    "#ea868f",
    "#e35d6a",
    "#dc3545",
    "#b02a37",
    "#842029",
    "#d1e7dd",
    "#a3cfbb",
    "#75b798",
    "#479f76",
    "#198754",
    "#146c43",
    "#0f5132",
    "#cff4fc",
    "#9eeaf9",
    "#6edff6",
    "#3dd5f3",
    "#0dcaf0",
    "#0aa2c0",
    "#087990",
    "#fff3cd",
    "#ffe69c",
    "#ffda6a",
    "#ffd139",
    "#ffc107",
    "#cc9a06",
    "#997404",
  ]

  return (
    <div className="bg-white p-4 rounded shadow">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full mb-2 p-2 rounded" style={{ backgroundColor: color }}>
        {isOpen ? "Close" : "Open"} Color Picker
      </button>
      {isOpen && (
        <div className="grid grid-cols-5 gap-2">
          {colors.map((c) => (
            <div
              key={c}
              className="w-8 h-8 rounded-full cursor-pointer"
              style={{ backgroundColor: c }}
              onClick={() => onChange(c)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

