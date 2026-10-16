/* Photo carousel and the native, keyboard-accessible image dialog. */
(() => {
  const carousel = document.querySelector('.carousel');
  const track = document.getElementById('carTrack');
  if (!carousel || !track) return;
  const slides = [...track.children];
  const dots = document.getElementById('carDots');
  const caption = document.getElementById('carCaption');
  const count = document.getElementById('carCount');
  const dialog = document.getElementById('lightbox');
  let current = 0, touch = null, returnFocus = null, oldOverflow = '';

  slides.forEach((slide, i) => {
    slide.setAttribute('role', 'group');
    slide.setAttribute('aria-roledescription', 'diapositiva');
    slide.setAttribute('aria-label', `${i + 1} di ${slides.length}`);
    const image = slide.querySelector('img');
    image.tabIndex = 0;
    image.setAttribute('role', 'button');
    image.setAttribute('aria-label', `Ingrandisci: ${image.alt}`);
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Foto ${i + 1}: ${image.alt}`);
    dot.addEventListener('click', () => go(i));
    dots.appendChild(dot);
  });
  caption.setAttribute('aria-live', 'polite');
  function go(index) {
    current = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    slides.forEach((slide, i) => {
      slide.setAttribute('aria-hidden', String(i !== current));
      slide.inert = i !== current;
      dots.children[i].classList.toggle('on', i === current);
      dots.children[i].setAttribute('aria-current', String(i === current));
    });
    const img = slides[current].querySelector('img');
    caption.textContent = img.title || img.alt;
    count.textContent = `${String(current + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
  }
  window.carMove = delta => go(current + delta);
  carousel.addEventListener('keydown', event => {
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    if (event.key === 'Home') go(0);
    else if (event.key === 'End') go(slides.length - 1);
    else carMove(event.key === 'ArrowRight' ? 1 : -1);
  });
  track.addEventListener('touchstart', event => {
    touch = {x: event.touches[0].clientX, y: event.touches[0].clientY};
  }, {passive: true});
  track.addEventListener('touchend', event => {
    if (!touch) return;
    const dx = event.changedTouches[0].clientX - touch.x;
    const dy = event.changedTouches[0].clientY - touch.y;
    touch = null;
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.3) carMove(dx < 0 ? 1 : -1);
  }, {passive: true});
  track.addEventListener('touchcancel', () => { touch = null; });

  window.openLightbox = (src, description = 'Fotografia del viaggio') => {
    if (!dialog || dialog.open) return;
    returnFocus = document.activeElement;
    oldOverflow = document.body.style.overflow;
    document.getElementById('lbImg').src = src;
    document.getElementById('lbImg').alt = description;
    document.getElementById('lbCaption').textContent = description;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
  };
  window.closeLightbox = () => { if (dialog.open) dialog.close(); };
  dialog.addEventListener('close', () => {
    document.body.style.overflow = oldOverflow;
    if (returnFocus?.isConnected) returnFocus.focus({preventScroll: true});
  });
  dialog.addEventListener('click', event => { if (event.target === dialog) closeLightbox(); });
  document.addEventListener('click', event => {
    const img = event.target.closest('.carousel-slide img, img.zoomable');
    if (img && img.naturalWidth) openLightbox(img.src, img.title || img.alt);
  });
  document.addEventListener('keydown', event => {
    if ((event.key === 'Enter' || event.key === ' ') && event.target.matches('.carousel-slide img')) {
      event.preventDefault();
      if (event.target.naturalWidth) openLightbox(event.target.src, event.target.title || event.target.alt);
    }
  });
  function imageFailed(img) {
    img.hidden = true;
    const slide = img.closest('.carousel-slide');
    if (slide) {
      slide.classList.add('image-unavailable');
      slide.dataset.fallback = `${img.alt} · Fotografia non disponibile senza connessione`;
    }
    if (img.id === 'lbImg') document.getElementById('lbCaption').textContent = 'Fotografia non disponibile. Controlla la connessione e riprova.';
  }
  document.addEventListener('error', event => { if (event.target.tagName === 'IMG') imageFailed(event.target); }, true);
  document.querySelectorAll('img').forEach(img => {
    if (img.complete && !img.naturalWidth && img.hasAttribute('src')) imageFailed(img);
    img.addEventListener('load', () => { img.hidden = false; img.closest('.carousel-slide')?.classList.remove('image-unavailable'); });
  });
  go(0);
})();
