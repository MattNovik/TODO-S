import './index.scss';
import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from '../Auth/LogoutButton';
import { useEffect } from 'react';
import { Close } from '@mui/icons-material';
import ReloginButton from '../Auth/ReloginButton';

export const Profile = () => {
  const { user, isAuthenticated } = useAuth0();

  const handleClick = (e) => {
    console.log('q');
    document
      .querySelector('.profile__info')
      .classList.remove('profile__info--close');
  };

  useEffect(() => {
    if (isAuthenticated) {
      document.querySelector('.profile').addEventListener('click', handleClick);
    }
  }, [isAuthenticated]);

  return (
    <div className="profile">
      <img
        src={user.picture}
        width="52"
        height="52"
        alt="profile"
        className="profile__picture"
      />
      <div className="profile__info profile__info--close">
        <Close
          className="profile__close"
          onClick={(e) => {
            document
              .querySelector('.profile__info')
              .classList.add('profile__info--close');
          }}
        />
        <img
          src={user.picture}
          width="75"
          height="75"
          alt="profile"
          className="profile__picture-second"
        />
        <p className="profile__name">{user.nickname}</p>
        <p className="profile__email">{user.email}</p>
        <div className="profile__wrapper-buttons">
          <ReloginButton />
          <LogoutButton />
        </div>
      </div>
    </div>
  );
};
