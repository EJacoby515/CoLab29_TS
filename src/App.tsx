import React from 'react';
import FloatingMenuButton from './FloatingMenuButton/FloatingMenuButton';
import { AssessmentData } from './Assessment/Assessment';

const App: React.FC = () => {
  const handleAssessmentSubmit = (assessment: AssessmentData) => {
    console.log('Assessment Submitted: ', assessment);
  }
  return <FloatingMenuButton handleAssessmentSubmit={handleAssessmentSubmit} />;
};

export default App;
