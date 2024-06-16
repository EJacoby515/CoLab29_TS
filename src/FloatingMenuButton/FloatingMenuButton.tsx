import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX, faCube, faPen, faCalendarAlt, faHourglassHalf, faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import GoalInput from '../GoalInput/GoalInput';
import PomodoroTimer from '../PomodoroTimer/PomodoroTimer';
import Assessment from '../Assessment/Assessment';
import Calendar from '../Calendar/Calendar';
import Alert from '../Alert/Alert';
import PrePomodoro from '../PrePomodoro/PrePomodoro';

interface Subtask {
  id: number;
  title: string;
  completed: boolean;
}


const FloatingMenuButton: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showPencil, setShowPencil] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showPomodoro, setShowPomodoro] = useState(false);
  const [showPrePomodoro, setShowPrePomodoro] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [IsTimerStarted, setIsTimerStarted] = useState(false);
  const [showAssessment, setShowAssessment] = useState(false);
  const [goal, setGoal] = useState('');
  const [subtaskList, setSubtasksList] = useState<string[]>([]);
  const [subtaskTitle, setSubtaskTitle] = useState('');
  const [userStatus, setUserStatus] = useState<'returning'|'onboarding'|''>('');


  const getUserStatus = async () => {
    try {
      const response: {} = await new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({ action: "startup"}, (response) => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve(response);
          }
        });
      });
      console.log(response);
      if (response === 'returning') {
        setUserStatus('returning');
        
      } else if (response === 'onboarding'){
        setUserStatus('onboarding');
      }
      } catch (error) {
        console.log('Error:', error);
      }; 
  }

  const handleClick = () => {
    if (menuOpen === false) {
      if (userStatus === 'onboarding') 
        {setShowPencil(true);} 
    } else {
      setShowCalendar(false);
      setShowPomodoro(false);
      setShowPencil(false);
      setShowAlert(false);
      setShowPrePomodoro(false);
      }
    setMenuOpen(!menuOpen);
  };
  const handleSubtaskClick =   (subtask: Subtask) => {
    setSubtaskTitle(subtask.title);
    setShowPomodoro(true);
  }

  const handleTimerStart = () => {
    setIsTimerStarted(true);
  }

  const handleTimerFinish = () => {
    setShowAssessment(true);
    setShowPomodoro(false);
    setIsTimerStarted(false);
  }

  const handleTimerStop = () => {
    setIsTimerStarted(false);
  }

  const handleAssessmentSubmit =() => {
    setShowAssessment(false);
    setShowPomodoro(false);
  }

  const handlePomodoroClick = () => {
    setShowPomodoro(!showPomodoro);
  }

  const handlePencilClick = () => {
    if (userStatus === 'returning') {
      setShowAlert(true);
    } else {
      setShowPencil(!showPencil);
    }
    };

  const handleCalendarClick = async () => {
    setShowCalendar(!showCalendar);
    try {
      const response = await new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({ action: "getStorage" }, (response) => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve(response);
          }
        });
      });
      console.log(response);
      } catch (error) {
        console.log('Error:', error);
      };
  }

  const buttonStyle = {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    width: '50px',
    height: '50px',
    backgroundColor: '#38608F',
    color: '#fff',
    border: 'none',
    borderRadius: '15px',
    cursor: 'pointer',
    zIndex: 1000,
    fontSize: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  } as React.CSSProperties;

  const iconButtonStyle = {
    position: 'fixed',
    width: '50px',
    height: '50px',
    backgroundColor: '#38608F',
    color: '#fff',
    border: 'none',
    borderRadius: '15px',
    cursor: 'pointer',
    zIndex: 999,
    fontSize: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  } as React.CSSProperties;

  useEffect(() => {
    getUserStatus();
  }, [])

  return (
    <>
      <button style={buttonStyle} onClick={handleClick}>
        <FontAwesomeIcon icon={menuOpen ? faX : faCube} />
      </button>
      {menuOpen && (
        <>
        {/* Pencil */}
          <button
              style={{
                ...iconButtonStyle,
                bottom: '90px',
                right: '20px',
              }}
              onClick={handlePencilClick}
            >
            {userStatus === 'returning' ? 
              <FontAwesomeIcon icon={faRotateLeft} /> 
              : <FontAwesomeIcon icon={faPen} />}
          </button>

          {/* Calendar */}
          <button
            style={{
              ...iconButtonStyle,
              bottom: '90px',
              right: '90px',
            }}
            onClick={handleCalendarClick}
          >
            <FontAwesomeIcon icon={faCalendarAlt} />
          </button>

          {/* Pomodoro Timer */}
          <button
            style={{
              ...iconButtonStyle,
              bottom:'20px',
              right: '90px',
              pointerEvents: showPomodoro ? 'none' : 'auto',
              opacity: showPomodoro ? 0.5: 1,
            }}
            onClick={handlePomodoroClick}
            disabled ={showPomodoro}
          >
            <FontAwesomeIcon icon={faHourglassHalf} />
          </button>
        </>
      )}

      {showPencil && (
          <GoalInput 
          setShowPencil={setShowPencil} 
          setShowPrePomodoro={setShowPrePomodoro} 
          setGoal={setGoal} 
          setSubtasksList={setSubtasksList} 
          userStatus={userStatus} 
          setUserStatus={setUserStatus} 
          />)}
      {showPrePomodoro && (
        <div style = {{ position: 'fixed', bottom:  '30px', right: '160px', zIndex: 1000}}>
          <PrePomodoro goal = {goal} 
              subtasksList = {subtaskList}  
              onSubtaskClick={handleSubtaskClick} 
              handleTimerStart={handleTimerStart}
              handleTimerStop={handleTimerStop}
              showAssessment={showAssessment}
              setShowAssessment={setShowAssessment}
              handleAssessmentSubmit={handleAssessmentSubmit}
              />
        </div>
      )}
      {showPomodoro && (
        <div style={{ 
          position: 'fixed', 
          bottom: IsTimerStarted ? '10px' : '20px',
          right: IsTimerStarted ? '10px' : '160px',
          transform: IsTimerStarted ? 'scale(0.8)' : 'scale(1)',
          transition: 'all 0.8s ease-in-out',
          zIndex: 1000,
          }}>
          <PomodoroTimer 
          onTimerStart={handleTimerStart} 
          onTimerFinish={handleTimerFinish} 
          onTimerStop={handleTimerStop} 
          subtaskTitle={subtaskTitle}
          goal={goal}
          subtaskList={subtaskList}/>
        </div>
      )}
      {showAssessment && <Assessment onAssessmentSubmit={handleAssessmentSubmit}/>}
      {showCalendar && <Calendar/>}
      {showAlert && (<Alert setShowAlert={setShowAlert} setUserStatus={setUserStatus}/>)}
    </>
  );
};

export default FloatingMenuButton;