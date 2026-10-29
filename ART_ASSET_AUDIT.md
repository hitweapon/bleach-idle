# XBleach — visual art overhaul audit

Branch: `feat/complete-visual-art-overhaul`

## Art direction
- Premium 2D anime / dark fantasy painting, clean silhouettes and detailed linework.
- No pixel art, voxel/ Minecraft look, emoji placeholders, sheet labels, or UI borders baked into individual assets.
- Transparent-background character, mob, boss, weapon and equipment renders where they are used as in-game sprites.
- Environment art should be full painted backgrounds, not CSS tile grids. Effects remain separate from character sprites.

## Inventory found in game code
- Playable classes: 3 (Shinigami / Ichigo, Quincy / Uryu, Shunpo / Yoruichi).
- Standard enemy definitions: 15. Current combat art array reuses 5 image files.
- Boss definitions: 6. They reuse 4–5 existing monster artworks.
- Loot item definitions: 14; most are represented by emoji in the interface and inventory.
- Skills: 12 definitions across the three classes.
- Main zone backgrounds: 5 (desert, ruins, forest, rift, Soul Society); separate scene SVGs exist for 5 zones.
- Core equipment slots: weapon, armor, accessory, relic.
- UI also uses emoji for currency, quest, ranking, guild, event, shop, and menu entries.

## Current art files
- Main character art: `assets/ichigo-slash.webp`, `assets/ichigo-portrait.webp`.
- Other class art: `assets/uryu-quincy.svg`, `assets/yoruichi-shunpo.svg` plus fallback inline SVGs.
- Mobs: `assets/hollow-beast.webp`, `assets/hollow-gold.webp`, `assets/hollow-lord.webp`, `assets/hollow-skull.webp`, `assets/hollow-winged.webp`.
- Environments: `assets/scene-desert-platform.svg`, `scene-forest-platform.svg`, `scene-rift-platform.svg`, `scene-ruins-platform.svg`, `scene-society-platform.svg`, and `spirit-night.svg`.
- Weapon card artwork: `assets/zanpakuto-card.webp`.

## Replacement plan / asset IDs
### Characters (3)
- `character-ichigo.webp`: keep/upgrade current hero art consistently.
- `character-uryu.webp`: full-body Quincy with blue Reishi bow, isolated alpha background.
- `character-yoruichi.webp`: full-body Shunpo fighter with violet lightning, isolated alpha background.

### Common mobs (15 definitions; 5 unique art roles minimum)
- `mob-hollow-small.webp`
- `mob-fishbone.webp`
- `mob-hollow-beast.webp`
- `mob-adjuchas.webp`
- `mob-hollow-elite.webp`

### Bosses (6 definitions; target 6 distinct boss artworks)
- `boss-grand-fisher.webp`
- `boss-executioner.webp`
- `boss-moon-predator.webp`
- `boss-vasto-lorde.webp`
- `boss-rupture-herald.webp`
- `boss-masked-colossus.webp`

### Loot / equipment (14 loot definitions + four slots)
- `item-spirit-fragment.webp`
- `item-student-sash.webp`
- `item-echo-stone.webp`
- `item-worn-blade.webp`
- `item-karakura-amulet.webp`
- `item-ash-mantle.webp`
- `item-fractured-zangetsu.webp`
- `item-eclipse-blade.webp`
- `item-crimson-zanpakuto.webp`
- `item-void-mantle.webp`
- `item-reiatsu-core.webp`
- `item-reishi-bow.webp`
- `item-shunko-gauntlets.webp`
- `item-awakened-zangetsu.webp`

### Skills (12)
- Shinigami: `vfx-crescent-cut.webp`, `vfx-astral-burst.webp`, `vfx-flash-step.webp`, `vfx-spirit-pierce.webp`, `vfx-moon-fang.webp`, `vfx-bankai-wave.webp`.
- Quincy: `vfx-quincy-arrow.webp`, `vfx-reishi-volley.webp`, `vfx-blue-lance.webp`.
- Shunpo: `vfx-shunko-strike.webp`, `vfx-thunderclap.webp`, `vfx-raijin-burst.webp`.

### Environment (5 backgrounds)
- `zone-karakura.webp`, `zone-society.webp`, `zone-desert.webp`, `zone-forest.webp`, `zone-rift.webp`.

## Integration and acceptance checklist
- [ ] Use actual transparent cutouts for actors and monsters; no baked labels, poster frames, or text.
- [ ] Keep a consistent rendering style and visual scale across the whole game.
- [ ] Update character class art paths and profile portrait paths.
- [ ] Update mob and boss data to point at their own artwork.
- [ ] Replace emoji-only inventory/equipment items with real item illustrations.
- [ ] Replace zone tile styling with illustrated painted environments so the map does not resemble Minecraft/voxel art.
- [ ] Provide fallbacks and verify CSS, mobile, desktop, load behavior, combat VFX, inventory and equipment screens.
- [ ] Do not merge into production until visual verification is complete.
