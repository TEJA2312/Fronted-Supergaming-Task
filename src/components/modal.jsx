import { X } from "lucide-react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-[#000000c9] bg-opacity-40"
        onClick={onClose}
      ></div>
      <div className="z-60 bg-black border-2 border-white rounded-xl shadow-lg p-6 w-[40%] relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white"
        >
          <X className="w-6 h-6 cursor-pointer"/>
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
