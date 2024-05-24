import React from 'react';
import './Home.css'; 
import collegeImage from '../images/Group 2.png';
import logoImage from '../images/Group 4.png';
import { Link } from 'react-router-dom';

function Home() {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <><div className="home-container">
      <nav className="menu">
        <ul>
          <li className="dropdown" onMouseEnter={handleToggle} onMouseLeave={handleToggle}>
            <Link to="/about">Про нас</Link>
            {isOpen && (
              <ul style={{ position: 'absolute', marginTop: '5%' }}>
                <Link to="/about">Загальна інформація</Link>
                <br />
                <br />
                <Link to="/about">Віртуальний тур</Link>
              </ul>
            )}
          </li>

          <li><Link to="/contacts">Контакти</Link></li>
        </ul>
      </nav>
      <div className="image-of-college">
        <img src={collegeImage} alt="College" className="college" />
      </div>
      <div className="logo">
        <img src={logoImage} alt="Logo" className="logo-college" />
      </div>
      <div className="learn-more">
        <span className="learn-more-text">&#9656; Дізнатись більше </span>
        <a href="https://zcollage.com.ua/" className="website-link"> https://zcollage.com.ua/ </a>
      </div>
      <div className="college-info">
        <p className="college-name">Золочівський фаховий коледж НУ “Львівська політехніка”</p>
        <br />
        <Link to="/student-login" className="student-link" style={{ marginRight: '5%' }}>&#8594; Студенту</Link>

        <Link to="/teacher-login" className="teacher-link">&#8594; Викладачу</Link>
      </div>
      
    </div>
      <footer className="footer" style={{bottom:'0'}}>&copy; 2024 Золочівський фаховий коледж НУ “Львівська політехніка”
      </footer>
    </>
  );
}

export default Home;
