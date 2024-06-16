import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPencilAlt, faRepeat, faPlus } from '@fortawesome/free-solid-svg-icons';

interface Props {
  goal: string;
  subtasksList: string[];
}

interface Subtask {
  id: number;
  title: string;
}

const PrePomodoro: React.FC<Props> = ({ goal, subtasksList }) => {
  const [subtasks, setSubtasks] = useState<Subtask[]>([]);

  useEffect(() => {
   setSubtasks(subtasksList.map((title: string, index: number) => ({id: index, title })));
   }, [subtasksList]);


  const handleSubtaskChange = (id: number, title: string) => {
    const updatedSubtasks = subtasks.map((subtask) => {
      if (subtask.id === id) {
        return { ...subtask, title };
      }
      return subtask;
    });
    setSubtasks(updatedSubtasks);
  };

  const handleAddSubtask = () => {
    const newSubtask: Subtask = {
      id: subtasks.length,
      title: '',
    };
    setSubtasks([...subtasks, newSubtask]);
  };

  const handleStartTimer = (subtaskId?: number) => {
    if (subtaskId !== undefined) {
      console.log(`Starting timer for subtask ${subtaskId}`);
    } else {
      console.log('Starting timer for the entire goal');
    }
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: '20px',
    backgroundColor: '#F8F9FF',
    borderRadius: '12px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    width: '500px',
    height: '500px',
    border: '1px solid #D0D5DD'
  };
  
  const goalStyle: React.CSSProperties = {
    fontSize: '18px',
    fontWeight: 500,
    fontFamily: 'Arial',
    marginBottom: '16px',
  };
  
  const progressBarStyle: React.CSSProperties = {
    height: '20px',
    backgroundColor: '#e0e0e0',
    borderRadius: '4px',
    marginBottom: '16px',
  };
  
  const subtaskStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '8px',
  };
  
  const inputStyle: React.CSSProperties = {
    flex: 1,
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginRight: '8px',
    marginBottom: 0,
  };
  
  const buttonStyle: React.CSSProperties = {
    padding: '8px 14px',
    fontWeight: 500,
    backgroundColor: '#38608F',
    color: '#fff',
    border: '1px solid #DCDFEA',
    borderRadius: '8px',
    cursor: 'pointer',
    marginRight: '8px'
  };

  return (
        <div style={containerStyle}>
      <h2 style={goalStyle}>{goal}</h2>
      <div style={progressBarStyle}>
        <div style={{ width: '0%', height: '4px', backgroundColor: '#EAECF0' }} />
      </div>
      {subtasks.map((subtask) => (
        <div key={subtask.id} style={subtaskStyle}>
          <input
            type="text"
            value={subtask.title}
            onChange={(e) => handleSubtaskChange(subtask.id, e.target.value)}
            style={inputStyle}
          />
          <button onClick={() => handleStartTimer(subtask.id)} style={buttonStyle}>
            <FontAwesomeIcon icon={faPlay} />
          </button>
          <button style={buttonStyle}>
            <FontAwesomeIcon icon={faPencilAlt} />
          </button>
          <button style={buttonStyle}>
            <FontAwesomeIcon icon={faRepeat} />
          </button>
        </div>
      ))}
      <button onClick={() => handleStartTimer()} style={buttonStyle}>
        Start Timer <FontAwesomeIcon style={{marginLeft: '4px'}} icon={faPlay} />
      </button>
      <button onClick={handleAddSubtask} style={{...buttonStyle, backgroundColor: '#D7E3F8', color: 'black', marginTop: '12px'}}>
        Add Subtask <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  );
};

export default PrePomodoro;