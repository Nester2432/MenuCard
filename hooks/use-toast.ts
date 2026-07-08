"use client"

import * as React from "react"
import type { ToastProps } from "@/components/ui/toast"

const TOAST_LIMIT = 3
const TOAST_REMOVE_DELAY = 3000

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  variant?: "default" | "destructive"
}

let count = 0
function genId() { return `toast-${++count}` }

type Action =
  | { type: "ADD_TOAST"; toast: ToasterToast }
  | { type: "DISMISS_TOAST"; toastId: string }
  | { type: "REMOVE_TOAST"; toastId: string }

interface State { toasts: ToasterToast[] }

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_TOAST":
      return { toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT) }
    case "DISMISS_TOAST":
      if (!toastTimeouts.has(action.toastId)) {
        toastTimeouts.set(action.toastId, setTimeout(() => {
          dispatch({ type: "REMOVE_TOAST", toastId: action.toastId })
        }, TOAST_REMOVE_DELAY))
      }
      return { toasts: state.toasts.map(t => t.id === action.toastId ? { ...t, open: false } : t) }
    case "REMOVE_TOAST":
      return { toasts: state.toasts.filter(t => t.id !== action.toastId) }
  }
}

const listeners: Array<(state: State) => void> = []
let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach(l => l(memoryState))
}

function toast({ title, description, variant = "default" }: {
  title?: string; description?: string; variant?: "default" | "destructive"
}) {
  const id = genId()
  dispatch({ type: "ADD_TOAST", toast: { id, title, description, variant, open: true, onOpenChange: (open) => { if (!open) dispatch({ type: "DISMISS_TOAST", toastId: id }) } } })
  setTimeout(() => dispatch({ type: "DISMISS_TOAST", toastId: id }), TOAST_REMOVE_DELAY)
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState)
  React.useEffect(() => {
    listeners.push(setState)
    return () => { const idx = listeners.indexOf(setState); if (idx > -1) listeners.splice(idx, 1) }
  }, [])
  return { toasts: state.toasts, toast }
}

export { useToast, toast }
