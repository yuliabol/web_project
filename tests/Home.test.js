import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from 'H:/react-project/src/components/Home.js';

describe('Home component', () => {
    test('navigates to /about when "Про нас" is clicked', () => {
        render(
            <Router>
                <Home />
            </Router>
        );

        const aboutLink = screen.getByText(/Про нас/i);
        fireEvent.click(aboutLink);

        expect(window.location.pathname).toBe('/about');
    });

    test('navigates to /contacts when "Контакти" is clicked', () => {
        render(
            <Router>
                <Home />
            </Router>
        );

        const contactsLink = screen.getByText(/Контакти/i);
        fireEvent.click(contactsLink);

        expect(window.location.pathname).toBe('/contacts');
    });

    test('dropdown menu appears on mouse enter and navigates correctly', () => {
        render(
            <Router>
                <Home />
            </Router>
        );

        const aboutLink = screen.getByText(/Про нас/i);
        fireEvent.mouseEnter(aboutLink);

        const generalInfoLink = screen.getByText(/Загальна інформація/i);
        fireEvent.click(generalInfoLink);

        expect(window.location.pathname).toBe('/about');

        

        expect(window.location.pathname).toBe('/about');
    });

    test('navigates to /student-login when "Студенту" is clicked', () => {
        render(
            <Router>
                <Home />
            </Router>
        );

        const contactsLink = screen.getByText(/Студенту/i);
        fireEvent.click(contactsLink);

        expect(window.location.pathname).toBe('/student-login');
    });

});