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
    <div style={{ position: 'absolute', top: '100%', left: '0', backgroundColor: 'white', padding: '10px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)' }}>
      <textarea value={notes} onChange={handleNoteChange} placeholder="Add study notes here" rows={4} cols={30} />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
        <button onClick={saveNotes}>Save</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default QuickNotes;