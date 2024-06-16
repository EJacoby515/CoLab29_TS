// PomodoroTimer.tsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faX, faRotateLeft, faMinus, faPlus, faNoteSticky } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect, useRef } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import QuickNotes from '../QuickNotes/QuickNotes';

interface Props {
  onTimerStart: () => void;
  onTimerFinish: () => void;
  onTimerStop: () => void;
  subtaskTitle: string;
  goal: string;
  subtaskList: string[];

}

const PomodoroTimer: React.FC<Props> = ({ onTimerStart, onTimerFinish, onTimerStop, goal, subtaskTitle, subtaskList }) => {
  const [time, setTime] = useState(1500);
  const [isRunning, setIsRunning] = useState(false);
  const [isCustomTime, setIsCustomTime] = useState(false);
  const [customTime, setCustomTime] = useState('');
  const [halfwayAlertTriggered, setHalfwayAlertTriggered] = useState(false);
  const [showNotes, setShowNotes] = useState(true);
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

  const timerHeaderStyle:  React.CSSProperties =  {
    fontSize: '24px',
    fontWeight:  'bold',
    marginBottom: '16px',
    color: '#38608F',
  }

  const timerContainerStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: '160px',
    right: '160px',
    transform: 'scale(1)',
    transition: 'all 0.8s ease-in-out',
    backgroundColor: '#F8F9FF',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '250px',
  };

  const timerCircleStyle: React.CSSProperties = {
    width: '184px',
    height: '224px',
    backgroundColor: '#D7E3F8',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const timerTextStyle: React.CSSProperties = {
    fontFamily: 'sans-serif',
    fontSize: '35px',
    fontWeight: 400,
    color: '#38608F',
    position: 'absolute',
    bottom: '40%',
    right: '22%'
  };

  const timerButtonStyle: React.CSSProperties = {
    width: '30px',
    height: '30px',
    backgroundColor: '#38608F',
    color: '#F8F9FF',
    border: '2px solid #38608F',
    borderRadius: '50%',
    cursor: 'pointer',
  };

  return (
    <div style={timerContainerStyle}>

      {/* Circular Timer */}
      <div style={timerCircleStyle}>

        {/* Top Buttons */}
        <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', padding: '0 4px'}}>
          <button style={{...timerButtonStyle, width: '30px', height: '30px' }} onClick={decrementTimer}>
            <FontAwesomeIcon icon={faMinus} />
          </button>

          <button style={{...timerButtonStyle, width: '30px', height: '30px' }} onClick={incrementTimer}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>

        {/* Circle */}
        <div style={{width: '159px', height: '159px', position: 'relative'}} onClick={() => setIsCustomTime(true)}>
          <CircularProgressbar
            value={(time % 3600) / 60}
            styles={
              buildStyles({
              pathColor: '#38608F',
              trailColor: '#FFFFFF',
            })}
          />
          <div style={timerTextStyle}>{formatTime(time)}</div>
        </div>
      
        {/* Bottom Buttons */}
        <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', padding: '0 4px'}}>
          {!isRunning ? (
            <div>
              <button style={timerButtonStyle} onClick={startTimer}>
                <FontAwesomeIcon icon={faPlay} />
              </button>
            </div>
          ) : <div>
              <button style={timerButtonStyle} onClick={stopTimer}>
                <FontAwesomeIcon icon={faX} />
              </button>
            </div>}

            <button style={timerButtonStyle} onClick={resetTimer}>
              <FontAwesomeIcon icon={faRotateLeft} />
            </button>
        </div>

      </div>

      <h3 style={timerHeaderStyle}>{subtaskTitle}</h3>
      {isCustomTime && (
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
        </div>)} 
     
{/* ShowNotes Button and Div */}
      
          {showNotes ? 
          (<div style={{ padding: '10px' }}> 
            <QuickNotes onClose={toggleNotes} /></div>) :
          <div
            style={{
              backgroundColor: '#38608F',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'width 0.3s ease-out',
              padding: '4px'
            }}
            onClick={toggleNotes}
          ><FontAwesomeIcon icon={faNoteSticky} style={{ color: 'white', fontSize: '20px' }} />
          </div>
          }
        
  </div>
  );
};

export default PomodoroTimer;