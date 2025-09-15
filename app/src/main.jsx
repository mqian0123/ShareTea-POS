import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import AppRoutes from './routes';
import 'flowbite';
import 'flowbite-react';
import { GoogleOAuthProvider } from '@react-oauth/google';

/**
 * The Google OAuth Client ID used for authentication.
 * Replace this with your actual client ID from the Google Cloud Console.
 * 
 * @constant {string}
 */
const CLIENT_ID = "421448961972-f799sodp1c0snskd77t9vngmatvoo3ko.apps.googleusercontent.com";

/**
 * Main entry point of the React application.
 * 
 * This file sets up the root of the React application, wraps it with necessary providers,
 * and renders the application to the DOM. It includes:
 * - `StrictMode` for highlighting potential problems in the application.
 * - `GoogleOAuthProvider` for enabling Google OAuth authentication.
 * - `BrowserRouter` for handling client-side routing.
 * - `AppRoutes` for defining the application's routing structure.
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Provides Google OAuth functionality to the application */}
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      {/* Enables client-side routing */}
      <BrowserRouter>
        {/* Defines the application's routing structure */}
        <AppRoutes />
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>,
);