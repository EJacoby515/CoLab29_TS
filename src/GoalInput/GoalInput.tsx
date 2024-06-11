import React, { ReactElement, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faCircleDot as OpenCircleDot, faStar } from '@fortawesome/free-regular-svg-icons';
import { faPen, faPlus, faCircleDot as SolidCircleDot } from '@fortawesome/free-solid-svg-icons';

interface Props {
  setShowPencil:  React.Dispatch<React.SetStateAction<boolean>>;
  setShowPomodoro: React.Dispatch<React.SetStateAction<boolean>>;
  setGoal: React.Dispatch<React.SetStateAction<string>>;
  setSubtasksList: React.Dispatch<React.SetStateAction<string[]>>;
  userStatus: "returning" | "onboarding" | "";
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

const GoalInput: React.FC<Props> = ({ setShowPencil, setShowPomodoro, setGoal, setSubtasksList, userStatus }) => {
  const [screen, setScreen] = useState(0);
  const [goal, setLocalGoal] = useState('');
  const [subCount, setSubCount] = useState(1);
  const [subtask, setSubtask] = useState('');
  const [subtasksList, setLocalSubtasksList] = useState<string[]>([]);
  const [completedSubtasks, setCompletedSubtasks] = useState<string[]>([]);
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [isSubButtonDisabled, setSubButtonDisabled] = useState(false);
  const [subtaskSelected, selectSubtask] = useState<number>(10);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    setShowPomodoro(true);
  }

  const handleGoalSubmit = async () => {
    try {
      const response = await new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({ action: "appendCurrentGoal", data: goal}, (response) => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve(response);
          }
        });
      });
      console.log(response);
      } catch (error) {
        console.error('Error:', error);
      };
    setScreen(prev => (prev + 1))
  }

  const handleSubtasksSubmit = async () => {
    try {
      const response = await new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({ action: "appendSubtasks", data: subtasksList}, (response) => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve(response);
          }
        });
      });
      console.log(response);
      } catch (error) {
        console.error('Error:', error);
      };
    setScreen(prev => (prev + 1))
  }

  const fetchGoals = async () => {
    try {
      const response: GoalResponse = await new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({ action: "fetchGoals"}, (response) => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve(response);
          }
        });
      });
      
      setLocalGoal(response.name);
      let subtasks = []
      let completed = []
      for (let i = 0; i < response.subtasks.length; i++) {
        if (response.subtasks[i].completed === true){
          completed.push(response.subtasks[i].name)
        } else{
          subtasks.push(response.subtasks[i].name)
        }
      }
      setLocalSubtasksList(subtasks);
      setCompletedSubtasks(completed);
      } catch (error) {
        console.log('Error:', error);
      };
  }

  const goalcontainerStyle = {
    position: 'fixed',
    bottom: '150px',
    padding: '32px',
    right: '40px',
    zIndex: 999,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FF',
    borderRadius: '12px',
    border: '1px solid #D0D5DD',
    height: '500px',
    width: '480px',
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
    fontSize: '16px',
    lineHeight: '18px',
    padding: '12px',
    color: 'black',
    width: '400px',
    margin: '0 auto',
    backgroundColor: 'rgba(56, 96, 143, 0.05)',
    border: '1px solid #C3C6CF',
    borderRadius: '12px',
    alignSelf: 'center'
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
    fontSize: '16px',
    lineHeight: '18px',
    margin: '0 auto',
    padding: 0
  } as React.CSSProperties;

  const inputStyle ={
    border: '1px solid #ccc',
    fontFamily: 'Arial',
    display: 'block',
    lineHeight: '18px',
    width: '340px',
    padding: '5px',
    borderRadius: '2px',
    overflowY: 'scroll'
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
    bottom: 10
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
            <p style={{...pStyle}}>Let's set up your goal!</p>
            <button 
              style={{...continueBtnStyle}} 
              onClick={() => {setScreen(1)}}>
                Start
            </button>
          </>
        )}

        {/* set goal and date if desired */}
        {screen === 1 && ( 
            <>
              <p style={{...pStyle}}>Let's break it down backwards. <br />What is your long term learning goal?</p>
              <input 
                style={{...inputStyle, textAlign: 'center'}} 
                value={goal} 
                onChange={handleChange} 
                placeholder="Your goal here, ex. I want to hold a 5 min conversation in French" 
                maxLength={200}
                onKeyDown={(e) => { if (e.key === "Enter") {handleGoalSubmit()}}}
                />
              <button disabled={isButtonDisabled} style={{...continueBtnStyle, opacity: isButtonDisabled ? '.33' : '1'}} onClick={handleGoalSubmit}>Continue</button>
            </>
          )}

          {/* Set subtasks */}
          {screen > 1 && ( 
          <>
            <p style={{...goalStyle, display: 'flex', justifyContent: 'center'}}><FontAwesomeIcon icon={faStar} />{goal}</p>

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

          </>
          )}

        {screen === 2 && (
          <>
            {subtasksList.length < 6 &&
            <>
              <p style={{...pStyle}}>List the steps you think you'll need. <br />(Make sure these are objectives)</p>
              <div style={{...stepStyle}}>
                <input 
                  style={{...inputStyle, height: '30px'}} 
                  placeholder={`Step ${subCount}:`} 
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

        {screen === 3 && (
          <>
          <p style={{...pStyle}}>Select a task to begin with!</p>
          <div>
            <button style={{...continueBtnStyle}} onClick={handleStartTimer}>Go to Timer</button>
            <button>Clear</button>
          </div>
          </>
        )}

        {/* Progressbar */}
        <div style={{...progressbarStyle}}>
          <FontAwesomeIcon icon={screen < 1 ? OpenCircleDot : SolidCircleDot} />
          <hr style={{background: '#079455', height: '4px', width: '48px'}}></hr>
          <FontAwesomeIcon icon={screen < 2 ? OpenCircleDot : SolidCircleDot} />
          <hr style={{background: '#079455', height: '4px', width: '48px'}}></hr>
          <FontAwesomeIcon icon={screen < 3 ? OpenCircleDot : SolidCircleDot} />
        </div>
      </div>
    </>
  );
};

export default GoalInput;