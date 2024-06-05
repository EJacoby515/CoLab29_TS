import React, { ReactElement, useState } from 'react';

const GoalInput: React.FC = () => {
  const [screen, setScreen] = useState(0);
  const [goal, setGoal] = useState('Your goal here');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setGoal(e.target.value);
  }

  const submitGoal = () => {
    console.log({goal})
  } 

  const goalcontainerStyle = {
    position: 'fixed',
    bottom: '150px',
    padding: '20px',
    right: '40px',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    height: '400px',
    width: '400px'
  } as React.CSSProperties;

  const smartContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    fontFamily: 'Inter',
    fontSize: '16px',
    fontWeight: '600',
    padding: '5px',
    lineHeight: '150%'
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

  const progressbarStyle ={
    height: '10px',
    width: '100%',
    borderRadius: '2px',
    background: 'gray',
    alignSelf: 'end'
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
          <textarea style={{...textareaStyle}} value={goal} onChange={handleChange}/>
          <button style={{...editBtnStyle}} onClick={() => {setScreen(2)}}>Continue</button>
          </>
        )}
        {screen === 2 && ( 
          <>
          <p style={{...pStyle}}>List the steps you think you'll need.</p>
          <p style={{...pStyle}}>(Make sure these are objectives)</p>
          <ol>
            <input style={{...textareaStyle}}/>
            <button>+</button>
          </ol>
          <button style={{...editBtnStyle}}>Continue</button>
          </>
        )}

        <span style={{...progressbarStyle}}></span>
      </div>
    </>
  );
};

export default GoalInput;
