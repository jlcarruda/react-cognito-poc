import React, { useState } from 'react';
import logo from './logo.svg';
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";

import Amplify, { Auth } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@aws-amplify/ui/dist/style.css';

import awsconfig from './aws-exports';
import './App.css';

Amplify.configure(awsconfig)

function App(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const user = await Auth.signIn(email, password)
    console.log(user.signInUserSession)
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <form onSubmit={handleSubmit}>
        <FormGroup controlId="email" bsSize="large">
          <FormLabel>Email</FormLabel>
          <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <FormLabel>Password</FormLabel>
          <FormControl
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <Button block bsSize="large" disabled={!validateForm()} type="submit">
          Login
        </Button>
      </form>
      </header>
    </div>
  );
}

export default withAuthenticator(App, {usernameAttributes: 'email'});
