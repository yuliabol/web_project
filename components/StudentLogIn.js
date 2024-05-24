import React, { useState, useEffect } from 'react';
import styles from './StudentLogIn.module.css';
import logoImage from '../images/Group 4.png';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function StudentLogIn() {
    const [groups, setGroups] = useState([]);
    const [selectedGroupId, setSelectedGroupId] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/groups/')
            .then(response => response.json())
            .then(data => setGroups(data))
            .catch (error => console.error('Error:', error));
    }, []);

    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate('/'); 
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        //setErrorMessage('');
        try {
            const response = await fetch(`http://127.0.0.1:8000/student_login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ first_name: name, last_name: surname })
            });
        
            const data = await response.json();
            
            if (data.success) { 
                localStorage.setItem('isLoggedIn', true);
                navigate(`/student-schedule?group=${selectedGroupId}`);
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleGroupChange = (event) => {
        setSelectedGroupId(event.target.value);
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleSurnameChange = (event) => {
        setSurname(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    
    return (
        <>
            <div className={styles.container}>
                <h1>Вхід</h1>
                <form onSubmit={handleSubmit} data-testid="login-form">
                    <label htmlFor="name">Ім'я:</label>
                    <input type="text" id="name" value={name} onChange={handleNameChange} required />
                    <br />
                    <label htmlFor="surname">Прізвище:</label>
                    <input type="text" id="surname" value={surname} onChange={handleSurnameChange} required />
                    <br />
                    <label htmlFor="group">Група:</label>
                    <select id="group" value={selectedGroupId} onChange={handleGroupChange} required>
                        <option value="">Оберіть групу</option>
                        {groups.map((group) => (
                            <option key={group.id} value={group.id}>
                                {group.name} - {group.year}
                            </option>
                        ))}
                    </select>
                    <br />
                    <label htmlFor="password">Пароль:</label>
                    <input type="password" id="password" value={password} onChange={handlePasswordChange} required />
                    <br />
                    <br />
                    <button type="submit">OK</button>
                    
                    <p>
                        <Link to="/teacher-login" className="teacher-link" style={{ textDecoration: 'none', fontSize: '1em' }}>Я викладач</Link>
                        
                        <img className={styles.img2} src={logoImage} alt='logo' style={{ width: '5%', position: 'absolute', marginLeft:'50%'}} onClick={handleLogoClick }/>
                    </p>
                </form>
            </div>
            <footer className="footer">
                <p>&copy; 2024 Золочівський фаховий коледж НУ “Львівська політехніка”</p>
            </footer>
        </>
    );
}

export default StudentLogIn;
