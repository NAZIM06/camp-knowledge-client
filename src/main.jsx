import ReactDOM from 'react-dom/client'
import './index.css'

import { RouterProvider } from 'react-router-dom'
import AuthProvider from './provider/AuthProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import route from './routes/Route'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
 
 <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <RouterProvider router={route} />
    </AuthProvider>
  </QueryClientProvider>
)

