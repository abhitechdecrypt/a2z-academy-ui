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
  border-radius: 1.75rem;
  border: 3px solid #06b6d4;
  background: linear-gradient(135deg, rgba(12, 74, 110, 0.4), rgba(14, 165, 233, 0.15));
  padding: 1.3rem 1.8rem;
  color: #ffffff;
  outline: none;
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  font-size: 1.1rem;
  font-weight: 700;
  box-shadow: 0 6px 30px rgba(6, 182, 212, 0.25), inset 0 1px 3px rgba(34, 211, 238, 0.2), 0 0 1px rgba(34, 211, 238, 0.5);
  letter-spacing: 0.3px;
  
  &::placeholder {
    color: rgba(226, 232, 240, 0.7);
    font-weight: 600;
    transition: color 0.4s ease;
  }

  &:hover {
    border-color: #22d3ee;
    background: linear-gradient(135deg, rgba(12, 74, 110, 0.5), rgba(14, 165, 233, 0.25));
    box-shadow: 0 10px 50px rgba(34, 211, 238, 0.4), inset 0 2px 4px rgba(34, 211, 238, 0.25), 0 0 20px rgba(6, 182, 212, 0.3);
    transform: translateY(-5px) scale(1.01);
  }

  &:focus {
    border-color: #22d3ee;
    background: linear-gradient(135deg, rgba(12, 74, 110, 0.6), rgba(14, 165, 233, 0.35));
    box-shadow: 0 0 0 4px rgba(6, 182, 212, 0.2), 0 15px 60px rgba(34, 211, 238, 0.5), inset 0 3px 8px rgba(34, 211, 238, 0.15), 0 0 30px rgba(6, 182, 212, 0.4);
    transform: translateY(-6px) scale(1.02);
  }

  &:focus::placeholder {
    color: rgba(226, 232, 240, 0.9);
  }
`

const SubmitButton = styled('button')`
  background: linear-gradient(135deg, #06b6d4 0%, #0891b2 50%, #0e7490 100%);
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.6s ease;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 35px rgba(34, 211, 238, 0.4), 0 0 30px rgba(34, 211, 238, 0.2);
    
    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(-1px);
    box-shadow: 0 8px 20px rgba(34, 211, 238, 0.3);
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

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-8 shadow-2xl shadow-slate-950/10 transition duration-500 ease-in-out dark:border-slate-800/80 dark:bg-slate-950/85 dark:text-slate-100">
          <p className="text-sm uppercase tracking-[0.32em] text-cyan-600 dark:text-cyan-300/80">Roadmap</p>
          <h3 className="mt-4 text-2xl font-semibold text-slate-950 dark:text-white">What students master next.</h3>
          <div className="mt-6 space-y-4">
            {roadmap.map((stage) => (
              <div key={stage.step} className="rounded-3xl bg-slate-50 p-5 dark:bg-slate-900/80">
                <p className="text-sm uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">{stage.step}</p>
                <h4 className="mt-2 text-xl font-semibold text-slate-950 dark:text-white">{stage.title}</h4>
                <p className="mt-2 text-slate-600 dark:text-slate-300">{stage.details}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-8 shadow-2xl shadow-slate-950/10 transition duration-500 ease-in-out dark:border-slate-800/80 dark:bg-slate-950/85 dark:text-slate-100">
          <p className="text-sm uppercase tracking-[0.32em] text-cyan-600 dark:text-cyan-300/80">Student feedback</p>
          <h3 className="mt-4 text-2xl font-semibold text-slate-950 dark:text-white">Real outcomes from recent learners.</h3>
          <div className="mt-6 space-y-4">
            {testimonials.map((item) => (
              <div key={item.name} className="rounded-3xl bg-slate-50 p-5 dark:bg-slate-900/80">
                <p className="text-slate-700 dark:text-slate-200">“{item.quote}”</p>
                <p className="mt-3 text-sm font-semibold text-slate-950 dark:text-white">{item.name}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{item.role}</p>
              </div>
            ))}
          </div>
        </div>
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

      <div className="grid gap-4 md:grid-cols-3">
        {schedule.map((item) => (
          <div key={item.title} className="rounded-3xl border border-slate-200/80 bg-slate-50 p-5 text-slate-950 shadow-sm shadow-slate-950/5 transition dark:border-slate-800/80 dark:bg-slate-900/85 dark:text-slate-100">
            <p className="text-xs uppercase tracking-[0.28em] text-cyan-600 dark:text-cyan-300/80">{item.title}</p>
            <p className="mt-3 text-lg font-semibold">{item.date}</p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{item.time}</p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{item.seats}</p>
          </div>
        ))}
      </div>

      <div className="rounded-[2.5rem] border-3 border-cyan-400/50 bg-gradient-to-br from-slate-950/98 via-cyan-950/40 to-slate-900/95 p-12 shadow-2xl shadow-cyan-500/30 transition duration-500 ease-in-out backdrop-blur-sm">
        <h3 className="mb-10 text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-cyan-200 to-blue-300 flex items-center gap-3 drop-shadow-lg">
          <span className="text-4xl animate-bounce" style={{animationDelay: '0s'}}>🎓</span>
          Start Your Coding Journey Today!
        </h3>
        <Formik
          initialValues={{ fullName: '', email: '', interest: '', message: '' }}
          validate={(values) => {
            const errors: Record<string, string> = {}
            if (!values.fullName.trim()) {
              errors.fullName = '✨ Please tell us your name'
            }
            if (!values.email) {
              errors.email = '📧 Email is required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
              errors.email = '❌ Invalid email address'
            }
            if (!values.interest.trim()) {
              errors.interest = '🎯 Pick your learning path'
            }
            if (!values.message.trim()) {
              errors.message = '💭 Tell us what you want to achieve'
            }
            return errors
          }}
          onSubmit={(values, { resetForm }) => {
            console.log('Contact request', values)
            alert('🎉 Thanks! Your request has been submitted. We\'ll be in touch soon!')
            resetForm()
          }}
        >
          {({ errors, touched }) => (
            <Form className="space-y-7">
              <div className="transform transition duration-300 hover:scale-[1.01] p-4 rounded-2xl bg-gradient-to-r from-cyan-500/5 to-blue-500/5 hover:from-cyan-500/10 hover:to-blue-500/10">
                <label className="block text-lg font-bold text-cyan-200 mb-3 flex items-center gap-3">
                  <span className="text-3xl">👤</span>
                  Full name
                </label>
                <Field id="fullName" name="fullName" placeholder="e.g., Priya Sharma" css={formField} className={`${errors.fullName && touched.fullName ? 'border-red-500/70' : ''}`} />
                <ErrorMessage name="fullName" component="div" className="mt-3 text-sm font-bold text-red-400 flex items-center gap-1" />
              </div>

              <div className="transform transition duration-300 hover:scale-[1.01] p-4 rounded-2xl bg-gradient-to-r from-cyan-500/5 to-blue-500/5 hover:from-cyan-500/10 hover:to-blue-500/10">
                <label className="block text-lg font-bold text-cyan-200 mb-3 flex items-center gap-3">
                  <span className="text-3xl">📧</span>
                  Email address
                </label>
                <Field id="email" name="email" type="email" placeholder="your.email@example.com" css={formField} className={`${errors.email && touched.email ? 'border-red-500/70' : ''}`} />
                <ErrorMessage name="email" component="div" className="mt-3 text-sm font-bold text-red-400 flex items-center gap-1" />
              </div>

              <div className="transform transition duration-300 hover:scale-[1.01] p-4 rounded-2xl bg-gradient-to-r from-cyan-500/5 to-blue-500/5 hover:from-cyan-500/10 hover:to-blue-500/10">
                <label className="block text-lg font-bold text-cyan-200 mb-3 flex items-center gap-3">
                  <span className="text-3xl">🎯</span>
                  Learning focus
                </label>
                <Field as="select" id="interest" name="interest" css={formField} className={`${errors.interest && touched.interest ? 'border-red-500/70' : ''}`}>
                  <option value="">✨ Choose your path...</option>
                  <option value="beginner">🌱 Beginner logic & fundamentals</option>
                  <option value="frontend">🎨 Frontend portfolio</option>
                  <option value="enterprise">🏢 Enterprise & certification</option>
                </Field>
                <ErrorMessage name="interest" component="div" className="mt-3 text-sm font-bold text-red-400 flex items-center gap-1" />
              </div>

              <div className="transform transition duration-300 hover:scale-[1.01] p-4 rounded-2xl bg-gradient-to-r from-cyan-500/5 to-blue-500/5 hover:from-cyan-500/10 hover:to-blue-500/10">
                <label className="block text-lg font-bold text-cyan-200 mb-3 flex items-center gap-3">
                  <span className="text-3xl">💭</span>
                  Your goals
                </label>
                <Field as="textarea" id="message" name="message" rows={4} placeholder="What do you want to build? What's your dream project?" css={formField} className={`${errors.message && touched.message ? 'border-red-500/70' : ''}`} />
                <ErrorMessage name="message" component="div" className="mt-3 text-sm font-bold text-red-400 flex items-center gap-1" />
              </div>

              <SubmitButton type="submit" className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 via-cyan-400 to-blue-500 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-cyan-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/60 active:scale-95">
                <span>🚀 Join the Academy Now</span>
              </SubmitButton>
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
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
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
