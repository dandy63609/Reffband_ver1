// Progressive enhancement: the full document remains readable when JavaScript is unavailable.
addEventListener('DOMContentLoaded',()=>{
  const main=document.querySelector('.goshuin-book');if(!main)return;
  const ja=main.lang==='ja', suffix=ja?'ja':'en';
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const vertical=matchMedia('(max-width:700px)');
  const leaves=[],routes=new Map();
  const pick=selector=>main.querySelector(selector);
  const make=(chapter,title,nodes,style='',route)=>{
    const page=document.createElement('section');page.className=`reader-leaf ${style}`;page.dataset.readerChapter=chapter;
    page.setAttribute('aria-label',title);page.tabIndex=-1;
    const content=document.createElement('div');content.className='reader-content';page.append(content);
    nodes.filter(Boolean).forEach(node=>content.append(node));
    page.id=route||`book-page-${leaves.length+1}-${suffix}`;routes.set(page.id,leaves.length);
    leaves.push({page,title,chapter});return content;
  };
  const hero=pick('.hero');make('arrival',ja?'旅のはじまり':'Every Stamp, A Memory',[hero],'reader-arrival',`hero-${suffix}`);
  // Clear duplicate heading ids after transferring an anchor to the reader leaf.
  hero.querySelector('h1').id=`reader-hero-title-${suffix}`;hero.setAttribute('aria-labelledby',`reader-hero-title-${suffix}`);
  const heading=text=>{const h=document.createElement('h2');h.textContent=text;return h;};
  const disclosure=(title,nodes)=>{const detail=document.createElement('details');detail.className='reader-extra';const summary=document.createElement('summary');summary.textContent=title;detail.append(summary,...nodes.filter(Boolean));return detail;};
  const features=pick('.features');
  make('discover',ja?'アプリの使い方':'Explore GoShuin',[pick('.app-tour')],'reader-tour',`discover-${suffix}`);
  make('discover',ja?'旅の記録':'Your Travel Journal',[heading(ja?'旅の記録':'Your Travel Journal'),pick('.feature-list'),pick('.art-note')],'reader-features');features.remove();
  const scan=pick('.scan-linkage'),scanDetail=pick('.scan-details');scanDetail.open=false;
  make('scan',ja?'御朱印を保存する':'Scan & Save',[pick('.scan-heading'),pick('.scan-steps'),scanDetail,pick('.scan-note')],'reader-scan reader-scan-combined',`scan-${suffix}`);scan.remove();
  const purpose=pick('.purpose'),stamp=purpose.firstElementChild,copy=pick('.purpose-copy');
  const intro=document.createElement('div');intro.className='purpose-copy';
  [...copy.querySelectorAll(':scope > p')].slice(0,2).forEach(p=>intro.append(p));
  make('purpose',ja?'GoShuin について':'Why GoShuin',[stamp,intro],'reader-memory',`purpose-${suffix}`);
  const generation=pick('.goshuin-create');
  if(generation){make('generation',ja?'自分だけの御朱印を作成':'Create Your Own Goshuin',[...generation.children],'reader-generation',`create-${suffix}`);generation.remove();}
  make('purpose',ja?'参拝を大切に':'Visiting with Care',[heading(ja?'参拝を大切に':'Visiting with Care'),copy],'reader-principles reader-care');purpose.remove();
  const culture=pick('.culture'),grid=pick('.culture-grid');
  make('culture',ja?'寺社と御朱印':'Temples, Shrines & Goshuin',[pick('.culture-heading'),grid,pick('.culture-sources')],'reader-culture reader-culture-guide',`culture-${suffix}`);
  make('culture',ja?'明治神宮の歴史':'Meiji Jingu',[pick('.history-story')],'reader-culture reader-history');culture.remove();
  const trends=pick('.trends'),inner=trends.firstElementChild;
  make('trends',ja?'日本の寺社のいま':'Japan’s Temples & Shrines',[inner.querySelector('.kicker'),pick('.data-heading'),pick('.facts'),pick('.coverage-note')],'reader-data',`trends-${suffix}`);
  make('trends',ja?'寺社数の推移':'Temple & Shrine Trends',[pick('.chart-card')],'reader-chart',`chart-${suffix}`);
  const table=pick('.source-table');table.open=false;
  make('trends',ja?'統計の出典と注記':'Sources & Notes',[heading(ja?'統計の出典と注記':'Sources & Notes'),pick('.data-warning'),table,disclosure(ja?'更新とデータの利用':'Updates & data credits',[pick('.provenance')])],'reader-sources reader-data-notes');trends.remove();
  const support=pick('.support'),faq=pick('.faq'),contact=pick('.contact'),questions=[...faq.querySelectorAll('details')];
  const chooser=document.createElement('select');chooser.className='reader-faq-select';chooser.setAttribute('aria-label',ja?'質問を選ぶ':'Choose a question');
  questions.forEach((detail,i)=>{const option=document.createElement('option');option.value=i;option.textContent=detail.querySelector('summary').textContent.replace('+','').trim();chooser.append(option);detail.open=true;detail.hidden=i!==0;});
  chooser.addEventListener('change',()=>questions.forEach((detail,i)=>{detail.hidden=i!==Number(chooser.value);detail.open=true;}));
  make('support',ja?'よくある質問とサポート':'Help & Support',[heading(ja?'よくある質問とサポート':'Help & Support'),chooser,faq,disclosure(ja?'お問い合わせ':'Contact AE Studio',[contact])],'reader-faq reader-help',`support-${suffix}`);support.remove();
  make('closing',ja?'旅の記録を始める':'Start Your Journal',[pick('.closing'),document.querySelector('.site-footer')],'reader-closing');
  main.querySelectorAll(':scope > .book-chapter-band,:scope > .journey-chapters').forEach(node=>node.remove());
  document.querySelector('.footer-band').hidden=true;
  const stage=document.createElement('div');stage.className='reader-stage';stage.setAttribute('aria-label',ja?'御朱印帳':'GoShuin book');
  leaves.forEach(({page})=>{page.hidden=true;stage.append(page);});main.append(stage);
  const strip=document.createElement('div');strip.className='reader-cloth';strip.setAttribute('aria-hidden','true');main.prepend(strip);
  const header=document.querySelector('.site-header');
  const top=document.createElement('div');top.className='reader-topline';top.dataset.stickyHeader='';
  const identity=document.createElement('div');identity.className='reader-identity';identity.append(header.querySelector('.brand'));
  const inscription=document.createElement('span');inscription.textContent='御朱印帳';inscription.setAttribute('aria-hidden','true');identity.append(inscription);
  const contents=document.createElement('details');contents.className='reader-contents';
  const contentsLabel=document.createElement('summary');contentsLabel.textContent=ja?'目次':'Contents';contents.append(contentsLabel,header.querySelector('nav'));
  top.append(identity,contents,header.querySelector('.languages'));strip.after(top);header.remove();
  const controls=document.createElement('nav');controls.className='reader-controls';controls.setAttribute('aria-label',ja?'本のページ':'Book pages');
  controls.innerHTML=`<button type="button" data-reader-prev aria-label="${ja?'前のページ':'Previous page'}"><span aria-hidden="true">←</span> ${ja?'前へ':'Previous'}</button><div class="reader-position"><label for="reader-page-choice">${ja?'ページ':'Page'}</label><select id="reader-page-choice" aria-label="${ja?'ページを選ぶ':'Go to page'}"></select><span data-reader-status aria-live="polite" class="sr-only"></span></div><button type="button" data-reader-next aria-label="${ja?'次のページ':'Next page'}">${ja?'次へ':'Next'} <span aria-hidden="true">→</span></button>`;
  main.append(controls);
  const choice=controls.querySelector('select');leaves.forEach((leaf,i)=>{const option=document.createElement('option');option.value=i;option.textContent=`${String(i+1).padStart(2,'0')} / ${leaves.length} · ${leaf.title}`;choice.append(option);});
  const orientControls=()=>{controls.querySelector('[data-reader-prev] span').textContent=vertical.matches?'↑':'←';controls.querySelector('[data-reader-next] span').textContent=vertical.matches?'↓':'→';};
  orientControls();vertical.addEventListener('change',()=>{stopTurn();orientControls();});
  let current=-1,foldFrame=0,foldLayers=[],settle=null;
  function stopTurn(){
    cancelAnimationFrame(foldFrame);foldFrame=0;
    foldLayers.forEach(layer=>layer.remove());foldLayers=[];
    settle?.();settle=null;
  }
  function accordion(page){
    const layer=document.createElement('div');layer.className='reader-accordion';layer.inert=true;layer.setAttribute('aria-hidden','true');
    const width=stage.clientWidth,height=stage.clientHeight,isVertical=vertical.matches,panelSize=(isVertical?height:width)/3;let parent=layer;const panels=[];
    layer.classList.toggle('accordion-vertical',isVertical);
    for(let i=0;i<3;i++){
      const panel=document.createElement('div');panel.className='accordion-panel';panel.style.width=`${isVertical?width:panelSize}px`;if(isVertical)panel.style.height=`${panelSize}px`;
      const face=document.createElement('div');face.className=`accordion-slice ${i===0?'fold-leading':i===1?'fold-mountain':'fold-valley'}`;
      const snapshot=page.cloneNode(true);snapshot.hidden=false;snapshot.removeAttribute('id');snapshot.querySelectorAll('[id]').forEach(node=>node.removeAttribute('id'));
      snapshot.style.width=`${width}px`;snapshot.style.height=`${height}px`;snapshot.style.left=`${isVertical?0:-i*panelSize}px`;snapshot.style.top=`${isVertical?-i*panelSize:0}px`;snapshot.style.opacity='1';
      const light=document.createElement('span');light.className='accordion-light';
      face.append(snapshot,light);
      if(i>0){const crease=document.createElement('span');crease.className='accordion-shading';face.append(crease);}
      panel.append(face);parent.append(panel);parent=panel;panels.push(panel);
      // Cloning a scrolled page must keep its content aligned across all three faces.
      snapshot.querySelectorAll('.reader-content').forEach((node,j)=>{node.scrollTop=page.querySelectorAll('.reader-content')[j].scrollTop;});
    }
    stage.append(layer);foldLayers.push(layer);return {layer,panels,width,height,isVertical};
  }
  function fold(from,to,forward){
    // A single connected Z: absolute face angles +θ, −θ, +θ. The child hinges
    // rotate by −2θ and +2θ, so both seams remain physically attached.
    const folded=accordion(from),{width,height,isVertical}=folded;
    const axis=isVertical?'X':'Y',travel=isVertical?'Y':'X';
    const distance=isVertical?height:width,panelSize=distance/3;
    const towardViewer=isVertical?1:-1,duration=1280;
    const ground=document.createElementNS('http://www.w3.org/2000/svg','svg');
    ground.classList.add('reader-fold-ground');ground.setAttribute('aria-hidden','true');
    ground.setAttribute('viewBox',`0 0 ${width} ${height}`);
    const shadow=document.createElementNS(ground.namespaceURI,'path');ground.append(shadow);
    stage.insertBefore(ground,folded.layer);foldLayers.push(ground);
    const surfaces=folded.panels.map(panel=>({panel,light:panel.querySelector(':scope > .accordion-slice > .accordion-light'),crease:panel.querySelector(':scope > .accordion-slice > .accordion-shading')}));
    to.style.opacity='0';settle=()=>{to.style.opacity='';};
    const smooth=(a,b,t)=>{const u=Math.max(0,Math.min(1,(t-a)/(b-a)));return u*u*(3-2*u);};
    let started;
    function draw(now){
      started??=now;const t=Math.min(1,(now-started)/duration);
      // Lift the intact page, then fold continuously out of the reading plane.
      const opening=smooth(.12,.62,t),departure=smooth(.52,1,t);
      const angle=52*opening+26*departure,radians=angle*Math.PI/180;
      const lift=22*smooth(0,.16,t)+12*opening-26*departure;
      const shift=(distance-distance*Math.cos(radians))*.22+(forward?-.58:1.12)*distance*departure;
      const sin=Math.sin(radians),cos=Math.cos(radians),visibility=1-smooth(.82,1,t);
      surfaces.forEach(({panel,light,crease},i)=>{
        const relative=(i===0?1:i===1?-2:2)*towardViewer;
        panel.style.transform=`translate${travel}(${i===0?shift:0}px) translateZ(${i===0?lift:0}px) rotate${axis}(${relative*angle}deg)`;
        // One upper-left light: normals facing it stay warm and bright; the reverse
        // face loses diffuse light. This is face lighting, not another crease shadow.
        const illumination=.78*cos+(i===1?-.48:.48)*sin;
        const dark=Math.max(0,1-illumination/.78)*.68;
        light.style.background=illumination<.78?'#28251f':'#fffbed';
        light.style.opacity=illumination<.78?dark:Math.min(.13,(illumination-.78)*.65);
        if(crease)crease.style.opacity=Math.min(1,sin*1.12);
      });
      // Project the same four hinge positions along that light onto the paper below.
      // All three silhouettes share ONE opaque path before opacity/blur is applied;
      // overlap can never create the doubled dark bands of per-panel box shadows.
      const vertices=Array.from({length:4},(_,i)=>({u:shift+i*panelSize*cos,z:lift+(i%2)*panelSize*sin}));
      const project=(vertex,cross)=>{
        const x=isVertical?cross:vertex.u,y=isVertical?vertex.u:cross;
        return [x+vertex.z*.42,y+vertex.z*.30];
      };
      const crossSize=isVertical?width:height;
      shadow.setAttribute('d',vertices.slice(0,3).map((v,i)=>{
        const points=[project(v,0),project(vertices[i+1],0),project(vertices[i+1],crossSize),project(v,crossSize)];
        const area=points.reduce((sum,p,j)=>{const q=points[(j+1)%4];return sum+p[0]*q[1]-q[0]*p[1];},0);
        if(area<0)points.reverse();
        return `M${points.map(point=>point.map(n=>n.toFixed(2)).join(',')).join('L')}Z`;
      }).join(''));
      ground.style.opacity=(.18+.20*sin)*smooth(0,.14,t)*visibility;
      ground.style.filter=`blur(${2+lift*.12+sin*3}px)`;
      folded.layer.style.opacity=visibility;
      to.style.opacity=smooth(.48,.76,t);
      if(t<1)foldFrame=requestAnimationFrame(draw);else stopTurn();
    }
    foldFrame=requestAnimationFrame(draw);
  }
  const bandByChapter={arrival:'indigo-waves',discover:'indigo-waves',purpose:'vermilion-clouds',culture:'pine-fan',scan:'golden-tide',generation:'golden-tide',trends:'jade-ribbons',support:'sakura-silk',closing:'indigo-waves'};
  function show(index,{motion=true,focus=false,hash=true}={}){
    index=Math.max(0,Math.min(leaves.length-1,index));if(index===current)return;
    stopTurn();
    const previous=current,old=leaves[previous]?.page,forward=index>previous;
    const shouldAnimate=old&&motion&&!reduced.matches&&!document.body.classList.contains('book-motion-paused');
    if(old){old.hidden=true;old.inert=true;}current=index;
    const leaf=leaves[index];leaf.page.hidden=false;leaf.page.inert=false;
    main.dataset.readerChapter=leaf.chapter;strip.style.backgroundImage=`url('/goshuin/assets/band-${bandByChapter[leaf.chapter]}-20261004.webp')`;
    choice.value=index;controls.querySelector('[data-reader-prev]').disabled=index===0;controls.querySelector('[data-reader-next]').disabled=index===leaves.length-1;
    controls.querySelector('[data-reader-status]').textContent=`${ja?'ページ':'Page'} ${index+1} / ${leaves.length}. ${leaf.title}`;
    document.querySelectorAll('[data-nav]').forEach(link=>{const active=link.dataset.nav===leaf.chapter||(link.dataset.nav==='discover'&&['scan','generation'].includes(leaf.chapter))||(link.dataset.nav==='purpose'&&leaf.chapter==='culture');if(active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});
    if(hash&&leaf.page.id)history.replaceState(null,'',`#${leaf.page.id}`);
    if(shouldAnimate)fold(old,leaf.page,forward);
    if(focus)leaf.page.focus({preventScroll:true});
  }
  controls.querySelector('[data-reader-prev]').addEventListener('click',()=>show(current-1));
  controls.querySelector('[data-reader-next]').addEventListener('click',()=>show(current+1));choice.addEventListener('change',()=>show(Number(choice.value)));
  document.addEventListener('click',event=>{const anchor=event.target.closest('a[href^="#"]');if(!anchor)return;const target=routes.get(anchor.hash.slice(1));if(target===undefined)return;event.preventDefault();contents.open=false;show(target,{focus:true});});
  addEventListener('hashchange',()=>{const target=routes.get(location.hash.slice(1));if(target!==undefined)show(target,{focus:true,hash:false});});
  document.addEventListener('keydown',event=>{
    if(event.key==='Escape')contents.open=false;
    if(event.defaultPrevented||event.altKey||event.ctrlKey||event.metaKey||event.target.closest('input,select,textarea,button,summary,[role="dialog"]')||document.querySelector('dialog[open]'))return;
    if(event.key===(vertical.matches?'ArrowDown':'ArrowRight')||event.key==='PageDown'){event.preventDefault();show(current+1);}else if(event.key===(vertical.matches?'ArrowUp':'ArrowLeft')||event.key==='PageUp'){event.preventDefault();show(current-1);}
  });
  let touch=null;
  stage.addEventListener('pointerdown',event=>{if(event.pointerType!=='touch'||event.target.closest('button,a,input,select,summary,.source-table,.scan-details,.reader-extra'))return;touch={x:event.clientX,y:event.clientY};},{passive:true});
  stage.addEventListener('pointerup',event=>{if(!touch)return;const dx=event.clientX-touch.x,dy=event.clientY-touch.y;touch=null;const distance=vertical.matches?dy:dx,cross=vertical.matches?dx:dy;if(Math.abs(distance)>65&&Math.abs(distance)>Math.abs(cross)*1.5)show(current+(distance<0?1:-1));},{passive:true});
  stage.addEventListener('pointercancel',()=>{touch=null;},{passive:true});
  addEventListener('resize',stopTurn);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)stopTurn();});
  reduced.addEventListener('change',()=>{if(reduced.matches)stopTurn();});
  document.addEventListener('goshuin:motion-change',event=>{if(event.detail.paused)stopTurn();});
  document.body.classList.add('is-book-reader');
  show(routes.get(location.hash.slice(1))??0,{motion:false,hash:false});
});
