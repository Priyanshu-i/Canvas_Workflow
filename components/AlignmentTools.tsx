import type { Node, Edge } from "reactflow"

interface AlignmentToolsProps {
  nodes: Node[]
  setNodes: (nodes: Node[]) => void
  takeSnapshot: (nodes: Node[], edges: Edge[]) => void
  edges: Edge[]
}

export default function AlignmentTools({ nodes, setNodes, takeSnapshot, edges }: AlignmentToolsProps) {
  const alignNodes = (alignment: "left" | "center" | "right" | "top" | "middle" | "bottom") => {
    if (nodes.length < 2) return

    const selectedNodes = nodes.filter((node) => node.selected)
    if (selectedNodes.length < 2) return

    const [firstNode, ...restNodes] = selectedNodes
    const { x: firstX, y: firstY } = firstNode.position

    const newNodes = nodes.map((node) => {
      if (!node.selected || node.id === firstNode.id) return node

      let newX = node.position.x
      let newY = node.position.y

      switch (alignment) {
        case "left":
          newX = firstX
          break
        case "center":
          newX = firstX + (firstNode.width || 0) / 2 - (node.width || 0) / 2
          break
        case "right":
          newX = firstX + (firstNode.width || 0) - (node.width || 0)
          break
        case "top":
          newY = firstY
          break
        case "middle":
          newY = firstY + (firstNode.height || 0) / 2 - (node.height || 0) / 2
          break
        case "bottom":
          newY = firstY + (firstNode.height || 0) - (node.height || 0)
          break
      }

      return {
        ...node,
        position: { x: newX, y: newY },
      }
    })

    setNodes(newNodes)
    takeSnapshot(newNodes, edges)
  }

  return (
    <div className="bg-white rounded shadow p-4">
      <h3 className="text-lg font-semibold mb-2">Alignment Tools</h3>
      <div className="grid grid-cols-3 gap-2">
        <button onClick={() => alignNodes("left")} className="p-2 bg-blue-500 text-white rounded">
          Left
        </button>
        <button onClick={() => alignNodes("center")} className="p-2 bg-blue-500 text-white rounded">
          Center
        </button>
        <button onClick={() => alignNodes("right")} className="p-2 bg-blue-500 text-white rounded">
          Right
        </button>
        <button onClick={() => alignNodes("top")} className="p-2 bg-blue-500 text-white rounded">
          Top
        </button>
        <button onClick={() => alignNodes("middle")} className="p-2 bg-blue-500 text-white rounded">
          Middle
        </button>
        <button onClick={() => alignNodes("bottom")} className="p-2 bg-blue-500 text-white rounded">
          Bottom
        </button>
      </div>
    </div>
  )
}

