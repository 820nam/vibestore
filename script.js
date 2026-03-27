// === SUPABASE INIT ===
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON);

// === CONSTANTS ===
const AI_TOOLS = [
  { id:'Cursor',   emoji:'⌨️', cls:'tc-Cursor'   },
  { id:'Claude',   emoji:'🤖', cls:'tc-Claude'   },
  { id:'Bolt',     emoji:'⚡', cls:'tc-Bolt'     },
  { id:'Lovable',  emoji:'💜', cls:'tc-Lovable'  },
  { id:'v0',       emoji:'▲',  cls:'tc-v0'       },
  { id:'Windsurf', emoji:'🏄', cls:'tc-Windsurf' },
];

const CAT_META = {
  'SaaS Dashboard': { name:'SaaS 대시보드', emoji:'📊', bg:'linear-gradient(135deg,#34C759,#00B894)' },
  'E-Commerce':     { name:'이커머스',       emoji:'🛍️', bg:'linear-gradient(135deg,#FF9500,#FDCB6E)' },
  'Portfolio':      { name:'포트폴리오',     emoji:'🎨', bg:'linear-gradient(135deg,#AF52DE,#A29BFE)' },
  'Landing Page':   { name:'랜딩 페이지',   emoji:'🚀', bg:'linear-gradient(135deg,#007AFF,#74B9FF)' },
  'Blog':           { name:'블로그',         emoji:'✍️', bg:'linear-gradient(135deg,#FF2D55,#FD79A8)' },
  'Game':           { name:'게임',           emoji:'🎮', bg:'linear-gradient(135deg,#5856D6,#A29BFE)' },
  'Utility':        { name:'유틸리티',       emoji:'🔧', bg:'linear-gradient(135deg,#00C7BE,#55EFC4)' },
  'AI Product':     { name:'AI 프로덕트',   emoji:'🧠', bg:'linear-gradient(135deg,#FF6B6B,#FDCB6E)' },
};

// === STATE ===
let allProjects = [];
let heroIdx = 0, heroTimer = null;

// === UTILS ===
function stars(r) {
  if (!r) return '<span class="stars">☆☆☆☆☆</span>';
  let h = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(r)) h += '<span class="sf">★</span>';
    else if (i === Math.ceil(r) && r % 1 >= 0.4) h += '<span class="sf" style="opacity:.55">★</span>';
    else h += '<span>★</span>';
  }
  return `<span class="stars">${h}</span>`;
}
function priceLabel(p) { return p.is_free ? '보기' : (p.price || '유료'); }
function paidCls(p)    { return p.is_free ? '' : ' paid'; }
function toolInfo(id)  { return AI_TOOLS.find(t => t.id === id) || { id, emoji:'🔧', cls:'' }; }

// === LOADING STATE ===
function showSkeleton(containerId, count = 6, type = 'card') {
  const el = document.getElementById(containerId);
  if (!el) return;
  if (type === 'card') {
    el.innerHTML = Array(count).fill(`
      <div class="app-card skeleton-card">
        <div class="skeleton" style="width:100%;aspect-ratio:1;border-radius:var(--r-icon);margin-bottom:10px"></div>
        <div class="skeleton" style="height:12px;width:80%;border-radius:4px;margin-bottom:6px"></div>
        <div class="skeleton" style="height:10px;width:55%;border-radius:4px"></div>
      </div>`).join('');
  } else {
    el.innerHTML = Array(count).fill(`
      <div class="list-item" style="pointer-events:none">
        <div class="skeleton" style="width:60px;height:60px;border-radius:14px;flex-shrink:0"></div>
        <div class="list-info">
          <div class="skeleton" style="height:14px;width:60%;border-radius:4px;margin-bottom:8px"></div>
          <div class="skeleton" style="height:11px;width:85%;border-radius:4px"></div>
        </div>
      </div>`).join('');
  }
}

function showEmpty(containerId, msg = '등록된 프로젝트가 없습니다') {
  const el = document.getElementById(containerId);
  if (el) el.innerHTML = `<div class="empty-state"><p>${msg}</p></div>`;
}

// === FETCH ===
async function fetchProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) { console.error('Supabase fetch error:', error); return []; }
  return data || [];
}

// === RENDER FUNCTIONS ===

function renderHero(projects) {
  const featured = projects.filter(p => p.is_featured);
  const track  = document.getElementById('hero-track');
  const dotsEl = document.getElementById('hero-dots');

  if (!featured.length) {
    track.innerHTML = `<div class="hero-card hg-1" style="cursor:default">
      <div class="hero-overlay"></div>
      <div class="hero-content"><div class="hero-badge">✦ Vibestore</div>
        <h2 class="hero-title">바이브코딩 프로젝트를<br>공유해보세요</h2>
        <p class="hero-sub">AI와 함께 만든 웹사이트를 등록하면 이곳에 소개됩니다</p>
        <button class="hero-cta" onclick="openModal('submit-overlay')">지금 등록하기 →</button>
      </div></div>`;
    dotsEl.innerHTML = '';
    return;
  }

  track.innerHTML = featured.map(p => {
    const t = toolInfo(p.ai_tool);
    return `<div class="hero-card ${p.featured_gradient || 'hg-1'}" data-id="${p.id}">
      <div class="hero-overlay"></div>
      <div class="hero-deco">${p.emoji || '🚀'}</div>
      <div class="hero-content">
        <div class="hero-badge">✦ ${p.featured_badge || '주목 프로젝트'}</div>
        <h2 class="hero-title">${p.title}</h2>
        <p class="hero-sub">${p.description || ''}</p>
        <div class="hero-meta">
          <span class="hero-author">by ${p.coder_name || '익명'}</span>
          <span class="tool-sm ${t.cls}">${t.emoji} ${p.ai_tool}</span>
        </div>
        <button class="hero-cta" data-id="${p.id}">자세히 보기 →</button>
      </div></div>`;
  }).join('');

  dotsEl.innerHTML = featured.map((_,i) =>
    `<div class="dot${i===0?' active':''}" data-i="${i}"></div>`).join('');

  clearInterval(heroTimer);
  heroIdx = 0;
  if (featured.length > 1) {
    heroTimer = setInterval(() => {
      heroIdx = (heroIdx + 1) % featured.length;
      goSlide(heroIdx);
    }, 5000);
  }
}

function goSlide(i) {
  heroIdx = i;
  document.getElementById('hero-track').style.transform = `translateX(-${i * 100}%)`;
  document.querySelectorAll('.dot').forEach((d,j) => d.classList.toggle('active', j === i));
}

function renderTrendingRow(projects) {
  const sorted = [...projects]
    .sort((a,b) => (b.rating * (b.review_count || 1)) - (a.rating * (a.review_count || 1)))
    .slice(0, 10);
  const el = document.getElementById('trending-row');
  if (!sorted.length) { el.innerHTML = ''; return; }
  el.innerHTML = sorted.map(p => `
    <div class="app-card" data-id="${p.id}">
      <div class="app-icon ${p.gradient_class || 'gc-1'}"><span class="ie">${p.emoji || '🚀'}</span></div>
      <div class="ac-name">${p.title}</div>
      <div class="ac-cat">${p.category || ''}</div>
      <div class="ac-btm">${stars(p.rating)}<button class="get-btn${paidCls(p)}">${priceLabel(p)}</button></div>
    </div>`).join('');
}

function renderAiTools(projects) {
  const counts = {};
  projects.forEach(p => { counts[p.ai_tool] = (counts[p.ai_tool] || 0) + 1; });
  document.getElementById('aitool-grid').innerHTML = AI_TOOLS.map(t => `
    <div class="aitool-chip" data-tool="${t.id}">
      <div class="tool-icon ${t.cls}">${t.emoji}</div>
      <div><div class="aitool-name">${t.id}</div><div class="aitool-count">${counts[t.id] || 0}개</div></div>
    </div>`).join('');
}

function listItemHTML(p) {
  return `<div class="list-item" data-id="${p.id}">
    <div class="app-icon sz-60 ${p.gradient_class || 'gc-1'}"><span class="ie">${p.emoji || '🚀'}</span></div>
    <div class="list-info">
      <div class="list-title">${p.title}</div>
      <div class="list-desc">${p.description || ''}</div>
      <div class="list-chips">
        <span class="lchip">${p.category || ''}</span>
        <span class="lchip">${p.ai_tool || ''}</span>
      </div>
    </div>
    <div class="list-right">${stars(p.rating)}<button class="get-btn${paidCls(p)}">${priceLabel(p)}</button></div>
  </div>`;
}

function renderEditors(projects) {
  const picks = projects.filter(p => p.is_editors_pick).slice(0, 5);
  const el = document.getElementById('editors-list');
  if (!picks.length) { showEmpty('editors-list', '에디터 픽이 아직 없습니다'); return; }
  el.innerHTML = picks.map(listItemHTML).join('');
}

function renderNewList(projects) {
  const el = document.getElementById('new-list');
  if (!projects.length) { showEmpty('new-list'); return; }
  el.innerHTML = projects.map(listItemHTML).join('');
}

function renderRanking(projects, filter = 'all') {
  let list = [...projects];
  if (filter === 'free') list = list.filter(p => p.is_free);
  if (filter === 'paid') list = list.filter(p => !p.is_free);
  list.sort((a,b) => (b.rating * Math.sqrt(b.review_count || 1)) - (a.rating * Math.sqrt(a.review_count || 1)));

  const el = document.getElementById('rank-list');
  if (!list.length) { showEmpty('rank-list', '해당하는 프로젝트가 없습니다'); return; }
  el.innerHTML = list.map((p,i) => `
    <div class="rank-item" data-id="${p.id}">
      <div class="rank-num${i<3?' t3':''}">${i+1}</div>
      <div class="app-icon sz-60 ${p.gradient_class || 'gc-1'}"><span class="ie">${p.emoji || '🚀'}</span></div>
      <div class="rank-info">
        <div class="rank-name">${p.title}</div>
        <div class="rank-sub">${p.description || ''}</div>
        <div class="rank-meta">${stars(p.rating)}<span>${p.rating || 0} (${p.review_count || 0})</span><span>·</span><span>${p.ai_tool || ''}</span></div>
      </div>
      <div class="rank-right"><button class="get-btn${paidCls(p)}">${priceLabel(p)}</button></div>
    </div>`).join('');
}

function renderCats(projects) {
  const counts = {};
  projects.forEach(p => { counts[p.category] = (counts[p.category] || 0) + 1; });
  document.getElementById('cat-grid').innerHTML = Object.entries(CAT_META).map(([id,m]) =>
    `<div class="cat-card" data-cat="${id}" style="background:${m.bg}">
      <div class="cat-deco">${m.emoji}</div>
      <div class="cat-name">${m.name}</div>
      <div class="cat-count">${counts[id] || 0}개</div>
    </div>`).join('');
}

// === DETAIL MODAL ===
function openDetail(id) {
  const p = allProjects.find(x => x.id === id);
  if (!p) return;
  const t = toolInfo(p.ai_tool);
  const catName = CAT_META[p.category]?.name || p.category || '';
  const tags = Array.isArray(p.tags) ? p.tags : [];

  document.getElementById('detail-content').innerHTML = `
    <div class="d-hero ${p.featured_gradient || p.gradient_class || 'gc-1'}">
      <span style="position:relative;z-index:1">${p.emoji || '🚀'}</span>
      <div class="d-hero-fade"></div>
    </div>
    <div class="d-body">
      <div class="d-top">
        <div class="d-icon-wrap"><div class="app-icon sz-100 ${p.gradient_class || 'gc-1'}"><span class="ie">${p.emoji || '🚀'}</span></div></div>
        <div class="d-meta">
          <div class="d-name">${p.title}</div>
          <div class="d-coder">by ${p.coder_name || '익명'}</div>
          <div class="d-rating">${stars(p.rating)}<span style="font-weight:700">${p.rating || 0}</span><span>(${(p.review_count || 0).toLocaleString()}개 리뷰)</span></div>
        </div>
      </div>
      <p class="d-desc">${p.long_desc || p.description || ''}</p>
      <div class="d-info">
        <div class="info-box"><div class="info-lbl">카테고리</div><div class="info-val">${catName}</div></div>
        <div class="info-box"><div class="info-lbl">가격</div><div class="info-val">${p.is_free ? '무료' : (p.price || '유료')}</div></div>
        <div class="info-box"><div class="info-lbl">제작자</div><div class="info-val">${p.coder_name || '익명'}</div></div>
        <div class="info-box"><div class="info-lbl">리뷰</div><div class="info-val">${(p.review_count || 0).toLocaleString()}개</div></div>
      </div>
      <div class="d-ai">
        <div class="d-ai-icon ${t.cls}">${t.emoji}</div>
        <div class="d-ai-text"><strong>${p.ai_tool}</strong>으로 바이브코딩하여 만들어진 프로젝트입니다</div>
      </div>
      ${tags.length ? `<div class="d-tags">${tags.map(tg=>`<span class="tag-pill">${tg}</span>`).join('')}</div>` : ''}
      <button class="d-visit" onclick="window.open('${p.url || '#'}','_blank')">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        웹사이트 방문하기
      </button>
    </div>`;
  openModal('detail-overlay');
}

// === SUBMIT ===
function renderToolPicker() {
  document.getElementById('aitool-picker').innerHTML = AI_TOOLS.map(t =>
    `<button type="button" class="tool-pick" data-tool="${t.id}">
      <span class="tp-emoji">${t.emoji}</span>
      <span class="tp-name">${t.id}</span>
    </button>`).join('');
}

async function submitProject(formData) {
  const selectedTool = document.querySelector('.tool-pick.selected')?.dataset.tool;
  if (!selectedTool) { document.getElementById('tool-err').classList.add('show'); return false; }

  const title = formData.get('title')?.trim();
  const url   = formData.get('url')?.trim();
  if (!title || !url) return false;

  const payload = {
    title,
    url,
    description:   formData.get('desc')?.trim() || null,
    category:      formData.get('category') || null,
    ai_tool:       selectedTool,
    is_free:       formData.get('pricing') !== 'paid',
    emoji:         '🚀',
    gradient_class:'gc-1',
    rating:        0,
    review_count:  0,
    is_featured:   false,
    is_editors_pick: false,
  };

  const { error } = await supabase.from('projects').insert([payload]);
  if (error) { alert('등록 중 오류가 발생했습니다: ' + error.message); return false; }
  return true;
}

// === MODAL / TAB HELPERS ===
function openModal(id) {
  const el = document.getElementById(id);
  el.style.display = 'flex';
  el.offsetHeight;
  el.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal(id) {
  const el = document.getElementById(id);
  el.classList.remove('open');
  document.body.style.overflow = '';
  setTimeout(() => { if (!el.classList.contains('open')) el.style.display = 'none'; }, 450);
}

function switchTab(tab) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.toggle('active', p.id === `panel-${tab}`));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// === SEARCH ===
function openSearch() {
  document.getElementById('search-overlay').classList.add('visible');
  setTimeout(() => document.getElementById('search-input').focus(), 250);
}
function closeSearch() {
  document.getElementById('search-overlay').classList.remove('visible');
  document.getElementById('search-input').value = '';
  document.getElementById('search-body').innerHTML = '<p class="search-hint">프로젝트 이름, AI 도구, 카테고리로 검색해 보세요</p>';
}

let searchTimer;
function doSearch(q) {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    const query = q.trim().toLowerCase();
    const body  = document.getElementById('search-body');
    if (!query) {
      body.innerHTML = '<p class="search-hint">프로젝트 이름, AI 도구, 카테고리로 검색해 보세요</p>';
      return;
    }
    const res = allProjects.filter(p =>
      (p.title || '').toLowerCase().includes(query) ||
      (p.description || '').toLowerCase().includes(query) ||
      (p.ai_tool || '').toLowerCase().includes(query) ||
      (p.category || '').toLowerCase().includes(query) ||
      (p.coder_name || '').toLowerCase().includes(query)
    );
    if (!res.length) { body.innerHTML = '<p class="search-empty">검색 결과가 없습니다 😔</p>'; return; }
    body.innerHTML = `<div class="app-list-full" style="margin-top:8px">${res.map(listItemHTML).join('')}</div>`;
    body.querySelectorAll('.list-item').forEach(el =>
      el.addEventListener('click', () => { closeSearch(); openDetail(+el.dataset.id); })
    );
  }, 200);
}

// === FILTER ===
function filterByTool(toolId) {
  switchTab('trending');
  document.querySelectorAll('.fpill').forEach(p => p.classList.remove('active'));
  const filtered = allProjects.filter(p => p.ai_tool === toolId);
  renderRankingCustom(filtered);
}
function filterByCat(catId) {
  switchTab('trending');
  document.querySelectorAll('.fpill').forEach(p => p.classList.remove('active'));
  const filtered = allProjects.filter(p => p.category === catId);
  renderRankingCustom(filtered);
}
function renderRankingCustom(list) {
  list = [...list].sort((a,b) => (b.rating * Math.sqrt(b.review_count||1)) - (a.rating * Math.sqrt(a.review_count||1)));
  const el = document.getElementById('rank-list');
  if (!list.length) { showEmpty('rank-list', '해당하는 프로젝트가 없습니다'); return; }
  el.innerHTML = list.map((p,i) => `
    <div class="rank-item" data-id="${p.id}">
      <div class="rank-num${i<3?' t3':''}">${i+1}</div>
      <div class="app-icon sz-60 ${p.gradient_class||'gc-1'}"><span class="ie">${p.emoji||'🚀'}</span></div>
      <div class="rank-info">
        <div class="rank-name">${p.title}</div>
        <div class="rank-sub">${p.description||''}</div>
        <div class="rank-meta">${stars(p.rating)}<span>${p.rating||0} (${p.review_count||0})</span></div>
      </div>
      <div class="rank-right"><button class="get-btn${paidCls(p)}">${priceLabel(p)}</button></div>
    </div>`).join('');
}

// === INIT ===
document.addEventListener('DOMContentLoaded', async () => {
  // Render tool picker (static)
  renderToolPicker();

  // Skeleton loaders
  showSkeleton('trending-row', 8, 'card');
  showSkeleton('editors-list', 4, 'list');
  showSkeleton('rank-list',    8, 'list');
  showSkeleton('new-list',     8, 'list');

  // Fetch from Supabase
  allProjects = await fetchProjects();

  // Render everything
  renderHero(allProjects);
  renderTrendingRow(allProjects);
  renderAiTools(allProjects);
  renderEditors(allProjects);
  renderRanking(allProjects);
  renderNewList(allProjects);
  renderCats(allProjects);

  // --- Hero ---
  document.getElementById('hero-dots').addEventListener('click', e => {
    const d = e.target.closest('.dot');
    if (d) { clearInterval(heroTimer); goSlide(+d.dataset.i); }
  });
  document.getElementById('hero-track').addEventListener('click', e => {
    const cta  = e.target.closest('.hero-cta');
    const card = e.target.closest('.hero-card');
    if (cta && cta.dataset.id) { openDetail(+cta.dataset.id); return; }
    if (card && card.dataset.id) openDetail(+card.dataset.id);
  });
  document.getElementById('hero-track').addEventListener('mouseenter', () => clearInterval(heroTimer));
  document.getElementById('hero-track').addEventListener('mouseleave', () => {
    const featured = allProjects.filter(p => p.is_featured);
    if (featured.length > 1) heroTimer = setInterval(() => { heroIdx=(heroIdx+1)%featured.length; goSlide(heroIdx); }, 5000);
  });

  // --- Tabs ---
  document.querySelector('.tab-inner').addEventListener('click', e => {
    const b = e.target.closest('.tab-btn'); if (b) switchTab(b.dataset.tab);
  });
  document.querySelectorAll('.see-all-btn').forEach(b =>
    b.addEventListener('click', () => switchTab(b.dataset.target))
  );

  // --- Cards & Lists ---
  document.getElementById('trending-row').addEventListener('click', e => {
    const c = e.target.closest('.app-card'); if (c) openDetail(+c.dataset.id);
  });
  document.getElementById('aitool-grid').addEventListener('click', e => {
    const c = e.target.closest('.aitool-chip'); if (c) filterByTool(c.dataset.tool);
  });
  document.getElementById('editors-list').addEventListener('click', e => {
    const c = e.target.closest('.list-item'); if (c) openDetail(+c.dataset.id);
  });
  document.getElementById('new-list').addEventListener('click', e => {
    const c = e.target.closest('.list-item'); if (c) openDetail(+c.dataset.id);
  });
  document.getElementById('rank-list').addEventListener('click', e => {
    const c = e.target.closest('.rank-item');
    if (c && !e.target.closest('.get-btn')) openDetail(+c.dataset.id);
  });
  document.getElementById('cat-grid').addEventListener('click', e => {
    const c = e.target.closest('.cat-card'); if (c) filterByCat(c.dataset.cat);
  });

  // --- Trending filters ---
  document.getElementById('trending-filters').addEventListener('click', e => {
    const p = e.target.closest('.fpill'); if (!p) return;
    document.querySelectorAll('.fpill').forEach(x => x.classList.remove('active'));
    p.classList.add('active');
    renderRanking(allProjects, p.dataset.filter);
  });

  // --- Modals ---
  document.getElementById('detail-close').addEventListener('click',   () => closeModal('detail-overlay'));
  document.getElementById('detail-backdrop').addEventListener('click', () => closeModal('detail-overlay'));
  document.getElementById('submit-open-btn').addEventListener('click', () => openModal('submit-overlay'));
  document.getElementById('submit-close').addEventListener('click',   () => closeModal('submit-overlay'));
  document.getElementById('submit-backdrop').addEventListener('click', () => closeModal('submit-overlay'));

  // --- Tool picker ---
  document.getElementById('aitool-picker').addEventListener('click', e => {
    const b = e.target.closest('.tool-pick'); if (!b) return;
    document.querySelectorAll('.tool-pick').forEach(x => x.classList.remove('selected'));
    b.classList.add('selected');
    document.getElementById('tool-err').classList.remove('show');
  });

  // --- Submit form ---
  document.getElementById('submit-form').addEventListener('submit', async e => {
    e.preventDefault();
    const btn = e.target.querySelector('.submit-cta');
    btn.textContent = '등록 중...'; btn.disabled = true;
    const ok = await submitProject(new FormData(e.target));
    if (ok) {
      alert('🎉 등록되었습니다! 잠시 후 목록에 반영됩니다.');
      closeModal('submit-overlay');
      e.target.reset();
      document.querySelectorAll('.tool-pick').forEach(x => x.classList.remove('selected'));
      allProjects = await fetchProjects();
      renderHero(allProjects); renderTrendingRow(allProjects); renderAiTools(allProjects);
      renderEditors(allProjects); renderRanking(allProjects); renderNewList(allProjects); renderCats(allProjects);
    }
    btn.textContent = '등록하기'; btn.disabled = false;
  });

  // --- Search ---
  document.getElementById('search-open-btn').addEventListener('click', openSearch);
  document.getElementById('search-close-btn').addEventListener('click', closeSearch);
  document.getElementById('search-cancel-btn').addEventListener('click', closeSearch);
  document.getElementById('search-input').addEventListener('input', e => doSearch(e.target.value));

  // --- ESC ---
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    closeModal('detail-overlay'); closeModal('submit-overlay'); closeSearch();
  });
});
