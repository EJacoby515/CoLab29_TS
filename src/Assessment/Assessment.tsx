import React, { ReactElement, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSmileBeam as faFaceSmileBeamSolid, 
          faFaceMeh as faFaceMehSolid,
         faFaceFrownOpen as faFaceFrownSolid} from '@fortawesome/free-solid-svg-icons';
import { faFaceSmileBeam as faFaceSmileBeamLine, 
          faFaceMeh as faFaceMehLine, 
          faFaceFrownOpen as faFaceFrownOpenLine} from '@fortawesome/free-regular-svg-icons';

const Assessment: React.FC = () => {
  const [journal, setJournal] = useState('');
  const [smile, setSmile] = useState(false);
  const [meh, setMeh] = useState(false);
  const [frown, setFrown] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJournal(e.target.value);
  }

  const submitGoal = () => {
    console.log({journal})
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
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'
  } as React.CSSProperties;

  const emojiContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
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

  const emojiStyle = {
    backgroundColor: 'white',
    padding: '0 10px',
    color: 'blue',
    cursor: 'pointer',
    fontSize: '20px'
  }

  const emojiHover = {
    backgroundColor: 'gray'
  }

  return (
    <>
      <div style={{...assessmentcontainerStyle}}>
        <p style={{
              ...pStyle,
              textAlign: 'center'
            }}>How did it go?</p>
        <div style={{...emojiContainerStyle}}>
          <a style={{...emojiStyle, color: 'green'}} onClick={()=>{setSmile(true), setMeh(false), setFrown(false)}}>
            <FontAwesomeIcon icon={smile ? faFaceSmileBeamSolid : faFaceSmileBeamLine}/></a>
          <a style={{...emojiStyle, color: 'orange'}} onClick={()=>{setSmile(false), setMeh(true), setFrown(false)}}>
            <FontAwesomeIcon icon={meh ? faFaceMehSolid : faFaceMehLine} /></a>
          <a style={{...emojiStyle, color: 'red'}} onClick={()=>{setSmile(false), setMeh(false), setFrown(true)}}>
            <FontAwesomeIcon icon={frown ? faFaceFrownSolid : faFaceFrownOpenLine} /></a>
        </div>
        <p style={{...pStyle}}>Study Session reflections:</p>
        <textarea style={{...textareaStyle}} value={journal} onChange={handleChange}/>
        <button style={{...editBtnStyle}} onClick={submitGoal}>Log Session</button>
      </div>
    </>
  );
};

export default Assessment;
