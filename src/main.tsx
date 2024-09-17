import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import '../public/assets/css/index.css'

createRoot(document.getElementById('search-extension-root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)