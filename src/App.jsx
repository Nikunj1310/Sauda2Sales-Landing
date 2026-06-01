import { useState, useEffect } from 'react'
import {
  Moon,
  Sun,
  Menu,
  X,
  BadgeCheck,
  Image,
  MessageCircle,
  ShoppingCart,
  ShieldCheck,
  Layers,
  Bell,
  Sparkles,
  CheckCircle2,
  Users,
  MapPin,
  Phone,
  Clock,
} from 'lucide-react'
import { initScrollAnimations } from './scrollAnimations'

// ── Navbar ────────────────────────────────────────────────────────────
function Navbar({ dark, toggleDark }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Visual Search', href: '#visual-search' },
    { label: 'Seller Types', href: '#seller-types' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-white/90 dark:bg-[#141414]/90 border-b border-gray-100 dark:border-gray-800 backdrop-blur">
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
            Request a Demo
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
              Request a Demo
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
          <span className="inline-flex items-center gap-2 rounded-full bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-300 text-xs font-semibold uppercase tracking-[0.3em] px-4 py-2 mb-6">
            Order from verified catalogs
          </span>
          <h1
            id="hero-heading"
            className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white leading-[1.05] mb-6"
          >
            Browse, search, and place orders in minutes.
          </h1>
          <p
            id="hero-subtext"
            className="text-lg text-gray-500 dark:text-gray-400 mb-8 leading-relaxed max-w-xl"
          >
            Browse a seller’s live catalog, search products by photo, and place an order
            request in minutes—right from your phone.
          </p>
          <div id="hero-cta" className="flex flex-wrap gap-3">
            <a
              href="#contact"
              className="px-6 py-3.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-semibold text-sm hover:bg-gray-700 dark:hover:bg-gray-100 transition-colors"
            >
              Get Access
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
          <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-gray-200 dark:bg-gray-800 shadow-2xl shadow-violet-500/10">
            <img
              src="/fabric2.jpg"
              alt="Catalog browsing on a phone"
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

// ── Value Props ───────────────────────────────────────────────────────
const VALUE_PROPS = [
  {
    Icon: BadgeCheck,
    title: 'Access verified catalogs',
    description:
      'Request access using a store code. Open sellers grant instant access, while approval-based sellers keep pricing private.',
  },
  {
    Icon: Image,
    title: 'Search by photo',
    description:
      'Upload a photo or screenshot and instantly find visually similar products in the catalogs you can view.',
  },
  {
    Icon: MessageCircle,
    title: 'Order via WhatsApp in 1 tap',
    description:
      'Select items, confirm your WhatsApp message, and your request becomes pending with live status updates.',
  },
]

function ValueProps() {
  return (
    <section className="bg-gray-50 dark:bg-[#1a1a1a] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4 scroll-reveal">
            Order from your supplier faster.
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed fade-up">
            Sauda2Sales connects buyers and sellers with secure access, live catalogs, and
            a streamlined WhatsApp order workflow.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mt-12 stagger-in">
          {VALUE_PROPS.map(({ Icon, title, description }) => (
            <div
              key={title}
              className="bg-white dark:bg-[#242424] rounded-2xl p-7 border border-gray-100 dark:border-gray-800"
            >
              <div className="w-12 h-12 rounded-xl bg-violet-50 dark:bg-violet-900/20 flex items-center justify-center mb-5">
                <Icon size={22} className="text-violet-500" />
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

// ── How It Works ──────────────────────────────────────────────────────
const STEPS = [
  {
    number: '1',
    title: 'Choose your seller or brand',
    description: 'Pick a supplier and enter their store access code to get started.',
  },
  {
    number: '2',
    title: 'Get access',
    description: 'Instant for open catalogs, or wait for approval if the seller requires it.',
  },
  {
    number: '3',
    title: 'Browse and search',
    description: 'See live inventory, search by keywords, or use photo search to find similar designs.',
  },
  {
    number: '4',
    title: 'Send your order on WhatsApp',
    description: 'Confirm the WhatsApp message and track the request status in-app.',
  },
]

function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white dark:bg-[#141414] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white text-center mb-16 scroll-reveal">
          How it works in 4 steps
        </h2>
        <div className="grid md:grid-cols-4 gap-8 text-center stagger-in">
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

// ── Features Section — horizontal scroll ─────────────────────────────
const FEATURES = [
  {
    Icon: BadgeCheck,
    iconBg: 'bg-blue-50 dark:bg-blue-900/20',
    iconColor: 'text-blue-500',
    title: 'Access & onboarding',
    description: 'Request access with a store code, with instant access or approval-based gating.',
  },
  {
    Icon: Layers,
    iconBg: 'bg-purple-50 dark:bg-purple-900/20',
    iconColor: 'text-purple-500',
    title: 'Live catalog browsing',
    description: 'See only live items with photos, names, types, and selling prices.',
  },
  {
    Icon: Sparkles,
    iconBg: 'bg-amber-50 dark:bg-amber-900/20',
    iconColor: 'text-amber-500',
    title: 'Visual search',
    description: 'Upload a photo to find visually similar products across the sellers you access.',
  },
  {
    Icon: ShoppingCart,
    iconBg: 'bg-emerald-50 dark:bg-emerald-900/20',
    iconColor: 'text-emerald-500',
    title: 'Cart & shortlist',
    description: 'Add items to a seller-specific cart and adjust quantities before ordering.',
  },
  {
    Icon: MessageCircle,
    iconBg: 'bg-pink-50 dark:bg-pink-900/20',
    iconColor: 'text-pink-500',
    title: 'Order request + WhatsApp',
    description: 'Create an order request, send via WhatsApp, and mark it as sent.',
  },
  {
    Icon: Bell,
    iconBg: 'bg-indigo-50 dark:bg-indigo-900/20',
    iconColor: 'text-indigo-500',
    title: 'Status updates',
    description: 'Track approvals and order status changes directly inside the app.',
  },
]

function FeaturesSection() {
  return (
    <section
      id="features"
      className="h-scroll-section bg-gray-50 dark:bg-[#1a1a1a]"
      style={{ minHeight: '100vh' }}
    >
      <div className="px-6 pt-14 pb-8 text-center">
        <span className="text-xs font-semibold tracking-[0.25em] uppercase text-violet-500">
          Core features
        </span>
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mt-3 scroll-reveal">
          Everything buyers need to order confidently
        </h2>
      </div>

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

      <p className="hidden md:block text-center text-xs text-gray-400 dark:text-gray-600 mt-8 mb-6 tracking-[0.2em] uppercase">
        scroll to explore →
      </p>
    </section>
  )
}

// ── Visual Search ─────────────────────────────────────────────────────
const VISUAL_CARDS = [
  {
    eyebrow: 'Key benefits',
    title: 'Faster discovery',
    items: [
      'No need to guess product names or codes.',
      'Results ranked by visual similarity.',
      'Search across every seller you’re approved to view.',
      'Private and controlled by your catalog access.',
    ],
  },
  {
    eyebrow: 'How it works',
    title: '3 simple steps',
    items: [
      'Upload a photo from your camera or gallery.',
      'We create a visual signature from the image.',
      'Vector similarity search returns the closest matches.',
    ],
  },
  {
    eyebrow: 'Technical details',
    title: 'AI embeddings + vector search',
    description:
      'Under the hood, the photo is converted into an AI embedding vector and matched with nearest-neighbor search using cosine distance. This is not keyword matching.',
  },
  {
    eyebrow: 'Trust & limits',
    title: 'Fair-use built in',
    description:
      'To keep search fast and fair for everyone, usage may be rate-limited based on monthly activity.',
  },
]

function VisualSearchSection() {
  return (
    <section id="visual-search" className="bg-white dark:bg-[#141414] py-24 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-12 items-start">
        <div className="sticky-panel">
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-violet-500">
            Visual Search
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mt-4 mb-5 scroll-reveal">
            Find products by photo, instantly.
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed mb-8 fade-up">
            Upload a product photo and we’ll show the closest matches from the seller catalogs
            you have access to—ranked by visual similarity.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#contact"
              className="px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl text-sm font-semibold hover:bg-gray-700 dark:hover:bg-gray-100 transition-colors"
            >
              Try visual search
            </a>
            <a
              href="#features"
              className="px-5 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-xl text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              See all features
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          {VISUAL_CARDS.map(({ eyebrow, title, items, description }) => (
            <div
              key={title}
              className="parallax-card bg-gray-50 dark:bg-[#1a1a1a] border border-gray-100 dark:border-gray-800 rounded-2xl p-8 shadow-lg shadow-violet-500/5"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-500">
                {eyebrow}
              </span>
              <h3 className="font-bold text-gray-900 dark:text-white text-xl mt-3">{title}</h3>
              {items ? (
                <ul className="mt-4 space-y-3 text-sm text-gray-600 dark:text-gray-300">
                  {items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-violet-500 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-4 leading-relaxed">
                  {description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Seller Types ──────────────────────────────────────────────────────
const SELLER_TYPES = [
  {
    Icon: BadgeCheck,
    title: 'Open catalog sellers',
    description: 'Access is instant after store code verification or link-based access.',
  },
  {
    Icon: ShieldCheck,
    title: 'Approval-based sellers',
    description: 'You request access, and the seller approves before you can view pricing.',
  },
  {
    Icon: Users,
    title: 'Multi-user seller teams',
    description: 'Seller staff and managers handle approvals and replies quickly.',
  },
]

function SellerTypesSection() {
  return (
    <section id="seller-types" className="bg-gray-50 dark:bg-[#1a1a1a] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-12 scroll-reveal">
          Understand seller access modes
        </h2>
        <div className="grid md:grid-cols-3 gap-6 stagger-in">
          {SELLER_TYPES.map(({ Icon, title, description }) => (
            <div
              key={title}
              className="bg-white dark:bg-[#242424] rounded-2xl p-7 border border-gray-100 dark:border-gray-800"
            >
              <div className="w-12 h-12 rounded-xl bg-violet-50 dark:bg-violet-900/20 flex items-center justify-center mb-5">
                <Icon size={22} className="text-violet-500" />
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

// ── Trust & Safety ────────────────────────────────────────────────────
const TRUST_POINTS = [
  'Buyers see only buyer-safe catalog data — internal costs stay private.',
  'Sellers control who can access pricing and can remove access anytime.',
  'All accounts are authenticated with secure sign-in.',
]

function TrustSection() {
  return (
    <section className="bg-white dark:bg-[#141414] py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white text-center mb-10 scroll-reveal">
          Built for B2B trust and safety
        </h2>
        <div className="grid md:grid-cols-3 gap-6 stagger-in">
          {TRUST_POINTS.map((point) => (
            <div
              key={point}
              className="bg-gray-50 dark:bg-[#1a1a1a] border border-gray-100 dark:border-gray-800 rounded-2xl p-6"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center mb-4">
                <CheckCircle2 size={18} className="text-emerald-500" />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{point}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── FAQ ───────────────────────────────────────────────────────────────
const FAQS = [
  {
    question: 'Do I need approval to access a catalog?',
    answer: 'It depends on the seller. Open catalogs grant instant access, while approval-based sellers must accept your request.',
  },
  {
    question: 'How do I get the store code?',
    answer: 'Sellers share their store access code or invite link directly with their buyers.',
  },
  {
    question: 'How do orders work?',
    answer: 'You select items, confirm a WhatsApp order message, and track the request status inside the app.',
  },
]

function FAQSection() {
  return (
    <section id="faq" className="bg-gray-50 dark:bg-[#1a1a1a] py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white text-center mb-12 scroll-reveal">
          Frequently asked questions
        </h2>
        <div className="flex flex-col gap-6 stagger-in">
          {FAQS.map(({ question, answer }) => (
            <div
              key={question}
              className="bg-white dark:bg-[#242424] border border-gray-100 dark:border-gray-800 rounded-2xl p-6"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{question}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── CTA ───────────────────────────────────────────────────────────────
function CTASection() {
  return (
    <section className="bg-gradient-to-br from-gray-900 via-gray-900 to-violet-900 py-20 px-6">
      <div className="max-w-5xl mx-auto text-center text-white">
        <h2 className="text-3xl md:text-4xl font-black mb-4">Ready to order from verified catalogs?</h2>
        <p className="text-gray-200 mb-8">
          Get access, request a demo, or download your branded buyer app today.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href="#contact"
            className="px-6 py-3.5 bg-white text-gray-900 rounded-xl font-semibold text-sm hover:bg-gray-100 transition-colors"
          >
            Get Access
          </a>
          <a
            href="#contact"
            className="px-6 py-3.5 border border-white/40 text-white rounded-xl font-semibold text-sm hover:bg-white/10 transition-colors"
          >
            Request a Demo
          </a>
          <a
            href="#contact"
            className="px-6 py-3.5 border border-white/40 text-white rounded-xl font-semibold text-sm hover:bg-white/10 transition-colors"
          >
            Download App
          </a>
        </div>
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
          Get access or request a demo
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-center mb-12 fade-up">
          Tell us about your business and we’ll set up a personalized walkthrough.
        </p>

        <div className="grid md:grid-cols-2 gap-8 items-start stagger-in">
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

          {submitted ? (
            <div className="text-center py-16 bg-gray-50 dark:bg-[#1a1a1a] rounded-2xl border border-gray-100 dark:border-gray-800">
              <div className="text-6xl mb-5">✅</div>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">We’ll be in touch!</h3>
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
                {loading ? 'Sending...' : 'Book My Demo'}
              </button>

              <p className="text-xs text-gray-400 dark:text-gray-600 text-center">
                We’ll reach out within 24 hours. No spam, no pressure.
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
              Sauda2Sales — B2B ordering, simplified.
            </span>
          </div>
          <div className="flex flex-wrap gap-6 justify-center">
            {[
              { label: 'Features', href: '#features' },
              { label: 'How It Works', href: '#how-it-works' },
              { label: 'Visual Search', href: '#visual-search' },
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
  const [dark, setDark] = useState(true)

  const toggleDark = () => setDark(d => !d)

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
        <ValueProps />
        <HowItWorks />
        <FeaturesSection />
        <VisualSearchSection />
        <SellerTypesSection />
        <TrustSection />
        <FAQSection />
        <CTASection />
        <ContactForm />
        <Footer />
      </div>
    </div>
  )
}
