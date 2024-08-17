import { useContext, useState } from 'react';
import { NoteContext } from '../context/NoteContext';

const NoteForm = ({ color, toggleModal }) => {
  const [note, setNote] = useState('');
  const [title, setTitle] = useState('');
  const { addNote } = useContext(NoteContext);
  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, note, color }),
      });
      if (!response.ok) {
        throw new Error('Failed to save note');
      }
      const newNote = await response.json();
      setNote('');
      setTitle('');
      addNote(newNote);
      toggleModal('');
    } catch (error) {
      console.log('Error saving note', error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <label className="text-gray-700 font-medium text-md pl-1">Title</label>
      <input
        value={title}
        onChange={handleTitleChange}
        placeholder="Write your title here..."
        className="placeholder-gray-500 w-full bg-inherit p-2 border border-gray-400 rounded-md focus:outline-none resize-none mb-2">
      </input>
      <label className="text-gray-700 font-medium text-md pl-1">Note</label>
      <textarea
        value={note}
        onChange={handleNoteChange}
        placeholder="Write your note here..."
        className="placeholder-gray-500 w-full bg-inherit h-40 p-3 border border-gray-400 rounded-md focus:outline-none resize-none	"
      />
      <button
        type="submit"
        className="w-full rounded-lg mx-auto mt-4 px-4 py-2 border-[1px] bg-opacity-20 bg-black border-white text-white"
      >
        Save Note
      </button>
    </form>
  );
};

export default NoteForm;