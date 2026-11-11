(() => {
  const hero = document.querySelector('.illustrated-hero');
  if (!hero) return;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const scene = hero.querySelector('.journey-scene');
  const picture = scene.querySelector('img');
  const animations = new Set();
  let bookPaused = false;
  document.addEventListener('goshuin:motion-change', event => {
    bookPaused = event.detail.paused;
    if (bookPaused) { animations.forEach(animation => animation.cancel()); settleInk(); }
  });
  const easing = 'cubic-bezier(.22,.68,.2,1)';
  function animate(element, frames, options) {
    if (bookPaused || motion.matches || !element?.animate) return;
    const animation = element.animate(frames, options);
    animations.add(animation);
    animation.finished.catch(() => {}).finally(() => animations.delete(animation));
    return animation;
  }
  // Keep the original illustration unchanged. Luminance masks reveal its existing
  // dot pixels from dense ink to pale colour; no point changes position.
  const bands=8, svgNS='http://www.w3.org/2000/svg';
  const filters=document.createElementNS(svgNS,'svg');
  filters.setAttribute('width','0');filters.setAttribute('height','0');
  filters.setAttribute('aria-hidden','true');filters.style.position='absolute';
  filters.innerHTML=`<defs>${Array.from({length:bands},(_,i)=>{
    const values=Array.from({length:bands},(_,j)=>j===bands-1-i?'1':'0').join(' ');
    return `<filter id="goshuin-ink-${i}" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB"><feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 -0.2126 -0.7152 -0.0722 0 1"/><feComponentTransfer result="inkMask"><feFuncA type="discrete" tableValues="${values}"/></feComponentTransfer><feComposite in="SourceGraphic" in2="inkMask" operator="in"/></filter>`;
  }).join('')}</defs>`;
  document.body.append(filters);
  let entrance=[], inkLayer=null, inkRun=0;
  function settleInk(){
    inkRun++;
    entrance.forEach(animation=>animation?.cancel());entrance=[];
    inkLayer?.remove();inkLayer=null;
    scene.classList.remove('is-ink-revealing');
  }
  function arrive(event){
    settleInk();
    if(motion.matches||bookPaused||document.hidden)return;
    const run=inkRun, delay=Number(event?.detail?.delay)||0;
    inkLayer=document.createElement('div');inkLayer.className='intensity-reveal';inkLayer.setAttribute('aria-hidden','true');
    for(let i=0;i<bands;i++){
      const layer=picture.cloneNode(false);layer.alt='';layer.removeAttribute('fetchpriority');layer.removeAttribute('id');
      layer.loading='eager';layer.style.filter=`url("#goshuin-ink-${i}")`;layer.dataset.inkDensity=String(bands-i);
      inkLayer.append(layer);
    }
    scene.append(inkLayer);scene.classList.add('is-ink-revealing');
    [...inkLayer.children].forEach((layer,i)=>entrance.push(animate(layer,[{opacity:0},{opacity:1}],{
      duration:480,delay:delay+i*105,easing:'cubic-bezier(.3,0,.35,1)',fill:'backwards'
    })));
    const last=entrance.at(-1);
    if(!last){settleInk();return;}
    last.finished.then(()=>{if(run===inkRun)settleInk();}).catch(()=>{});
  }
  if(!hero.classList.contains('book-hero'))picture.decode().then(()=>arrive()).catch(()=>{});
  hero.addEventListener('goshuin:book-open',arrive);
  const replayScene=document.querySelector('[data-scene-replay]');
  replayScene.hidden=motion.matches;
  if(!hero.classList.contains('book-hero'))replayScene.addEventListener('click',()=>arrive());
  document.addEventListener('visibilitychange',()=>{if(document.hidden)settleInk();});
  addEventListener('resize',settleInk,{passive:true});

  const stamps=[...document.querySelectorAll('[data-memory-stamp]')];
  const stampRuns=new Map();
  function stamp(element) {
    (stampRuns.get(element)||[]).forEach(animation=>animation?.cancel());
    const run=[];
    if (!motion.matches) {
      const groups=[...element.querySelectorAll('[data-ink-step]')];
      // Same ordered dot geometry and 1.6s writing sequence as GoShuinLoading.swift.
      groups.forEach((group,index)=>run.push(animate(group,[{opacity:0},{opacity:1}],{
        duration:45,delay:1600*index/groups.length,fill:'backwards'
      })));
      run.push(animate(element.querySelector('[data-stamp-seals]'),[{opacity:0},{opacity:1}],{
        duration:1,delay:1800,fill:'backwards'
      }));
    }
    stampRuns.set(element,run);
  }
  stamps.forEach(element=>{
    const replay=element.querySelector('[data-stamp-replay]');
    replay.hidden=motion.matches;
    replay.addEventListener('click',()=>stamp(element));
  });
  if ('IntersectionObserver' in window) {
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);stamp(entry.target);
    }),{threshold:.35});
    stamps.forEach(element=>observer.observe(element));
    const chapters=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if (!entry.isIntersecting) return;
      chapters.unobserve(entry.target);
      [...entry.target.children].forEach((element,index)=>animate(element,[{opacity:.3,transform:'translateY(20px)'},{opacity:1,transform:'none'}],{duration:650,delay:index*100,easing}));
    }),{threshold:.18});
    document.querySelectorAll('.culture-grid,.scan-steps').forEach(element=>chapters.observe(element));
  }
  motion.addEventListener('change',()=>{
    replayScene.hidden=motion.matches;
    stamps.forEach(element=>element.querySelector('[data-stamp-replay]').hidden=motion.matches);
    if (motion.matches) {
      animations.forEach(animation=>animation.cancel());
      settleInk();
    }
  });
  document.querySelectorAll('[data-tour]').forEach(tour=>{
    const buttons=[...tour.querySelectorAll('[data-tour-select]')];
    const sync=()=>tour.style.setProperty('--chapter-progress',String((buttons.findIndex(button=>button.getAttribute('aria-pressed')==='true')+1)/buttons.length));
    new MutationObserver(sync).observe(tour.querySelector('.tour-controls'),{subtree:true,attributes:true,attributeFilter:['aria-pressed']});sync();
  });
})();
