// PomodoroTimer.tsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faX, faRotateLeft, faStickyNote } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect, useRef } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import QuickNotes from '../QuickNotes/QuickNotes';

interface Props {
  onTimerStart: () => void;
  onTimerFinish: () => void;
  onTimerStop: () => void;
  goal: string;
  subtaskList: string[];
}

const PomodoroTimer: React.FC<Props> = ({ onTimerStart, onTimerFinish, onTimerStop, goal, subtaskList }) => {
  const [time, setTime] = useState(1500);
  const [isRunning, setIsRunning] = useState(false);
  const [isCustomTime, setIsCustomTime] = useState(false);
  const [customTime, setCustomTime] = useState('');
  const [halfwayAlertTriggered, setHalfwayAlertTriggered] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const timerRef = useRef<number | null>(null);

  const toggleNotes = () => {
    setShowNotes(!showNotes);
  };

  const startTimer = () => {
    setIsRunning(true);
    setHalfwayAlertTriggered(false);
    onTimerStart();
  };

  const stopTimer = () => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current!);
    }
    setIsRunning(false);
    onTimerStop();
  };

  const resetTimer = () => {
    stopTimer();
    setTime(1500);
  };

  const incrementTimer = () => {
    setTime((prevTime) => prevTime + 300);
  };

  const decrementTimer = () => {
    setTime((prevTime) => Math.max(prevTime - 300, 0));
  };

  const handleCustomTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomTime(e.target.value);
  };

  const handleCustomTimeSubmit = () => {
    const customTimeSeconds = parseInt(customTime, 10) * 60;
    if (!isNaN(customTimeSeconds) && customTimeSeconds > 0) {
      setTime(customTimeSeconds);
      setIsCustomTime(false);
    }
  };

  useEffect(() => {
    if (isRunning) {
      timerRef.current = window.setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 0) {
            window.clearInterval(timerRef.current!);
            onTimerFinish();
            return 0;
          }

          const halfwayTime = prevTime - 1 === Math.floor(time / 2);

          if (!halfwayAlertTriggered && halfwayTime) {
            alert('Halfway there! How do you feel about what you\'re studying? Do you want to keep going, start over, or take a short break?');
            setHalfwayAlertTriggered(true);
          }

          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
      }
    };
  }, [isRunning, halfwayAlertTriggered, time, onTimerFinish]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const timerContainerStyle: React.CSSProperties = {
    backgroundColor: '#F8F9FF',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const timerCircleStyle: React.CSSProperties = {
    position: 'relative',
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '16px',
  };

  const timerTextStyle: React.CSSProperties = {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#38608F',
  };

  const timerButtonStyle: React.CSSProperties = {
    padding: '8px 16px',
    backgroundColor: '#38608F',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '8px',
  };

  return (
    <div style={timerContainerStyle}>
      <div style={timerCircleStyle}>
        <div style={timerTextStyle}>{formatTime(time)}</div>
      </div>
      {isCustomTime ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
          <input
            type="number"
            value={customTime}
            onChange={handleCustomTimeChange}
            placeholder="Enter minutes"
            style={{
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #38608F',
              marginRight: '8px',
              width: '80px',
              textAlign: 'center',
              fontSize: '16px',
            }}
          />
          <button onClick={handleCustomTimeSubmit} style={{ padding: '8px 16px', borderRadius: '4px', backgroundColor: '#38608F', color: 'white', border: 'none', cursor: 'pointer', fontSize: '16px' }}>
            Set
          </button>
        </div>
      ) : (
        <div onClick={() => setIsCustomTime(true)}>
          <CircularProgressbar
            value={(time % 3600) / 60}
            text={formatTime(time)}
            styles={buildStyles({
              textColor: '#3A2723',
              pathColor: '#3A2723',
              trailColor: '#38608F',
            })}
          />
        </div>
      )}
      <button style={{ position: 'absolute', top: '0px', left: '0px', ...timerButtonStyle, width: '30px', height: '30px' }} onClick={decrementTimer}>
        -5
      </button>
      <button style={{ position: 'absolute', top: '0px', right: '0px', ...timerButtonStyle, width: '30px', height: '30px' }} onClick={incrementTimer}>
        +5
      </button>
      {!isRunning && (
        <div style={{ marginTop: '20px' }}>
          <button style={timerButtonStyle} onClick={startTimer}>
            <FontAwesomeIcon icon={faPlay} />
          </button>
        </div>
      )}
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', borderRadius: '50%' }}>
        <button style={timerButtonStyle} onClick={stopTimer}>
          <FontAwesomeIcon icon={faX} />
        </button>
        <button style={timerButtonStyle} onClick={resetTimer}>
          <FontAwesomeIcon icon={faRotateLeft} />
        </button>
      </div>
      <div
        style={{
          position: 'relative',
          width: showNotes ? '300px' : '40px',
          backgroundColor: '#38608F',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'width 0.3s ease-out',
        }}
        onClick={toggleNotes}
      >
        <FontAwesomeIcon icon={faStickyNote} style={{ color: 'white', fontSize: '20px' }} />
      </div>
      {showNotes && (
        <div style={{ position: 'absolute', top: '0', left: '0', width: '100%', backgroundColor: 'white', padding: '10px', zIndex: 1 }}>
          <h3> Goal: {goal}</h3>
          <h4>Tasks:</h4>
          <ul>
            {subtaskList.map((subtask, index) => (
              <li key={index}>{subtask}</li>
            ))}
          </ul>
          <QuickNotes onClose={toggleNotes} />
        </div>
      )}
    </div>
  );
};

export default PomodoroTimer;