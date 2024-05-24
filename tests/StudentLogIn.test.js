import StudentLogIn from 'H:/react-project/src/components/StudentLogIn.js';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(global, 'localStorage', { value: localStorageMock });

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([{ id: 1, name: 'Test Group', year: 2 }]),
    })
  );

  localStorage.setItem.mockClear();
});

afterEach(() => {
  fetch.mockClear();
});
const handleSubmit = jest.fn();

describe('StudentLogIn component', () => {
  test('renders the login form', async () => {
    render(
      <Router>
        <StudentLogIn />
      </Router>
    );

    expect(screen.getByLabelText(/Ім'я:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Прізвище:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Група:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Пароль:/i)).toBeInTheDocument();
    expect(screen.getByText('OK')).toBeInTheDocument();
  });
  
  test('fetches and displays groups', async () => {
    render(
      <Router>
        <StudentLogIn />
      </Router>
    );

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    const groupOption = await screen.findByText(/Test Group - 2/i);
    expect(groupOption).toBeInTheDocument();
  });

  test('navigates to /teacher-login when "Я викладач" is clicked', () => {
        render(
            <Router>
                <StudentLogIn />
            </Router>
        );
        const teacherLink = screen.getByText(/Я викладач/i);
        fireEvent.click(teacherLink);

        expect(window.location.pathname).toBe('/teacher-login');
  });
    
    test('navigates to main page when logo is clicked', () => {
    render(
      <Router>
        <StudentLogIn />
      </Router>
    );

    fireEvent.click(screen.getByAltText('logo'));

    expect(window.location.pathname).toBe('/');
    });
    test('handles name change', () => {
    render(
      <Router>
        <StudentLogIn />
      </Router>
    );
    const nameInput = screen.getByLabelText(/Ім'я/i);
    fireEvent.change(nameInput, { target: { value: 'John' } });
    expect(nameInput.value).toBe('John');
  });

  test('handles surname change', () => {
    render(
      <Router>
        <StudentLogIn />
      </Router>
    );
    const surnameInput = screen.getByLabelText(/Прізвище/i);
    fireEvent.change(surnameInput, { target: { value: 'Doe' } });
    expect(surnameInput.value).toBe('Doe');
  });

  test('handles password change', () => {
    render(
      <Router>
        <StudentLogIn />
      </Router>
    );
    const passwordInput = screen.getByLabelText(/Пароль/i);
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    expect(passwordInput.value).toBe('password123');
  });

});
