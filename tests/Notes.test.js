import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import NotesComponent from 'H:/react-project/src/components/Notes.js'; 

describe('handleChange function', () => {
  it('updates the notes state when input value changes', () => {
    const { getByTestId } = render(<NotesComponent />);
    
    const input = getByTestId('notes-input'); 
    
    fireEvent.change(input, { target: { value: 'New note' } }); 
    
    expect(input.value).toBe('New note'); 
  });
});
