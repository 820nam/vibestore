-- =============================================
-- Vibestore — Supabase DB Schema
-- Supabase 대시보드 > SQL Editor 에서 실행하세요
-- =============================================

create table if not exists projects (
  id              bigint generated always as identity primary key,
  title           text        not null,
  description     text,
  long_desc       text,
  emoji           text        default '🚀',
  gradient_class  text        default 'gc-1',   -- gc-1 ~ gc-12
  featured_gradient text      default 'hg-1',   -- hg-1 ~ hg-5 (히어로 카드용)
  category        text,                          -- 'SaaS Dashboard' | 'E-Commerce' | 'Portfolio' | 'Landing Page' | 'Blog' | 'Game' | 'Utility' | 'AI Product'
  ai_tool         text,                          -- 'Cursor' | 'Claude' | 'Bolt' | 'Lovable' | 'v0' | 'Windsurf'
  coder_name      text,
  rating          numeric(2,1) default 0,
  review_count    integer      default 0,
  is_free         boolean      default true,
  price           text,                          -- 유료일 때 표시할 금액 문자열 ex) '₩4,900'
  url             text,
  is_featured     boolean      default false,    -- 히어로 캐러셀 노출 여부
  featured_badge  text,                          -- 히어로 배지 텍스트 ex) '이번 주 1위'
  is_editors_pick boolean      default false,    -- 에디터 픽 노출 여부
  tags            text[]       default '{}',     -- ex) ARRAY['React','Tailwind']
  created_at      timestamptz  default now()
);

-- 인덱스
create index if not exists idx_projects_category  on projects(category);
create index if not exists idx_projects_ai_tool   on projects(ai_tool);
create index if not exists idx_projects_featured  on projects(is_featured);
create index if not exists idx_projects_created   on projects(created_at desc);

-- RLS (Row Level Security)
alter table projects enable row level security;

-- 누구나 읽기 가능
create policy "Public read"
  on projects for select
  using (true);

-- 누구나 등록 가능 (나중에 인증 추가 시 수정)
create policy "Public insert"
  on projects for insert
  with check (true);
