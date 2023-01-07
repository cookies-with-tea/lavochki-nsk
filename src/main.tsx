import React from 'react'
import ReactDOM from 'react-dom/client'

import '@/styles/main.scss'
import {BrowserRouter} from "react-router-dom";
import App from "@/components/App";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
      <App />
  </BrowserRouter>
)
