'use client'

import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'
import { InstallServiceModal } from './InstallServiceModal'
import { MaintenanceModal } from './MaintenanceModal'
import { SolarCleaningModal } from './SolarCleaningModal'
import type { SymptomId } from '@/lib/services/maintenance'

export type ServiceModalKind = 'install' | 'maintenance' | 'solar'
type OpenFn = (kind: ServiceModalKind, opts?: { symptom?: SymptomId }) => void

const OpenServiceModal = createContext<OpenFn>(() => {})

export function useOpenServiceModal(): OpenFn {
  return useContext(OpenServiceModal)
}

/** Mantém os pop-ups de orçamento dos serviços e permite abri-los de qualquer seção. */
export function ServiceModalsProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{ kind: ServiceModalKind | null; symptom?: SymptomId }>({ kind: null })
  const open = useCallback<OpenFn>((kind, opts) => setState({ kind, symptom: opts?.symptom }), [])
  const close = useCallback(() => setState((s) => ({ ...s, kind: null })), [])

  return (
    <OpenServiceModal.Provider value={open}>
      {children}
      <InstallServiceModal open={state.kind === 'install'} onClose={close} />
      <MaintenanceModal open={state.kind === 'maintenance'} onClose={close} initialSymptom={state.symptom} />
      <SolarCleaningModal open={state.kind === 'solar'} onClose={close} />
    </OpenServiceModal.Provider>
  )
}
