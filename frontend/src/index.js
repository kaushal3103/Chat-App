import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css';
import Register from './register';
import Login from './login';
import Chat from './chathome';
import Chatpage from './chatpage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
    <BrowserRouter>
      <Routes>
        <Route index element = {<Register/>}/>
         <Route path="/login" element={<Login/>}/>
         <Route path="/chathome" element={<Chat/>}/>
         <Route path="/chatpage/:user2Id" element={<Chatpage/>}/>
      </Routes>
   
    </BrowserRouter>
    
  
);