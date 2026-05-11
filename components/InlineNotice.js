function InlineNotice({ tone, title, message, dataFile }) {
  try {
    const t = tone || 'info';
    const file = dataFile || 'components/InlineNotice.js';

    const tones = {
      info: { wrap: 'bg-white border-slate-200', icon: 'icon-info', iconColor: 'text-slate-700', titleColor: 'text-slate-900', msgColor: 'text-slate-600' },
      warning: { wrap: 'bg-amber-50 border-amber-200', icon: 'icon-triangle-alert', iconColor: 'text-amber-700', titleColor: 'text-amber-900', msgColor: 'text-amber-900/80' },
      danger: { wrap: 'bg-rose-50 border-rose-200', icon: 'icon-triangle-alert', iconColor: 'text-rose-700', titleColor: 'text-rose-900', msgColor: 'text-rose-900/80' }
    };

    const s = tones[t] || tones.info;

    return (
      <div className={`rounded-2xl border ${s.wrap} px-4 py-3`} data-name="inline-notice" data-file={file}>
        <div className="flex items-start gap-3" data-name="row" data-file={file}>
          <div className={`${s.icon} text-xl ${s.iconColor} mt-0.5`} data-name="icon" data-file={file}></div>
          <div className="min-w-0" data-name="content" data-file={file}>
            {title ? <div className={`font-extrabold ${s.titleColor}`} data-name="title" data-file={file}>{title}</div> : null}
            {message ? <div className={`text-sm mt-1 ${s.msgColor}`} data-name="message" data-file={file}>{message}</div> : null}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('InlineNotice component error:', error);
    return null;
  }
}