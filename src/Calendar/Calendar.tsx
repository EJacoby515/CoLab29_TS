import React, { ReactElement, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import { faChevronLeft, faChevronRight, faPlus } from '@fortawesome/free-solid-svg-icons';

const Calendar: React.FC = () => {
  const [today, setToday] = useState('');
  const [selectedDay, setSelectedDay] = useState('')
  const [week, setWeek] = useState<string[]>([]);
  
  // const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  // const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  

  const getCurrentDate = () => {
    let date = new Date();
    setToday(date.toDateString());
    getWeek(date);
  };

  const getWeek = (date: Date) => {
    let start = new Date(date);
    console.log(start);
    if (start.getDay() !== 0) {
      start.setDate(start.getDate() - start.getDay());
    }
    let mylst: string[] = [];
    for (let i = 0; i < 7; i++) {
      let added = start.toDateString().slice(4, 10);
      mylst.push(added);
      start.setDate(start.getDate() + 1);
    }
    setWeek([...mylst]);
  };

  useEffect(() => {
    getCurrentDate();
  }, []);

  // const goToPreviousWeek = () => {
  //   const firstDayOfCurrentWeek = new Date(currentYear, currentMonth, parseInt(week[0].split(' ')[1]));
  //   const previousWeek = new Date(firstDayOfCurrentWeek);
  //   previousWeek.setDate(firstDayOfCurrentWeek.getDate() - 7);
  //   setCurrentMonth(previousWeek.getMonth());
  //   setCurrentYear(previousWeek.getFullYear());
  //   getWeek(previousWeek);
  // };

  // const goToNextWeek = () => {
  //   const firstDayOfCurrentWeek = new Date(currentYear, currentMonth, parseInt(week[0].split(' ')[1]));
  //   const nextWeek = new Date(firstDayOfCurrentWeek);
  //   console.log(nextWeek);
  //   nextWeek.setDate(firstDayOfCurrentWeek.getDate() + 7);
  //   if (nextWeek <= new Date()) {
  //     setCurrentMonth(nextWeek.getMonth());
  //     setCurrentYear(nextWeek.getFullYear());
  //     getWeek(nextWeek);
  //   }
  // };

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
            <FontAwesomeIcon icon={faChevronLeft} />
          </a>
          <div style={{ textAlign: 'center' }}>
            <p style={{ ...pStyle, color: 'black', fontSize: '14px' }}>
              {week[0]} - {week[6]}
            </p>
            <p style={{ ...pStyle, fontWeight: '600', color: 'black', fontSize: '14px' }}>
              This week
            </p>
          </div>
          <a style={{ ...arrowStyle }}>
            <FontAwesomeIcon icon={faChevronRight} />
          </a>
        </div>


        <div style={{ ...weekContainerStyle }}>
          <div style={{ ...weekdayContainerStyle }}>
            <p style={{ margin: '2px', fontWeight: '500', color: 'black', fontSize: '14px' }}>Su</p>
            <a style={{ ...dayIconStyle }}>
              <FontAwesomeIcon icon={faCircle} />
            </a>
          </div>
          <div style={{ ...weekdayContainerStyle }}>
            <p style={{ margin: '2px', fontWeight: '500', color: 'black', fontSize: '14px' }}>Mo</p>
            <a style={{ ...dayIconStyle }}>
              <FontAwesomeIcon icon={faCircle} />
            </a>
          </div>
          <div style={{ ...weekdayContainerStyle }}>
            <p style={{ margin: '2px', fontWeight: '500', color: 'black', fontSize: '14px' }}>Tu</p>
            <a style={{ ...dayIconStyle }}>
              <FontAwesomeIcon icon={faCircle} />
            </a>
          </div>
          <div style={{ ...weekdayContainerStyle }}>
            <p style={{ margin: '2px', fontWeight: '500', color: 'black', fontSize: '14px' }}>We</p>
            <a style={{ ...dayIconStyle }}>
              <FontAwesomeIcon icon={faCircle} />
            </a>
          </div>
          <div style={{ ...weekdayContainerStyle }}>
            <p style={{ margin: '2px', fontWeight: '500', color: 'black', fontSize: '14px' }}>Th</p>
            <a style={{ ...dayIconStyle }}>
              <FontAwesomeIcon icon={faCircle} />
            </a>
          </div>
          <div style={{ ...weekdayContainerStyle }}>
            <p style={{ margin: '2px', fontWeight: '500', color: 'black', fontSize: '14px' }}>Fr</p>
            <a style={{ ...dayIconStyle }}>
              <FontAwesomeIcon icon={faCircle} />
            </a>
          </div>
          <div style={{ ...weekdayContainerStyle }}>
            <p style={{ margin: '2px', fontWeight: '500', color: 'black', fontSize: '14px' }}>Sa</p>
            <a style={{ ...dayIconStyle }}>
              <FontAwesomeIcon icon={faCircle} />
            </a>
          </div>
        </div>

        <div style={{...reflectionContainerStyle}}>
          <hr style={{border: '4px solid #EAECF0', background: 'rgba(255, 255, 255, 1)'}} />
          <p style={{fontFamily: 'Arial', fontWeight: 400, fontSize: '14px', lineHeight: '20px', padding: '12px 14px', borderRadius: '8px', border: '1px solid #D0D5DD', overflowY: 'scroll', height: '105px', margin: 0 }}>
            {today}
          </p>
        </div>
        
      </div>
    </>
  );
};

export default Calendar;
