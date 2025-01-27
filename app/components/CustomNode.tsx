import type React from "react"
import { useState, useCallback } from "react"
import { Handle, Position, type NodeProps } from "reactflow"
import { Square, Circle, Triangle } from "lucide-react"

const CustomNode: React.FC<NodeProps> = ({ data, isConnectable }) => {
  const [label, setLabel] = useState(data.label)

  const onChange = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    setLabel(evt.target.value)
  }, [])

  const getNodeShape = () => {
    switch (data.type) {
      case "square":
        return <Square className="h-8 w-8 text-blue-500" />
      case "circle":
        return <Circle className="h-8 w-8 text-green-500" />
      case "triangle":
        return <Triangle className="h-8 w-8 text-red-500" />
      default:
        return <Square className="h-8 w-8 text-gray-500" />
    }
  }

  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-gray-200">
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} className="w-3 h-3 bg-blue-500" />
      <div className="flex items-center">
        {getNodeShape()}
        <input
          value={label}
          onChange={onChange}
          className="text-lg font-bold ml-2 bg-transparent border-none outline-none"
        />
      </div>
      <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} className="w-3 h-3 bg-blue-500" />
    </div>
  )
}

export default CustomNode

