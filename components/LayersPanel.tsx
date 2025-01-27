import { useState } from "react"
import type { Node, Edge } from "reactflow"

interface LayersPanelProps {
  nodes: Node[]
  setNodes: (nodes: Node[]) => void
  takeSnapshot: (nodes: Node[], edges: Edge[]) => void
  edges: Edge[]
}

export default function LayersPanel({ nodes, setNodes, takeSnapshot, edges }: LayersPanelProps) {
  const [isOpen, setIsOpen] = useState(false)

  const moveNode = (id: string, direction: "up" | "down") => {
    setNodes((prevNodes) => {
      const index = prevNodes.findIndex((node) => node.id === id)
      if (index === -1) return prevNodes

      const newNodes = [...prevNodes]
      const [movedNode] = newNodes.splice(index, 1)
      const newIndex = direction === "up" ? Math.max(0, index - 1) : Math.min(newNodes.length, index + 1)

      newNodes.splice(newIndex, 0, movedNode)
      takeSnapshot(newNodes, edges)
      return newNodes
    })
  }

  return (
    <div className="bg-white rounded shadow">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full mb-2 p-2 rounded bg-gray-200">
        {isOpen ? "Close" : "Open"} Layers Panel
      </button>
      {isOpen && (
        <ul className="space-y-2">
          {nodes.map((node) => (
            <li key={node.id} className="flex items-center justify-between p-2 bg-gray-100 rounded">
              <span>{node.data.label}</span>
              <div>
                <button
                  onClick={() => moveNode(node.id, "up")}
                  className="px-2 py-1 text-sm bg-blue-500 text-white rounded mr-1"
                >
                  ↑
                </button>
                <button
                  onClick={() => moveNode(node.id, "down")}
                  className="px-2 py-1 text-sm bg-blue-500 text-white rounded"
                >
                  ↓
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

