import type React from "react"
import Button from "./ui/Button"
import { Save, Upload, Square, Circle, Triangle, ArrowRight } from "lucide-react"

interface ToolbarProps {
  onSave: () => void
  onLoad: () => void
  onDrawStart: () => void
}

const Toolbar: React.FC<ToolbarProps> = ({ onSave, onLoad, onDrawStart }) => {
  const onDragStart = (event: React.DragEvent<HTMLButtonElement>, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType)
    event.dataTransfer.effectAllowed = "move"
  }

  return (
    <div className="absolute top-4 left-4 z-10 flex space-x-2 bg-white p-2 rounded-md shadow-md">
      <Button variant="outline" size="icon" onClick={onSave} title="Save Workflow">
        <Save className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon" onClick={onLoad} title="Load Workflow">
        <Upload className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onDragStart={(event) => onDragStart(event, "square")}
        draggable
        title="Add Square Node"
      >
        <Square className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onDragStart={(event) => onDragStart(event, "circle")}
        draggable
        title="Add Circle Node"
      >
        <Circle className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onDragStart={(event) => onDragStart(event, "triangle")}
        draggable
        title="Add Triangle Node"
      >
        <Triangle className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon" onClick={onDrawStart} title="Draw Arrow">
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  )
}

export default Toolbar

