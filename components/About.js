import React from 'react';
import './About.css'; 
import { Link } from 'react-router-dom';

function About() {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    
    <><div>
      <nav className='menu_new'>
        <ul style={{marginTop:'1.1%'}}>
          <li onMouseEnter={handleToggle} onMouseLeave={handleToggle}>
            <Link to="/">Головна</Link>
          </li>

          <li><Link to="/contacts">Контакти</Link></li>
        </ul>
      </nav>
    </div><div className='tour'>
        <h2 style={{ textAlign: 'center', backgroundColor: 'rgba(158, 130, 142, 0.21)', color:'rgba(158, 130, 142, 0.0)', paddingTop:'1.6%'}}>....</h2>
        <iframe width="98%" height="650" title='tour' frameborder="0" allow="xr-spatial-tracking; gyroscope; accelerometer" allowfullscreen scrolling="no" src="https://kuula.co/share/collection/7cB0z?logo=1&info=1&fs=1&vr=0&sd=1&thumbs=1" style={{ margin: '10px' }}></iframe>
        <Link to="/" className="home">&#8594; На головну</Link>
        <h2 style={{ textAlign: 'center', backgroundColor: 'rgba(158, 130, 142, 0.21)' }}>Золочівський коледж на 3D карті Google</h2>
        <iframe style={{ border: '0', marginLeft: '30%' }} src="https://www.google.com/maps/embed?pb=!1m0!3m2!1sru!2s!4v1446143053613!6m8!1m7!1sPI78cJesad10eTZRehzFhA!2m2!1d49.80035072287402!2d24.90352421898428!3f196.8259237278456!4f-6.907553100327135!5f0.7820865974627469" width="600" height="450" frameborder="0" allowfullscreen="allowfullscreen"></iframe>
        <div className='footerr'>&copy; 2024 Золочівський фаховий коледж НУ “Львівська політехніка”</div>
      </div></>
  );
}

export default About;
