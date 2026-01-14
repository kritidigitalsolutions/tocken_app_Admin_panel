const Modal = ({ open, title, onClose, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-slate-900 w-full max-w-lg rounded-lg shadow-lg">
        
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-700">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-red-400"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
