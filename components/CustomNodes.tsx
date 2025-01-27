import { useState, useCallback } from "react"
import { Handle, Position, type NodeProps, NodeResizer } from "reactflow"

export function RectangleNode({ data, selected }: NodeProps) {
  const [isEditing, setIsEditing] = useState(false)

  const handleDoubleClick = useCallback(() => {
    setIsEditing(true)
  }, [])

  const handleBlur = useCallback(() => {
    setIsEditing(false)
  }, [])

  return (
    <>
      <NodeResizer minWidth={100} minHeight={30} isVisible={selected} />
      <Handle type="target" position={Position.Top} />
      <div
        className="w-full h-full flex items-center justify-center"
        style={{ backgroundColor: data.color }}
        onDoubleClick={handleDoubleClick}
      >
        {isEditing ? (
          <input
            type="text"
            defaultValue={data.label}
            onBlur={(e) => {
              data.onDataChange({ label: e.target.value })
              handleBlur()
            }}
            autoFocus
            className="w-full h-full text-center bg-transparent border-none"
          />
        ) : (
          data.label
        )}
      </div>
      <Handle type="source" position={Position.Bottom} />
    </>
  )
}

export function CircleNode({ data, selected }: NodeProps) {
  const [isEditing, setIsEditing] = useState(false)

  const handleDoubleClick = useCallback(() => {
    setIsEditing(true)
  }, [])

  const handleBlur = useCallback(() => {
    setIsEditing(false)
  }, [])

  return (
    <>
      <NodeResizer minWidth={50} minHeight={50} isVisible={selected} />
      <Handle type="target" position={Position.Top} />
      <div
        className="w-full h-full rounded-full flex items-center justify-center"
        style={{ backgroundColor: data.color }}
        onDoubleClick={handleDoubleClick}
      >
        {isEditing ? (
          <input
            type="text"
            defaultValue={data.label}
            onBlur={(e) => {
              data.onDataChange({ label: e.target.value })
              handleBlur()
            }}
            autoFocus
            className="w-full h-full text-center bg-transparent border-none"
          />
        ) : (
          data.label
        )}
      </div>
      <Handle type="source" position={Position.Bottom} />
    </>
  )
}

export function TextNode({ data, selected }: NodeProps) {
  const [isEditing, setIsEditing] = useState(false)

  const handleDoubleClick = useCallback(() => {
    setIsEditing(true)
  }, [])

  const handleBlur = useCallback(() => {
    setIsEditing(false)
  }, [])

  return (
    <>
      <NodeResizer minWidth={100} minHeight={30} isVisible={selected} />
      <Handle type="target" position={Position.Top} />
      <div className="p-2 rounded" style={{ backgroundColor: data.color }} onDoubleClick={handleDoubleClick}>
        {isEditing ? (
          <textarea
            defaultValue={data.text}
            onChange={(e) => data.onDataChange({ text: e.target.value })}
            onBlur={handleBlur}
            autoFocus
            className="w-full h-full bg-transparent border-none outline-none resize-none"
          />
        ) : (
          <div>{data.text}</div>
        )}
      </div>
      <Handle type="source" position={Position.Bottom} />
    </>
  )
}

export function ImageNode({ data, selected }: NodeProps) {
  return (
    <>
      <NodeResizer minWidth={100} minHeight={100} isVisible={selected} />
      <Handle type="target" position={Position.Top} />
      <div className="w-full h-full">
        <img src={data.src || "/placeholder.svg"} alt={data.alt} className="w-full h-full object-cover" />
      </div>
      <Handle type="source" position={Position.Bottom} />
    </>
  )
}

