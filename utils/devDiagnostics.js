function attachGlobalErrorDiagnostics() {
  try {
    window.addEventListener('error', (event) => {
      try {
        const msg = String(event && event.message ? event.message : '');
        const src = String(event && event.filename ? event.filename : '');
        if (!msg) return;

        if (msg.includes('Unexpected token') || msg.includes('SyntaxError')) {
          const existing = document.getElementById('ap_diag');
          if (existing) {
            existing.textContent = `Ошибка загрузки. Сообщение: ${msg}. Файл: ${src || 'неизвестно'}`;
            return;
          }

          const el = document.createElement('div');
          el.id = 'ap_diag';
          el.setAttribute('data-name', 'diagnostics');
          el.setAttribute('data-file', 'utils/devDiagnostics.js');
          el.className = 'fixed top-4 left-1/2 -translate-x-1/2 z-[60] max-w-[92vw] rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-rose-800 shadow-soft';
          el.textContent = `Ошибка загрузки. Сообщение: ${msg}. Файл: ${src || 'неизвестно'}`;
          document.body.appendChild(el);
        }
      } catch (e) {
        // Do nothing
      }
    });
  } catch (error) {
    console.error('attachGlobalErrorDiagnostics error:', error);
  }
}

attachGlobalErrorDiagnostics();