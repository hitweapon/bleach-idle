(() => {
  'use strict';
  if (window.xbCombatPowerVisual) return;

  const arena = document.getElementById('battleArena');
  if (!arena) return;

  let powerLayer = document.getElementById('xbPowerLayer');
  if (!powerLayer) {
    powerLayer = document.createElement('div');
    powerLayer.id = 'xbPowerLayer';
    powerLayer.className = 'xb-power-layer';
    powerLayer.setAttribute('aria-hidden', 'true');
    const fx = document.getElementById('combatFx');
    if (fx && fx.parentNode === arena) arena.insertBefore(powerLayer, fx);
    else arena.appendChild(powerLayer);
  }

  const reducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches === true;
  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
  const removeLater = (node, ms = 900) => window.setTimeout(() => node?.remove(), reducedMotion() ? 180 : ms);

  function relativeCenter(node, xRatio = 0.5, yRatio = 0.5) {
    const root = arena.getBoundingClientRect();
    const rect = node?.getBoundingClientRect();
    if (!rect || !rect.width || !rect.height || !root.width || !root.height) return null;
    return {
      x: rect.left - root.left + rect.width * xRatio,
      y: rect.top - root.top + rect.height * yRatio
    };
  }

  function actors() {
    const hero = arena.querySelector('#heroArtReal.is-loaded') ||
      arena.querySelector('#heroArtFallback:not(.asset-hidden)') ||
      arena.querySelector('#heroArtReal') || arena.querySelector('#heroArtFallback');
    const target = arena.querySelector('#enemyPack .enemy-large') || arena.querySelector('#enemyPack');
    const heroPoint = relativeCenter(hero, 0.78, 0.4);
    const targetPoint = relativeCenter(target, 0.5, 0.43);
    return { hero, target, heroPoint, targetPoint };
  }

  function addAura(point, variant = '') {
    if (!point) return;
    const node = document.createElement('div');
    node.className = 'xb-power-aura' + (variant ? ' ' + variant : '');
    node.style.left = point.x + 'px';
    node.style.top = point.y + 'px';
    powerLayer.appendChild(node);
    removeLater(node, 700);
  }

  function addFlash(variant = '') {
    const node = document.createElement('div');
    node.className = 'xb-power-flash' + (variant ? ' ' + variant : '');
    powerLayer.appendChild(node);
    removeLater(node, 450);
  }

  function addCallout(message, variant = '') {
    const node = document.createElement('div');
    node.className = 'xb-power-callout' + (variant ? ' ' + variant : '');
    node.textContent = String(message || 'TÉCNICA ESPIRITUAL').toUpperCase();
    powerLayer.appendChild(node);
    removeLater(node, 1050);
  }

  function addProjectile(from, to, variant = '', extra = {}) {
    if (!from || !to) return;
    const dx = to.x - from.x, dy = to.y - from.y;
    const distance = Math.max(45, Math.hypot(dx, dy));
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;
    const node = document.createElement('div');
    node.className = 'xb-power-projectile' + (variant ? ' ' + variant : '');
    node.style.left = from.x + 'px';
    node.style.top = (from.y - (extra.height || 26) / 2) + 'px';
    node.style.width = distance + 'px';
    node.style.height = (extra.height || 26) + 'px';
    node.style.setProperty('--power-angle', angle + 'deg');
    node.style.animationDuration = (extra.duration || 500) + 'ms';
    if (extra.delay) node.style.animationDelay = extra.delay + 'ms';
    powerLayer.appendChild(node);
    removeLater(node, (extra.delay || 0) + (extra.duration || 500));
  }

  function addImpact(point, variant = '', size = 76, delay = 0) {
    if (!point) return;
    const node = document.createElement('div');
    node.className = 'xb-power-impact' + (variant ? ' ' + variant : '');
    node.style.left = point.x + 'px';
    node.style.top = point.y + 'px';
    node.style.width = size + 'px';
    node.style.height = size + 'px';
    if (delay) node.style.animationDelay = delay + 'ms';
    powerLayer.appendChild(node);
    removeLater(node, delay + 650);
  }

  function addSlash(point, variant = '') {
    if (!point) return;
    const slash = document.createElement('div');
    slash.className = 'xb-power-slash' + (variant ? ' ' + variant : '');
    slash.style.left = point.x + 'px';
    slash.style.top = point.y + 'px';
    powerLayer.appendChild(slash);
    removeLater(slash, 430);
  }

  function strikeHero(hero, source = 'basic', variant = '') {
    if (!hero) return;
    const className = source === 'skill' ? 'xb-power-cast' : 'xb-power-strike';
    hero.classList.remove('xb-power-strike', 'xb-power-cast', 'xb-vfx-purple', 'xb-vfx-gold', 'xb-vfx-red', 'xb-vfx-blackwave');
    void hero.getBoundingClientRect();
    hero.classList.add(className);
    if (variant) hero.classList.add(variant);
    removeLater({ remove: () => { hero.classList.remove(className); if (variant) hero.classList.remove(variant); } }, source === 'skill' ? 760 : 470);
  }

  function addEnemyCounterattack(variant = 'xb-vfx-red') {
    const { heroPoint, targetPoint } = actors();
    if (!heroPoint || !targetPoint) return;
    addProjectile(targetPoint, heroPoint, variant, { height: 20, duration: 420 });
    addImpact(heroPoint, variant, 60, 160);
    addFlash(variant);
  }

  function skillVariant(skillId, source) {
    if (source !== 'skill') return '';
    if (['astral-burst'].includes(skillId)) return 'xb-vfx-purple';
    if (['flash-step', 'shunko-strike'].includes(skillId)) return 'xb-vfx-gold';
    if (['spirit-pierce', 'blue-lance'].includes(skillId)) return 'xb-vfx-lance';
    if (['quincy-arrow', 'reishi-volley'].includes(skillId)) return 'xb-vfx-arrow';
    if (['thunderclap', 'raijin-burst'].includes(skillId)) return 'xb-vfx-lightning';
    if (['bankai-wave'].includes(skillId)) return 'xb-vfx-blackwave';
    return 'xb-vfx-heavy';
  }

  function addSignatureDrawing(id, from, to, source='skill', classId='blade') {
    if(!from||!to||!arena.isConnected)return;
    const w=Math.max(1,arena.clientWidth),h=Math.max(1,arena.clientHeight),dx=to.x-from.x,dy=to.y-from.y;
    const dist=Math.max(80,Math.hypot(dx,dy)),angle=Math.atan2(dy,dx)*180/Math.PI,F=n=>Number(n.toFixed(1));
    const fx=F(from.x),fy=F(from.y),tx=F(to.x),ty=F(to.y),mx=F((from.x+to.x)/2),my=F((from.y+to.y)/2);
    const k='xbsig'+Date.now().toString(36)+Math.floor(Math.random()*9999),svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
    svg.classList.add('xb-power-drawing','xb-draw-'+(source==='basic'?classId:id));
    svg.setAttribute('viewBox','0 0 '+w+' '+h);svg.setAttribute('preserveAspectRatio','none');svg.setAttribute('aria-hidden','true');
    const defs='<defs><linearGradient id="'+k+'red" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#090912"/><stop offset=".42" stop-color="#aa102d"/><stop offset=".74" stop-color="#ff526d"/><stop offset="1" stop-color="#fff"/></linearGradient><linearGradient id="'+k+'blue"><stop stop-color="#2b8cff"/><stop offset=".5" stop-color="#fff"/><stop offset="1" stop-color="#52d6ff"/></linearGradient><radialGradient id="'+k+'violet"><stop stop-color="#fff"/><stop offset=".25" stop-color="#e0c8ff"/><stop offset=".65" stop-color="#963dff" stop-opacity=".8"/><stop offset="1" stop-color="#5b20d5" stop-opacity="0"/></radialGradient><radialGradient id="'+k+'gold"><stop stop-color="#fffde4"/><stop offset=".35" stop-color="#ffe789"/><stop offset=".72" stop-color="#ff8a25" stop-opacity=".85"/><stop offset="1" stop-color="#f33b1b" stop-opacity="0"/></radialGradient></defs>';
    const rays=(x,y,n,r1,r2,col,sw=3)=>{let s='<g class="xb-art-rays" stroke="'+col+'" stroke-width="'+sw+'" stroke-linecap="round">';for(let i=0;i<n;i++){const t=2*Math.PI*i/n-Math.PI/2;s+='<path d="M'+F(x+Math.cos(t)*r1)+' '+F(y+Math.sin(t)*r1)+' L'+F(x+Math.cos(t)*r2)+' '+F(y+Math.sin(t)*r2)+'"/>'}return s+'</g>'};
    const slash=(x,y,rot=0)=>'<g class="xb-art-crescent" transform="translate('+F(x)+' '+F(y)+') rotate('+rot+')"><path d="M-76 35 C-72 -26 -18 -74 43 -60 C70 -54 84 -29 87 -10 C52 -39 22 -37 -4 -15 C-24 3 -35 21 -39 42 C-14 17 16 8 42 15 C7 16 -25 35 -45 54Z" fill="url(#'+k+'red)" stroke="#ff657b" stroke-width="2.4"/><path d="M-62 33 C-42 -10 5 -53 60 -26" fill="none" stroke="#fff8f4" stroke-width="4.5" stroke-linecap="round"/><path d="M-47 50l-23 18 31-8 M45 22l26 4-19 13 M-25 62l12-22 M67-4l20-12" fill="none" stroke="#ff526b" stroke-width="4" stroke-linecap="round"/></g>';
    const ring=(x,y,col)=>'<g class="xb-art-impact" transform="translate('+F(x)+' '+F(y)+')"><circle r="44" fill="url(#'+k+'violet)" opacity=".8"/><ellipse rx="48" ry="19" fill="none" stroke="'+col+'" stroke-width="3"/><ellipse rx="30" ry="43" fill="none" stroke="'+col+'" stroke-width="2" transform="rotate(42)"/></g>';
    const arrow=(x,y,off,scale=1)=>'<g class="xb-art-arrow" transform="translate('+F(x)+' '+F(y+off)+') rotate('+F(angle+off*.09)+') scale('+scale+')"><path d="M8 0 L'+F(dist-28)+' 0" stroke="url(#'+k+'blue)" stroke-width="5" stroke-linecap="round"/><path d="M'+F(dist-48)+' -13L'+F(dist)+' 0 '+F(dist-48)+' 13 '+F(dist-38)+' 0Z" fill="url(#'+k+'blue)" stroke="#b9efff" stroke-width="2"/><path d="M22 0l21-10-5 10 5 10Z" fill="#43adff"/></g>';
    const bolt=(x1,y1,x2,y2,sw=5)=>{const X=x2-x1,Y=y2-y1,L=Math.hypot(X,Y),pX=-Y/L,pY=X/L,pts=[];for(let i=0;i<=8;i++){const t=i/8,j=(i===0||i===8)?0:(i%2?1:-1)*Math.min(20,L*.06);pts.push(F(x1+X*t+pX*j)+','+F(y1+Y*t+pY*j))}const q=pts.join(' ');return '<polyline points="'+q+'" fill="none" stroke="#286fff" stroke-width="'+(sw+7)+'" opacity=".65" stroke-linejoin="round"/><polyline points="'+q+'" fill="none" stroke="#7beaff" stroke-width="'+sw+'" stroke-linecap="round" stroke-linejoin="round"/><polyline points="'+q+'" fill="none" stroke="#fff" stroke-width="1.7"/>'};
    let art='';
    if((id==='basic'&&classId==='blade')||id==='crescent'){
      art+='<path class="xb-art-travel" d="M'+fx+' '+fy+' Q'+mx+' '+F(my-52)+' '+tx+' '+ty+'" fill="none" stroke="#ff526d" stroke-width="3" stroke-dasharray="18 14"/>'+slash(tx,ty,-8)+rays(tx,ty,8,48,72,'#ff586b',3);
    }else if(id==='moon-fang'){
      art+=slash(tx,ty,-24)+slash(tx,ty,60)+'<path d="M'+F(tx-62)+' '+F(ty-38)+'L'+F(tx+58)+' '+F(ty+32)+' M'+F(tx-48)+' '+F(ty+46)+'L'+F(tx+53)+' '+F(ty-48)+'" stroke="#fff" stroke-width="3"/>'+rays(tx,ty,8,48,75,'#ff586b',3);
    }else if(id==='bankai-wave'){
      art+='<path class="xb-art-wave" d="M'+fx+' '+F(fy+35)+' C'+mx+' '+F(my+70)+' '+F(tx-45)+' '+F(ty+64)+' '+tx+' '+ty+' C'+F(tx-38)+' '+F(ty+6)+' '+F(tx-27)+' '+F(ty-44)+' '+F(tx-2)+' '+F(ty-62)+' C'+F(tx+19)+' '+F(ty-25)+' '+F(tx+35)+' '+F(ty-11)+' '+F(tx+65)+' '+F(ty-22)+' C'+F(tx+36)+' '+F(ty+21)+' '+F(tx+33)+' '+F(ty+56)+' '+F(tx+8)+' '+F(ty+69)+' C'+mx+' '+F(my+74)+' '+fx+' '+F(fy+42)+' '+fx+' '+F(fy+35)+'Z" fill="url(#'+k+'red)" stroke="#ff6176" stroke-width="2"/><path d="M'+fx+' '+F(fy+38)+' Q'+mx+' '+F(my+17)+' '+F(tx-13)+' '+F(ty+25)+'" fill="none" stroke="#fff1ed" stroke-width="5"/><path d="M'+F(tx-70)+' '+F(ty+13)+'l25-24 6 20 26-44 1 31 27-13" fill="none" stroke="#ff304d" stroke-width="5"/>';
    }else if((id==='basic'&&classId==='kido')||id==='quincy-arrow'||id==='reishi-volley'){
      const offs=id==='reishi-volley'?[-32,-10,12,34]:id==='basic'?[-13,10]:[0];offs.forEach(o=>art+=arrow(fx,fy,o,id==='reishi-volley'?.85:id==='basic'?.78:1));
      art+='<path d="M'+F(fx+7)+' '+F(fy-36)+' Q'+F(fx-28)+' '+fy+' '+F(fx+7)+' '+F(fy+36)+'" fill="none" stroke="#6bcfff" stroke-width="3"/>'+ring(tx,ty,'#87e5ff');
      if(id==='reishi-volley')art+=rays(tx,ty,12,43,70,'#63d7ff',2.4);
    }else if(id==='spirit-pierce'||id==='blue-lance'){
      const big=id==='blue-lance';art+='<g transform="translate('+fx+' '+fy+') rotate('+F(angle)+')" class="xb-art-spear"><path d="M0 0L'+F(dist-24)+' 0" stroke="#43b8ff" stroke-width="'+(big?13:7)+'"/><path d="M0 0L'+F(dist-25)+' 0" stroke="#fff" stroke-width="2.5"/><path d="M'+F(dist-76)+' -17L'+F(dist)+' 0 '+F(dist-76)+' 17 '+F(dist-52)+' 0Z" fill="url(#'+k+'blue)" stroke="#b9efff" stroke-width="2"/><path d="M18-8l25 8-25 8 M30-13l28 13-28 13" fill="none" stroke="#6fd8ff" stroke-width="4"/></g>'+ring(tx,ty,'#8ce8ff')+rays(tx,ty,big?16:10,big?44:30,big?82:60,'#7adfff',3);
    }else if(id==='astral-burst'){
      art+='<path class="xb-art-travel" d="M'+fx+' '+fy+' Q'+mx+' '+F(my-78)+' '+tx+' '+ty+'" fill="none" stroke="#a564ff" stroke-width="11" stroke-dasharray="10 12"/><g class="xb-art-orb" transform="translate('+tx+' '+ty+')"><circle r="57" fill="url(#'+k+'violet)"/><circle r="32" fill="none" stroke="#d0a8ff" stroke-width="5"/><circle r="21" fill="#7233d9" stroke="#fff" stroke-width="2"/><path d="M0-70l13 47 44-15-31 33 38 23-47 0 4 43-14-40-45 17 30-36-35-22 43 2Z" fill="#d3b4ff" stroke="#8b47ff" stroke-width="2"/><path d="M-16-5L0-20 17-4 4 19Z" fill="#fff"/></g>'+rays(tx,ty,10,58,84,'#c7a0ff',3);
    }else if(id==='flash-step'){
      art+='<path class="xb-art-travel" d="M'+fx+' '+F(fy-28)+'Q'+mx+' '+F(my-65)+' '+tx+' '+F(ty-19)+' M'+fx+' '+fy+'Q'+mx+' '+F(my-22)+' '+tx+' '+ty+' M'+fx+' '+F(fy+25)+'Q'+mx+' '+F(my+21)+' '+tx+' '+F(ty+22)+'" fill="none" stroke="#8cecff" stroke-width="3" stroke-dasharray="7 12"/><g class="xb-art-afterimage" transform="translate('+mx+' '+my+')"><path d="M-18-32q13-14 26 0l-2 14 15 16-9 33-18-16-15 13-10-26 13-21Z" fill="#b8f2ff" fill-opacity=".48" stroke="#5dcaff" stroke-width="3"/><circle cy="-43" r="10" fill="#e9fcff" fill-opacity=".72" stroke="#5dcaff" stroke-width="2"/></g>'+rays(tx,ty,8,25,55,'#8cecff',3);
    }else if((id==='basic'&&classId==='step')||id==='shunko-strike'){
      art+=bolt(fx,fy,tx,ty,5)+bolt(mx,F(my-25),tx,F(ty+15),3)+'<g class="xb-art-fist" transform="translate('+tx+' '+ty+') rotate('+F(angle)+')"><circle r="49" fill="url(#'+k+'gold)"/><path d="M-26-17Q-23-31-11-27L17-24Q28-23 26-12L24 16Q22 28 10 27L-20 25Q-34 22-31 9Z" fill="#ffd76b" stroke="#fff0a3" stroke-width="3"/><path d="M-20-14l15 2 M-21-3l18 1 M-19 8l16-1 M8-20l1 19" stroke="#fff9d3" stroke-width="4" stroke-linecap="round"/><path d="M19 22l17 14 M-31-21l-13-9" stroke="#ff8b25" stroke-width="6"/></g>'+rays(tx,ty,12,42,74,'#ffd76b',3);
    }else if(id==='thunderclap'||id==='raijin-burst'){
      art+=bolt(fx,fy,tx,ty,id==='raijin-burst'?7:5)+bolt(F(fx+25),F(fy-19),F(tx-18),F(ty-38),3)+bolt(F(fx+10),F(fy+22),F(tx+12),F(ty+37),3)+'<g class="xb-art-thunder" transform="translate('+tx+' '+ty+')"><circle r="'+(id==='raijin-burst'?65:49)+'" fill="url(#'+k+'gold)" opacity=".8"/><path d="M14-67L-17-15 7-18-9 32 32-25 9-20Z" fill="#fff6ac" stroke="#ffb326" stroke-width="4"/><ellipse rx="52" ry="24" fill="none" stroke="#8deaff" stroke-width="4" transform="rotate(-24)"/><ellipse rx="34" ry="55" fill="none" stroke="#ffe18a" stroke-width="3" transform="rotate(32)"/></g>'+rays(tx,ty,id==='raijin-burst'?16:10,47,id==='raijin-burst'?88:65,'#ffe18a',3);
    }else{
      art+='<path class="xb-art-travel" d="M'+fx+' '+fy+'Q'+mx+' '+F(my-48)+' '+tx+' '+ty+'" fill="none" stroke="#ff526d" stroke-width="3" stroke-dasharray="18 14"/>'+slash(tx,ty,-8)+ring(tx,ty,'#b9f6ff');
    }
    svg.innerHTML=defs+art;powerLayer.appendChild(svg);
    removeLater(svg,id==='bankai-wave'||id==='raijin-burst'?960:source==='basic'?490:780);
  }

  function animateSkill(skill, hero, from, to, variant) {
    const id=skill?.id||'crescent';strikeHero(hero,'skill',variant);addAura(from,variant);
    addSignatureDrawing(id,from,to,'skill',arena.dataset.character||'blade');
    addImpact(to,variant,id==='bankai-wave'||id==='raijin-burst'?150:id==='astral-burst'?132:id==='moon-fang'?125:94,240);
    addCallout(id==='bankai-wave'?'BANKAI · GETSUGA TENSHŌ':(skill?.name||'TÉCNICA ESPIRITUAL'),variant);
  }

  window.xbCombatPowerVisual = function(kind, amount, critical = false, meta = {}) {
    if (!arena.isConnected || !powerLayer.isConnected) return;
    const { hero, target, heroPoint, targetPoint } = actors();
    if (!heroPoint || !targetPoint) return;
    const isSkill = meta?.source === 'skill';
    const skill = meta?.skill || null;

    // The enemy's counterattacks use a separate red/purple trail, triggered from its HP feedback.
    if (meta?.source === 'enemy') {
      addEnemyCounterattack('xb-vfx-red');
      return;
    }

    if (isSkill && skill) {
      const variant = skillVariant(skill.id, 'skill');
      animateSkill(skill, hero, heroPoint, targetPoint, variant);
      if (critical) {
        addCallout('CRÍTICO ESPIRITUAL · ' + Math.max(0, Math.round(amount)), 'xb-vfx-gold');
        addImpact(targetPoint, 'xb-vfx-gold', 108, 125);
      } else if (kind === 'defeat') {
        addImpact(targetPoint, 'xb-vfx-red', 118, 180);
      }
      return;
    }

    // Distinct illustrated attacks for each playable character.
    const characterId=arena.dataset.character||'blade';
    strikeHero(hero,'basic',critical?'xb-vfx-gold':'');
    addSignatureDrawing('basic',heroPoint,targetPoint,'basic',characterId);
    const basicVariant=characterId==='step'?'xb-vfx-gold':characterId==='kido'?'xb-vfx-arrow':'xb-vfx-basic';
    addImpact(targetPoint,critical?'xb-vfx-gold':basicVariant,critical?108:characterId==='step'?106:78,critical?100:180);
    if(critical)addCallout('CRÍTICO ESPIRITUAL · '+Math.max(0,Math.round(amount)),'xb-vfx-gold');
    if(kind==='defeat'){addImpact(targetPoint,'xb-vfx-red',104,250);addCallout('HOLLOW PURIFICADO','xb-vfx-red');}
  };

  // Enemy damage now visibly travels back toward the player instead of only changing HP.
  const fx = document.getElementById('combatFx');
  if (fx) {
    const seen = new WeakSet();
    const observer = new MutationObserver(records => {
      for (const record of records) {
        for (const node of record.addedNodes) {
          if (!(node instanceof HTMLElement) || seen.has(node) || !node.classList.contains('combat-pop')) continue;
          seen.add(node);
          if (node.classList.contains('pop-player-hit')) addEnemyCounterattack('xb-vfx-red');
        }
      }
    });
    observer.observe(fx, { childList: true });
  }
})();