import React, { useState } from 'react';

const QuickNotes: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [notes, setNotes] = useState('');

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
  };

  const saveNotes = () => {
    chrome.storage.sync.set({ notes }, () => {
      console.log('Notes saved');
    });
  };

  return (
    <div style={{ backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '4px', marginTop: '20px' }}>
      <h4>Add study notes here:</h4>
      <textarea
        value={notes}
        onChange={handleNoteChange}
        placeholder="Type your notes..."
        rows={4}
        style={{ width: '100%', resize: 'vertical', marginBottom: '10px' }}
      />
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button onClick={saveNotes} style={{ marginRight: '10px' }}>
          Save
        </button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default QuickNotes;