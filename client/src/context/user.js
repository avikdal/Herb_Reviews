import React, { useState, useEffect } from 'react';

// create context
const UserContext = React.createContext();

// create a provider component
function UserProvider({ children }) {
    const [user, setUser] = useState(null);

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  const login = (user) => {
    setUser(user)
  }

  const logout = () => {
    setUser(null)
  }

  const signup = (user) => {
    setUser(user)
  }

  function updateHerbsReviewed(newHerbReview) {
    // add the new herb from the review to the user.herbs
    let updatedUser= {...user, herbs: [...user.herbs, newHerbReview.herb]}
    setUser(updatedUser)
  }

  function updateDeletedHerbReview(deletedReview){
    let updatedUser = {...user}
    let updatedHerbs = updatedUser.herbs.filter((herb) => herb.id != deletedReview.herb.id)
    let realUpdatedUser = {...user, herbs: updatedHerbs}
    setUser(realUpdatedUser)
  }
  

  return (
   <UserContext.Provider value={{ user, login, logout, signup, updateHerbsReviewed, updateDeletedHerbReview }}>
    {children}
   </UserContext.Provider>
  )
}

export { UserContext, UserProvider }
