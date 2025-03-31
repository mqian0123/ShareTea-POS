import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import AppRoutes from "./routes";
import 'flowbite';
import 'flowbite-react';
import { GoogleOAuthProvider } from '@react-oauth/google';

const CLIENT_ID = "421448961972-f799sodp1c0snskd77t9vngmatvoo3ko.apps.googleusercontent.com"


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>,
)
