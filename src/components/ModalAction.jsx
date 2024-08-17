import { useContext, useEffect } from 'react';
import { NoteContext } from '../context/NoteContext';

const ModalAction = ({ action, onClose, loading, id }) => {
  let handleChatAction;
  const { deleteNote, archiveNote, unarchiveNote } = useContext(NoteContext);
  if (action === 'Delete') {
    handleChatAction = () => {
      deleteNote(id);
      onClose();
    };
  } else if (action === 'Unarchive') {
    handleChatAction = () => {
      unarchiveNote(id);
      onClose();
    };
  } else {
    handleChatAction = () => {
      archiveNote(id);
      onClose();
    };
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.classList.contains('fixed')) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const actionLowerCase = action.toLowerCase();

  return (
    <div className="z-30 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex flex-col justify-between bg-white p-6 rounded-lg shadow-lg text-center h-40 w-96 m-5">
        <h2 className="text-start text-lg text-light_grey mb-4">{`Are you sure you want to ${actionLowerCase} this note?`}</h2>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 mr-3 text-sm py-[3px] border-[0.1px] bg-purple-500 border-lightest_purple rounded-full text-purple_contrast hover:text-purple_contrast_hover"
          >
            Cancel
          </button>
          <button
            disabled={loading}
            onClick={handleChatAction}
            className="px-4 w-auto text-sm py-[3px] rounded-full font-medium bg-gray-300 text-stone-800 hover:bg-purple_contrast_hover">
            {`${action} note`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalAction;