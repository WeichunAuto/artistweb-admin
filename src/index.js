import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './css/output.css'

import PaintWork from './components/body/paintWork'
import FaceArt from './components/body/faceArt'
import WallArt from './components/body/wallArt';

import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
                path: '/paintWork',
                Component: PaintWork
            }, 
            {
                path: '/faceArt',
                Component: FaceArt
            }, 
            {
                path: '/wallArt',
                Component: WallArt
            }
        ]
    },
   ])
root.render(
    <div>
        <RouterProvider router={router} />
    </div>
    
);


