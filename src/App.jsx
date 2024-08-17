import { useState } from "react"
import SideBar from "./components/SideBar"
import Modal from "./components/Modal"
import NotesContainer from "./components/NotesContainer"
import NoteContextProvider from "./context/NoteContext"
import ModalAction from "./components/ModalAction"

function App() {
  const [modalState, setModalState] = useState("")
  const [modalActionState, setModalActionState] = useState(null)
  console.log(modalActionState)
  const toggleModal = (backgroundColor) => {
    setModalState(backgroundColor)
  }
  const onClose = () => {
    setModalActionState(null)
  }
  return (
    <div className="grid grid-cols-[5rem_1fr] h-screen">
      <NoteContextProvider>
        <SideBar setModalState={setModalState} toggleModal={toggleModal} />
        <div className="p-4">
          <NotesContainer setModalActionState={setModalActionState} />
        </div>
        {modalState && (
          <Modal modalState={modalState} setModalState={setModalState} />
        )}
        {modalActionState &&
          <ModalAction modalState={modalState} id={modalActionState.id} action={modalActionState.action} onClose={onClose} />
        }
      </NoteContextProvider>
    </div>
  );
}

export default App;
