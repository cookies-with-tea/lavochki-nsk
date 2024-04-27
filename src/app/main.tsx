import ReactDOM from 'react-dom/client'

import 'virtual:svg-icons-register'
import 'app/styles/index.scss'
import '@mantine/core/styles.css'
import { bootstrap } from 'app/bootstrap'
import { Provider } from 'app/providers'

bootstrap()

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <Provider />
  // </React.StrictMode>,
)
