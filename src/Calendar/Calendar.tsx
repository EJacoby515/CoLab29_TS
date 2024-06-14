import React, { ReactElement, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import { faChevronLeft, faChevronRight, faPlus } from '@fortawesome/free-solid-svg-icons';

const Calendar: React.FC = () => {
  const [weekRange, setWeekRange] = useState<string[]>([]);
  const [deltaWeeks, setdeltaWeeks] = useState(0);
  const [dayofweekToday, setdayofweekToday] = useState(7);
  const [weekText, setweekText] = useState('This Week')
  const [showReflection, setShowReflection] = useState(7);
  const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  let date = new Date();

  const getCurrentDate = (date: Date) => {
    setdayofweekToday(date.getDay());
  };

  const getWeekRange = (referenceDate: Date, deltaWeeks: number = 0) => {
    const shortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
    // Calculate the start of the reference week (Sunday)
    const startOfWeek = new Date(referenceDate);
    startOfWeek.setDate(referenceDate.getDate() - referenceDate.getDay() + (deltaWeeks * 7));
    startOfWeek.setHours(0, 0, 0, 0); // Normalize to midnight
  
    // Calculate the end of the week (Saturday)
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
  
    const formatDate = (date: Date): string => {
      const day = date.getDate();
      const month = shortMonths[date.getMonth()];
      return `${month} ${day}`;
    };
  
    const startString = formatDate(startOfWeek);
    const endString = formatDate(endOfWeek);
  
    setWeekRange([startString, endString]);
  };
  

  useEffect(() => {
    getCurrentDate(date);
  },[]);

  useEffect(() => {
    getWeekRange(date, deltaWeeks);
    if (deltaWeeks === 0) {
      setdayofweekToday(date.getDay());
      setweekText('This Week')
    } else {
      setdayofweekToday(7);
      setweekText("Past")
    }
  },[deltaWeeks]);

  const nextWeek = () => {
    if (deltaWeeks < 0) {
    setdeltaWeeks(prev => prev += 1);}
  };
  
  const previousWeek = () => {
    setdeltaWeeks(prev => prev -= 1);
  };

  const calendarcontainerStyle = {
    position: 'fixed',
    bottom: '150px',
    padding: '20px',
    right: '180px',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
    width: '400px',
    height: '360px',
    backgroundColor: '#F8F9FF',
    alignItems: 'center',
    borderRadius: '12px'
  } as React.CSSProperties;

  const weekContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    fontFamily: 'Arial',
    fontSize: '16px',
    fontWeight: '600',
    padding: '5px',
    lineHeight: '150%'
  } as React.CSSProperties;

  const reflectionContainerStyle = {
    backgroundColor: 'white',
    height: '156px',
    gap: '12px',
    width: '311px',
    borderRadius: '8px',
    padding: '10px',
    marginTop: '12px'
  } as React.CSSProperties;

  const pStyle = {
    fontFamily: 'Arial',
    margin: '5px 0'
  } as React.CSSProperties;

  const navigationStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  } as React.CSSProperties;

  const dayIconStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: '5px',
    borderRadius: '6px',
    color: '#EAECF0',
    border: '1px solid #EAECF0',
    fontSize: '20px',
    width: '32px',
    height: '32px',
    boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)'
  } as React.CSSProperties;

  const weekdayContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '0 5px'
  } as React.CSSProperties;

  const arrowStyle = {
    cursor: 'pointer',
    margin: '0 10px'
  } as React.CSSProperties;

  return (
    <>
      <div style={{ ...calendarcontainerStyle }}>
        
      <p style={{ ...pStyle, fontWeight: 500, fontSize: '18px', lineHeight: '28px' }}>Trends</p>

        {/* Arrowbuttons */}
        <div style={{ ...navigationStyle }}>
          <a style={{ ...arrowStyle }}>
            <FontAwesomeIcon icon={faChevronLeft} onClick={()=> previousWeek()} />
          </a>
          <div style={{ textAlign: 'center' }}>
            <p style={{ ...pStyle, color: 'black', fontSize: '14px' }}>
              {weekRange[0]} - {weekRange[1]}
            </p>
            <p style={{ ...pStyle, fontWeight: '600', color: 'black', fontSize: '14px' }}>
              {weekText}
            </p>
          </div>
          <a style={{ ...arrowStyle }}>
            <FontAwesomeIcon icon={faChevronRight} onClick={()=> nextWeek()} />
          </a>
        </div>

        <div style={{ ...weekContainerStyle }}>
          {weekdays.map((item, idx) => (
          <div key={idx} style={{ ...weekdayContainerStyle }}>
          <p style={{ margin: '2px', fontWeight: '500', color: 'black', fontSize: '14px' }}>{item}</p>
            <a style={{ ...dayIconStyle, border: dayofweekToday === idx ? '2px solid black' : '1px solid #C3C6CF' }}>
            <FontAwesomeIcon icon={faCircle} />
            </a>
          </div>
          ))}
        </div>

        <div style={{...reflectionContainerStyle}}>
          <hr style={{border: '4px solid #EAECF0', background: 'rgba(255, 255, 255, 1)'}} />
          <p style={{fontFamily: 'Arial', fontWeight: 400, fontSize: '14px', lineHeight: '20px', padding: '12px 14px', borderRadius: '8px', border: '1px solid #D0D5DD', overflowY: 'scroll', height: '105px', margin: 0 }}>
          </p>
        </div>

        
      </div>
    </>
  );
};

export default Calendar;
