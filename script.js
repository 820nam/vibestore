const projects = [
    {
        id: 1,
        title: "프로젝트 제네시스",
        desc: "차세대 미니멀리즘 인터페이스 가이드",
        image: "https://cdn-icons-png.flaticon.com/512/1055/1055685.png",
        category: "Landing Page",
        framework: "React",
        rank: 1
    },
    {
        id: 2,
        title: "코드 스케이프",
        desc: "개발자를 위한 몰입형 IDE 컨셉",
        image: "https://cdn-icons-png.flaticon.com/512/2621/2621071.png",
        category: "SaaS Dashboard",
        framework: "Next.js",
        rank: 2
    },
    {
        id: 3,
        title: "프로젝트 알파",
        desc: "엔터프라이즈급 대시보드 솔루션",
        image: "https://cdn-icons-png.flaticon.com/512/6122/6122998.png",
        category: "SaaS Dashboard",
        framework: "Vue",
        rank: 3
    },
    {
        id: 4,
        title: "디자인 킷",
        desc: "모듈형 컴포넌트 라이브러리",
        image: "https://cdn-icons-png.flaticon.com/512/8297/8297424.png",
        category: "Portfolio",
        framework: "Three.js",
        rank: 4
    },
    {
        id: 5,
        title: "유저 플로우",
        desc: "지능형 히트맵 분석 도구",
        image: "https://cdn-icons-png.flaticon.com/512/3242/3242257.png",
        category: "SaaS Dashboard",
        framework: "React",
        rank: 5
    },
    {
        id: 6,
        title: "퀀텀 엔진",
        desc: "고속 렌더링 물리 엔진",
        image: "https://cdn-icons-png.flaticon.com/512/4603/4603683.png",
        category: "Landing Page",
        framework: "Three.js",
        rank: 6
    },
    {
        id: 7,
        title: "클라우드 싱크",
        desc: "실시간 데이터 동기화 플랫폼",
        image: "https://cdn-icons-png.flaticon.com/512/2850/2850314.png",
        category: "SaaS Dashboard",
        framework: "Next.js",
        rank: 7
    },
    {
        id: 8,
        title: "실드 가드",
        desc: "차세대 보안 인증 솔루션",
        image: "https://cdn-icons-png.flaticon.com/512/2764/2764516.png",
        category: "E-Commerce",
        framework: "React",
        rank: 8
    }
];

const container = document.getElementById('project-container');

function renderProjects(data) {
    container.innerHTML = '';
    
    data.forEach((project, index) => {
        // Stagger animation delay
        const delay = index * 0.1;
        
        const card = document.createElement('div');
        card.className = 'project-card';
        card.style.animationDelay = `${delay}s`;
        
        card.innerHTML = `
            <div class="rank-badge">${project.rank}</div>
            <div class="card-image-wrapper">
                <img src="${project.image}" alt="${project.title}">
            </div>
            <div class="card-content">
                <h3 class="card-title">${project.title}</h3>
                <p class="card-desc">${project.desc}</p>
                <div style="flex-grow: 1;"></div>
                <button class="card-btn">보기</button>
            </div>
        `;
        
        container.appendChild(card);
    });
}

// Initial Render
renderProjects(projects);

// Basic interaction handlers
document.querySelectorAll('.filter-list li').forEach(li => {
    li.addEventListener('click', (e) => {
        document.querySelectorAll('.filter-list li').forEach(el => el.classList.remove('active'));
        e.target.classList.add('active');
        // Simple mock filtering
        const filtered = e.target.textContent === '전체 보기' 
            ? projects 
            : projects.filter(p => Math.random() > 0.3); // mock random filter
        renderProjects(filtered);
    });
});

document.querySelectorAll('.tag').forEach(tag => {
    tag.addEventListener('click', (e) => {
        e.target.classList.toggle('active');
    });
});
