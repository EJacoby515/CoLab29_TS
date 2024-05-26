import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullseye, faPencilAlt, faCalendarAlt, faHourglassHalf } from '@fortawesome/free-solid-svg-icons';
import GoalInput from '../GoalInput/GoalInput';
import PomodoroTimer from '../PomodoroTimer/PomodoroTimer';

const FloatingMenuButton: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [pencilOpen, setPencilOpen] = useState(false);
  const [showPomodoro, setShowPomodoro] = useState(false);
  const [IsTimerStarted, setIsTimerStarted] = useState(false);

  const handleClick = () => {
    setMenuOpen(!menuOpen);
    setPencilOpen(false);
    setShowPomodoro(false);
  };

  const handleTimerStart = () => {
    setIsTimerStarted(true);
  }

  const handlePomodoroClick = () => {
    setShowPomodoro(!showPomodoro);
  }

  const handlePencilClick = () => {
    setPencilOpen(!pencilOpen);
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
          {pencilOpen && (<GoalInput/>)}
          <button
            style={{
              ...iconButtonStyle,
              bottom: '90px',
              right: '20px',
            }}
            onClick={handlePencilClick}
          >
            <FontAwesomeIcon icon={faPencilAlt} />
          </button>
          <button
            style={{
              ...iconButtonStyle,
              bottom: '90px',
              right: '90px',
            }}
            onClick={() => alert('Calendar icon clicked!')}
          >
            <FontAwesomeIcon icon={faCalendarAlt} />
          </button>
          <button
            style={{
              ...iconButtonStyle,
              bottom:'20px',
              right: '90px',
            }}
            onClick={handlePomodoroClick}
          >
            <FontAwesomeIcon icon={faHourglassHalf} />
          </button>
        </>
      )}
      {showPomodoro && (
        <div style={{ 
          position: 'fixed', 
          bottom: IsTimerStarted ? '110px' : '160px',
          right: IsTimerStarted ? '0px' : '160px',
          transform: IsTimerStarted ? 'scale(0.8)' : 'scale(1)',
          transition: 'all 0.8s ease-in-out',
          }}>
          <PomodoroTimer onTimerStart={handleTimerStart} />
        </div>
      )}
    </>
  );
};

export default FloatingMenuButton;
