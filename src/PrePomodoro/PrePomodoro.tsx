import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPencilAlt, faRepeat, faPlus, faCheck, faArrowLeft, faTimes } from '@fortawesome/free-solid-svg-icons';
import PomodoroTimer from '../PomodoroTimer/PomodoroTimer';
import Assessment, { AssessmentData } from '../Assessment/Assessment';

interface Props {
  goal: string;
  subtasksList: string[];
  onSubtaskClick: (subtask: Subtask) => void;
  handleTimerStart: () => void;
  handleTimerStop: () => void;
  showAssessment: boolean;
  setShowAssessment: React.Dispatch<React.SetStateAction<boolean>>;
  handleAssessmentSubmit: (assessment: AssessmentData) => void;
  assessment: { [week: string]: { [day: number]: AssessmentData[] } };
  onClose: () => void;
  
}
interface Subtask {
  id: number;
  title: string;
  completed: boolean;
  started: boolean;
}

const PrePomodoro: React.FC<Props> = ({ goal, subtasksList, onSubtaskClick, handleTimerStart, handleTimerStop, showAssessment, setShowAssessment, handleAssessmentSubmit, onClose }) => {
  const [subtasks, setSubtasks] = useState<Subtask[]>([]);
  const [activeSubtask, setActiveSubtask] = useState<Subtask | null>(null);
  const [editMode, setEditMode] = useState<number | null>(null);
  const [showPomodoroTimer, setShowPomodoroTimer] = useState(false);

  useEffect(() => {
    setSubtasks(subtasksList.map((title: string, index: number) => ({ id: index, title, completed: false, started: false })));
  }, [subtasksList]);

  useEffect(() => {
    const anySubtaskStarted = subtasks.some((subtask) => subtask.started);
    const allSubtasksCompleted = subtasks.every((subtask) => subtask.completed);

    if (anySubtaskStarted && allSubtasksCompleted) {
      setShowAssessment(false);
    } else {
      setShowAssessment(false);
    }
  }, [subtasks, setShowAssessment]);

  const handleSubtaskChange = (id: number, title: string) => {
    const updatedSubtasks = subtasks.map((subtask) => {
      if (subtask.id === id) {
        return { ...subtask, title };
      }
      return subtask;
    });
    setSubtasks(updatedSubtasks);
  };

  const handleSubtaskClick = (subtask: Subtask) => {
    setActiveSubtask(subtask);
    setEditMode(null);

    const updatedSubtasks = subtasks.map((st) => {
      if (st.id === subtask.id) {
        return { ...st, started: true };
      }
      return st;
    });
    setSubtasks(updatedSubtasks);
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

    if (updatedSubtasks.every((subtask) => subtask.completed)) {
      setShowAssessment(false);
    }
  };

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
      started: false,
    };
    setSubtasks([...subtasks, newSubtask]);
    setEditMode(newSubtask.id);
  };

  const handleEditSubtask = (id: number) => {
    setEditMode(id);
  };

  const handleStartPomodoroTimer = () => {
    setShowPomodoroTimer(true);
    handleTimerStart();
  }

  const handleTimerFinish = () => {
    setShowPomodoroTimer(false);
    if (activeSubtask) {
      handleSubtaskCompleted(activeSubtask);
    }
    setShowAssessment(true);
  };

  const handleEndSession = () => {
    setShowAssessment(true);
  }
  
 

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    minWidth: '375px',
    padding: '24px',
    backgroundColor: '#F8F9FF',
    borderRadius: '12px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    width: '400px',
    height: '550px',
    border: '1px solid #D0D5DD',
    fontFamily: 'Inter, sans-serif',
    position: 'relative', 
  };

  const backButtonStyle: React.CSSProperties = {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#38608F',
    cursor: 'pointer',
    fontSize: '24px',
    padding: '0',
    margin: '0',
    position: 'absolute', 
    top: '10px',
    left: '10px',
  };

  const goalStyle: React.CSSProperties = {
    fontSize: '18px',
    fontWeight: 500,
    fontFamily: 'Arial',
    marginBottom: '16px',
  };

  const subtaskContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: '#38608F',
    border: '1px solid #C3C6CF',
    borderRadius: '8px',
    padding: '12px 16px',
    marginBottom: '8px',

  };

  const subtaskTitleStyle: React.CSSProperties = {
    flex: 1,
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginRight: '8px',
    fontSize: '16px',
    fontWeight: 500,
    marginBottom: '8px',
  };

  const subtaskButtonsStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const inputStyle: React.CSSProperties = {
    padding: '8px 12px',
    border: '1px solid #E0E0E0',
    borderRadius: '4px',
    fontFamily: 'Inter, sans-serif',
    fontSize: '14px',
  };

  const buttonStyle: React.CSSProperties = {
    padding: '8px 14px',
    backgroundColor: '#38608F',
    color: '#FFFFFF',
    borderRadius: '4px',
    border: '1px solid #DCDFEA',
    cursor: 'pointer',
    marginRight: '8px',
    fontFamily: 'Inter, sans-serif',
    fontSize: '14px',
    fontWeight: 500,
  };

  const addButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: '#F0F0F0',
    color: '#38608F',
    marginTop: '16px',
  };

  const completedStyle: React.CSSProperties = {
    textDecoration: 'line-through',
    color: 'red',
  };

  const pomodoroTimerContainerStyle: React.CSSProperties={
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '400px',
  };

  const closeButtonStyle: React.CSSProperties ={
    backgroundColor: 'transparent',
    border: 'none',
    color: '#38608F',
    cursor: 'pointer',
    fontSize: '24px',
    padding: '0',
    margin: '0',
    position: 'absolute',
    top: '10px',
    right: '10px',
  };

  return (
    <div style={containerStyle}>
      {showAssessment ? (
        <>
        <Assessment
          onAssessmentSubmit={(assessment: AssessmentData) => handleAssessmentSubmit(assessment)}
          assessment={{ rating: 0, reflection: '' }}
        />
        <button style={closeButtonStyle} onClick={onClose}>
          <FontAwesomeIcon  icon={faTimes}  />
        </button>
        </>
      ) : (
        <>
          {showPomodoroTimer ? (
            <div style={pomodoroTimerContainerStyle}>
              <button style={backButtonStyle} onClick={() => setShowPomodoroTimer(false)}>
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>
              <PomodoroTimer
                onTimerStart={handleTimerStart}
                onTimerFinish={handleTimerFinish}
                subtaskTitle={activeSubtask ? activeSubtask.title : ''}
                subtaskList={[]}
                goal={goal}
              />
            </div>
          ) : (
            <>
              <h2 style={goalStyle}>{goal}</h2>
              <div>
                {subtasks.map((subtask) => (
                  <div key={subtask.id} style={subtaskContainerStyle}>
                    <div style={subtaskTitleStyle}>
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
                    </div>
                    <div style={subtaskButtonsStyle}>
                      <button
                        onClick={() => {
                          setActiveSubtask(subtask);
                          setShowPomodoroTimer(true);
                          handleTimerStart();
                        }}
                        style={buttonStyle}
                      >
                        <FontAwesomeIcon icon={faPlay} /> Start Timer
                      </button>
                      <button onClick={() => handleEditSubtask(subtask.id)} style={buttonStyle}>
                        <FontAwesomeIcon icon={faPencilAlt} /> Edit Task
                      </button>
                      {subtask.completed && (
                        <button onClick={() => handleRedoSubtask(subtask)} style={buttonStyle}>
                          <FontAwesomeIcon icon={faRepeat} /> Repeat Task
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <button onClick={handleStartPomodoroTimer} style={addButtonStyle}>
                  Start Pomodoro Timer <FontAwesomeIcon icon={faPlay} />
                </button>
                <button onClick={handleAddSubtask} style={addButtonStyle}>
                  Add Subtask <FontAwesomeIcon icon={faPlus} />
                </button>
                {subtasks.every((subtask) => subtask.completed) && (
                  <button onClick={handleEndSession} style={addButtonStyle}>
                    End Session <FontAwesomeIcon icon={faCheck} />
                  </button>
                )}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default PrePomodoro;

