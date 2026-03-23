import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import HomeView from '../views/HomeView'

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        {
          path: '/',
          element: <HomeView />,
        },
      ],
    },
  ],
  {
    basename: '/',
  },
)
