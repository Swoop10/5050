(() => {
  const carousel = document.getElementById('carousel');
  if (!carousel) return;

  const slides = Array.from(carousel.querySelectorAll('.slide'));
  const dotsWrap = document.getElementById('carousel-dots');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const interval = 5000;
  let current = 0;
  let timer = null;

  function loadSlideMedia(slide) {
    if (!slide || slide.dataset.loaded === 'true') return;

    slide.querySelectorAll('source[data-srcset]').forEach((source) => {
      source.srcset = source.dataset.srcset;
      source.removeAttribute('data-srcset');
    });

    const image = slide.querySelector('img[data-src]');
    if (image) {
      image.src = image.dataset.src;
      image.removeAttribute('data-src');
    }

    slide.dataset.loaded = 'true';
  }

  function setSlideAccessibility(index) {
    slides.forEach((slide, i) => {
      const active = i === index;
      slide.setAttribute('aria-hidden', String(!active));
      slide.querySelectorAll('a, button').forEach((control) => {
        if (control.classList.contains('slide-cta')) {
          control.tabIndex = active ? 0 : -1;
        }
      });
    });
  }

  slides.forEach((slide, i) => {
    slide.setAttribute('role', 'group');
    slide.setAttribute('aria-roledescription', 'slide');
    slide.setAttribute('aria-label', `${i + 1} of ${slides.length}`);

    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Show slide ${i + 1}`);
    dot.setAttribute('aria-pressed', String(i === 0));
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  const dots = Array.from(dotsWrap.querySelectorAll('button'));

  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    dots[current].setAttribute('aria-pressed', 'false');

    current = index;
    loadSlideMedia(slides[current]);
    slides[current].classList.add('active');
    dots[current].classList.add('active');
    dots[current].setAttribute('aria-pressed', 'true');
    setSlideAccessibility(current);

    const nextIndex = (current + 1) % slides.length;
    window.setTimeout(() => loadSlideMedia(slides[nextIndex]), 900);

    restartTimer();
  }

  function next() {
    goTo((current + 1) % slides.length);
  }

  function stopTimer() {
    if (timer) {
      window.clearInterval(timer);
      timer = null;
    }
  }

  function restartTimer() {
    stopTimer();
    if (!reduceMotion && !document.hidden) {
      timer = window.setInterval(next, interval);
    }
  }

  carousel.addEventListener('mouseenter', stopTimer);
  carousel.addEventListener('mouseleave', restartTimer);
  carousel.addEventListener('focusin', stopTimer);
  carousel.addEventListener('focusout', (event) => {
    if (!carousel.contains(event.relatedTarget)) restartTimer();
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopTimer();
    else restartTimer();
  });

  slides[0].dataset.loaded = 'true';
  setSlideAccessibility(0);
  window.setTimeout(() => loadSlideMedia(slides[1]), 1500);
  restartTimer();
})();
