// src/components/authentication-button.js

import * as React from 'react';

import LoginButton from './LoginButton';
import Profile from '../Profile';

import { useAuth0 } from '@auth0/auth0-react';

const AuthenticationButton = () => {
  const { isAuthenticated } = useAuth0();

  return isAuthenticated ? <Profile /> : <LoginButton />;
};

export default AuthenticationButton;
