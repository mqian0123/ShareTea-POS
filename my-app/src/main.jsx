import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Cashier from './Cashier.jsx'

import 'flowbite';
import 'flowbite-react';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Cashier>
      
    </Cashier>
  </StrictMode>,
)
