(() => {
  const toggle = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const menuIcon = document.getElementById('menu-icon');

  if (!toggle || !mobileNav || !menuIcon) return;

  const path = menuIcon.querySelector('path');
  const hamburgerPath = 'M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z';
  const closePath = 'M6.4 4.9 4.9 6.4 10.6 12l-5.7 5.6 1.5 1.5L12 13.4l5.6 5.7 1.5-1.5L13.4 12l5.7-5.6-1.5-1.5L12 10.6z';

  function setOpen(isOpen) {
    mobileNav.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    if (path) path.setAttribute('d', isOpen ? closePath : hamburgerPath);
  }

  toggle.addEventListener('click', () => {
    setOpen(!mobileNav.classList.contains('open'));
  });

  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && mobileNav.classList.contains('open')) {
      setOpen(false);
      toggle.focus();
    }
  });
})();
