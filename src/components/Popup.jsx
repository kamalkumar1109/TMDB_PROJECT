import React, { useEffect } from "react";

const Popup = ({ message, onClose }) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 1000); // disappears after 2 sec

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-blue-900 px-6 py-4 rounded-lg shadow-lg text-white">
        {message}
      </div>
    </div>
  );
};

export default Popup;
