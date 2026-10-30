const projects=[
 {t:'Northwind Coffee',c:'Brand',y:2026,role:'Identity, packaging',res:'Rebrand across 14 cafés; online orders up 31% in the first quarter.',d:'A roaster wanted a look that felt crafted but not precious. We built a flexible identity from hand-cut shapes and a calm, warm voice.',c1:'#d9e4ec',c2:'#2f5d8a',c3:'#b98a1e'},
 {t:'Ledgerly',c:'Product',y:2026,role:'Product design, design system',res:'Onboarding completion rose from 48% to 79%.',d:'We simplified invoicing for freelancers into three screens and shipped a component library the engineers still use.',c1:'#e8efe6',c2:'#3c7a5c',c3:'#14202b'},
 {t:'Harbor Clinic',c:'Web',y:2025,role:'Website, content design',res:'Booking requests doubled; pages load in under 1.5 seconds.',d:'A clear, accessible site for a family clinic, written in plain language and built for patients on slow phones.',c1:'#dfe8f3',c2:'#7fb0dd',c3:'#2f5d8a'},
 {t:'Trailmap',c:'Product',y:2025,role:'Mobile app design',res:'Rated 4.8 in the app stores at launch.',d:'An offline-first hiking app. We designed map layers, route planning and a glanceable trail mode for bright sunlight.',c1:'#f0e9d8',c2:'#b98a1e',c3:'#3c7a5c'},
 {t:'Fieldnote Press',c:'Brand',y:2024,role:'Identity, editorial design',res:'Launched five titles using one shared system.',d:'A small publisher needed covers that look related but never repeat. We made a grid-based system that designers can extend.',c1:'#e6e1ef',c2:'#5b4a8a',c3:'#e0b64d'},
 {t:'Solace Energy',c:'Web',y:2024,role:'Marketing site, CMS',res:'Lead form conversion up 22%.',d:'A solar installer’s site with a savings calculator and a CMS the sales team edits without developer help.',c1:'#f3e4d6',c2:'#c0622b',c3:'#14202b'}
];
const grid=document.getElementById('grid'),dlg=document.getElementById('dlg'),dbody=document.getElementById('dbody');
const cover=p=>`<div class="cover" style="--c1:${p.c1};--c2:${p.c2};--c3:${p.c3}"><i class="a"></i><i class="b"></i></div>`;
projects.forEach((p,i)=>{
 const b=document.createElement('button');b.className='card';b.dataset.c=p.c;b.setAttribute('aria-label','Open case study: '+p.t);
 b.innerHTML=cover(p)+`<div class="body"><h3>${p.t}</h3><p class="meta">${p.c}, ${p.y}</p></div>`;
 b.onclick=()=>{dbody.innerHTML=cover(p)+`<h3 id="dt" style="font-size:1.8rem">${p.t}</h3><p style="margin-top:.8rem;color:var(--muted)">${p.d}</p><dl><dt>Category</dt><dd>${p.c}</dd><dt>Year</dt><dd>${p.y}</dd><dt>Our role</dt><dd>${p.role}</dd><dt>Result</dt><dd>${p.res}</dd></dl><button class="btn" id="close">Close</button>`;dlg.showModal();document.getElementById('close').onclick=()=>dlg.close()};
 grid.appendChild(b);
});
dlg.addEventListener('click',e=>{if(e.target===dlg)dlg.close()});
document.querySelectorAll('.chip').forEach(c=>c.onclick=()=>{
 document.querySelectorAll('.chip').forEach(x=>x.setAttribute('aria-pressed',x===c));
 const f=c.dataset.f;grid.querySelectorAll('.card').forEach(k=>k.hidden=f!=='all'&&k.dataset.c!==f);
});
/* ridge parallax */
const ridge=document.getElementById('ridge');
if(!matchMedia('(prefers-reduced-motion:reduce)').matches){
 ridge.addEventListener('pointermove',e=>{const r=ridge.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5;
  ridge.querySelectorAll('g').forEach(g=>{g.style.transform=`translateX(${-x*g.dataset.d}px)`})});
 ridge.addEventListener('pointerleave',()=>ridge.querySelectorAll('g').forEach(g=>g.style.transform=''));
}
/* testimonials */
const T=[
 ['Altura turned a vague idea into a brand our whole team could explain in one sentence.','Maya Ortiz','Founder, Northwind Coffee'],
 ['They shipped the design system early and our engineers adopted it without being asked.','Daniel Reyes','Head of Product, Ledgerly'],
 ['Patients tell us the new site is the first one that just works on their phones.','Dr. Priya Nair','Director, Harbor Clinic']
];
let ti=0,timer;
const q=document.getElementById('q'),qn=document.getElementById('qn'),qr=document.getElementById('qr'),dots=document.getElementById('dots');
T.forEach((_,i)=>{const d=document.createElement('button');d.setAttribute('aria-label','Testimonial '+(i+1));d.onclick=()=>{show(i);restart()};dots.appendChild(d)});
function show(i){ti=(i+T.length)%T.length;q.textContent='“'+T[ti][0]+'”';qn.textContent=T[ti][1];qr.textContent=T[ti][2];q.classList.remove('fade');void q.offsetWidth;q.classList.add('fade');[...dots.children].forEach((d,k)=>d.setAttribute('aria-current',k===ti))}
function restart(){clearInterval(timer);if(!matchMedia('(prefers-reduced-motion:reduce)').matches)timer=setInterval(()=>show(ti+1),7000)}
document.getElementById('prev').onclick=()=>{show(ti-1);restart()};
document.getElementById('next').onclick=()=>{show(ti+1);restart()};
show(0);restart();
/* form */
const form=document.getElementById('form'),st=document.getElementById('status');
form.addEventListener('submit',e=>{
 e.preventDefault();let ok=true;const f=form.elements;
 const set=(n,m)=>{form.querySelector(`[data-for="${n}"]`).textContent=m;if(m)ok=false};
 set('name',f.name.value.trim()?'':'Enter your name.');
 set('email',/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email.value)?'':'Enter a valid email address, like name@company.com.');
 set('msg',f.msg.value.trim().length>=10?'':'Tell us a little more (at least 10 characters).');
 if(!ok)return;
 st.innerHTML='<div class="ok">Message sent. We’ll reply within two working days.</div>';form.reset();
});
/* theme */
const root=document.documentElement;
document.getElementById('theme').onclick=()=>{
 const dark=root.dataset.theme?root.dataset.theme==='dark':matchMedia('(prefers-color-scheme:dark)').matches;
 root.dataset.theme=dark?'light':'dark';
};
