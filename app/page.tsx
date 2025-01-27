"use client"

import dynamic from "next/dynamic"

const FlowDesigner = dynamic(() => import("@/components/FlowDesigner"), {
  ssr: false,
})

export default function Home() {
  return (
    <main className="flex flex-col h-screen">
      <FlowDesigner />
    </main>
  )
}

