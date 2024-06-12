import React, { useState } from 'react';

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

  const notesContainerStyle: React.CSSProperties = {
    backgroundColor: '#F8F9FF',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    marginTop: '20px',
  };

  const notesTextareaStyle: React.CSSProperties = {
    width: '100%',
    resize: 'vertical',
    padding: '8px',
    border: '1px solid #D0D5DD',
    borderRadius: '4px',
    marginBottom: '16px',
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
    <div style={notesContainerStyle}>
      <h4>Add study notes here:</h4>
      <textarea
        value={notes}
        onChange={handleNoteChange}
        placeholder="Type your notes..."
        rows={4}
        style={notesTextareaStyle}
      />
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button onClick={() => convertNotes('doc')} style={notesSaveButtonStyle}>
          Save as .doc
        </button>
        <button onClick={() => convertNotes('txt')} style={notesSaveButtonStyle}>
          Save as .txt
        </button>
        <button onClick={() => convertNotes('pdf')} style={notesSaveButtonStyle}>
          Save as .pdf
        </button>
        <button onClick={saveNotes} style={notesSaveButtonStyle}>
          Save
        </button>
        <button onClick={onClose} style={notesSaveButtonStyle}>
          Close
        </button>
      </div>
    </div>
  );
};

export default QuickNotes;