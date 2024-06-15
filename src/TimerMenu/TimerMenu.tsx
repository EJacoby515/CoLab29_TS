import React, {  useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPen, faRepeat, faPlus } from '@fortawesome/free-solid-svg-icons';

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

const TimerMenu: React.FC<Props> = ({ setShowPencil, setShowPomodoro, setGoal, setSubtasksList, userStatus }) => {
  const [goal, setLocalGoal] = useState('');
  const [subtask, setSubtask] = useState('');
  const [subtasksList, setLocalSubtasksList] = useState<string[]>([]);
  const [completedSubtasks, setCompletedSubtasks] = useState<string[]>([]);
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
    }
  }

  const handleTaskChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const newTasks = [...subtasksList];
    newTasks[idx] = e.target.value;
    setLocalSubtasksList(newTasks);
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

  useEffect(() => {
    if (userStatus === "returning") {
      fetchGoals();
    }
  }, [])

  return (
    <>
      <div style={{...goalcontainerStyle}}>
          <p style={{...goalStyle, display: 'flex', justifyContent: 'center'}}>{goal}</p>

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
                      <FontAwesomeIcon icon={faPlay} /> Start Timer
                  </button>
                  <button 
                    style={{...addBtnStyle, border: 'none', alignSelf: 'center'}}>
                      <FontAwesomeIcon icon={faPen} /> Edit Task
                  </button>
                  <button 
                    style={{...addBtnStyle, border: 'none', alignSelf:'center'}}>
                    <FontAwesomeIcon icon={faRepeat} /> Repeat Task
                  </button>
                </div>
              </li>
            ))}
          </ol>
        <button style={{...continueBtnStyle}} onClick={handleStartTimer}>Go to Timer</button>
        <button>Add subtask <FontAwesomeIcon icon={faPlus} /></button>
    </div>
    </>
  );
};

export default TimerMenu;
