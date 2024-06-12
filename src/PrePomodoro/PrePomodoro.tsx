import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPencilAlt, faRedo } from '@fortawesome/free-solid-svg-icons';

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
    alignItems: 'stretch',
    padding: '20px',
    backgroundColor: '#f7f7f7',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };
  
  const goalStyle: React.CSSProperties = {
    fontSize: '18px',
    fontWeight: 'bold',
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
  };
  
  const buttonStyle: React.CSSProperties = {
    padding: '8px 16px',
    backgroundColor: '#38608f',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '8px',
  };

  return (
        <div style={containerStyle}>
      <h2 style={goalStyle}>{goal}</h2>
      <div style={progressBarStyle}>
        <div style={{ width: '0%', height: '100%', backgroundColor: '#38608f' }} />
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
            <FontAwesomeIcon icon={faRedo} />
          </button>
        </div>
      ))}
      <button onClick={handleAddSubtask} style={buttonStyle}>
        Add Subtask
      </button>
      <button onClick={() => handleStartTimer()} style={buttonStyle}>
        Start Timer
      </button>
    </div>
  );
};

export default PrePomodoro;