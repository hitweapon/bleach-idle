(() => {
  'use strict';
  const arena = document.getElementById('battleArena');
  if (!arena || arena.dataset.topdownReady === '1') return;
  arena.dataset.topdownReady = '1';
  arena.classList.add('xb-topdown-combat');

  // Original tile field: ruins, cracks and spiritual crystals are CSS-drawn.
  const rows = 12, cols = 18;
  const map = document.createElement('div');
  map.className = 'xb-tilemap';
  map.setAttribute('aria-hidden', 'true');
  const decorations = new Map([
    ['1,1','pillar'], ['1,5','rubble'], ['1,15','pillar'],
    ['2,3','crack'], ['2,12','rubble'], ['3,16','crack'],
    ['4,1','rubble'], ['7,2','pillar'], ['8,5','spirit-crystal'],
    ['8,14','rubble'], ['9,16','pillar'], ['10,3','crack'],
    ['10,12','spirit-crystal'], ['5,16','moss'], ['9,8','moss'],
    ['3,8','crack'], ['6,3','rubble']
  ]);
  const protectedTiles = new Set([
    '3,4','4,4','5,4','6,4','7,4','8,4','3,9','4,9','5,9','6,9','7,9',
    '4,10','5,10','6,10','4,11','5,11','6,11','7,11'
  ]);
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const tile = document.createElement('div');
      const key = row + ',' + col;
      tile.className = 'xb-tile ' + ((row + col) % 2 ? 'tone-a' : 'tone-b');
      if (row === 0 || col === 0 || row === rows - 1 || col === cols - 1) tile.classList.add('xb-edge');
      if (!protectedTiles.has(key) && decorations.has(key)) tile.classList.add('xb-' + decorations.get(key));
      map.appendChild(tile);
    }
  }
  arena.insertBefore(map, arena.firstChild);

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