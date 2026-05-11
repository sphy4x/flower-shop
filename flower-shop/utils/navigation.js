function navigateToSection(sectionId) {
  try {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    window.location.href = `index.html#${sectionId}`;
  } catch (error) {
    console.error('navigateToSection error:', error);
  }
}

function navigateToPage(page) {
  try {
    const current = (window.location.pathname || '').split('/').pop() || 'index.html';
    if (current === page) return;
    window.location.href = page;
  } catch (error) {
    console.error('navigateToPage error:', error);
  }
}

function getCurrentPageName() {
  try {
    return (window.location.pathname || '').split('/').pop() || 'index.html';
  } catch (error) {
    console.error('getCurrentPageName error:', error);
    return 'index.html';
  }
}