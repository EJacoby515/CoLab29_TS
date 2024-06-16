import React, {  useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSmile as faFaceSmileSolid, 
          faFaceMeh as faFaceMehSolid,
          faFaceFrownOpen as faFaceFrownSolid,
          faFaceLaugh as faFaceLaughSolid} from '@fortawesome/free-solid-svg-icons';
import { faFaceSmile as faFaceSmileLine, 
          faFaceMeh as faFaceMehLine, 
          faFaceFrownOpen as faFaceFrownOpenLine,
          faFaceLaugh as faFaceLaughLine} from '@fortawesome/free-regular-svg-icons';

const Assessment: React.FC<{ onAssessmentSubmit: () => void }> = ({onAssessmentSubmit}) => {
  const [journal, setJournal] = useState('');
  const [emoji, setEmoji] = useState(0);
  const [submitHovered, setsubmitHovered] = useState(false);
  const [assessSubmitDisabled, setDisabled] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJournal(e.target.value);
  }

  const getStartOfWeek = (date: Date) => {
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day; // adjust for start of week
    startOfWeek.setDate(diff);
    startOfWeek.setHours(0, 0, 0, 0); //normalize to midnight
    return startOfWeek.toISOString().split('T')[0]; // using ISO date format for keys
  }

  const submitAssessment = async (rating:number) => {
    const reflection = journal;
    const assessment = {
      rating: rating,
      reflection: reflection
    };

    const date = new Date();
    const weekKey = getStartOfWeek(date);
    const dayOfWeek = date.getDay(); // 0 (sunday) to 6 (saturday)

    try {
      const response = await new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({ action: "appendAssessment", weekKey: weekKey, dayOfWeek: dayOfWeek, assessment: assessment}, (response) => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve(response);
          }
        });
      });
      console.log(response);
      onAssessmentSubmit();
      } catch (error) {
        console.log('Error:', error);
      };
  };


  const assessmentcontainerStyle = {
    position: 'fixed',
    bottom: '150px',
    padding: '20px',
    right: '80px',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
    width: '400px',
    backgroundColor: '#F8F9FF',
    alignItems: 'center',
    borderRadius: '12px',
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
    fontFamily: 'Roboto',
    height: '120px',
    width: '100%',
    padding: '12px 14px',
    borderRadius: '2px',
    border: '1px solid #D0D5DD',
    fontSize: '14px'
  } as React.CSSProperties;

  const assessmentBtnStyle = {
    color: submitHovered ? 'white' : '#38608F',
    backgroundColor: submitHovered ? '#38608F' : 'transparent',
    borderRadius: '4px',
    font: 'Inter',
    padding: '0px 12px',
    height: '32px',
    width: '100px',
    marginTop: '10px',
    textAlign: 'center',
    border: assessSubmitDisabled ? 'none' : '1px solid #D0D5DD',
    outline: 'none',
    cursor: assessSubmitDisabled ? null : 'pointer',
  } as React.CSSProperties;

  const emojiStyle = {
    backgroundColor: 'transparent',
    padding: '0 10px',
    color: 'blue',
    cursor: 'pointer',
    fontSize: '20px'
  }

  useEffect(()=>{
    if (emoji === 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [emoji])


  return (
    <>
      <div style={{...assessmentcontainerStyle}}>
      <p style={{...pStyle}}>Rate your session:</p>
        <div style={{...emojiContainerStyle}}>
          <a style={{...emojiStyle, color: '#E31B54'}} onClick={()=>{setEmoji(1)}}>
            <FontAwesomeIcon icon={emoji === 1 ? faFaceFrownSolid : faFaceFrownOpenLine} /></a>
          <a style={{...emojiStyle, color: '#FF692E'}} onClick={()=>{setEmoji(2)}}>
            <FontAwesomeIcon icon={emoji === 2 ? faFaceMehSolid : faFaceMehLine} /></a>
          <a style={{...emojiStyle, color: '#EAAA08'}} onClick={()=>{setEmoji(3)}}>
            <FontAwesomeIcon icon={emoji === 3 ? faFaceSmileSolid : faFaceSmileLine}/></a>
          <a style={{...emojiStyle, color: '#66C61C'}} onClick={()=>{setEmoji(4)}}>
            <FontAwesomeIcon icon={emoji === 4 ? faFaceSmileSolid : faFaceSmileLine}/></a>
          <a style={{...emojiStyle, color: '#099250'}} onClick={()=>{setEmoji(5)}}>
            <FontAwesomeIcon icon={emoji === 5 ? faFaceLaughSolid : faFaceLaughLine}/></a>
        </div>
        <p style={{...pStyle}}>What went well and what could be better?</p>
        <textarea 
          style={{...textareaStyle}} 
          value={journal} 
          onChange={handleChange}
          placeholder="Add summary here"/>
        <button 
          style={{...assessmentBtnStyle, fontSize: '14px'}} 
          onMouseEnter={()=> {setsubmitHovered(true)}} 
          onMouseLeave={() => {setsubmitHovered(false)}} 
          onClick={() => {submitAssessment(emoji)}}
          disabled={assessSubmitDisabled}>
            Submit
        </button>
      </div>
    </>
  );
};

export default Assessment;
