import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './css/output.css'

import AboutMe from './components/body/aboutMe';
import PaintWork from './components/body/paintWork'
import FaceArt from './components/body/faceArt'
import WallArt from './components/body/wallArt';
import Body from './components/body'
import Login from './components/login';
import App from './App';
import Error from './components/body/error';
import ProtectedRoute from './components/protectedRoute';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <ProtectedRoute
                element={<App />} 
            />
        ),
        errorElement: <Error />
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/body',
        element: (
            <ProtectedRoute
                element={<Body />} 
            />
        ),
        children: [
            {
                index: true, // default rendered children component.
                Component: PaintWork
            }, 
            {
                path: 'paintWork',
                Component: PaintWork
            },
            {
                path: 'faceArt',
                Component: FaceArt
            }, 
            {
                path: 'wallArt',
                Component: WallArt
            },
            {
                path: 'aboutMe',
                Component: AboutMe
            }
        ]
    },
    {
        path: '/error',
        element: <Error />,
    }
   ])
root.render(
    <div>
        <RouterProvider router={router} />
    </div>
    
);


