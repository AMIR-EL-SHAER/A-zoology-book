/* ============================================================
   الحيوان العام — تطبيق الكتاب التفاعلي
   ============================================================ */
/* marker removed */
/* وضع التجربة: demo.html يفعّله قبل تحميل app.js — النسخة الكاملة ما تتأثرش */
const TRIAL = !!window.AZOO_TRIAL;
let TRIAL_PREVIEW = false; /* بيعرض الصفحة الأصلية كاملة بس مقفولة */
const TRIAL_TG = 'https://t.me/AZOOLOGY_helper_bot?text=';
function openTrialSubscribe(what) {
  const txt = 'عايز أشترك في A-ZOOLOGY' + (what ? ' — ' + what : '');
  const url = TRIAL_TG + encodeURIComponent(txt);
  try { const w = window.open(url, '_blank'); if (w) { try { w.opener = null; } catch (e) {} return; } } catch (e) {}
  location.href = url;
}
const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

/* ---------------- modern line icons ---------------- */
const ICON_PATHS = {
  home:'<path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10.5V20h13v-9.5"/><path d="M10 20v-5h4v5"/>',
  calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/>',
  book:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5z"/><path d="M4 5.5v16"/>',
  flask:'<path d="M9 3h6M10 3v6L4.5 19a1.5 1.5 0 0 0 1.3 2h12.4a1.5 1.5 0 0 0 1.3-2L14 9V3"/><path d="M7.5 15h9"/>',
  cards:'<rect x="4" y="6" width="13" height="14" rx="2"/><path d="M8 3h9a3 3 0 0 1 3 3v11"/>',
  lang:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18"/>',
  quiz:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 4 2c-.9.7-1.5 1.3-1.5 2.5M12 17h.01"/>',
  exam:'<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 9h8M8 13h8M8 17h5"/>',
  archive:'<path d="M3 6h18v4H3zM5 10v10h14V10M10 14h4"/>',
  search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-3.6-3.6"/>',
  sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4"/>',
  moon:'<path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z"/>',
  settings:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1-2.1 2.1-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V21h-3v-.1a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.8.3l-.1.1L4.8 17l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H3v-3h.1a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.8L4.8 7 7 4.9l.1.1a1.6 1.6 0 0 0 1.8.3 1.6 1.6 0 0 0 1-1.5V3h3v.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1L19.1 7l-.1.1a1.6 1.6 0 0 0-.3 1.8 1.6 1.6 0 0 0 1.5 1H21v3h-.1a1.6 1.6 0 0 0-1.5 1z"/>',
  print:'<path d="M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 15h12v6H6z"/>',
  logout:'<path d="M10 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h5"/><path d="M14 16l4-4-4-4M18 12H9"/>',
  menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',
  whatsapp:'<path d="M12 3a9 9 0 0 0-7.8 13.4L3 21l4.7-1.2A9 9 0 1 0 12 3z"/><path d="M9 8.5c.3 2.6 3.9 6.2 6.5 6.5l1.5-1.5-2-1-1 .8c-1-.4-2-1.4-2.4-2.4l.8-1-1-2z"/>',
  telegram:'<path d="m21 5-3 14-4.5-3.2L9.8 18 9 13.5 19 6.5 10.5 12.6 5.5 11 21 5z"/>',
  instagram:'<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/>',
  check:'<path d="m5 12 4 4L19 6"/>',
  close:'<path d="M6 6l12 12M18 6 6 18"/>'
};
const icon = (name, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON_PATHS[name] || ''}</svg>`;
const SOCIAL_LINKS = [
  ['whatsapp', 'واتساب', 'https://wa.me/201018201045', 'wa'],
  ['telegram', 'تيليجرام', 'https://t.me/+201018201045', 'tg'],
  ['instagram', 'إنستجرام', 'https://www.instagram.com/a_0_hub', 'ig']
];
const socialBar = () => `<div class="social-bar" aria-label="وسائل التواصل">
  ${SOCIAL_LINKS.filter(([name]) => !(TRIAL && name === 'telegram')).map(([name, label, href, id]) => `<a id="${id}" href="${href}" target="_blank" rel="noopener" aria-label="${label}" title="${label}">${icon(name)}</a>`).join('')}
  <span class="social-label">تابعنا</span>
</div>`;
function hydrateStaticIcons() {
  const menu = $('#menuBtn'); if (menu) menu.innerHTML = icon('menu');
  const searchIcon = $('#searchIcon'); if (searchIcon) searchIcon.innerHTML = icon('search');
  const settings = $('#settingsBtn'); if (settings) settings.innerHTML = icon('settings') + '<span>إعدادات</span>';
  const close = $('#closePlayer'); if (close) close.innerHTML = icon('close');
}
const BOOK = window.BOOK;
/* التجربة ما تحذفش أي بيانات: كل الأقسام والعدادات تفضل ظاهرة، بس الوصول مقفول */
let TRIAL_UNIT_ID = null, TRIAL_UNIT_DAY = 1, TRIAL_UNITS = new Set();
if (TRIAL) {
  const ids = Object.keys(BOOK.units || {});
  TRIAL_UNIT_ID = ids.find(id => BOOK.units[id].part === 'theory') || ids[0];
  TRIAL_UNIT_DAY = (BOOK.units[TRIAL_UNIT_ID] || {}).day || 1;
  TRIAL_UNITS = new Set(ids.filter(id => (BOOK.units[id] || {}).day === TRIAL_UNIT_DAY));
}
const CURRENT_USER_KEY = 'zoobook_current_user';
const CURRENT_USER_CODE = TRIAL ? null : localStorage.getItem(CURRENT_USER_KEY);
const LS_KEY = TRIAL ? 'zoobook_trial_v1' : (CURRENT_USER_CODE ? 'zoobook_v1_' + CURRENT_USER_CODE : 'zoobook_v1');

const esc = (s = '') => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

const AR_DIGITS = '٠١٢٣٤٥٦٧٨٩';
const arNum = n => String(n).replace(/\d/g, d => AR_DIGITS[+d]);
const fmtTime = s => {
  s = Math.max(0, Math.round(s || 0));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
};

/* ---------------- state ---------------- */
const RATES = [0.8, 1, 1.15, 1.3, 1.5];
const STEP_GAP = 120;
const GAP_JITTER = 80;
const naturalGap = src => STEP_GAP + (Array.from(src).reduce((n, c) => n + c.charCodeAt(0), 0) % GAP_JITTER);
const normRate = v => RATES.includes(+v) ? +v : 1;
const defaultState = {
  done: {}, quiz: {}, exam: null, examHistory: [], pastQuiz: {}, cards: {}, tasks: {},
  settings: { theme: 'dark', font: 17, speed: 1, autoplay: true, termDetail: true, enRate: 1, arRate: 1 },
  last: null, visited: {}, positions: {}, studyDays: {}, weak: {}
};
let state;
try { state = Object.assign({}, defaultState, JSON.parse(localStorage.getItem(LS_KEY) || '{}')); }
catch { state = { ...defaultState }; }
state.settings = Object.assign({}, defaultState.settings, state.settings || {});
if (!state.settings.fontSize) state.settings.fontSize = state.settings.font <= 15 ? 'small' : state.settings.font >= 21 ? 'large' : 'medium';
if (typeof state.settings.contrast !== 'boolean') state.settings.contrast = false;
if (typeof state.settings.termDetail !== 'boolean') state.settings.termDetail = true;
state.settings.enRate = normRate(state.settings.enRate);
state.settings.arRate = normRate(state.settings.arRate);
state.positions = state.positions || {};
state.studyDays = state.studyDays || {};
state.weak = state.weak || {};
state.examHistory = Array.isArray(state.examHistory) ? state.examHistory : [];
state.pastQuiz = state.pastQuiz || {};
const save = () => localStorage.setItem(LS_KEY, JSON.stringify(state));

/* ---------------- units index ---------------- */
const UNITS = BOOK.units;
const UNIT_LIST = Object.keys(UNITS);
const PAST_EXAMS = (BOOK.pastExams || []).slice();
const ACCESS_CODES = (window.ACCESS_CODES || []).slice();
function getUsers() { try { return JSON.parse(localStorage.getItem('zoobook_users') || '{}'); } catch (e) { return {}; } }
function saveUsers(u) { localStorage.setItem('zoobook_users', JSON.stringify(u)); }
function currentUserName() { const code = localStorage.getItem(CURRENT_USER_KEY); const u = getUsers(); return (code && u[code] && u[code].name) || ''; }
const unitById = id => UNITS[id];
const dayOf = u => u.day;
const dayUnits = d => UNIT_LIST.filter(id => UNITS[id].day === d && UNITS[id].part === 'theory');
const theoryUnits = UNIT_LIST.filter(id => UNITS[id].part === 'theory');
const practicalUnits = UNIT_LIST.filter(id => UNITS[id].part === 'practical');

const totalUnits = UNIT_LIST.length;
const doneCount = () => UNIT_LIST.filter(id => state.done[id]).length;
const pct = () => Math.round(doneCount() / totalUnits * 100);

/* ---------------- glossary map ---------------- */
const GLOSSARY = [];
UNIT_LIST.forEach(id => {
  const u = UNITS[id];
  (u.terms || []).forEach(t => {
    if (!t || !t.ar) return;
    if (GLOSSARY.some(x => x.ar === t.ar)) return;
    GLOSSARY.push(Object.assign({ day: u.day, unit: id }, t));
  });
});
if (BOOK.glossary) BOOK.glossary.forEach(t => {
  if (!t || !t.ar) return;
  if (GLOSSARY.some(x => x.ar === t.ar)) return;
  GLOSSARY.push(t);
});
const termMap = new Map();
GLOSSARY.forEach(t => { if (t.ar) termMap.set(t.ar.trim(), t); });
/* المصطلحات المكتوبة فعليًا في المقرر — من غير تخمين الكلمات المفردة */
const EXACT_TERM_KEYS = new Set(GLOSSARY.map(t => t.ar && t.ar.trim()).filter(Boolean));
const escRe = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const hasTerm = (text, key) => new RegExp('(?<![\\u0600-\\u06FF])' + escRe(key) + '(?![\\u0600-\\u06FF])').test(text);

/* كل كلمة داخل المصطلح ليها نفس المعنى الإنجليزي للمصطلح كامل */
const WORD_STOP = new Set(['علم','من','في','على','إلى','عن','مع','كل','هذا','هذه','ذلك','بين','بعد','قبل','التي','الذي','الذين','غير','أو','و','ب','ل','ك']);
const wordVotes = new Map();
GLOSSARY.forEach(t => {
  if (!t.ar) return;
  (t.ar.trim().split(/\s+/)).forEach(w => {
    if (w.length < 3 || !/[\u0600-\u06FF]/.test(w) || WORD_STOP.has(w)) return;
    if (termMap.has(w)) return;
    if (!wordVotes.has(w)) wordVotes.set(w, new Map());
    const v = wordVotes.get(w);
    v.set(t.ar.trim(), (v.get(t.ar.trim()) || 0) + 1);
  });
});
wordVotes.forEach((votes, w) => {
  const best = Array.from(votes.entries()).sort((a, b) => b[1] - a[1] || a[0].length - b[0].length)[0][0];
  termMap.set(w, termMap.get(best));
});

/* أسماء شائعة تفتح نفس ملفات المصطلح الموجودة بدون ملفات صوت جديدة */
const TERM_ALIASES = {
  'علم الحيوان': 'علم الحيوان الزراعي',
  'البيولوجيا': 'علم الحياة',
  'علم البيولوجي': 'علم الحياة',
  'البيولوجي': 'علم الحياة'
};
Object.entries(TERM_ALIASES).forEach(([alias, key]) => {
  if (termMap.has(key) && !termMap.has(alias)) termMap.set(alias, termMap.get(key));
  if (termMap.has(key)) EXACT_TERM_KEYS.add(alias);
});

/* مصطلح «مهم» = بيظهر في أكتر من وحدة */
const termUnitsSeen = new Map();
UNIT_LIST.forEach(id => {
  const u = UNITS[id];
  const text = [u.title, u.titleEn, u.summary, u.note,
    ...(u.blocks || []).map(blockText),
    ...(u.terms || []).map(t => t && t.ar)].filter(Boolean).join(' ');
  EXACT_TERM_KEYS.forEach(key => {
    if (key.length > 1 && hasTerm(text, key)) {
      if (!termUnitsSeen.has(key)) termUnitsSeen.set(key, new Set());
      termUnitsSeen.get(key).add(id);
    }
  });
});
const isImportantTerm = t => (termUnitsSeen.get(t.ar && t.ar.trim()) || new Set()).size > 1;

/* longest first for linking */
const TERM_KEYS = Array.from(EXACT_TERM_KEYS).sort((a, b) => b.length - a.length);
const MAX_LINK = 6;

/* ---------------- sidebar ---------------- */
function renderSidebar() {
  const nav = $('#sideNav');
  const route = location.hash || '#/home';
  const active = (k) => route.startsWith(k) ? 'active' : '';
  let h = `
    <button class="nav-item ${active('#/home')}" data-go="#/home"><span class="ico">${icon('home')}</span> الرئيسية</button>
    <button class="nav-item ${active('#/plan')}" data-go="#/plan"><span class="ico">${icon('calendar')}</span> خطة الأسبوع</button>
    <div class="side-label">الأيام</div>`;
  BOOK.plan.forEach(d => {
    h += `<a class="day-link ${route === '#/day/' + d.day ? 'active' : ''}" href="#/day/${d.day}">
      <span class="day-dot">${arNum(d.day)}</span>
      <span>${esc(d.short || d.title)}</span>
      ${dayProgress(d.day) === 100 ? `<span style="margin-right:auto">${icon('check')}</span>` : ''}
    </a>`;
  });
  h += `<div class="side-label">المحتوى النظري</div>`;
  BOOK.plan.forEach(d => {
    h += `<button class="nav-item ${route === '#/day/' + d.day ? 'active' : ''}" data-go="#/day/${d.day}">
      <span class="ico">${icon('book')}</span> اليوم ${arNum(d.day)}
      <span class="cnt">${arNum(dayUnits(d.day).length)}</span></button>`;
  });
  h += `<div class="side-label">أدوات المذاكرة</div>
    <button class="nav-item ${active('#/practical')}" data-go="#/practical"><span class="ico">${icon('flask')}</span> الجزء العملي <span class="cnt">${arNum(practicalUnits.length)}</span></button>
    <button class="nav-item ${active('#/glossary')}" data-go="#/glossary"><span class="ico">${icon('book')}</span> قاموس المصطلحات <span class="cnt">${arNum(GLOSSARY.length)}</span></button>
    <button class="nav-item ${active('#/cards')}" data-go="#/cards"><span class="ico">${icon('cards')}</span> بطاقات المراجعة</button>
    <button class="nav-item ${active('#/term-quiz')}" data-go="#/term-quiz"><span class="ico">${icon('lang')}</span> اختبار المصطلحات</button>
    <button class="nav-item ${active('#/quizzes')}" data-go="#/quizzes"><span class="ico">${icon('quiz')}</span> الاختبارات</button>
    <button class="nav-item ${active('#/exam')}" data-go="#/exam"><span class="ico">${icon('exam')}</span> الامتحان الشامل</button>
    <button class="nav-item ${active('#/past')}" data-go="#/past"><span class="ico">${icon('archive')}</span> امتحانات دمياط <span class="cnt">${arNum(PAST_EXAMS.length)}</span></button>`;
  nav.innerHTML = h;
  $$('.nav-item[data-go], .day-link').forEach(el => {
    el.addEventListener('click', () => { $('#sidebar').classList.remove('open'); });
  });
  if (TRIAL) {
    const lockedNav = {
      '#/glossary': 'قاموس المصطلحات', '#/cards': 'بطاقات المراجعة',
      '#/term-quiz': 'اختبار المصطلحات', '#/quizzes': 'الاختبارات',
      '#/exam': 'الامتحان الشامل', '#/past': 'امتحانات جامعة دمياط',
      '#/practical': 'الجزء العملي'
    };
    $$('.nav-item[data-go]', nav).forEach(el => {
      const what = lockedNav[el.dataset.go];
      if (!what) return;
      delete el.dataset.go;
      el.dataset.lock = what;
      el.insertAdjacentHTML('beforeend', '<span class="lock-chip">🔒</span>');
    });
    $$('.day-link', nav).forEach(el => {
      const day = +String(el.getAttribute('href') || '').split('/').pop();
      if (day === TRIAL_UNIT_DAY) return;
      el.removeAttribute('href');
      el.dataset.lock = 'اليوم ' + arNum(day);
      el.insertAdjacentHTML('beforeend', '<span class="lock-chip">🔒</span>');
    });
    $$('.nav-item[data-go^="#/cards?day="], .nav-item[data-go^="#/quiz-day/"]', nav).forEach(el => {
      const day = +String(el.dataset.go).match(/\d+/)?.[0];
      if (day === TRIAL_UNIT_DAY) return;
      delete el.dataset.go;
      el.dataset.lock = day ? 'اليوم ' + arNum(day) : 'بطاقات المراجعة';
      el.insertAdjacentHTML('beforeend', '<span class="lock-chip">🔒</span>');
    });
    $$('.nav-item[data-go^="#/day/"]', nav).forEach(el => {
      const day = +String(el.dataset.go).split('/').pop();
      if (day === TRIAL_UNIT_DAY) return;
      delete el.dataset.go;
      el.dataset.lock = 'اليوم ' + arNum(day);
      el.insertAdjacentHTML('beforeend', '<span class="lock-chip">🔒</span>');
    });
  }
}

function dayProgress(day) {
  const ids = dayUnits(day);
  if (!ids.length) return 0;
  return Math.round(ids.filter(id => state.done[id]).length / ids.length * 100);
}

/* ---------------- dashboard helpers ---------------- */
const dateKey = (ts) => {
  const d = ts ? new Date(ts) : new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};
function markStudyDay() { state.studyDays[dateKey()] = true; save(); }
function studyStreak() {
  const d = new Date(); let n = 0;
  while (state.studyDays[dateKey(d.getTime())]) { n++; d.setDate(d.getDate() - 1); }
  return n;
}
function avgQuizScore() {
  const vals = Object.values(state.quiz || {});
  if (!vals.length) return 0;
  const total = vals.reduce((a, x) => a + (+x.total || 0), 0);
  return total ? Math.round(vals.reduce((a, x) => a + (+x.score || 0), 0) / total * 100) : 0;
}
function dueFlashcards() {
  return GLOSSARY.filter(t => {
    const c = state.cards[t.ar];
    return !c || c === 'review' || (typeof c === 'object' && c.due <= Date.now());
  }).length;
}
function currentPlanDay() {
  return BOOK.plan.find(d => dayProgress(d.day) < 100) || BOOK.plan[BOOK.plan.length - 1];
}
function quizCount() {
  return UNIT_LIST.reduce((n, id) => n + (((UNITS[id] && UNITS[id].quiz) || []).length), 0);
}
function dayCard(d) {
  const pr = dayProgress(d.day);
  return `<div class="card day-card ${pr === 100 ? 'done' : ''}">
    <div class="day-head" data-toggle>
      <div class="day-num" style="background:var(--accent-soft);color:var(--accent)">${arNum(d.day)}</div>
      <div style="flex:1;min-width:0">
        <h3>${esc(d.title)}</h3>
        <small>${esc(d.goal || '')}</small>
      </div>
      <div class="badge ${pr === 100 ? 'ok' : 'gold'}">${arNum(pr)}%</div>
    </div>
    <div class="day-body">
      <div class="progress" style="margin:12px 0"><i style="width:${pr}%"></i></div>
      <div class="small muted" style="margin-bottom:10px">${arNum(dayUnits(d.day).length)} وحدة · ${esc(d.hours || 3)} ساعات</div>
      <button class="btn soft sm" data-go="#/day/${d.day}">افتح اليوم ${arNum(d.day)}</button>
    </div>
  </div>`;
}
function unitRow(u) {
  if (!u) return '';
  const done = !!state.done[u.id];
  const sum = String(u.summary || '');
  return `<a class="card unit-row" href="#/unit/${esc(u.id)}" style="display:block">
    <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">
      <span class="tag ${done ? 'accent' : ''}">${esc(String(u.id).toUpperCase())}</span>
      <b>${esc(u.title || '')}</b>
      <span class="small muted" style="margin-right:auto">${done ? '✓ تمت المذاكرة' : esc(sum.slice(0, 90)) + (sum.length > 90 ? '…' : '')}</span>
      <span class="small muted">${arNum((u.blocks || []).length)} أقسام</span>
    </div>
  </a>`;
}

/* ---------------- trial gate ---------------- */
function trialRouteOK(parts) {
  if (!TRIAL) return true;
  const root = parts[0] || 'home';
  if (!['home', 'plan', 'day', 'unit', 'quiz-day', 'cards'].includes(root)) return false;
  if (root === 'unit') return !parts[1] || TRIAL_UNITS.has(parts[1]);
  if (root === 'day') return !parts[1] || +parts[1] === TRIAL_UNIT_DAY;
  if (root === 'quiz-day') return !parts[1] || +parts[1] === TRIAL_UNIT_DAY;
  if (root === 'cards') return String(location.hash.split('?')[1] || '').includes('day=' + TRIAL_UNIT_DAY);
  return true;
}
function dayQuizQuestions(day) {
  return dayUnits(day).reduce((n, id) => n + (((UNITS[id] && UNITS[id].quiz) || []).length), 0);
}
function trialLockedDetail(what, arg) {
  switch (what) {
    case 'practical': return `${arNum(practicalUnits.length)} وحدة عملية`;
    case 'exam': return `امتحان شامل واحد — ${arNum(((BOOK.exam && BOOK.exam.questions) || []).length)} سؤال اختياري + ${arNum(((BOOK.exam && BOOK.exam.open) || []).length)} سؤال مقالي`;
    case 'past': return `${arNum(PAST_EXAMS.length)} نماذج لامتحانات جامعة دمياط`;
    case 'quizzes': return `${arNum(quizCount())} سؤال في اختبارات الوحدات`;
    case 'glossary': return `${arNum(GLOSSARY.length)} مصطلح`;
    case 'cards': return `${arNum(GLOSSARY.length)} بطاقة مراجعة`;
    case 'term-quiz': return `${arNum(GLOSSARY.length)} مصطلح`;
    case 'quiz-day': {
      const day = +arg || TRIAL_UNIT_DAY;
      return `اختبار اليوم ${arNum(day)} — ${arNum(dayQuizQuestions(day))} سؤال`;
    }
    case 'day': {
      const day = +arg || TRIAL_UNIT_DAY;
      return `اليوم ${arNum(day)} — ${arNum(dayUnits(day).length)} وحدات · ${arNum(dayQuizQuestions(day))} سؤال`;
    }
    case 'unit': return `${arNum(UNIT_LIST.length - TRIAL_UNITS.size)} وحدة أخرى`;
    default: return '';
  }
}
function lockTrialView(what, arg) {
  const v = $('#view'); if (!v) return;
  const labels = {
    practical: 'الجزء العملي', quizzes: 'الاختبارات', exam: 'الامتحان الشامل',
    past: 'امتحانات جامعة دمياط', glossary: 'قاموس المصطلحات', cards: 'بطاقات المراجعة',
    'term-quiz': 'اختبار المصطلحات', 'quiz-day': 'اختبار اليوم', day: 'اليوم',
    unit: 'باقي الوحدات'
  };
  let title = labels[what] || 'هذا القسم للمشتركين';
  if ((what === 'day' || what === 'quiz-day') && arg) title += ` ${arNum(+arg)}`;
  const detail = trialLockedDetail(what, arg);
  v.querySelectorAll('a, button, input, textarea, select, .term, .opt, .q-card, .day-head').forEach(el => {
    el.style.pointerEvents = 'none';
    el.setAttribute('tabindex', '-1');
    el.setAttribute('aria-disabled', 'true');
  });
  const strip = document.createElement('div');
  strip.className = 'trial-lock-strip';
  strip.style.cssText = 'display:flex;gap:12px;align-items:center;flex-wrap:wrap;margin-bottom:18px;padding:12px 14px;border:1px solid rgba(255,196,64,.35);border-radius:14px;background:rgba(255,196,64,.08)';
  strip.innerHTML = `<span class="lock-chip">🔒 ${esc(detail || title)}</span><button class="btn sm" data-lock="${esc(title)}">✦ اشترك</button>`;
  (v.querySelector('.reader') || v).prepend(strip);
}
function viewTrialLocked(what, arg) {
  const day = +arg || TRIAL_UNIT_DAY;
  TRIAL_PREVIEW = true;
  try {
    switch (what) {
      case 'practical': viewPractical(); break;
      case 'exam': viewExam(); break;
      case 'past': (arg && PAST_EXAMS.some(x => x.id === arg) ? viewPastExam(arg) : viewPastExams()); break;
      case 'glossary': viewGlossary(); break;
      case 'cards': viewCards(); break;
      case 'term-quiz': viewTermQuiz(); break;
      case 'quizzes': viewQuizzes(); break;
      case 'quiz-day': viewDayQuiz(day); break;
      case 'day': viewDay(day); break;
      case 'unit': viewUnit(arg); break;
      default: viewHome();
    }
  } finally { TRIAL_PREVIEW = false; }
  lockTrialView(what, arg);
}
function decorateTrial() {
  if (!TRIAL) return;
  if (!$('#subTop') && $('#themeBtn')) {
    const b = document.createElement('button');
    b.className = 'btn sm'; b.id = 'subTop'; b.title = 'اشترك لفتح باقي المقرر';
    b.textContent = '✦ اشترك الآن';
    $('#themeBtn').before(b);
  }
}
/* شريط صغير فوق أي صفحة مقفولة: نفس الصفحة الأصلية + العدد الحقيقي */
function trialLockNote(what, arg) {
  const d = trialLockedDetail(what, arg);
  return d ? `<span class="lock-chip">🔒 ${esc(d)}</span>` : '';
}

/* ---------------- router ---------------- */
function router() {
  const hash = location.hash || '#/home';
  const clean = hash.split('?')[0];
  const parts = clean.replace(/^#\//, '').split('/');
  const view = $('#view');
  if (TRIAL && !trialRouteOK(parts)) return viewTrialLocked(parts[0], parts[1]);
  currentUnit = null;
  clearTimeout(scrollTimer);
  if (parts[0] !== 'exam') clearExamTopTimer();
  window.scrollTo({ top: 0, behavior: 'instant' });
  if (parts[0] === 'unit') return viewUnit(parts[1]);
  if (parts[0] === 'day') return viewDay(+parts[1]);
  if (parts[0] === 'plan') return viewPlan();
  if (parts[0] === 'glossary') return viewGlossary();
  if (parts[0] === 'cards') return viewCards();
  if (parts[0] === 'term-quiz') return viewTermQuiz();
  if (parts[0] === 'quizzes') return viewQuizzes();
  if (parts[0] === 'exam') return viewExam();
  if (parts[0] === 'past') return parts[1] ? viewPastExam(parts[1]) : viewPastExams();
  if (parts[0] === 'practical') return viewPractical();
  return viewHome();
}
window.addEventListener('hashchange', () => { renderSidebar(); router(); });

/* ---------------- home ---------------- */
function viewHome() {
  const d = doneCount(), p = pct();
  const last = state.last && UNITS[state.last] ? state.last : UNIT_LIST[0];
  const lastU = UNITS[last];
  const plan = currentPlanDay();
  const planP = dayProgress(plan.day);
  const pos = Math.round(state.positions[last] || 0);
  const quizAvg = avgQuizScore();
  const streak = studyStreak();
  const due = dueFlashcards();
  const weak = Object.keys(state.weak || {}).length;
  $('#view').innerHTML = `
  <section class="hero">
    <div class="hero-dots" aria-hidden="true"><i></i><i></i><i></i></div>
    <h2>مقرر الحيوان العام</h2>
    ${!TRIAL && currentUserName() ? `<p class="muted" style="margin:0 0 8px">مرحباً، <b>${esc(currentUserName())}</b></p>` : ''}
    <p>كتاب تفاعلي شامل: شرح مختصر ومركّز، قراءة صوتية احترافية، مصطلحات، بطاقات مراجعة، واختبارات على كل جزئية — كلية الزراعة، جامعة دمياط.${TRIAL ? ' النسخة التجريبية تفتح اليوم الأول كامل.' : ''}</p>
    <div class="hero-meta">
      <span class="pill">${arNum(totalUnits)} وحدة</span>
      <span class="pill">${arNum(BOOK.plan.length)} أيام</span>
      <span class="pill">${arNum(GLOSSARY.length)} مصطلح</span>
      <span class="pill">${arNum(quizCount())} سؤال</span>
    </div>
    <div class="hero-actions">
      ${TRIAL ? `<button class="btn light" data-go="#/day/${TRIAL_UNIT_DAY}">ابدأ اليوم الأول ←</button>` : `<button class="btn light" data-go="#/unit/${last}">${state.last ? 'كمّل من حيث توقفت' : 'ابدأ المذاكرة'} ←</button>`}
      <button class="btn ghost" data-go="#/plan">خطة الأسبوع</button>
      ${TRIAL ? '<button class="btn ghost" data-lock="الامتحان الشامل">✦ اشترك</button>' : '<button class="btn ghost" data-go="#/exam">امتحان شامل</button>'}
    </div>
    ${socialBar()}
  </section>

  <div class="grid g4" style="margin-bottom:18px">
    <div class="card stat"><span class="num">${arNum(p)}%</span><span class="lbl">الإنجاز العام</span></div>
    <div class="card stat"><span class="num">${arNum(quizAvg)}%</span><span class="lbl">متوسط الاختبارات</span></div>
    <div class="card stat"><span class="num">${arNum(streak)}</span><span class="lbl">أيام متتالية</span></div>
    <div class="card stat"><span class="num">${arNum(due)}</span><span class="lbl">بطاقات مستحقة</span></div>
  </div>

  <div class="grid g2">
    <div class="card">
      <div style="display:flex;gap:16px;align-items:center">
        <div class="ring" style="--p:${p}"><span>${arNum(p)}%</span></div>
        <div style="flex:1">
          <h3 style="margin-bottom:4px">تقدّمك العام</h3>
          <p class="muted small" style="margin:0">${arNum(d)} من ${arNum(totalUnits)} وحدة. كمّل وحدة واحدة كل جلسة، وراجع بالمصطلحات.</p>
        </div>
      </div>
      <div class="divider"></div>
      <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:6px;gap:10px">
        <span>آخر وحدة: <b>${esc(lastU.title)}</b></span><span class="muted">${esc(lastU.pages ? 'ص ' + lastU.pages : '')}</span>
      </div>
      <div class="small muted" style="margin-bottom:8px">آخر موضع قراءة: ${pos ? arNum(pos) + ' بكسل' : 'البداية'}</div>
      ${TRIAL ? `<button class="btn soft sm" data-go="#/day/${TRIAL_UNIT_DAY}">كمّل من هنا</button>` : `<button class="btn soft sm" data-go="#/unit/${last}">كمّل من هنا</button>`}
    </div>

    <div class="card">
      <h3>خطة اليوم ${arNum(plan.day)}</h3>
      <p class="muted small">${esc(plan.goal || '')}</p>
      <div class="progress" style="margin:12px 0 6px"><i style="width:${planP}%"></i></div>
      <div class="small muted">اليوم ${arNum(plan.day)} — ${arNum(planP)}%</div>
      <div style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap">
        <button class="btn soft sm" data-go="#/day/${plan.day}">ابدأ اليوم ${arNum(plan.day)}</button>
        ${TRIAL ? `<button class="btn outline sm" data-go="#/cards?day=${TRIAL_UNIT_DAY}">راجع بطاقات اليوم الأول</button>` : `<button class="btn outline sm" data-go="#/cards">راجع ${arNum(due)} بطاقة</button>`}
      </div>
    </div>
  </div>

  <h3 style="margin:26px 0 12px">الأيام السبعة</h3>
  <div class="grid g2">${BOOK.plan.map(dayCard).join('')}</div>

  <h3 style="margin:26px 0 12px">روابط سريعة</h3>
  <div class="grid g4">
    ${TRIAL ? `<button class="card locked-card" style="text-align:right" data-lock="قاموس المصطلحات"><span class="lock-chip">🔒 اشترك</span><h3>${icon('book')} قاموس المصطلحات</h3><p class="muted small" style="margin:0">${arNum(GLOSSARY.length)} مصطلح بالعربي والإنجليزي مع النطق.</p></button>
    <button class="card locked-card" style="text-align:right" data-lock="بطاقات المراجعة"><span class="lock-chip">🔒 اشترك</span><h3>${icon('cards')} بطاقات المراجعة</h3><p class="muted small" style="margin:0">${arNum(GLOSSARY.length)} بطاقة مراجعة.</p></button>
    <button class="card locked-card" style="text-align:right" data-lock="الاختبارات"><span class="lock-chip">🔒 اشترك</span><h3>${icon('quiz')} الاختبارات</h3><p class="muted small" style="margin:0">${arNum(quizCount())} سؤال على الوحدات.</p></button>
    <button class="card locked-card" style="text-align:right" data-lock="الجزء العملي"><span class="lock-chip">🔒 اشترك</span><h3>${icon('flask')} الجزء العملي</h3><p class="muted small" style="margin:0">${arNum(practicalUnits.length)} وحدة عملية — الأنسجة والشرائح.</p></button>
    <button class="card locked-card" style="text-align:right" data-lock="امتحانات جامعة دمياط"><span class="lock-chip">🔒 اشترك</span><h3>${icon('archive')} امتحانات جامعة دمياط</h3><p class="muted small" style="margin:0">${arNum(PAST_EXAMS.length)} نماذج (٢٠١٦–٢٠٢٥) مع تصحيح فوري.</p></button>` : `<button class="card" style="text-align:right" data-go="#/glossary"><h3>${icon('book')} قاموس المصطلحات</h3><p class="muted small" style="margin:0">${arNum(GLOSSARY.length)} مصطلح بالعربي والإنجليزي مع النطق.</p></button>
    <button class="card" style="text-align:right" data-go="#/cards"><h3>${icon('cards')} بطاقات المراجعة</h3><p class="muted small" style="margin:0">${arNum(due)} مستحقة اليوم من أصل ${arNum(GLOSSARY.length)}.</p></button>
    <button class="card" style="text-align:right" data-go="#/quizzes"><h3>${icon('quiz')} نقاط ضعفي</h3><p class="muted small" style="margin:0">${arNum(weak)} سؤال محفوظ — راجع اختبارات الوحدات.</p></button>
    <button class="card" style="text-align:right" data-go="#/practical"><h3>${icon('flask')} الجزء العملي</h3><p class="muted small" style="margin:0">الأنسجة، الأدوات، والشرائح مع الصور.</p></button>
    <button class="card" style="text-align:right" data-go="#/past"><h3>${icon('archive')} امتحانات دمياط</h3><p class="muted small" style="margin:0">${arNum(PAST_EXAMS.length)} نموذج (٢٠١٦–٢٠٢٥) مع تصحيح فوري.</p></button>`}
  </div>`;
  bindGo();
  bindTasks();
  if (TRIAL) {
    $$('.day-card', $('#view')).forEach((card, i) => {
      const day = (BOOK.plan[i] || {}).day;
      const btn = card.querySelector('[data-go^="#/day/"]');
      if (!btn || !day) return;
      if (day !== TRIAL_UNIT_DAY) {
        delete btn.dataset.go;
        btn.dataset.lock = 'اليوم ' + arNum(day);
        btn.innerHTML = '<span class="lock-chip">🔒</span> مقفول — اشترك';
      }
    });
  }
  $$('.day-head[data-toggle]').forEach(el => el.onclick = () => el.closest('.day-card').classList.toggle('open'));
}

/* ---------------- plan ---------------- */
function viewPlan() {
  $('#view').innerHTML = `
  <div class="reader">
    <h1>خطة الأسبوع</h1>
    <p class="muted">${esc(BOOK.meta.planNote || 'سبعة أيام: شرح وفهم، ثم مراجعة نشطة، ثم حل أسئلة على كل جزئية. الوقت المقدّر ٣ ساعات يوميًا، ويمكن تقسيمه على فترتين.')}</p>
    <div class="grid" style="gap:14px;margin-top:18px">
      ${BOOK.plan.map(d => {
        const pr = dayProgress(d.day);
        return `<div class="card">
          <div style="display:flex;gap:14px;align-items:center;flex-wrap:wrap">
            <div class="day-num" style="background:var(--accent-soft);color:var(--accent)">${arNum(d.day)}</div>
            <div style="flex:1;min-width:200px">
              <h3>${esc(d.title)}</h3>
              <div class="muted small">${esc(d.goal)} · ${esc(d.hours || 3)} ساعات</div>
            </div>
            <div class="badge ${pr === 100 ? 'ok' : 'gold'}">${arNum(pr)}%</div>
          </div>
          <div class="progress" style="margin:12px 0"><i style="width:${pr}%"></i></div>
          <div class="grid g2" style="gap:6px">
            ${d.tasks.map((t, i) => `<div class="small muted">• ${esc(t.t)}</div>`).join('')}
          </div>
          <div style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap">
            ${TRIAL && !TRIAL_PREVIEW && d.day !== TRIAL_UNIT_DAY ? `<button class="btn soft sm" data-lock="اليوم ${arNum(d.day)}">🔖 ابدأ</button>
            <button class="btn outline sm" data-lock="بطاقات المراجعة">بطاقات اليوم 🔒</button>
            <button class="btn outline sm" data-lock="اختبار اليوم ${arNum(d.day)}">اختبار اليوم 🔒</button>` : `<a class="btn soft sm" href="#/day/${d.day}">ابدأ</a>
            <a class="btn outline sm" href="#/cards?day=${d.day}">بطاقات اليوم</a>
            <a class="btn outline sm" href="#/quiz-day/${d.day}">اختبار اليوم</a>`}
          </div>
        </div>`;
      }).join('')}
    </div>
  </div>`;
}

/* ---------------- day ---------------- */
function viewDay(day) {
  const d = BOOK.plan.find(x => x.day === day);
  if (!d) return viewHome();
  const ids = dayUnits(day);
  $('#view').innerHTML = `
  <div class="reader">
    <div class="crumbs"><a href="#/home">الرئيسية</a> / اليوم ${arNum(day)}</div>
    <h1>${esc(d.title)}</h1>
    <p class="muted">${esc(d.goal)}</p>
    <div class="reader-meta">
      <span class="tag accent">${arNum(ids.length)} وحدات</span>
      <span class="tag">${esc(d.hours || 3)} ساعات</span>
      <span class="tag">${arNum(dayProgress(day))}% مكتمل</span>
    </div>
    <div class="card" style="margin-bottom:18px">
      <h3>مهام اليوم</h3>
      ${d.tasks.map((t, i) => {
        const k = `d${d.day}_${i}`;
        const checked = state.tasks[k] ? 'checked' : '';
        return `<label class="task ${checked ? 'done' : ''}">
          <input type="checkbox" data-task="${k}" ${checked}>
          <span>${esc(t.t)} ${t.unit ? (TRIAL && !TRIAL_PREVIEW && !TRIAL_UNITS.has(t.unit) ? '<span class="lock-chip">🔒 اشترك</span>' : `<a href="#/unit/${t.unit}" class="small">فتح الوحدة</a>`) : (t.go ? (TRIAL && !TRIAL_PREVIEW ? '<span class="lock-chip">🔒 اشترك</span>' : `<a href="${esc(t.go)}" class="small">فتح القسم</a>`) : '')}</span>
        </label>`;
      }).join('')}
    </div>
    <div class="grid" style="gap:10px">
      ${ids.map(id => {
        if (TRIAL && !TRIAL_PREVIEW && !TRIAL_UNITS.has(id)) {
          const u = UNITS[id];
          return `<div class="card locked-card" style="padding:14px 16px"><span class="lock-chip">🔒 اشترك</span> <b>${esc(u && u.title || id)}</b> <span class="small muted">${arNum((u && u.blocks || []).length)} أقسام</span></div>`;
        }
        return unitRow(UNITS[id]);
      }).join('')}
    </div>
    <div style="margin-top:20px;display:flex;gap:10px;flex-wrap:wrap">
      ${TRIAL && !TRIAL_PREVIEW && day !== TRIAL_UNIT_DAY ? `<button class="btn" data-lock="اختبار اليوم ${arNum(day)}">🔒 اختبار اليوم — ${arNum(dayQuizQuestions(day))} سؤال</button>
      <button class="btn outline" data-lock="بطاقات المراجعة">🔒 بطاقات اليوم</button>` : `<a class="btn" href="#/quiz-day/${day}">اختبار اليوم</a>
      <a class="btn outline" href="#/cards?day=${day}">بطاقات اليوم</a>`}
    </div>
  </div>`;
  bindTasks();
}

/* ---------------- unit reader ---------------- */
let currentUnit = null;
let spokenInUnit = new Map();
let scrollTimer = null;
window.addEventListener('scroll', () => {
  const id = currentUnit && currentUnit.id;
  if (!id) return;
  clearTimeout(scrollTimer);
  scrollTimer = setTimeout(() => {
    if (currentUnit && currentUnit.id === id) {
      state.positions[id] = Math.round(window.scrollY);
      save();
    }
  }, 250);
}, { passive: true });

function viewUnit(id) {
  const u = UNITS[id];
  if (!u) return viewHome();
  currentUnit = u;
  spokenInUnit = new Map();
  state.last = id; state.visited[id] = true; markStudyDay();
  const d = BOOK.plan.find(x => x.day === u.day);
  const terms = u.terms || [];
  const blocksHtml = (u.blocks || []).map((b, i) => renderBlock(b, i)).join('');

  $('#view').innerHTML = `
  <div class="reader" id="reader">
    <div class="crumbs"><a href="#/home">الرئيسية</a> / <a href="#/day/${u.day}">اليوم ${arNum(u.day)}</a> / الوحدة ${arNum(u.no)}</div>
    <h1>${esc(u.title)}</h1>
    <div><span lang="en" dir="ltr" class="en">${esc(u.titleEn || '')}</span></div>
    <div class="reader-meta">
      <span class="tag accent">${u.part === 'practical' ? 'عملي' : 'نظري'}</span>
      ${u.pages ? `<span class="tag">ص ${esc(u.pages)}</span>` : ''}
      ${u.minutes ? `<span class="tag">${arNum(u.minutes)} دقيقة</span>` : ''}
      ${state.done[id] ? '<span class="tag" style="color:var(--ok)">✓ مكتملة</span>' : ''}
    </div>

    <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:18px" class="no-print">
      <button class="btn" id="listenBtn">▶ استمع للوحدة</button>
      <button class="btn outline" id="markBtn">${state.done[id] ? 'إلغاء الإكمال' : '✓ علّم كمكتملة'}</button>
      <button class="btn outline" id="printBtn">${icon('print')} طباعة</button>
    </div>

    ${u.summary ? `<div class="summary"><h3>الخلاصة في سطور</h3><p>${esc(u.summary)}</p></div>` : ''}

    <div id="blocks">${blocksHtml}</div>

    ${u.note ? `<div class="card note-card" style="margin-top:18px;border-color:var(--gold)"><b style="color:var(--gold)">ملاحظة للمراجعة:</b> ${esc(u.note)}</div>` : ''}

    ${terms.length ? `<h3 style="margin:26px 0 10px">مصطلحات الوحدة</h3>
      <div class="g-list">${terms.map(termCard).join('')}</div>` : ''}

    ${(u.quiz && u.quiz.length) ? `
      <h3 style="margin:28px 0 10px">اختبر نفسك</h3>
      <div id="unitQuiz">${renderQuestions(u.quiz, 'uq_' + id)}</div>
      <div class="q-actions">
        <button class="btn" id="checkQuiz">صحّح الإجابات</button>
        <button class="btn outline" id="resetQuiz">إعادة</button>
        <span class="muted small" id="quizScore"></span>
      </div>` : ''}

    <div class="divider"></div>
    <div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap">
      ${prevUnit(id) ? `<a class="btn outline" href="#/unit/${prevUnit(id)}">→ السابق</a>` : '<span></span>'}
      ${nextUnit(id) ? `<a class="btn" href="#/unit/${nextUnit(id)}">التالي ←</a>` : '<span></span>'}
    </div>
  </div>`;

  const savedPos = +(state.positions[id] || 0);
  if (savedPos > 0) setTimeout(() => window.scrollTo({ top: savedPos, behavior: 'instant' }), 0);
  linkTerms($('#blocks'));
  linkTerms($('.summary'));
  linkTerms($('.note-card'));
  bindUnit(u);
  if (u.quiz) bindQuiz(u.quiz, 'uq_' + id);
}

function renderBlock(b, i) {
  let inner = '';
  if (b.t === 'p') inner = `<p>${esc(b.x)}</p>`;
  else if (b.t === 'h') inner = `<h4>${esc(b.x)}</h4>`;
  else if (b.t === 'note') inner = `<div class="note"><b>💡 </b>${esc(b.x)}</div>`;
  else if (b.t === 'def') inner = `<div class="def"><b>${esc(b.ar)}</b>${b.en ? ` <span lang="en" dir="ltr" class="en small">${esc(b.en)}</span>` : ''}<br>${esc(b.x)}</div>`;
  else if (b.t === 'ul') inner = `<ul>${(b.items || []).map(x => `<li>${esc(x)}</li>`).join('')}</ul>`;
  else if (b.t === 'table') inner = `<div class="table-wrap"><table><thead><tr>${(b.head || []).map(x => `<th>${esc(x)}</th>`).join('')}</tr></thead><tbody>${(b.rows || []).map(r => `<tr>${r.map(c => `<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  else if (b.t === 'img') inner = `<figure style="margin:14px 0"><img src="${esc(b.src)}" alt="${esc(b.cap || '')}" style="width:100%;border-radius:14px;border:1px solid var(--line)"><figcaption class="small muted" style="margin-top:6px">${esc(b.cap || '')}</figcaption></figure>`;
  return `<div class="blk" data-i="${i}">${inner}</div>`;
}

function termCard(t) {
  const key = esc(t.ar);
  return `<div class="g-item" data-term="${key}">
    <div class="top"><b>${esc(t.ar)}</b><span lang="en" dir="ltr" class="en">${esc(t.en || '')}</span>
      <button class="icon-btn sm say" data-say="${key}" title="نطق المصطلح">🔊</button></div>
    <p>${esc(t.def)}</p>
  </div>`;
}

function bindUnit(u) {
  $('#listenBtn')?.addEventListener('click', () => startUnitAudio(u));
  $('#markBtn')?.addEventListener('click', () => {
    state.done[u.id] = !state.done[u.id];
    save(); viewUnit(u.id); renderSidebar();
    toast(state.done[u.id] ? 'تم تعليم الوحدة كمكتملة ✓' : 'تم إلغاء الإكمال');
  });
  $('#printBtn')?.addEventListener('click', () => window.print());
  $$('[data-say]').forEach(el => el.addEventListener('click', e => {
    e.stopPropagation();
    const t = termMap.get(el.dataset.say);
    if (t) speakTerm(t);
  }));
}

function prevUnit(id) { const i = UNIT_LIST.indexOf(id); return i > 0 ? UNIT_LIST[i - 1] : null; }
function nextUnit(id) { const i = UNIT_LIST.indexOf(id); return i < UNIT_LIST.length - 1 ? UNIT_LIST[i + 1] : null; }

/* ---------------- term linking ---------------- */
function linkTerms(root) {
  if (!root) return;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) {
    const n = walker.currentNode;
    if (n.nodeValue.trim().length > 2) nodes.push(n);
  }
  for (const node of nodes) {
    const text = node.nodeValue;
    const ranges = [];
    for (const key of TERM_KEYS) {
      if (ranges.length >= MAX_LINK) break;
      if (key.length < 3) continue;
      let idx = text.indexOf(key);
      while (idx !== -1) {
        const end = idx + key.length;
        const overlap = ranges.some(r => !(end <= r[0] || idx >= r[1]));
        if (!overlap) { ranges.push([idx, end, key]); break; }
        idx = text.indexOf(key, idx + 1);
      }
    }
    if (!ranges.length) continue;
    ranges.sort((a, b) => a[0] - b[0]);
    let html = '', pos = 0;
    for (const [s, e, key] of ranges) {
      html += esc(text.slice(pos, s));
      const matched = text.slice(s, e);
      if (key.includes(' ')) {
        html += matched.split(/(\s+)/).map(part => /^\s+$/.test(part)
          ? part
          : `<span class="term" data-term="${esc(key)}" title="اضغط لسماع المصطلح">${esc(part)}</span>`).join('');
      } else {
        html += `<span class="term" data-term="${esc(key)}" title="اضغط لسماع المصطلح">${esc(matched)}</span>`;
      }
      pos = e;
    }
    html += esc(text.slice(pos));
    const span = document.createElement('span');
    span.innerHTML = html;
    node.parentNode.replaceChild(span, node);
  }
  $$('.term', root).forEach(el => el.addEventListener('click', e => {
    e.preventDefault(); e.stopPropagation();
    const key = el.dataset.term;
    const t = termMap.get(key);
    if (!t) return;
    const said = t.ar && t.ar.trim();
    if (!isImportantTerm(t)) {
      const n = spokenInUnit.get(said) || 0;
      if (n >= 2) return;
      spokenInUnit.set(said, n + 1);
    }
    speakTerm(t);
  }));
}

let popTerm = null;
function showTerm(key, anchor) {
  const t = termMap.get(key);
  if (!t) return;
  popTerm = t;
  const pop = $('#termPop');
  pop.innerHTML = `<b>${esc(t.ar)}</b><div><span lang="en" dir="ltr" class="en">${esc(t.en || '')}</span></div>
    <p>${esc(t.def)}</p>
    <div class="row"><button class="btn sm" id="sayPop">🔊 اسمع النطق</button></div>`;
  pop.classList.add('open');
  const r = anchor.getBoundingClientRect();
  const w = 340, h = pop.offsetHeight || 160;
  let left = Math.min(window.innerWidth - w - 12, Math.max(12, r.left));
  let top = r.bottom + 8;
  if (top + h > window.innerHeight - 12) top = Math.max(12, r.top - h - 8);
  pop.style.left = left + 'px'; pop.style.top = top + 'px';
  $('#sayPop').onclick = () => speakTerm(t);
}
document.addEventListener('click', e => {
  if (!e.target.closest('.term') && !e.target.closest('#termPop')) $('#termPop').classList.remove('open');
});

/* ---------------- quizzes ---------------- */
function renderQuestions(qs, prefix) {
  return qs.map((q, i) => `
    <div class="q-card" data-q="${i}">
      <div class="q-head"><div class="q-no">${arNum(i + 1)}</div><div class="q-text">${esc(q.q)}</div></div>
      <div class="opts">
        ${q.o.map((o, j) => `<div class="opt" data-q="${i}" data-o="${j}"><span class="key">${'أبجد'[j] || (j + 1)}</span><span>${esc(o)}</span></div>`).join('')}
      </div>
      <div class="explain" id="${prefix}_e${i}">${q.e ? '💡 ' + esc(q.e) : ''}</div>
    </div>`).join('');
}

function bindQuiz(qs, prefix, opts) {
  opts = opts || {};
  const answered = {};
  $$('.opt').forEach(el => el.addEventListener('click', () => {
    const qi = +el.dataset.q, oi = +el.dataset.o;
    if (answered[qi]) return;
    answered[qi] = oi;
    const card = el.closest('.q-card');
    $$('.opt', card).forEach(x => x.classList.remove('sel'));
    el.classList.add('sel');
    const q = qs[qi];
    $$('.opt', card).forEach(x => {
      const j = +x.dataset.o;
      if (j === q.a) x.classList.add('correct');
      else if (j === oi) x.classList.add('wrong');
    });
    $(`#${prefix}_e${qi}`)?.classList.add('show');
    updateQuizScore(qs, answered, prefix);
  }));
  const btn = $('#checkQuiz');
  if (btn) btn.onclick = () => {
    let score = 0;
    qs.forEach((q, i) => { if (answered[i] === q.a) score++; });
    const el = $('#quizScore');
    if (el) el.innerHTML = `نتيجتك: <b>${arNum(score)} / ${arNum(qs.length)}</b>`;
    const u = currentUnit;
    if (opts.onCheck) opts.onCheck(score, qs.length);
    else if (u && u.quiz === qs) {
      state.quiz[u.id] = { score, total: qs.length, date: Date.now() };
      markStudyDay();
    }
    toast(`نتيجتك ${arNum(score)} من ${arNum(qs.length)}`);
  };
  const reset = $('#resetQuiz');
  if (reset) reset.onclick = () => { if (opts.onReset) opts.onReset(); else if (currentUnit) viewUnit(currentUnit.id); };
}

function updateQuizScore(qs, answered, prefix) {
  let score = 0;
  qs.forEach((q, i) => { if (answered[i] === q.a) score++; });
  const el = $('#quizScore');
  if (el) el.textContent = `أجبت عن ${arNum(Object.keys(answered).length)} من ${arNum(qs.length)}`;
}

/* ---------------- quizzes hub ---------------- */
function viewQuizzes() {
  $('#view').innerHTML = `
  <div class="reader">
    <h1>الاختبارات</h1>
    <p class="muted">اختبار قصير بعد كل وحدة، واختبار لكل يوم. التصحيح فوري مع شرح الإجابة.</p>
    <div class="grid g2" style="margin-top:18px">
      ${BOOK.plan.map(d => {
        const ids = dayUnits(d.day);
        const qn = ids.reduce((n, id) => n + (UNITS[id].quiz?.length || 0), 0);
        return `<div class="card">
          <h3>اختبار اليوم ${arNum(d.day)}</h3>
          <p class="muted small">${esc(d.short || d.title)} · ${arNum(qn)} سؤال</p>
          <div class="progress" style="margin:10px 0"><i style="width:${dayProgress(d.day)}%"></i></div>
          <a class="btn soft sm" href="#/quiz-day/${d.day}">ابدأ الاختبار</a>
        </div>`;
      }).join('')}
    </div>
    <h3 style="margin:26px 0 10px">اختبارات الوحدات</h3>
    <div class="grid" style="gap:8px">
      ${UNIT_LIST.filter(id => UNITS[id].quiz?.length).map(id => {
        const u = UNITS[id], sc = state.quiz[id];
        return `<a class="card" style="display:flex;align-items:center;gap:12px;color:inherit;padding:14px 16px" href="#/unit/${id}">
          <span class="q-no">${arNum(u.no)}</span>
          <span style="flex:1"><b style="font-size:14.5px">${esc(u.title)}</b>
          <span class="muted small" style="display:block">${arNum(u.quiz.length)} أسئلة</span></span>
          ${sc ? `<span class="badge ${sc.score === sc.total ? 'ok' : 'gold'}">${arNum(sc.score)}/${arNum(sc.total)}</span>` : '<span class="badge">لم يُحل</span>'}
        </a>`;
      }).join('')}
    </div>
  </div>`;
}

/* ---------------- past exams (Damietta University) ---------------- */
function viewPastExams() {
  $('#view').innerHTML = `
  <div class="reader">
    <h1>امتحانات جامعة دمياط</h1>
    <p class="muted">نماذج من امتحانات الحيوان العام (٢٠١٦–٢٠٢٥) من مستودع امتحانات جامعة دمياط — MCQ وصح/غلط، تصحيح فوري مع شرح.</p>
    <div class="grid g2" style="margin-top:18px">
      ${PAST_EXAMS.map(ex => {
        const sc = state.pastQuiz[ex.id];
        return `<div class="card">
          <h3>${esc(ex.title)}</h3>
          <p class="muted small">${esc(ex.year)} · ${arNum(ex.questions.length)} سؤال</p>
          ${sc ? `<p class="small">آخر نتيجة: <b>${arNum(sc.score)}/${arNum(sc.total)}</b></p>` : '<p class="muted small">لم يُحل</p>'}
          <a class="btn soft sm" href="#/past/${ex.id}">ابدأ الامتحان</a>
        </div>`;
      }).join('')}
    </div>
  </div>`;
}
function viewPastExam(id) {
  const ex = PAST_EXAMS.find(x => x.id === id);
  if (!ex) return viewPastExams();
  const qs = ex.questions;
  $('#view').innerHTML = `
  <div class="reader">
    <div class="crumbs"><a href="#/home">الرئيسية</a> / <a href="#/past">امتحانات دمياط</a> / ${esc(ex.year)}</div>
    <h1>${esc(ex.title)}</h1>
    <p class="muted">${esc(ex.source)} — ${arNum(qs.length)} سؤال</p>
    <div id="pastQuiz">${renderQuestions(qs, 'pq_' + id)}</div>
    <div class="q-actions">
      <button class="btn" id="checkQuiz">صحّح الإجابات</button>
      <button class="btn outline" id="resetQuiz">إعادة</button>
      <span class="muted small" id="quizScore"></span>
    </div>
  </div>`;
  bindQuiz(qs, 'pq_' + id, {
    onCheck: (score, total) => {
      state.pastQuiz[id] = { score, total, date: Date.now() };
      markStudyDay();
      toast('نتيجتك ' + arNum(score) + ' من ' + arNum(total));
    },
    onReset: () => viewPastExam(id)
  });
}

/* ---------------- term quiz ---------------- */
function viewTermQuiz() {
  const deck = shuffle(GLOSSARY.slice()).slice(0, 10);
  let dir = 'en2ar', answered = {}, qs = [];
  const build = () => deck.map(t => {
    const sameUnit = GLOSSARY.filter(x => x.unit === t.unit && x.ar !== t.ar);
    const distract = shuffle(sameUnit.slice()).slice(0, 3);
    while (distract.length < 3) {
      const x = GLOSSARY[Math.floor(Math.random() * GLOSSARY.length)];
      if (x && x.ar !== t.ar && !distract.some(d => d.ar === x.ar)) distract.push(x);
    }
    const opts = shuffle([t, ...distract]);
    return {
      q: dir === 'en2ar' ? (t.en || t.ar) : t.ar,
      o: opts.map(x => dir === 'en2ar' ? x.ar : (x.en || x.ar)),
      a: opts.findIndex(x => x.ar === t.ar),
      e: t.def
    };
  });
  const draw = () => {
    qs = build(); answered = {};
    $('#tqDir').innerHTML = dir === 'en2ar'
      ? 'الاتجاه: إنجليزي ← عربي <span class="small muted">(اضغط للعكس)</span>'
      : 'الاتجاه: عربي ← إنجليزي <span class="small muted">(اضغط للعكس)</span>';
    $('#tqScore').textContent = `أجبت عن ${arNum(0)} من ${arNum(qs.length)}`;
    $('#tqResult').textContent = '';
    $('#tqQuiz').innerHTML = qs.map((q, i) => `
      <div class="q-card" data-q="${i}">
        <div class="q-head"><div class="q-no">${arNum(i + 1)}</div><div class="q-text">${dir === 'en2ar' ? `<span lang="en" dir="ltr" class="en">${esc(q.q)}</span>` : esc(q.q)}</div></div>
        <div class="opts">${q.o.map((o, j) => `<div class="opt" data-q="${i}" data-o="${j}"><span class="key">${'أبجد'[j] || (j + 1)}</span><span>${dir === 'en2ar' ? esc(o) : `<span lang="en" dir="ltr" class="en">${esc(o)}</span>`}</span></div>`).join('')}</div>
        <div class="explain" id="tqe_${i}">💡 ${esc(q.e)}</div>
      </div>`).join('');
    $$('#tqQuiz .opt').forEach(el => el.addEventListener('click', () => {
      const qi = +el.dataset.q, oi = +el.dataset.o;
      if (answered[qi] !== undefined) return;
      answered[qi] = oi;
      const card = el.closest('.q-card');
      $$('.opt', card).forEach(x => {
        const j = +x.dataset.o;
        if (j === qs[qi].a) x.classList.add('correct');
        else if (j === oi) x.classList.add('wrong');
      });
      $(`#tqe_${qi}`).classList.add('show');
      $('#tqScore').textContent = `أجبت عن ${arNum(Object.keys(answered).length)} من ${arNum(qs.length)}`;
    }));
  };
  $('#view').innerHTML = `
  <div class="reader">
    <h1>اختبار المصطلحات</h1>
    <p class="muted">${arNum(10)} أسئلة: اقرأ المصطلح واختر معناه. الشرح يظهر بعد الإجابة.</p>
    <div class="g-tools" style="margin-top:14px">
      <button class="btn soft" id="tqDir"></button>
      <span class="badge" id="tqScore"></span>
    </div>
    <div id="tqQuiz"></div>
    <div class="q-actions">
      <button class="btn" id="tqCheck">صحّح الإجابات</button>
      <button class="btn outline" id="tqReset">أسئلة جديدة</button>
      <span class="muted small" id="tqResult"></span>
    </div>
  </div>`;
  $('#tqDir').onclick = () => { dir = dir === 'en2ar' ? 'ar2en' : 'en2ar'; draw(); };
  $('#tqReset').onclick = () => viewTermQuiz();
  $('#tqCheck').onclick = () => {
    let score = 0;
    qs.forEach((q, i) => { if (answered[i] === q.a) score++; });
    $('#tqResult').innerHTML = `نتيجتك: <b>${arNum(score)} / ${arNum(qs.length)}</b>`;
    state.quiz['terms'] = { score, total: qs.length, date: Date.now() };
    save();
    toast(`نتيجتك ${arNum(score)} من ${arNum(qs.length)}`);
  };
  draw();
}

/* ---------------- day quiz ---------------- */
function viewDayQuiz(day) {
  const ids = dayUnits(day);
  const qs = [];
  ids.forEach(id => (UNITS[id].quiz || []).forEach(q => qs.push(q)));
  if (!qs.length) return viewQuizzes();
  const d = BOOK.plan.find(x => x.day === day);
  $('#view').innerHTML = `
  <div class="reader">
    <div class="crumbs"><a href="#/home">الرئيسية</a> / <a href="#/plan">الخطة</a> / اختبار اليوم ${arNum(day)}</div>
    <h1>اختبار اليوم ${arNum(day)}</h1>
    <p class="muted">${esc(d.title)} — ${arNum(qs.length)} سؤال</p>
    <div id="dayQuiz">${renderQuestions(qs, 'dq_' + day)}</div>
    <div class="q-actions">
      <button class="btn" id="checkDayQuiz">صحّح الإجابات</button>
      <button class="btn outline" id="resetDayQuiz">إعادة</button>
      <span class="muted small" id="dayScore"></span>
    </div>
  </div>`;
  const answered = {};
  $$('#dayQuiz .opt').forEach(el => el.addEventListener('click', () => {
    const qi = +el.dataset.q, oi = +el.dataset.o;
    if (answered[qi]) return;
    answered[qi] = oi;
    const card = el.closest('.q-card');
    $$('.opt', card).forEach(x => {
      const j = +x.dataset.o;
      if (j === qs[qi].a) x.classList.add('correct');
      else if (j === oi) x.classList.add('wrong');
    });
    $(`#dq_${day}_e${qi}`).classList.add('show');
  }));
  $('#checkDayQuiz').onclick = () => {
    let score = 0; qs.forEach((q, i) => { if (answered[i] === q.a) score++; });
    $('#dayScore').innerHTML = `النتيجة: <b>${arNum(score)} / ${arNum(qs.length)}</b>`;
    state.quiz['day' + day] = { score, total: qs.length, date: Date.now() }; save();
  };
  $('#resetDayQuiz').onclick = () => viewDayQuiz(day);
}

/* ---------------- glossary ---------------- */
function viewGlossary() {
  $('#view').innerHTML = `
  <div class="reader">
    <h1>قاموس المصطلحات</h1>
    <p class="muted">${arNum(GLOSSARY.length)} مصطلحًا. اكتب للبحث أو اضغط 🔊 لسماع النطق.</p>
    <div class="g-tools">
      <input id="gSearch" placeholder="ابحث بالعربي أو الإنجليزي…" style="flex:1;min-width:220px">
      <select id="gFilter"><option value="all">كل الأيام</option>${BOOK.plan.map(d => `<option value="${d.day}">اليوم ${arNum(d.day)}</option>`).join('')}</select>
    </div>
    <div class="g-list" id="gList"></div>
  </div>`;
  const draw = () => {
    const q = $('#gSearch').value.trim().toLowerCase();
    const f = $('#gFilter').value;
    const list = GLOSSARY.filter(t => {
      if (f !== 'all' && String(t.day) !== f) return false;
      if (!q) return true;
      return (t.ar + ' ' + (t.en || '') + ' ' + t.def).toLowerCase().includes(q);
    });
    $('#gList').innerHTML = list.length ? list.map(termCard).join('') : '<div class="empty">لا توجد نتائج</div>';
    $$('#gList [data-say]').forEach(el => el.addEventListener('click', e => {
      e.stopPropagation(); const t = termMap.get(el.dataset.say); if (t) speakTerm(t);
    }));
  };
  $('#gSearch').addEventListener('input', draw);
  $('#gFilter').addEventListener('change', draw);
  draw();
}

/* ---------------- flashcards ---------------- */
let cardDeck = [], cardIdx = 0, cardFlipped = false;
function viewCards() {
  const params = new URLSearchParams((location.hash.split('?')[1] || ''));
  const day = params.get('day');
  let pool = GLOSSARY.filter(t => !day || String(t.day) === day);
  if (!pool.length) pool = GLOSSARY;
  cardDeck = shuffle(pool.slice());
  cardIdx = 0; cardFlipped = false;
  $('#view').innerHTML = `
  <div class="reader">
    <h1>بطاقات المراجعة</h1>
    <p class="muted">اقرأ المصطلح، حاول تفتكره، ثم اقلب البطاقة. علّم نفسك بصدق.</p>
    <div class="g-tools" style="margin-top:14px">
      <select id="fcDay"><option value="">كل الأيام</option>${BOOK.plan.map(d => `<option value="${d.day}" ${String(d.day) === day ? 'selected' : ''}>اليوم ${arNum(d.day)}</option>`).join('')}</select>
      <span class="badge" id="fcCount"></span>
    </div>
    <div class="fc-wrap">
      <div class="fc" id="fc"><div class="fc-inner">
        <div class="fc-face front"><div class="k">المصطلح</div><div class="t" id="fcFront"></div><div class="e" id="fcEn"></div></div>
        <div class="fc-face back"><div class="k">التعريف</div><div class="d" id="fcBack"></div></div>
      </div></div>
      <div class="fc-controls">
        <button class="btn outline" id="fcPrev">→ السابق</button>
        <button class="btn" id="fcFlip">اقلب البطاقة</button>
        <button class="btn outline" id="fcNext">التالي ←</button>
      </div>
      <div class="fc-controls" style="margin-top:10px">
        <button class="btn soft" id="fcSwap"></button>
        <button class="btn soft" id="fcKnow">✓ أعرفها</button>
        <button class="btn outline" id="fcReview">↻ راجعها</button>
        <button class="icon-btn" id="fcSay" title="إعادة الاستماع">🔁 إعادة</button>
      </div>
    </div>
  </div>`;
  const draw = () => {
    const t = cardDeck[cardIdx];
    const frontEn = state.settings.cardFront === 'en';
    $('#fcSwap').textContent = frontEn ? '↔ الواجهة: عربي' : '↔ الواجهة: إنجليزي';
    if (!t) {
      $('#fcFront').textContent = 'انتهت البطاقات 🎉';
      $('#fcEn').textContent = ''; $('#fcBack').textContent = '';
      $('#fcCount').textContent = `${arNum(0)} / ${arNum(0)}`;
      return;
    }
    $('#fcFront').innerHTML = frontEn ? `<span lang="en" dir="ltr" class="en">${esc(t.en || '')}</span>` : esc(t.ar);
    $('#fcEn').innerHTML = frontEn ? esc(t.ar) : (t.en ? `<span lang="en" dir="ltr" class="en">${esc(t.en)}</span>` : '');
    $('#fcBack').textContent = t.def;
    $('#fcCount').textContent = `${arNum(cardIdx + 1)} / ${arNum(cardDeck.length)}`;
    $('#fc').classList.remove('flipped'); cardFlipped = false;
  };
  const flip = e => {
    if (e) e.stopPropagation();
    const t = cardDeck[cardIdx];
    if (!t) return;
    $('#fc').classList.toggle('flipped');
    cardFlipped = !cardFlipped;
    if (cardFlipped) speakTerm(t);
  };
  $('#fcFlip').onclick = flip;
  $('#fc').onclick = flip;
  $('#fcNext').onclick = e => { e.stopPropagation(); cardIdx = (cardIdx + 1) % cardDeck.length; draw(); };
  $('#fcPrev').onclick = e => { e.stopPropagation(); cardIdx = (cardIdx - 1 + cardDeck.length) % cardDeck.length; draw(); };
  $('#fcKnow').onclick = e => { e.stopPropagation(); state.cards[cardDeck[cardIdx].ar] = 'know'; save(); cardIdx = (cardIdx + 1) % cardDeck.length; draw(); };
  $('#fcReview').onclick = e => { e.stopPropagation(); state.cards[cardDeck[cardIdx].ar] = 'review'; save(); cardIdx = (cardIdx + 1) % cardDeck.length; draw(); };
  $('#fcSay').onclick = e => { e.stopPropagation(); if (cardDeck[cardIdx]) speakTerm(cardDeck[cardIdx]); };
  $('#fcSwap').onclick = e => { e.stopPropagation(); state.settings.cardFront = state.settings.cardFront === 'en' ? 'ar' : 'en'; save(); draw(); };
  $('#fcDay').onchange = e => { location.hash = '#/cards' + (e.target.value ? '?day=' + e.target.value : ''); };
  draw();
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

/* ---------------- practical ---------------- */
function viewPractical() {
  $('#view').innerHTML = `
  <div class="reader">
    <h1>الجزء العملي</h1>
    <p class="muted">أهم ما يُسأل عنه في العملي: الأدوات، الأنسجة، الشرائح، وأجزاء الحيوانات. راجع الصور والملصقات.</p>
    <div class="grid" style="gap:10px;margin-top:18px">
      ${practicalUnits.map(id => unitRow(UNITS[id])).join('')}
    </div>
  </div>`;
}

/* ---------------- final exam ---------------- */
let examTimer = null, examTopTimerEl = null;
function clearExamTopTimer() {
  clearInterval(examTimer); examTimer = null;
  if (examTopTimerEl) { examTopTimerEl.remove(); examTopTimerEl = null; }
}
const examTokens = text => new Set(String(text || '').match(/[\u0600-\u06FF]{4,}/g) || []);
const UNIT_TOKENS = {}, TOKEN_DF = {};
UNIT_LIST.forEach(id => {
  const u = UNITS[id];
  const txt = [u.title, u.summary, ...(u.blocks || []).map(blockText),
    ...(u.terms || []).map(t => `${t.ar} ${t.def}`),
    ...(u.quiz || []).map(q => `${q.q} ${(q.o || []).join(' ')}`)].join(' ');
  const toks = examTokens(txt);
  UNIT_TOKENS[id] = toks;
  toks.forEach(t => { TOKEN_DF[t] = (TOKEN_DF[t] || 0) + 1; });
});
function guessExamUnit(q) {
  const toks = examTokens(`${q.q} ${(q.o || []).join(' ')}`);
  let best = 'u01', bestScore = -1;
  UNIT_LIST.forEach(id => {
    let s = 0;
    toks.forEach(t => { if (UNIT_TOKENS[id].has(t)) s += 1 / (TOKEN_DF[t] || 1); });
    if (s > bestScore) { bestScore = s; best = id; }
  });
  return best;
}

function viewExam(subset) {
  const ex = BOOK.exam;
  if (!ex) return viewHome();
  clearExamTopTimer();
  const indices = Array.isArray(subset) ? subset : ex.questions.map((_, i) => i);
  const qs = indices.map(i => ex.questions[i]).filter(Boolean);
  const isRetry = Array.isArray(subset);
  $('#view').innerHTML = `
  <div class="reader">
    <h1>${isRetry ? 'إعادة الأسئلة الغلط' : 'الامتحان الشامل'}</h1>
    <p class="muted">${arNum(qs.length)} سؤال اختيار من متعدد${isRetry ? ' — من أسئلتك الغلط فقط' : ' + أسئلة مقالية بنموذج إجابة'}. المدة ${arNum(ex.minutes)} دقيقة.</p>
    <div class="exam-head">
      <div class="timer" id="examTimer">⏱ ${arNum(ex.minutes)}:00</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <button class="btn" id="startExam">ابدأ الامتحان</button>
        <button class="btn outline" id="submitExam" disabled>سلّم الامتحان</button>
      </div>
    </div>
    <div class="exam-nav" id="examNav"></div>
    <div id="examArea" class="hide">
      <div id="examQs">${renderQuestions(qs, 'ex_')}</div>
      ${isRetry ? '' : `<h3 style="margin:26px 0 10px">أسئلة مقالية</h3>
      ${ex.open.map((o, i) => `<div class="q-card">
        <div class="q-head"><div class="q-no">${arNum(i + 1)}</div><div class="q-text">${esc(o.q)}</div></div>
        <textarea placeholder="اكتب إجابتك هنا…" style="width:100%;min-height:90px;border:1px solid var(--line);border-radius:11px;padding:10px;background:var(--surface2);color:var(--ink);font-family:inherit"></textarea>
        <details style="margin-top:8px"><summary class="small" style="cursor:pointer;color:var(--accent)">اعرض نموذج الإجابة</summary><p class="small" style="margin-top:6px">${esc(o.a)}</p></details>
      </div>`).join('')}`}
    </div>
    <div id="examResult"></div>
  </div>`;

  $$('#examQs .q-card').forEach((card, li) => {
    const f = document.createElement('button');
    f.className = 'flag-btn'; f.dataset.q = li;
    f.textContent = '⚑'; f.title = 'تعليم للمراجعة'; f.setAttribute('aria-label', 'تعليم السؤال للمراجعة');
    card.querySelector('.q-head').prepend(f);
  });

  const answers = {}, flags = new Set();
  let running = false, remain = ex.minutes * 60;

  const renderNav = () => {
    $('#examNav').innerHTML = qs.map((_, i) => {
      const cls = [answers[i] !== undefined ? 'answered' : '', flags.has(i) ? 'flagged' : ''].filter(Boolean).join(' ');
      return `<button class="${cls}" data-q="${i}" title="سؤال ${arNum(i + 1)}">${arNum(i + 1)}</button>`;
    }).join('');
    $$('#examNav button').forEach(b => b.onclick = () => {
      const card = $(`#examQs .q-card[data-q="${b.dataset.q}"]`);
      if (card) card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  };
  renderNav();

  const renderTimer = () => {
    const m = Math.floor(remain / 60), s = remain % 60;
    const txt = `⏱ ${arNum(m)}:${String(s).padStart(2, '0')}`;
    const el = $('#examTimer');
    el.textContent = txt; el.classList.toggle('warn', remain < 300);
    if (examTopTimerEl) {
      examTopTimerEl.textContent = txt;
      examTopTimerEl.classList.toggle('warn', remain < 300);
    }
  };

  $('#startExam').onclick = () => {
    running = true; $('#examArea').classList.remove('hide');
    $('#startExam').disabled = true; $('#submitExam').disabled = false;
    if (!examTopTimerEl) {
      examTopTimerEl = document.createElement('div');
      examTopTimerEl.className = 'exam-top-timer'; examTopTimerEl.id = 'examTopTimer';
      $('.topbar').prepend(examTopTimerEl);
    }
    renderTimer();
    $('#examArea').scrollIntoView({ behavior: 'smooth' });
    examTimer = setInterval(() => {
      if (!running) return;
      remain--; renderTimer();
      if (remain <= 0) { clearInterval(examTimer); examTimer = null; submit(true); }
    }, 1000);
  };

  $$('#examQs .opt').forEach(el => el.addEventListener('click', () => {
    if (!running) return;
    const qi = +el.dataset.q, oi = +el.dataset.o;
    answers[qi] = oi;
    const card = el.closest('.q-card');
    $$('.opt', card).forEach(x => x.classList.remove('sel'));
    el.classList.add('sel');
    renderNav();
  }));
  $$('#examQs .flag-btn').forEach(b => b.onclick = e => {
    e.stopPropagation();
    const qi = +b.dataset.q;
    if (flags.has(qi)) { flags.delete(qi); b.classList.remove('on'); }
    else { flags.add(qi); b.classList.add('on'); }
    renderNav();
  });

  const submit = (auto) => {
    if (!running && !auto) return;
    if (!auto && !confirm('متأكد إنك عايز تسلّم الامتحان؟')) return;
    running = false;
    clearExamTopTimer();
    let score = 0;
    qs.forEach((q, i) => {
      if (answers[i] === q.a) score++;
      const card = $(`#examQs .q-card[data-q="${i}"]`);
      if (card) {
        $$('.opt', card).forEach(x => {
          const j = +x.dataset.o;
          if (j === q.a) x.classList.add('correct');
          else if (j === answers[i]) x.classList.add('wrong');
        });
        $(`#ex__e${i}`)?.classList.add('show');
      }
    });
    const wrong = qs.map((_, i) => i).filter(i => answers[i] !== qs[i].a);
    const attempt = { score, total: qs.length, date: Date.now(), wrong: wrong.map(i => indices[i]), ids: indices };
    state.examHistory.push(attempt);
    if (state.examHistory.length > 20) state.examHistory = state.examHistory.slice(-20);
    state.exam = { score, total: qs.length, date: attempt.date };
    save();

    const groups = {};
    qs.forEach((q, i) => {
      const uid = guessExamUnit(q);
      if (!groups[uid]) groups[uid] = { t: 0, c: 0 };
      groups[uid].t++;
      if (answers[i] === q.a) groups[uid].c++;
    });
    const rows = Object.entries(groups).sort((a, b) => a[0].localeCompare(b[0]));
    const maxT = Math.max(1, ...rows.map(([, v]) => v.t));
    const bars = rows.map(([uid, v]) => `<div class="unit-bar">
      <span>${esc(UNITS[uid] ? UNITS[uid].title : uid)}</span>
      <div class="bar"><i style="width:${Math.round(v.c / v.t * 100)}%"></i></div>
      <small>${arNum(v.c)}/${arNum(v.t)}</small></div>`).join('');
    const wrongHtml = wrong.length ? wrong.map(i => {
      const q = qs[i], given = answers[i];
      return `<div class="q-card">
        <div class="q-text">${esc(q.q)}</div>
        <p class="small">إجابتك: <b style="color:var(--danger)">${given === undefined ? 'ما أجبتش' : esc(q.o[given])}</b></p>
        <p class="small">الصحيح: <b style="color:var(--ok)">${esc(q.o[q.a])}</b></p>
        ${q.e ? `<p class="small muted">💡 ${esc(q.e)}</p>` : ''}
      </div>`;
    }).join('') : '<p class="muted">مفيش أخطاء 🎉</p>';

    $('#examArea').classList.add('hide');
    $('#examResult').innerHTML = `<div class="score-box">
      <div class="big">${arNum(score)} / ${arNum(qs.length)}</div>
      <p class="muted">${score / qs.length >= .7 ? 'ممتاز! راجع الأسئلة الغلط فقط.' : 'راجع الأجزاء اللي فيها أخطاء قبل الامتحان.'}</p>
      <p class="small muted">عدد المحاولات المحفوظة: ${arNum(state.examHistory.length)}</p>
      ${wrong.length ? `<button class="btn" id="retryWrong">أعد الأسئلة الغلط (${arNum(wrong.length)})</button>` : ''}
    </div>
    <h3 style="margin:22px 0 10px">الأداء حسب الوحدة</h3>
    <div class="unit-bars">${bars}</div>
    <h3 style="margin:22px 0 10px">الإجابات الغلط</h3>
    ${wrongHtml}`;
    const retry = $('#retryWrong');
    if (retry) retry.onclick = () => viewExam(wrong.map(i => indices[i]));
    $('#submitExam').disabled = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    toast(`نتيجتك ${arNum(score)} من ${arNum(qs.length)}`);
  };
  $('#submitExam').onclick = () => submit(false);
}

/* ---------------- audio player ---------------- */
const audio = new Audio();
let pl = { unit: null, items: [], i: 0, paused: false };
const player = $('#player');

function blockText(b) {
  if (!b) return '';
  if (b.t === 'p' || b.t === 'note' || b.t === 'h') return b.x || '';
  if (b.t === 'def') return `${b.ar}. ${b.x}`;
  if (b.t === 'ul') return (b.items || []).join('. ');
  if (b.t === 'table') return '';
  if (b.t === 'img') return b.cap || '';
  return '';
}

function startUnitAudio(u) {
  const items = (u.blocks || []).map((b, i) => ({ b, i })).filter(x => blockText(x.b).trim().length > 1);
  if (!items.length) return toast('لا يوجد نص للقراءة');
  pl = { unit: u, items, i: 0, paused: false };
  player.classList.add('on');
  $('#playerTitle').textContent = u.title;
  playCurrent();
}

function playCurrent() {
  const item = pl.items[pl.i];
  if (!item) return stopAudio();
  highlightBlock(item.i);
  const src = `audio/${pl.unit.id}-${item.i}.mp3`;
  $('#playerTitle').textContent = pl.unit.title + ' — ' + (pl.i + 1) + '/' + pl.items.length;
  audio.src = src;
  audio.playbackRate = +state.settings.speed || 1;
  audio.onended = () => nextAudio();
  audio.onerror = () => speakFallback(item);
  audio.play().catch(() => speakFallback(item));
  $('#playBtn').textContent = '❚❚';
}

let ttsUtter = null;
function speakFallback(item) {
  if (!('speechSynthesis' in window)) { nextAudio(); return; }
  speechSynthesis.cancel();
  const txt = blockText(item.b);
  ttsUtter = new SpeechSynthesisUtterance(txt);
  ttsUtter.lang = 'ar-EG';
  ttsUtter.rate = +state.settings.speed || 1;
  const v = speechSynthesis.getVoices().find(x => x.lang && x.lang.startsWith('ar'));
  if (v) ttsUtter.voice = v;
  ttsUtter.onend = () => nextAudio();
  speechSynthesis.speak(ttsUtter);
  $('#playBtn').textContent = '❚❚';
}

function nextAudio() {
  pl.i++;
  if (pl.i >= pl.items.length) return stopAudio();
  playCurrent();
}

function stopAudio() {
  audio.pause(); audio.removeAttribute('src');
  if ('speechSynthesis' in window) speechSynthesis.cancel();
  clearHighlight();
  player.classList.remove('on');
  $('#playerTitle').textContent = '—';
}

function highlightBlock(i) {
  clearHighlight();
  const el = $(`#blocks .blk[data-i="${i}"]`);
  if (el) { el.classList.add('playing'); el.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
}
function clearHighlight() { $$('#blocks .blk').forEach(x => x.classList.remove('playing')); }

let termAudio = null, termTimer = null, termSeq = 0, audioFailNotified = false;
const audioURL = p => new URL(p, document.baseURI).href;
function unlockAudio() {
  if (audioUnlocked) return;
  audioUnlocked = true;
  try {
    const a = new Audio('data:audio/wav;base64,UklGRjQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQgAAAAAAAAAAAAAAA==');
    const p = a.play();
    if (p && p.catch) p.catch(() => {}).then(() => a.pause());
  } catch (e) {}
}
let audioUnlocked = false;
['pointerdown', 'touchstart'].forEach(ev => document.addEventListener(ev, unlockAudio, { once: true, passive: true }));
function audioFail(src, err) {
  console.warn('[term audio] missing/failed:', src, err || '');
  if (!audioFailNotified) {
    audioFailNotified = true;
    toast('تعذّر تشغيل الصوت — تأكد من رفع مجلد audio كامل على الاستضافة');
  }
}
function speakTerm(t) {
  const token = ++termSeq;
  clearTimeout(termTimer); termTimer = null;
  unlockAudio();
  if (!termAudio) termAudio = new Audio();
  termAudio.pause();
  termAudio.onended = null; termAudio.onerror = null;
  termAudio.removeAttribute('src');
  try { termAudio.load(); } catch (e) {}
  const key = encodeURI(slug(t.ar));
  const steps = [
    `audio/term-en-${key}.mp3`,
    `audio/term-${key}.mp3`
  ];
  if (state.settings.termDetail !== false) steps.push(`audio/term-def-${key}.mp3`);
  let i = 0;
  const queue = delay => {
    if (token !== termSeq) return;
    clearTimeout(termTimer);
    termTimer = setTimeout(run, delay);
  };
  const run = () => {
    if (token !== termSeq || i >= steps.length) return;
    const src = steps[i++];
    let settled = false;
    const done = () => {
      if (settled || token !== termSeq) return;
      settled = true;
      termAudio.onended = null; termAudio.onerror = null;
      if (i < steps.length) queue(naturalGap(src));
    };
    termAudio.onended = done;
    termAudio.onerror = () => { audioFail(src); done(); };
    try {
      termAudio.src = audioURL(src);
      termAudio.load();
      termAudio.playbackRate = src.includes('term-en-') ? state.settings.enRate : state.settings.arRate;
      const p = termAudio.play();
      if (p && p.catch) p.catch(err => {
        if (err && err.name === 'AbortError') return;
        if (err && err.name === 'NotAllowedError' && !audioFailNotified) {
          audioFailNotified = true;
          toast('اضغط على المصطلح مرة ثانية لتفعيل الصوت');
        } else audioFail(src, err);
        done();
      });
    } catch (err) {
      audioFail(src, err);
      done();
    }
  };
  run();
}

function slug(s) {
  return String(s).trim().replace(/\s+/g, '_').replace(/[\\/:*?"<>|]/g, '');
}

$('#playBtn').onclick = () => {
  if (audio.paused) { audio.play(); $('#playBtn').textContent = '❚❚'; }
  else { audio.pause(); $('#playBtn').textContent = '▶'; }
};
$('#closePlayer').onclick = stopAudio;
$('#speedSel').onchange = e => {
  state.settings.speed = +e.target.value; save();
  audio.playbackRate = +e.target.value;
};

/* ---------------- search ---------------- */
const searchIndex = [];
UNIT_LIST.forEach(id => {
  const u = UNITS[id];
  searchIndex.push({ type: 'وحدة', title: u.title, text: (u.title + ' ' + (u.titleEn || '') + ' ' + (u.summary || '') + ' ' + (u.blocks || []).map(blockText).join(' ')), href: '#/unit/' + id });
});
GLOSSARY.forEach(t => searchIndex.push({ type: 'مصطلح', title: t.ar, text: t.ar + ' ' + (t.en || '') + ' ' + t.def, href: '#/glossary' }));

function doSearch(q) {
  q = q.trim().toLowerCase();
  if (q.length < 2) return [];
  return searchIndex.filter(x => x.text.toLowerCase().includes(q)).slice(0, 12);
}
$('#searchInput').addEventListener('input', e => {
  const res = doSearch(e.target.value);
  const box = $('#searchResults');
  if (!res.length) { box.classList.remove('open'); return; }
  box.innerHTML = res.map(r => `<div class="sr-item" data-href="${r.href}">
    <b>${esc(r.title)}</b><span>${r.type} — ${esc(r.text.slice(0, 110))}</span></div>`).join('');
  box.classList.add('open');
  $$('.sr-item', box).forEach(el => el.onclick = () => {
    location.hash = el.dataset.href; box.classList.remove('open'); $('#searchInput').value = '';
  });
});
document.addEventListener('click', e => {
  if (!e.target.closest('.searchbox')) $('#searchResults').classList.remove('open');
});

/* ---------------- settings & theme ---------------- */
setTimeout(() => { const s = $('#splash'); if (s) { s.remove(); document.body.classList.add('done-splash'); } }, 620);
function applySettings() {
  document.documentElement.dataset.theme = state.settings.theme;
  document.documentElement.dataset.size = state.settings.fontSize;
  document.documentElement.dataset.contrast = state.settings.contrast ? 'high' : 'normal';
  document.documentElement.style.setProperty('--fs', ({small:15, medium:17, large:20}[state.settings.fontSize] || 17) + 'px');
  $('#themeBtn').innerHTML = (state.settings.theme === 'dark' ? icon('sun') : icon('moon')) + `<span>${state.settings.theme === 'dark' ? 'نهاري' : 'ليلي'}</span>`;
  $('#speedSel').value = state.settings.speed;
}
$('#themeBtn').onclick = () => {
  state.settings.theme = state.settings.theme === 'dark' ? 'light' : 'dark';
  save(); applySettings();
};
$('#settingsBtn').onclick = () => {
  const m = $('#modal');
  m.innerHTML = `<h3>الإعدادات</h3>
    <div class="setting"><span>حجم الخط</span><div class="seg" id="fontSeg">
      ${[['small','صغير'],['medium','متوسط'],['large','كبير']].map(([v,l]) => `<button data-f="${v}" class="${state.settings.fontSize === v ? 'on' : ''}">${l}</button>`).join('')}
    </div></div>
    <div class="setting"><span>تباين عالٍ</span><button class="btn outline sm" id="contrastBtn">${state.settings.contrast ? 'مفعّل' : 'غير مفعّل'}</button></div>
    <div class="setting"><span>نطق المصطلح</span><div class="seg" id="detailSeg">
      <button data-d="1" class="${state.settings.termDetail ? 'on' : ''}">مع الشرح</button>
      <button data-d="0" class="${state.settings.termDetail ? '' : 'on'}">بدون شرح</button>
    </div></div>
    <div class="setting"><span>سرعة المصطلح — إنجليزي</span><div class="seg" id="enRateSeg">
      ${RATES.map(n => `<button data-r="${n}" class="${state.settings.enRate === n ? 'on' : ''}">${n}×</button>`).join('')}
    </div></div>
    <div class="setting"><span>سرعة المصطلح — عربي</span><div class="seg" id="arRateSeg">
      ${RATES.map(n => `<button data-r="${n}" class="${state.settings.arRate === n ? 'on' : ''}">${n}×</button>`).join('')}
    </div></div>
    <div class="setting"><span>سرعة قراءة الوحدة</span><div class="seg" id="spSeg">
      ${RATES.map(n => `<button data-s="${n}" class="${state.settings.speed === n ? 'on' : ''}">${n}×</button>`).join('')}
    </div></div>
    <div class="setting"><span>الوضع</span><button class="btn outline sm" id="themeInModal">${state.settings.theme === 'dark' ? 'نهاري' : 'ليلي'}</button></div>
    <div class="setting"><span>تصفير التقدم</span><button class="btn danger sm" id="resetAll">حذف كل التقدم</button></div>
    ${TRIAL ? `<div class="setting"><span>النسخة التجريبية</span><button class="btn sm" data-lock="الاشتراك">✦ اشترك لفتح كل الوحدات</button></div>` : `<div class="setting"><span>الحساب</span><span class="muted small">${esc(currentUserName())} — ${esc(localStorage.getItem(CURRENT_USER_KEY) || '')}</span></div>
    <div class="setting"><span>الجلسة</span><button class="btn outline sm" id="logoutBtn">تسجيل خروج</button></div>`}
    <div class="setting"><span>نسخة احتياطية</span><div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn outline sm" id="exportBtn">تصدير JSON</button><button class="btn outline sm" id="importBtn">استيراد JSON</button><input type="file" id="importFile" accept="application/json" hidden></div></div>
    <div class="setting"><span>اختصارات لوحة المفاتيح</span><button class="btn outline sm" id="helpBtn">عرض "؟"</button></div>
    <div style="margin-top:16px;text-align:left"><button class="btn" id="closeModal">تم</button></div>`;
  $('#modalBg').classList.add('open');
  $('#closeModal').onclick = () => $('#modalBg').classList.remove('open');
  $('#themeInModal').onclick = () => { state.settings.theme = state.settings.theme === 'dark' ? 'light' : 'dark'; save(); applySettings(); $('#settingsBtn').click(); };
  $('#resetAll').onclick = () => { if (confirm('هتحذف كل التقدم والنتائج. متأكد؟')) { localStorage.removeItem(LS_KEY); location.reload(); } };
  $('#logoutBtn')?.addEventListener('click', () => { localStorage.removeItem('zoobook_auth'); location.reload(); });
  $('#exportBtn').onclick = () => exportProgress();
  $('#importBtn').onclick = () => $('#importFile').click();
  $('#importFile').onchange = e => { if (e.target.files[0]) importProgress(e.target.files[0]); e.target.value=''; };
  $('#helpBtn').onclick = () => showHelp();
  $$('#fontSeg button').forEach(b => b.onclick = () => { state.settings.fontSize = b.dataset.f; state.settings.font = {small:15, medium:17, large:20}[b.dataset.f]; save(); applySettings(); $('#settingsBtn').click(); });
  $('#contrastBtn').onclick = () => { state.settings.contrast = !state.settings.contrast; save(); applySettings(); $('#settingsBtn').click(); };
  $$('#detailSeg button').forEach(b => b.onclick = () => { state.settings.termDetail = b.dataset.d === '1'; save(); $('#settingsBtn').click(); });
  $$('#spSeg button').forEach(b => b.onclick = () => { state.settings.speed = +b.dataset.s; save(); applySettings(); $('#settingsBtn').click(); });
  $$('#enRateSeg button').forEach(b => b.onclick = () => { state.settings.enRate = +b.dataset.r; save(); $('#settingsBtn').click(); });
  $$('#arRateSeg button').forEach(b => b.onclick = () => { state.settings.arRate = +b.dataset.r; save(); $('#settingsBtn').click(); });
};
$('#modalBg').addEventListener('click', e => { if (e.target.id === 'modalBg') e.target.classList.remove('open'); });

/* ---------------- helpers ---------------- */
function bindGo() {
  $$('[data-go]').forEach(el => el.onclick = () => { location.hash = el.dataset.go; });
}
function bindTasks() {
  $$('[data-task]').forEach(el => el.onchange = () => {
    state.tasks[el.dataset.task] = el.checked; save();
    el.closest('.task').classList.toggle('done', el.checked);
  });
}
let toastTimer;
function toast(msg) {
  const t = $('#toast'); t.textContent = msg; t.classList.add('show');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show'), 2200);
}
$('#menuBtn').onclick = () => $('#sidebar').classList.toggle('open');

/* ---------------- login gate ---------------- */
function viewLogin() {
  $('#view').innerHTML = `
  <div class="login-wrap">
    <div class="login-card">
      <div class="login-logo neon-z"><svg viewBox="0 0 48 48" aria-hidden="true"><text x="24" y="34" font-size="32" font-weight="900" text-anchor="middle" fill="currentColor" font-family="Arial,sans-serif">Z</text></svg></div>
      <h1>A-ZOOLOGY</h1>
      <div class="brand-dots" aria-hidden="true"><i></i><i></i><i></i></div>
      <p class="muted">سجّل بياناتك للدخول إلى الكتاب التفاعلي</p>
      <input id="loginName" type="text" placeholder="اسمك (كما تريد أن يظهر)" autocomplete="name">
      <input id="loginCode" type="password" placeholder="رمز الدخول" autocomplete="off">
      <button class="btn" id="loginBtn">دخول</button>
      <p class="muted small" id="loginErr" role="alert"></p>
    </div>
  </div>`;
  const tryLogin = () => {
    const code = ($('#loginCode').value || '').trim();
    const name = ($('#loginName').value || '').trim();
    if (!ACCESS_CODES.includes(code)) { $('#loginErr').textContent = 'رمز غير صحيح'; return; }
    if (!name) { $('#loginErr').textContent = 'أدخل اسمك'; return; }
    const users = getUsers();
    if (!users[code]) users[code] = { name, created: new Date().toISOString() };
    else users[code].name = name;
    users[code].lastLogin = new Date().toISOString();
    saveUsers(users);
    if (!localStorage.getItem('zoobook_v1_' + code) && localStorage.getItem('zoobook_v1')) {
      localStorage.setItem('zoobook_v1_' + code, localStorage.getItem('zoobook_v1'));
    }
    localStorage.setItem(CURRENT_USER_KEY, code);
    localStorage.setItem('zoobook_auth', '1');
    location.reload();
  };
  $('#loginBtn').onclick = tryLogin;
  $('#loginCode').addEventListener('keydown', e => { if (e.key === 'Enter') tryLogin(); });
  $('#loginName').focus();
}
/* ---------------- boot ---------------- */
document.addEventListener('click', e => {
  const a = e.target.closest('[data-go]');
  if (a) location.hash = a.dataset.go;
});
window.addEventListener('hashchange', () => {
  const h = location.hash;
  if (h.startsWith('#/quiz-day/')) {
    renderSidebar();
    const d = +h.split('/')[2];
    if (TRIAL && d !== TRIAL_UNIT_DAY) return viewTrialLocked('quiz-day', d);
    viewDayQuiz(d);
  }
});
hydrateStaticIcons();
applySettings();
if (!TRIAL && !localStorage.getItem('zoobook_auth')) {
  viewLogin();
} else {
  renderSidebar();
  if (location.hash.startsWith('#/quiz-day/')) {
    const d = +location.hash.split('/')[2];
    if (TRIAL && d !== TRIAL_UNIT_DAY) viewTrialLocked('quiz-day', d);
    else viewDayQuiz(d);
  } else router();
  bindTasks();
}
if (TRIAL) {
  $('#subTop')?.addEventListener('click', () => openTrialSubscribe('الاشتراك'));
  document.addEventListener('click', e => {
    const lk = e.target.closest('[data-lock]');
    if (!lk) return;
    e.preventDefault();
    $('#sidebar').classList.remove('open');
    openTrialSubscribe(lk.dataset.lock || 'الاشتراك');
  });
  const viewEl = $('#view');
  if (viewEl && window.MutationObserver) new MutationObserver(() => decorateTrial()).observe(viewEl, { childList: true });
  decorateTrial();
}

/* ---------------- Phase 5: backup, shortcuts, accessibility, print, PWA ---------------- */
function exportProgress() {
  const data = {};
  for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); data[k] = localStorage.getItem(k); }
  const payload = { version: 1, app: 'zoobook', exportedAt: new Date().toISOString(), data };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = 'zoobook-backup.json';
  document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
  toast('تم تصدير النسخة الاحتياطية');
}
function importProgress(file) {
  const r = new FileReader();
  r.onload = () => {
    try {
      const obj = JSON.parse(r.result);
      if (!obj || obj.version !== 1 || !obj.data) throw new Error('bad');
      if (!confirm('سيتم استبدال التقدم الحالي بالنسخة المستوردة. متابعة؟')) return;
      Object.keys(obj.data).forEach(k => localStorage.setItem(k, obj.data[k]));
      toast('تم الاستيراد — إعادة تحميل');
      setTimeout(() => location.reload(), 700);
    } catch (e) { toast('ملف غير صالح'); }
  };
  r.readAsText(file);
}
function showHelp() {
  const m = $('#modal');
  m.innerHTML = `<h3>اختصارات لوحة المفاتيح</h3>
    <ul style="list-style:none;padding:0;line-height:2">
      <li><kbd>Space</kbd> تشغيل/إيقاف قراءة الوحدة</li>
      <li><kbd>←</kbd>/<kbd>→</kbd> البطاقة السابقة/التالية</li>
      <li><kbd>F</kbd> قلب البطاقة</li>
      <li><kbd>1</kbd> راجعها · <kbd>2</kbd> قلب · <kbd>3</kbd> أعرفها</li>
      <li><kbd>/</kbd> تركيز البحث</li>
      <li><kbd>Esc</kbd> إغلاق النوافذ</li>
      <li><kbd>?</kbd> هذه المساعدة</li>
    </ul>
    <div style="margin-top:16px;text-align:left"><button class="btn" id="closeModal">تم</button></div>`;
  $('#modalBg').classList.add('open');
  $('#closeModal').onclick = () => $('#modalBg').classList.remove('open');
}

function printWholeBook() {
  const root = document.createElement('div'); root.className = 'print-root';
  root.innerHTML = `<div class="print-cover"><h1>${esc(BOOK.meta.title)}</h1><p>${esc(BOOK.meta.subtitle || '')}</p><p>${esc(BOOK.meta.author)}</p><p>${esc(BOOK.meta.college)}</p></div>
  <div class="print-toc"><h2>المحتويات</h2><ul>${UNIT_LIST.map(id => `<li>${esc(UNITS[id].title)}</li>`).join('')}</ul></div>
  ${UNIT_LIST.map(id => {
    const u = UNITS[id];
    const body = (u.blocks || []).map(b => (b.t === 'p' || b.t === 'note' || b.t === 'h') ? `<p>${esc(b.x || '')}</p>` : (b.t === 'ul' ? `<ul>${(b.items||[]).map(x=>`<li>${esc(x)}</li>`).join('')}</ul>` : '')).join('');
    return `<section class="print-unit"><h2>${esc(u.title)}</h2>${body}</section>`;
  }).join('')}`;
  document.body.appendChild(root);
  document.body.classList.add('printing');
  window.print();
  setTimeout(() => { document.body.classList.remove('printing'); root.remove(); }, 500);
}
function printThisUnit() { window.print(); }

// keyboard shortcuts
document.addEventListener('keydown', e => {
  const tag = (e.target && e.target.tagName) || '';
  const typing = tag === 'INPUT' || tag === 'TEXTAREA' || (e.target && e.target.isContentEditable);
  if (typing && e.key !== 'Escape') return;
  if (e.key === 'Escape') { $('#modalBg').classList.remove('open'); $('#searchResults').classList.remove('open'); return; }
  if (e.key === '?') { e.preventDefault(); showHelp(); return; }
  if (e.key === '/') { e.preventDefault(); $('#searchInput').focus(); return; }
  if (location.hash.startsWith('#/cards')) {
    if (e.key === ' ' ) { e.preventDefault(); $('#fcFlip')?.click(); return; }
    if (e.key === 'ArrowRight') { e.preventDefault(); $('#fcNext')?.click(); return; }
    if (e.key === 'ArrowLeft') { e.preventDefault(); $('#fcPrev')?.click(); return; }
    if (e.key.toLowerCase() === 'f') { e.preventDefault(); $('#fcFlip')?.click(); return; }
    if (e.key === '1') { e.preventDefault(); $('#fcReview')?.click(); return; }
    if (e.key === '2') { e.preventDefault(); $('#fcFlip')?.click(); return; }
    if (e.key === '3') { e.preventDefault(); $('#fcKnow')?.click(); return; }
  } else {
    if (e.key === ' ') { e.preventDefault(); $('#playBtn')?.click(); }
  }
});

// PWA registration (http/https only)
if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  navigator.serviceWorker.register('service-worker.js').catch(() => {});
}
// print buttons injection
const printBtn = document.createElement('button');
printBtn.className = 'icon-btn'; printBtn.title = 'طباعة هذا القسم'; printBtn.innerHTML = icon('print');
printBtn.onclick = () => printThisUnit();
document.querySelector('.topbar')?.appendChild(printBtn);
const printAllBtn = document.createElement('button');
printAllBtn.className = 'icon-btn'; printAllBtn.title = 'طباعة الكتاب كاملاً'; printAllBtn.innerHTML = icon('book');
printAllBtn.onclick = () => printWholeBook();
document.querySelector('.topbar')?.appendChild(printAllBtn);
if (!TRIAL) {
  const __logoutBtn = document.createElement('button');
  __logoutBtn.className = 'icon-btn';
  __logoutBtn.title = 'تسجيل خروج';
  __logoutBtn.setAttribute('aria-label', 'تسجيل خروج');
  __logoutBtn.innerHTML = icon('logout');
  __logoutBtn.onclick = () => { localStorage.removeItem('zoobook_auth'); location.reload(); };
  document.querySelector('.topbar')?.appendChild(__logoutBtn);
}

/* marker removed */
