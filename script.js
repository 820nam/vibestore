// === DATA ===
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

const projects = [
  { id:1,  title:'프로젝트 네온',      emoji:'⚡', gc:'gc-1', hg:'hg-1', desc:'개발자를 위한 실시간 서버 모니터링 대시보드', longDesc:'Cursor AI와 함께 만든 실시간 서버 모니터링 대시보드. CPU, 메모리, 네트워크 트래픽을 아름다운 D3.js 차트로 시각화하며, 슬랙 알림 연동과 팀 협업 기능도 포함되어 있습니다.', category:'SaaS Dashboard', aiTool:'Cursor',   coder:'김민준', rating:4.8, reviews:213, free:true,  featured:true, badge:'이번 주 1위',     tags:['React','D3.js','WebSocket'] },
  { id:2,  title:'바이브 포트폴리오',  emoji:'✨', gc:'gc-3', hg:'hg-2', desc:'애니메이션이 살아있는 크리에이터 포트폴리오', longDesc:'Claude와 대화하며 만든 인터랙티브 포트폴리오. GSAP 애니메이션과 Three.js를 활용한 3D 배경이 특징이며, 다크/라이트 모드를 지원합니다.', category:'Portfolio',      aiTool:'Claude',   coder:'이서연', rating:4.6, reviews:89,  free:true,  featured:true, badge:'에디터 선정',     tags:['Three.js','GSAP','Tailwind'], editorsPick:true },
  { id:3,  title:'셀렉트샵',           emoji:'🛍️', gc:'gc-6', hg:'hg-3', desc:'트렌디한 패션 이커머스 플랫폼',             longDesc:'Bolt를 사용해 단 이틀 만에 완성한 패션 이커머스. 상품 필터링, 장바구니, Stripe 결제까지 완벽하게 구현되어 있습니다.', category:'E-Commerce',     aiTool:'Bolt',     coder:'박준혁', rating:4.4, reviews:156, free:false, price:'₩4,900', featured:true, badge:'신규 추천', tags:['Next.js','Stripe','Prisma'] },
  { id:4,  title:'퀀텀 랜딩',          emoji:'🎯', gc:'gc-7', desc:'스타트업을 위한 전환율 최적화 랜딩 페이지', longDesc:'v0로 UI를 설계하고 Cursor로 인터랙션을 추가한 랜딩 페이지. A/B 테스트 기능과 실시간 방문자 통계 위젯이 내장되어 있습니다.', category:'Landing Page',   aiTool:'v0',       coder:'최유나', rating:4.7, reviews:201, free:true,  editorsPick:true, tags:['React','Framer Motion','Analytics'] },
  { id:5,  title:'AI 블로그 엔진',     emoji:'✍️', gc:'gc-5', desc:'AI가 도와주는 마크다운 블로그 플랫폼',     longDesc:'Windsurf로 만든 AI 보조 블로그 플랫폼. 마크다운 에디터에 AI 자동완성, 자동 SEO 태그 생성, 소셜 카드 자동 생성 기능이 있습니다.', category:'Blog',           aiTool:'Windsurf', coder:'정도현', rating:4.3, reviews:44,  free:true,  tags:['Astro','MDX','OpenAI'] },
  { id:6,  title:'픽셀 갤러리',        emoji:'🖼️', gc:'gc-11',desc:'아티스트를 위한 무한 갤러리 포트폴리오',  longDesc:'Lovable로 만든 아티스트 포트폴리오. 무한 스크롤 Masonry 갤러리, Lightbox 뷰어, 작품 판매 연동까지 포함된 올인원 솔루션입니다.', category:'Portfolio',      aiTool:'Lovable',  coder:'한소희', rating:4.9, reviews:312, free:true,  editorsPick:true, tags:['Vue','GSAP','Cloudinary'] },
  { id:7,  title:'클라우드 대시',      emoji:'☁️', gc:'gc-2', desc:'팀을 위한 프로젝트 관리 SaaS 플랫폼',    longDesc:'Cursor로 구축한 팀 협업 SaaS. Kanban 보드, Gantt 차트, 슬랙 연동, 실시간 알림까지 포함된 완전한 프로젝트 관리 도구입니다.', category:'SaaS Dashboard', aiTool:'Cursor',   coder:'오승재', rating:4.5, reviews:178, free:false, price:'₩9,900', tags:['Next.js','Supabase','Pusher'] },
  { id:8,  title:'게임 허브',          emoji:'🎮', gc:'gc-4', desc:'인디 게임 개발자 커뮤니티 플랫폼',        longDesc:'Bolt로 만든 인디 게임 커뮤니티. 게임 업로드, 플레이 카운트 추적, 개발자 프로필, 댓글 시스템이 포함되어 있습니다.', category:'Game',           aiTool:'Bolt',     coder:'신미래', rating:4.2, reviews:67,  free:true,  tags:['React','Firebase'] },
  { id:9,  title:'결제 플로우',        emoji:'💳', gc:'gc-8', desc:'소상공인을 위한 간편 결제 페이지 빌더',  longDesc:'Claude와 함께 설계한 결제 페이지 빌더. QR코드, 카카오페이, 네이버페이 연동이 가능하며 모바일 최적화된 결제 UX를 제공합니다.', category:'E-Commerce',     aiTool:'Claude',   coder:'임채원', rating:4.6, reviews:93,  free:false, price:'₩2,900', tags:['Next.js','Stripe','TossPayments'] },
  { id:10, title:'디자인 시스템',      emoji:'🎨', gc:'gc-9', desc:'컴포넌트 라이브러리 문서화 사이트',       longDesc:'v0로 레이아웃을 설계한 디자인 시스템 사이트. 100+ 컴포넌트, 인터랙티브 Playground, 다크모드, 코드 스니펫 복사 기능을 갖추고 있습니다.', category:'Utility',        aiTool:'v0',       coder:'강지현', rating:4.8, reviews:445, free:true,  editorsPick:true, tags:['React','Storybook','Tailwind'] },
  { id:11, title:'AI 어시스턴트 UI',  emoji:'🧠', gc:'gc-10',desc:'나만의 AI 챗봇 인터페이스 빌더',          longDesc:'Windsurf로 만든 AI 챗봇 UI 빌더. OpenAI, Claude, Gemini API를 연결하고 커스텀 프롬프트와 브랜딩을 적용할 수 있습니다.', category:'AI Product',     aiTool:'Windsurf', coder:'이지훈', rating:4.7, reviews:167, free:false, price:'₩7,900', tags:['React','OpenAI','Vercel AI SDK'] },
  { id:12, title:'크리에이터 페이지', emoji:'⭐', gc:'gc-6', desc:'유튜버, 인플루언서를 위한 링크인바이오',  longDesc:'Lovable로 만든 크리에이터 링크 페이지. 소셜 링크 모음, 최신 영상 피드, 굿즈 판매, 멤버십 연동까지 한 페이지에 담았습니다.', category:'Landing Page',   aiTool:'Lovable',  coder:'박서아', rating:4.5, reviews:289, free:true,  tags:['Vue','Nuxt','YouTube API'] },
  { id:13, title:'데이터 스튜디오',   emoji:'📊', gc:'gc-1', desc:'NoCode 데이터 시각화 대시보드 빌더',     longDesc:'Claude와 함께 구축한 데이터 시각화 플랫폼. CSV/JSON 파일을 드래그로 올리면 자동으로 최적의 차트를 추천하고 생성합니다.', category:'SaaS Dashboard', aiTool:'Claude',   coder:'김태양', rating:4.4, reviews:72,  free:false, price:'₩12,900', tags:['Python','Chart.js','FastAPI'] },
  { id:14, title:'미니 스토어',        emoji:'🏪', gc:'gc-5', desc:'1인 셀러를 위한 초경량 쇼핑몰',           longDesc:'Cursor로 빠르게 만든 1인 쇼핑몰 템플릿. 상품 5개까지는 완전 무료로 운영 가능하며, 설정부터 배포까지 10분이면 충분합니다.', category:'E-Commerce',     aiTool:'Cursor',   coder:'윤하늘', rating:4.3, reviews:134, free:true,  tags:['Next.js','Vercel','Stripe'] },
  { id:15, title:'리딩 블로그',        emoji:'📚', gc:'gc-3', desc:'독서 기록과 리뷰를 위한 감성 블로그',    longDesc:'Bolt를 사용해 만든 독서 커뮤니티 블로그. 책 검색 API 연동, 독서 현황 시각화, 월별 독서 목표 트래킹 기능이 있습니다.', category:'Blog',           aiTool:'Bolt',     coder:'오다연', rating:4.6, reviews:58,  free:true,  tags:['Astro','Google Books API','Tailwind'] },
  { id:16, title:'인터랙티브 포트폴리오', emoji:'🌟', gc:'gc-12',desc:'마우스를 따라 움직이는 몰입형 포트폴리오', longDesc:'v0로 레이아웃을 잡고 Three.js와 GSAP으로 완성한 풀 인터랙티브 포트폴리오. 마우스 움직임에 반응하는 파티클 배경과 3D 프로젝트 카드가 특징입니다.', category:'Portfolio',  aiTool:'v0', coder:'채민호', rating:4.9, reviews:521, free:true, editorsPick:true, tags:['Three.js','GSAP','WebGL'] },
];

// === UTILS ===
function stars(r) {
  let h = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(r)) h += '<span class="sf">★</span>';
    else if (i === Math.ceil(r) && r % 1 >= 0.4) h += '<span class="sf" style="opacity:.55">★</span>';
    else h += '<span>★</span>';
  }
  return `<span class="stars">${h}</span>`;
}
function priceLabel(p) { return p.free ? '보기' : (p.price || '유료'); }
function paidCls(p) { return p.free ? '' : ' paid'; }
function tool(id) { return AI_TOOLS.find(t => t.id === id) || AI_TOOLS[0]; }

// === HERO CAROUSEL ===
let heroIdx = 0, heroTimer = null;
const featured = projects.filter(p => p.featured);

function renderHero() {
  const track = document.getElementById('hero-track');
  const dotsEl = document.getElementById('hero-dots');
  track.innerHTML = featured.map(p => {
    const t = tool(p.aiTool);
    return `<div class="hero-card ${p.hg||'hg-1'}" data-id="${p.id}">
      <div class="hero-overlay"></div>
      <div class="hero-deco">${p.emoji}</div>
      <div class="hero-content">
        <div class="hero-badge">✦ ${p.badge||'주목 프로젝트'}</div>
        <h2 class="hero-title">${p.title}</h2>
        <p class="hero-sub">${p.desc}</p>
        <div class="hero-meta">
          <span class="hero-author">by ${p.coder}</span>
          <span class="tool-sm ${t.cls}">${t.emoji} ${p.aiTool}</span>
        </div>
        <button class="hero-cta" data-id="${p.id}">자세히 보기 →</button>
      </div>
    </div>`;
  }).join('');
  dotsEl.innerHTML = featured.map((_,i) => `<div class="dot${i===0?' active':''}" data-i="${i}"></div>`).join('');
}

function goSlide(i) {
  heroIdx = i;
  document.getElementById('hero-track').style.transform = `translateX(-${i*100}%)`;
  document.querySelectorAll('.dot').forEach((d,j) => d.classList.toggle('active', j===i));
}

function startTimer() {
  heroTimer = setInterval(() => goSlide((heroIdx+1) % featured.length), 5000);
}

// === TRENDING ROW ===
function renderTrendingRow() {
  const sorted = [...projects].sort((a,b) => b.rating*b.reviews - a.rating*a.reviews).slice(0,10);
  document.getElementById('trending-row').innerHTML = sorted.map(p => `
    <div class="app-card" data-id="${p.id}">
      <div class="app-icon ${p.gc}"><span class="ie">${p.emoji}</span></div>
      <div class="ac-name">${p.title}</div>
      <div class="ac-cat">${p.category}</div>
      <div class="ac-btm">${stars(p.rating)}<button class="get-btn${paidCls(p)}">${priceLabel(p)}</button></div>
    </div>`).join('');
}

// === AI TOOLS GRID ===
function renderAiTools(containerId) {
  const counts = {};
  projects.forEach(p => { counts[p.aiTool] = (counts[p.aiTool]||0)+1; });
  document.getElementById(containerId).innerHTML = AI_TOOLS.map(t => `
    <div class="aitool-chip" data-tool="${t.id}">
      <div class="tool-icon ${t.cls}">${t.emoji}</div>
      <div><div class="aitool-name">${t.id}</div><div class="aitool-count">${counts[t.id]||0}개</div></div>
    </div>`).join('');
}

// === LIST ITEMS ===
function listItemHTML(p) {
  const t = tool(p.aiTool);
  return `<div class="list-item" data-id="${p.id}">
    <div class="app-icon sz-60 ${p.gc}"><span class="ie">${p.emoji}</span></div>
    <div class="list-info">
      <div class="list-title">${p.title}</div>
      <div class="list-desc">${p.desc}</div>
      <div class="list-chips"><span class="lchip">${p.category}</span><span class="lchip">${p.aiTool}</span></div>
    </div>
    <div class="list-right">${stars(p.rating)}<button class="get-btn${paidCls(p)}">${priceLabel(p)}</button></div>
  </div>`;
}

function renderEditors() {
  document.getElementById('editors-list').innerHTML =
    projects.filter(p => p.editorsPick).slice(0,5).map(listItemHTML).join('');
}

function renderNewList() {
  document.getElementById('new-list').innerHTML = projects.map(listItemHTML).join('');
}

// === RANKING ===
function renderRanking(filter='all') {
  let list = [...projects];
  if (filter==='free') list = list.filter(p=>p.free);
  if (filter==='paid') list = list.filter(p=>!p.free);
  list.sort((a,b) => b.rating*Math.sqrt(b.reviews) - a.rating*Math.sqrt(a.reviews));
  document.getElementById('rank-list').innerHTML = list.map((p,i) => `
    <div class="rank-item" data-id="${p.id}">
      <div class="rank-num${i<3?' t3':''}">${i+1}</div>
      <div class="app-icon sz-60 ${p.gc}"><span class="ie">${p.emoji}</span></div>
      <div class="rank-info">
        <div class="rank-name">${p.title}</div>
        <div class="rank-sub">${p.desc}</div>
        <div class="rank-meta">${stars(p.rating)}<span>${p.rating} (${p.reviews})</span><span>·</span><span>${p.aiTool}</span></div>
      </div>
      <div class="rank-right"><button class="get-btn${paidCls(p)}">${priceLabel(p)}</button></div>
    </div>`).join('');
}

// === CATEGORIES ===
function renderCats() {
  const counts = {};
  projects.forEach(p => { counts[p.category] = (counts[p.category]||0)+1; });
  document.getElementById('cat-grid').innerHTML = Object.entries(CAT_META).map(([id,m]) =>
    `<div class="cat-card" data-cat="${id}" style="background:${m.bg}">
      <div class="cat-deco">${m.emoji}</div>
      <div class="cat-name">${m.name}</div>
      <div class="cat-count">${counts[id]||0}개</div>
    </div>`).join('');
}

// === SUBMIT TOOL PICKER ===
function renderToolPicker() {
  document.getElementById('aitool-picker').innerHTML = AI_TOOLS.map(t =>
    `<button type="button" class="tool-pick" data-tool="${t.id}">
      <span class="tp-emoji">${t.emoji}</span>
      <span class="tp-name">${t.id}</span>
    </button>`).join('');
}

// === DETAIL MODAL ===
function openDetail(id) {
  const p = projects.find(x=>x.id===id);
  if (!p) return;
  const t = tool(p.aiTool);
  const catName = CAT_META[p.category]?.name || p.category;
  document.getElementById('detail-content').innerHTML = `
    <div class="d-hero ${p.hg||p.gc}">
      <span style="position:relative;z-index:1">${p.emoji}</span>
      <div class="d-hero-fade"></div>
    </div>
    <div class="d-body">
      <div class="d-top">
        <div class="d-icon-wrap"><div class="app-icon sz-100 ${p.gc}"><span class="ie">${p.emoji}</span></div></div>
        <div class="d-meta">
          <div class="d-name">${p.title}</div>
          <div class="d-coder">by ${p.coder}</div>
          <div class="d-rating">${stars(p.rating)}<span style="font-weight:700">${p.rating}</span><span>(${p.reviews.toLocaleString()}개 리뷰)</span></div>
        </div>
      </div>
      <p class="d-desc">${p.longDesc||p.desc}</p>
      <div class="d-info">
        <div class="info-box"><div class="info-lbl">카테고리</div><div class="info-val">${catName}</div></div>
        <div class="info-box"><div class="info-lbl">가격</div><div class="info-val">${p.free?'무료':p.price}</div></div>
        <div class="info-box"><div class="info-lbl">제작자</div><div class="info-val">${p.coder}</div></div>
        <div class="info-box"><div class="info-lbl">리뷰</div><div class="info-val">${p.reviews.toLocaleString()}개</div></div>
      </div>
      <div class="d-ai">
        <div class="d-ai-icon ${t.cls}">${t.emoji}</div>
        <div class="d-ai-text"><strong>${p.aiTool}</strong>으로 바이브코딩하여 만들어진 프로젝트입니다</div>
      </div>
      ${p.tags?`<div class="d-tags">${p.tags.map(tg=>`<span class="tag-pill">${tg}</span>`).join('')}</div>`:''}
      <button class="d-visit" onclick="window.open('${p.url||'#'}','_blank')">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        웹사이트 방문하기
      </button>
    </div>`;
  openModal('detail-overlay');
}

// === MODAL / SEARCH HELPERS ===
function openModal(id)  { document.getElementById(id).classList.add('open'); document.body.style.overflow='hidden'; }
function closeModal(id) { document.getElementById(id).classList.remove('open'); document.body.style.overflow=''; }

function switchTab(tab) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab===tab));
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.toggle('active', p.id===`panel-${tab}`));
  window.scrollTo({top:0, behavior:'smooth'});
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
    const body = document.getElementById('search-body');
    if (!query) { body.innerHTML = '<p class="search-hint">프로젝트 이름, AI 도구, 카테고리로 검색해 보세요</p>'; return; }
    const res = projects.filter(p =>
      p.title.toLowerCase().includes(query) ||
      p.desc.toLowerCase().includes(query) ||
      p.aiTool.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      p.coder.toLowerCase().includes(query)
    );
    if (!res.length) { body.innerHTML = '<p class="search-empty">검색 결과가 없습니다 😔</p>'; return; }
    body.innerHTML = `<div class="app-list-full" style="margin-top:8px">${res.map(listItemHTML).join('')}</div>`;
    body.querySelectorAll('.list-item').forEach(el =>
      el.addEventListener('click', () => { closeSearch(); openDetail(+el.dataset.id); })
    );
  }, 200);
}

// === FILTER HELPERS ===
function filterByTool(toolId) {
  switchTab('trending');
  document.querySelectorAll('.fpill').forEach(p => p.classList.remove('active'));
  let list = projects.filter(p => p.aiTool===toolId).sort((a,b) => b.rating*Math.sqrt(b.reviews)-a.rating*Math.sqrt(a.reviews));
  document.getElementById('rank-list').innerHTML = list.map((p,i) => `
    <div class="rank-item" data-id="${p.id}">
      <div class="rank-num${i<3?' t3':''}">${i+1}</div>
      <div class="app-icon sz-60 ${p.gc}"><span class="ie">${p.emoji}</span></div>
      <div class="rank-info">
        <div class="rank-name">${p.title}</div>
        <div class="rank-sub">${p.desc}</div>
        <div class="rank-meta">${stars(p.rating)}<span>${p.rating} (${p.reviews})</span></div>
      </div>
      <div class="rank-right"><button class="get-btn${paidCls(p)}">${priceLabel(p)}</button></div>
    </div>`).join('');
  bindRankClicks();
}

function filterByCat(catId) {
  switchTab('trending');
  document.querySelectorAll('.fpill').forEach(p => p.classList.remove('active'));
  let list = projects.filter(p => p.category===catId).sort((a,b) => b.rating*Math.sqrt(b.reviews)-a.rating*Math.sqrt(a.reviews));
  document.getElementById('rank-list').innerHTML = list.map((p,i) => `
    <div class="rank-item" data-id="${p.id}">
      <div class="rank-num${i<3?' t3':''}">${i+1}</div>
      <div class="app-icon sz-60 ${p.gc}"><span class="ie">${p.emoji}</span></div>
      <div class="rank-info">
        <div class="rank-name">${p.title}</div>
        <div class="rank-sub">${p.desc}</div>
        <div class="rank-meta">${stars(p.rating)}<span>${p.rating} (${p.reviews})</span><span>· ${p.aiTool}</span></div>
      </div>
      <div class="rank-right"><button class="get-btn${paidCls(p)}">${priceLabel(p)}</button></div>
    </div>`).join('');
  bindRankClicks();
}

function bindRankClicks() {
  document.querySelectorAll('#rank-list .rank-item').forEach(el =>
    el.addEventListener('click', e => { if (!e.target.closest('.get-btn')) openDetail(+el.dataset.id); })
  );
}

// === INIT ===
document.addEventListener('DOMContentLoaded', () => {
  // Render
  renderHero(); renderTrendingRow(); renderAiTools('aitool-grid');
  renderEditors(); renderRanking(); renderNewList(); renderCats(); renderToolPicker();
  startTimer();

  // Hero dots
  document.getElementById('hero-dots').addEventListener('click', e => {
    const d = e.target.closest('.dot');
    if (d) { clearInterval(heroTimer); goSlide(+d.dataset.i); startTimer(); }
  });

  // Hero track clicks
  document.getElementById('hero-track').addEventListener('click', e => {
    const card = e.target.closest('.hero-card');
    if (!card) return;
    if (e.target.closest('.hero-cta')) { openDetail(+e.target.closest('.hero-cta').dataset.id); return; }
    openDetail(+card.dataset.id);
  });
  document.getElementById('hero-track').addEventListener('mouseenter', () => clearInterval(heroTimer));
  document.getElementById('hero-track').addEventListener('mouseleave', startTimer);

  // Tabs
  document.querySelector('.tab-inner').addEventListener('click', e => {
    const b = e.target.closest('.tab-btn'); if (b) switchTab(b.dataset.tab);
  });

  // See all
  document.querySelectorAll('.see-all-btn').forEach(b =>
    b.addEventListener('click', () => switchTab(b.dataset.target))
  );

  // App cards
  document.getElementById('trending-row').addEventListener('click', e => {
    const c = e.target.closest('.app-card'); if (c) openDetail(+c.dataset.id);
  });

  // AI tools
  document.getElementById('aitool-grid').addEventListener('click', e => {
    const c = e.target.closest('.aitool-chip'); if (c) filterByTool(c.dataset.tool);
  });

  // Editors list
  document.getElementById('editors-list').addEventListener('click', e => {
    const c = e.target.closest('.list-item'); if (c) openDetail(+c.dataset.id);
  });

  // New list
  document.getElementById('new-list').addEventListener('click', e => {
    const c = e.target.closest('.list-item'); if (c) openDetail(+c.dataset.id);
  });

  // Ranking filter pills
  document.getElementById('trending-filters').addEventListener('click', e => {
    const p = e.target.closest('.fpill');
    if (!p) return;
    document.querySelectorAll('.fpill').forEach(x => x.classList.remove('active'));
    p.classList.add('active');
    renderRanking(p.dataset.filter);
    bindRankClicks();
  });

  // Ranking list
  document.getElementById('rank-list').addEventListener('click', e => {
    const c = e.target.closest('.rank-item');
    if (c && !e.target.closest('.get-btn')) openDetail(+c.dataset.id);
  });

  // Categories
  document.getElementById('cat-grid').addEventListener('click', e => {
    const c = e.target.closest('.cat-card'); if (c) filterByCat(c.dataset.cat);
  });

  // Detail modal
  document.getElementById('detail-close').addEventListener('click', () => closeModal('detail-overlay'));
  document.getElementById('detail-backdrop').addEventListener('click', () => closeModal('detail-overlay'));

  // Search
  document.getElementById('search-open-btn').addEventListener('click', openSearch);
  document.getElementById('search-close-btn').addEventListener('click', closeSearch);
  document.getElementById('search-cancel-btn').addEventListener('click', closeSearch);
  document.getElementById('search-input').addEventListener('input', e => doSearch(e.target.value));

  // Submit modal
  document.getElementById('submit-open-btn').addEventListener('click', () => openModal('submit-overlay'));
  document.getElementById('submit-close').addEventListener('click', () => closeModal('submit-overlay'));
  document.getElementById('submit-backdrop').addEventListener('click', () => closeModal('submit-overlay'));

  // Tool picker
  document.getElementById('aitool-picker').addEventListener('click', e => {
    const b = e.target.closest('.tool-pick');
    if (!b) return;
    document.querySelectorAll('.tool-pick').forEach(x => x.classList.remove('selected'));
    b.classList.add('selected');
    document.getElementById('tool-err').classList.remove('show');
  });

  // Submit form
  document.getElementById('submit-form').addEventListener('submit', e => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const title = fd.get('title')?.trim();
    const url = fd.get('url')?.trim();
    const selected = document.querySelector('.tool-pick.selected');
    if (!selected) { document.getElementById('tool-err').classList.add('show'); return; }
    if (!title || !url) return;
    alert('🎉 프로젝트가 제출되었습니다!\n검토 후 빠르게 등록해 드릴게요.');
    closeModal('submit-overlay');
    e.target.reset();
    document.querySelectorAll('.tool-pick').forEach(x => x.classList.remove('selected'));
  });

  // ESC
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    closeModal('detail-overlay'); closeModal('submit-overlay'); closeSearch();
  });
});
