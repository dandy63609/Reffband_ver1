import { renderStatisticsChart } from './statistics-chart.mjs?v=6994e4938f28';
(() => {
  const labels = JSON.parse(document.getElementById('chart-copy').textContent);
  let data = JSON.parse(document.getElementById('statistics-initial').textContent);
  const number = n => n.toLocaleString('en-US');
  const signed = n => n == null ? '—' : n < 0 ? '−' + number(Math.abs(n)) : n > 0 ? '+' + number(n) : '0';
  const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function renderChart(panel) {
    const lang = panel.dataset.panel, c = labels[lang];
    const rows = data.nationalAnnual, mode = panel.querySelector('[data-chart-mode]').value;
    const annual = mode === 'annual';
    const value = (row, key) => annual ? row[key === 'temples' ? 'templeChange' : 'shrineChange'] : row[key] - rows[0][key];
    const available = annual ? rows.slice(1) : rows;
    const current = Number(panel.querySelector('[data-chart-year]').value);
    const selected = available.find(row => row.year === current) || available.at(-1);
    panel.querySelector('[data-chart-year]').value = String(selected.year);
    panel.querySelector('[data-chart-year] option:first-child').disabled = annual;
    const chart = panel.querySelector('[data-chart]');
    chart.dataset.transition = chart.dataset.mode === mode ? 'year' : 'mode';
    chart.dataset.mode = mode;
    chart.innerHTML = renderStatisticsChart(rows,lang,mode,selected.year);
    panel.querySelectorAll('[data-mode-button]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.modeButton===mode)));
    const index = panel.querySelector('[data-year-index]');
    const years = available.map(row=>row.year).join(',');
    if (index.dataset.years !== years) {
      index.innerHTML = available.map(row=>`<button type="button" data-year-button="${row.year}" aria-label="${lang==='ja'?`${row.year}年を比較`:`Compare ${row.year}`}"><span class="year-index-tick" aria-hidden="true"></span><span>${row.year}</span><span class="year-index-dot" aria-hidden="true"></span></button>`).join('');
      index.dataset.years = years;
    }
    index.querySelectorAll('[data-year-button]').forEach(button=>button.setAttribute('aria-pressed',String(Number(button.dataset.yearButton)===selected.year)));
    panel.querySelector('[data-chart-mode] option[value="cumulative"]').textContent=c.cumulative.replace('2019',rows[0].year);
    panel.querySelector('[data-copy="chart-title"]').textContent = annual ? c.annual : c.chartTitle.replace('2019', rows[0].year);
    panel.querySelector('[data-copy="chart-description"]').textContent = annual ? (lang==='ja'?'全国の寺院・神社の宗教団体数の、前年からの増減です。':'Annual net changes in national temple and shrine organisation counts.') : c.chartDescription.replace('2019', rows[0].year);
    panel.querySelector('[data-readout]').textContent = `${selected.year} · ${c.temples} ${signed(value(selected,'temples'))} / ${c.shrines} ${signed(value(selected,'shrines'))}`;
  }
  function renderData() {
    document.querySelectorAll('[data-panel]').forEach(panel => {
      const lang=panel.dataset.panel, c=labels[lang], latest=data.nationalAnnual.at(-1);
      const [inventoryYear,inventoryMonth] = data.inventory.month.split('-');
      const month = new Date(Date.UTC(Number(inventoryYear), Number(inventoryMonth)-1, 1)).toLocaleDateString(lang==='ja'?'ja-JP':'en-GB',{year:'numeric',month:'long',timeZone:'UTC'});
      panel.querySelector('[data-value="mapped"]').textContent = number(data.inventory.temples+data.inventory.shrines);
      panel.querySelector('[data-value="temples"]').textContent = number(latest.temples);
      panel.querySelector('[data-value="shrines"]').textContent = number(latest.shrines);
      panel.querySelector('[data-copy="mapped-note"]').textContent = `${month} · ${c.temples} ${number(data.inventory.temples)} / ${c.shrines} ${number(data.inventory.shrines)}`;
      panel.querySelectorAll('[data-copy="national-note"]').forEach(el => {el.textContent = lang==='ja'?`全国の宗教団体数 · ${latest.year}年12月31日時点`:`National religious organisations · 31 December ${latest.year}`;});
      const select = panel.querySelector('[data-chart-year]');
      const old = select.value;
      select.innerHTML = data.nationalAnnual.map(row => `<option value="${row.year}">${row.year}</option>`).join('');
      select.value = data.nationalAnnual.some(row=>String(row.year)===old)?old:String(latest.year);
      panel.querySelector('[data-source-rows]').innerHTML = data.nationalAnnual.map(row => `<tr><th scope="row">${row.year}</th><td>${number(row.temples)}</td><td>${number(row.shrines)}</td><td>${signed(row.templeChange)}</td><td>${signed(row.shrineChange)}</td><td><a href="${escape(row.sourceURL)}">${escape(c.yearbook)}<span class="sr-only"> ${row.year}</span> ↗</a></td></tr>`).join('');
      const date=data.sourcesCheckedAt.slice(0,10);
      const time=panel.querySelector('[data-checked]'); time.dateTime=date; time.textContent=date;
      panel.querySelector('[data-publication-state]').textContent=data.publicationState==='live'?c.live:c.saved;
      renderChart(panel);
    });
  }
  function validSnapshot(candidate) {
    const count=n=>Number.isSafeInteger(n)&&n>=0&&n<=2_000_000;
    return candidate?.schemaVersion===1 && typeof candidate.generatedAt==='string'
      && typeof candidate.sourcesCheckedAt==='string' && Number.isFinite(Date.parse(candidate.sourcesCheckedAt))
      && Date.parse(candidate.generatedAt)>=Date.parse(data.generatedAt)
      && Date.parse(candidate.sourcesCheckedAt)>=Date.parse(data.sourcesCheckedAt)
      && Date.parse(candidate.generatedAt)<=Date.now()+300_000 && Date.parse(candidate.sourcesCheckedAt)<=Date.now()+300_000
      && /^\d{4}-(0[1-9]|1[0-2])$/.test(candidate.inventory?.month||'')
      && count(candidate.inventory.temples)&&count(candidate.inventory.shrines)
      && Array.isArray(candidate.nationalAnnual)&&candidate.nationalAnnual.length>=2&&candidate.nationalAnnual.length<=40
      && candidate.nationalAnnual.every((row,i,all)=>Number.isInteger(row.year)&&row.year>=1900&&row.year<=new Date().getUTCFullYear()
        &&count(row.temples)&&count(row.shrines)
        && /^https:\/\/www\.bunka\.go\.jp\/tokei_hakusho_shuppan\/hakusho_nenjihokokusho\/shukyo_nenkan\/pdf\/[rh]\d{2}nenkan\.pdf$/.test(row.sourceURL||'')
        &&(!i||(row.year===all[i-1].year+1&&row.templeChange===row.temples-all[i-1].temples&&row.shrineChange===row.shrines-all[i-1].shrines)));
  }
  document.querySelectorAll('[data-chart-mode],[data-chart-year]').forEach(control => control.addEventListener('change',()=>renderChart(control.closest('[data-panel]'))));
  document.querySelectorAll('[data-panel]').forEach(panel=>{
    const select=panel.querySelector('[data-chart-mode]');
    const controls=select.closest('.chart-controls');
    const segmented=document.createElement('div');segmented.className='chart-segments';
    segmented.setAttribute('role','group');segmented.setAttribute('aria-label',panel.dataset.panel==='ja'?'比較方法':'Comparison');
    for(const [mode,label] of [['cumulative',panel.dataset.panel==='ja'?'累計':'Cumulative'],['annual',panel.dataset.panel==='ja'?'前年比':'Year on year']]) {
      const button=document.createElement('button');button.type='button';button.textContent=label;button.dataset.modeButton=mode;
      button.addEventListener('click',()=>{select.value=mode;renderChart(panel);});segmented.append(button);
    }
    controls.append(segmented);select.hidden=true;
    const bottom=panel.querySelector('.chart-bottom');
    const index=document.createElement('div');index.className='folio-index';
    index.innerHTML=`<div class="folio-index-heading"><span>${panel.dataset.panel==='ja'?'年をめくる':'Turn through the years'}</span><span>${panel.dataset.panel==='ja'?'年を選択':'Select a year'}</span></div><div class="year-index" data-year-index role="group" aria-label="${panel.dataset.panel==='ja'?'比較する年':'Year to compare'}"></div>`;
    bottom.prepend(index);
    panel.querySelector('[data-chart-year]').hidden=true;bottom.querySelector('label[for]').hidden=true;
    const choose = button => {panel.querySelector('[data-chart-year]').value=button.dataset.yearButton;renderChart(panel);};
    index.addEventListener('click',event=>{const button=event.target.closest('[data-year-button]');if(button)choose(button);});
    index.addEventListener('keydown',event=>{
      const button=event.target.closest('[data-year-button]');if(!button)return;
      const buttons=[...index.querySelectorAll('[data-year-button]')], i=buttons.indexOf(button);
      const next=event.key==='ArrowRight'?buttons[Math.min(i+1,buttons.length-1)]:event.key==='ArrowLeft'?buttons[Math.max(i-1,0)]:event.key==='Home'?buttons[0]:event.key==='End'?buttons.at(-1):null;
      if(next){event.preventDefault();next.focus();choose(next);}
    });
    const card=panel.querySelector('.chart-card');
    if ('IntersectionObserver' in window) {
      const observer=new IntersectionObserver(entries=>{if(entries.some(entry=>entry.isIntersecting)){card.classList.add('is-chart-visible');observer.disconnect();}},{threshold:0.15});
      observer.observe(card);
    } else card.classList.add('is-chart-visible');
  });
  renderData();
  const bands=JSON.parse(document.getElementById('footer-bands').textContent);
  const selectedBand=bands[Math.floor(Math.random()*bands.length)];
  const band=document.querySelector('[data-footer-band]');
  band.style.backgroundImage=`url('/goshuin/assets/${selectedBand.file}')`;
  band.dataset.design=selectedBand.id;
  fetch('/goshuin/statistics.json',{credentials:'omit',signal:AbortSignal.timeout(12_000)})
    .then(response=>{if(!response.ok)throw new Error();return response.json();})
    .then(candidate=>{if(validSnapshot(candidate)){data=candidate;renderData();}})
    .catch(()=>{}); // The sourced, dated initial chart stays usable when the feed is unavailable.
})();
