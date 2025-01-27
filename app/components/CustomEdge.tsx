import type React from "react"
import { type EdgeProps, getBezierPath, EdgeText } from "reactflow"

const CustomEdge: React.FC<EdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  })

  return (
    <>
      <path id={id} style={style} className="react-flow__edge-path" d={edgePath} markerEnd={markerEnd} />
      <EdgeText
        x={labelX}
        y={labelY}
        label="→"
        labelStyle={{ fill: "black", fontWeight: 700 }}
        labelShowBg
        labelBgStyle={{ fill: "white" }}
        labelBgPadding={[2, 4]}
        labelBgBorderRadius={2}
      />
    </>
  )
}

export default CustomEdge

