const P={
neutral:["4A4A4A","C6C6C6","929292","2C2C2C","222222","1B1B1B","222222","1B1B1B","161616","121212","101010","0E0E0E"],
warm:["514E49","C8C5C1","A29E99","2D2B28","22211F","1B1A19","22211F","1B1A19","161514","121211","100F0E","0E0D0C"],
cold:["454A53","C0C4CC","9298A3","292C32","202226","191B1F","202226","191B1F","151619","111214","0F1012","0D0E10"]};
const K=['accent','text','subtext','overlay2','overlay1','overlay0','surface2','surface1','surface0','base','island1','island2'];
const root=document.documentElement,$=s=>document.querySelector(s),tabs=$('#tabs'),grid=$('#grid');
const cap=s=>s[0].toUpperCase()+s.slice(1),label=k=>cap(k).replace(/(\d)/,' $1'),slug=k=>k.replace(/(\d)/,'-$1');
tabs.innerHTML=Object.keys(P).map(v=>`<button role="tab" data-v="${v}">${cap(v)}</button>`).join('');
function show(v){
  if(!P[v])v='neutral';
  const c=P[v];
  K.forEach((k,i)=>root.style.setProperty('--'+k,'#'+c[i]));
  tabs.querySelectorAll('button').forEach(b=>b.setAttribute('aria-selected',b.dataset.v===v));
  $('#vname').textContent=cap(v);
  $('#cmd').textContent=`palettes/${v}/palette.yaml`;
  grid.innerHTML=K.map((k,i)=>`<div class="tile" role="button" tabindex="0" data-hex="#${c[i]}"><i style="background:var(--${k})"></i><b>${label(k)}</b><code>#${c[i]}</code><a href="assets/palettes/${v}/${String(i+1).padStart(2,'0')}-${slug(k)}.svg" download>svg</a></div>`).join('');
  $('#overview').href=`assets/palettes/${v}/00-palette.svg`;
  $('#yaml').textContent=`name: MonoYou\nvariant: ${v}\nversion: 1.0.0\n\ncolors:\n`+K.map((k,i)=>`  ${k}: "#${c[i]}"`).join('\n');
  history.replaceState(null,'','#'+v);
  document.title=`MonoYou ${cap(v)} — MonoYou Colors`;
}
const copy=t=>{navigator.clipboard?.writeText(t.dataset.hex);const c=t.querySelector('code'),o=c.textContent;c.textContent='copied!';setTimeout(()=>c.textContent=o,900)};
grid.addEventListener('click',e=>{const t=e.target.closest('.tile');if(t&&!e.target.closest('a'))copy(t)});
grid.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.classList.contains('tile')){e.preventDefault();copy(e.target)}});
tabs.addEventListener('click',e=>{const b=e.target.closest('button');if(b)show(b.dataset.v)});
addEventListener('hashchange',()=>show(location.hash.slice(1)));
show(location.hash.slice(1));
