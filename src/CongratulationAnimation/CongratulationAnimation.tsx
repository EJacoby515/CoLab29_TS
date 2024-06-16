// CongratulationAnimation.tsx
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import styled, {keyframes } from 'styled-components';

const CongratulationAnimation: React.FC = () => {
  const [showAnimation, setShowAnimation] = useState(false);

  const shootingStarAnimation = keyframes `
  0% {
  transform: translateX(-100vw);
  }
  100% {
  transform: translateX(100vw);
  }`;

  const StarIcon = styled(FontAwesomeIcon)`
  font-size: 100px;
  color: #ffd700;
  animation: ${shootingStarAnimation} 3s linear;
`;

    useEffect(() => {
      setShowAnimation(true);
      const timeoutId = setTimeout(() => {
        setShowAnimation(false);
      }, 3000);
  
      return () => clearTimeout(timeoutId);
    }, []);
  
    const AnimationContainer = styled.div<{ showAnimation: boolean }>`
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
      opacity: ${(props) => (props.showAnimation ? 1 : 0)};
      transition: opacity 0.5s ease-in-out;
      pointer-events: none;
    `;
  
    return (
      <AnimationContainer showAnimation={showAnimation}>
        <StarIcon icon={faStar} />
      </AnimationContainer>
    );
  };
  
  export default CongratulationAnimation;