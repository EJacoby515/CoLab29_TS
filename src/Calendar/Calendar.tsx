import React, {  useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import { faChevronLeft, faChevronRight, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faFaceSmile, 
  faFaceMeh, 
  faFaceFrownOpen,
  faFaceLaugh} from '@fortawesome/free-regular-svg-icons';

interface Assessment {
  rating: number;
  reflection: string;
}

interface Assessments {
  [day: number]: Assessment[];
}

interface Props {
  assessments: {[week: string]: {[day: number]: Assessment[] } };
}

const Calendar: React.FC<Props> = () => {
  const [weekRange, setWeekRange] = useState<string[] | [null]>([null]);
  const [deltaWeeks, setdeltaWeeks] = useState(0);
  const [dayofweekToday, setdayofweekToday] = useState(7);
  const [weekText, setweekText] = useState("")
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const [retrievalSunday, setRetrievalSunday] = useState<string|null>(null); 
  const [assessments, setAssessments] = useState<Assessments>({});
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

    setRetrievalSunday(startOfWeek.toISOString().split('T')[0]);
  
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

  const getWeekData = async (sunday: string): Promise<Assessments> => {
    try {
      const response = await new Promise<Assessments>((resolve, reject) => {
        console.log("sunday I am sending", sunday)
        const sendingsunday = sunday;
        chrome.runtime.sendMessage({ action: "fetchAssessment", sunday: sendingsunday }, (response) => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve(response);
          }
        });
      });
      return response || {};
      } catch (error) {
        console.log('Error:', error);
        return {};
      };
  }

  const translateRating = (rating: number) => {
    switch (rating) {
      case 1:
        return { icon: faFaceFrownOpen, color: '#E31B54' };
      case 2:
        return { icon: faFaceMeh, color: '#FF692E' };
      case 3:
        return { icon: faFaceSmile, color: '#EAAA08' };
      case 4:
        return { icon: faFaceSmile, color: '#66C61C' };
      case 5:
        return { icon: faFaceLaugh, color: '#099250' };
      default:
        return { icon: faCircle, color: '#EAECF0' };
    }
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
      setweekText("Past Week")
    }
  },[deltaWeeks]);

  useEffect(() => {
    if (weekRange && retrievalSunday){
      getWeekData(retrievalSunday).then(data => setAssessments(data));
    }
  }, [weekRange, retrievalSunday])

  const nextWeek = () => {
    if (deltaWeeks < 0) {
    setdeltaWeeks(prev => prev += 1);}
    setSelectedDay(null);
  };
  
  const previousWeek = () => {
    setdeltaWeeks(prev => prev -= 1);
    setSelectedDay(null);
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
    padding: '5px',
    borderRadius: '6px',
    color: '#EAECF0',
    border: '1px solid #EAECF0',
    fontSize: '20px',
    width: '32px',
    height: '32px',
    boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
    cursor: 'pointer',
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
        <div style={navigationStyle}>
          <a style={arrowStyle}>
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
          <div key={idx} style={weekdayContainerStyle}>
          <p style={{ margin: '2px', fontWeight: '500', color: 'black', fontSize: '14px' }}>{item}</p>
            <a style={{ ...dayIconStyle, border: selectedDay === idx ?  '2px solid black' : '1px solid #EAECF0' }} onClick={() => setSelectedDay(idx)}>
            {assessments[idx] && assessments[idx][0] ? (
              <FontAwesomeIcon icon={translateRating(assessments[idx][0].rating).icon} color={translateRating(assessments[idx][0].rating).color} />
            ) : (
              <FontAwesomeIcon icon={faCircle} color={dayofweekToday === idx ? '#3B7C0F' : '#EAECF0'} />
            )}
            </a>
          </div>
          ))}
        
        </div>

        {selectedDay !== null && assessments[selectedDay] && assessments[selectedDay][0] ? (
        <div style={reflectionContainerStyle}>
          <hr style={{ border: '4px solid #3B7C0F', background: 'rgba(255, 255, 255, 1)' }} />
          <p style={{ fontFamily: 'Arial', fontWeight: 400, fontSize: '14px', lineHeight: '20px', padding: '12px 14px', borderRadius: '8px', border: '1px solid #D0D5DD', overflowY: 'scroll', height: '105px', margin: 0 }}>
            {assessments[selectedDay][0].reflection}
          </p>
        </div>
      ) : 

        <div style={{...reflectionContainerStyle}}>
          <hr style={{border: '4px solid #EAECF0', background: 'rgba(255, 255, 255, 1)'}} />
          <p style={{fontFamily: 'Arial', fontWeight: 400, fontSize: '14px', lineHeight: '20px', padding: '12px 14px', borderRadius: '8px', border: '1px solid #D0D5DD', overflowY: 'scroll', height: '105px', margin: 0 }}>
          </p>
        </div>
      }
        
      </div>
    </>
  );
};

export default Calendar;
