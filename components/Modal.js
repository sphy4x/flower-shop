function Modal({ open, title, children, onClose, dataFile }) {
  try {
    if (!open) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4" data-name="modal-wrap" data-file="components/Modal.js">
        <div className="absolute inset-0 bg-slate-900/40" onClick={onClose} data-name="backdrop" data-file="components/Modal.js"></div>
        <div className="relative w-full max-w-xl card overflow-hidden" data-name="modal" data-file={dataFile || "components/Modal.js"}>
          <div className="p-5 border-b border-slate-200 bg-white" data-name="head" data-file="components/Modal.js">
            <div className="flex items-center justify-between gap-3" data-name="head-row" data-file="components/Modal.js">
              <div className="min-w-0" data-name="head-left" data-file="components/Modal.js">
                <div className="text-lg font-extrabold truncate" data-name="title" data-file="components/Modal.js">{title}</div>
                <div className="text-xs text-[var(--muted-text-color)] mt-1" data-name="sub" data-file="components/Modal.js">Можно закрыть, кликнув по фону.</div>
              </div>
              <button className="btn btn-ghost px-3 py-1" onClick={onClose} data-name="close" data-file="components/Modal.js">
                <div className="icon-x text-lg" data-name="close-i" data-file="components/Modal.js"></div>
              </button>
            </div>
          </div>
          <div className="p-5 bg-white" data-name="body" data-file="components/Modal.js">
            {children}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Modal component error:', error);
    return null;
  }
}