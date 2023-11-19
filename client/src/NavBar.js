import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { UserContext } from './context/user';
import { NavLink } from 'react-router-dom';

export default function NavBar() {
  const {user, logout} = useContext(UserContext)

  const logoutUser = () => {
    fetch("/logout", { method: "DELETE" })
    .then(() => logout())
  }

  if(user){
  return (
    <div>
       <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>Welcome {user.username}</Navbar.Brand>{' '}
            <NavLink to="/home">Home</NavLink>{' '}
            <NavLink to="/herbs">Herbs</NavLink>{' '}
            <button onClick={logoutUser}>Sign Out</button>{' '}
        </Container>
      </Navbar>
    </div>
  )
  } else {
    return (
      <div>
        <Container>
          <NavLink to="/home">Home</NavLink>{' '}
          <NavLink to="/herbs">Herbs</NavLink>
        </Container>
      </div>
    )
  }
}
