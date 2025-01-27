/*"use client"

import type React from "react"
import { useState, useCallback, useRef } from "react"
import ReactFlow, {
  ReactFlowProvider,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  type Connection,
  type Edge,
  type NodeTypes,
  type EdgeTypes,
  MarkerType,
} from "reactflow"
import "reactflow/dist/style.css"
import Toolbar from "./Toolbar"
import CustomNode from "./CustomNode"
import CustomEdge from "./CustomEdge"
import { saveWorkflow, loadWorkflow } from "../utils/workflowStorage"

const nodeTypes: NodeTypes = {
  custom: CustomNode,
}

const edgeTypes: EdgeTypes = {
  custom: CustomEdge,
}

const WorkflowCanvas = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [isDrawing, setIsDrawing] = useState(false)
  const reactFlowWrapper = useRef<HTMLDivElement>(null)
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null)

  const onConnect = useCallback(
    (params: Edge | Connection) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: "custom",
            markerEnd: { type: MarkerType.ArrowClosed },
            animated: true,
          },
          eds,
        ),
      ),
    [setEdges],
  )

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = "move"
  }, [])

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()

      if (reactFlowWrapper.current && reactFlowInstance) {
        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()
        const type = event.dataTransfer.getData("application/reactflow")

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        })

        const newNode = {
          id: `node_${nodes.length + 1}`,
          type: "custom",
          position,
          data: { label: `${type} Node`, type },
        }

        setNodes((nds) => nds.concat(newNode))
      }
    },
    [reactFlowInstance, nodes, setNodes],
  )

  const handleSave = () => {
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject()
      saveWorkflow(flow)
    }
  }

  const handleLoad = () => {
    const flow = loadWorkflow()
    if (flow) {
      const { x = 0, y = 0, zoom = 1 } = flow.viewport
      setNodes(flow.nodes || [])
      setEdges(flow.edges || [])
      reactFlowInstance.setViewport({ x, y, zoom })
    }
  }

  const handlePaneClick = useCallback(
    (event: React.MouseEvent) => {
      if (isDrawing) {
        const newEdge: Edge = {
          id: `edge_${edges.length + 1}`,
          source: "tempSource",
          target: "tempTarget",
          type: "custom",
          markerEnd: { type: MarkerType.ArrowClosed },
          animated: true,
        }
        setEdges((eds) => eds.concat(newEdge))
        setIsDrawing(false)
      }
    },
    [isDrawing, edges, setEdges],
  )

  const handleDrawStart = () => {
    setIsDrawing(true)
  }

  return (
    <div className="w-full h-screen" ref={reactFlowWrapper}>
      <ReactFlowProvider>
        <Toolbar onSave={handleSave} onLoad={handleLoad} onDrawStart={handleDrawStart} />
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onPaneClick={handlePaneClick}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
          snapToGrid
          snapGrid={[15, 15]}
        >
          <Controls />
          <Background color="#aaa" gap={16} size={1} />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  )
}

export default WorkflowCanvas

*/