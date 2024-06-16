import React, {  useState } from 'react';

interface Props {
  setShowAlert:  React.Dispatch<React.SetStateAction<boolean>>;
  setUserStatus: React.Dispatch<React.SetStateAction<'returning'|'onboarding'|''>>;
}

const Alert: React.FC<Props> = ({ setShowAlert, setUserStatus }) => {

  const [isHovered, setHovered] = useState(false);
  const [isClearHovered, setClearHovered] = useState(false);

  const clearUserGoal = async () => {
    try {
      const response: {} = await new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({ action: "clearGoal"}, (response) => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve(response);
          }
        });
        });
        console.log(response);
        if (response === "cleared") {
          setUserStatus("onboarding");
          setShowAlert(false);
        }
      } catch (error) {
        console.log('Error:', error);
      }; 
  }
  
  const assessmentcontainerStyle = {
    position: 'fixed',
    bottom: '150px',
    padding: '20px',
    right: '80px',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
    width: '400px',
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: '14px'
  } as React.CSSProperties;

  const pStyle = {
    color: '#767676',
    fontFamily: 'Arial',
    margin: '5px 0'
  } as React.CSSProperties;

  const alertBtnStyle = {
    color: 'white',
    padding: '4px 10px',
    border: '1px solid #38608F',
    fontSize: '16px',
    backgroundColor: '#38608F',
    borderRadius: '4px',
    margin: '15px',
    cursor: 'pointer'
  }

  return (
    <>
      <div style={{...assessmentcontainerStyle}}>
        <p style={{
              ...pStyle,
              textAlign: 'center', marginTop: '15px'
            }}>Would you like to clear your goal and subtasks?</p>
        <div>
          <button 
            style={{...alertBtnStyle, backgroundColor: isHovered ? 'transparent' : '#38608F', color: isHovered ? 'black' : 'white'}}
            onMouseEnter={()=> setHovered(!isHovered)}
            onMouseLeave={()=> setHovered(!isHovered)}
            onClick={()=>{setShowAlert(false)}}>Cancel</button>
          <button 
            style={{...alertBtnStyle, color: isClearHovered ? 'white' : 'black', backgroundColor: isClearHovered ? 'red' : 'transparent'}}
            onMouseEnter={()=> setClearHovered(!isClearHovered)}
            onMouseLeave={()=> setClearHovered(!isClearHovered)}
            onClick={() => {clearUserGoal()}}
            >Yes, start over</button>
        </div>
      </div>
    </>
  );
};

export default Alert;
