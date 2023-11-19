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

  return (
   <UserContext.Provider value={{ user, login, logout, signup }}>
    {children}
   </UserContext.Provider>
  )
}

export { UserContext, UserProvider }
