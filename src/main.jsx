import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { getPhaseByTime } from './util/questions'

// Apply the time-based theme before first paint to avoid a flash of the wrong theme.
document.documentElement.dataset.theme = getPhaseByTime(new Date())

// Mount the app into the root DOM element under StrictMode.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
