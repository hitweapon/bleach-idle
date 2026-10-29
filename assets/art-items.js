/* XBLEACH original SVG asset library: portraits, combat sprites, mobs, bosses, inventory, skills and painted zones. */
(function(){
'use strict';
const uri=function(s){return 'data:image/svg+xml;charset=UTF-8,'+encodeURIComponent(s)};
const P={
 blade:{a:'#b51e38',b:'#130812',c:'#ff5268'},
 kido:{a:'#1578d4',b:'#061326',c:'#7deaff'},
 step:{a:'#7c40cb',b:'#120b21',c:'#efb3ff'},
 red:{a:'#b51d36',b:'#170810',c:'#ff536b'},
 blue:{a:'#1a71d0',b:'#071326',c:'#75e6ff'},
 purple:{a:'#8546d1',b:'#110a20',c:'#e1a2ff'},
 gold:{a:'#b47725',b:'#1c1108',c:'#ffe19a'},
 green:{a:'#24876b',b:'#071a15',c:'#9bffd9'},
 steel:{a:'#65758b',b:'#0a101a',c:'#e4edf8'}
};
function svg(w,h,a,b,c,body){
 const d='<defs>'+
 '<linearGradient id="metal" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fff"/><stop offset=".22" stop-color="#8796ad"/><stop offset=".46" stop-color="#eff7ff"/><stop offset=".73" stop-color="#586579"/><stop offset="1" stop-color="#dce7f5"/></linearGradient>'+
 '<linearGradient id="cloth" x1="0" y1="0" x2="1" y2="1"><stop stop-color="'+a+'"/><stop offset=".45" stop-color="#10131f"/><stop offset="1" stop-color="'+b+'"/></linearGradient>'+
 '<linearGradient id="hair" x1="0" y1="0" x2="1" y2="1"><stop stop-color="'+c+'"/><stop offset=".5" stop-color="'+a+'"/><stop offset="1" stop-color="#15121e"/></linearGradient>'+
 '<linearGradient id="energy" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fff"/><stop offset=".28" stop-color="'+c+'"/><stop offset=".68" stop-color="'+a+'"/><stop offset="1" stop-color="'+b+'"/></linearGradient>'+
 '<radialGradient id="glow"><stop stop-color="'+c+'" stop-opacity=".78"/><stop offset="1" stop-color="'+a+'" stop-opacity="0"/></radialGradient>'+
 '<linearGradient id="panel" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#182234"/><stop offset=".6" stop-color="#090f1a"/><stop offset="1" stop-color="#05070d"/></linearGradient>'+
 '<filter id="soft"><feGaussianBlur stdDeviation="3"/></filter><filter id="shine"><feGaussianBlur stdDeviation="1.2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>';
 return uri('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+w+' '+h+'">'+d+body+'</svg>');
}
function portrait(kind){
 const p=P[kind]||P.blade;
 let hair='';
 if(kind==='blade') hair='<path d="M91 132L60 78 104 91 84 47 132 76 148 27 167 70 213 43 190 89 235 80 201 125 220 143 184 156 174 183 131 179 106 153Z" fill="url(#hair)" stroke="'+p.c+'" stroke-width="2.5"/>';
 else if(kind==='kido') hair='<path d="M91 131L75 73 111 90 111 41 143 72 163 37 179 74 220 48 197 91 226 100 196 131 189 159 152 175 121 151Z" fill="url(#hair)" stroke="'+p.c+'" stroke-width="2.5"/>';
 else hair='<path d="M91 132L62 80 105 91 94 48 136 77 154 34 174 73 210 49 193 91 225 82 200 128 190 157 160 176 126 158 106 151Z" fill="url(#hair)" stroke="'+p.c+'" stroke-width="2.5"/>';
 const face='<path d="M111 131L141 103 183 110 197 140 180 169 149 176 119 151Z" fill="'+(kind==='step'?'#dcae98':'#edc1ad')+'" stroke="#583846" stroke-width="2"/><path d="M125 133L144 125M172 128L190 131" stroke="#35212c" stroke-width="4"/><path d="M132 149L151 153 169 145" fill="none" stroke="#9b4c5d" stroke-width="2"/>';
 const clothes=kind==='kido'
 ? '<path d="M113 173L79 192 43 270 72 292 116 244 119 397 210 397 205 244 247 289 275 261 218 192 180 173Z" fill="#e4eaf5" stroke="#8b9fbc" stroke-width="3"/><path d="M126 182L154 225 181 181 198 245 177 264 158 239 142 265 120 245Z" fill="#19263d"/><path d="M129 245L196 245" stroke="#7bdfff" stroke-width="3"/>'
 : kind==='step'
 ? '<path d="M113 173L79 192 43 270 72 292 116 244 119 397 210 397 205 244 247 289 275 261 218 192 180 173Z" fill="#17131f" stroke="#725282" stroke-width="3"/><path d="M126 182L154 225 181 181 198 245 177 264 158 239 142 265 120 245Z" fill="#bdaccb"/><path d="M123 203L91 257M212 204L242 257" stroke="'+p.c+'" stroke-width="4"/>'
 : '<path d="M113 173L79 192 43 270 72 292 116 244 119 397 210 397 205 244 247 289 275 261 218 192 180 173Z" fill="#0f121d" stroke="#687187" stroke-width="3"/><path d="M126 182L154 225 181 181 198 245 177 264 158 239 142 265 120 245Z" fill="#ece9ef"/><path d="M143 231L123 397M181 231L201 397" stroke="#3c1728" stroke-width="7"/>';
 const weapon=kind==='blade'
 ? '<path d="M205 203L286 65 296 70 221 214Z" fill="url(#metal)" stroke="#fff" stroke-width="2"/><path d="M197 212L221 225 229 209 205 198Z" fill="#861b37" stroke="#ff7c8e" stroke-width="2"/>'
 : kind==='kido'
 ? '<path d="M204 202Q250 112 291 64" fill="none" stroke="'+p.c+'" stroke-width="7" filter="url(#shine)"/><path d="M204 202Q250 112 291 64" fill="none" stroke="#fff" stroke-width="2"/><path d="M234 151L269 103" stroke="#fff" stroke-width="2"/>'
 : '<path d="M204 204L292 79M218 207L305 82" fill="none" stroke="'+p.c+'" stroke-width="6" filter="url(#shine)"/><path d="M233 164L273 108" stroke="#fff" stroke-width="2"/>';
 return svg(320,420,p.a,p.b,p.c,'<ellipse cx="158" cy="214" rx="150" ry="180" fill="url(#glow)" opacity=".45"/><path d="M12 250Q78 200 34 143T67 40M309 265Q264 202 300 154T276 27" fill="none" stroke="'+p.c+'" stroke-width="3" opacity=".7"/>'+clothes+hair+face+weapon+'<path d="M25 343L63 323 96 346 119 331 148 354 175 332 203 351 234 330 291 351" fill="none" stroke="'+p.c+'" stroke-opacity=".55" stroke-width="2"/><circle cx="49" cy="104" r="3" fill="#fff"/><circle cx="277" cy="155" r="3" fill="'+p.c+'"/><circle cx="65" cy="295" r="2" fill="#fff"/>');
}
function battleSprite(kind){
 const p=P[kind]||P.blade;
 const hair=kind==='blade'
 ? '<path d="M39 46L27 25 47 33 43 10 61 29 77 8 81 31 101 19 93 42 106 48 90 61 82 72 50 71Z" fill="#f08c26" stroke="#7b2532" stroke-width="2"/>'
 : kind==='kido'
 ? '<path d="M39 46L30 24 48 33 47 10 64 28 78 12 83 34 100 23 94 45 105 51 90 62 82 71 52 71Z" fill="#202b41" stroke="#75dcff" stroke-width="2"/>'
 : '<path d="M39 46L28 25 48 33 45 11 63 29 78 9 83 32 100 22 93 45 104 51 90 62 82 71 52 71Z" fill="#382341" stroke="#c386f6" stroke-width="2"/>';
 const torso=kind==='kido'
 ? '<path d="M47 76L34 86 30 120 43 129 54 108 52 151 91 151 87 108 101 129 113 120 104 86 84 76Z" fill="#e8edf6" stroke="#8ca2c4" stroke-width="3"/><path d="M60 79L70 96 81 79 86 108 76 118 70 107 61 118 53 108Z" fill="#18243a"/>'
 : '<path d="M47 76L34 86 30 120 43 129 54 108 52 151 91 151 87 108 101 129 113 120 104 86 84 76Z" fill="#111421" stroke="#69758d" stroke-width="3"/><path d="M60 79L70 96 81 79 86 108 76 118 70 107 61 118 53 108Z" fill="#e6e6ed"/>';
 const weapon=kind==='blade'
 ? '<path d="M84 91L116 47 120 50 91 96Z" fill="url(#metal)" stroke="#fff" stroke-width="1.5"/><path d="M81 95L93 99 96 93 84 89Z" fill="#901b36"/>'
 : kind==='kido'
 ? '<path d="M88 94Q102 77 118 51" fill="none" stroke="'+p.c+'" stroke-width="4" filter="url(#shine)"/><path d="M89 94Q102 77 118 51" fill="none" stroke="#fff" stroke-width="1.4"/>'
 : '<path d="M86 94L113 57M91 96L118 59" fill="none" stroke="'+p.c+'" stroke-width="3.8" filter="url(#shine)"/>';
 return svg(144,164,p.a,p.b,p.c,'<ellipse cx="72" cy="151" rx="43" ry="9" fill="#000" opacity=".7" filter="url(#soft)"/><ellipse cx="72" cy="120" rx="46" ry="36" fill="url(#glow)" opacity=".55"/><path d="M45 130L32 146 52 152 61 135M82 134L95 149 112 144 97 126" fill="#151522" stroke="#737c92" stroke-width="3"/>'+torso+hair+'<path d="M44 46L54 39 82 42 94 53 90 69 72 80 49 67Z" fill="#f0c8b7" stroke="#57404b" stroke-width="2"/><path d="M56 55L66 57M78 56L86 54" stroke="#201923" stroke-width="3"/><path d="M65 68L76 69" stroke="#984b5c" stroke-width="2"/>'+weapon+'<path d="M18 87Q31 73 24 60M124 109Q109 99 124 80" fill="none" stroke="'+p.c+'" stroke-width="2" opacity=".85"/><circle cx="21" cy="101" r="2" fill="'+p.c+'"/>');
}
const mobPalette=[
['#828093','#191b28','#f3efff'],['#68677b','#10121e','#ff5268'],['#72243c','#120813','#ff4d63'],['#81233d','#160812','#ffa0b0'],['#433263','#0a0c19','#be9cff'],['#94653f','#24160f','#ffcd81'],['#4f505d','#0a0c13','#e6edf8'],['#235a80','#081425','#8af0ff'],['#42517b','#090f23','#a6baff'],['#343340','#080a12','#cabdff'],['#2d3355','#080a14','#7f91ff'],['#30765c','#061712','#9affcf'],['#87213f','#170710','#ff536f'],['#6c2e8b','#100719','#e0a4ff'],['#286b77','#041519','#7ff5ff']
];
function hollow(i){
 const q=mobPalette[(i+mobPalette.length)%mobPalette.length],a=q[0],b=q[1],c=q[2];
 const horns=i%3===0
 ? '<path d="M42 45Q13 35 19 10L47 34M99 45Q129 31 124 10L95 34" fill="#e0dce8" stroke="'+a+'" stroke-width="3"/>'
 : i%3===1
 ? '<path d="M46 40Q33 12 19 23L36 49M96 40Q110 12 125 23L105 49" fill="#d9d6e4" stroke="'+a+'" stroke-width="3"/>'
 : '<path d="M43 39L28 14 51 30 70 9 87 30 111 13 97 44" fill="#e4e2ee" stroke="'+a+'" stroke-width="3"/>';
 const details=i%4===0
 ? '<path d="M60 88L46 108 55 134 70 113 84 135 92 109 79 88Z" fill="#e2ddea" stroke="'+a+'" stroke-width="2"/>'
 : i%4===1
 ? '<path d="M53 84L39 101 49 121 63 104 70 131 78 103 93 120 98 100 82 84Z" fill="#c6c5d5" stroke="'+a+'" stroke-width="2"/>'
 : i%4===2
 ? '<path d="M44 83L33 103 43 129 59 109 70 134 81 108 97 128 105 102 85 83Z" fill="#e0dce8" stroke="'+a+'" stroke-width="2"/>'
 : '<path d="M47 84L41 108 53 129 67 109 78 133 88 107 100 125 96 97 82 84Z" fill="#c3c6d8" stroke="'+a+'" stroke-width="2"/>';
 return svg(144,166,a,b,c,'<ellipse cx="72" cy="156" rx="47" ry="7" fill="#000" opacity=".7" filter="url(#soft)"/><ellipse cx="72" cy="87" rx="67" ry="74" fill="url(#glow)" opacity=".55"/><path d="M45 98L30 135 43 155 60 144 67 119M85 98L102 135 91 155 75 144 70 119" fill="#11121d" stroke="'+a+'" stroke-width="3"/><path d="M37 60L46 44 66 38 81 38 99 48 108 66 95 102 74 116 51 103Z" fill="url(#cloth)" stroke="#d4d8e7" stroke-width="2"/>'+horns+'<path d="M42 54L50 39 70 45 90 38 102 56 94 82 73 93 52 81Z" fill="url(#metal)" stroke="#f1eff8" stroke-width="2"/><path d="M49 61L63 57 68 66 56 71ZM78 66L84 57 96 61 88 72Z" fill="'+c+'" filter="url(#shine)"/><path d="M63 78L74 74 84 78 77 85 69 85Z" fill="#15111b"/>'+details+'<path d="M41 100L23 113 28 122 47 117M95 100L117 113 112 122 93 117" fill="none" stroke="'+c+'" stroke-width="3"/>');
}
const bossPalette=[['#9f2138','#12070e','#ff6175'],['#615c7c','#10111b','#c2cfff'],['#91374e','#160a12','#ffb0c1'],['#303f70','#070d1f','#b2c2ff'],['#7c233a','#100711','#ff5065'],['#48226e','#090511','#e6a8ff']];
function boss(i){
 const q=bossPalette[i%6],a=q[0],b=q[1],c=q[2];
 const head=i===0
 ? '<path d="M92 153L69 103 106 115 98 70 137 98 157 55 176 96 213 75 199 116 228 128 199 164 194 205 161 225 129 207 108 184Z" fill="#d6d3e2" stroke="'+c+'" stroke-width="4"/><path d="M117 159L141 137 181 148 194 177 175 205 151 213 130 195Z" fill="#d8c8d5"/><path d="M125 167L143 163 149 180 133 180ZM169 179L182 165 191 179 176 188Z" fill="#ff2f4e"/>'
 : '<path d="M92 153L73 108 108 116 104 75 140 99 159 57 176 97 212 76 199 116 228 130 200 165 195 207 163 226 130 209 108 185Z" fill="url(#hair)" stroke="'+c+'" stroke-width="4"/><path d="M117 159L142 136 181 148 194 177 176 205 151 213 130 195Z" fill="#e0c4b6" stroke="#583c4c" stroke-width="2"/><path d="M127 167L144 162 149 178 133 181ZM169 179L182 165 191 179 176 188Z" fill="'+c+'"/>';
 const body=i===1
 ? '<path d="M100 217L125 197 160 213 193 195 220 222 255 393 62 393Z" fill="url(#cloth)" stroke="'+c+'" stroke-width="3"/><path d="M129 221L160 263 191 221 207 393 112 393Z" fill="#060910"/>'
 : i===5
 ? '<path d="M90 216L123 190 158 215 198 190 229 222 279 395 42 395Z" fill="#080711" stroke="'+c+'" stroke-width="4"/><path d="M104 251L72 329 110 310 129 395M216 251L253 329 218 310 196 395" fill="none" stroke="'+c+'" stroke-width="8"/>'
 : '<path d="M91 217L124 194 159 214 195 194 229 220 274 394 46 394Z" fill="url(#cloth)" stroke="'+c+'" stroke-width="4"/><path d="M124 224L160 266 195 224 211 394 107 394Z" fill="#090a12" stroke="#d9d7e7" stroke-opacity=".2"/>';
 return svg(320,420,a,b,c,'<ellipse cx="160" cy="210" rx="160" ry="210" fill="url(#glow)" opacity=".7"/><path d="M10 130L70 178 37 230 82 250M309 135L245 182 282 230 234 250" fill="none" stroke="'+c+'" stroke-width="5" opacity=".8"/>'+body+'<path d="M101 245L61 295 79 315 126 269M211 246L263 295 241 315 197 269" fill="#17131e" stroke="'+c+'" stroke-width="4"/>'+head+'<path d="M101 18L133 89 157 116 181 86 217 30" fill="none" stroke="'+c+'" stroke-width="4" opacity=".7"/><circle cx="58" cy="78" r="3" fill="#fff"/><circle cx="277" cy="93" r="3" fill="'+c+'"/>');
}
function item(key){
 let kind='gem',p=P.purple;
 if(/wornBlade|fracturedZangetsu|eclipseBlade|crimsonZanpakuto|awakenedZangetsu/.test(key)){kind='sword';p=/crimson|awakened|fractured/.test(key)?P.red:P.purple;}
 else if(/reishiBow/.test(key)){kind='bow';p=P.blue;}
 else if(/shunkoGauntlets/.test(key)){kind='gauntlet';p=P.gold;}
 else if(/sash|Mantle/i.test(key)){kind='cloth';p=/void/i.test(key)?P.purple:P.steel;}
 else if(/Amulet|accessory|ring/i.test(key)){kind='amulet';p=P.gold;}
 else if(/reiatsuCore|echoStone|spiritFragment|crystal/i.test(key)){kind='gem';p=P.blue;}
 else if(/coin|gold/i.test(key)){kind='coin';p=P.gold;}
 else if(/chest/i.test(key)){kind='chest';p=P.gold;}
 else if(/potion|elixir/i.test(key)){kind='potion';p=P.red;}
 let art='';
 if(kind==='sword') art='<g transform="rotate(35 48 48)"><path d="M44 7L52 7 53 56 43 56Z" fill="url(#metal)" stroke="#fff" stroke-width="1.5"/><path d="M48 7L48 56" stroke="'+p.c+'" stroke-width="1.3"/><path d="M38 56L58 56 61 62 35 62Z" fill="'+p.a+'" stroke="'+p.c+'" stroke-width="2"/><path d="M43 64L53 64 53 81 43 81Z" fill="#171521" stroke="#dbe7f6"/><path d="M43 69L53 73M43 76L53 80" stroke="'+p.c+'" stroke-width="2"/></g>';
 else if(kind==='bow') art='<path d="M61 10Q92 48 61 86M60 12L60 84" fill="none" stroke="url(#energy)" stroke-width="7"/><path d="M15 48L83 48 72 40M83 48L72 56" fill="none" stroke="#fff" stroke-width="2"/><circle cx="61" cy="48" r="4" fill="'+p.c+'"/>';
 else if(kind==='gauntlet') art='<path d="M30 68L23 41Q22 34 29 33Q35 33 36 44L35 25Q35 18 41 19Q47 20 47 28L48 39 50 18Q51 13 57 16Q61 18 60 25L60 39 64 25Q66 20 71 23Q76 25 73 34L75 48 71 70 56 82 38 78Z" fill="url(#metal)" stroke="'+p.c+'" stroke-width="2"/><path d="M33 54L68 51M40 63L64 60" stroke="'+p.a+'" stroke-width="3"/>';
 else if(kind==='cloth') art='<path d="M33 21L43 14 53 20 64 14 73 24 68 42 79 76 61 69 49 87 36 69 17 76 29 43Z" fill="url(#cloth)" stroke="'+p.c+'" stroke-width="2"/><path d="M42 24L49 41 57 24M28 48L63 58" fill="none" stroke="#dbe8f5" stroke-opacity=".65" stroke-width="2"/>';
 else if(kind==='amulet') art='<circle cx="48" cy="52" r="25" fill="none" stroke="#cba45f" stroke-width="6"/><circle cx="48" cy="52" r="18" fill="none" stroke="#fff0b3" stroke-width="2"/><path d="M48 21L58 38 48 46 38 38Z" fill="'+p.c+'" stroke="#fff" stroke-width="2"/><path d="M48 46L62 60 48 76 34 60Z" fill="url(#energy)" stroke="'+p.c+'" stroke-width="1.5"/>';
 else if(kind==='coin') art='<circle cx="48" cy="48" r="31" fill="#6d3a11" stroke="#ffd46f" stroke-width="4"/><circle cx="48" cy="48" r="24" fill="url(#energy)" stroke="#fff0bb" stroke-width="2"/><path d="M48 29L56 43 69 48 56 54 48 68 41 54 28 48 41 43Z" fill="#a86312" stroke="#fff2c3" stroke-width="2"/>';
 else if(kind==='chest') art='<path d="M14 38L22 24 71 24 82 38Z" fill="url(#energy)" stroke="'+p.c+'" stroke-width="2"/><path d="M17 39L79 39 77 73 21 73Z" fill="url(#cloth)" stroke="'+p.c+'" stroke-width="3"/><path d="M43 38L43 73M54 38L54 73" stroke="#ffe6a1" stroke-width="3"/><rect x="42" y="49" width="14" height="14" rx="3" fill="#ffd875" stroke="#fff1bc" stroke-width="2"/>';
 else if(kind==='potion') art='<path d="M41 14L55 14 55 27 62 35 69 68Q70 77 60 79L37 79Q27 77 29 68L36 35 43 27Z" fill="url(#energy)" stroke="#dcecff" stroke-width="2"/><path d="M40 14L56 14 56 21 40 21Z" fill="#cfdae9"/><path d="M35 51Q48 42 64 51L67 67Q67 74 59 74L39 74Q32 74 33 67Z" fill="'+p.c+'" fill-opacity=".58"/><path d="M39 49L43 44 48 50 55 41" stroke="#fff" stroke-width="2" fill="none"/>';
 else art='<path d="M48 9L70 30 63 65 48 83 31 65 25 30Z" fill="url(#energy)" stroke="#f3f6ff" stroke-width="2"/><path d="M48 9L48 82M25 30L70 30M31 65L63 65" stroke="#fff" stroke-opacity=".5" stroke-width="1.5"/><path d="M48 14L61 33 48 45 35 33Z" fill="#fff" fill-opacity=".28"/>';
 return svg(96,96,p.a,p.b,p.c,'<rect x="2" y="2" width="92" height="92" rx="8" fill="url(#panel)" stroke="'+p.a+'" stroke-width="2"/><circle cx="48" cy="48" r="39" fill="url(#glow)" opacity=".8"/><path d="M9 18L17 10M78 10L87 19M9 78L18 87M78 86L87 77" stroke="'+p.c+'" stroke-opacity=".6"/>'+art+'<circle cx="22" cy="24" r="1.8" fill="#fff"/><circle cx="77" cy="70" r="1.5" fill="'+p.c+'"/>');
}
function skill(key){
 const blue=/quincy|reishi|lance|spirit-pierce/.test(key),purple=/astral|moon|thunder|raijin/.test(key),gold=/flash|shunko/.test(key),p=P[blue?'blue':purple?'purple':gold?'gold':'red'];
 let art='';
 if(/arrow|volley|lance/.test(key)) art='<path d="M10 53L67 24 56 40 86 38 74 58 81 67 49 62 32 78Z" fill="url(#energy)" stroke="#fff" stroke-width="2"/><path d="M13 76L47 57" stroke="#fff" stroke-width="2"/>';
 else if(/lightning|thunder|raijin|flash|shunko/.test(key)) art='<path d="M56 8L28 48 47 47 34 86 73 38 53 39Z" fill="url(#energy)" stroke="#fff" stroke-width="2"/><path d="M15 28L27 37M76 63L88 71" stroke="'+p.c+'" stroke-width="3"/>';
 else if(/bankai|wave|burst|strike|crescent|fang|astral/.test(key)) art='<path d="M13 69Q25 17 67 22Q86 25 80 50Q71 78 31 77Q55 66 60 48Q43 41 13 69Z" fill="url(#energy)" stroke="#fff" stroke-width="2"/><path d="M18 75Q44 86 71 60" fill="none" stroke="'+p.c+'" stroke-width="4" filter="url(#shine)"/>';
 else art='<path d="M48 10L58 31 81 20 68 43 88 51 65 60 76 82 53 69 41 88 36 64 12 69 28 49 11 34 34 34Z" fill="url(#energy)" stroke="#fff" stroke-width="2"/><circle cx="49" cy="49" r="14" fill="#fff" fill-opacity=".45"/>';
 return svg(96,96,p.a,p.b,p.c,'<rect x="2" y="2" width="92" height="92" rx="8" fill="url(#panel)" stroke="'+p.a+'" stroke-width="2"/><circle cx="48" cy="48" r="38" fill="url(#glow)" opacity=".78"/><path d="M48 6L52 16M88 48L78 52M48 90L44 80M8 48L18 44" stroke="'+p.c+'" stroke-width="1.5"/>'+art+'<circle cx="22" cy="25" r="2" fill="#fff"/><circle cx="77" cy="72" r="2" fill="'+p.c+'"/>');
}
function zone(key){
 const p=key==='desert'?['#cb8550','#2c2030','#ffe2a1']:key==='ruins'?['#4c6279','#101725','#c2e7ff']:key==='forest'?['#195248','#061a1a','#7ee6b9']:key==='rift'?['#433070','#0b0819','#dba0ff']:['#557aa3','#111b32','#edf5ff'];
 let city='';
 if(key==='forest') city='<path d="M0 350L55 185 110 350 160 160 225 350 295 125 360 350 430 182 495 350 575 149 640 350 705 174 765 350 835 140 900 350 960 250V480H0Z" fill="#102c28"/>';
 else if(key==='desert') city='<path d="M0 350L0 305H60V270H95V325H130V241L158 220 186 241V350H230V282H280V350H330V263L359 243 389 263V350H455V300H510V350H600V264H632L665 264V350H710V293H771V350H850V276H900V350H960V480H0Z" fill="#583a35"/>';
 else if(key==='rift') city='<path d="M0 350L80 260 140 310 220 170 300 290 395 188 490 295 590 170 680 300 770 205 850 296 960 195V480H0Z" fill="#201736"/><path d="M470 330L510 150 540 300 570 185 590 330" stroke="#ca8dff" stroke-width="6" fill="none" opacity=".7"/>';
 else if(key==='ruins') city='<path d="M0 365L70 282 120 300 175 212 238 300 286 260 340 315 395 194 455 300 520 246 588 310 650 204 710 290 778 240 845 315 900 255 960 310V480H0Z" fill="#1b2335"/>';
 else city='<path d="M0 360H45V255H85V221H133V360H185V190H238V360H295V256H346V360H410V173H467V360H520V225H570V360H620V195H675V360H730V245H790V360H840V200H897V360H960V480H0Z" fill="#19253f"/>';
 const moon=key==='rift'?'<circle cx="750" cy="100" r="44" fill="none" stroke="'+p[2]+'" stroke-width="7"/><circle cx="750" cy="100" r="30" fill="none" stroke="#fff" stroke-width="2"/>':'<circle cx="750" cy="100" r="44" fill="'+p[2]+'"/><circle cx="731" cy="86" r="40" fill="'+p[0]+'" opacity=".22"/>';
 const distinct=key==='society'?'<path d="M135 359V205L210 145 285 205V359M650 359V192L720 130 790 192V359" fill="#263c5b" stroke="#acc9e7" stroke-opacity=".4" stroke-width="4"/><path d="M115 206L210 131 305 206M630 193L720 116 810 193" fill="none" stroke="#d9e7fb" stroke-width="5"/>':'<path d="M0 408Q150 370 320 408T640 402T960 408V480H0Z" fill="#060912" opacity=".65"/><path d="M0 429Q160 398 320 430T640 424T960 430" fill="none" stroke="'+p[2]+'" stroke-opacity=".36" stroke-width="3"/>';
 let stars='';
 for(let i=0;i<36;i++){const x=(i*97)%960,y=(i*61)%270;stars+='<circle cx="'+x+'" cy="'+y+'" r="'+((i%3)+1)+'" fill="'+(i%2?p[2]:'#fff')+'" opacity="'+(.16+(i%4)*.13)+'"/>'}
 return svg(960,480,p[0],p[1],p[2],'<rect width="960" height="480" fill="'+p[1]+'"/><rect width="960" height="480" fill="url(#glow)"/><rect width="960" height="260" fill="url(#panel)" opacity=".25"/>'+moon+city+distinct+stars);
}
const itemKeys=['spiritFragment','studentSash','echoStone','wornBlade','karakuraAmulet','ashMantle','fracturedZangetsu','eclipseBlade','crimsonZanpakuto','voidMantle','reiatsuCore','reishiBow','shunkoGauntlets','awakenedZangetsu'];
const skillKeys=['crescent','astral-burst','flash-step','spirit-pierce','moon-fang','bankai-wave','quincy-arrow','reishi-volley','blue-lance','shunko-strike','thunderclap','raijin-burst'];
const items={};itemKeys.forEach(k=>items[k]=item(k));
const skills={};skillKeys.forEach(k=>skills[k]=skill(k));
const rareColors=['#8b95a6','#50c798','#4b9fff','#b475ff','#ffc15e','#ff465b'];
const rarity={};['common','uncommon','rare','epic','legendary','mythic'].forEach((key,i)=>{const col=rareColors[i];rarity[key]=svg(72,72,col,'#080b14',col,'<rect x="2" y="2" width="68" height="68" rx="9" fill="url(#panel)" stroke="'+col+'" stroke-width="2"/><path d="M36 9L56 25 50 51 36 63 22 51 16 25Z" fill="url(#energy)" stroke="#fff" stroke-width="1.5"/><path d="M36 9V63M16 25H56M22 51H50" stroke="#fff" stroke-opacity=".4" stroke-width="1.5"/>')});
const chests={};['common','rare','epic','legendary','mythic'].forEach(k=>chests[k]=item('chest-'+k));
const characters={blade:{portrait:portrait('blade'),battle:battleSprite('blade')},kido:{portrait:portrait('kido'),battle:battleSprite('kido')},step:{portrait:portrait('step'),battle:battleSprite('step')}};
const bosses=[0,1,2,3,4,5].map(boss);
const equipment={weapon:item('wornBlade'),armor:item('studentSash'),accessory:item('karakuraAmulet'),relic:item('reiatsuCore')};
const ui={inventory:item('studentSash'),character:portrait('blade'),skills:skill('crescent'),quests:item('echoStone'),ranking:item('goldCoin'),shop:item('goldChest'),guild:item('voidMantle'),map:item('crystal'),boss:hollow(4),settings:item('ring')};
const zones={desert:zone('desert'),ruins:zone('ruins'),forest:zone('forest'),rift:zone('rift'),society:zone('society')};
window.XBLEACH_ART={characters,mobs:mobPalette.map((_,i)=>hollow(i)),bosses,items,skills,rarity,chests,equipment,ui,zones};
})();