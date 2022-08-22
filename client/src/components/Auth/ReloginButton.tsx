import * as React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const ReloginButton = () => {
  const { loginWithRedirect, logout } = useAuth0();
  return (
    <button
      className="auth__relogin auth__btn button"
      onClick={() => {
        logout({});
        setTimeout(() => loginWithRedirect(), 0);
        //;
      }}
    >
      ChangeAcc
    </button>
  );
};

export default ReloginButton;
