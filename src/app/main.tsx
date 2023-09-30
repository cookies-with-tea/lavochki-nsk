import { attachLogger } from 'effector-logger'
import React from 'react'
import ReactDOM from 'react-dom/client'

import 'virtual:svg-icons-register'
import 'app/styles/index.scss'
import { Provider } from 'app/providers'

import { events } from 'entities/user'

attachLogger()

events.userChanged()

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <Provider />
  // </React.StrictMode>,
)
