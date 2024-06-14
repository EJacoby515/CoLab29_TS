import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPencilAlt, faRedo } from '@fortawesome/free-solid-svg-icons';
import PomodoroTimer from '../PomodoroTimer/PomodoroTimer';

interface Props {
  goal: string;
  subtasksList: string[];
  onSubtaskClick: (subtask: Subtask) =>  void;
  handleTimerStart: () => void;
  handleTimerStop: () => void;
}

interface Subtask {
  id: number;
  title: string;
  completed: boolean;
}

const PrePomodoro: React.FC<Props> = ({ goal, subtasksList, onSubtaskClick, handleTimerStart, handleTimerStop }) => {
  const [subtasks, setSubtasks] = useState<Subtask[]>([]);
  const [activeSubtask, setActiveSubtask] = useState<Subtask | null>(null);
  const [editMode, setEditMode] = useState<number | null>(null);

  useEffect(() => {
    setSubtasks(subtasksList.map((title: string, index: number) => ({ id: index, title, completed: false })));
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

  const handleSubtaskClick = (subtaskTitle: string) => {
    setActiveSubtask({ id:  0, title: subtaskTitle,   completed:  false});
    setEditMode(null);
  };

  const handleSubtaskCompleted = (subtask: Subtask) => {
    setActiveSubtask(null);
    const updatedSubtasks = subtasks.map((st) => {
      if (st.id === subtask.id) {
        return { ...st, completed: true };
      }
      return st;
    });
    setSubtasks(updatedSubtasks);
  };

  const completedStyle: React.CSSProperties ={
    textDecoration: 'line-through',
    color: 'red',
  }

  const handleRedoSubtask = (subtask: Subtask) => {
    setActiveSubtask(subtask);
    const updatedSubtasks = subtasks.map((st) => {
      if (st.id === subtask.id) {
        return { ...st, completed: false };
      }
      return st;
    });
    setSubtasks(updatedSubtasks);
  };

  const handleAddSubtask = () => {
    const newSubtask: Subtask = {
      id: subtasks.length,
      title: '',
      completed: false,
    };
    setSubtasks([...subtasks, newSubtask]);
    setEditMode(newSubtask.id);
  };

  const handleEditSubtask = (id: number) => {
    setEditMode(id);
  };

  const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  width: '600px',
  height: '620px',
  padding: '32px',
  backgroundColor: '#F8F9FF',
  borderRadius: '12px',
  border: '1px solid #D0D5DD',
};

const subtaskStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  marginBottom: '10px',
};

const inputStyle: React.CSSProperties = {
  flex: 1,
  marginRight: '10px',
  padding: '5px',
  border: '1px solid #D0D5DD',
  borderRadius: '4px',
};

const buttonStyle: React.CSSProperties = {
  marginLeft: '5px',
  padding: '5px',
  border: 'none',
  background: 'transparent',
  cursor: 'pointer',
};


  return (
    <div style={containerStyle}>
      <h2>{goal}</h2>
      {activeSubtask ? (
        <PomodoroTimer
        onTimerStart={handleTimerStart}
        onTimerFinish={ () =>  handleSubtaskCompleted(activeSubtask)}
        onTimerStop={handleTimerStop}
        subtaskTitle={activeSubtask.title}
        subtaskList={[]}
        goal={goal}
        />
      ) : (
        <>
          {subtasks.map((subtask) => (
            <div key={subtask.id} style={subtaskStyle}>
              {editMode === subtask.id ? (
                <input
                  type="text"
                  value={subtask.title}
                  onChange={(e) => handleSubtaskChange(subtask.id, e.target.value)}
                  style={inputStyle}
                  autoFocus
                />
              ) : (
                <span style={subtask.completed ? completedStyle : undefined}>{subtask.title}</span>
              )}
              <button onClick={() => handleSubtaskClick(subtask.title)} style={buttonStyle}>
                <FontAwesomeIcon icon={faPlay} />
              </button>
              <button onClick={() => handleEditSubtask(subtask.id)} style={buttonStyle}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </button>
              {subtask.completed && (
                <button onClick={() => handleRedoSubtask(subtask)} style={buttonStyle}>
                  <FontAwesomeIcon icon={faRedo} />
                </button>
              )}
            </div>
          ))}
          <button onClick={handleAddSubtask} style={{ marginTop: 'auto' }}>
            Add Subtask
          </button>
        </>
      )}
    </div>
  );
};

export default PrePomodoro;