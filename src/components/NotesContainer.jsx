import { useContext, useEffect, useState } from 'react';
import NoteCard from './NoteCard';
import { NoteContext } from '../context/NoteContext';

const NotesContainer = ({ setModalActionState }) => {
  const { notes } = useContext(NoteContext);
  const [archivedNotes, setArchivedNotes] = useState('all');
  const [notesFiltered, setNotesFiltered] = useState(notes);
  const [searchQuery, setSearchQuery] = useState('');
  useEffect(() => {
    if (archivedNotes === 'archived' && searchQuery === '') {
      setNotesFiltered(notes.filter(note => note.archived === true));
    } else if (searchQuery === '') {
      setNotesFiltered(notes.filter(note => note.archived === false));
    }
  }, [archivedNotes, notes, searchQuery]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());

    setNotesFiltered((notes) => notes.filter(note => {
      return note.categories.some(tag => tag.toLowerCase().includes(searchQuery));
    }));
  }
  return (
    <div>
      <div className="relative mb-6">
        <input
          onChange={(e) => handleSearch(e)}
          type="text"
          placeholder="Search by tags..."
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
      </div>      <h2 className='text-2xl font-semibold mt-4'>Notes</h2>
      <div className="flex space-x-2 mt-4">
        <button onClick={() => setArchivedNotes("all")} className={`px-4 py-2 ${archivedNotes === "all" ? 'bg-gray-600' : 'bg-gray-400'} text-white rounded-full`}>All Notes</button>
        <button onClick={() => setArchivedNotes("archived")} className={`px-4 py-2 ${archivedNotes === "archived" ? 'bg-gray-600' : 'bg-gray-400'} text-white rounded-full`}>Archive Notes</button>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,max(330px))] gap-4 mt-4 auto-rows-min h-full">
        {notesFiltered.map(note => (
          <NoteCard setModalActionState={setModalActionState} key={note._id} note={note} />
        ))}
      </div>
    </div>
  );
}

export default NotesContainer;
