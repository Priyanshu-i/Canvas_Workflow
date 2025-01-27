import type { Node, Edge } from "reactflow"
import ColorPicker from "./ColorPicker"
import LayersPanel from "./LayersPanel"
import AlignmentTools from "./AlignmentTools"

interface RightSidebarProps {
  selectedNode: Node | null
  updateNodeData: (nodeId: string, newData: Partial<Node["data"]>) => void
  nodes: Node[]
  setNodes: (nodes: Node[]) => void
  takeSnapshot: (nodes: Node[], edges: Edge[]) => void
  edges: Edge[]
}

export default function RightSidebar({
  selectedNode,
  updateNodeData,
  nodes,
  setNodes,
  takeSnapshot,
  edges,
}: RightSidebarProps) {
  return (
    <div className="w-64 bg-gray-100 p-4 space-y-4 overflow-y-auto h-full">
      {selectedNode && (
        <ColorPicker color={selectedNode.data.color} onChange={(color) => updateNodeData(selectedNode.id, { color })} />
      )}
      <LayersPanel nodes={nodes} setNodes={setNodes} takeSnapshot={takeSnapshot} edges={edges} />
      <AlignmentTools nodes={nodes} setNodes={setNodes} takeSnapshot={takeSnapshot} edges={edges} />
    </div>
  )
}

