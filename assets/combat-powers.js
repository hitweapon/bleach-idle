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

  function animateSkill(skill, hero, from, to, variant) {
    const id = skill?.id || '';
    strikeHero(hero, 'skill', variant);
    addAura(from, variant);
    addFlash(variant === 'xb-vfx-blackwave' ? 'xb-vfx-blackwave' : variant);

    if (id === 'reishi-volley') {
      for (let i = 0; i < 4; i++) addProjectile(from, to, 'xb-vfx-arrow', { height: 12, delay: i * 72, duration: 510 });
      addImpact(to, variant, 92, 250);
    } else if (id === 'thunderclap' || id === 'raijin-burst') {
      addProjectile(from, to, 'xb-vfx-lightning', { height: 42, duration: 410 });
      addProjectile({ x: from.x + 7, y: from.y + 12 }, { x: to.x - 8, y: to.y - 18 }, 'xb-vfx-lightning', { height: 21, delay: 70, duration: 380 });
      addProjectile({ x: from.x + 1, y: from.y - 10 }, { x: to.x + 12, y: to.y + 13 }, 'xb-vfx-lightning', { height: 16, delay: 115, duration: 390 });
      addImpact(to, variant, id === 'raijin-burst' ? 132 : 104, 210);
    } else if (id === 'bankai-wave') {
      addProjectile(from, to, 'xb-vfx-blackwave', { height: 64, duration: 620 });
      addProjectile({ x: from.x, y: from.y - 19 }, { x: to.x, y: to.y - 17 }, 'xb-vfx-heavy', { height: 17, delay: 80, duration: 580 });
      addImpact(to, variant, 154, 360);
      addCallout('BANKAI · LIBERAÇÃO DE REIATSU', variant);
    } else if (id === 'astral-burst') {
      addProjectile(from, to, variant, { height: 42, duration: 470 });
      addImpact(to, variant, 125, 260);
      addSlash(to, variant);
    } else if (id === 'flash-step' || id === 'shunko-strike') {
      addProjectile(from, to, variant, { height: 30, duration: 330 });
      addProjectile({ x: from.x - 20, y: from.y + 13 }, { x: to.x - 12, y: to.y + 8 }, variant, { height: 12, delay: 45, duration: 340 });
      addImpact(to, variant, 94, 200);
      addSlash(to, variant);
    } else {
      const height = id === 'crescent' || id === 'moon-fang' ? 48 : id === 'spirit-pierce' || id === 'blue-lance' ? 9 : id === 'quincy-arrow' ? 12 : 34;
      addProjectile(from, to, variant || 'xb-vfx-heavy', { height, duration: id === 'spirit-pierce' ? 340 : 500 });
      addImpact(to, variant, id === 'moon-fang' ? 120 : 88, id === 'spirit-pierce' ? 230 : 280);
      if (id === 'crescent' || id === 'moon-fang') addSlash(to, variant);
    }

    if (id !== 'bankai-wave') addCallout(skill?.name || 'TÉCNICA ESPIRITUAL', variant);
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

    // Basic sword strike: a fast, visible blade of reiatsu followed by a target impact.
    strikeHero(hero, 'basic', critical ? 'xb-vfx-gold' : '');
    const variant = critical ? 'xb-vfx-gold' : 'xb-vfx-basic';
    addProjectile(heroPoint, targetPoint, variant, { height: critical ? 32 : 20, duration: critical ? 500 : 365 });
    addSlash(targetPoint, critical ? 'xb-vfx-critical' : '');
    addImpact(targetPoint, critical ? 'xb-vfx-gold' : '', critical ? 104 : 66, 190);
    if (critical) addCallout('GOLPE CRÍTICO · ' + Math.max(0, Math.round(amount)), 'xb-vfx-gold');
    if (kind === 'defeat') {
      addImpact(targetPoint, 'xb-vfx-red', 104, 250);
      addCallout('HOLLOW PURIFICADO', 'xb-vfx-red');
    }
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