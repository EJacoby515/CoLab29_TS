import React, { ReactElement, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import {faChevronLeft, faChevronRight, faPlus} from '@fortawesome/free-solid-svg-icons';



const Calendar: React.FC = () => {

  const [today, setToday] = useState('');
  const [week, setWeek] = useState<string[]>([]);

  const getDates = () => {
    let date = new Date();
    setToday(date.toDateString());
    getWeek(date.toDateString())
  }

  const getWeek = (date:string) => {
    let start = new Date(date)
    console.log(start)
    if (start.getDay() !== 0) {
      start.setDate(start.getDate() - start.getDay())
    }
    let mylst: string[] = []
    for (let i=0 ; i < 7; i++) {
      let added = start.toDateString().slice(4,10)
      mylst.push(added)
      start.setDate(start.getDate() + 1)
    }
    setWeek([...mylst])
  }

  useEffect(() => {getDates();}, [])

  const calendarcontainerStyle = {
    position: 'fixed',
    bottom: '150px',
    padding: '20px',
    right: '180px',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
    width: '400px',
    backgroundColor: 'white',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    alignItems: 'center'
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

  const pStyle = {
    color: '#767676',
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
    backgroundColor: 'white',
    padding: '5px',
    borderRadius: '2px',
    color: 'lightgray',
    border: '1px solid #767676',
    fontSize: '20px'
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
      <div style={{...calendarcontainerStyle}}>
        <p style={{...pStyle, margin: '0'}}>Today: {today}</p>
        <div style={{...weekContainerStyle}}>
          <div style={{...weekdayContainerStyle}}>
            <p>Su</p>
            <a style={{...dayIconStyle}}>
              <FontAwesomeIcon icon={faPlus}/></a>
          </div>
          <div style={{...weekdayContainerStyle}}>
            <p>Mo</p>
            <a style={{...dayIconStyle}}>
              <FontAwesomeIcon icon={faPlus}/></a>
          </div>
          <div style={{...weekdayContainerStyle}}>
            <p>Tu</p>
            <a style={{...dayIconStyle}}>
              <FontAwesomeIcon icon={faPlus}/></a>
          </div>
          <div style={{...weekdayContainerStyle}}>
            <p>We</p>
            <a style={{...dayIconStyle}}>
              <FontAwesomeIcon icon={faPlus}/></a>
          </div>
          <div style={{...weekdayContainerStyle}}>
            <p>Th</p>
            <a style={{...dayIconStyle}}>
              <FontAwesomeIcon icon={faPlus}/></a>
          </div>
          <div style={{...weekdayContainerStyle}}>
            <p>Fr</p>
            <a style={{...dayIconStyle}}>
              <FontAwesomeIcon icon={faPlus}/></a>
          </div>
          <div style={{...weekdayContainerStyle}}>
            <p>Sa</p>
            <a style={{...dayIconStyle}}>
              <FontAwesomeIcon icon={faPlus}/></a>
          </div>
        </div>
        <p style={{...pStyle, fontWeight: '600'}}>Session streaks</p>
        <p style={{...pStyle}}>Keep up the good work!</p>
        <div style={{...navigationStyle}}>
          <a style={{...arrowStyle}}><FontAwesomeIcon icon={faChevronLeft}/></a>
          <div style={{textAlign: 'center'}}>
            <p style={{...pStyle, color: 'black'}}>{week[0]} - {week[6]}</p>
            <p style={{...pStyle, fontWeight: '600', color: 'black'}}>This week</p>
          </div>
          <a style={{...arrowStyle}}><FontAwesomeIcon icon={faChevronRight}/></a>
        </div>
      </div>
    </>
  );
};

export default Calendar;
