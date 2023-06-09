import React, {lazy} from 'react';
import {Navigate} from 'react-router-dom';
import Loadable from '../layouts/shared/loadable/Loadable';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/FullLayout')));

/* ****Pages***** */
const ModernDash = Loadable(lazy(() => import('../views/dashboard/Home')));
const Agents = Loadable(lazy(() => import('src/pages/Agents/Agents')));

// landingpage

const Router = [
    {
        path: '/',
        element: <FullLayout/>,
        children: [
            {path: '/', element: <Navigate to="/home"/>},
            {path: '/home', exact: true, element: <ModernDash/>},
            {path: '/agents', exact: true, element: <Agents/>},
        ],
    },
];

export default Router;