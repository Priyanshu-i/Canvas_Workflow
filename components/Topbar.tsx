interface TopbarProps {
    undo: () => void
    redo: () => void
    save: () => void
    load: () => void
    canUndo: boolean
    canRedo: boolean
  }
  
  export default function Topbar({ undo, redo, save, load, canUndo, canRedo }: TopbarProps) {
    return (
      <div className="flex justify-between items-center p-4 bg-gray-200">
        <h1 className="text-2xl font-bold">FlowDesigner</h1>
        <div className="space-x-2">
          <button
            onClick={undo}
            disabled={!canUndo}
            className="px-4 py-2 bg-blue-500 text-white rounded-md transition-all duration-200 ease-in-out hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Undo
          </button>
          <button
            onClick={redo}
            disabled={!canRedo}
            className="px-4 py-2 bg-blue-500 text-white rounded-md transition-all duration-200 ease-in-out hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Redo
          </button>
          <button
            onClick={save}
            className="px-4 py-2 bg-green-500 text-white rounded-md transition-all duration-200 ease-in-out hover:bg-green-600"
          >
            Save
          </button>
          <button
            onClick={load}
            className="px-4 py-2 bg-yellow-500 text-white rounded-md transition-all duration-200 ease-in-out hover:bg-yellow-600"
          >
            Load
          </button>
        </div>
      </div>
    )
  }
  
  