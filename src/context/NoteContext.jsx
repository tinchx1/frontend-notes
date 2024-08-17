import { createContext, useEffect, useState } from 'react';

export const NoteContext = createContext();

const NoteContextProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/notes', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setNotes(data);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotes();
  }, []);

  const addNote = (note) => {
    setNotes([...notes, note]);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note._id !== id));
    fetch(`http://localhost:3001/api/notes/${id}`, {
      method: 'DELETE',
    });
  };

  const archiveNote = (id) => {
    setNotes(
      notes.map((note) => {
        if (note._id === id) {
          return { ...note, archived: true };
        }
        return note;
      })
    );
    fetch(`http://localhost:3001/api/notes/${id}/archive`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ archived: true }),
    });
  };

  const unarchiveNote = (id) => {
    setNotes(
      notes.map((note) => {
        if (note._id === id) {
          return { ...note, archived: false };
        }
        return note;
      })
    );
    fetch(`http://localhost:3001/api/notes/${id}/unarchive`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ archived: false }),
    });
  };
  const updateNote = (note) => {
    fetch(`http://localhost:3001/api/notes/${note._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    });
    setNotes(
      notes.map((n) => {
        if (n._id === note._id) {
          return note;
        }
        return n;
      })
    );
  }

  return (
    <NoteContext.Provider
      value={{
        notes,
        addNote,
        updateNote,
        deleteNote,
        archiveNote,
        unarchiveNote,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export default NoteContextProvider;