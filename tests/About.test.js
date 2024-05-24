import '@testing-library/jest-dom/extend-expect';
import About from 'H:/react-project/src/components/About.js';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

describe('About component', () => {
  test('renders tour iframe', () => {
    render(
      <Router>
        <About />
      </Router>
    );

    const iframe = screen.getByTitle('tour');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('src', 'https://kuula.co/share/collection/7cB0z?logo=1&info=1&fs=1&vr=0&sd=1&thumbs=1');
  });

  test('renders link to home page', () => {
    render(
      <Router>
        <About />
      </Router>
    );

    const link = screen.getByText(/На головну/);
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });

  test('renders footer with correct text', () => {
    render(
      <Router>
        <About />
      </Router>
    );

    const footer = screen.getByText(/Золочівський фаховий коледж НУ “Львівська політехніка”/);
    expect(footer).toBeInTheDocument();
  });
});
