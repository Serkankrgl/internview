import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

/** import all components */
import { Advertisement, Apply, Advertise } from 'components/advertisement';
import { Login, Register } from 'components/auth';
import { CollaborativeIde } from 'components/collaborativeIDE';
import { Problems } from 'components/problems';
import { Interview } from 'components/Interview';
import Header from 'components/shared/Header';
import Home from './components/Home';
import {
   ProfileSideBar,
   UserInfo,
   Resume,
   UserApplications,
   UserAdvertisement,
   UserAdvertisementDetail,
   Calender
} from 'components/profile';
import PageNotFound from './components/shared/PageNotFound';

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
            element: <Home />
         },
         {
            path: '/auth',

            children: [
               { path: '/auth/login', element: <Login /> },
               { path: '/auth/register', element: <Register /> }
            ]
         },
         {
            path: '/advertisement',
            children: [
               { path: '/advertisement/', element: <Advertisement /> },
               { path: '/advertisement/apply', element: <Apply /> },
               { path: '/advertisement/advertise', element: <Advertise /> }
            ]
         },
         {
            path: '/profile',
            children: [
               {
                  path: '/profile/',
                  element: (
                     <ProfileSideBar>
                        <UserInfo />
                     </ProfileSideBar>
                  )
               },
               {
                  path: '/profile/Resume',
                  element: (
                     <ProfileSideBar>
                        <Resume />
                     </ProfileSideBar>
                  )
               },
               {
                  path: '/profile/UserApplications',
                  element: (
                     <ProfileSideBar>
                        <UserApplications />
                     </ProfileSideBar>
                  )
               },
               {
                  path: '/profile/UserAdvertisement',
                  children: [
                     {
                        path: '/profile/UserAdvertisement',
                        element: (
                           <ProfileSideBar>
                              <UserAdvertisement />
                           </ProfileSideBar>
                        )
                     },
                     {
                        path: '/profile/UserAdvertisement/:id',
                        element: (
                           <ProfileSideBar>
                              <UserAdvertisementDetail />
                           </ProfileSideBar>
                        )
                     }
                  ]
               },
               {
                  path: '/profile/Calender',
                  element: (
                     <ProfileSideBar>
                        <Calender />
                     </ProfileSideBar>
                  )
               }
            ]
         },
         {
            path: '/collaborativeIDE',
            element: <CollaborativeIde />
         },
         {
            path: '/interview/:id',
            element: <Interview />
         },
         {
            path: '/problems',
            element: <Problems />
         },
         {
            path: '*',
            element: <PageNotFound />
         }
      ]
   }
]);

export default function App() {
   return (
      <main>
         <RouterProvider router={router}></RouterProvider>
      </main>
   );
}
