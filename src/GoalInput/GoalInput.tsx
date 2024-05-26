import React, { ReactElement, useState } from 'react';

const GoalInput: React.FC = () => {
  const [goal, setGoal] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setGoal(e.target.value);
  }

  const submitGoal = () => {
    console.log({goal})
  } 

  const goalcontainerStyle = {
    position: 'fixed',
    bottom: '180px',
    padding: '20px',
    right: '80px',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'rgba(0,0,0,0.8)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'
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
    padding: '5px',
    borderRadius: '2px'
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

  return (
    <>
      <div style={{...goalcontainerStyle}}>
        <div style={{...smartContainerStyle}}><span>S</span><span>M</span><span>A</span><span>R</span><span>T</span></div>
        <p style={{...pStyle}}>Put your SMART goals here for the study session</p>
        <textarea style={{...textareaStyle}} value={goal} onChange={handleChange}/>
        <button style={{...editBtnStyle}} onClick={submitGoal}>Submit</button>
      </div>
    </>
  );
};

export default GoalInput;
