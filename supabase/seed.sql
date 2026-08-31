-- ==========================================
-- KOVAE SEED DATA
-- ==========================================

-- 1. EQUIPMENT CATALOG
insert into public.equipment (name, category) values
    ('Barbell', 'barbell'),
    ('Dumbbell', 'dumbbell'),
    ('Kettlebell', 'kettlebell'),
    ('Cable Machine', 'machine'),
    ('Smith Machine', 'machine'),
    ('Leg Press Machine', 'machine'),
    ('Lat Pulldown Machine', 'machine'),
    ('Bench', 'bench'),
    ('Pull-up Bar', 'bodyweight'),
    ('Resistance Band', 'band'),
    ('Medicine Ball', 'other'),
    ('Bodyweight', 'bodyweight')
on conflict do nothing;

-- 2. EXERCISES CATALOG
-- Note: UUIDs for equipment would typically be dynamically looked up, but since this is a seed script 
-- and we are inserting them, we can use subqueries.

insert into public.exercises (name, primary_muscle, secondary_muscles, mechanic, equipment_id, instructions)
values
    -- Chest
    (
        'Barbell Bench Press', 'Chest', '{"Triceps", "Shoulders"}', 'compound',
        (select id from public.equipment where name = 'Barbell' limit 1),
        'Lie on a flat bench. Unrack the barbell, lower it to your mid-chest, and press it back up.'
    ),
    (
        'Dumbbell Incline Press', 'Chest', '{"Triceps", "Shoulders"}', 'compound',
        (select id from public.equipment where name = 'Dumbbell' limit 1),
        'Set bench to a 30-45 degree incline. Press dumbbells upwards and slightly inwards.'
    ),
    -- Back
    (
        'Barbell Deadlift', 'Back', '{"Hamstrings", "Glutes", "Core"}', 'compound',
        (select id from public.equipment where name = 'Barbell' limit 1),
        'Stand with mid-foot under the bar. Hinge at hips to grab the bar, keep back straight, and stand up.'
    ),
    (
        'Lat Pulldown', 'Back', '{"Biceps"}', 'compound',
        (select id from public.equipment where name = 'Lat Pulldown Machine' limit 1),
        'Sit at the machine, grab the wide bar, and pull it down to your upper chest.'
    ),
    -- Legs
    (
        'Barbell Squat', 'Quads', '{"Glutes", "Hamstrings", "Core"}', 'compound',
        (select id from public.equipment where name = 'Barbell' limit 1),
        'Rest barbell on upper back. Squat down until thighs are parallel to the floor, then stand back up.'
    ),
    (
        'Leg Press', 'Quads', '{"Glutes", "Hamstrings"}', 'compound',
        (select id from public.equipment where name = 'Leg Press Machine' limit 1),
        'Sit in the machine, place feet shoulder-width apart on the sled, and press up.'
    ),
    -- Shoulders
    (
        'Overhead Press', 'Shoulders', '{"Triceps", "Core"}', 'compound',
        (select id from public.equipment where name = 'Barbell' limit 1),
        'Stand and press the barbell from shoulder height to straight overhead.'
    ),
    (
        'Dumbbell Lateral Raise', 'Shoulders', '{}', 'isolation',
        (select id from public.equipment where name = 'Dumbbell' limit 1),
        'Stand with a dumbbell in each hand. Raise arms out to the sides until parallel to the floor.'
    ),
    -- Arms
    (
        'Barbell Bicep Curl', 'Biceps', '{}', 'isolation',
        (select id from public.equipment where name = 'Barbell' limit 1),
        'Stand and curl the barbell up towards your shoulders.'
    ),
    (
        'Tricep Cable Pushdown', 'Triceps', '{}', 'isolation',
        (select id from public.equipment where name = 'Cable Machine' limit 1),
        'Use a rope or straight bar attachment. Keep elbows tucked and push the cable down.'
    )
on conflict do nothing;
