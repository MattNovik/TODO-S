import './index.scss';
import React, { useEffect } from 'react';
import { NotificationProps } from '../../interfaces/interfaces';

const Notification: React.FC<NotificationProps> = ({
  type,
  text,
  button,
  links,
}) => {
  useEffect(() => {
    if (sessionStorage.getItem('readyToUse') === null) {
      (document.querySelector('html') as HTMLElement).classList.add(
        'html-hidden'
      );
    }
  }, []);
  return (
    <div
      className={`notification notification--${type}`}
      onClick={(e) => {
        let target = e.target as HTMLElement;
        if (
          target.tagName !== 'BUTTON' &&
          !target.closest('.notification__wrapper')
        ) {
          (
            document.querySelector(`.notification--${type}`) as HTMLElement
          ).classList.add('notification--close');
          (
            document.querySelector('.html-hidden') as HTMLElement
          ).classList.remove('html-hidden');
        }
      }}
    >
      <div className="notification__wrapper">
        <p className="notification__text">
          {text} {links ? links : ''}
        </p>
        {button ? (
          <button
            type="button"
            className="notification__button button"
            onClick={() => {
              if (sessionStorage.getItem('readyToUse') === null) {
                sessionStorage.setItem('readyToUse', 'true');
              }
              (
                document.querySelector(`.notification--${type}`) as HTMLElement
              ).classList.add('notification--close');
              (
                document.querySelector('.html-hidden') as HTMLElement
              ).classList.remove('html-hidden');
            }}
          >
            {button}
          </button>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default Notification;
