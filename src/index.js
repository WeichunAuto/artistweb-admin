import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './css/output.css'

import PaintWork from './components/body/paintWork'
import FaceArt from './components/body/faceArt'
import WallArt from './components/body/wallArt';
import Body from './components/body'

import App from './App';
import Error from './components/body/error';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
    },
    {
        path: '/body',
        element: <Body />,
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


