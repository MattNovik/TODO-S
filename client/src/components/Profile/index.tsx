import * as React from 'react';
import './index.scss';
import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from '../Auth/LogoutButton';
import { useEffect } from 'react';
import { Close } from '@mui/icons-material';
import ReloginButton from '../Auth/ReloginButton';

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();

  const handleClick = (): void => {
    console.log('q');
    (document.querySelector('.profile__info') as HTMLElement).classList.remove(
      'profile__info--close'
    );
  };

  useEffect(() => {
    if (isAuthenticated) {
      (document.querySelector('.profile') as HTMLElement).addEventListener(
        'click',
        handleClick
      );
    }
  }, [isAuthenticated]);

  return (
    <div className="profile">
      <img
        src={user !== undefined ? user.picture : ''}
        width="52"
        height="52"
        alt="profile"
        className="profile__picture"
      />
      <div className="profile__info profile__info--close">
        <Close
          className="profile__close"
          onClick={() => {
            (
              document.querySelector('.profile__info') as HTMLElement
            ).classList.add('profile__info--close');
          }}
        />
        <img
          src={user !== undefined ? user.picture : ''}
          width="75"
          height="75"
          alt="profile"
          className="profile__picture-second"
        />
        <p className="profile__name">
          {user !== undefined ? user.nickname : ''}
        </p>
        <p className="profile__email">{user !== undefined ? user.email : ''}</p>
        <div className="profile__wrapper-buttons">
          <ReloginButton />
          <LogoutButton />
        </div>
      </div>
    </div>
  );
};

export default Profile;
