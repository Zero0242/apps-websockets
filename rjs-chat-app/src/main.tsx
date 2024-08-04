import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { ChatApp } from './ChatApp.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChatApp />
  </React.StrictMode>,
)
