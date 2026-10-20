-- Таблица заявок с сайта Анастасии Островской
-- Выполнить один раз: Supabase → SQL Editor → вставить → Run

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 1 and 120),
  contact text not null check (char_length(contact) between 3 and 120),
  audience text not null check (audience in ('team', 'self')),
  team_size text check (team_size is null or char_length(team_size) <= 40),
  message text check (message is null or char_length(message) <= 2000),
  page text check (page is null or char_length(page) <= 500),
  utm jsonb,
  consent boolean not null default false
);

-- Читать и писать может только сайт с секретным ключом, никто снаружи
alter table public.leads enable row level security;
