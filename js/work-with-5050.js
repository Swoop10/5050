(() => {
  const steps = Array.from(document.querySelectorAll('.timeline-step'));
  if (!steps.length) return;

  function activate(step) {
    steps.forEach((item) => {
      const active = item === step;
      item.classList.toggle('active-step', active);
      item.setAttribute('aria-expanded', String(active));
    });
  }

  steps.forEach((step, index) => {
    step.setAttribute('role', 'button');
    step.setAttribute('aria-expanded', 'false');
    step.setAttribute('aria-controls', `step-card-${index + 1}`);

    const card = step.nextElementSibling;
    if (card?.classList.contains('step-card')) {
      card.id = `step-card-${index + 1}`;
    }

    step.addEventListener('mouseenter', () => activate(step));
    step.addEventListener('focus', () => activate(step));
    step.addEventListener('click', () => activate(step));
    step.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        activate(step);
      }
    });
  });
})();
