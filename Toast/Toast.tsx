import React, { useState, useEffect } from 'react';
import '../style.css';
import styles from './Toast.module.css';
import { iconOptions, positionOptions } from '../constants';
import toast, { Toaster } from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';

export default function Toast() {
  const [title, setTitle] = useState('');
  const [toastOptions, setToastOptions] = useState({});
  const [position, setPosition] = useState(positionOptions[0].value);
  const [icon, setIcon] = useState(iconOptions[0].value);
  const [toasts, setToasts] = useState([]);

  const handleInput = (text) => setTitle(text);

  useEffect(() => {
    setToastOptions({
      title,
      position,
      icon,
    });
  }, [title, position, icon]);

  const handleClick = () => {
    setToasts((currentToasts) => [
      ...currentToasts,
      { id: uuidv4(), ...toastOptions },
    ]);
  };

  const onClose = (id: any) => {
    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== id)
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <p>Configurations</p>
        <div className={styles.configContainer}>
          <label className={styles.label}> Toast Title </label>
          <input
            type="text"
            value={title}
            className={styles.input}
            onChange={(event) => {
              handleInput(event.target.value);
            }}
          />
          <label className={styles.label}> Position </label>
          <select
            value={position}
            onChange={(event) => setPosition(event.target.value)}
            className={styles.select}
          >
            {positionOptions.map((option, idx) => (
              <option key={`option-position-${option.id}`} value={option.value}>
                {option.value}
              </option>
            ))}
          </select>
          <label className={styles.label}> Icon </label>
          <select
            value={icon}
            onChange={(event) => setIcon(event.target.value)}
            className={styles.select}
          >
            {iconOptions.map((option, idx) => (
              <option key={`option-icon-${option.id}`} value={option.value}>
                {option.value}
              </option>
            ))}
          </select>
        </div>
        <button onClick={handleClick} className={styles.btn}>
          Show Toast
        </button>
      </div>
      {toasts.map((toast, idx) => (
        <SingleToast
          key={`toast-${idx}`}
          title={toast?.title}
          icon={icon}
          position={position}
          index={idx}
          // id={toast?.id}
          onClose={() => onClose(toast?.id)}
        />
      ))}
    </div>
  );
}

const SingleToast = ({ title, position, icon, index, onClose }) => {
  const getPositionStyle = () => {
    let pos = positionOptions.find((el) => el.value === position);
    return {
      ...pos?.style,
      marginTop: pos.view === 'top' ? index * 60 + 'px' : '',
      marginBottom: pos.view === 'bottom' ? index * 60 + 'px' : '',
    };
  };

  return (
    <React.Fragment>
      <div className={styles.toastContainer} style={getPositionStyle()}>
        <div className={styles.iconContentContainer}>
          <span>{icon}</span>
          <span>{title}</span>
        </div>
        <button onClick={onClose} className={styles.close}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={styles.closeIcon}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </div>
    </React.Fragment>
  );
};
