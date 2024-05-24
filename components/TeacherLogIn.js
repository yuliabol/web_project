import React, { useState } from 'react';
import styles from './TeacherLogIn.module.css';
import logoImage from '../images/Group 4.png';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';



function TeacherLogIn() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
    event.preventDefault();
        try {
    const response = await fetch(`http://127.0.0.1:8000/teacher_id/${firstName}/${lastName}/`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    const teacherId = data.teacher_id;
    localStorage.setItem('teacherId', teacherId);
    navigate(`/teacher-schedule`);
} catch (error) {
    console.error('Error fetching teacher ID:', error);
        }
        
    /*try {
        const response = await axios.get(`http://127.0.0.1:8000/teacher_id/${firstName}/${lastName}/`);
        const teacherId = response.data.teacher_id;
        localStorage.setItem('teacherId', teacherId);
        navigate(`/teacher-schedule`);
    } catch (error) {
        console.error('Error fetching teacher ID:', error);
    }*/
    };  

    const handleLogoClick = () => {
    navigate('/'); // Replace '/' with the path to your main page
  };

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    };

        return (
            <div className={styles.container}>
                <div className="content">
                    <h1>Введіть дані для входу</h1>
                    <form id="registration-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Ім'я:</label>
                            <input type="text" id="name" name="name" value={firstName} onChange={handleFirstNameChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="surname">Прізвище:</label>
                            <input type="text" id="surname" name="surname" value={lastName} onChange={handleLastNameChange} required />
                        </div>
                        <label htmlFor="password">Пароль:</label>
                        <input type="password" id="password" name="password" required />
                        <button type="submit">OK</button>
                        <p>
                            <Link to="/student-login" className="student-link" style={{ textDecoration: 'none', fontSize: '0.8em' }}>Я студент</Link>
                            <img className={styles.img2} alt='logo' src={logoImage} style={{ width: '5%', position: 'absolute', marginLeft: '65%' }} onClick={handleLogoClick }/>
                        </p>
                    </form>
                </div>
            </div>
        );
    }

export default TeacherLogIn;