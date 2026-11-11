(() => {
  const hero=document.querySelector('.book-hero');
  if(!hero)return;
  const reduce=matchMedia('(prefers-reduced-motion: reduce)');
  const ja=document.documentElement.lang==='ja';
  const cover=hero.querySelector('.book-cover');
  const replay=hero.querySelector('[data-scene-replay]');
  const running=new Set();
  let paused=false, coverRun=null, opened=false;
  const enabled=()=>!reduce.matches&&!paused;
  const ease='cubic-bezier(.22,.68,.2,1)';
  function animate(element,frames,options){
    if(!enabled()||!element?.animate)return null;
    const animation=element.animate(frames,options);running.add(animation);
    animation.finished.catch(()=>{}).finally(()=>running.delete(animation));return animation;
  }
  const contents=[hero.querySelector('.journey-scene'),replay].filter(Boolean);
  const setCovered=value=>contents.forEach(node=>{node.inert=value;});
  const front=cover.querySelector('.book-cover-front');
  const pattern=document.createElement('div');pattern.className='cover-pattern';pattern.setAttribute('aria-hidden','true');front.prepend(pattern);
  // Optional locally hosted Veo export. No request is made until a clip is supplied.
  let video=null,coverVideos=[];
  if(cover.dataset.loopSrc){
    video=document.createElement('video');video.className='cover-pattern-video';video.muted=true;video.loop=true;video.playsInline=true;video.preload='metadata';video.setAttribute('aria-hidden','true');
    video.poster='/goshuin/assets/cover-indigo-veo-poster-20261006.jpg';video.src=cover.dataset.loopSrc;pattern.append(video);
    const lower=video.cloneNode(true);lower.classList.add('cover-pattern-video-bottom');lower.muted=true;pattern.append(lower);
    coverVideos=[video,lower];coverVideos.forEach(clip=>clip.addEventListener('error',()=>clip.remove()));
  }
  let coverInView=true;
  const syncVideo=()=>{if(!video)return;const play=enabled()&&!opened&&coverInView&&!document.hidden;coverVideos.forEach(clip=>{if(play){if(clip!==video&&clip.readyState>0)clip.currentTime=video.currentTime;clip.play().catch(()=>{});}else clip.pause();});};
  const cue=document.createElement('span');cue.className='cover-open-cue';
  cue.innerHTML=`<span aria-hidden="true">↗</span> ${ja?'表紙をめくって、旅を始める':'Lift the cover to begin'}<small>${ja?'タップ、またはスワイプ':'Tap or swipe to open'}</small>`;front.append(cue);
  cover.removeAttribute('aria-hidden');cover.setAttribute('role','button');cover.tabIndex=0;
  cover.setAttribute('aria-label',ja?'表紙をめくって御朱印帳を開く':'Lift cover to open GoShuin');
  hero.classList.add('cover-waiting');setCovered(true);
  const coverAxis=()=>matchMedia('(max-width:700px)').matches?'X':'Y';
  function finishOpening(){
    const hadFocus=document.activeElement===cover;
    coverRun?.cancel();coverRun=null;cover.style.visibility='hidden';cover.style.transform='';
    cover.tabIndex=-1;cover.setAttribute('aria-hidden','true');hero.classList.remove('cover-waiting');setCovered(false);syncVideo();
    // Keyboard users continue directly to the revealed page, not an invisible cover.
    if(hadFocus){const title=hero.querySelector('h1');title.tabIndex=-1;title.focus({preventScroll:true});}
  }
  function openBook(angle=0){
    if(opened)return;opened=true;cover.style.transition='';
    if(!enabled()){finishOpening();return;}
    const axis=coverAxis();
    const run=animate(cover,[
      {transform:`rotate${axis}(${-angle}deg)`,opacity:1,offset:0},
      {transform:`rotate${axis}(${-Math.max(18,angle+8)}deg)`,opacity:1,offset:.15},
      {transform:`rotate${axis}(-155deg)`,opacity:1,offset:.86},
      {transform:`rotate${axis}(-178deg)`,opacity:0,offset:1}
    ],{duration:1050,easing:ease,fill:'both'});
    coverRun=run;syncVideo();
    if(!run){finishOpening();return;}
    hero.dispatchEvent(new CustomEvent('goshuin:book-open',{detail:{delay:420}}));
    run.finished.then(()=>{if(coverRun===run)finishOpening();}).catch(()=>{});
  }
  let drag=null,suppressClick=false;
  cover.addEventListener('pointerdown',event=>{
    if(opened||event.button!==0)return;
    event.stopPropagation();
    drag={id:event.pointerId,x:event.clientX,y:event.clientY,angle:0};
    cover.setPointerCapture(event.pointerId);cover.style.transition='';
  });
  cover.addEventListener('pointermove',event=>{
    if(!drag||event.pointerId!==drag.id)return;
    const delta=coverAxis()==='X'?drag.y-event.clientY:drag.x-event.clientX;
    drag.angle=Math.max(0,Math.min(64,delta*.28));
    if(enabled())cover.style.transform=`rotate${coverAxis()}(${-drag.angle}deg)`;
  });
  const release=(event,cancelled=false)=>{
    if(!drag||event.pointerId!==drag.id)return;
    event.stopPropagation();
    const movement=Math.hypot(event.clientX-drag.x,event.clientY-drag.y),angle=drag.angle;drag=null;
    suppressClick=true;
    if(!cancelled&&(angle>12||movement<8)){openBook(angle);return;}
    cover.style.transition=enabled()?'transform 220ms ease-out':'';cover.style.transform='';
  };
  cover.addEventListener('pointerup',event=>release(event));
  cover.addEventListener('pointercancel',event=>release(event,true));
  cover.addEventListener('click',()=>{if(suppressClick){suppressClick=false;return;}openBook();});
  cover.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();openBook();}});
  document.addEventListener('visibilitychange',syncVideo);
  if(video&&'IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{coverInView=entries[0].isIntersecting;syncVideo();});observer.observe(cover);}
  syncVideo();
  replay.innerHTML=`<span aria-hidden="true">↻</span> ${ja?'墨の描画をもう一度':'Replay the Ink'}`;
  replay.setAttribute('aria-label',ja?'墨の濃淡アニメーションを再生':'Replay dot reveal');
  replay.addEventListener('click',()=>{if(enabled())hero.dispatchEvent(new CustomEvent('goshuin:book-open'));});
  const control=document.createElement('button');
  control.type='button';control.className='book-motion-control';control.setAttribute('aria-pressed','false');
  const syncControl=()=>{
    control.textContent=paused?(ja?'動きを再開':'Resume motion'):(ja?'動きを止める':'Pause motion');
    control.setAttribute('aria-pressed',String(paused));control.hidden=reduce.matches;
    replay.hidden=!enabled();
  };
  control.addEventListener('click',()=>{
    paused=!paused;document.body.classList.toggle('book-motion-paused',paused);
    if(paused){running.forEach(animation=>animation.cancel());if(opened)finishOpening();}syncVideo();
    document.dispatchEvent(new CustomEvent('goshuin:motion-change',{detail:{paused}}));syncControl();
  });
  document.body.append(control);syncControl();
  reduce.addEventListener('change',()=>{if(reduce.matches){running.forEach(animation=>animation.cancel());if(opened)finishOpening();}syncControl();syncVideo();});
  // Enhance the non-reader fallback when its sections enter view.
  if('IntersectionObserver' in window){
    const bands=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(!entry.isIntersecting)return;bands.unobserve(entry.target);
      entry.target.querySelectorAll('.band-folds i').forEach((fold,i)=>animate(fold,[{transform:`rotateX(${i%2?'-':'+'}65deg)`,opacity:.35},{transform:'rotateX(0deg)',opacity:1}],{duration:650,delay:i*60,easing:ease}));
    }),{threshold:.3});
    document.querySelectorAll('.book-chapter-band').forEach(band=>bands.observe(band));
    const pages=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(!entry.isIntersecting)return;pages.unobserve(entry.target);
      animate(entry.target,[{transform:'perspective(1400px) rotateY(-9deg)',opacity:.65},{transform:'perspective(1400px) rotateY(0deg)',opacity:1}],{duration:650,easing:ease});
    }),{threshold:.12});
    document.querySelectorAll('.tour-copy,.purpose-copy,.chart-card,.faq,.history-story').forEach(page=>{page.style.transformOrigin='left center';pages.observe(page);});
  }
})();
