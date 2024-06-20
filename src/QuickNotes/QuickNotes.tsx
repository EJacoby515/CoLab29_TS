import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleDown, faX, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import jsPDF from 'jspdf';

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

  const convertNotesToPDF = () => {
  const doc = new jsPDF();
  const lines = notes.split('\n');

  doc.setFontSize(12);
  let currentLine = 1;

  lines.forEach((line) => {
    if (currentLine > 1) {
      doc.text(line, 10, currentLine * 5);
    } else {
      doc.text(line, 10, 10);
    }
    currentLine++;
  });

  doc.save('quick_notes.pdf');
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
        <button onClick={convertNotesToPDF} style={notesSaveButtonStyle}>
          <FontAwesomeIcon icon={faFilePdf} /> Download PDF
        </button>
        <button onClick={onClose} style={notesSaveButtonStyle}>
          <FontAwesomeIcon icon={faX} />
        </button>
      </div>
    </>
  );
};

export default QuickNotes;