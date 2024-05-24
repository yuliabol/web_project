import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

import TeacherLogIn from 'H:/react-project/src/components/TeacherLogIn.js';

jest.mock('axios');

describe('TeacherLogIn component', () => {
  test('renders login form', () => {
    render(
      <Router>
        <TeacherLogIn />
      </Router>
    );

    expect(screen.getByLabelText(/Ім'я:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Прізвище:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Пароль:/i)).toBeInTheDocument();
    expect(screen.getByText('OK')).toBeInTheDocument();
  });

  
    test('navigates to /student-login when "Я студент" is clicked', () => {
        render(
            <Router>
                <TeacherLogIn />
            </Router>
        );
        const studentLink = screen.getByText(/Я студент/i);
        fireEvent.click(studentLink);

        expect(window.location.pathname).toBe('/student-login');
    });

    test('navigates to main page when logo is clicked', () => {
    render(
      <Router>
        <TeacherLogIn />
      </Router>
    );

    fireEvent.click(screen.getByAltText('logo'));

    expect(window.location.pathname).toBe('/');
    });
    test('updates state with input value', () => {
    render(
      <Router>
        <TeacherLogIn />
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/Ім'я:/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Прізвище:/i), { target: { value: 'Doe' } });

    expect(screen.getByLabelText(/Ім'я:/i)).toHaveValue('John');
    expect(screen.getByLabelText(/Прізвище:/i)).toHaveValue('Doe');
  });
});