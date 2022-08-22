import './index.scss';
import React from 'react';
import { NotificationProps } from '../../interfaces/interfaces';

const Notification: React.FC<NotificationProps> = ({ type, text, button }) => {
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
        <p className="notification__text">{text}</p>
        {button ? (
          <button
            type="button"
            className="notification__button button"
            onClick={() => {
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
