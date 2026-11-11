(() => {
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const animations = new Set();
  let bookPaused = false;
  document.addEventListener('goshuin:motion-change', event => {
    bookPaused = event.detail.paused;
    if (bookPaused) animations.forEach(animation => animation.cancel());
  });
  function animate(element, frames, options) {
    if (bookPaused || reducedMotion.matches || !element.animate) return;
    const animation = element.animate(frames, options);
    animations.add(animation);
    animation.finished.catch(() => {}).finally(() => animations.delete(animation));
  }
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) animations.forEach(animation => animation.finish());
  });
  const dialog = document.querySelector('.screen-dialog');
  let opener;
  document.querySelectorAll('[data-screen-zoom]').forEach(button => {
    button.addEventListener('click', () => {
      const source = button.querySelector('img');
      const image = dialog.querySelector('img');image.src = source.currentSrc || source.src;image.alt = source.alt;
      opener = button;dialog.showModal();document.body.style.overflow = 'hidden';
    });
  });
  dialog.addEventListener('close', () => { document.body.style.overflow = ''; opener?.focus({preventScroll:true}); });
  dialog.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  });
  document.querySelectorAll('[data-tour]').forEach(tour => {
    const buttons = [...tour.querySelectorAll('[data-tour-select]')];
    const panels = [...tour.querySelectorAll('[data-tour-panel]')];
    const stage = tour.querySelector('.tour-stage');
    const localJa = tour.closest('main').lang === 'ja';
    const status = document.createElement('p');status.className = 'tour-status';status.setAttribute('aria-live','polite');
    // Mobile controls retain their explanatory copy below the selected screen.
    stage.after(status);
    const description = index => buttons[index].querySelector('strong + span').textContent;
    status.textContent = description(0);
    let request = 0, selected = 0;
    tour.classList.add('is-enhanced');
    tour.querySelector('.tour-controls').hidden = false;
    panels.forEach((panel, i) => { panel.hidden = i !== 0; });
    async function select(index) {
      const currentRequest = ++request;
      const panel = panels[index], image = panel.querySelector('img');
      buttons.forEach((button,i)=>button.setAttribute('aria-busy',String(i===index)));
      image.loading = 'eager';
      status.textContent = localJa ? '画面を読み込み中…' : 'Loading preview…';
      try { await image.decode(); }
      catch {
        if (currentRequest === request) {
          status.textContent = localJa ? '画像を読み込めませんでした。もう一度選んでください。' : 'This preview could not load. Select it again to retry.';
          buttons.forEach(button=>button.removeAttribute('aria-busy'));
        }
        return;
      }
      if (currentRequest !== request) return;
      const changed = selected !== index;selected = index;
      panels.forEach((item, i) => { item.hidden = i !== index; });
      buttons.forEach((button, i) => { button.setAttribute('aria-pressed', String(i === index));button.removeAttribute('aria-busy'); });
      status.textContent = description(index);
      if (changed) {
        panels.forEach(item=>item.getAnimations().forEach(animation=>animation.cancel()));
        animate(panel, [{ opacity: .35, transform: 'perspective(1200px) rotateY(-28deg)' }, { opacity: 1, transform: 'perspective(1200px) rotateY(0deg)' }], { duration: 460, easing: 'cubic-bezier(.2,.7,.3,1)' });
      }
    }
    buttons.forEach((button, index) => {
      button.addEventListener('click', () => select(index));
      button.addEventListener('keydown', event => {
        let next;
        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % buttons.length;
        if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index + buttons.length - 1) % buttons.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = buttons.length - 1;
        if (next === undefined) return;
        event.preventDefault(); buttons[next].focus(); select(next);
      });
    });
  });
  const currentPanel = document.querySelector('main:not([hidden])');
  const nav = [...document.querySelectorAll('.site-header [data-nav]')];
  const sections = nav.map(link=>document.getElementById(link.hash.slice(1))).filter(Boolean);
  const download = document.querySelector('.mobile-download');
  const hero = currentPanel.querySelector('.hero');
  const closing = currentPanel.querySelector('.closing');
  let pending = false;
  function updatePosition() {
    pending = false;
    if (document.body.classList.contains('is-book-reader')) { download.hidden = true; return; }
    const offset = document.querySelector('[data-sticky-header]').getBoundingClientRect().bottom + 45;
    let active;
    sections.forEach(section=>{ if(section.getBoundingClientRect().top <= offset) active=section.id; });
    nav.forEach(link=>{if(link.hash==='#'+active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});
    download.hidden = hero.getBoundingClientRect().bottom > offset || closing.getBoundingClientRect().top < innerHeight;
  }
  function schedulePosition() { if (!pending) { pending = true;requestAnimationFrame(updatePosition); } }
  addEventListener('scroll',schedulePosition,{passive:true});addEventListener('resize',schedulePosition);updatePosition();
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        animate(entry.target, [{ opacity: .5, transform: 'translateY(16px)' }, { opacity: 1, transform: 'none' }], { duration: 450, easing: 'cubic-bezier(.2,.7,.3,1)' });
      });
    }, { threshold: .12 });
    document.querySelectorAll('[data-reveal]').forEach(element => observer.observe(element));
  }
})();
