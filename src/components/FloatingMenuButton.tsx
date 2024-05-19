import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullseye, faPencilAlt, faCalendarAlt, faHourglassHalf } from '@fortawesome/free-solid-svg-icons';

const FloatingMenuButton: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClick = () => {
    setMenuOpen(!menuOpen);
  };

  const buttonStyle = {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    width: '60px',
    height: '60px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '50%',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    cursor: 'pointer',
    zIndex: 1000,
    fontSize: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  } as React.CSSProperties;

  const iconButtonStyle = {
    position: 'fixed',
    width: '50px',
    height: '50px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    cursor: 'pointer',
    zIndex: 999,
    fontSize: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  } as React.CSSProperties;

  return (
    <>
      <button style={buttonStyle} onClick={handleClick}>
        <FontAwesomeIcon icon={faBullseye} />
      </button>
      {menuOpen && (
        <>
          <button
            style={{
              ...iconButtonStyle,
              bottom: '90px',
              right: '90px',
            }}
            onClick={() => alert('Pencil icon clicked!')}
          >
            <FontAwesomeIcon icon={faPencilAlt} />
          </button>
          <button
            style={{
              ...iconButtonStyle,
              bottom: '90px',
              left: '90px',
            }}
            onClick={() => alert('Calendar icon clicked!')}
          >
            <FontAwesomeIcon icon={faCalendarAlt} />
          </button>
          <button
            style={{
              ...iconButtonStyle,
              top: '90px',
              right: '90px',
            }}
            onClick={() => alert('Timer icon clicked!')}
          >
            <FontAwesomeIcon icon={faHourglassHalf} />
          </button>
        </>
      )}
    </>
  );
};

export default FloatingMenuButton;
