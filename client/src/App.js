import { createBrowserRouter, Outlet, RouterProvider, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
/** import all components */
import { Advertisement, Apply, Advertise } from 'components/advertisement';
import { Login, Register } from 'components/auth';
import { CollaborativeIde } from 'components/collaborativeIDE';
import { Problems } from 'components/problems';
import { Interview } from 'components/Interview';
import Header from 'components/shared/Header';
import Home from './components/Home';
import { connectWithSocketIOServer } from 'utils/ws';
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
import PreInterview from 'components/PreInterview/PreInterview';
import JoinMeeting from 'components/meeting/JoinMeeting';
import Meeting from 'components/meeting/Meeting';

const Protected = ({ isLoggedIn, children }) => {
   if (!isLoggedIn) {
      return <Navigate to="/auth/login" replace />;
   }
   return children;
};
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
               {
                  path: '/advertisement/apply',
                  element: (
                     <Protected>
                        <Apply />
                     </Protected>
                  )
               },
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
            path: '/JoinMeeting',
            element: <JoinMeeting />
         },
         {
            path: '/meeting',
            element: <Meeting />
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
   useEffect(() => {
      connectWithSocketIOServer();
   }, []);
   return (
      <main>
         <RouterProvider router={router}></RouterProvider>
      </main>
   );
}
