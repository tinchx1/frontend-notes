import { useContext, useState } from "react";
import { NoteContext } from "../context/NoteContext";

const NoteCard = ({ note, setModalActionState }) => {
  const [newTag, setNewTag] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(note.title);
  const [editedContent, setEditedContent] = useState(note.content);
  const { updateNote } = useContext(NoteContext);

  const toggleNewTag = () => {
    if (newTag && inputValue) {
      const updatedNote = {
        ...note,
        categories: note.categories ? [...note.categories, inputValue] : [inputValue],
      };
      console.log(updatedNote);
      updateNote(updatedNote);
    }
    setInputValue('');
    setNewTag(!newTag);
  }
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  }

  const handleNoteAction = (action) => {
    const modalAction = {
      id: note._id,
      action,
    };
    setModalActionState(modalAction);
  }
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  }

  const handleSaveEdit = () => {
    const updatedNote = {
      ...note,
      title: editedTitle,
      content: editedContent,
    };
    updateNote(updatedNote);
    setIsEditing(false);
  }

  return (
    <div className={`p-4 flex flex-col justify-between rounded-lg shadow-lg bg-${note.color}`}>
      <div>
        <p className="text-gray-600">{note.date}</p>
        <div className="flex justify-between items-start">
          {isEditing ? (
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="placeholder-gray-500 w-full text-lg font-semibold bg-inherit border border-gray-400 rounded-md focus:outline-none resize-none mb-2"
            />
          ) : (
            <p className="text-lg font-semibold mb-2">{note.title}</p>
          )}
        </div>
        {isEditing ? (
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="placeholder-gray-500 w-full bg-inherit overflow-y-hidden border border-gray-400 rounded-md focus:outline-none resize-none"
          />
        ) : (
          <p className="font-normal mb-1 break-words">{note.content}</p>
        )}
      </div>
      <div className="flex flex-col">
        <img className="w-6" src="/icons/Tag.svg" alt="Tags" />
        <div className="flex justify-between">
          <div className="flex min-h-[20px] items-center flex-wrap pb-1">
            {note.categories && note.categories.map((tag, index) => (
              <span key={index} className="text-xs text-white mt-2 mr-2 bg-[rgb(72,72,72)] rounded p-1">{tag}</span>
            ))}
            {newTag ? (
              <div className="flex flex-wrap">
                <input
                  className="text-xs text-white min-w-14 mt-2 border-none outline-none bg-[rgb(72,72,72)] rounded p-1 max-w-[200px]"
                  placeholder="Add Tag"
                  value={inputValue}
                  onChange={handleInputChange}
                  style={{ width: `${inputValue.length + 1}ch` }}
                />
                <button onClick={toggleNewTag}>
                  <img className="bg-[rgb(72,72,72)] w-6 ml-2 mt-2 p-1 rounded-full" src={"/icons/DoubleSave.svg"} />
                </button>
              </div>
            ) :
              <button onClick={toggleNewTag}>
                <img className="bg-[rgb(72,72,72)] w-6 mt-2 p-1 rounded-full" src={"/icons/Plus.svg"} />
              </button>
            }
          </div>
          <div className="flex space-x-2 self-end items-center justify-center">
            <button className="pb-1 min-w-6 min-h-6 max-w-6 max-h-6" onClick={isEditing ? handleSaveEdit : handleEditToggle}>
              <img src={isEditing ? "/icons/Save.svg" : "/icons/Pencil.svg"} alt={isEditing ? "Save Note" : "Edit Note"} />
            </button>
            <button onClick={() => handleNoteAction("Delete")} className="pb-1">
              <img src="/icons/Trash.svg" alt="Delete Note" />
            </button>
            {note.archived ?
              <button onClick={() => handleNoteAction("Unarchive")} className="pb-1">
                <img src="/icons/Unarchive.svg" alt="Unarchive Note" />
              </button>
              :
              <button onClick={() => handleNoteAction("Archive")} className="pb-1">
                <img src="/icons/Archive.svg" alt="Archive Note" />
              </button>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
