import React, { useState, useEffect } from 'react';
import styles from './TeacherSchedule.module.css';
import logoImage from '../images/Group 4.png';
import profile from '../images/profile.png';

const TeacherSchedule = () => {
    const [schedule, setSchedule] = useState([]);

    useEffect(() => {
        const fetchTeacherSchedule = async () => {
            try {
                // Отримуємо teacherId з localStorage
                const teacherId = localStorage.getItem('teacherId');
                if (!teacherId) {
                    console.error('Teacher ID not found in localStorage');
                    return;
                }
                
                // Отримуємо розклад викладача за його teacherId
                const response = await fetch(`http://127.0.0.1:8000/teacher_schedule/${teacherId}/`);
                const data = await response.json();
                setSchedule(data);
            } catch (error) {
                console.error('Error fetching teacher schedule:', error);
            }
        };

        fetchTeacherSchedule();
    }, []);

    const handleEditSchedule = (index, field, newValue) => {
        const updatedSchedule = [...schedule];
        updatedSchedule[index][field] = newValue;
        setSchedule(updatedSchedule);
    };

    const handleSaveChanges = async (index) => {
        try {
            // Отримуємо teacherId з localStorage
            const teacherId = localStorage.getItem('teacherId');
            if (!teacherId) {
                console.error('Teacher ID not found in localStorage');
                return;
            }

            // Відправляємо оновлений рядок розкладу на сервер для збереження
            await fetch(`http://127.0.0.1:8000/update_schedule/${teacherId}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(schedule[index]),
            });
        } catch (error) {
            console.error('Error saving schedule changes:', error);
        }
    };

    const redirectToPage = (event) => {
        window.location.href = event.target.value;
    };

    const tableRows = schedule.map((row, index) => (
        <tr key={index}>
            <td>
                <input
                    type="text"
                    value={row.day}
                    onChange={(e) => handleEditSchedule(index, 'day', e.target.value)}
                />
            </td>
            <td>
                <input
                    type="text"
                    value={row.time}
                    onChange={(e) => handleEditSchedule(index, 'time', e.target.value)}
                />
            </td>
            <td>
                <input
                    type="text"
                    value={row.location}
                    onChange={(e) => handleEditSchedule(index, 'location', e.target.value)}
                />
            </td>
            <td style={{paddingLeft:'2.2%'}}>{row.group}</td>
            <td>
                <button onClick={() => handleSaveChanges(index)} className={styles.button2}>
                    Зберегти зміни
                </button>
            </td>
        </tr>
    ));

    return (
        <div className={styles.container}>
            <header>
                <img src={profile} className={styles.profile} alt="Profile icon" />
                <select className={styles.profileSettings2} name="profile_settings" data-testid="profile-settings" required onChange={redirectToPage}>
                    <option value=""></option>
                    <option value="/teacher-login">Вийти</option>
                    <option value="2">Налаштування</option>
                </select>
                <img className={styles.logo} src={logoImage} alt="Логотип" />
                <h1>Розклад занять</h1>
            </header>
            <main>
                <table>
                    <thead>
                        <tr>
                            <th>День</th>
                            <th>Час</th>
                            <th>Локація</th>
                            <th>Група</th>
                            <th>Можливі дії</th>
                        </tr>
                    </thead>
                    <tbody>{tableRows}</tbody>
                </table>
            </main>
        </div>
    );
}

export default TeacherSchedule;
