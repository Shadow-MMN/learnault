'use client'

import React, { useEffect, useRef, useState } from 'react'
import { ArrowRight, TrendingUp, Lock, Users, Zap, Globe, Menu, X } from 'lucide-react'

/* ─── useInView ──────────────────────────────────────────────────────────── */
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

/* ─── Counter ────────────────────────────────────────────────────────────── */
function Counter({ to, prefix = '', suffix = '' }: { to: number; prefix?: string; suffix?: string }) {
  const [n, setN] = useState(0)
  const { ref, inView } = useInView(0.5)
  useEffect(() => {
    if (!inView) return
    let c = 0
    const step = Math.max(1, Math.ceil(to / 60))
    const t = setInterval(() => {
      c += step
      if (c >= to) { setN(to); clearInterval(t) } else setN(c)
    }, 16)
    return () => clearInterval(t)
  }, [inView, to])
  return <span ref={ref}>{prefix}{n.toLocaleString()}{suffix}</span>
}

/* ─── Data ───────────────────────────────────────────────────────────────── */
const FEATURES = [
  { Icon: TrendingUp, title: 'Earn While Learning', desc: 'Complete courses and earn LEARN tokens that have real value on the Stellar blockchain.' },
  { Icon: Lock, title: 'Blockchain Credentials', desc: 'Receive verifiable certificates that employers can instantly validate.' },
  { Icon: Users, title: 'Global Community', desc: 'Connect with learners and employers from Africa, Latin America, and Southeast Asia.' },
  { Icon: Lock, title: 'Secure Wallets', desc: 'Your earnings are safely stored in Stellar wallets that you control.' },
  { Icon: Zap, title: 'Quick Payouts', desc: 'Withdraw your earnings anytime with fast, low-fee blockchain transactions.' },
  { Icon: Globe, title: 'No Borders', desc: 'Access opportunities regardless of your location or financial background.' },
]

const STEPS = [
  { num: '01', title: 'Sign Up Free', desc: 'Create your account and complete your profile in just 2 minutes.' },
  { num: '02', title: 'Browse & Enroll', desc: 'Choose from 150+ courses across technology, business, design, and more.' },
  { num: '03', title: 'Learn at Your Pace', desc: 'Complete lessons, take quizzes, and earn tokens as you progress.' },
  { num: '04', title: 'Get Certified', desc: 'Receive blockchain-verified credentials upon course completion.' },
  { num: '05', title: 'Earn & Withdraw', desc: 'Access your LEARN tokens in your wallet and withdraw anytime.' },
  { num: '06', title: 'Land Opportunities', desc: 'Connect with employers seeking verified, skilled talent like you.' },
]

const TESTIMONIALS = [
  { name: 'Chioma Adeyemi', role: 'Learner · Lagos, Nigeria', avatar: 'CA', avatarBg: '#F97316', quote: "Learnault helped me upskill in digital marketing and earn money at the same time. I've already referred 5 friends!" },
  { name: 'Miguel Santos', role: 'Learner · São Paulo, Brazil', avatar: 'MS', avatarBg: '#475569', quote: 'The blockchain module was incredibly comprehensive. Now I understand crypto better and have earned real rewards.' },
  { name: 'Priya Sharma', role: 'Employer · Bangalore, India', avatar: 'PS', avatarBg: '#22C55E', quote: 'We found exceptional talent through Learnault. The learners are motivated, skilled, and ready to work.' },
]

/* ─── FeatureCard ────────────────────────────────────────────────────────── */
interface FeatureCardProps { Icon: React.ElementType; title: string; desc: string; delay: number }
function FeatureCard({ Icon, title, desc, delay }: FeatureCardProps) {
  const { ref, inView } = useInView()
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(20px)', transition: `opacity .5s ${delay}s, transform .5s ${delay}s`, background: '#fff', borderRadius: 12, padding: '24px 20px', border: '1px solid #E5E7EB' }}>
      <div style={{ width: 44, height: 44, borderRadius: 10, background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
        <Icon size={20} color="#0070B6" />
      </div>
      <h3 style={{ fontSize: 15, fontWeight: 700, color: '#111827', marginBottom: 8 }}>{title}</h3>
      <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.6, margin: 0 }}>{desc}</p>
    </div>
  )
}

/* ─── StepCard ───────────────────────────────────────────────────────────── */
interface StepCardProps { num: string; title: string; desc: string; showArrow: boolean; delay: number }
function StepCard({ num, title, desc, delay }: StepCardProps) {
  const { ref, inView } = useInView()
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(20px)', transition: `opacity .5s ${delay}s, transform .5s ${delay}s` }}>
      <div style={{ background: '#fff', borderRadius: 12, padding: '24px 20px', border: '1px solid #E5E7EB' }}>
        <p style={{ fontSize: 28, fontWeight: 300, color: '#0070B6', opacity: 0.35, marginBottom: 10, margin: '0 0 10px 0' }}>{num}</p>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: '#111827', marginBottom: 8, margin: '0 0 8px 0' }}>{title}</h3>
        <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.6, margin: 0 }}>{desc}</p>
      </div>
    </div>
  )
}

/* ─── TestimonialCard ────────────────────────────────────────────────────── */
interface TCardProps { name: string; role: string; avatar: string; avatarBg: string; quote: string; delay: number }
function TCard({ name, role, avatar, avatarBg, quote, delay }: TCardProps) {
  const { ref, inView } = useInView()
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(20px)', transition: `opacity .5s ${delay}s, transform .5s ${delay}s`, background: '#fff', borderRadius: 12, padding: '28px 24px', border: '1px solid #E5E7EB' }}>
      <div style={{ display: 'flex', gap: 3, marginBottom: 16 }}>
        {'★★★★★'.split('').map((s, i) => <span key={i} style={{ color: '#0070B6', fontSize: 14 }}>{s}</span>)}
      </div>
      <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.7, marginBottom: 20, fontWeight: 500 }}>&ldquo;{quote}&rdquo;</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 38, height: 38, borderRadius: '50%', background: avatarBg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{avatar}</div>
        <div>
          <p style={{ fontSize: 13, fontWeight: 700, color: '#111827', margin: 0 }}>{name}</p>
          <p style={{ fontSize: 11, color: '#9CA3AF', margin: 0 }}>{role}</p>
        </div>
      </div>
    </div>
  )
}

/* ─── Main Page ──────────────────────────────────────────────────────────── */
export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }

  return (
    <>
      <style href="learnault-styles" precedence="default">{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #F9FAFB; color: #111827; overflow-x: hidden; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: none; } }
        .fade-up-1 { animation: fadeUp .7s ease both; }
        .fade-up-2 { animation: fadeUp .7s ease .15s both; }
        .nav-link { background: none; border: none; font-size: 14px; font-weight: 500; color: #374151; cursor: pointer; font-family: inherit; padding: 0; transition: color .2s; }
        .nav-link:hover { color: #0070B6; }
        .btn-outline { background: none; border: 1px solid #D1D5DB; border-radius: 8px; padding: 7px 18px; font-size: 14px; font-weight: 500; color: #374151; cursor: pointer; font-family: inherit; transition: all .2s; }
        .btn-outline:hover { border-color: #0070B6; color: #0070B6; }
        .btn-primary { background: #0070B6; border: none; border-radius: 8px; padding: 7px 18px; font-size: 14px; font-weight: 600; color: #fff; cursor: pointer; font-family: inherit; transition: background .2s; }
        .btn-primary:hover { background: #005a92; }
        .btn-hero { display: inline-flex; align-items: center; gap: 8px; background: #0070B6; border: none; border-radius: 8px; padding: 12px 24px; font-size: 15px; font-weight: 600; color: #fff; cursor: pointer; font-family: inherit; transition: all .2s; box-shadow: 0 4px 14px rgba(0,112,182,0.3); }
        .btn-hero:hover { background: #005a92; transform: translateY(-1px); }
        .btn-ghost { background: none; border: none; font-size: 14px; font-weight: 500; color: #374151; cursor: pointer; font-family: inherit; padding: 0; transition: color .2s; }
        .btn-ghost:hover { color: #0070B6; }
        .btn-cta-primary { display: inline-flex; align-items: center; gap: 8px; background: #fff; border: none; border-radius: 8px; padding: 12px 24px; font-size: 15px; font-weight: 700; color: #0070B6; cursor: pointer; font-family: inherit; transition: background .2s; }
        .btn-cta-primary:hover { background: #F0F9FF; }
        .btn-cta-outline { background: transparent; border: 1.5px solid rgba(255,255,255,0.5); border-radius: 8px; padding: 12px 24px; font-size: 15px; font-weight: 600; color: #fff; cursor: pointer; font-family: inherit; transition: border-color .2s; }
        .btn-cta-outline:hover { border-color: rgba(255,255,255,0.9); }
        .footer-link { color: #9CA3AF; text-decoration: none; font-size: 13px; transition: color .2s; }
        .footer-link:hover { color: #0070B6; }
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .desktop-cta { display: none !important; }
          .hamburger { display: flex !important; }
          .hero-grid { grid-template-columns: 1fr !important; }
          .features-grid { grid-template-columns: repeat(2,1fr) !important; }
          .steps-grid { grid-template-columns: repeat(2,1fr) !important; }
          .testimonials-grid { grid-template-columns: 1fr !important; max-width: 480px; margin: 0 auto; }
          .cta-stats { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 540px) {
          .features-grid { grid-template-columns: 1fr !important; }
          .steps-grid { grid-template-columns: 1fr !important; }
          .hero-stats { gap: 24px !important; }
          .cta-box { padding: 36px 24px !important; }
          .footer-inner { flex-direction: column; text-align: center; }
        }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: scrolled ? 'rgba(255,255,255,0.97)' : '#fff', borderBottom: '1px solid #E5E7EB', backdropFilter: 'blur(12px)', boxShadow: scrolled ? '0 1px 8px rgba(0,0,0,0.06)' : 'none', transition: 'box-shadow .3s' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 20, fontWeight: 800, color: '#0070B6', letterSpacing: '-0.5px', cursor: 'pointer' }} onClick={() => go('hero')}>
            Learnault
          </span>
          <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            {[['features', 'Features'], ['how-it-works', 'How It Works'], ['testimonials', 'Success Stories']].map(([id, label]) => (
              <button key={id} className="nav-link" onClick={() => go(id)}>{label}</button>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div className="desktop-cta" style={{ display: 'flex', gap: 10 }}>
              <button className="btn-outline">Login</button>
              <button className="btn-primary">Sign Up</button>
            </div>
            <button className="hamburger" onClick={() => setMobileOpen(true)} style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 4, alignItems: 'center' }}>
              <Menu size={22} color="#374151" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{ position: 'fixed', inset: 0, background: '#fff', zIndex: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 32 }}>
          <button onClick={() => setMobileOpen(false)} style={{ position: 'absolute', top: 20, right: 24, background: 'none', border: 'none', cursor: 'pointer' }}><X size={24} /></button>
          {[['features', 'Features'], ['how-it-works', 'How It Works'], ['testimonials', 'Success Stories']].map(([id, label]) => (
            <button key={id} onClick={() => go(id)} style={{ background: 'none', border: 'none', fontSize: 22, fontWeight: 700, color: '#111827', cursor: 'pointer', fontFamily: 'inherit' }}>{label}</button>
          ))}
          <button className="btn-primary" style={{ padding: '12px 32px', fontSize: 16 }}>Sign Up Free</button>
        </div>
      )}

      {/* ── HERO ── */}
      <section id="hero" style={{ background: '#fff', padding: '72px 24px 64px' }}>
        <div className="hero-grid" style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>

          {/* Left */}
          <div className="fade-up-1">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 40, border: '1px solid #BFDBFE', background: '#EFF6FF', marginBottom: 24 }}>
              <Zap size={14} color="#0070B6" />
              <span style={{ fontSize: 13, fontWeight: 500, color: '#0070B6' }}>Welcome to the Future of Learning</span>
            </div>
            <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 900, lineHeight: 1.1, color: '#111827', letterSpacing: '-1.5px', marginBottom: 20 }}>
              Learn, Earn,<br />and <span style={{ color: '#0070B6' }}>Transform</span><br />Your Future
            </h1>
            <p style={{ fontSize: 15, color: '#6B7280', lineHeight: 1.7, maxWidth: 480, marginBottom: 32, fontWeight: 400 }}>
              Join millions of learners earning real rewards through quality education powered by blockchain technology. Start your journey today and unlock opportunities in emerging markets.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 48 }}>
              <button className="btn-hero">Start Learning Now <ArrowRight size={16} /></button>
              <button className="btn-ghost">Browse Modules</button>
            </div>
            <div className="hero-stats" style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
              {[
                { to: 50, prefix: '', suffix: 'K+', label: 'Active Learners' },
                { to: 150, prefix: '', suffix: '+', label: 'Quality Courses' },
                { to: 2, prefix: '$', suffix: 'M+', label: 'Earned & Withdrawn' },
              ].map(({ to, prefix, suffix, label }) => (
                <div key={label}>
                  <p style={{ fontSize: 26, fontWeight: 800, color: '#0070B6', lineHeight: 1, margin: 0 }}>
                    <Counter to={to} prefix={prefix} suffix={suffix} />
                  </p>
                  <p style={{ fontSize: 12, color: '#9CA3AF', marginTop: 4, marginBottom: 0 }}>{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right card */}
          <div className="fade-up-2">
            <div style={{ background: 'linear-gradient(135deg, #d4e4f0 0%, #e8d9d4 50%, #f5d4c8 100%)', borderRadius: 20, padding: 32 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 28 }}>
                <div style={{ width: 52, height: 52, borderRadius: 12, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>📚</div>
                <div>
                  <p style={{ fontSize: 17, fontWeight: 700, color: '#111827', margin: 0 }}>1000+ Courses</p>
                  <p style={{ fontSize: 13, color: '#6B7280', marginTop: 2, marginBottom: 0 }}>Curated by industry experts from around the world</p>
                </div>
              </div>
              <div style={{ background: '#fff', borderRadius: 12, padding: '4px 20px' }}>
                {[
                  { color: '#7CC7E1', label: 'Learn at Your Pace', sub: '30-min to 10-hour courses' },
                  { color: '#F5A875', label: 'Earn LEARN Tokens', sub: 'Real cryptocurrency rewards' },
                  { color: '#7CC7E1', label: 'Verifiable Credentials', sub: 'Blockchain-backed certificates' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: i < 2 ? '1px solid #F3F4F6' : 'none' }}>
                    <div style={{ width: 22, height: 22, borderRadius: '50%', background: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ color: '#fff', fontSize: 11, fontWeight: 700 }}>✓</span>
                    </div>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 700, color: '#111827', margin: 0 }}>{item.label}</p>
                      <p style={{ fontSize: 11, color: '#9CA3AF', margin: 0 }}>{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" style={{ background: '#F3F4F6', padding: '72px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, color: '#111827', marginBottom: 12, letterSpacing: '-0.5px' }}>Why Choose Learnault?</h2>
            <p style={{ fontSize: 16, color: '#6B7280', margin: 0 }}>Experience the future of education with real rewards and opportunities</p>
          </div>
          <div className="features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
            {FEATURES.map((f, i) => <FeatureCard key={f.title} Icon={f.Icon} title={f.title} desc={f.desc} delay={i * 0.07} />)}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" style={{ background: '#fff', padding: '72px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, color: '#111827', marginBottom: 12, letterSpacing: '-0.5px' }}>How Learnault Works</h2>
            <p style={{ fontSize: 15, color: '#6B7280', margin: 0 }}>Six simple steps to transform your future through learning and earning</p>
          </div>
          <div className="steps-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 40 }}>
            {STEPS.map((s, i) => (
              <StepCard key={s.num} num={s.num} title={s.title} desc={s.desc} showArrow={i % 3 !== 2 && i < 5} delay={i * 0.07} />
            ))}
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 13, color: '#9CA3AF', marginBottom: 20 }}>Ready to start your learning and earning journey? Join thousands of learners already transforming their lives.</p>
            <button className="btn-hero">Get Started Now</button>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="testimonials" style={{ background: '#F3F4F6', padding: '72px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, color: '#111827', marginBottom: 12, letterSpacing: '-0.5px' }}>Success Stories</h2>
            <p style={{ fontSize: 16, color: '#6B7280', margin: 0 }}>Hear from learners and employers who&apos;ve transformed their lives with Learnault</p>
          </div>
          <div className="testimonials-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
            {TESTIMONIALS.map((t, i) => <TCard key={t.name} {...t} delay={i * 0.1} />)}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '72px 24px' }}>
        <div className="cta-box" style={{ maxWidth: 860, margin: '0 auto', background: 'linear-gradient(135deg, #0070B6 0%, #FC641E 100%)', borderRadius: 24, padding: '56px 48px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800, color: '#fff', marginBottom: 12, letterSpacing: '-0.5px' }}>Ready to Transform Your Future?</h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.85)', marginBottom: 36, lineHeight: 1.6 }}>Join thousands of learners earning real rewards while building skills that employers value.</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 40 }}>
            <button className="btn-cta-primary">Start Your Journey Now <ArrowRight size={16} /></button>
            <button className="btn-cta-outline">Explore Courses</button>
          </div>
          <div className="cta-stats" style={{ borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: 32, display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
            {[
              { to: 50, prefix: '', suffix: 'K+', label: 'Active Learners' },
              { to: 45, prefix: '', suffix: '+', label: 'Countries' },
              { to: 2, prefix: '$', suffix: 'M+', label: 'Paid Out' },
              { to: 4, prefix: '', suffix: '.8★', label: 'Avg Rating' },
            ].map(({ to, prefix, suffix, label }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <p style={{ fontSize: 22, fontWeight: 800, color: '#fff', margin: 0 }}><Counter to={to} prefix={prefix} suffix={suffix} /></p>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 4, marginBottom: 0 }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ──
      <footer style={{ borderTop: '1px solid #E5E7EB', background: '#fff', padding: '24px' }}>
        <div className="footer-inner" style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontSize: 18, fontWeight: 800, color: '#0070B6' }}>Learnault</span>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {['About', 'Careers', 'Blog', 'Privacy', 'Terms'].map(l => (
              <a key={l} href="#" className="footer-link">{l}</a>
            ))}
          </div>
          <span style={{ fontSize: 12, color: '#D1D5DB' }}>© 2025 Learnault Inc.</span>
        </div>
      </footer> */}
    </>
  )
}