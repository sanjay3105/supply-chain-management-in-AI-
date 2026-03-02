import "../styles/theme.css";

const icons = { success:"✅", error:"❌", info:"ℹ️", warn:"⚠️" };

export default function ToastContainer({ toasts, removeToast }) {
  if (!toasts.length) return null;
  return (
    <div className="toast-container">
      {toasts.map(t => (
        <div
          key={t.id}
          className={`toast toast-${t.type}`}
          onClick={() => removeToast(t.id)}
        >
          <span>{icons[t.type] || "ℹ️"}</span>
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  );
}