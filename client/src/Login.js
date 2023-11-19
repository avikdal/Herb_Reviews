import React, { useState, useContext } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { UserContext } from './context/user';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const {login} = useContext(UserContext)
    const navigate = useNavigate();



    function handleSubmit(e) {
        e.preventDefault();
        
        fetch("/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }).then((r) => {
          if (r.ok) {
            r.json().then((user) => {
                login(user)
                navigate('/home');
            });
          } else {
            r.json().then((error) => setErrors(error.errors));
          }
        });
      }

  return (
    <div>
       <h3>Login</h3>
      <Form onSubmit={handleSubmit} >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>{' '}
          <input 
            placeholder="Enter Username" 
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>{' '}
          <input 
            placeholder="Password" 
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        {/* <Form.Group>
        {errors.map((error) => (
          <div key={error}>{error}</div>
        ))}
        </Form.Group> */}

        <Form.Group>
            {Array.isArray(errors) && errors.map((error) => (
                <div key={error}>{error}</div>
            ))}
        </Form.Group>

        <Button variant="primary" type="submit">
           Submit
        </Button>
      </Form>
    </div>
  )
}
