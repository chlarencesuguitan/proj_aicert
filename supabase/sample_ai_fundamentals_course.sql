/*
   DEVELOPMENT SAMPLE COURSE (ONE COURSE ONLY)

   [Sample] AI Fundamentals & Practical Applications
   Course ID:  22222222-2222-2222-2222-222222222208
   Trainer ID: 11111111-1111-1111-1111-111111111104  (Alex Morgan)

   Safe to re-run: inserts use ON CONFLICT DO NOTHING.
*/

-- Sample trainer (profiles.id must reference auth.users)
insert into auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token,
    is_sso_user,
    is_anonymous
)
values (
    '00000000-0000-0000-0000-000000000000',
    '11111111-1111-1111-1111-111111111104',
    'authenticated',
    'authenticated',
    'alex.morgan.sample@aqbat.ai',
    crypt('seed-password-not-for-login', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{"first_name":"Alex","last_name":"Morgan"}'::jsonb,
    now(),
    now(),
    '',
    '',
    '',
    '',
    false,
    false
)
on conflict (id) do nothing;

insert into auth.identities (
    id,
    user_id,
    identity_data,
    provider,
    provider_id,
    last_sign_in_at,
    created_at,
    updated_at
)
values (
    '11111111-1111-1111-1111-111111111114',
    '11111111-1111-1111-1111-111111111104',
    '{"sub":"11111111-1111-1111-1111-111111111104","email":"alex.morgan.sample@aqbat.ai"}'::jsonb,
    'email',
    '11111111-1111-1111-1111-111111111104',
    now(),
    now(),
    now()
)
on conflict (id) do nothing;

update public.profiles
set
    role = 'trainer',
    avatar_url = '/images/default-profile.png',
    first_name = coalesce(first_name, 'Alex'),
    last_name = coalesce(last_name, 'Morgan')
where id = '11111111-1111-1111-1111-111111111104';

insert into public.courses (
    id,
    title,
    slug,
    description,
    short_description,
    price,
    is_published,
    thumbnail_url,
    difficulty,
    duration_hours,
    learning_type,
    category,
    instructor_id,
    is_featured,
    learning_objectives,
    certification_requirements
)
values (
    '22222222-2222-2222-2222-222222222208',
    '[Sample] AI Fundamentals & Practical Applications',
    'sample-ai-fundamentals-practical-applications',
    'SAMPLE COURSE — Build a strong foundation in artificial intelligence and learn how modern AI technologies are applied to real-world problems. This course introduces core AI concepts, machine learning fundamentals, generative AI, responsible AI, and practical AI workflows.',
    'Sample course · 6-week beginner program covering AI concepts, machine learning, generative AI, practical workflows, and responsible AI.',
    1500.00,
    true,
    '/images/hero.png',
    'beginner',
    18.0,
    'self_paced',
    'ai-fundamentals',
    '11111111-1111-1111-1111-111111111104',
    true,
    array[
        'Explain fundamental artificial intelligence concepts.',
        'Understand the basics of machine learning.',
        'Identify common AI applications across different industries.',
        'Understand how generative AI and large language models work at a high level.',
        'Apply basic AI tools to practical problems.',
        'Identify ethical, responsible, and safe AI practices.'
    ],
    'Complete all course modules, complete all required lessons, and pass the final assessment.'
)
on conflict (id) do nothing;

insert into public.course_modules (id, course_id, title, description, sort_order)
values
    (
        '33333333-3333-3333-3333-333333333361',
        '22222222-2222-2222-2222-222222222208',
        'Introduction to Artificial Intelligence',
        'Build a shared vocabulary for AI and see how it shows up in daily life and industry.',
        0
    ),
    (
        '33333333-3333-3333-3333-333333333362',
        '22222222-2222-2222-2222-222222222208',
        'Machine Learning Fundamentals',
        'Learn how models learn from data, including supervised vs unsupervised approaches.',
        1
    ),
    (
        '33333333-3333-3333-3333-333333333363',
        '22222222-2222-2222-2222-222222222208',
        'Generative AI',
        'Understand generative models, large language models, and practical prompting.',
        2
    ),
    (
        '33333333-3333-3333-3333-333333333364',
        '22222222-2222-2222-2222-222222222208',
        'Practical AI Workflows',
        'Turn AI concepts into a simple, repeatable workflow for real problems.',
        3
    ),
    (
        '33333333-3333-3333-3333-333333333365',
        '22222222-2222-2222-2222-222222222208',
        'Responsible AI',
        'Apply ethics, fairness, privacy, and security practices to AI work.',
        4
    )
on conflict (id) do nothing;

insert into public.lessons (module_id, title, description, sort_order, is_published)
values
    ('33333333-3333-3333-3333-333333333361', 'What is Artificial Intelligence?', 'Define AI and distinguish it from related fields such as machine learning.', 0, true),
    ('33333333-3333-3333-3333-333333333361', 'History and Evolution of AI', 'Trace key milestones from early systems to modern generative AI.', 1, true),
    ('33333333-3333-3333-3333-333333333361', 'AI in Everyday Life', 'Recognize AI-powered products and services people already use.', 2, true),
    ('33333333-3333-3333-3333-333333333361', 'AI Applications Across Industries', 'Survey common AI use cases in business, healthcare, and other sectors.', 3, true),
    ('33333333-3333-3333-3333-333333333362', 'What is Machine Learning?', 'Explain how systems improve from data rather than hardcoded rules.', 0, true),
    ('33333333-3333-3333-3333-333333333362', 'Supervised vs Unsupervised Learning', 'Compare labeled-data training with pattern discovery in unlabeled data.', 1, true),
    ('33333333-3333-3333-3333-333333333362', 'Training Data and Features', 'Understand how data quality and features affect model outcomes.', 2, true),
    ('33333333-3333-3333-3333-333333333362', 'Understanding Model Evaluation', 'Introduce accuracy, error, and why evaluation matters before deployment.', 3, true),
    ('33333333-3333-3333-3333-333333333363', 'Introduction to Generative AI', 'Describe how generative models create new text, images, and other content.', 0, true),
    ('33333333-3333-3333-3333-333333333363', 'Large Language Models', 'Explain LLMs at a high level, including tokens, context, and capabilities.', 1, true),
    ('33333333-3333-3333-3333-333333333363', 'Prompt Engineering Fundamentals', 'Practice writing clear prompts that produce more reliable outputs.', 2, true),
    ('33333333-3333-3333-3333-333333333363', 'Practical Generative AI Use Cases', 'Explore workplace examples such as drafting, summarization, and ideation.', 3, true),
    ('33333333-3333-3333-3333-333333333364', 'Identifying Problems AI Can Solve', 'Choose problems that fit current AI strengths and limitations.', 0, true),
    ('33333333-3333-3333-3333-333333333364', 'Designing an AI-Assisted Workflow', 'Map a simple human-plus-AI process from input to review.', 1, true),
    ('33333333-3333-3333-3333-333333333364', 'Working with AI Tools', 'Use common AI tools safely and productively in a professional setting.', 2, true),
    ('33333333-3333-3333-3333-333333333364', 'Building a Simple AI Solution', 'Assemble a small end-to-end example using the skills from this course.', 3, true),
    ('33333333-3333-3333-3333-333333333365', 'AI Ethics', 'Identify ethical questions that arise when deploying AI systems.', 0, true),
    ('33333333-3333-3333-3333-333333333365', 'Bias and Fairness', 'Recognize sources of bias and why fairness checks matter.', 1, true),
    ('33333333-3333-3333-3333-333333333365', 'Privacy and Security', 'Protect sensitive data and reduce common AI-related security risks.', 2, true),
    ('33333333-3333-3333-3333-333333333365', 'Responsible AI Best Practices', 'Apply practical guidelines for safe, accountable AI use.', 3, true);
