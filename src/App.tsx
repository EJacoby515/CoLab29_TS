import React from 'react';
import FloatingMenuButton from './FloatingMenuButton/FloatingMenuButton';
import { AssessmentData } from './Assessment/Assessment';

const App: React.FC = () => {
  const handleAssessmentSubmit = (assessment: AssessmentData) => {
    console.log('Assessment Submitted: ', assessment);
  }

  const handleBackClick = () => {
    console.log('Back button clicked');
  }
  return <FloatingMenuButton 
  handleAssessmentSubmit={handleAssessmentSubmit}
  handleBackClick={handleBackClick}
  />;
};

export default App;
