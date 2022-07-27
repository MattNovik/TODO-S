import './index.scss';
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export const Auth = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="auth">
      <div className="auth__icon"></div>
      <div className="auth__form-wrapper">
        <form>
          <label>
            <p>Username</p>
            <input type="text" />
          </label>
          <label>
            <p>Password</p>
            <input type="password" />
          </label>
          <button type="submit" onClick={() => loginWithRedirect()}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
};
