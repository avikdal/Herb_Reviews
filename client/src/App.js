import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { UserProvider } from './context/user';
import Home from './Home';
import NavBar from './NavBar';
import Signup from './Signup';
import Login from './Login';
import Herbs from './Herbs';
import NewHerbForm from './NewHerbForm';


function App() {
  const [herbs, setHerbs] = useState([]);


  useEffect(() => {
    fetch('/herbs')
      .then((r) => r.json())
      .then((herbData) => {
        // console.log("herbData",herbData)
        setHerbs(herbData)
      });
  }, []);


  function updateHerbs(newHerb) {
    setHerbs([...herbs, newHerb]);
  };


  return (
    <div className="App">
      <UserProvider>
        <NavBar />
        <Routes>
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/herbs" element={<Herbs herbs={herbs} setHerbs={setHerbs}  />} />
          <Route exact path="/herbs/new" element={<NewHerbForm updateHerbs={updateHerbs} />} />
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
