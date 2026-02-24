import { useEffect, useRef, useState } from "react";

/* ─── useInView ──────────────────────────────────────────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ─── Counter ────────────────────────────────────────────────────────────── */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [n, setN] = useState(0);
  const { ref, inView } = useInView(0.5);
  useEffect(() => {
    if (!inView) return;
    let c = 0;
    const step = Math.max(1, Math.ceil(to / 60));
    const t = setInterval(() => {
      c += step;
      if (c >= to) { setN(to); clearInterval(t); } else setN(c);
    }, 16);
    return () => clearInterval(t);
  }, [inView, to]);
  return <span ref={ref}>{n.toLocaleString()}{suffix}</span>;
}

/* ─── Data ───────────────────────────────────────────────────────────────── */
const FEATURES = [
  { icon: "✦", title: "AI-Powered Paths", desc: "Adaptive curricula that evolve with your pace, strengths, and goals — no cookie-cutter courses." },
  { icon: "◈", title: "Bite-Sized Lessons", desc: "5-minute micro-lessons designed for busy lives. Learn on the commute, in the queue, anywhere." },
  { icon: "❋", title: "Live Mentorship", desc: "Book real-time sessions with domain experts who've actually done the work you want to do." },
  { icon: "⟡", title: "Peer Cohorts", desc: "Study alongside ambitious learners worldwide. Accountability groups that keep you on track." },
  { icon: "◉", title: "Skill Certificates", desc: "Earn verifiable credentials recognised by 500+ hiring partners across 40 countries." },
  { icon: "⌘", title: "Offline Access", desc: "Download any course. Learn on a plane, in a cabin, wherever inspiration strikes." },
];

const STEPS = [
  { num: "01", title: "Tell us your goal", desc: "Answer a 2-minute quiz about your current skills, learning style, and ambitions." },
  { num: "02", title: "Get your roadmap", desc: "Our AI crafts a personalised week-by-week learning plan built around your schedule." },
  { num: "03", title: "Learn & practice", desc: "Complete lessons, quizzes, and real-world projects that cement genuine understanding." },
  { num: "04", title: "Land the outcome", desc: "Apply your certificate, showcase your portfolio, and step into your next chapter." },
];

const TESTIMONIALS = [
  { name: "Amara Osei", role: "UX Designer → Product Lead", avatar: "AO", quote: "Learnault's roadmap felt like having a mentor in my pocket. I went from confused designer to confident PM in eight months.", stars: 5 },
  { name: "Tariq Hossain", role: "Barista → Frontend Dev", avatar: "TH", quote: "I had zero coding experience. The bite-sized lessons kept me from burning out and I landed my first dev job within a year.", stars: 5 },
  { name: "Sofia Reinholt", role: "Teacher → Data Analyst", avatar: "SR", quote: "The peer cohort made all the difference. We kept each other accountable every single week. I couldn't have done it alone.", stars: 5 },
];

/* ─── Sub-components ─────────────────────────────────────────────────────── */
function FeatureCard({ icon, title, desc, delay }: { icon: string; title: string; desc: string; delay: number }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className="feature-card" style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(24px)", transition: `opacity .6s ${delay}s,transform .6s ${delay}s` }}>
      <span className="fi">{icon}</span>
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}

function Step({ num, title, desc, delay }: { num: string; title: string; desc: string; delay: number }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className="step" style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateX(30px)", transition: `opacity .6s ${delay}s,transform .6s ${delay}s` }}>
      <div className="sn">{num}</div>
      <div><h4>{title}</h4><p>{desc}</p></div>
    </div>
  );
}

function TCard({ name, role, avatar, quote, stars, delay }: { name: string; role: string; avatar: string; quote: string; stars: number; delay: number }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className="t-card" style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(24px)", transition: `opacity .6s ${delay}s,transform .6s ${delay}s` }}>
      <div className="ts">{"★".repeat(stars)}</div>
      <p className="tq">&ldquo;{quote}&rdquo;</p>
      <div className="ta">
        <div className="tav">{avatar}</div>
        <div><div className="tn">{name}</div><div className="tr">{role}</div></div>
      </div>
    </div>
  );
}

function Mockup() {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(40px)", transition: "opacity .8s .2s,transform .8s .2s" }}>
      <div className="mockup">
        <div className="mt">
          {["#ff5f57","#febc2e","#28c840"].map(c => <span key={c} className="md" style={{ background: c }} />)}
          <div className="mb"><div className="mbf" /></div>
        </div>
        {[{ e:"📐",a:true },{ e:"💻",a:false },{ e:"🎯",a:false }].map(({ e, a }, i) => (
          <div key={i} className="ml" style={{ opacity: a ? 1 : 0.5 }}>
            <div className="mli">{e}</div>
            <div><div className="mlt" style={{ width: a ? 140 : i===1 ? 110 : 90 }} /><div className="mlb" /></div>
            {a && <span className="mlv">● Live</span>}
          </div>
        ))}
        <div className="mp">
          <div className="mpl"><span>Weekly progress</span><span>64%</span></div>
          <div className="mpt"><div className="mpf" /></div>
        </div>
        <div className="mbr">
          {["CSS Grid","React Hooks","TypeScript","+12 more"].map(b => <span key={b} className="mbadge">{b}</span>)}
        </div>
      </div>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default function LandingPage() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    const id = "ln-fonts";
    if (document.getElementById(id)) return;
    const l = document.createElement("link");
    l.id = id; l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap";
    document.head.appendChild(l);
  }, []);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <>
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        :root{
          --cr:#F7F4FC;
          --cw:#FDFBFF;
          --ca:#C9A84C;
          --cal:#E2C06B;
          --cap:#FBF5E6;
          --ct:#4B0082;
          --cru:#2D0055;
          --cd:#0E0020;
          --cm:#3D2060;
          --cs:#8A6FAD;
          --bor:rgba(75,0,130,.15);
          --nh:72px
        }
        html{scroll-behavior:smooth}
        body{font-family:'DM Sans',sans-serif;background:var(--cr);color:var(--cd);overflow-x:hidden}
        body::before{content:'';position:fixed;inset:0;z-index:0;pointer-events:none;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
          background-size:200px;opacity:.6}

        .nav{position:fixed;top:0;left:0;right:0;z-index:100;height:var(--nh);display:flex;align-items:center;justify-content:space-between;padding:0 6vw;transition:background .3s,box-shadow .3s}
        .nav.sc{background:rgba(247,244,252,.94);backdrop-filter:blur(14px);box-shadow:0 1px 0 var(--bor)}
        .logo{font-family:'Playfair Display',serif;font-size:1.5rem;font-weight:900;color:var(--ct);letter-spacing:-.5px;cursor:pointer;display:flex;align-items:center;gap:8px;background:none;border:none}
        .ld{width:8px;height:8px;border-radius:50%;background:var(--ca);display:inline-block}
        .nl{display:flex;align-items:center;gap:2rem;list-style:none}
        .nl button{color:var(--cm);background:none;border:none;font-size:.9rem;font-weight:500;cursor:pointer;transition:color .2s;font-family:'DM Sans',sans-serif}
        .nl button:hover{color:var(--ct)}
        .ncta{background:var(--ct);color:#fff;border:none;border-radius:40px;padding:.55rem 1.4rem;font-size:.88rem;font-weight:600;cursor:pointer;transition:background .2s,transform .15s;font-family:'DM Sans',sans-serif;text-decoration:none;display:inline-block}
        .ncta:hover{background:var(--cru);transform:translateY(-1px)}
        .hbg{display:none;flex-direction:column;gap:5px;cursor:pointer;padding:4px;background:none;border:none}
        .hbg span{display:block;width:24px;height:2px;background:var(--cd);border-radius:2px}

        .mmenu{position:fixed;inset:0;z-index:99;background:var(--cr);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2.5rem;transform:translateX(100%);transition:transform .35s ease}
        .mmenu.open{transform:none}
        .mclose{position:absolute;top:24px;right:6vw;background:none;border:none;font-size:1.5rem;cursor:pointer;color:var(--cd)}
        .mmenu button{font-family:'Playfair Display',serif;font-size:2rem;font-weight:700;color:var(--cd);background:none;border:none;cursor:pointer;transition:color .2s}
        .mmenu button:hover{color:var(--ct)}
        .mmenu a{font-family:'Playfair Display',serif;font-size:2rem;font-weight:700;color:var(--ct);text-decoration:none}

        .hero{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:calc(var(--nh) + 4rem) 6vw 6rem;text-align:center;position:relative;overflow:hidden}
        .blob{position:absolute;border-radius:50%;filter:blur(90px);pointer-events:none}
        .b1{width:560px;height:560px;background:radial-gradient(circle,rgba(75,0,130,.18),transparent 70%);top:-120px;right:-100px;animation:drift 9s ease-in-out infinite alternate}
        .b2{width:420px;height:420px;background:radial-gradient(circle,rgba(201,168,76,.22),transparent 70%);bottom:-80px;left:-80px;animation:drift 9s ease-in-out infinite alternate;animation-delay:-4s}
        .b3{width:320px;height:320px;background:radial-gradient(circle,rgba(138,47,226,.15),transparent 70%);top:50%;left:50%;transform:translate(-50%,-50%);animation:drift 11s ease-in-out infinite alternate;animation-delay:-6s}
        @keyframes drift{from{transform:translate(0,0) scale(1)}to{transform:translate(30px,20px) scale(1.07)}}

        .badge{display:inline-flex;align-items:center;gap:6px;background:var(--cap);border:1px solid rgba(201,168,76,.45);border-radius:40px;padding:.35rem 1rem;font-size:.78rem;font-weight:600;color:var(--ct);letter-spacing:.05em;text-transform:uppercase;margin-bottom:2rem;animation:fadeUp .8s ease both;position:relative;z-index:1}
        .bdot{width:6px;height:6px;border-radius:50%;background:var(--ca);animation:pulse 2s infinite}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}

        .hero h1{font-family:'Playfair Display',serif;font-size:clamp(2.8rem,7vw,6rem);font-weight:900;line-height:1.05;color:var(--cd);letter-spacing:-2px;max-width:900px;animation:fadeUp .9s ease .1s both;position:relative;z-index:1}
        .hero h1 em{font-style:italic;color:var(--ct)}
        .hsub{font-size:clamp(1rem,2vw,1.2rem);color:var(--cm);line-height:1.7;max-width:560px;margin:1.8rem auto 2.8rem;font-weight:300;animation:fadeUp .9s ease .2s both;position:relative;z-index:1}
        .hbtns{display:flex;align-items:center;gap:1rem;flex-wrap:wrap;justify-content:center;animation:fadeUp .9s ease .3s both;position:relative;z-index:1}

        .bp{background:var(--ct);color:#fff;border:none;border-radius:50px;padding:.9rem 2.2rem;font-size:1rem;font-weight:600;cursor:pointer;transition:all .2s;font-family:'DM Sans',sans-serif;box-shadow:0 8px 30px rgba(75,0,130,.35);text-decoration:none;display:inline-block}
        .bp:hover{background:var(--cru);transform:translateY(-2px);box-shadow:0 12px 40px rgba(75,0,130,.45)}
        .bs{background:transparent;color:var(--cd);border:1.5px solid var(--bor);border-radius:50px;padding:.9rem 2.2rem;font-size:1rem;font-weight:600;cursor:pointer;transition:all .2s;font-family:'DM Sans',sans-serif;display:inline-flex;align-items:center;gap:8px}
        .bs:hover{border-color:var(--ct);color:var(--ct)}

        .hstats{display:flex;gap:3rem;justify-content:center;flex-wrap:wrap;margin-top:4rem;animation:fadeUp .9s ease .4s both;position:relative;z-index:1}
        .stat{text-align:center}
        .sn2{font-family:'Playfair Display',serif;font-size:2rem;font-weight:900;color:var(--ct);display:block}
        .sl{font-size:.78rem;color:var(--cs);letter-spacing:.08em;text-transform:uppercase;margin-top:2px}
        @keyframes fadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:none}}

        section{position:relative;z-index:1}
        .stag{display:inline-block;font-size:.72rem;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:var(--ca);margin-bottom:.8rem}
        h2.stitle{font-family:'Playfair Display',serif;font-size:clamp(2rem,4.5vw,3.2rem);font-weight:900;line-height:1.1;letter-spacing:-1px;color:var(--cd)}
        h2.stitle em{font-style:italic;color:var(--ct)}
        .ssub{font-size:1.05rem;color:var(--cm);line-height:1.7;max-width:520px;margin-top:.8rem;font-weight:300}

        .fsec{padding:7rem 6vw}
        .fhdr{text-align:center;margin-bottom:4rem}
        .fhdr .ssub{margin-inline:auto}
        .fgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5px;border:1.5px solid var(--bor);border-radius:20px;overflow:hidden;max-width:1100px;margin:0 auto}
        .feature-card{background:var(--cw);padding:2.5rem 2rem;transition:background .3s}
        .feature-card:hover{background:var(--cap)}
        .fi{font-size:1.6rem;color:var(--ca);margin-bottom:1.2rem;display:block}
        .feature-card h3{font-family:'Playfair Display',serif;font-size:1.2rem;font-weight:700;margin-bottom:.6rem;color:var(--cd)}
        .feature-card p{font-size:.9rem;color:var(--cm);line-height:1.65;font-weight:300}

        .hiw{padding:7rem 6vw;background:var(--cd);overflow:hidden}
        .hiwi{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:6rem;align-items:start}
        .hiwh .stag{color:var(--ca)}
        .hiwh h2.stitle{color:#F0EAF8}
        .hiwh h2.stitle em{color:var(--cal)}
        .hiwh .ssub{color:rgba(224,210,245,.65)}
        .steps{display:flex;flex-direction:column;gap:2px;margin-top:2rem}
        .step{display:grid;grid-template-columns:64px 1fr;gap:1.2rem;align-items:start;padding:1.5rem;border-radius:12px;transition:background .3s}
        .step:hover{background:rgba(255,255,255,.06)}
        .sn{font-family:'Playfair Display',serif;font-size:2.2rem;font-weight:900;color:var(--ca);line-height:1;padding-top:2px}
        .step h4{font-size:1rem;font-weight:600;color:#F0EAF8;margin-bottom:.35rem}
        .step p{font-size:.88rem;color:rgba(224,210,245,.55);line-height:1.6;font-weight:300}

        .mockup{background:#1A0035;border:1px solid rgba(201,168,76,.3);border-radius:20px;padding:2rem}
        .mt{display:flex;align-items:center;gap:10px;margin-bottom:1.5rem}
        .md{width:8px;height:8px;border-radius:50%}
        .mb{flex:1;height:6px;background:rgba(255,255,255,.08);border-radius:4px}
        .mbf{height:100%;border-radius:4px;background:linear-gradient(90deg,var(--ca),var(--ct));animation:fill 3s ease-in-out infinite alternate}
        @keyframes fill{from{width:35%}to{width:78%}}
        .ml{background:rgba(255,255,255,.05);border-radius:10px;padding:1rem 1.2rem;margin-bottom:.8rem;display:flex;gap:1rem;align-items:center}
        .mli{width:36px;height:36px;border-radius:8px;background:var(--ct);display:flex;align-items:center;justify-content:center;font-size:1rem;flex-shrink:0}
        .mlt{height:8px;background:rgba(255,255,255,.15);border-radius:4px;margin-bottom:6px}
        .mlb{height:6px;background:rgba(255,255,255,.08);border-radius:4px;width:80px}
        .mlv{margin-left:auto;font-size:.7rem;color:var(--cal);font-weight:600}
        .mp{margin-top:1.5rem}
        .mpl{display:flex;justify-content:space-between;font-size:.7rem;color:rgba(224,210,245,.4);margin-bottom:6px}
        .mpt{height:6px;background:rgba(255,255,255,.08);border-radius:4px;overflow:hidden}
        .mpf{height:100%;width:64%;background:linear-gradient(90deg,var(--ct),var(--cal));border-radius:4px}
        .mbr{display:flex;gap:.6rem;margin-top:1rem;flex-wrap:wrap}
        .mbadge{font-size:.68rem;padding:.3rem .7rem;border-radius:20px;background:rgba(201,168,76,.15);color:var(--cal);border:1px solid rgba(201,168,76,.35)}

        .tsec{padding:7rem 6vw}
        .thdr{text-align:center;margin-bottom:4rem}
        .thdr .ssub{margin-inline:auto}
        .tgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;max-width:1100px;margin:0 auto}
        .t-card{background:var(--cw);border:1px solid var(--bor);border-radius:20px;padding:2rem;display:flex;flex-direction:column;gap:1.2rem;transition:box-shadow .3s}
        .t-card:hover{box-shadow:0 20px 60px rgba(75,0,130,.14)}
        .ts{color:var(--ca);letter-spacing:2px;font-size:.85rem}
        .tq{font-size:.95rem;color:var(--cm);line-height:1.7;font-weight:300;font-style:italic}
        .ta{display:flex;align-items:center;gap:.8rem;margin-top:auto}
        .tav{width:42px;height:42px;border-radius:50%;background:linear-gradient(135deg,var(--ct),var(--ca));display:flex;align-items:center;justify-content:center;font-size:.75rem;font-weight:700;color:#fff;flex-shrink:0}
        .tn{font-size:.88rem;font-weight:600;color:var(--cd)}
        .tr{font-size:.78rem;color:var(--cs)}

        .cta{margin:0 6vw 7rem;background:linear-gradient(135deg,#4B0082,#2D0055 55%,#0E0020);border-radius:32px;padding:6rem 8vw;text-align:center;overflow:hidden;position:relative}
        .cta::before{content:'';position:absolute;inset:0;background:url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")}
        .cta::after{content:'';position:absolute;top:-60px;right:-60px;width:300px;height:300px;border-radius:50%;background:radial-gradient(circle,rgba(201,168,76,.2),transparent 70%);pointer-events:none}
        .cta h2{font-family:'Playfair Display',serif;font-size:clamp(2rem,5vw,3.5rem);font-weight:900;color:#fff;line-height:1.1;letter-spacing:-1.5px;margin-bottom:1rem;position:relative}
        .cta>p{font-size:1.1rem;color:rgba(255,255,255,.72);margin-bottom:2.5rem;font-weight:300;position:relative}
        .cbtns{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;position:relative}
        .cbp{background:var(--ca);color:#0E0020;border:none;border-radius:50px;padding:.95rem 2.4rem;font-size:1rem;font-weight:700;cursor:pointer;transition:all .2s;font-family:'DM Sans',sans-serif;text-decoration:none;display:inline-block}
        .cbp:hover{background:var(--cal);transform:translateY(-2px);box-shadow:0 12px 40px rgba(201,168,76,.4)}
        .cbs{background:transparent;color:#fff;border:1.5px solid rgba(255,255,255,.35);border-radius:50px;padding:.95rem 2.4rem;font-size:1rem;font-weight:600;cursor:pointer;transition:all .2s;font-family:'DM Sans',sans-serif;text-decoration:none;display:inline-block}
        .cbs:hover{border-color:rgba(255,255,255,.85)}

        .footer{border-top:1px solid var(--bor);padding:2.5rem 6vw;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1rem}
        .flogo{font-family:'Playfair Display',serif;font-size:1.2rem;font-weight:900;color:var(--ct)}
        .flinks{display:flex;gap:2rem;list-style:none}
        .flinks a{color:var(--cs);text-decoration:none;font-size:.85rem;transition:color .2s}
        .flinks a:hover{color:var(--ct)}
        .fcopy{font-size:.78rem;color:var(--cs)}

        @media(max-width:900px){
          .fgrid{grid-template-columns:repeat(2,1fr)}
          .tgrid{grid-template-columns:1fr;max-width:480px}
          .hiwi{grid-template-columns:1fr;gap:3rem}
          .nl,.ncta{display:none}
          .hbg{display:flex}
        }
        @media(max-width:540px){
          .fgrid{grid-template-columns:1fr}
          .hstats{gap:1.5rem}
          .cta{padding:4rem 6vw}
          .footer{flex-direction:column;text-align:center}
          .flinks{justify-content:center}
        }
      `}</style>

      <nav className={`nav${scrolled ? " sc" : ""}`}>
        <button className="logo" onClick={() => go("hero")}><span className="ld" /> Learnault</button>
        <ul className="nl">
          <li><button onClick={() => go("features")}>Features</button></li>
          <li><button onClick={() => go("hiw")}>How it works</button></li>
          <li><button onClick={() => go("testimonials")}>Stories</button></li>
        </ul>
        <a href="/signup" className="ncta">Start free →</a>
        <button className="hbg" onClick={() => setOpen(true)} aria-label="menu"><span /><span /><span /></button>
      </nav>

      <div className={`mmenu${open ? " open" : ""}`}>
        <button className="mclose" onClick={() => setOpen(false)}>✕</button>
        <button onClick={() => go("features")}>Features</button>
        <button onClick={() => go("hiw")}>How it works</button>
        <button onClick={() => go("testimonials")}>Stories</button>
        <a href="/signup">Start free →</a>
      </div>

      <section id="hero" className="hero">
        <div className="blob b1" /><div className="blob b2" /><div className="blob b3" />
        <span className="badge"><span className="bdot" /> New — AI-personalised roadmaps</span>
        <h1>Learn anything.<br /><em>Become</em> someone new.</h1>
        <p className="hsub">Learnault turns ambitious goals into structured, joyful learning journeys — powered by AI, guided by mentors, and fuelled by community.</p>
        <div className="hbtns">
          <a href="/signup" className="bp">Get started free</a>
          <button className="bs" onClick={() => go("hiw")}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none"/></svg>
            See how it works
          </button>
        </div>
        <div className="hstats">
          <div className="stat"><span className="sn2"><Counter to={240000} />+</span><span className="sl">Learners</span></div>
          <div className="stat"><span className="sn2"><Counter to={1200} />+</span><span className="sl">Courses</span></div>
          <div className="stat"><span className="sn2"><Counter to={94} />%</span><span className="sl">Goal completion</span></div>
          <div className="stat"><span className="sn2"><Counter to={500} />+</span><span className="sl">Hiring partners</span></div>
        </div>
      </section>

      <section id="features" className="fsec">
        <div className="fhdr">
          <span className="stag">Why Learnault</span>
          <h2 className="stitle">Everything you need<br />to <em>actually</em> grow</h2>
          <p className="ssub">Not just videos you forget. A complete ecosystem designed to turn knowledge into capability.</p>
        </div>
        <div className="fgrid">
          {FEATURES.map((f, i) => <FeatureCard key={f.title} icon={f.icon} title={f.title} desc={f.desc} delay={(i % 3) * 0.08} />)}
        </div>
      </section>

      <section id="hiw" className="hiw">
        <div className="hiwi">
          <div>
            <div className="hiwh">
              <span className="stag">Process</span>
              <h2 className="stitle">Four steps to your<br /><em>next chapter</em></h2>
              <p className="ssub">A proven framework that has helped hundreds of thousands of learners unlock career breakthroughs.</p>
            </div>
            <div className="steps">
              {STEPS.map((s, i) => <Step key={s.num} num={s.num} title={s.title} desc={s.desc} delay={i * 0.1} />)}
            </div>
          </div>
          <Mockup />
        </div>
      </section>

      <section id="testimonials" className="tsec">
        <div className="thdr">
          <span className="stag">Success stories</span>
          <h2 className="stitle">Real people, <em>real</em> transformations</h2>
          <p className="ssub">Don't take our word for it — hear from learners who changed their lives.</p>
        </div>
        <div className="tgrid">
          {TESTIMONIALS.map((t, i) => <TCard key={t.name} name={t.name} role={t.role} avatar={t.avatar} quote={t.quote} stars={t.stars} delay={i * 0.1} />)}
        </div>
      </section>

      <section className="cta">
        <h2>Your future self<br />starts today.</h2>
        <p>Join 240,000+ learners already building the life they want.<br />First 14 days completely free — no credit card required.</p>
        <div className="cbtns">
          <a href="/signup" className="cbp">Create free account →</a>
          <a href="/demo" className="cbs">Watch a demo</a>
        </div>
      </section>

      <footer className="footer">
        <div className="flogo">Learnault</div>
        <ul className="flinks">
          <li><a href="#">About</a></li><li><a href="#">Careers</a></li>
          <li><a href="#">Blog</a></li><li><a href="#">Privacy</a></li><li><a href="#">Terms</a></li>
        </ul>
        <span className="fcopy">© 2024 Learnault Inc.</span>
      </footer>
    </>
  );
}