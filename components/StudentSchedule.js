import React, { useState, useEffect } from 'react';
import logoImage from '../images/Group 4.png';
import profileimage from '../images/profile.png';
import styles from './StudentSchedule.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Notes from './Notes';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function StudentSchedule(props) {
  const [scheduleData, setScheduleData] = useState([]);
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [profileImage, setProfileImage] = useState(profileimage);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchSchedule(location, selectedDay);
  }, [location, selectedDay]);

  const fetchSchedule = (location, day) => {
    const urlParams = new URLSearchParams(location.search);
    const groupId = urlParams.get("group");

    if (!groupId || !day) {
      console.error("Error: Group ID or selected day is empty");
      return;
    }

    const formattedDay = day.toLocaleDateString('uk-UA', { weekday: 'long' });
    const url = `http://127.0.0.1:8000/schedule_display/?group=${groupId}&day_or_week=day&day=${encodeURIComponent(formattedDay)}`;

    /*axios.get(url)
      .then(response => {
        setScheduleData(response.data);
      })
      .catch(error => {
        console.error("Error:", error);
      });*/
    fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    setScheduleData(data);
  })
  .catch(error => {
    console.error("Error:", error);
  });
  }

  const handleCalendarChange = (day) => {
    setSelectedDay(day);
  };

  const handleDropdownChange = (event) => {
    const day = event.target.value;
    if (day) {
      const dayDate = new Date();
      dayDate.setDate(selectedDay.getDate() + (["Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця"].indexOf(day) - selectedDay.getDay() + 1));
      setSelectedDay(dayDate);
    }
  };

  const handleLogout = () => {
    navigate('/student-login');
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      setProfileImage(event.target.result);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className={styles.container}>
      <header>
        <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none', borderRadius: '50%' }} id="profile-image-input" data-testid="profile-icon" />
        <label htmlFor="profile-image-input">
          <img src={profileImage} className={styles.profile} alt='Profile icon' style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', left: '2%' }} />
        </label>
        
        <div className={styles.profileSettings}>
          <select id="profile_settings" name="profile_settings" data-testid="profile-settings" required onChange={handleLogout} style={{ borderRadius: '50%', backgroundColor: 'white', border: 0 }}>
            <option value=""></option>
            <option value="2">Налаштування</option>
            <option value="StudentLogin.js">Вийти</option>
          </select>
        </div>
        
        <img src={logoImage} alt="Логотип Золочівського фахового коледжу НУ ЛП" className={styles.logo} />
        
        <form>
          <label htmlFor="day" className={styles.dayLabel} style={{ marginLeft: '42%' }}>День</label>
          <div className={styles.customSelect}>
            <select id="day" name="day" onChange={handleDropdownChange} value={selectedDay.toLocaleDateString('uk-UA', { weekday: 'long' })}>
              <option value="">Оберіть день</option>
              <option value="Понеділок">Понеділок</option>
              <option value="Вівторок">Вівторок</option>
              <option value="Середа">Середа</option>
              <option value="Четвер">Четвер</option>
              <option value="П'ятниця">П'ятниця</option>
            </select>
          </div>
        </form>
      </header>
      <main>
        <div className={styles.scheduleContainer}>
          <ul className={styles.schedule}>
            {scheduleData.map((item, index) => (
              <li className={styles.scheduleItem} key={index}>
                <span className={styles.time}>◇ {item.time}</span>
                <span className={styles.subject}>↠ {item.subject_name}</span>
                <span className={styles.teacher}>↠ {item.teacher_last_name} {item.teacher_name}</span>
                <span className={styles.location}>↠ {item.location}</span>
              </li>
            ))}

            
            
            <div className={styles.notesContainer} style={{display:'flex', marginRight:'15%'}}>
              <Calendar
              onChange={handleCalendarChange}
              value={selectedDay}
              className={styles.calendar}
              data-testid="calendar"
              />
              <br/>
            <Notes className={styles.note} />
          </div>
            
          </ul>
        </div>
      </main>
    </div>
  );
}

export default StudentSchedule;
