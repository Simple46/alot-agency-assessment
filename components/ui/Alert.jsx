export default function Alert({ type = 'info', message, onClose }) {
  const bg =
    type === 'error'
      ? 'bg-red-50 border-red-200 text-red-700'
      : type === 'success'
      ? 'bg-green-50 border-green-200 text-green-700'
      : 'bg-blue-50 border-blue-200 text-blue-700';
  return (
    <div className={`flex items-center justify-between p-3 rounded-lg border ${bg} mb-4 text-sm`}>
      <span>{message}</span>
      {onClose && (
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          ✕
        </button>
      )}
    </div>
  );
}