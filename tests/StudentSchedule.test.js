import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import StudentSchedule from 'H:/react-project/src/components/StudentSchedule.js';


describe('StudentSchedule component', () => {
  test('logs out when "Вийти" is selected', () => {
  render(
    <Router>
      <StudentSchedule />
    </Router>
  );

  fireEvent.change(screen.getByTestId('profile-settings'), { target: { value: 'StudentLogin.js' } });
  expect(window.location.pathname).toBe('/student-login');
  });
    
  test('changes profile image when file is selected', () => {
    render(
      <Router>
        <StudentSchedule />
      </Router>
    );
    const file = new File(['(⌐□_□)'], 'profile.png', { type: 'image/png' });
    const changeEvent = { target: { files: [file] } };
    fireEvent.change(screen.getByTestId('profile-icon'), changeEvent);
    expect(screen.getByAltText('Profile icon')).toHaveAttribute('src', 'profile.png');
  });

  test('changes selected day when dropdown is changed', () => {
    const { getByLabelText } = render(
      <Router>
        <StudentSchedule />
      </Router>
    );

    const dropdown = getByLabelText('День');
    fireEvent.change(dropdown, { target: { value: '' } });

    expect(dropdown.value).toBe('');
  });


});
