function Toast({ open, title, message, type, onClose, lang }) {
  try {
    if (!open) return null;

    const l = lang || getInitialLang();

    const styles = {
      info: { wrap: 'bg-white border-slate-200', icon: 'icon-info', iconColor: 'text-slate-700' },
      success: { wrap: 'bg-emerald-50 border-emerald-200', icon: 'icon-circle-check', iconColor: 'text-emerald-700' },
      danger: { wrap: 'bg-rose-50 border-rose-200', icon: 'icon-triangle-alert', iconColor: 'text-rose-700' }
    };
    const s = styles[type] || styles.info;

    return (
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50" data-name="toast-wrap" data-file="components/Toast.js">
        <div className={`card ${s.wrap} px-4 py-3 shadow-soft`} data-name="toast" data-file="components/Toast.js">
          <div className="flex items-start gap-3" data-name="row" data-file="components/Toast.js">
            <div className="w-10 h-10 rounded-xl bg-white border border-[var(--border-color)] flex items-center justify-center" data-name="icon-wrap" data-file="components/Toast.js">
              <div className={`${s.icon} text-xl ${s.iconColor}`} data-name="icon" data-file="components/Toast.js"></div>
            </div>
            <div className="min-w-0" data-name="content" data-file="components/Toast.js">
              <div className="font-extrabold leading-tight" data-name="title" data-file="components/Toast.js">{title}</div>
              <div className="text-sm text-[var(--muted-text-color)] mt-1" data-name="message" data-file="components/Toast.js">{message}</div>
              <div className="mt-3" data-name="actions" data-file="components/Toast.js">
                <button className="btn btn-ghost px-3 py-1" onClick={onClose} data-name="close" data-file="components/Toast.js">
                  {l === 'en' ? 'Close' : l === 'el' ? 'Κλείσιμο' : 'Закрыть'}
                  <div className="icon-x text-lg" data-name="close-i" data-file="components/Toast.js"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Toast component error:', error);
    return null;
  }
}