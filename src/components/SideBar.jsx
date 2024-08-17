import { useState } from "react";

const SideBar = ({ setModalState }) => {
  const [Open, setOpen] = useState(false);
  const toggleOpen = (event) => {
    event.stopPropagation()
    setOpen(!Open);
  }
  return (
    <aside className="w-20 flex flex-col items-center border-r border-r-gray-300 h-full">
      <img className="w-8 pb-12 pt-4" src={"/icons/Book.svg"} />
      <button onClick={(e) => toggleOpen(e)}>
        {Open ?
          <img className="bg-black p-1 rounded-full" src={"/icons/Cancel.svg"} />
          :
          <img className="bg-black p-1 rounded-full" src={"/icons/Plus.svg"} />
        }
      </button>
      {Open && (
        <div className="flex flex-col items-center">
          <button onClick={() => setModalState("yellow")} className="w-5 h-5 mt-12 mb-6 rounded-full bg-yellow" />
          <button onClick={() => setModalState("orange")} className="w-5 h-5 mb-6 rounded-full bg-orange" />
          <button onClick={() => setModalState("purple")} className="w-5 h-5 mb-6 rounded-full bg-purple" />
          <button onClick={() => setModalState("turquoise")} className="w-5 h-5 mb-6 rounded-full bg-turquoise" />
          <button onClick={() => setModalState("green")} className="w-5 h-5 mb-6 rounded-full bg-green" />
        </div>
      )}
    </aside>
  );
};

export default SideBar