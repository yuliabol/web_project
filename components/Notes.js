import React, { useState } from 'react';

function Notes() {
  const [notes, setNotes] = useState('');

  const handleChange = (event) => {
    setNotes(event.target.value);
  };

  const handleSave = () => {
    // Save the notes to local storage or a database
    localStorage.setItem('notes', notes);
  };

  return (
    <div>
      <h2 style={{marginTop:'5%', fontSize:'1em', zIndex:'1'}}>Нотатки</h2>
      <textarea data-testid="notes-input" value={notes} onChange={handleChange} />
    </div>
  );
}

export default Notes;