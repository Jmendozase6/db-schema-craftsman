import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Workbench } from './ui/pages/Workbench.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Workbench />
  </StrictMode>,
)
