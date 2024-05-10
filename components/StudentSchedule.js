import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logoImage from '../images/Group 4.png';
import profileimage from '../images/profile.png';
import styles from './StudentSchedule.module.css';
import { useLocation, useNavigate  } from 'react-router-dom';
import Notes from './Notes';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function StudentSchedule(props) {
  const [scheduleData, setScheduleData] = useState([]);
  const [selectedDay, setSelectedDay] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchSchedule(location);
  }, [location]);

  const fetchSchedule = (location) => {
    const urlParams = new URLSearchParams(location.search);
    const groupId = urlParams.get("group");
    const selectedDay = document.getElementById("day").value;

    if (!groupId || !selectedDay) {
      console.error("Error: Group ID or selected day is empty");
      return;
    }

    const url = `http://127.0.0.1:8000/schedule_display/?group=${groupId}&day_or_week=day&day=${encodeURIComponent(selectedDay)}`;

    axios.get(url)
      .then(response => {
        setScheduleData(response.data);
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }

  const handleChange = (selectedDay) => { 
    setSelectedDay(selectedDay);
    fetchSchedule(location, selectedDay); 
  };
  const handleLogout = () => {
    navigate('/student-login');
  };

  return (
    <div className={styles.container}>
      <header>
        <img src={ profileimage } className={styles.profile} alt='Profile icon' />
        <div className={styles.profileSettings}>
          <select id="profile_settings" name="profile_settings" required onChange={handleLogout} style={{ borderRadius: '50%', backgroundColor:'white', border:0}}>
            <option value=""></option>
            <option value="2">Налаштування</option>
            <option value="StudentLogin.js">Вийти</option>
          </select>
        </div>
        <img src={logoImage} alt="Логотип Золочівського фахового коледжу НУ ЛП" className={styles.logo} />
        <form>
          <label htmlFor="day" className={styles.dayLabel} style={{marginLeft: '42%'}}>День</label>
          <div className={styles.customSelect}>
            <select id="day" name="day" onChange={(e) => fetchSchedule(location, e.target.value)}>
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
            <Notes />
            <Calendar
            onChange={handleChange} 
            value={selectedDay} 
            className={styles.calendar}
            />
            <p style={{color:'#000'}}>
              Золочівський коледж
            </p>
          </ul>
        </div>
      </main>
    </div>
  );
}

export default StudentSchedule;