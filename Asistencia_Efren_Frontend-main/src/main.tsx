

import React from 'react';
import ReactDOM from 'react-dom/client';

import { GoogleOAuthProvider } from '@react-oauth/google';

import { RouterProvider } from "react-router-dom";

import { AppRouter } from "./router/AppRouter";
import './index.css';
import { UserProvider } from './context/UserContext/UserProvider';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <GoogleOAuthProvider clientId="731898062669-3tuej19irsmvdo671985lj8a0qc8cggq.apps.googleusercontent.com">
    <React.StrictMode>
      <UserProvider>
        <RouterProvider router={AppRouter} />
      </UserProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>,
)
