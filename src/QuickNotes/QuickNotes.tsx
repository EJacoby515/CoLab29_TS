import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleDown, faX } from '@fortawesome/free-solid-svg-icons';

const QuickNotes: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [notes, setNotes] = useState('');

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
  };

  const saveNotes = () => {
    chrome.runtime.sendMessage({ action: "saveQuickNotes", notes }, (response) => {
      if (response.success) {
        console.log("Quick notes saved successfully");
      } else {
        console.error("Error saving quick notes:", response.error);
      }
    });
  };

  const convertNotes = (format: 'doc' | 'txt' | 'pdf') => {
    chrome.runtime.sendMessage({ action: "convertQuickNotes", format }, (response) => {
      if (response.success) {
        console.log(`Quick notes converted to ${format} format and downloaded`);
      } else {
        console.error("Error converting quick notes:", response.error);
      }
    });
  };

  const notesTextareaStyle: React.CSSProperties = {
    resize: 'vertical',
    width: '200px',
    height: '154px',
    padding: '8px',
    border: '1px solid #D0D5DD',
    borderRadius: '4px',
    marginBottom: '16px',
    fontFamily: 'Roboto',
  };

  const notesSaveButtonStyle: React.CSSProperties = {
    padding: '8px 16px',
    backgroundColor: '#38608F',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '8px',
  };

  return (
    <>
      <textarea
        value={notes}
        onChange={handleNoteChange}
        placeholder="Add study notes here"
        style={notesTextareaStyle}
      />
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button onClick={() => convertNotes('doc')} style={notesSaveButtonStyle}>
          <FontAwesomeIcon icon={faCircleDown} />
        </button>

        {/* Hey Eric... I feel all the buttons are a little distracting so maybe we  just pick one file type and have that be the "download" button? */}

        {/* <button onClick={() => convertNotes('txt')} style={notesSaveButtonStyle}>
          <FontAwesomeIcon icon={faCircleDown} /> .txt
        </button>
        <button onClick={() => convertNotes('pdf')} style={notesSaveButtonStyle}>
          <FontAwesomeIcon icon={faCircleDown} /> .pdf
        </button>
        <button onClick={saveNotes} style={notesSaveButtonStyle}>
          Save
        </button> */}

        <button onClick={onClose} style={notesSaveButtonStyle}>
          <FontAwesomeIcon icon={faX} />
        </button>
      </div>
    </>
  );
};

export default QuickNotes;