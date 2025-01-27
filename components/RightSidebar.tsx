import type { Node, Edge } from "reactflow";
import ColorPicker from "./ColorPicker";
import LayersPanel from "./LayersPanel";
import AlignmentTools from "./AlignmentTools";

interface RightSidebarProps {
  selectedNode: Node | null;
  updateNodeData: (nodeId: string, newData: Partial<Node["data"]>) => void;
  nodes: Node[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>; // Correct typing for setNodes
  takeSnapshot: (nodes: Node[], edges: Edge[]) => void;
  edges: Edge[];
}

export default function RightSidebar({
  selectedNode,
  updateNodeData,
  nodes,
  setNodes,
  takeSnapshot,
  edges,
}: RightSidebarProps) {
  const handleColorChange = (color: string) => {
    if (selectedNode) {
      // Update the node immutably
      setNodes((prevNodes) =>
        prevNodes.map((node) =>
          node.id === selectedNode.id
            ? { ...node, data: { ...node.data, color } }
            : node
        )
      );
    }
  };

  return (
    <div className="w-64 bg-gray-100 p-4 space-y-4 overflow-y-auto h-full">
      {selectedNode && (
        <ColorPicker
          color={selectedNode.data.color}
          onChange={handleColorChange}
        />
      )}
      <LayersPanel
        nodes={nodes}
        setNodes={setNodes}
        takeSnapshot={takeSnapshot}
        edges={edges}
      />
      <AlignmentTools
        nodes={nodes}
        setNodes={setNodes}
        takeSnapshot={takeSnapshot}
        edges={edges}
      />
    </div>
  );
}
