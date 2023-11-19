import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { UserProvider } from './context/user';
import Home from './Home';
import NavBar from './NavBar';
import Signup from './Signup';
import Login from './Login';
import Herbs from './Herbs';


function App() {
  return (
    <div className="App">
      <UserProvider>
        <NavBar />
        <Routes>
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/herbs" element={<Herbs/>} />
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
