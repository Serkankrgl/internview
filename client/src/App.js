import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'

/** import all components */
import { Advertisement } from 'components/advertisement'
import { Login, Register } from 'components/auth'
import { CollaborativeIde } from 'components/collaborativeIDE'
import { Problems } from 'components/problems'
import Header from 'components/shared/Header'
import Home from './components/Home'
import PageNotFound from './components/shared/PageNotFound'

/** auth middleware */
// import { AuthorizeUser, ProtectRoute } from './middleware/auth'

/** root routes */
const router = createBrowserRouter([
   {
      element: (
         <>
            <Header />
            <Outlet />
         </>
      ),
      children: [
         {
            path: '/',
            element: <Home />,
         },
         {
            path: '/auth',
            children: [
               { path: '/auth/login', element: <Login /> },
               { path: '/auth/register', element: <Register /> },
            ],
         },
         {
            path: '/advertisement',
            element: <Advertisement />,
         },
         {
            path: '/collaborativeIDE',
            element: <CollaborativeIde />,
         },
         {
            path: '/problems',
            element: <Problems />,
         },
         {
            path: '*',
            element: <PageNotFound />,
         },
      ],
   },
])

export default function App() {
   return (
      <main>
         <RouterProvider router={router}></RouterProvider>
      </main>
   )
}
