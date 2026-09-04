/*
   DEVELOPMENT SEED DATA
   Realistic AI certification courses for local development.
   Run via: supabase db reset (applies migrations + seed)
*/

-- Fixed UUIDs for reproducible references
-- Trainers
-- 11111111-1111-1111-1111-111111111101 Maria Dela Cruz
-- 11111111-1111-1111-1111-111111111102 James Santos
-- 11111111-1111-1111-1111-111111111103 Elena Reyes

-- Courses
-- 22222222-2222-2222-2222-222222222201 Introduction to AI
-- 22222222-2222-2222-2222-222222222202 Machine Learning Foundations
-- 22222222-2222-2222-2222-222222222203 Generative AI for Creators
-- 22222222-2222-2222-2222-222222222204 Data Science with Python
-- 22222222-2222-2222-2222-222222222205 Prompt Engineering Masterclass
-- 22222222-2222-2222-2222-222222222206 AI Ethics & Responsible AI
-- 22222222-2222-2222-2222-222222222207 Advanced Deep Learning (unpublished)

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
    recovery_token
)
values
    (
        '00000000-0000-0000-0000-000000000000',
        '11111111-1111-1111-1111-111111111101',
        'authenticated',
        'authenticated',
        'maria.delacruz@aqbat.ai',
        crypt('seed-password-not-for-login', gen_salt('bf')),
        now(),
        '{"provider":"email","providers":["email"]}'::jsonb,
        '{"first_name": "Maria", "last_name": "Dela Cruz"}'::jsonb,
        now(),
        now(),
        '',
        '',
        '',
        ''
    ),
    (
        '00000000-0000-0000-0000-000000000000',
        '11111111-1111-1111-1111-111111111102',
        'authenticated',
        'authenticated',
        'james.santos@aqbat.ai',
        crypt('seed-password-not-for-login', gen_salt('bf')),
        now(),
        '{"provider":"email","providers":["email"]}'::jsonb,
        '{"first_name": "James", "last_name": "Santos"}'::jsonb,
        now(),
        now(),
        '',
        '',
        '',
        ''
    ),
    (
        '00000000-0000-0000-0000-000000000000',
        '11111111-1111-1111-1111-111111111103',
        'authenticated',
        'authenticated',
        'elena.reyes@aqbat.ai',
        crypt('seed-password-not-for-login', gen_salt('bf')),
        now(),
        '{"provider":"email","providers":["email"]}'::jsonb,
        '{"first_name": "Elena", "last_name": "Reyes"}'::jsonb,
        now(),
        now(),
        '',
        '',
        '',
        ''
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
values
    (
        '11111111-1111-1111-1111-111111111101',
        '11111111-1111-1111-1111-111111111101',
        '{"sub":"11111111-1111-1111-1111-111111111101","email":"maria.delacruz@aqbat.ai"}'::jsonb,
        'email',
        '11111111-1111-1111-1111-111111111101',
        now(),
        now(),
        now()
    ),
    (
        '11111111-1111-1111-1111-111111111102',
        '11111111-1111-1111-1111-111111111102',
        '{"sub":"11111111-1111-1111-1111-111111111102","email":"james.santos@aqbat.ai"}'::jsonb,
        'email',
        '11111111-1111-1111-1111-111111111102',
        now(),
        now(),
        now()
    ),
    (
        '11111111-1111-1111-1111-111111111103',
        '11111111-1111-1111-1111-111111111103',
        '{"sub":"11111111-1111-1111-1111-111111111103","email":"elena.reyes@aqbat.ai"}'::jsonb,
        'email',
        '11111111-1111-1111-1111-111111111103',
        now(),
        now(),
        now()
    )
on conflict (id) do nothing;

-- The signup trigger creates student profiles; promote seed instructors after insert.
update public.profiles
set
    role = 'trainer',
    avatar_url = '/images/default-profile.png',
    first_name = coalesce(first_name, 'Maria'),
    last_name = coalesce(last_name, 'Dela Cruz')
where id = '11111111-1111-1111-1111-111111111101';

update public.profiles
set
    role = 'trainer',
    avatar_url = '/images/default-profile.png',
    first_name = coalesce(first_name, 'James'),
    last_name = coalesce(last_name, 'Santos')
where id = '11111111-1111-1111-1111-111111111102';

update public.profiles
set
    role = 'trainer',
    avatar_url = '/images/default-profile.png',
    first_name = coalesce(first_name, 'Elena'),
    last_name = coalesce(last_name, 'Reyes')
where id = '11111111-1111-1111-1111-111111111103';

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
values
    (
        '22222222-2222-2222-2222-222222222201',
        'Introduction to Artificial Intelligence',
        'introduction-to-artificial-intelligence',
        'Build a strong foundation in artificial intelligence concepts, history, and real-world applications. This certification program guides you from core AI principles to practical use cases across industries — no prior technical background required.',
        'Understand core AI concepts, terminology, and real-world applications from the ground up.',
        1500.00,
        true,
        '/images/hero.png',
        'beginner',
        12.0,
        'self_paced',
        'ai-fundamentals',
        '11111111-1111-1111-1111-111111111101',
        true,
        array[
            'Define artificial intelligence, machine learning, and deep learning',
            'Identify AI use cases across business, healthcare, and creative industries',
            'Evaluate AI tools and platforms for practical workflows',
            'Understand ethical considerations when adopting AI technology',
            'Build a personal learning roadmap for advanced AI certifications'
        ],
        'Complete all modules with at least 80% quiz average and pass the final certification assessment.'
    ),
    (
        '22222222-2222-2222-2222-222222222202',
        'Machine Learning Foundations',
        'machine-learning-foundations',
        'Master the fundamentals of machine learning including supervised and unsupervised learning, model evaluation, and feature engineering. Designed for professionals ready to move beyond AI awareness into applied ML skills.',
        'Learn supervised and unsupervised ML techniques with hands-on model building exercises.',
        2500.00,
        true,
        '/images/hero.png',
        'intermediate',
        24.0,
        'self_paced',
        'machine-learning',
        '11111111-1111-1111-1111-111111111102',
        true,
        array[
            'Implement regression and classification models',
            'Apply cross-validation and performance metrics',
            'Perform feature selection and data preprocessing',
            'Compare supervised vs. unsupervised learning approaches',
            'Deploy a basic ML pipeline for a real dataset'
        ],
        'Complete all modules, submit the capstone project, and score 75% or higher on the certification exam.'
    ),
    (
        '22222222-2222-2222-2222-222222222203',
        'Generative AI for Creators',
        'generative-ai-for-creators',
        'Unlock the creative potential of generative AI tools for content creation, design, and storytelling. Learn prompt strategies, image generation workflows, and responsible content practices used by professional creators.',
        'Harness generative AI tools for content, design, and creative production workflows.',
        2500.00,
        true,
        '/images/hero.png',
        'intermediate',
        18.0,
        'self_paced',
        'prompt-engineering',
        '11111111-1111-1111-1111-111111111103',
        true,
        array[
            'Craft effective prompts for text and image generation',
            'Build repeatable creative workflows with AI tools',
            'Evaluate output quality and iterate on prompts',
            'Apply brand-safe and ethical guidelines to AI-generated content',
            'Produce a portfolio-ready creative project using generative AI'
        ],
        'Submit a creative portfolio project and pass the practical assessment with a score of 70% or higher.'
    ),
    (
        '22222222-2222-2222-2222-222222222204',
        'Data Science with Python for AI',
        'data-science-with-python-for-ai',
        'Develop practical data science skills using Python for AI-driven analysis. Cover data wrangling, visualization, statistical foundations, and preparation techniques essential for machine learning pipelines.',
        'Build Python data skills for analysis, visualization, and ML preparation.',
        2200.00,
        true,
        '/images/hero.png',
        'intermediate',
        20.0,
        'self_paced',
        'data-science',
        '11111111-1111-1111-1111-111111111102',
        false,
        array[
            'Manipulate datasets with pandas and NumPy',
            'Create insightful visualizations for AI projects',
            'Apply statistical methods to real-world data',
            'Clean and prepare data for machine learning models',
            'Document and present data-driven findings'
        ],
        'Complete all lab exercises and pass the data analysis capstone with 75% or higher.'
    ),
    (
        '22222222-2222-2222-2222-222222222205',
        'Prompt Engineering Masterclass',
        'prompt-engineering-masterclass',
        'Go deep into advanced prompt engineering techniques for large language models. Learn chain-of-thought prompting, system prompts, few-shot examples, and evaluation frameworks used in production AI applications.',
        'Master advanced prompting techniques for production LLM applications.',
        1800.00,
        true,
        '/images/hero.png',
        'advanced',
        10.0,
        'one_on_one',
        'prompt-engineering',
        '11111111-1111-1111-1111-111111111103',
        false,
        array[
            'Design system prompts for consistent LLM behavior',
            'Apply chain-of-thought and few-shot prompting strategies',
            'Evaluate prompt quality with structured testing frameworks',
            'Optimize prompts for cost, latency, and accuracy',
            'Build a prompt library for a professional use case'
        ],
        'Complete 1-on-1 coaching sessions, submit a prompt engineering portfolio, and pass the practical exam.'
    ),
    (
        '22222222-2222-2222-2222-222222222206',
        'AI Ethics & Responsible AI',
        'ai-ethics-and-responsible-ai',
        'Navigate the ethical landscape of artificial intelligence with frameworks for fairness, transparency, accountability, and governance. Essential for leaders, developers, and practitioners deploying AI at scale.',
        'Apply ethical frameworks for fair, transparent, and accountable AI systems.',
        1200.00,
        true,
        '/images/hero.png',
        'beginner',
        8.0,
        'self_paced',
        'ai-ethics',
        '11111111-1111-1111-1111-111111111101',
        false,
        array[
            'Identify bias sources in AI training data and models',
            'Apply responsible AI frameworks and governance policies',
            'Evaluate transparency and explainability requirements',
            'Design human-in-the-loop workflows for high-stakes decisions',
            'Develop an organizational AI ethics checklist'
        ],
        'Complete all modules and pass the ethics case study assessment with 80% or higher.'
    ),
    (
        '22222222-2222-2222-2222-222222222207',
        'Advanced Deep Learning',
        'advanced-deep-learning',
        'An in-depth program covering neural network architectures, transformers, and production deployment — currently in development and not yet available for enrollment.',
        'Deep dive into neural networks, transformers, and production deployment.',
        3500.00,
        false,
        '/images/hero.png',
        'advanced',
        30.0,
        'self_paced',
        'machine-learning',
        '11111111-1111-1111-1111-111111111102',
        false,
        array[
            'Implement convolutional and recurrent neural networks',
            'Understand transformer architecture and attention mechanisms',
            'Fine-tune pre-trained models for domain-specific tasks',
            'Optimize models for inference performance',
            'Deploy deep learning models to production environments'
        ],
        'Complete all modules, capstone project, and certification exam — available upon course launch.'
    )
on conflict (id) do nothing;

-- Modules and lessons for Introduction to AI
insert into public.course_modules (id, course_id, title, description, sort_order)
values
    ('33333333-3333-3333-3333-333333333301', '22222222-2222-2222-2222-222222222201', 'What Is Artificial Intelligence?', 'Explore the history, definitions, and scope of AI.', 0),
    ('33333333-3333-3333-3333-333333333302', '22222222-2222-2222-2222-222222222201', 'AI in the Real World', 'Discover how organizations apply AI today.', 1),
    ('33333333-3333-3333-3333-333333333303', '22222222-2222-2222-2222-222222222201', 'Getting Started with AI Tools', 'Hands-on introduction to popular AI platforms.', 2)
on conflict (id) do nothing;

insert into public.lessons (module_id, title, description, sort_order, is_published)
values
    ('33333333-3333-3333-3333-333333333301', 'Defining AI, ML, and Deep Learning', 'Understand the relationship between core AI disciplines.', 0, true),
    ('33333333-3333-3333-3333-333333333301', 'A Brief History of AI', 'From early expert systems to modern generative AI.', 1, true),
    ('33333333-3333-3333-3333-333333333301', 'Types of AI Systems', 'Narrow AI vs. general AI and current capabilities.', 2, true),
    ('33333333-3333-3333-3333-333333333302', 'AI in Business and Enterprise', 'Automation, analytics, and decision support use cases.', 0, true),
    ('33333333-3333-3333-3333-333333333302', 'AI in Healthcare and Education', 'Impactful applications in critical sectors.', 1, true),
    ('33333333-3333-3333-3333-333333333303', 'Evaluating AI Tools', 'Criteria for selecting the right AI platform.', 0, true),
    ('33333333-3333-3333-3333-333333333303', 'Your First AI Workflow', 'Build a simple end-to-end AI-assisted task.', 1, true);

-- Modules and lessons for Machine Learning Foundations
insert into public.course_modules (id, course_id, title, description, sort_order)
values
    ('33333333-3333-3333-3333-333333333311', '22222222-2222-2222-2222-222222222202', 'Supervised Learning', 'Regression and classification fundamentals.', 0),
    ('33333333-3333-3333-3333-333333333312', '22222222-2222-2222-2222-222222222202', 'Unsupervised Learning', 'Clustering, dimensionality reduction, and pattern discovery.', 1),
    ('33333333-3333-3333-3333-333333333313', '22222222-2222-2222-2222-222222222202', 'Model Evaluation & Deployment', 'Metrics, validation, and production readiness.', 2)
on conflict (id) do nothing;

insert into public.lessons (module_id, title, description, sort_order, is_published)
values
    ('33333333-3333-3333-3333-333333333311', 'Linear and Logistic Regression', 'Build and interpret foundational models.', 0, true),
    ('33333333-3333-3333-3333-333333333311', 'Decision Trees and Random Forests', 'Ensemble methods for robust predictions.', 1, true),
    ('33333333-3333-3333-3333-333333333312', 'K-Means Clustering', 'Discover natural groupings in unlabeled data.', 0, true),
    ('33333333-3333-3333-3333-333333333312', 'Principal Component Analysis', 'Reduce dimensionality while preserving information.', 1, true),
    ('33333333-3333-3333-3333-333333333313', 'Cross-Validation Strategies', 'Reliable model evaluation techniques.', 0, true),
    ('33333333-3333-3333-3333-333333333313', 'Capstone: End-to-End ML Pipeline', 'Apply everything in a guided project.', 1, true);

-- Modules for Generative AI for Creators
insert into public.course_modules (id, course_id, title, description, sort_order)
values
    ('33333333-3333-3333-3333-333333333321', '22222222-2222-2222-2222-222222222203', 'Prompt Fundamentals', 'Core techniques for reliable AI outputs.', 0),
    ('33333333-3333-3333-3333-333333333322', '22222222-2222-2222-2222-222222222203', 'Visual AI for Creators', 'Image generation and design workflows.', 1)
on conflict (id) do nothing;

insert into public.lessons (module_id, title, description, sort_order, is_published)
values
    ('33333333-3333-3333-3333-333333333321', 'Writing Effective Prompts', 'Structure prompts for clarity and consistency.', 0, true),
    ('33333333-3333-3333-3333-333333333321', 'Iterating and Refining Outputs', 'Techniques for improving AI-generated content.', 1, true),
    ('33333333-3333-3333-3333-333333333322', 'Image Generation Workflows', 'From concept to final visual asset.', 0, true),
    ('33333333-3333-3333-3333-333333333322', 'Creative Portfolio Project', 'Build and present your generative AI work.', 1, true);

-- Minimal curriculum for remaining published courses
insert into public.course_modules (id, course_id, title, description, sort_order)
values
    ('33333333-3333-3333-3333-333333333331', '22222222-2222-2222-2222-222222222204', 'Python for Data Analysis', 'Core libraries and data manipulation.', 0),
    ('33333333-3333-3333-3333-333333333332', '22222222-2222-2222-2222-222222222204', 'Visualization and Statistics', 'Communicate insights from data.', 1),
    ('33333333-3333-3333-3333-333333333341', '22222222-2222-2222-2222-222222222205', 'Advanced Prompting', 'Production-grade prompt engineering.', 0),
    ('33333333-3333-3333-3333-333333333351', '22222222-2222-2222-2222-222222222206', 'Ethics Foundations', 'Frameworks for responsible AI.', 0),
    ('33333333-3333-3333-3333-333333333352', '22222222-2222-2222-2222-222222222206', 'Governance and Compliance', 'Policies and organizational practices.', 1)
on conflict (id) do nothing;

insert into public.lessons (module_id, title, description, sort_order, is_published)
values
    ('33333333-3333-3333-3333-333333333331', 'pandas and NumPy Essentials', 'Data structures and operations.', 0, true),
    ('33333333-3333-3333-3333-333333333331', 'Data Cleaning Techniques', 'Handle missing values and outliers.', 1, true),
    ('33333333-3333-3333-3333-333333333332', 'Data Visualization with matplotlib', 'Create compelling charts and graphs.', 0, true),
    ('33333333-3333-3333-3333-333333333341', 'System Prompts and Few-Shot Learning', 'Design robust LLM interactions.', 0, true),
    ('33333333-3333-3333-3333-333333333341', 'Prompt Evaluation Frameworks', 'Measure and optimize prompt performance.', 1, true),
    ('33333333-3333-3333-3333-333333333351', 'Understanding AI Bias', 'Sources, detection, and mitigation.', 0, true),
    ('33333333-3333-3333-3333-333333333352', 'Building an AI Ethics Policy', 'Practical governance for teams.', 0, true);
