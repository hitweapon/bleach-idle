(() => {
  'use strict';
  const arena = document.getElementById('battleArena');
  if (!arena || arena.dataset.topdownReady === '1') return;
  arena.dataset.topdownReady = '1';
  arena.classList.add('xb-topdown-combat');

  const classArt = {
    blade: { src:'/assets/art/character-ichigo.webp', name:'Ichigo Kurosaki' },
    kido: { src:'/assets/art/character-uryu.webp', name:'Uryu Ishida' },
    step: { src:'/assets/art/character-yoruichi.webp', name:'Yoruichi Shihōin' }
  };
  const applyClassArt = () => {
    const classId = arena.dataset.character || 'blade';
    const selected = classArt[classId] || classArt.blade;
    const img = document.getElementById('heroArtReal');
    const fallback = document.getElementById('heroArtFallback');
    if (!img) return;
    img.alt = selected.name + ' em combate';
    if (img.getAttribute('src') !== selected.src) {
      img.classList.remove('is-loaded');
      img.style.setProperty('visibility','hidden','important');
      img.setAttribute('src', selected.src);
    }
    const reveal = () => {
      if (!img.complete || !img.naturalWidth) return;
      img.classList.add('is-loaded');
      img.style.setProperty('display','block','important');
      img.style.setProperty('visibility','visible','important');
      img.style.setProperty('opacity','1','important');
      if (fallback) {
        fallback.classList.add('asset-hidden');
        fallback.style.setProperty('display','none','important');
        fallback.style.setProperty('visibility','hidden','important');
        fallback.style.setProperty('opacity','0','important');
      }
    };
    if (img.complete && img.naturalWidth > 0) reveal();
    else img.addEventListener('load', reveal, { once:true });
  };
  applyClassArt();

  // Use an illustrated environment instead of a repetitive tile grid.
  const applyScene = () => {
    const scenes = window.XBLEACH_ART && window.XBLEACH_ART.zones;
    const art = scenes && (scenes[arena.dataset.map || 'desert'] || scenes.desert);
    if (art) {
      arena.style.setProperty(
        'background',
        'linear-gradient(180deg,#06081250 0%,transparent 25%,transparent 68%,#05060c88 100%), url("' + art + '") center / cover no-repeat',
        'important'
      );
    }
    const oldTiles = arena.querySelector('.xb-tilemap');
    if (oldTiles) oldTiles.remove();
    if (!arena.querySelector('.xb-edge-vignette')) {
      const vignette = document.createElement('div');
      vignette.className = 'xb-edge-vignette';
      vignette.setAttribute('aria-hidden','true');
      arena.appendChild(vignette);
    }
  };
  applyScene();
  const sceneObserver = new MutationObserver(records => {
    const attributes = records.map(record => record.attributeName);
    if (attributes.includes('data-map')) applyScene();
    if (attributes.includes('data-character')) applyClassArt();
  });
  sceneObserver.observe(arena, { attributes:true, attributeFilter:['data-map','data-character'] });
  // Re-apply after all deferred scripts have initialized their art catalog.
  document.addEventListener('DOMContentLoaded', () => {
    applyScene();
    applyClassArt();
  }, { once:true });

  const pack = document.getElementById('enemyPack');
  if (pack) {
    const sideMobs = [
      { selector: '.enemy-small:not(.enemy-right)', name: 'HOLLOW' },
      { selector: '.enemy-right', name: 'HOLLOW ELITE' }
    ];
    sideMobs.forEach(({ selector, name }) => {
      const card = pack.querySelector(selector);
      if (!card || card.querySelector('.xb-mob-label')) return;
      const label = document.createElement('span');
      label.className = 'xb-mob-label';
      label.textContent = name;
      card.appendChild(label);
    });
  }

  let plate = document.getElementById('xbPlayerPlate');
  if (!plate) {
    plate = document.createElement('div');
    plate.id = 'xbPlayerPlate';
    plate.className = 'xb-player-plate';
    plate.innerHTML = '<strong id="xbPlayerPlateName">SHINIGAMI</strong><small id="xbPlayerPlateLevel">NV. 1</small><i aria-label="Vida do personagem"><span id="xbPlayerPlateHp"></span></i>';
    arena.appendChild(plate);
  }

  let caption = document.getElementById('xbWorldCaption');
  if (!caption) {
    caption = document.createElement('div');
    caption.id = 'xbWorldCaption';
    caption.className = 'xb-world-caption';
    caption.innerHTML = '<b>HUNT AFK</b> · ALVO AUTOMÁTICO';
    arena.appendChild(caption);
  }

  const updatePlate = () => {
    const name = document.getElementById('sceneCharacterName');
    const level = document.getElementById('sceneLevel');
    const hp = document.getElementById('hpText');
    const hpBar = document.getElementById('hpBar');
    const nameNode = document.getElementById('xbPlayerPlateName');
    const levelNode = document.getElementById('xbPlayerPlateLevel');
    const hpNode = document.getElementById('xbPlayerPlateHp');
    if (nameNode && name) nameNode.textContent = name.textContent.trim().toUpperCase();
    if (levelNode && level) levelNode.textContent = 'NV. ' + level.textContent.trim();
    if (hpNode && hpBar) {
      const width = hpBar.style.width || '100%';
      hpNode.style.width = width;
      hpNode.style.background = parseFloat(width) <= 25
        ? 'linear-gradient(90deg,#a81028,#ff4f59)'
        : 'linear-gradient(90deg,#23884e,#71d873)';
    }
    if (caption) {
      const status = document.getElementById('liveStatusText');
      caption.innerHTML = '<b>HUNT AFK</b> · ' + (status ? status.textContent.trim() : 'ALVO AUTOMÁTICO');
    }
  };

  const observer = new MutationObserver(updatePlate);
  ['sceneCharacterName', 'sceneLevel', 'hpText', 'hpBar', 'liveStatusText'].forEach(id => {
    const node = document.getElementById(id);
    if (node) observer.observe(node, { childList: true, characterData: true, subtree: true, attributes: id === 'hpBar' });
  });
  updatePlate();

  // Place combat text near the active target instead of the old cinematic center.
  const fx = document.getElementById('combatFx');
  if (fx) {
    const floatingObserver = new MutationObserver(records => {
      records.forEach(record => record.addedNodes.forEach(node => {
        if (!(node instanceof HTMLElement) || !node.classList.contains('combat-pop')) return;
        const isPlayerHit = node.classList.contains('pop-player-hit');
        const isSkill = node.classList.contains('pop-skill');
        node.style.left = isPlayerHit ? (12 + Math.random() * 15) + '%' : isSkill ? (58 + Math.random() * 12) + '%' : (61 + Math.random() * 14) + '%';
        node.style.top = isPlayerHit ? (52 + Math.random() * 12) + '%' : (30 + Math.random() * 22) + '%';
      }));
    });
    floatingObserver.observe(fx, { childList: true });
  }
})();