import './index.scss';
import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from '../Auth/LogoutButton';
import { useEffect } from 'react';

export const Profile = () => {
  const { user } = useAuth0();

  useEffect(() => {
    const handleClick = (e) => {
      if (e.target.classList.contains('profile__picture')) {
        document
          .querySelector('.profile__info')
          .classList.toggle('profile__info--close');
      }
    };
    document.querySelector('.profile').addEventListener('click', handleClick);
  });

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
        <img
          src={user.picture}
          width="75"
          height="75"
          alt="profile"
          className="profile__picture-second"
        />
        <p className="profile__name">{user.nickname}</p>
        <p className="profile__email">{user.email}</p>
        <LogoutButton />
      </div>
    </div>
  );
};
