import { useTheme } from "../../context/ThemeContext";

const Modal = ({ open, title, onClose, children }) => {
  const { isDark } = useTheme();
  
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className={`w-full max-w-lg rounded-xl shadow-2xl border transition-all ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
        
        {/* Header */}
        <div className={`flex justify-between items-center px-6 py-4 border-b ${isDark ? 'border-slate-700' : 'border-gray-200'}`}>
          <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
          <button
            onClick={onClose}
            className={`p-1 rounded-lg transition ${isDark ? 'text-slate-400 hover:text-red-400 hover:bg-slate-700' : 'text-gray-400 hover:text-red-500 hover:bg-gray-100'}`}
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className={`p-6 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
