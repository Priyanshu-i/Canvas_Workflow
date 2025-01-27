import { useState, useCallback, useRef } from "react"
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  type Node,
  type Edge,
  type Connection,
  type NodeTypes,
  useReactFlow,
  ReactFlowProvider,
  Panel,
  ConnectionMode,
  BackgroundVariant, // Import BackgroundVariant
} from "reactflow"
import "reactflow/dist/style.css"

import Sidebar from "./Sidebar"
import Topbar from "./Topbar"
import RightSidebar from "./RightSidebar"
import { RectangleNode, CircleNode, TextNode, ImageNode } from "./CustomNodes"
import { useUndo } from "@/hooks/useUndo"
import { Layout } from "lucide-react"

const nodeTypes: NodeTypes = {
  rectangle: RectangleNode,
  circle: CircleNode,
  text: TextNode,
  image: ImageNode,
}

function Flow() {
  const reactFlowWrapper = useRef<HTMLDivElement>(null)
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [selectedNode, setSelectedNode] = useState<Node | null>(null)
  const [showGrid, setShowGrid] = useState(true)
  const [isConnecting, setIsConnecting] = useState(false)
  const [showSmallLayout, setShowSmallLayout] = useState(false)
  const { project } = useReactFlow()

  const { undo, redo, takeSnapshot, canUndo, canRedo } = useUndo(setNodes, setEdges)

  const onConnect = useCallback(
    (params: Edge | Connection) => {
      const newEdges = addEdge(params, edges)
      setEdges(newEdges)
      takeSnapshot(nodes, newEdges)
    },
    [edges, nodes, setEdges, takeSnapshot],
  )

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = "move"
  }, [])

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()

      const type = event.dataTransfer.getData("application/reactflow")
      if (typeof type === "undefined" || !type) {
        return
      }

      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect()
      const position = reactFlowBounds
        ? project({
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top,
          })
        : { x: 0, y: 0 }

      const newNode: Node = {
        id: `${type}-${Date.now()}`,
        type,
        position,
        data: {
          label: `${type} node`,
          color: "#ffffff",
          text: `${type} node`,
          onDataChange: (data: Partial<Node["data"]>) => updateNodeData(newNode.id, data),
        },
      }

      setNodes((nds) => nds.concat(newNode))
      takeSnapshot([...nodes, newNode], edges)
    },
    [project, nodes, edges, setNodes, takeSnapshot],
  )

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node)
  }, [])

  const updateNodeData = useCallback(
    (nodeId: string, newData: Partial<Node["data"]>) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === nodeId) {
            return {
              ...node,
              data: {
                ...node.data,
                ...newData,
                onDataChange: (data: Partial<Node["data"]>) => updateNodeData(nodeId, data),
              },
            }
          }
          return node
        }),
      )
      takeSnapshot(nodes, edges)
    },
    [nodes, edges, setNodes, takeSnapshot],
  )

  const onNodesDelete = useCallback(
    (deletedNodes: Node[]) => {
      const newNodes = nodes.filter((node) => !deletedNodes.some((deletedNode) => deletedNode.id === node.id))
      setNodes(newNodes)
      takeSnapshot(newNodes, edges)
    },
    [nodes, edges, setNodes, takeSnapshot],
  )

  const toggleGrid = useCallback(() => {
    setShowGrid((prev) => !prev)
  }, [])

  const toggleConnecting = useCallback(() => {
    setIsConnecting((prev) => !prev)
  }, [])

  const saveFlow = useCallback(() => {
    const flow = { nodes, edges }
    const json = JSON.stringify(flow)
    localStorage.setItem("flow", json)
  }, [nodes, edges])

  const loadFlow = useCallback(() => {
    const json = localStorage.getItem("flow")
    if (json) {
      const flow = JSON.parse(json)
      setNodes(flow.nodes || [])
      setEdges(flow.edges || [])
      takeSnapshot(flow.nodes || [], flow.edges || [])
    }
  }, [setNodes, setEdges, takeSnapshot])

  const toggleSmallLayout = useCallback(() => {
    setShowSmallLayout((prev) => !prev)
  }, [])

  return (
    <div className="flex flex-col h-screen">
      <Topbar undo={undo} redo={redo} save={saveFlow} load={loadFlow} canUndo={canUndo} canRedo={canRedo} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar toggleGrid={toggleGrid} toggleConnecting={toggleConnecting} />
        <div className="flex-1 h-full relative" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDragOver={onDragOver}
            onDrop={onDrop}
            onNodeClick={onNodeClick}
            onNodesDelete={onNodesDelete}
            nodeTypes={nodeTypes}
            fitView
            deleteKeyCode="Delete"
            connectionMode={isConnecting ? ConnectionMode.Loose : ConnectionMode.Strict}
          >
            <Controls />
            <MiniMap />
            {showGrid && <Background variant={BackgroundVariant.Dots} gap={12} size={1} color="#aaa" />}
            <Panel position="bottom-center">{isConnecting ? "Connection mode: ON" : "Connection mode: OFF"}</Panel>
            <Panel position="bottom-right">
              <button
                className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200"
                onClick={toggleSmallLayout}
              >
                <Layout size={20} />
              </button>
            </Panel>
          </ReactFlow>
        </div>
        <RightSidebar
          selectedNode={selectedNode}
          updateNodeData={updateNodeData}
          nodes={nodes}
          setNodes={setNodes}
          takeSnapshot={takeSnapshot}
          edges={edges}
        />
      </div>
      {showSmallLayout && (
        <div className="fixed bottom-16 right-16 w-64 h-64 bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            fitView
            zoomOnScroll={false}
            panOnScroll={false}
            nodesDraggable={false}
            nodesConnectable={false}
            elementsSelectable={false}
          >
            <MiniMap />
          </ReactFlow>
        </div>
      )}
    </div>
  )
}

export default function FlowDesigner() {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  )
}