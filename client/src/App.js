import './App.css';
import React from 'react';
import Login from './components/auth/login';
import Register from './components/auth/register';
const  App = ()=> {
  return (
    <div className="App">
      <h1>New App</h1>
      <Register />
      <Login />
    </div>
  );
}

export default App;
