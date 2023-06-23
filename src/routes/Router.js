import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';

import Loadable from '../layouts/shared/loadable/Loadable';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/FullLayout')));

/* ****Pages***** */
const ModernDash = Loadable(lazy(() => import('../views/dashboard/Home')));
const Agents = Loadable(lazy(() => import('src/pages/Agents/Agents')));
const Login = Loadable(lazy(() => import('src/pages/Login/Login')));
const Chat = Loadable(lazy(() => import('src/pages/Chat/Chat')));
const Feed = Loadable(lazy(() => import('src/pages/Feed/Feed')));
const Register = Loadable(lazy(() => import('src/pages/Register/Register')));

const AuthRoute = Loadable(lazy(() => import('src/components/Auth/AuthRoute')));
const PrivateRoute = Loadable(lazy(() => import('src/components/Auth/PrivateRoute')));

//    const {user} = useAuth()

// landingpage

const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to="/feed" /> },
      { path: '/feed', exact: true, element: <PrivateRoute component={Feed} /> },
    ],
  },
  {
    path: '/auth',
    element: <FullLayout />,
    children: [
      { path: '/auth/login', element: <AuthRoute component={Login} /> },
      { path: '/auth/register', element: <AuthRoute component={Register} /> },
    ],
  },
];

export default Router;
