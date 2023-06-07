import ReactDOM from 'react-dom/client'
import './index.css'

import route from './routes/Route'
import { RouterProvider } from 'react-router-dom'
import AuthProvider from './provider/AuthProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider> 
   <RouterProvider router={route} />
   </AuthProvider>
)

