import { createContext, useContext, ReactNode } from 'react'

export const  createOptionalContext = <ContextValue = unknown>(initialValue: ContextValue | null = null) => {
  const Context = createContext<ContextValue | null>(initialValue)

  const useOptionalContext = () => useContext(Context)

  const Provider = ({ children, value }: { value: ContextValue; children: ReactNode }) => (
    <Context.Provider value={value}>{children}</Context.Provider>
  )

  return [Provider, useOptionalContext] as const
}
