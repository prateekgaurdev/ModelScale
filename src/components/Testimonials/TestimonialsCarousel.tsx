import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Star, CircleCheck } from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";

// Position config — matches home-desktop.js initTestimonialVerticalSlider exactly
const D = 13.5, U = 6, P = 32, DUR = 0.725;
const POS: Record<string, { y: string; z: string; rx: number; opacity: number }> = {
  "-2": { y:`${D}em`,  z:`-${U}em`, rx:-P, opacity:0 },
  "-1": { y:`${D}em`,  z:`-${U}em`, rx:-P, opacity:0.35 },
   "0": { y:"0em",     z:"0em",     rx:0,  opacity:1 },
   "1": { y:`-${D}em`, z:`-${U}em`, rx:P,  opacity:0.35 },
   "2": { y:`-${D}em`, z:`-${U}em`, rx:P,  opacity:0 },
};

const reviews = [
  { name:"Cesar Melgoza",     role:"Founder & CEO, Geoscape Analytics",    avatar:"/assets/images/cesar-m-melgoza-client-new.webp",  stars:5, tag:"Enterprise AI & Analytics",  quote:"ModelScale rebuilt our geospatial big-data pipelines into a real-time predictive analytics powerhouse. Query latency dropped 85% and the system has handled every traffic spike without incident. They function as embedded senior engineering — not a vendor." },
  { name:"Bela Gupta D'Souza", role:"Founder & MD, EdFundo",               avatar:"/assets/images/bela-gupta-dsouza-client-new.webp", stars:5, tag:"FinTech & Mobile Banking",   quote:"From day one the team operated as our embedded CTO and product engineering unit. Banking-grade security, airtight compliance, a product my customers love — delivered on schedule and on budget. That combination is genuinely rare." },
  { name:"Ahmad Al-Rashid",   role:"VP Digital Operations, Americana Group", avatar:"/assets/images/client-cards-slider-bg.webp",       stars:5, tag:"QSR Logistics & Automation", quote:"Managing dispatch across 1,800+ locations demands zero-tolerance for downtime. The autonomous dispatch engine ModelScale delivered scaled through every surge without a single incident — it transformed a coordination nightmare into an intelligent self-running operation." },
];

const relPos = (item: number, cur: number, total: number) => {
  let r = (((item - cur) % total) + total) % total;
  if (r > Math.floor(total / 2)) r -= total;
  return Math.max(-2, Math.min(2, r));
};

export default function TestimonialsCarousel() {
  const [cur, setCur] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const curRef = useRef(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  useScrollReveal();

  // Set all items immediately (no animation)
  const setAll = (ci: number) => {
    refs.current.forEach((el, i) => {
      if (!el) return;
      const r = relPos(i, ci, reviews.length);
      const c = POS[String(r)];
      const vis = r >= -1 && r <= 1;
      el.style.visibility = vis ? "visible" : "hidden";
      el.style.display = (r === -2 || r === 2) ? "none" : "";
      el.style.zIndex = r === 0 ? "10" : Math.abs(r) === 1 ? "5" : "1";
      el.style.pointerEvents = "auto";
      gsap.set(el, {
        y: c.y,
        z: c.z,
        rotationX: c.rx,
        opacity: c.opacity,
        transformOrigin: "50% 50%",
        force3D: true,
      });
    });
  };

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      animateTo((curRef.current + 1) % reviews.length);
    }, 5000);
  };

  // Animated transition (supports rapid clicking without locking)
  const animateTo = (target: number) => {
    if (target === curRef.current) return;
    setCur(target);
    curRef.current = target;
    resetTimer();

    refs.current.forEach((el, i) => {
      if (!el) return;
      const toR = relPos(i, target, reviews.length);
      const toC = POS[String(toR)];

      // Hide items that stay far out
      if (toR === -2 || toR === 2) {
        gsap.killTweensOf(el);
        gsap.set(el, { visibility: "hidden", opacity: 0, display: "none" });
        return;
      }

      el.style.display = "";
      el.style.visibility = "visible";
      el.style.zIndex = toR === 0 ? "10" : Math.abs(toR) === 1 ? "5" : "1";
      el.style.pointerEvents = "auto";

      gsap.to(el, {
        y: toC.y,
        z: toC.z,
        rotationX: toC.rx,
        opacity: toC.opacity,
        duration: 0.42,
        ease: "power3.out",
        force3D: true,
        overwrite: "auto",
      });
    });
  };

  // Init on mount
  useEffect(() => {
    setAll(0);
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <section id="testimonials" className="tcarousel-section">
      <div className="container-xl">
        <div className="tcarousel-layout">

          {/* LEFT */}
          <div className="tcarousel-left reveal">
            <p className="eyebrow mb-4" style={{color:"#FF5B2E"}}>Client Success</p>
            <h2 className="reveal delay-1 text-headline line-anim tcarousel-h text-white">
              <span>Words From Our</span>{" "}
              <span style={{background:"linear-gradient(135deg,#FF5B2E,#fff)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>
                C-Suite Partners.
              </span>
            </h2>

            {/* Clutch box */}
            <div className="clutch-box reveal delay-2">
              <div className="clutch-row">
                {[...Array(5)].map((_,i)=><Star key={i} width={15} height={15} style={{fill:"#f59e0b",color:"#f59e0b"}}/>)}
                <span className="clutch-score">4.9 / 5.0</span>
              </div>
              <p className="clutch-label">on Clutch · 500+ verified executive reviews</p>
              <div className="clutch-ok">
                <CircleCheck width={13} height={13}/>
                <span>100% Verified Enterprise Engagements</span>
              </div>
            </div>

            {/* Bullet nav */}
            <nav className="vert-nav" aria-label="Testimonial navigation">
              {reviews.map((r,i) => (
                <button key={i} className={`vn-item ${i===cur?"vn-item--on":""}`}
                  onClick={() => animateTo(i)} aria-label={r.name}>
                  <span className="vn-line"/><span className="vn-name">{r.name}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* RIGHT — 3D slider */}
          <div className="tcarousel-right reveal delay-2">

            {/* Action button to change cards */}
            <button
              onClick={() => animateTo((curRef.current + 1) % reviews.length)}
              aria-label="Next testimonial"
              className="testimonial-nav-btn"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M12 5v14M5 12l7-7 7 7" stroke="white" strokeWidth="2.5"
                      strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <div className="tslider-wrap">
              <div style={{position:"relative",transformStyle:"preserve-3d",minHeight:"400px"}}>
                {reviews.map((r,i) => (
                  <div key={i}
                    ref={(el) => (refs.current[i] = el)}
                    onClick={() => {
                      if (i !== curRef.current) animateTo(i);
                    }}
                    style={{
                      position: i===0 ? "relative" : "absolute",
                      top:0, left:0, width:"100%",
                      transformStyle:"preserve-3d",
                      backfaceVisibility:"hidden",
                      cursor: i === cur ? "default" : "pointer",
                    }}
                  >
                    <div className="tcard">
                      {/* Big quote mark */}
                      <svg className="tcard-qm" width="60" height="46" viewBox="0 0 72 56"
                        fill="rgba(255,255,255,0.04)">
                        <path d="M0 56V35C0 21 4.3 10.3 12.9 3.2L16.8 0H33L19.4 14.8C14.1 20.3 11.4 28 11.4 38V56H0ZM38.6 56V35C38.6 21 42.9 10.3 51.5 3.2L55.4 0H71.6L58 14.8C52.7 20.3 50 28 50 38V56H38.6Z"/>
                      </svg>

                      <div className="tcard-meta">
                        <span className="tcard-tag">{r.tag}</span>
                        <div style={{display:"flex",gap:3}}>
                          {[...Array(r.stars)].map((_,j) =>
                            <Star key={j} width={13} height={13} style={{fill:"#f59e0b",color:"#f59e0b"}}/>)}
                        </div>
                      </div>

                      <p className="tcard-quote">"{r.quote}"</p>

                      <div className="tcard-author">
                        <div className="tcard-av">
                          <img src={r.avatar} alt={r.name}
                            onError={(e)=>(e.currentTarget.style.display="none")}/>
                        </div>
                        <div>
                          <div className="tcard-name">
                            {r.name}
                            <CircleCheck width={13} height={13} style={{color:"#FF5B2E"}}/>
                          </div>
                          <div className="tcard-role">{r.role}</div>
                        </div>
                        <div className="tcard-num">
                          <span style={{color:"#fff",fontWeight:700}}>{String(cur+1).padStart(2,"0")}</span>
                          <span style={{color:"rgba(255,255,255,.25)"}}> / {String(reviews.length).padStart(2,"0")}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .tcarousel-section {
          background: #000;
          padding: clamp(100px, 11vw, 180px) 0;
          border-top: 1px solid rgba(255,255,255,0.06);
          overflow: hidden;
        }
        .tcarousel-layout {
          display: grid;
          grid-template-columns: 1fr 1.7fr;
          gap: clamp(2.5rem,5vw,6rem);
          align-items: center;
        }
        .tcarousel-h { margin: 0 0 1.75rem; }

        .clutch-box {
          padding: 1.25rem 1.5rem;
          background: #0d1017; border: 1px solid #1e2330;
          border-radius: 14px; margin-bottom: 2rem;
        }
        .clutch-row   { display:flex; align-items:center; gap:4px; margin-bottom:.5rem; }
        .clutch-score { font-size:1.1rem; font-weight:800; color:#fff; margin-left:8px; }
        .clutch-label { font-size:.8125rem; color:rgba(255,255,255,.4); margin:0 0 .75rem; }
        .clutch-ok    { display:flex; align-items:center; gap:6px; font-size:.75rem; font-weight:600; color:#34d399; }

        .vert-nav { display:flex; flex-direction:column; gap:4px; }
        .vn-item {
          display:flex; align-items:center; gap:12px;
          background:none; border:none; cursor:pointer;
          padding:8px 0; text-align:left; opacity:.4;
          transition:opacity .2s ease;
        }
        .vn-item--on { opacity:1; }
        .vn-line {
          display:block; width:24px; height:2px; border-radius:9999px;
          background:rgba(255,255,255,.2); flex-shrink:0;
          transition:width .3s ease, background .3s ease;
        }
        .vn-item--on .vn-line { width:40px; background:#FF5B2E; }
        .vn-name { font-size:.8125rem; font-weight:600; color:rgba(255,255,255,.55); transition:color .2s; }
        .vn-item--on .vn-name { color:#fff; }

        /* Right: 3D perspective container */
        .tcarousel-right { position:relative; }
        .testimonial-nav-btn {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 40;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: #FF5B2E;
          border: none;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          pointer-events: auto;
          box-shadow: 0 6px 24px rgba(255, 91, 46, 0.45);
          transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1), background-color 0.2s ease, box-shadow 0.25s ease;
        }
        .testimonial-nav-btn:hover {
          background: #E44A20;
          transform: translate(-50%, -50%) scale(1.1);
          box-shadow: 0 8px 32px rgba(255, 91, 46, 0.65);
        }
        .testimonial-nav-btn:active {
          transform: translate(-50%, -50%) scale(0.93);
        }
        .testimonial-nav-btn svg {
          transition: transform 0.2s ease;
        }
        .testimonial-nav-btn:hover svg {
          transform: translateY(-2px);
        }

        .tslider-wrap {
          perspective: 1000px;
        }

        .tcard {
          position:relative; overflow:hidden;
          padding: clamp(2rem,3vw,3rem);
          background:#0d1017; border:1px solid #1e2330;
          border-radius:1.5rem;
          box-shadow:0 24px 80px rgba(0,0,0,0.5);
          min-height:380px;
          display:flex; flex-direction:column; gap:1.5rem;
        }
        .tcard-qm { position:absolute; top:1.75rem; right:2rem; pointer-events:none; }
        .tcard-meta  { display:flex; align-items:center; gap:12px; }
        .tcard-tag   { padding:4px 14px; border-radius:9999px; border:1px solid rgba(255,91,46,.3); background:rgba(255,91,46,.08); font-size:.7rem; font-weight:700; color:#FF5B2E; text-transform:uppercase; letter-spacing:.08em; }
        .tcard-quote { font-size:clamp(1rem,1rem+.15vw,1.25rem); font-weight:500; line-height:1.72; color:#fff; margin:0; flex:1; }
        .tcard-author { display:flex; align-items:center; gap:1rem; padding-top:1.5rem; border-top:1px solid rgba(255,255,255,.07); margin-top:auto; }
        .tcard-av { width:46px; height:46px; border-radius:50%; overflow:hidden; border:2px solid rgba(255,91,46,.3); flex-shrink:0; }
        .tcard-av img { width:100%; height:100%; object-fit:cover; }
        .tcard-name { font-size:.9375rem; font-weight:700; color:#fff; display:flex; align-items:center; gap:6px; }
        .tcard-role { font-size:.8125rem; color:rgba(255,255,255,.4); margin-top:2px; }
        .tcard-num  { margin-left:auto; font-family:monospace; font-size:.75rem; flex-shrink:0; }

        @media (max-width:900px) {
          .tcarousel-layout { grid-template-columns:1fr; }
        }
      `}</style>
    </section>
  );
}
