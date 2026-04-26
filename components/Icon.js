function Icon({ iconName, bgClassName, iconClassName }) {
  try {
    const safeIcon = typeof iconName === 'string' && iconName.startsWith('icon-') ? iconName : 'icon-circle-help';

    return (
      <div
        className={
          'w-14 h-14 rounded-xl flex items-center justify-center mb-4 ' +
          (bgClassName ? bgClassName : 'bg-[var(--secondary-color)]')
        }
        data-name="icon"
        data-file="components/Icon.js"
      >
        <div
          className={(iconClassName ? iconClassName : safeIcon + ' text-2xl text-[var(--primary-color)]')}
          data-name="icon-i"
          data-file="components/Icon.js"
        ></div>
      </div>
    );
  } catch (error) {
    console.error('Icon component error:', error);
    return null;
  }
}