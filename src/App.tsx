import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import { useEffect, useMemo, useState } from 'react'
import { BrowserRouter as Router, NavLink, Route, Routes } from 'react-router-dom'
import { ErrorMessage, Field, Form, Formik } from 'formik'

type Highlight = string

type Concept = {
  title: string
  description: string
  badge: string
  highlights: Highlight[]
}

type Project = {
  name: string
  description: string
  tags: string[]
  link: string
  repo: string
}

type RoadmapStage = {
  step: string
  title: string
  details: string
}

const concepts: Concept[] = [
  {
    title: 'Project-First Portfolio Layout',
    badge: 'Career-ready apps',
    description:
      'Build production-ready systems while tracking progress from logic to launch.',
    highlights: [
      'Student project showcase with live links',
      'Stack roadmap from beginner to architect',
      'Live metrics for real outcomes',
    ],
  },
  {
    title: 'Interactive Hybrid Academy',
    badge: 'Mentorship + micro learning',
    description:
      'Experience bite-sized coaching with live labs, peer code review, and fast feedback.',
    highlights: [
      'Embedded mini coding preview',
      'Weekly rhythm for real learning',
      'Skill assessment for every level',
    ],
  },
  {
    title: 'Enterprise & Certification Accelerator',
    badge: 'Enterprise skill paths',
    description:
      'Mapped tracks for certifications, corporate upskilling, and enterprise-ready workflows.',
    highlights: [
      'Credential-aligned learning journeys',
      'Corporate training portal examples',
      'Mentors with real-world systems experience',
    ],
  },
]

const projects: Project[] = [
  {
    name: 'NextGen Commerce',
    description:
      'Full-stack marketplace with payments, inventory analytics, and role-based access.',
    tags: ['React', 'Node.js', 'Stripe', 'Postgres'],
    link: '#',
    repo: '#',
  },
  {
    name: 'Realtime Ops Dashboard',
    description:
      'Live analytics for operational teams, integrated with alerts and mobile-friendly UI.',
    tags: ['WebSockets', 'D3', 'TypeScript'],
    link: '#',
    repo: '#',
  },
  {
    name: 'Certification Path Builder',
    description:
      'Adaptive learning portal designed to guide students through credential milestones.',
    tags: ['Tailwind', 'React Query', 'Auth'],
    link: '#',
    repo: '#',
  },
]

const roadmap: RoadmapStage[] = [
  {
    step: 'Foundations',
    title: 'Logic, HTML & CSS',
    details: 'Start with problem-solving, DOM fundamentals, and clean UI structure.',
  },
  {
    step: 'Advanced Frontend',
    title: 'Component Architecture',
    details: 'Build reusable React systems, state flows, and modern UX patterns.',
  },
  {
    step: 'Backend & Deployment',
    title: 'APIs, Databases, Cloud',
    details: 'Connect services, deploy apps, and optimize end-to-end architecture.',
  },
  {
    step: 'Certification Ready',
    title: 'Enterprise Workflows',
    details: 'Learn clean code, scalable systems, and certification-aligned patterns.',
  },
]

const schedule = [
  {
    title: 'Batch Start',
    date: 'June 24, 2026',
    seats: '8 seats left',
    time: 'Mon/Wed/Fri • 6-8pm',
  },
  {
    title: 'Weekend Sprint',
    date: 'July 5, 2026',
    seats: '12 seats left',
    time: 'Sat/Sun • 10am-2pm',
  },
  {
    title: 'Corporate Cohort',
    date: 'July 14, 2026',
    seats: 'Custom intake',
    time: 'Flexible onsite schedule',
  },
]

const testimonials = [
  {
    quote:
      'The coaching center gave me portfolio projects employers actually asked about.',
    name: 'Nina Patel',
    role: 'Full-stack graduate',
    linkedin: '#',
  },
  {
    quote:
      'The live mentorship and career roadmap turned my curiosity into a strong dev career.',
    name: 'Samuel Kim',
    role: 'Engineering trainee',
    linkedin: '#',
  },
]

const glow = keyframes`
  0% { opacity: 0.95; transform: translateY(0px); }
  50% { opacity: 1; transform: translateY(-7px); }
  100% { opacity: 0.95; transform: translateY(0px); }
`

const AccentCard = styled('div')`
  animation: ${glow} 4s ease-in-out infinite;
`

const formField = css`
  width: 100%;
  border-radius: 1rem;
  border: 1px solid rgba(148, 163, 184, 0.3);
  background: rgba(15, 23, 42, 0.9);
  padding: 0.9rem 1rem;
  color: #e2e8f0;
  outline: none;
  transition: all 0.22s ease;
  &:focus {
    border-color: rgba(34, 211, 238, 0.82);
    box-shadow: 0 0 0 4px rgba(56, 189, 248, 0.18);
  }
`

const themeStorageKey = 'a2z-academy-theme'

function LiveStatus() {
  const [time, setTime] = useState(() => new Date())
  const [activeLearners, setActiveLearners] = useState(107)
  const [activeSessions, setActiveSessions] = useState(16)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTime(new Date())
      setActiveLearners((prev) => Math.min(250, prev + Math.random() < 0.5 ? 1 : 0))
      setActiveSessions((prev) => Math.min(28, prev + (Math.random() < 0.35 ? 1 : 0)))
    }, 2200)
    return () => window.clearInterval(interval)
  }, [])

  return (
    <div className="grid gap-4 rounded-[2rem] border border-slate-200/70 bg-white/90 p-5 text-slate-950 shadow-xl shadow-slate-950/10 transition-colors duration-500 ease-in-out dark:border-slate-800/80 dark:bg-slate-900/85 dark:text-slate-100">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-cyan-600 dark:text-cyan-300/80">Realtime student pulse</p>
          <h2 className="mt-2 text-2xl font-semibold">Live learning experience</h2>
        </div>
        <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-950 ring-1 ring-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:ring-slate-700">
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-3xl bg-slate-50 p-4 text-center shadow-sm shadow-slate-900/5 dark:bg-slate-950/80">
          <p className="text-xs uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Active learners</p>
          <p className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">{activeLearners}</p>
        </div>
        <div className="rounded-3xl bg-slate-50 p-4 text-center shadow-sm shadow-slate-900/5 dark:bg-slate-950/80">
          <p className="text-xs uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Ongoing sessions</p>
          <p className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">{activeSessions}</p>
        </div>
        <div className="rounded-3xl bg-slate-50 p-4 text-center shadow-sm shadow-slate-900/5 dark:bg-slate-950/80">
          <p className="text-xs uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Peer coding rooms</p>
          <p className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">8</p>
        </div>
      </div>
    </div>
  )
}

function NavBar({ theme, toggleTheme }: { theme: 'light' | 'dark'; toggleTheme: () => void }) {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-2xl px-4 py-2 text-sm font-semibold transition ${
      isActive
        ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
        : 'text-slate-600 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
    }`

  return (
    <nav className="flex flex-wrap items-center justify-between gap-4 rounded-[2rem] border border-slate-200/80 bg-white/90 p-4 shadow-xl shadow-slate-950/10 transition-colors duration-500 ease-in-out dark:border-slate-800/80 dark:bg-slate-950/85">
      <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-slate-950 dark:text-slate-100">
        <span className="rounded-full bg-cyan-500/15 px-3 py-2 text-cyan-700 dark:bg-cyan-500/15 dark:text-cyan-200">A2Z</span>
        <NavLink to="/" className={linkClass} end>
          Home
        </NavLink>
        <NavLink to="/projects" className={linkClass}>
          Projects
        </NavLink>
        <NavLink to="/contact" className={linkClass}>
          Contact
        </NavLink>
      </div>
      <button
        type="button"
        onClick={toggleTheme}
        className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300/70 bg-slate-100/90 px-4 py-2 text-sm font-semibold text-slate-950 shadow-sm shadow-slate-400/10 transition duration-300 hover:-translate-y-0.5 hover:bg-slate-200 dark:border-slate-600/80 dark:bg-slate-800/80 dark:text-slate-100 dark:hover:bg-slate-700/80"
      >
        {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
      </button>
    </nav>
  )
}

function HomePage() {
  return (
    <div className="space-y-10">
      <div className="space-y-6 rounded-[2rem] border border-slate-200/80 bg-white/90 p-8 shadow-2xl shadow-slate-950/10 transition duration-500 ease-in-out dark:border-slate-800/80 dark:bg-slate-950/85 dark:text-slate-100">
        <p className="text-sm uppercase tracking-[0.32em] text-cyan-600 dark:text-cyan-300/80">Future-facing tech coaching</p>
        <h1 className="text-4xl font-semibold text-slate-950 dark:text-white sm:text-5xl">
          A modern academy for beginners and advancing developers.
        </h1>
        <p className="max-w-3xl text-slate-600 dark:text-slate-300">
          We make learning interactive, live, and outcome-driven with real-time cohort metrics, guided projects, and a flexible learning path built for today’s tech roles.
        </p>
      </div>

      <LiveStatus />

      <AccentCard className="themed-accent p-6 shadow-[0_40px_120px_-70px_rgba(34,211,238,0.7)]">
        <p className="text-sm uppercase tracking-[0.32em] text-cyan-600 dark:text-cyan-200/80">
          Choose your academy model
        </p>
        <h2 className="mt-3 text-3xl font-semibold text-white">Three learning journeys for every student.</h2>
        <p className="mt-4 text-slate-300">
          Pick the path that matches your goals: portfolio-first, mentor-driven hybrid learning, or certification accelerator.
        </p>
      </AccentCard>

      <div className="grid gap-6 md:grid-cols-3">
        {concepts.map((concept) => (
          <div key={concept.title} className="rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-lg shadow-slate-950/10 transition duration-300 ease-in-out hover:-translate-y-1 dark:border-slate-800/80 dark:bg-slate-950/85 dark:text-slate-100">
            <span className="inline-flex rounded-full bg-cyan-500/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-cyan-600 dark:text-cyan-200">
              {concept.badge}
            </span>
            <h3 className="mt-4 text-xl font-semibold text-slate-950 dark:text-white">{concept.title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{concept.description}</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-500 dark:text-slate-400">
              {concept.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-2">
                  <span className="text-cyan-500">•</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

function ProjectsPage() {
  return (
    <div className="space-y-10">
      <div className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-8 shadow-2xl shadow-slate-950/10 transition duration-500 ease-in-out dark:border-slate-800/80 dark:bg-slate-950/85 dark:text-slate-100">
        <p className="text-sm uppercase tracking-[0.32em] text-cyan-600 dark:text-cyan-300/80">Student portfolio</p>
        <h2 className="text-3xl font-semibold text-slate-950 dark:text-white">Live projects built by our learners.</h2>
        <p className="max-w-3xl text-slate-600 dark:text-slate-300">
          Explore how each course is designed around real-world goals and deployable solutions that employers recognize.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        {projects.map((project) => (
          <article key={project.name} className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-6 shadow-lg shadow-slate-950/10 transition duration-300 ease-in-out hover:-translate-y-1 dark:border-slate-800/80 dark:bg-slate-950/85">
            <span className="inline-flex rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-600 dark:text-cyan-200">
              Live work
            </span>
            <h3 className="mt-5 text-2xl font-semibold text-slate-950 dark:text-white">{project.name}</h3>
            <p className="mt-4 text-slate-600 dark:text-slate-300">{project.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <a className="text-cyan-600 transition hover:text-cyan-400 dark:text-cyan-300" href={project.link}>Live demo</a>
              <a className="text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white" href={project.repo}>GitHub repo</a>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

function ContactPage() {
  return (
    <section className="space-y-10">
      <div className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-8 shadow-2xl shadow-slate-950/10 transition duration-500 ease-in-out dark:border-slate-800/80 dark:bg-slate-950/85 dark:text-slate-100">
        <p className="text-sm uppercase tracking-[0.32em] text-cyan-600 dark:text-cyan-300/80">Integrated LMS gateway</p>
        <h2 className="mt-4 text-3xl font-semibold text-slate-950 dark:text-white">Secure student portal access and enrollment.</h2>
        <p className="mt-4 text-slate-600 dark:text-slate-300">
          Submit your details and our admissions team will connect you with the right track, whether you want beginner guidance or enterprise certification preparation.
        </p>
      </div>

      <div className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-8 shadow-2xl shadow-slate-950/10 transition duration-500 ease-in-out dark:border-slate-800/80 dark:bg-slate-950/85 dark:text-slate-100">
        <Formik
          initialValues={{ fullName: '', email: '', interest: '', message: '' }}
          validate={(values) => {
            const errors: Record<string, string> = {}
            if (!values.fullName.trim()) {
              errors.fullName = 'Full name is required'
            }
            if (!values.email) {
              errors.email = 'Email is required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
              errors.email = 'Invalid email address'
            }
            if (!values.interest.trim()) {
              errors.interest = 'Please select an interest'
            }
            if (!values.message.trim()) {
              errors.message = 'Tell us a little about your goals'
            }
            return errors
          }}
          onSubmit={(values, { resetForm }) => {
            console.log('Contact request', values)
            alert('Thanks! Your request has been submitted.')
            resetForm()
          }}
        >
          {() => (
            <Form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="fullName">
                  Full name
                </label>
                <Field id="fullName" name="fullName" placeholder="Your name" css={formField} />
                <ErrorMessage name="fullName" component="div" className="mt-2 text-sm text-rose-400" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="email">
                  Email address
                </label>
                <Field id="email" name="email" type="email" placeholder="you@example.com" css={formField} />
                <ErrorMessage name="email" component="div" className="mt-2 text-sm text-rose-400" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="interest">
                  Learning focus
                </label>
                <Field as="select" id="interest" name="interest" css={formField}>
                  <option value="">Choose a path</option>
                  <option value="beginner">Beginner logic & fundamentals</option>
                  <option value="frontend">Frontend portfolio</option>
                  <option value="enterprise">Enterprise & certification</option>
                </Field>
                <ErrorMessage name="interest" component="div" className="mt-2 text-sm text-rose-400" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="message">
                  Your goals
                </label>
                <Field as="textarea" id="message" name="message" rows={4} placeholder="Tell us what you want to achieve" css={formField} />
                <ErrorMessage name="message" component="div" className="mt-2 text-sm text-rose-400" />
              </div>

              <button type="submit" className="inline-flex items-center justify-center rounded-3xl bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
                Request a free consultation
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  )
}

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'dark'
    const saved = localStorage.getItem(themeStorageKey)
    if (saved === 'light' || saved === 'dark') return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem(themeStorageKey, theme)
  }, [theme])

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))

  const liveHeadline = useMemo(() => {
    return theme === 'dark' ? 'Live cohort signal' : 'Live cohort signal'
  }, [theme])

  return (
    <Router>
      <div className="min-h-screen bg-slate-50 text-slate-950 transition-colors duration-500 ease dark:bg-slate-950 dark:text-slate-100">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <NavBar theme={theme} toggleTheme={toggleTheme} />

          <div className="mt-10 space-y-8">
            <div className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-8 shadow-2xl shadow-slate-950/10 transition duration-500 ease-in-out dark:border-slate-800/80 dark:bg-slate-950/85 dark:text-slate-100">
              <p className="text-sm uppercase tracking-[0.32em] text-cyan-600 dark:text-cyan-300/80">{liveHeadline}</p>
              <h1 className="mt-3 text-4xl font-semibold text-slate-950 dark:text-white sm:text-5xl">
                Build polished products, not just code snippets.
              </h1>
              <p className="mt-4 max-w-3xl text-slate-600 dark:text-slate-300">
                Navigate the academy with clear pages, real-time cohort updates, and an engaging route-based experience.
              </p>
            </div>

            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App
