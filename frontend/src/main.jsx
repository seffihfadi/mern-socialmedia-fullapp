import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './main.css'
import { BrowserRouter as Router } from 'react-router-dom'
import AuthProvider from './context/AuthProvider.jsx'
import AlertProvider from './context/AlertProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <AlertProvider>
      <App />
    </AlertProvider>
  </Router>
)
