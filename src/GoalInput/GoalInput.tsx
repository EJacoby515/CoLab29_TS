import React, { ReactElement, useState } from 'react';

interface Props {
  setShowPencil:  React.Dispatch<React.SetStateAction<boolean>>;
  setShowPomodoro: React.Dispatch<React.SetStateAction<boolean>>;
}

const GoalInput: React.FC<Props> = ({ setShowPencil, setShowPomodoro }) => {
  const [screen, setScreen] = useState(0);
  let progress = (screen + 180).toString()+ "px";
  const [goal, setGoal] = useState('');
  const [subCount, setSubCount] = useState(1);
  const [subtask, setSubtask] = useState('')
  const [subtasksList, setSubtasksList] = useState<string[]>([])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setGoal(e.target.value);
  }

  const handleSubChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubtask(e.target.value);
  }

  const addSubtask = (s:string) => {
    setSubtasksList((prevList) => [...prevList, s]);
    setSubtask('');
    setSubCount((prev) => prev + 1);
  }

  const handleTaskChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const newTasks = [...subtasksList];
    newTasks[idx] = e.target.value;
    setSubtasksList(newTasks);
  };

  const removeSubtask = (idx: number) => {
    const newTasks = subtasksList.filter((task, index) => index !== idx);
    setSubtasksList(newTasks);
    setSubCount((prev) => prev - 1)
  };

  const submitGoal = () => {
    console.log({goal})
  } 

  const goalcontainerStyle = {
    position: 'fixed',
    bottom: '150px',
    padding: '20px',
    right: '40px',
    zIndex: 999,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    height: '400px',
    width: '400px'
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

  const pStyle = {
    color: '#767676',
    fontFamily: 'Arial',
    margin: '5px 0'
  } as React.CSSProperties;

  const textareaStyle ={
    font: 'Inter',
    height: '80px',
    width: '100%',
    padding: '5px',
    borderRadius: '2px',
    placeholder: 'Your goal here'
  } as React.CSSProperties;

  const editBtnStyle = {
    color: 'white',
    backgroundColor: '#007bff',
    borderRadius: '4px',
    padding: '0px 12px',
    height: '32px',
    width: '100px',
    marginTop: '10px',
    justifySelf: 'right',
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'
  } as React.CSSProperties;

  const addBtnStyle = {
    height: '30px',
    width: '40px',
    background: 'transparent',
    cursor: 'pointer',
    borderLeft: 'none'
  } as React.CSSProperties;

  const progressbarStyle ={
    height: '6px',
    width: `${progress}`,
    borderRadius: '10px',
    background: 'blue',
    position: 'absolute',
    bottom: '170px',
    right: '47px',
    zIndex: 1000,
  } as React.CSSProperties;

  return (
    <>
      <div style={{...goalcontainerStyle}}>
        {screen === 0 && (
          <>
          <p style={{...pStyle}}>Let's set up your goal!</p>
          <button style={{...editBtnStyle}} onClick={() => {setScreen(1)}}>Start</button>
          </>
        )}
        {screen === 1 && ( 
          <>
          <p style={{...pStyle}}>Let's break it down backwards.</p>
          <p style={{...pStyle}}>What would you like to accomplish?</p>
          <textarea style={{...textareaStyle}} value={goal} onChange={handleChange} placeholder="Your goal here"/>
          <button style={{...editBtnStyle}} onClick={() => {setScreen(2)}}>Continue</button>
          </>
        )}
        {screen === 2 && ( 
          <>
          <p style={{...pStyle}}>List the steps you think you'll need.</p>
          <p style={{...pStyle}}>(Make sure these are objectives)</p>
          <ol style={{padding: 0}}>
            {subtasksList && subtasksList.map((task, idx) => (
              <li key={idx} style={{...stepStyle}}>
                <input 
                  style={{...textareaStyle, height: '30px'}}
                  value={task}
                  onChange={(e) => handleTaskChange(e, idx)}></input>
                <button style={{...addBtnStyle}} onClick={() => removeSubtask(idx)}>-</button>
              </li>
            ))}
            <li style={{...stepStyle}}>
              <input style={{...textareaStyle, height: '30px'}} placeholder={`Step ${subCount}:`} value={subtask} onChange={handleSubChange}/>
              <button style={{...addBtnStyle}} onClick={() => addSubtask(subtask)}>+</button>
            </li>
          </ol>
          <button style={{...editBtnStyle}} onClick={() => setScreen(3)}>Continue</button>
          </>
        )}
        {screen === 3 && (
          <>
          <p style={{...pStyle}}>Great! Let's get started!</p>
          <button style={{...editBtnStyle}} onClick={()=> {setShowPencil(prev => !prev); setShowPomodoro(prev => !prev)}}>Go to timer</button>
          </>
        )}

      </div>
        <span style={{...progressbarStyle, zIndex: 999, backgroundColor: 'lightgray', width: '380px'}}></span>
        <span style={{...progressbarStyle}}></span>
    </>
  );
};

export default GoalInput;
