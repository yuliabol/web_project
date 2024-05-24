import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import TeacherSchedule from 'H:/react-project/src/components/TeacherSchedule.js';

describe('TeacherSchedule component', () => {
    test('edits schedule on input change', async () => {
    const mockSchedule = [
      { day: 'Monday', time: '08:00 - 09:00', location: 'Room 101', group: 'Group A' },
    ];

    jest.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValueOnce('teacherId');
    jest.spyOn(window, 'fetch').mockResolvedValueOnce({
      json: async () => mockSchedule,
    });

    render(
      <Router>
        <TeacherSchedule />
      </Router>
    );

    await waitFor(() => {
      const dayInput = screen.getByDisplayValue('Monday');
      fireEvent.change(dayInput, { target: { value: 'Tuesday' } });
      expect(dayInput.value).toBe('Tuesday');
    });
  });

  test('saves schedule changes on button click', async () => {
    const mockSchedule = [
      { day: 'Monday', time: '08:00 - 09:00', location: 'Room 101', group: 'Group A' },
    ];

    jest.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValueOnce('teacherId');
    jest.spyOn(window, 'fetch').mockResolvedValueOnce({
      json: async () => mockSchedule,
    });
    jest.spyOn(window, 'fetch').mockResolvedValueOnce({
      ok: true,
    });

    render(
      <Router>
        <TeacherSchedule />
      </Router>
    );

    await waitFor(() => {
      const saveButton = screen.getByText('Зберегти зміни');
      fireEvent.click(saveButton);
      expect(window.fetch).toHaveBeenCalledTimes(1);
    });
  });
});