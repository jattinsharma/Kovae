-- KOVAE Initial Schema
-- Phase 2: Comprehensive Database Foundation

-- Enable necessary extensions
create extension if not exists "uuid-ossp";
create extension if not exists "postgis"; -- useful for gyms location if needed later

-- ==========================================
-- 1. USERS & PROFILES
-- ==========================================

-- users table is managed by auth.users in Supabase, but we often create a public.profiles table that links to it.
create table public.profiles (
    id uuid references auth.users(id) on delete cascade primary key,
    full_name text,
    username text unique,
    avatar_url text,
    experience_level text check (experience_level in ('beginner', 'intermediate', 'advanced')),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.goals (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references public.profiles(id) on delete cascade not null,
    primary_goal text not null, -- e.g., 'hypertrophy', 'strength', 'weight_loss'
    target_weight decimal(5,2),
    target_date date,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ==========================================
-- 2. GYMS & EXERCISES
-- ==========================================

create table public.gyms (
    id uuid default uuid_generate_v4() primary key,
    name text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.equipment (
    id uuid default uuid_generate_v4() primary key,
    name text not null,
    category text, -- e.g., 'barbell', 'dumbbell', 'machine', 'cable'
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.exercises (
    id uuid default uuid_generate_v4() primary key,
    name text not null,
    primary_muscle text not null,
    secondary_muscles text[],
    mechanic text check (mechanic in ('compound', 'isolation')),
    equipment_id uuid references public.equipment(id) on delete set null,
    instructions text,
    video_url text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ==========================================
-- 3. PLANNER ENGINE (Multi-day Plans)
-- ==========================================

create table public.plans (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references public.profiles(id) on delete cascade not null,
    week_start date not null,
    week_end date not null,
    version integer default 1,
    is_active boolean default true,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.plan_days (
    id uuid default uuid_generate_v4() primary key,
    plan_id uuid references public.plans(id) on delete cascade not null,
    date date not null,
    day_type text not null check (day_type in ('training', 'rest', 'active_recovery')),
    title text,
    duration_minutes integer,
    muscle_groups text[],
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    unique(plan_id, date)
);

create table public.planned_exercises (
    id uuid default uuid_generate_v4() primary key,
    plan_day_id uuid references public.plan_days(id) on delete cascade not null,
    exercise_id uuid references public.exercises(id) on delete restrict not null,
    sets integer not null,
    reps_min integer not null,
    reps_max integer not null,
    rest_seconds integer not null,
    sort_order integer not null,
    notes text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ==========================================
-- 4. TODAY ENGINE / TRACKING (Workouts & Sets)
-- ==========================================

create table public.workout_sessions (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references public.profiles(id) on delete cascade not null,
    plan_day_id uuid references public.plan_days(id) on delete set null,
    title text not null,
    started_at timestamp with time zone not null default timezone('utc'::text, now()),
    ended_at timestamp with time zone,
    status text not null check (status in ('in_progress', 'completed', 'canceled')),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.workout_exercises (
    id uuid default uuid_generate_v4() primary key,
    workout_session_id uuid references public.workout_sessions(id) on delete cascade not null,
    exercise_id uuid references public.exercises(id) on delete restrict not null,
    planned_exercise_id uuid references public.planned_exercises(id) on delete set null,
    sort_order integer not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.sets (
    id uuid default uuid_generate_v4() primary key,
    workout_exercise_id uuid references public.workout_exercises(id) on delete cascade not null,
    set_number integer not null,
    weight decimal(5,2),
    reps integer,
    rpe decimal(3,1), -- Rate of Perceived Exertion (1-10)
    is_warmup boolean default false,
    completed_at timestamp with time zone,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ==========================================
-- 5. ARCS & HABITS
-- ==========================================

create table public.arcs (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references public.profiles(id) on delete cascade not null,
    name text not null, -- e.g., 'Winter Arc'
    start_date date not null,
    end_date date not null,
    status text not null check (status in ('active', 'completed', 'abandoned')),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.habits (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references public.profiles(id) on delete cascade not null,
    title text not null,
    icon text,
    target_value text,
    is_active boolean default true,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.arc_habits (
    arc_id uuid references public.arcs(id) on delete cascade not null,
    habit_id uuid references public.habits(id) on delete cascade not null,
    primary key (arc_id, habit_id)
);

create table public.habit_logs (
    id uuid default uuid_generate_v4() primary key,
    habit_id uuid references public.habits(id) on delete cascade not null,
    date date not null,
    completed boolean default false,
    current_value text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    unique(habit_id, date)
);

-- ==========================================
-- 6. SOCIAL (Friends & Challenges)
-- ==========================================

create table public.friends (
    user_id_1 uuid references public.profiles(id) on delete cascade not null,
    user_id_2 uuid references public.profiles(id) on delete cascade not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    primary key (user_id_1, user_id_2)
);

create table public.friend_requests (
    id uuid default uuid_generate_v4() primary key,
    sender_id uuid references public.profiles(id) on delete cascade not null,
    receiver_id uuid references public.profiles(id) on delete cascade not null,
    status text not null check (status in ('pending', 'accepted', 'rejected')),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    unique(sender_id, receiver_id)
);

create table public.challenges (
    id uuid default uuid_generate_v4() primary key,
    creator_id uuid references public.profiles(id) on delete cascade not null,
    title text not null,
    description text,
    start_date date not null,
    end_date date not null,
    metric_type text not null, -- e.g., 'workouts_completed', 'total_volume', 'habit_streak'
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.challenge_members (
    challenge_id uuid references public.challenges(id) on delete cascade not null,
    user_id uuid references public.profiles(id) on delete cascade not null,
    joined_at timestamp with time zone default timezone('utc'::text, now()) not null,
    score decimal(10,2) default 0,
    primary key (challenge_id, user_id)
);

create table public.challenge_events (
    id uuid default uuid_generate_v4() primary key,
    challenge_id uuid references public.challenges(id) on delete cascade not null,
    user_id uuid references public.profiles(id) on delete cascade not null,
    event_type text not null,
    points_awarded decimal(10,2) not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ==========================================
-- 7. GAMIFICATION & PROGRESS
-- ==========================================

create table public.xp_transactions (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references public.profiles(id) on delete cascade not null,
    amount integer not null,
    source text not null, -- e.g., 'workout_completed', 'habit_streak', 'challenge_won'
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.achievements (
    id uuid default uuid_generate_v4() primary key,
    name text not null,
    description text not null,
    icon_url text,
    xp_reward integer not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.user_achievements (
    user_id uuid references public.profiles(id) on delete cascade not null,
    achievement_id uuid references public.achievements(id) on delete cascade not null,
    unlocked_at timestamp with time zone default timezone('utc'::text, now()) not null,
    primary key (user_id, achievement_id)
);

-- ==========================================
-- 8. RECOVERY & ANALYTICS
-- ==========================================

create table public.recovery_records (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references public.profiles(id) on delete cascade not null,
    date date not null,
    readiness_score decimal(5,2),
    sleep_hours decimal(4,2),
    soreness_level integer check (soreness_level between 1 and 5),
    notes text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    unique(user_id, date)
);

create table public.notifications (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references public.profiles(id) on delete cascade not null,
    title text not null,
    body text not null,
    is_read boolean default false,
    action_url text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.analytics_events (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references public.profiles(id) on delete cascade,
    event_name text not null,
    event_data jsonb,
    platform text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ==========================================
-- RLS (Row Level Security) - Minimal setup
-- ==========================================

-- Enable RLS on core tables
alter table public.profiles enable row level security;
alter table public.plans enable row level security;
alter table public.workout_sessions enable row level security;

-- Profiles: Users can read and update their own profile. Others can read public info (handled via views or functions later, but for now allow reading).
create policy "Users can view all profiles." on public.profiles for select using (true);
create policy "Users can update own profile." on public.profiles for update using (auth.uid() = id);

-- Plans: Users can only see their own plans.
create policy "Users can view own plans." on public.plans for select using (auth.uid() = user_id);
create policy "Users can insert own plans." on public.plans for insert with check (auth.uid() = user_id);
create policy "Users can update own plans." on public.plans for update using (auth.uid() = user_id);

-- Workouts: Users can only see their own workouts.
create policy "Users can view own workouts." on public.workout_sessions for select using (auth.uid() = user_id);
create policy "Users can insert own workouts." on public.workout_sessions for insert with check (auth.uid() = user_id);
create policy "Users can update own workouts." on public.workout_sessions for update using (auth.uid() = user_id);
create policy "Users can delete own workouts." on public.workout_sessions for delete using (auth.uid() = user_id);

-- Add a trigger to create a profile when a new user signs up in Supabase Auth
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- End of schema
