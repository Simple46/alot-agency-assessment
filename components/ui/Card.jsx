export default function Card({ children, className = '' }) {
  return (
    <div className={`w-full border border-gray-100 p-3 ${className}`}>
      {children}
    </div>
  );
}