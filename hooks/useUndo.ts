import { useState, useCallback } from "react"
import type { Node, Edge } from "reactflow"

export function useUndo(setNodes: (nodes: Node[]) => void, setEdges: (edges: Edge[]) => void) {
  const [past, setPast] = useState<{ nodes: Node[]; edges: Edge[] }[]>([])
  const [future, setFuture] = useState<{ nodes: Node[]; edges: Edge[] }[]>([])

  const takeSnapshot = useCallback((nodes: Node[], edges: Edge[]) => {
    setPast((prev) => [...prev, { nodes, edges }])
    setFuture([])
  }, [])

  const undo = useCallback(() => {
    if (past.length === 0) return

    const previous = past[past.length - 1]
    const newPast = past.slice(0, past.length - 1)

    setNodes(previous.nodes)
    setEdges(previous.edges)
    setPast(newPast)
    setFuture((prev) => [{ nodes: previous.nodes, edges: previous.edges }, ...prev])
  }, [past, setNodes, setEdges])

  const redo = useCallback(() => {
    if (future.length === 0) return

    const next = future[0]
    const newFuture = future.slice(1)

    setNodes(next.nodes)
    setEdges(next.edges)
    setFuture(newFuture)
    setPast((prev) => [...prev, { nodes: next.nodes, edges: next.edges }])
  }, [future, setNodes, setEdges])

  const canUndo = past.length > 0
  const canRedo = future.length > 0

  return { undo, redo, takeSnapshot, canUndo, canRedo }
}

