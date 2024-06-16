import React, { ReactElement, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faCircleDot as OpenCircleDot } from '@fortawesome/free-regular-svg-icons';
import { faPen, faPlus, faCircleDot as SolidCircleDot, faCircleCheck } from '@fortawesome/free-solid-svg-icons';

interface Props {
  setShowPencil:  React.Dispatch<React.SetStateAction<boolean>>;
  setShowPrePomodoro: React.Dispatch<React.SetStateAction<boolean>>;
  setGoal: React.Dispatch<React.SetStateAction<string>>;
  setSubtasksList: React.Dispatch<React.SetStateAction<string[]>>;
  userStatus: "returning" | "onboarding" | "";
  setUserStatus: React.Dispatch<React.SetStateAction<'returning'|'onboarding'|''>>;
}

interface GoalResponse {
  name: string,
  subtasks: [{ name: string
  completed: boolean
  studynotes: string
  emoji: null | string
  reflection: string
  timestart: string
  timeend: string
  }]
}

const GoalInput: React.FC<Props> = ({ setShowPencil, setGoal, setSubtasksList, userStatus, setUserStatus, setShowPrePomodoro }) => {
  const [screen, setScreen] = useState(0);
  const [goal, setLocalGoal] = useState('');
  const [subCount, setSubCount] = useState(1);
  const [subtask, setSubtask] = useState('');
  const [subtasksList, setLocalSubtasksList] = useState<string[]>([]);
  const [completedSubtasks, setCompletedSubtasks] = useState<string[]>([]);
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [isSubButtonDisabled, setSubButtonDisabled] = useState(false);
  const [subtaskSelected, selectSubtask] = useState<number>(10);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLocalGoal(e.target.value);
  }

  const handleSubChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubtask(e.target.value);
  }

  const addSubtask = (s:string) => {
    if (s.length > 0){
      setLocalSubtasksList((prevList) => [...prevList, s]);
      setSubtask('');
      setSubCount((prev) => prev + 1);
    }
  }

  const handleTaskChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const newTasks = [...subtasksList];
    newTasks[idx] = e.target.value;
    setLocalSubtasksList(newTasks);
  };

  const removeSubtask = (idx: number) => {
    const newTasks = subtasksList.filter((task, index) => index !== idx);
    setLocalSubtasksList(newTasks);
    setSubCount((prev) => prev - 1)
  };

  const handleStartTimer = () => {
    setShowPencil(false);
    setShowPrePomodoro(true);
    setUserStatus("returning");
  }

  const handleGoalSubmit = async () => {
    try {
      await new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({ action: "appendCurrentGoal", data: goal }, (response) => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve(response);
          }
        });
      });
      setGoal(goal);
      setScreen((prev) => prev + 1);
    } catch (error) {
      console.error('Error:', error);
    }
  };
    

  const handleSubtasksSubmit = async () => {
    try {
      await new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({ action: "appendSubtasks", data: subtasksList }, (response) => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve(response);
          }
        });
      });
      setSubtasksList(subtasksList);
      setScreen((prev) => prev + 1);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchGoals = async () => {
    try {
      const response: { goal: string; subtasks: string[] } = await new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({ action: "fetchGoals" }, (response) => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve(response);
          }
        });
      });
  
      setLocalGoal(response.goal);
      setLocalSubtasksList(response.subtasks);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const goalcontainerStyle = {
    position: 'fixed',
    bottom: '150px',
    padding: '32px',
    right: '40px',
    zIndex: 999,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#F8F9FF',
    borderRadius: '12px',
    border: '1px solid #D0D5DD',
    height: '480px',
    width: '460px',
  } as React.CSSProperties;

  const stepStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Inter',
    fontSize: '16px',
    fontWeight: '600',
    padding: '5px',
    lineHeight: '150%',
    margin: 0,
  } as React.CSSProperties;

  const goalStyle = {
    fontFamily: 'Roboto',
    fontWeight: 500,
    textDecoration: 'none',
    textStyle: 'none',
    fontSize: '16px',
    lineHeight: '18px',
    padding: '12px',
    color: 'black',
    width: '400px',
    margin: '0 auto',
  }

  const subtaskStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '400px',
    fontFamily: 'Roboto',
    fontSize: '14px',
    fontWeight: '400',
    padding: '0px 16px',
    lineHeight: '18px',
    margin: '5px',
    color: '#22191A',
    backgroundColor: 'rgba(56, 96, 143, 0.05)',
    border: '1px solid #C3C6CF',
    borderRadius: '12px',
    cursor: 'pointer'
  } as React.CSSProperties;

  const pStyle = {
    color: '#22191A',
    fontFamily: 'Arial',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '16px',
    margin: '10px',
    padding: 0,
  } as React.CSSProperties;

  const inputStyle ={
    border: '1px solid #ccc',
    fontFamily: 'Arial',
    display: 'block',
    lineHeight: '18px',
    width: '100%',
    padding: '5px',
    borderRadius: '2px',
    overflowY: 'scroll',
    margin: '10px 0'
  } as React.CSSProperties;

  const continueBtnStyle = {
    color: 'white',
    backgroundColor: '#38608F',
    borderRadius: '8px',
    padding: '8px 14px',
    textAlign: 'center',
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
    font: 'Roboto',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '20px',
    margin: '5px',
    marginBottom: '10px'
  } as React.CSSProperties;

  const addBtnStyle = {
    height: '30px',
    width: '40px',
    fontSize: '16px',
    background: 'transparent',
    cursor: 'pointer',
    border: '1px solid #ccc',
    borderLeft: 'none',
  } as React.CSSProperties;

  const progressbarStyle = {
    display: 'flex',
    justifyContent: 'center',
    color: "#079455",
    textAlign: 'center',
    fontSize: '24px',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center'
  } as React.CSSProperties;

  useEffect( () => {
    if (goal === '') {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false)
    }
  }, [goal])

  useEffect( () => {
    if (subtasksList.length === 0) {
      setSubButtonDisabled(true);
    } else {
      setSubButtonDisabled(false);
    }
  }, [subtasksList])

  useEffect(() => {
    if (userStatus === "returning") {
      setScreen(3);
      fetchGoals();
    }
  }, [])

  return (
    <>
      <div style={{...goalcontainerStyle}}>
        
        {/* start screen */}
        {screen === 0 && (
          <>
            <p style={{...pStyle, fontWeight: 800, margin: '10px auto'}}>Let's set up your goal!</p>
            <button 
              style={{...continueBtnStyle}} 
              onClick={() => {setScreen(1)}}>
                Let's do it
            </button>
          </>
        )}

        {/* set goal and date if desired */}
        {screen === 1 && ( 
            <>
              <p style={{...pStyle, fontWeight: 500}}>Let's break it down backwards. </p>
              <p style={{...pStyle, color: '#22191A', fontSize: '14px'}}>What would you like to accomplish?</p>
              <p style={{...pStyle, color: '#22191A', fontSize: '14px'}}>A good goal is one that is clearly defined, achievable, and meaningful.</p>
              <textarea 
                style={{...inputStyle, height: '64px'}} 
                value={goal} 
                onChange={handleChange} 
                placeholder='Example: If your long-term aim is to improve your health, a relevant goal would be "Eat 5 servings of fruits and vegetables daily."' 
                maxLength={200}
                onKeyDown={(e) => { if (e.key === "Enter") {handleGoalSubmit()}}}
                />
              <button disabled={isButtonDisabled} style={{...continueBtnStyle, opacity: isButtonDisabled ? '.33' : '1'}} onClick={handleGoalSubmit}>Continue</button>
            </>
          )}

        {/* Set Subtasks */}

        {screen === 2 && (
          <>
            <p style={{...goalStyle}}>I will <span style={{fontWeight: 800, textDecoration: 'underline', fontStyle: 'italic'}}> {goal}</span>.</p>
            <p style={{...pStyle, color: '#22191A', fontSize: '14px'}}>List the steps you think you'll need. You will have a chance to add more later.</p>
            {subCount < 2 && 
              <p style={{...pStyle, color: '#22191A', fontSize: '14px'}}>We will be utilizing the Pomodoro technique (typically 25 minutes followed by a 5 minute break) to help break down the goal into manageable steps, making it easier to stay focused and productive.</p>}
            
            <ol style={{ height: '300px', overflow: 'scroll', paddingLeft: '0'}}>
            {subtasksList && subtasksList.map((task, idx) => (
              <li 
                key={idx} 
                style={{...subtaskStyle, border: subtaskSelected === idx ? '2px solid black' : '1px solid #C3C6CF'}}
                onClick={() => {selectSubtask(idx)}}
              >
                <p style={{...pStyle}}>{task}</p>
                <div>
                  <button 
                    style={{...addBtnStyle, border: 'none', alignSelf: 'center'}}>
                      <FontAwesomeIcon icon={faPen} />
                  </button>
                  <button 
                    style={{...addBtnStyle, border: 'none', alignSelf:'center'}} onClick={() => removeSubtask(idx)}>
                    <FontAwesomeIcon icon={faTrashCan} />
                  </button>
                </div>
              </li>
            ))}
          </ol>
            
            {subtasksList.length < 10 &&
            <>
              <div style={{...stepStyle}}>
                <input 
                  style={{...inputStyle, height: '30px'}} 
                  placeholder="Subtask:"
                  value={subtask}
                  onChange={handleSubChange}
                  onKeyDown={(e)=> { if (e.key === "Enter") {addSubtask(subtask)}}}
                  maxLength={100}
                  />
                <button style={{...addBtnStyle}} onClick={() => addSubtask(subtask)}><FontAwesomeIcon icon={faPlus} /></button>
              </div>
            </>
            }

            <button 
              disabled={isSubButtonDisabled} 
              style={{...continueBtnStyle, opacity: isSubButtonDisabled ? '.33' : '1'}} onClick={handleSubtasksSubmit}>
              Continue
            </button>
          </>

        )}

        {/* Final goal/subtask display */}

        {screen === 3 && (
          <>
          <p style={{...goalStyle}}>I will <span style={{fontWeight: 800, textDecoration: 'underline', fontStyle: 'italic'}}> {goal}</span>.</p>

          <ol style={{ height: '300px', overflow: 'scroll', paddingLeft: '0'}}>
            {subtasksList && subtasksList.map((task, idx) => (
              <li 
                key={idx} 
                style={{...subtaskStyle, border: subtaskSelected === idx ? '2px solid black' : '1px solid #C3C6CF'}}
                onClick={() => {selectSubtask(idx)}}
              >
                <p style={{...pStyle}}>{task}</p>
                <div>
                  <button 
                    style={{...addBtnStyle, border: 'none', alignSelf: 'center'}}>
                      <FontAwesomeIcon icon={faPen} />
                  </button>
                  <button 
                    style={{...addBtnStyle, border: 'none', alignSelf:'center'}} onClick={() => removeSubtask(idx)}>
                    <FontAwesomeIcon icon={faTrashCan} />
                  </button>
                </div>
              </li>
            ))}
          </ol>

          <p style={{...pStyle, margin: '10px auto'}}>Great! Let's get started!</p>
          <div style={{margin: '0 auto'}}>
            <button style={{...continueBtnStyle}} onClick={handleStartTimer}>Continue</button>
          </div>
          </>
        )}

        {/* Progressbar */}
        <div style={{...progressbarStyle}}>
          {screen === 0 && <FontAwesomeIcon icon={OpenCircleDot} />}
          {screen === 1 && <FontAwesomeIcon icon={SolidCircleDot} />}
          {screen > 1 && <FontAwesomeIcon icon={faCircleCheck} />}
          <hr style={{background: '#079455', height: '4px', width: '48px'}}></hr>
          {screen < 2 && <FontAwesomeIcon icon={OpenCircleDot} />}
          {screen === 2 && <FontAwesomeIcon icon={SolidCircleDot} />}
          {screen === 3 && <FontAwesomeIcon icon={faCircleCheck} />}
        </div>
      </div>
    </>
  );
};

export default GoalInput;