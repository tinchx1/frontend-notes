import NoteForm from "./NoteForm"

function Modal({ modalState, setModalState }) {
  return (
    <div className={`fixed inset-0 bg-black  bg-opacity-60`}>
      <div className={`pt-14 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-${modalState} p-4 rounded-lg min-w-[250px] max-w-[350px]`}>
        <button onClick={() => setModalState("")} className="absolute top-0 right-0 pr-4 pt-4 ">  <img className="rounded-full" src={"/icons/Cancel.svg"} />
        </button>
        <NoteForm toggleModal={setModalState} color={modalState} />
      </div>
    </div>)
}

export default Modal