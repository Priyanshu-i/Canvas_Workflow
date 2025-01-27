import { Square, Circle, Type, Image, Grid, ArrowUpRight } from "lucide-react"

interface SidebarProps {
  toggleGrid: () => void
  toggleConnecting: () => void
}

export default function Sidebar({ toggleGrid, toggleConnecting }: SidebarProps) {
  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType)
    event.dataTransfer.effectAllowed = "move"
  }

  return (
    <aside className="w-64 bg-gray-100 p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Add Nodes</h2>
      <div className="space-y-4">
        <div
          className="flex items-center p-2 bg-white rounded shadow cursor-move"
          onDragStart={(event) => onDragStart(event, "rectangle")}
          draggable
        >
          <Square className="mr-2 h-4 w-4" />
          Rectangle
        </div>
        <div
          className="flex items-center p-2 bg-white rounded shadow cursor-move"
          onDragStart={(event) => onDragStart(event, "circle")}
          draggable
        >
          <Circle className="mr-2 h-4 w-4" />
          Circle
        </div>
        <div
          className="flex items-center p-2 bg-white rounded shadow cursor-move"
          onDragStart={(event) => onDragStart(event, "text")}
          draggable
        >
          <Type className="mr-2 h-4 w-4" />
          Text
        </div>
        <div
          className="flex items-center p-2 bg-white rounded shadow cursor-move"
          onDragStart={(event) => onDragStart(event, "image")}
          draggable
        >
          <Image className="mr-2 h-4 w-4" />
          Image
        </div>
      </div>
      <h2 className="text-lg font-semibold my-4">Tools</h2>
      <div className="space-y-4">
        <button className="flex items-center p-2 bg-white rounded shadow w-full" onClick={toggleGrid}>
          <Grid className="mr-2 h-4 w-4" />
          Toggle Grid
        </button>
        <button className="flex items-center p-2 bg-white rounded shadow w-full" onClick={toggleConnecting}>
          <ArrowUpRight className="mr-2 h-4 w-4" />
          Connect Nodes
        </button>
      </div>
    </aside>
  )
}

