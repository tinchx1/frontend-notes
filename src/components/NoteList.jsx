
const NoteList = () => {
  // Fetch the list of notes from the NoteContext or noteService
  const notes = [];

  return (
    <div>
      <h1>Note List</h1>
      {notes.length > 0 ? (
        <ul>
          {notes.map((note) => (
            <li key={note.id}>{note.title}</li>
          ))}
        </ul>
      ) : (
        <p>No notes found.</p>
      )}
    </div>
  );
};

export default NoteList;