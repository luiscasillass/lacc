// ---------- Utilities ----------
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

const state = {
  theme: localStorage.getItem('theme') || 'auto'
};

// ---------- Theme ----------
const themeBtn = $('#themeToggle');
function applyTheme(){
  if(state.theme === 'dark'){ document.documentElement.style.colorScheme = 'dark'; document.body.dataset.theme='dark'; }
  else if(state.theme === 'light'){ document.documentElement.style.colorScheme='light'; document.body.dataset.theme='light'; }
  else { document.documentElement.style.colorScheme='light dark'; document.body.dataset.theme='auto'; }
}
themeBtn?.addEventListener('click', () => {
  state.theme = state.theme === 'light' ? 'dark' : (state.theme === 'dark' ? 'auto' : 'light');
  localStorage.setItem('theme', state.theme);
  applyTheme();
});
applyTheme();

// ---------- Mobile nav ----------
const toggle = $('.nav-toggle');
const links = $('#navlinks');
toggle?.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});

// ---------- Active nav on scroll ----------
const sections = ['thoughts','papers','resume','mananea','projects'];
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e=>{
    if(e.isIntersecting){
      $$('.nav-link').forEach(a=>a.classList.toggle('active', a.dataset.section===e.target.id));
    }
  });
},{ rootMargin:'-45% 0px -50% 0px', threshold:.01});
sections.forEach(id => {
  const el = document.getElementById(id);
  if(el) obs.observe(el);
});

// ---------- Content (edit here in GitHub) ----------
const thoughts = [
  { title: "Reclaiming Attention in a Noisy World", date:"2025-10-01", read:"6 min", desc:"Notes on removing friction, rebuilding focus, and making deep work default.", url:"#"},
  { title: "Ship Small, Ship Often", date:"2025-09-20", read:"4 min", desc:"Why weekly shipping beats yearly ‘big releases’.", url:"#"},
  { title: "Queuing Theory for Founders", date:"2025-09-10", read:"7 min", desc:"How queues, backpressure and rate limits map to life and startups.", url:"#"},
  { title: "The Minimum Remarkable Product", date:"2025-08-14", read:"5 min", desc:"Beyond MVP: build the smallest thing people brag about.", url:"#"},
  { title: "Notes on building Signai", date:"2025-07-12", read:"5 min", desc:"Early architecture, pricing thoughts, and first customer lessons.", url:"#"},
  { title: "Operational Calm", date:"2025-06-01", read:"3 min", desc:"Run your life like a good system: low variance, calm defaults.", url:"#"}
];

const papers = [
  { title:"A Practical Overview of E-Signature Flows for LATAM", venue:"Whitepaper", year:"2025", url:"#", tag:"PDF"},
  { title:"Data Structures for Real-Time Logistics", venue:"Tech note", year:"2025", url:"#", tag:"Note"},
  { title:"Batching, Debouncing, and Backpressure", venue:"Essay", year:"2025", url:"#", tag:"Essay"}
];

const experience = [
  { role:"Founder", where:"Signai (B2B e-signatures)", when:"2025—present", desc:"MVP, pricing, first customers. Node/React/Postgres, compliance notes." },
  { role:"SDR (Remote)", where:"DataScope.io", when:"2025", desc:"Outbound playbooks, discovery calls, ICP mapping, systems thinking." }
];

const education = [
  { role:"B.S. Computer Science", where:"ITESM Guadalajara", when:"2023—2028", desc:"Systems, DSA, OS, ML; side projects in IoT and data." }
];

const skills = ["C++ / Python / JS","Node + Express","React + Next.js","PostgreSQL / Supabase","Docker basics","Git / GitHub","System Design (foundations)","DSA (learning)"];

const signalLinks = [
  { label:"GitHub", url:"https://github.com/" },
  { label:"LinkedIn", url:"https://www.linkedin.com/" },
  { label:"Email", url:"mailto:kuiscasillas@gmail.com" }
];

const mananea = [
  { date:"2025-10-12", text:"Shipped the minimalist-retro blog. Wrote copy, tuned spacing, added motion-safe details." },
  { date:"2025-10-10", text:"Refactored Signai auth flows; removed 3 steps. Simpler is faster." },
  { date:"2025-10-07", text:"DSA hour: linked lists & queues. Practiced pen-and-paper first." }
];

const projects = [
  { title:"Signai", desc:"Digital signatures built for LATAM reliability and price sensitivity.", img:"assets/project-signai.jpg", url:"#", tags:["Node","React","Postgres","Pricing"]},
  { title:"Lácteos Ops", desc:"IoT + dashboards to stabilize quality and yield in a small dairy plant.", img:"assets/project-lacteos.jpg", url:"#", tags:["IoT","Python","Dashboards"]},
  { title:"StudyBuddy", desc:"Turn notes/PDFs into spaced-repetition flashcards automatically.", img:"assets/project-study.jpg", url:"#", tags:["Next.js","Supabase","AI"]},
  { title:"Profiler", desc:"A tiny profiler to compare sorting algorithms & visualize runtime.", img:"assets/project-profiler.jpg", url:"#", tags:["C++","DSA","Charts"]}
];

// ---------- Renderers ----------
function renderThoughts(){
  const grid = $('#thoughtsGrid');
  grid.innerHTML = thoughts.map(t => `
    <a class="card" href="${t.url}">
      <div class="meta"><span>${t.date}</span><span>•</span><span>${t.read}</span></div>
      <div class="title">${t.title}</div>
      <div class="desc">${t.desc}</div>
    </a>
  `).join('');
}
function renderPapers(){
  const list = $('#papersList');
  list.innerHTML = papers.map(p=>`
    <a href="${p.url}">
      <span class="left">
        <span class="badge">${p.tag}</span>
        <span><strong>${p.title}</strong> · <span class="mono">${p.venue}</span></span>
      </span>
      <span class="mono">${p.year}</span>
    </a>
  `).join('');
}

function renderMananea(){
  const feed = document.getElementById('mananeaFeed');
  if(!feed) return;
}

function renderResume(){
  const exp = $('#expList');
  exp.innerHTML = experience.map(x=>`
    <li>
      <div class="role">${x.role}</div>
      <div class="where">${x.where} — <span class="mono">${x.when}</span></div>
      <div>${x.desc}</div>
    </li>
  `).join('');
  const edu = $('#eduList');
  edu.innerHTML = education.map(x=>`
    <li>
      <div class="role">${x.role}</div>
      <div class="where">${x.where} — <span class="mono">${x.when}</span></div>
      <div>${x.desc}</div>
    </li>
  `).join('');
  const chips = $('#skillChips');
  chips.innerHTML = skills.map(s=>`<li>${s}</li>`).join('');
  const sig = $('#signals');
  sig.innerHTML = signalLinks.map(s=>`<li><a class="ghost" href="${s.url}" target="_blank" rel="noreferrer">${s.label} →</a></li>`).join('');
}
function renderMananea(){
  const feed = $('#mananeaFeed');
  feed.innerHTML = mananea.map(n=>`
    <div class="note">
      <div class="date">${n.date}</div>
      <div>${n.text}</div>
    </div>
  `).join('');
}
function renderProjects(){
  const grid = $('#projectsGrid');
  grid.innerHTML = projects.map(p=>`
    <a class="project" href="${p.url}">
      <img src="${p.img}" alt="">
      <div>
        <h3>${p.title}</h3>
        <div>${p.desc}</div>
        <div class="tags">
          ${p.tags.map(t=>`<span class="tag">${t}</span>`).join('')}
        </div>
      </div>
    </a>
  `).join('');
}

renderThoughts();
renderPapers();
renderResume();
renderMananea();
renderProjects();

// Year
$('#year').textContent = new Date().getFullYear();

// “Older posts” placeholder
$('#moreThoughts').addEventListener('click', e => {
  e.preventDefault();
  alert('Hook this to a /thoughts archive page or paginate the array.');
});
