import { useState, useEffect } from 'react'
import {
  Moon, Sun, Smartphone, AlignJustify, Users, CheckCircle2,
  Bell, Search, FolderOpen, UserMinus, Menu, X,
  MapPin, Phone, Clock,
} from 'lucide-react'
import { initScrollAnimations } from './scrollAnimations'

// ── Navbar ────────────────────────────────────────────────────────────
function Navbar({ dark, toggleDark }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-[#141414] border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-purple-700 flex-shrink-0" />
          <span className="font-bold text-gray-900 dark:text-white text-lg tracking-tight">
            Sauda2Sales
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              {label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleDark}
            className="w-10 h-10 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle dark mode"
          >
            {dark ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <a
            href="#contact"
            className="px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl text-sm font-semibold hover:bg-gray-700 dark:hover:bg-gray-100 transition-colors"
          >
            Get a Free Demo
          </a>
        </div>

        <button
          className="md:hidden text-gray-600 dark:text-gray-300"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-[#141414] border-t border-gray-100 dark:border-gray-800 px-6 py-4 flex flex-col gap-4">
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-sm text-gray-700 dark:text-gray-300 py-1"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
          <div className="flex gap-3 pt-2 border-t border-gray-100 dark:border-gray-800">
            <button
              onClick={toggleDark}
              className="w-10 h-10 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300"
            >
              {dark ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <a
              href="#contact"
              className="flex-1 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl text-sm font-semibold text-center"
              onClick={() => setMenuOpen(false)}
            >
              Get a Free Demo
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}

// ── Hero ──────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="hero-section" className="bg-white dark:bg-[#141414] py-16 md:py-24 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-16">
        <div className="flex-1">
          <h1
            id="hero-heading"
            className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white leading-[1.1] mb-6"
          >
            The Digital Catalog System for Fabric Wholesalers
          </h1>
          <p
            id="hero-subtext"
            className="text-lg text-gray-500 dark:text-gray-400 mb-8 leading-relaxed max-w-lg"
          >
            Stop sending catalog photos on WhatsApp. Give your buyers a private
            branded app — and manage everything from one place.
          </p>
          <div id="hero-cta" className="flex flex-wrap gap-3">
            <a
              href="#contact"
              className="px-6 py-3.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-semibold text-sm hover:bg-gray-700 dark:hover:bg-gray-100 transition-colors"
            >
              Book a Free Demo
            </a>
            <a
              href="#how-it-works"
              className="px-6 py-3.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-xl font-semibold text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              See How It Works
            </a>
          </div>
        </div>

        <div id="hero-image-wrap" className="flex-1 w-full" style={{ willChange: 'transform' }}>
          <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-gray-200 dark:bg-gray-800">
            <img
              src="/fabric.jpg"
              alt="Colorful fabric thread bobbins"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.parentElement.style.background =
                  'linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 70%, #533483 100%)'
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Problem Section ───────────────────────────────────────────────────
const PROBLEMS = [
  {
    Icon: Smartphone,
    title: 'Manual Photo Sharing',
    description: 'Sending catalog photos to 50+ buyers every week — manually, one by one',
  },
  {
    Icon: AlignJustify,
    title: 'Scattered Orders',
    description: "Orders coming in over calls, messages, screenshots — no system, things get missed",
  },
  {
    Icon: Users,
    title: 'No Control',
    description: "No way to control who sees your prices or track what's been handled",
  },
]

function ProblemSection() {
  return (
    <section className="bg-gray-50 dark:bg-[#1a1a1a] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white text-center mb-12 scroll-reveal">
          Still running your business on WhatsApp?
        </h2>
        <div className="grid md:grid-cols-3 gap-6 stagger-in">
          {PROBLEMS.map(({ Icon, title, description }) => (
            <div
              key={title}
              className="bg-white dark:bg-[#242424] rounded-2xl p-7 border border-gray-100 dark:border-gray-800"
            >
              <div className="w-12 h-12 rounded-xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center mb-5">
                <Icon size={22} className="text-red-500" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">{title}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Solution Section ──────────────────────────────────────────────────
function SolutionSection() {
  return (
    <section className="bg-white dark:bg-[#141414] py-20 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-6 scroll-reveal">
          One system. Two apps. Total control.
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed fade-up">
          Sauda2Sales gives you a private seller app to manage your full catalog — and a
          white-labeled buyer app your dealers install on their phones. Push a product live
          and every approved buyer gets notified instantly. Pull it when it's gone. All
          orders land in one place.
        </p>
      </div>
    </section>
  )
}

// ── Features Section — horizontal scroll ─────────────────────────────
const FEATURES = [
  {
    Icon: CheckCircle2,
    iconBg: 'bg-blue-50 dark:bg-blue-900/20',
    iconColor: 'text-blue-500',
    title: 'Live Catalog',
    description: "Push products live with one tap. Pull them off when they're sold. Your catalog is always current.",
  },
  {
    Icon: Smartphone,
    iconBg: 'bg-purple-50 dark:bg-purple-900/20',
    iconColor: 'text-purple-500',
    title: "Your Buyers' Own App",
    description: "Your buyers get an app with your business name and logo — not a generic marketplace.",
  },
  {
    Icon: Bell,
    iconBg: 'bg-green-50 dark:bg-green-900/20',
    iconColor: 'text-green-500',
    title: 'Instant Push Notifications',
    description: 'The moment you push a new fabric live, all your approved buyers get notified on their phones.',
  },
  {
    Icon: Search,
    iconBg: 'bg-orange-50 dark:bg-orange-900/20',
    iconColor: 'text-orange-400',
    title: 'Visual Fabric Search',
    description: 'Buyers upload a photo of a fabric and the app finds the closest match in your catalog using AI.',
  },
  {
    Icon: FolderOpen,
    iconBg: 'bg-indigo-50 dark:bg-indigo-900/20',
    iconColor: 'text-indigo-500',
    title: 'Order Management',
    description: "All buyer requests land in your app. See pending orders, mark them handled. Nothing falls through.",
  },
  {
    Icon: UserMinus,
    iconBg: 'bg-pink-50 dark:bg-pink-900/20',
    iconColor: 'text-pink-500',
    title: 'Controlled Access',
    description: 'You decide who sees your catalog. Approve buyers individually. Remove anyone, anytime.',
  },
]

function FeaturesSection() {
  return (
    <section
      id="features"
      className="h-scroll-section bg-gray-50 dark:bg-[#1a1a1a]"
      style={{ minHeight: '100vh' }}
    >
      {/* Heading — stays visible while section is pinned */}
      <div className="px-6 pt-14 pb-8 text-center">
        <span className="text-xs font-semibold tracking-[0.25em] uppercase text-violet-500">
          What you get
        </span>
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mt-3 scroll-reveal">
          Everything your fabric business needs
        </h2>
      </div>

      {/* Horizontal card strip */}
      <div className="overflow-hidden">
        <div
          className="features-strip"
          style={{
            gap: '24px',
            paddingLeft: '48px',
            paddingRight: '48px',
            width: 'max-content',
          }}
        >
          {FEATURES.map(({ Icon, iconBg, iconColor, title, description }) => (
            <div
              key={title}
              className="feature-card bg-white dark:bg-[#242424] rounded-2xl p-8 border border-gray-100 dark:border-gray-800 flex flex-col"
              style={{
                width: '360px',
                minWidth: '360px',
                flexShrink: 0,
                willChange: 'transform',
              }}
            >
              <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center mb-6`}>
                <Icon size={22} className={iconColor} />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white text-xl mb-3">{title}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop scroll hint */}
      <p className="hidden md:block text-center text-xs text-gray-400 dark:text-gray-600 mt-8 mb-6 tracking-[0.2em] uppercase">
        scroll to explore →
      </p>
    </section>
  )
}

// ── How It Works ──────────────────────────────────────────────────────
const STEPS = [
  {
    number: '1',
    title: 'Add your catalog',
    description: 'Upload fabric photos, set prices, and publish products. Your catalog is live instantly.',
  },
  {
    number: '2',
    title: 'Buyers browse and order',
    description: "Your dealers install your branded app, browse what's live, and send order requests directly.",
  },
  {
    number: '3',
    title: 'You handle everything in one place',
    description: 'Get notified of new orders, see all pending requests, and mark them done.',
  },
]

function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white dark:bg-[#141414] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white text-center mb-16 scroll-reveal">
          Up and running in 3 steps
        </h2>
        <div className="grid md:grid-cols-3 gap-10 text-center stagger-in">
          {STEPS.map(({ number, title, description }) => (
            <div key={number} className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-gray-900 dark:bg-white flex items-center justify-center mb-5 flex-shrink-0">
                <span className="text-white dark:text-gray-900 font-black text-xl">{number}</span>
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">{title}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Built For ─────────────────────────────────────────────────────────
const BUILT_FOR = [
  'Saree and fabric wholesalers in Surat',
  'Businesses with 10–500+ dealer/buyer relationships',
  'Sellers who want to stop managing catalog sharing manually',
  'Teams — add managers who can see products but not your purchase prices',
]

function BuiltFor() {
  return (
    <section className="bg-gray-50 dark:bg-[#1a1a1a] py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white text-center mb-10 scroll-reveal">
          Built for the fabric trade
        </h2>
        <ul className="flex flex-col gap-4 stagger-in">
          {BUILT_FOR.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-2 w-2 h-2 rounded-full bg-violet-500 flex-shrink-0" />
              <span className="text-gray-700 dark:text-gray-200 text-base leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

// ── Pricing Section ───────────────────────────────────────────────────
function PricingSection() {
  return (
    <section id="pricing" className="bg-white dark:bg-[#141414] py-20 px-6">
      <div className="max-w-3xl mx-auto text-center fade-up">
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4 scroll-reveal">
          Pricing
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed mb-8">
          We tailor every setup to the size and needs of your business — catalog volume,
          number of buyers, and required features all factor in. Get in touch and we'll
          give you a straight quote with no hidden charges.
        </p>
        <a
          href="#contact"
          className="inline-block px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold text-sm hover:bg-gray-700 dark:hover:bg-gray-100 transition-colors"
        >
          Contact Us for Pricing
        </a>
      </div>
    </section>
  )
}

// ── Contact / Lead Form ───────────────────────────────────────────────
const FORM_FIELDS = [
  { label: 'Your Name', key: 'name', placeholder: 'Enter your name', type: 'text', required: true },
  { label: 'Business Name', key: 'business', placeholder: 'Enter your business name', type: 'text', required: true },
  { label: 'Phone Number', key: 'phone', placeholder: 'Enter your phone number', type: 'tel', required: true },
  { label: 'City', key: 'city', placeholder: 'Enter your city', type: 'text', required: true },
  { label: 'How many buyers do you have? (Optional)', key: 'buyers', placeholder: 'e.g., 50-100', type: 'text', required: false },
]

function ContactForm() {
  const [form, setForm] = useState({ name: '', business: '', phone: '', city: '', buyers: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <section id="contact" className="bg-white dark:bg-[#141414] py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white text-center mb-3 scroll-reveal">
          Ready to modernize your catalog?
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-center mb-12 fade-up">
          Tell us about your business and we'll set up a free 15-minute walkthrough.
        </p>

        <div className="grid md:grid-cols-2 gap-8 items-start stagger-in">
          {/* Contact info */}
          <div className="bg-gray-50 dark:bg-[#1a1a1a] border border-gray-100 dark:border-gray-800 rounded-2xl p-8 flex flex-col gap-6">
            <div>
              <h3 className="font-black text-gray-900 dark:text-white text-xl mb-1">Techgeekz Services</h3>
              <p className="text-sm text-violet-600 dark:text-violet-400 font-medium">Marketing &amp; Technology Agency</p>
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-violet-50 dark:bg-violet-900/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin size={16} className="text-violet-500" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Address</p>
                  <p className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed">
                    6th Floor, 602 Sundram Plus,<br />
                    Timaliyawad Road, Athugar St,<br />
                    Kharwawad, Nanpura,<br />
                    Surat, Gujarat 395001
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center flex-shrink-0">
                  <Phone size={16} className="text-green-500" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Phone</p>
                  <a
                    href="tel:07383517970"
                    className="text-sm text-gray-700 dark:text-gray-200 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                  >
                    073835 17970
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center flex-shrink-0">
                  <Clock size={16} className="text-blue-500" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Hours</p>
                  <p className="text-sm text-gray-700 dark:text-gray-200">
                    <span className="text-green-500 font-semibold">Open</span> · Closes 6 pm
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Lead form */}
          {submitted ? (
            <div className="text-center py-16 bg-gray-50 dark:bg-[#1a1a1a] rounded-2xl border border-gray-100 dark:border-gray-800">
              <div className="text-6xl mb-5">✅</div>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">We'll be in touch!</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Expect a call within 24 hours.</p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-gray-50 dark:bg-[#1a1a1a] border border-gray-100 dark:border-gray-800 rounded-2xl p-8 flex flex-col gap-5"
            >
              {FORM_FIELDS.map(({ label, key, placeholder, type, required }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    {label}
                  </label>
                  <input
                    type={type}
                    required={required}
                    placeholder={placeholder}
                    value={form[key]}
                    onChange={e => setForm({ ...form, [key]: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-[#2a2a2a] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm transition-shadow"
                  />
                </div>
              ))}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold text-base hover:bg-gray-700 dark:hover:bg-gray-100 transition-colors mt-2 disabled:opacity-60"
              >
                {loading ? 'Sending...' : 'Book My Free Demo'}
              </button>

              <p className="text-xs text-gray-400 dark:text-gray-600 text-center">
                We'll reach out within 24 hours. No spam, no pressure.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

// ── Footer ────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-[#1a1a1a] border-t border-gray-100 dark:border-gray-800 py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-purple-700 flex-shrink-0" />
            <span className="font-bold text-gray-900 dark:text-white">
              Sauda2Sales — The fabric trade, modernized.
            </span>
          </div>
          <div className="flex flex-wrap gap-6 justify-center">
            {[
              { label: 'Features', href: '#features' },
              { label: 'How It Works', href: '#how-it-works' },
              { label: 'Contact', href: '#contact' },
              { label: 'Privacy Policy', href: '#' },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
        <p className="text-center text-xs text-gray-400 dark:text-gray-600">
          © 2025 Sauda2Sales. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

// ── Root App ──────────────────────────────────────────────────────────
export default function App() {
  const [dark, setDark] = useState(true) // default dark for a sophisticated look

  const toggleDark = () => setDark(d => !d)

  // Apply dark class to <html> so Tailwind dark: variants work everywhere
  // and <html>/<body> background doesn't bleed through as white
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  useEffect(() => {
    const cleanup = initScrollAnimations()
    return cleanup || (() => {})
  }, [])

  return (
    <div>
      <div className="bg-white dark:bg-[#141414] min-h-screen">
        <Navbar dark={dark} toggleDark={toggleDark} />
        <Hero />
        <ProblemSection />
        <SolutionSection />
        <FeaturesSection />
        <HowItWorks />
        <BuiltFor />
        <PricingSection />
        <ContactForm />
        <Footer />
      </div>
    </div>
  )
}
