import React, { useState, useEffect, useRef } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const PomodoroTimer: React.FC<{ onTimerStart:  () => void; onTimerFinish: () => void; onTimerStop: () => void }> = ({ onTimerStart, onTimerFinish, onTimerStop}) => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [halfwayAlertTriggered, setHalfwayAlertTriggered] = useState(false);
  const timerRef = useRef<number | null>(null);

  const startTimer = (minutes: number) => {
    setTime(minutes * 60);
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
    setTime(0);
  };

  const incrementTimer = () => {
    setTime((prevTime) => prevTime + 300);
  };

  const decrementTimer = () => {
    setTime((prevTime) => Math.max(prevTime - 300, 0));
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

          const halfwayTime = (prevTime - 1) === (time / 2);

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

  const buttonStyle ={
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    margin: '0 5px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  };


  return (
    <div style={{ textAlign: 'center', padding: '10px', borderRadius: '8px', backgroundColor: 'rgba(0,0,0,0.8)'}}>
      <h2>Co.Lab29 Timer</h2>
      <div style={{ position: 'relative', width: '200px', margin: '0 auto' }}>
        <CircularProgressbar
          value={(time % 3600) / 36}
          text={formatTime(time)}
          styles={buildStyles({
            textColor: '#fff',
            pathColor: '#007bff',
            trailColor: '#d6d6d6',
          })}
        />
        <button 
        style = {{
          position: 'absolute',
          top: '0px',
          left: '0px',
          ...buttonStyle,
          width: '30px',
          height:'30px',
          }}
          onClick={decrementTimer}
          >
            -5
          </button>
          <button
          style={{
            position: 'absolute',
            top: '0px',
            right: '0px',
            ...buttonStyle,
            width: '30px',
            height: '30px',
          }}
          onClick={incrementTimer}
          >
            +5
          </button>
          </div>
          {!isRunning && (
          <div style = {{ marginTop:'20px' }}>
            <button
            style = {
              buttonStyle
            }
            onClick={() => startTimer(30)}
            >
              30
            </button>
            <button
            style={buttonStyle}
            onClick={() => startTimer(45)}
            >
              45
            </button>
          </div>
        )}
          <div 
          style = {{ marginTop: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            borderRadius: '50%'
          }}>
            <button style = {{...buttonStyle, fontSize: '10px'}} onClick ={stopTimer}>Stop</button>
            <button style = {{...buttonStyle, fontSize: '10px'}} onClick ={resetTimer}>Reset</button>
          </div>
          </div>
    );
  };

export default PomodoroTimer;