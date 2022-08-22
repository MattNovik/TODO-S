import * as React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const SignupButton: React.FC = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <button
      className="auth__signup auth__btn"
      onClick={() =>
        loginWithRedirect({
          screen_hint: 'signup',
        })
      }
    >
      Sign Up
    </button>
  );
};

export default SignupButton;
