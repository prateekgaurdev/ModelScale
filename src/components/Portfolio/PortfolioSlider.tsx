import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

// Register plugins at module level — safe to call multiple times
gsap.registerPlugin(Draggable, InertiaPlugin);

const cases = [
  { id:"americana", name:"Americana Group", tag:"QSR · Supply Chain AI", logo:"/assets/images/americana-group-card-logo.webp", img:"/assets/images/americana-group-card-new-image.webp", headline:"Predictive Logistics Core for the World's Largest QSR Network", body:"AI-driven automated dispatch engine handling millions of daily orders across 1,800+ restaurants — turning manual coordination into autonomous, real-time decision-making.", metrics:[{v:"100%",l:"Dispatch Automation"},{v:"4×",l:"Operational Uplift"},{v:"38%",l:"Fleet Latency Reduction"}], stack:["Python","Kafka","React Native","AWS","Kubernetes"] },
  { id:"flynas", name:"Flynas Airlines", tag:"Aviation · AI Passenger Experience", logo:"/assets/images/flynas-card-logo.svg", img:"/assets/images/flynas-card-image-new.webp", headline:"AI-Native Digital Passenger Journey & Booking Engine", body:"Re-architected the entire airline booking, loyalty, and check-in experience with real-time dynamic pricing, baggage tracking, and instant itinerary self-service.", metrics:[{v:"+65%",l:"Direct Booking Revenue"},{v:"4.8★",l:"App Store Rating"},{v:"3×",l:"Faster Check-In"}], stack:["Swift","Kotlin","Node.js","Redis","Azure"] },
  { id:"kfc", name:"KFC", tag:"Quick-Service · Omnichannel Commerce", logo:"/assets/images/kfc-card-logo.svg", img:"/assets/images/kfc-card-new-image.webp", headline:"Unified Omnichannel Commerce & Last-Mile Delivery", body:"Seamless ordering across app, web, kiosk, and POS — synchronised in real-time with kitchen display, loyalty, and delivery APIs at global scale.", metrics:[{v:"20M+",l:"Monthly Active Users"},{v:"99.97%",l:"Uptime SLA"},{v:"2.1×",l:"Revenue per Order"}], stack:["React","Node.js","PostgreSQL","AWS ECS","Stripe"] },
  { id:"myexec", name:"MyExec GenAI", tag:"Agentic AI · Executive Intelligence", logo:"/assets/images/myexec-card-logo.svg", img:"/assets/images/myexec-card-new-image.webp", headline:"Autonomous Multi-Agent Business Strategy Consultant", body:"Agentic RAG system that ingests unstructured financial and market data to generate verifiable, citation-grounded executive recommendations at sub-3s latency.", metrics:[{v:"<2.5s",l:"Full Reasoning Cycle"},{v:"99.4%",l:"Source Attribution"},{v:"10×",l:"Decision Throughput"}], stack:["LangChain","Llama 3","FastAPI","pgvector","Docker"] },
  { id:"adidas", name:"Adidas", tag:"eCommerce · Mobile Commerce", logo:"/assets/images/adidas-new-logo.svg", img:"/assets/images/adidas-card-new-image.webp", headline:"Hyper-Personalised Mobile Commerce Platform", body:"Personalised shopping experience with real-time drop notifications, 3D product previews, and loyalty integration — turning browsing into purchases.", metrics:[{v:"+42%",l:"Mobile Conversion"},{v:"1.2M+",l:"Daily Active Users"},{v:"+18%",l:"Avg. Order Value"}], stack:["React Native","Next.js","Algolia","Stripe","GCP"] },
  { id:"ikea", name:"IKEA", tag:"Retail · Spatial AR", logo:"/assets/images/home-global-leader-ikea-logo.svg", img:"/assets/images/ikea-card-new-image.webp", headline:"AR-Powered In-Store Navigation & Product Discovery", body:"Augmented reality spatial layer enabling customers to visualise furniture placement in their homes and navigate warehouse-scale stores in one flow.", metrics:[{v:"3.4×",l:"Time in App"},{v:"28%",l:"Return Rate Reduction"},{v:"4.7★",l:"Play Store"}], stack:["ARKit","ARCore","Unity","Swift","Kotlin"] },
  { id:"drreddy", name:"Dr. Reddy's", tag:"HealthTech · Medical Education", logo:"/assets/images/dr-reddy-home-logo.svg", img:"/assets/images/dr-reddy-card-new-image.webp", headline:"Inclusive High-Scale Healthcare Education Platform", body:"HIPAA-aligned interactive mobile training portal for practitioners in emerging markets — delivering clinical education at scale with offline-first architecture.", metrics:[{v:"5K+",l:"Practitioners Onboarded"},{v:"88%",l:"Course Completion"},{v:"#1",l:"Inclusivity Ranking"}], stack:["React Native","Go","PostgreSQL","GCP","WebRTC"] },
  { id:"honda", name:"Honda", tag:"Automotive · Connected Vehicles", logo:"/assets/images/honda-home-logo.svg", img:"/assets/images/honda-card-new-image.webp", headline:"Connected Vehicle Telematics & Fleet Intelligence", body:"Real-time telematics platform aggregating sensor data from thousands of vehicles — enabling predictive maintenance alerts and automated fleet management.", metrics:[{v:"40%",l:"Maintenance Cost Drop"},{v:"2M+",l:"Daily Telemetry Points"},{v:"99.9%",l:"Pipeline Uptime"}], stack:["AWS IoT Core","TimescaleDB","React","GraphQL","Terraform"] },
  { id:"empirehotels", name:"Empire Hotels", tag:"Hospitality · Guest Experience AI", logo:"/assets/images/empire-hotels-home-logo.svg", img:"/assets/images/empire-hotels-card-new-image.webp", headline:"AI-Powered Concierge & Guest Journey Platform", body:"Rebuilt the entire guest experience — AI concierge, contactless check-in, dynamic room upgrades, and F&B ordering — unified in one platform.", metrics:[{v:"+55%",l:"Guest NPS"},{v:"30%",l:"Upsell Revenue"},{v:"<60s",l:"Digital Check-in"}], stack:["React Native","Python","Redis","Snowflake","Azure"] },
];

export default function PortfolioSlider() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const dragElRef    = useRef<HTMLDivElement>(null);
  const itemRefs     = useRef<(HTMLDivElement | null)[]>([]);
  const stateRef     = useRef<{ itemStep: number; updateFn: () => void } | null>(null);
  const activeIdxRef = useRef(0);

  useEffect(() => { activeIdxRef.current = activeIdx; }, [activeIdx]);

  useEffect(() => {
    const items = itemRefs.current.filter(Boolean) as HTMLDivElement[];
    const dragEl = dragElRef.current;
    if (!items.length || !dragEl) return;

    const ROTATION = 20;
    const firstRect = items[0].getBoundingClientRect();
    const itemStep  = firstRect.width;

    gsap.set(items,  { xPercent: -50 });
    gsap.set(dragEl, { x: 0 });

    const rotateSetters = items.map((item) =>
      gsap.quickSetter(item, "rotate", "deg")
    );
    const wrapIdx = (i: number, len: number) => ((i % len) + len) % len;
    const calcOffset = (t: number, c: number, total: number) =>
      t - (c - Math.round((c - t) / total) * total);

    const getCI = () => -gsap.getProperty(dragEl, "x") / itemStep;

    const update = () => {
      const ci = getCI();
      for (let i = 0; i < items.length; i++) {
        rotateSetters[i](calcOffset(i, ci, items.length) * ROTATION);
      }
      const wrapped = wrapIdx(Math.round(ci), items.length);
      if (wrapped !== activeIdxRef.current) {
        activeIdxRef.current = wrapped;
        setActiveIdx(wrapped);
      }
    };

    Draggable.create(dragEl, {
      type:             "x",
      inertia:          true,
      throwResistance:  2000,
      dragResistance:   0.025,
      onDrag:           update,
      onThrowUpdate:    update,
      onThrowComplete:  update,
      onPress:  () => setIsDragging(true),
      onRelease:() => setTimeout(() => setIsDragging(false), 400),
      snap:     { x: (val: number) => gsap.utils.snap(itemStep)(val) },
      snapDuration: 1.5,
    });

    stateRef.current = { itemStep, updateFn: update };
    update();

    return () => {
      Draggable.get(dragEl)?.kill();
    };
  }, []);

  const goTo = (targetIdx: number) => {
    const state = stateRef.current;
    const dragEl = dragElRef.current;
    if (!state || !dragEl) { setActiveIdx(targetIdx); return; }

    const ci     = -gsap.getProperty(dragEl, "x") / state.itemStep;
    const total  = cases.length;
    const offset = targetIdx - (ci - Math.round((ci - targetIdx) / total) * total);

    gsap.to(dragEl, {
      x: (gsap.getProperty(dragEl, "x") as number) - offset * state.itemStep,
      duration: 1.2,
      ease: "expo.out",
      onUpdate:   state.updateFn,
      onComplete: state.updateFn,
    });
  };

  const prev = () => goTo(((activeIdx - 1) + cases.length) % cases.length);
  const next = () => goTo((activeIdx + 1) % cases.length);
  const cur  = cases[activeIdx];

  return (
    <section id="case-studies" className="portfolio-section">

      {/* DRAG mouse follower */}
      <div className="portfolio-follower" aria-hidden="true">DRAG</div>

      <div className="container-xl">
        {/* Header */}
        <div className="portfolio-header">
          <div>
            <p className="eyebrow reveal mb-3" style={{color:"#1163fb"}}>Innovation Engineered</p>
            <h2 className="reveal delay-1 text-headline line-anim text-white">
              <span>Delivered in Production.</span>{" "}
              <span style={{background:"linear-gradient(135deg,#4d8aff,#fff)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>
                At Real-World Scale.
              </span>
            </h2>
          </div>
          <div className="portfolio-nav-arrows reveal delay-2">
            <button onClick={prev} aria-label="Previous" className="port-arrow"><ChevronLeft size={20}/></button>
            <button onClick={next} aria-label="Next"     className="port-arrow"><ChevronRight size={20}/></button>
          </div>
        </div>

        {/* Tab bar */}
        <div className="portfolio-tabs">
          {cases.map((c,i) => (
            <button key={c.id} onClick={() => goTo(i)}
              className={`port-tab ${i===activeIdx ? "port-tab--active" : ""}`}>
              {c.name}
            </button>
          ))}
        </div>

        {/* Progress bar */}
        <div className="port-progress-bar">
          <div className="port-progress-fill"
            style={{width:`${((activeIdx+1)/cases.length)*100}%`}}/>
        </div>

        {/* Active case study card — simple stable layout */}
        <div className="portfolio-card reveal delay-1">
          <div className="port-card-header">
            <div className="port-card-logo-wrap">
              <img src={cur.logo} alt={cur.name} className="port-card-logo"
                onError={(e)=>(e.currentTarget.style.display="none")}/>
            </div>
            <div>
              <div className="port-card-tag">{cur.tag}</div>
              <div className="port-card-name">{cur.name}</div>
            </div>
            <div className="port-card-counter">
              <span className="port-cnt-num">{String(activeIdx+1).padStart(2,"0")}</span>
              <span className="port-cnt-tot"> / {String(cases.length).padStart(2,"0")}</span>
            </div>
          </div>

          <div className="port-card-body-grid">
            {/* Left */}
            <div className="port-card-left">
              <h3 className="port-card-headline">{cur.headline}</h3>
              <p  className="port-card-body-txt">{cur.body}</p>
              <div className="port-card-metrics">
                {cur.metrics.map(m=>(
                  <div key={m.l} className="port-metric">
                    <div className="port-metric-val">{m.v}</div>
                    <div className="port-metric-label">{m.l}</div>
                  </div>
                ))}
              </div>
              <div className="port-stack">
                {cur.stack.map(t=><span key={t} className="port-chip">{t}</span>)}
              </div>
              <button
                className="swap-text-button port-cta-btn"
                onClick={()=>window.dispatchEvent(new CustomEvent("open-contact-modal",{detail:{source:`portfolio-${cur.id}`}}))}
              >
                <span className="text-original"><span>Get Full Case Study</span></span>
                <span className="text-hover"><span>Get Full Case Study</span></span>
                <div className="button__icon-wrapper">
                  <svg className="button__icon-svg" viewBox="0 0 14 15" fill="none" width="11">
                    <path d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z" fill="white"/>
                  </svg>
                  <svg className="button__icon-svg button__icon-svg--copy" viewBox="0 0 14 15" fill="none" width="11">
                    <path d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z" fill="white"/>
                  </svg>
                </div>
              </button>
            </div>

            {/* Right — image */}
            <div className="port-card-right">
              <div className="port-card-img-wrap">
                <img src={cur.img} alt={cur.name} className="port-card-img"
                  onError={(e)=>{(e.currentTarget as HTMLImageElement).src="/assets/images/appinventiv-digital-main.webp";}}/>
              </div>
            </div>
          </div>
        </div>

        {/* Hidden GSAP drag proxy */}
        <div ref={dragElRef} className="drag-proxy" aria-hidden="true"/>

        {/* Hidden items refs */}
        <div style={{display:"none"}}>
          {cases.map((_,i)=>(
            <div key={i} ref={(el)=>(itemRefs.current[i]=el)}/>
          ))}
        </div>
      </div>

      <style>{`
        .portfolio-section {
          position: relative;
          background: #080a0f;
          padding: clamp(48px,6vw,96px) 0;
          border-top: 1px solid rgba(255,255,255,0.06);
          overflow: hidden;
        }

        .drag-proxy {
          position: absolute;
          opacity: 0;
          pointer-events: none;
          width: 1px; height: 1px;
        }

        .portfolio-follower {
          position: absolute;
          top: 0; left: 0;
          pointer-events: none;
          z-index: 50;
          width: 80px; height: 80px;
          border-radius: 50%;
          background: #1163fb;
          color: #fff;
          font-size: 11px; font-weight: 800;
          letter-spacing: .08em; text-transform: uppercase;
          display: flex; align-items: center; justify-content: center;
          will-change: transform, opacity;
        }

        .portfolio-header {
          display: flex; align-items: flex-end;
          justify-content: space-between; gap: 1.5rem; margin-bottom: 2rem;
        }
        .portfolio-nav-arrows { display: flex; gap: 10px; flex-shrink: 0; }
        .port-arrow {
          width: 44px; height: 44px; border-radius: 50%;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: #9ca3af; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background .2s, color .2s;
        }
        .port-arrow:hover { background: #1163fb; color: #fff; border-color: #1163fb; }

        .portfolio-tabs {
          display: flex; gap: 8px; overflow-x: auto; padding-bottom: 8px;
          scrollbar-width: none;
          -webkit-mask-image: linear-gradient(to right,black 90%,transparent);
          mask-image: linear-gradient(to right,black 90%,transparent);
        }
        .portfolio-tabs::-webkit-scrollbar { display: none; }
        .port-tab {
          padding: 7px 18px; border-radius: 9999px;
          font-size: .75rem; font-weight: 600;
          white-space: nowrap; cursor: pointer;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.04); color: #6b7280;
          transition: all .22s ease;
        }
        .port-tab--active {
          background: #1163fb; border-color: #1163fb; color: #fff;
          box-shadow: 0 0 16px -4px rgba(17,99,251,0.6);
        }

        .port-progress-bar {
          height: 2px; background: rgba(255,255,255,0.06);
          border-radius: 9999px; overflow: hidden; margin: 12px 0 28px;
        }
        .port-progress-fill {
          height: 100%; background: #1163fb; border-radius: 9999px;
          transition: width .5s cubic-bezier(0.22,1,0.36,1);
          will-change: width;
        }

        /* Main card */
        .portfolio-card {
          background: #0d1017;
          border: 1px solid rgba(17,99,251,0.25);
          border-radius: 1.5rem;
          padding: clamp(1.5rem,3vw,2.5rem);
          box-shadow: 0 24px 80px rgba(0,0,0,0.5);
        }

        .port-card-header {
          display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem;
        }
        .port-card-logo-wrap {
          width: 52px; height: 52px; border-radius: 12px;
          background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.1);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; padding: 8px; overflow: hidden;
        }
        .port-card-logo { max-width: 36px; max-height: 36px; object-fit: contain; filter: brightness(1.2); }
        .port-card-tag  { font-size:.7rem; font-weight:700; color:#1163fb; text-transform:uppercase; letter-spacing:.08em; }
        .port-card-name { font-size:.9375rem; font-weight:700; color:#fff; margin-top:2px; }
        .port-card-counter { margin-left: auto; font-family: monospace; font-size: .8rem; }
        .port-cnt-num { color: #fff; font-weight: 700; }
        .port-cnt-tot { color: rgba(255,255,255,.25); }

        .port-card-body-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: start;
        }
        .port-card-left { display: flex; flex-direction: column; gap: 1.25rem; }
        .port-card-headline {
          font-size: clamp(1.25rem,2vw,1.875rem);
          font-weight: 700; line-height: 1.25; letter-spacing: -.015em;
          color: #fff; margin: 0;
        }
        .port-card-body-txt { font-size:.9rem; line-height:1.7; color:#6b7280; margin:0; }

        .port-card-metrics {
          display: grid; grid-template-columns: repeat(3,1fr); gap: 1rem;
          padding: 1.25rem; background: rgba(0,0,0,0.4);
          border: 1px solid rgba(255,255,255,0.07); border-radius: 1rem;
        }
        .port-metric-val   { font-size:clamp(1.25rem,2.5vw,1.75rem); font-weight:900; color:#fff; line-height:1; }
        .port-metric-label { font-size:.75rem; color:#6b7280; margin-top:4px; }

        .port-stack { display:flex; flex-wrap:wrap; gap:6px; }
        .port-chip  { padding:3px 10px; border-radius:6px; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); font-size:.6875rem; font-family:monospace; color:#9ca3af; }

        .port-cta-btn {
          background: #1163fb; color: #fff; padding: 12px 22px;
          font-size: .875rem; border-radius: 9999px; align-self: flex-start;
          box-shadow: 0 0 20px -4px rgba(17,99,251,0.5);
        }
        .port-cta-btn:hover { background: #0c4fcb; }

        .port-card-right {}
        .port-card-img-wrap {
          border-radius: 1rem; overflow: hidden;
          aspect-ratio: 4/3; background: #000;
        }
        .port-card-img {
          width: 100%; height: 100%; object-fit: cover; object-position: top;
          transition: transform .6s cubic-bezier(0.22,1,0.36,1);
          display: block;
        }
        .port-card-img-wrap:hover .port-card-img { transform: scale(1.04); }

        @media (max-width: 900px) {
          .port-card-body-grid { grid-template-columns: 1fr; }
          .port-card-metrics   { grid-template-columns: repeat(2,1fr); }
          .portfolio-header    { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </section>
  );
}
