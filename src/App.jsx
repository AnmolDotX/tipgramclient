import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Chat from "./pages/Chat";

const App = () => {
  return (
    <div className='bg-slate-950 bg-opacity-70 backdrop-filter backdrop-blur'>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Chat />} />
      </Routes>
    </div>
  );
};

export default App;
