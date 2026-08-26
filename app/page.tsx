'use client';

import { useState } from 'react';

type Project = 'sentinel' | 'supply';

const work = {
  sentinel: {
    number: '01', title: 'SentinelOps', category: 'AI PRODUCT · ENTERPRISE RELIABILITY',
    headline: 'Predict the incident—before customers feel it.',
    intro: 'A predictive operations product that turns noisy infrastructure signals into an early, explainable decision for engineering teams.',
    accent: '#8c8cff', metric: '5.7 hrs', metricLabel: 'simulated prediction lead time',
    problem: 'Teams have plenty of alerts but little time to understand which signals matter, why a failure is forming, and what action is safest.',
    decisions: ['Narrowed the MVP to capacity failures instead of every anomaly','Placed evidence beside every prediction to build trust','Designed the handoff around incident decisions—not another alert feed'],
    users: 'SREs · Incident commanders · Engineering leaders', northStar: 'Mean time to detection', guardrail: 'False positives below 8%'
  },
  supply: {
    number: '02', title: 'SupplyShield', category: 'DATA PRODUCT · SQL · SUPPLY CHAIN',
    headline: 'Connect a supplier delay to the revenue it puts at risk.',
    intro: 'A decision-support product that joins supplier, inventory, factory, and customer-order data into one prioritized view.',
    accent: '#ff9f67', metric: '$12.4M', metricLabel: 'simulated revenue exposure found',
    problem: 'Operations teams cannot quickly translate fragmented supply-chain data into a financial decision they can defend to leadership.',
    decisions: ['Made revenue exposure the primary measure of urgency','Kept generated SQL visible so analysts can verify every result','Ranked exceptions by actionability rather than severity alone'],
    users: 'Supply planners · Procurement leads · Operations executives', northStar: 'Revenue exposure identified', guardrail: 'Analyst-verified results'
  }
};

function ProductPreview({project}:{project:Project}) {
  if(project==='sentinel') return <div className="product-preview violet"><div className="mock-top"><span>SentinelOps</span><i>Production · Live</i></div><div className="mock-alert"><span/><div><b>Database connections may exhaust</b><small>5h 42m · 91% confidence</small></div><em>Investigate →</em></div><div className="mock-grid"><div><small>SERVICES HEALTHY</small><b>47 <i>/ 48</i></b></div><div><small>LEAD TIME</small><b>5.7 <i>hrs</i></b></div><div><small>NOISE REDUCED</small><b>68<i>%</i></b></div></div><div className="mock-bottom"><div className="topology"><small>LIVE SERVICE MAP</small><span className="dot d1"/><span className="dot d2"/><span className="dot d3 danger"/><span className="dot d4"/><i className="wire w1"/><i className="wire w2"/></div><div className="evidence"><small>EVIDENCE</small><p><i/>Connection use rising</p><p><i/>Pool config changed</p><p><i/>Traffic pattern normal</p></div></div></div>;
  return <div className="product-preview orange"><div className="mock-top"><span>SupplyShield</span><i>Global risk view</i></div><div className="supply-title"><small>REVENUE AT RISK</small><b>$12.4M</b><span>Three disruptions affect Q3 commitments</span></div><div className="mock-grid"><div><small>POTENTIAL SAVINGS</small><b>$3.7<i>M</i></b></div><div><small>ORDERS PROTECTED</small><b>1,842</b></div><div><small>ON-TIME FORECAST</small><b>96.2<i>%</i></b></div></div><div className="supplier-list"><span><i>TW</i><b>Nova Semiconductor</b><em>$6.8M</em><small>CRITICAL</small></span><span><i>DE</i><b>Rhein Industrial</b><em>$3.9M</em><small>WATCH</small></span><span><i>MX</i><b>Monterrey Components</b><em>$1.7M</em><small>WATCH</small></span></div></div>;
}

function Walkthrough({project}:{project:Project}) {
  const sentinel = [
    {n:'01',who:'Platform signals',title:'Observe the system',copy:'Logs, traces, deployments, capacity, and service health arrive continuously.',icon:'⌁'},
    {n:'02',who:'Sentinel intelligence',title:'Connect the evidence',copy:'The product finds a developing pattern and links it to the most likely change.',icon:'◎'},
    {n:'03',who:'On-call engineer',title:'Understand the risk',copy:'The engineer sees time-to-impact, confidence, customer impact, and supporting evidence.',icon:'◴'},
    {n:'04',who:'Incident team',title:'Choose an action',copy:'The team scales capacity, rolls back, or monitors—and records the result for learning.',icon:'↗'}
  ];
  const supply = [
    {n:'01',who:'Enterprise data',title:'Unify the records',copy:'Supplier, component, inventory, factory, and customer-order records join in SQL.',icon:'▦'},
    {n:'02',who:'Risk engine',title:'Trace dependency',copy:'A disruption is connected through components and facilities to exposed commitments.',icon:'⌘'},
    {n:'03',who:'Supply planner',title:'Compare options',copy:'The planner sees revenue risk, days of supply, alternatives, and confidence.',icon:'⇄'},
    {n:'04',who:'Operations leader',title:'Protect the outcome',copy:'The team transfers stock, changes a source, or reprioritizes orders and tracks impact.',icon:'✓'}
  ];
  const steps=project==='sentinel'?sentinel:supply;
  return <section className="walkthrough"><div className="walk-intro"><p className="label">END-TO-END WALKTHROUGH</p><h2>{project==='sentinel'?'From a weak signal to a confident incident decision.':'From a supplier disruption to protected customer revenue.'}</h2><p>This is how the product fits into a real operating day. Each step has a clear actor, input, decision, and outcome.</p></div><div className="flow">{steps.map((s,i)=><div className="flow-step" key={s.n}><div className="flow-icon">{s.icon}</div><small>{s.n} · {s.who}</small><h3>{s.title}</h3><p>{s.copy}</p>{i<steps.length-1&&<span className="flow-arrow">→</span>}</div>)}</div><div className="scenario"><div className="scenario-person"><span>{project==='sentinel'?'IC':'SP'}</span><div><small>REAL-LIFE SCENARIO</small><b>{project==='sentinel'?'Jordan · Incident commander':'Amara · Senior supply planner'}</b></div></div><blockquote>{project==='sentinel'?'“Checkout traffic looks normal, but database connections are climbing. I need to know whether to act now—and why.”':'“A semiconductor supplier just reported a delay. I need to know which customer promises are exposed and what inventory I can move.”'}</blockquote><div className="scenario-outcome"><small>PRODUCT RESPONSE</small><b>{project==='sentinel'?'Predicts exhaustion in 5h 42m, links it to a pool-config deployment, and proposes a safe rollback.':'Finds $6.8M in exposed orders, identifies three dependent plants, and ranks two transfer options.'}</b></div></div><div className="system-map"><div className="map-title"><small>HOW THE SYSTEM WORKS</small><b>{project==='sentinel'?'Evidence in. Decision out. Learning returned.':'Operational data in. Financial priority out.'}</b></div><div className="map-lane"><span><small>INPUTS</small><b>{project==='sentinel'?'Metrics · logs · traces · deploys':'Suppliers · POs · inventory · orders'}</b></span><i>→</i><span className="map-core"><small>INTELLIGENCE LAYER</small><b>{project==='sentinel'?'Forecast · correlate · explain':'Join · trace · score · rank'}</b></span><i>→</i><span><small>DECISION</small><b>{project==='sentinel'?'Scale · rollback · monitor':'Transfer · source · prioritize'}</b></span><i>↺</i></div></div></section>;
}

function CaseStudy({project,onClose}:{project:Project,onClose:()=>void}) {
  const p=work[project];
  return <div className="case" style={{'--project':p.accent} as React.CSSProperties}><button className="close" onClick={onClose}>← Back to selected work</button><header className="case-head"><p>{p.category}</p><h1>{p.headline}</h1><div><span>{p.intro}</span><b>{p.metric}<small>{p.metricLabel}</small></b></div></header><ProductPreview project={project}/><Walkthrough project={project}/><section className="case-body"><aside><p>MY ROLE</p><b>Product strategy<br/>Research planning<br/>Interaction design<br/>Data modeling</b><p>TIMELINE</p><b>8-week portfolio sprint</b><p>STATUS</p><b>Concept · Simulated data</b></aside><article><p className="label">THE PROBLEM</p><h2>{p.problem}</h2><div className="facts"><span><small>PRIMARY USERS</small><b>{p.users}</b></span><span><small>NORTH-STAR METRIC</small><b>{p.northStar}</b></span><span><small>GUARDRAIL</small><b>{p.guardrail}</b></span></div><p className="label">PRODUCT DECISIONS</p><div className="decisions">{p.decisions.map((d,i)=><div key={d}><span>0{i+1}</span><p>{d}</p></div>)}</div><div className="honesty"><b>What is real—and what is not</b><p>I created the product strategy, interface, decision model, and technical artifacts. The organizations, operational records, and outcome figures are intentionally simulated. In a real engagement, the next step would be user interviews and baseline measurement.</p></div></article></section></div>;
}

export default function Home(){
  const [open,setOpen]=useState<Project|null>(null);
  if(open) return <CaseStudy project={open} onClose={()=>setOpen(null)}/>;
  return <main><nav><a className="wordmark" href="#top">PM<span>—</span>PORTFOLIO</a><div><a href="#work">Work</a><a href="#about">About</a><a href="#contact">Contact</a></div><a className="resume" href="#contact">Resume ↗</a></nav><section id="top" className="hero"><p className="kicker">ASPIRING PRODUCT MANAGER · ENTERPRISE + DATA</p><h1>I turn complicated systems into <em>clear decisions.</em></h1><div className="hero-bottom"><p>I’m building at the intersection of product strategy, AI, and analytics—with a focus on products people can understand, trust, and use.</p><span><i/>OPEN TO PRODUCT MANAGEMENT INTERNSHIPS</span></div></section><section id="work" className="work"><header><p>SELECTED WORK <span>(02)</span></p><h2>Two problems worth<br/>going deep on.</h2></header>{(['sentinel','supply'] as Project[]).map((key)=><article className="project" key={key} style={{'--project':work[key].accent} as React.CSSProperties}><div className="project-copy"><span>{work[key].number}</span><p>{work[key].category}</p><h3>{work[key].title}</h3><h4>{work[key].headline}</h4><p className="intro">{work[key].intro}</p><div className="project-metric"><b>{work[key].metric}</b><small>{work[key].metricLabel}</small></div><button onClick={()=>setOpen(key)}>Read the case study <i>↗</i></button></div><ProductPreview project={key}/></article>)}</section><section id="about" className="about"><p className="section-label">HOW I THINK</p><div><h2>Start with the decision,<br/>not the feature list.</h2><p>My work begins by defining who needs to make a decision, what prevents them from making it today, and how we will know the product helped. I use prototypes and data to make assumptions visible early.</p></div><div className="principles"><span><b>01</b><h3>Clarity over complexity</h3><p>Make the hard system understandable without hiding important evidence.</p></span><span><b>02</b><h3>Outcomes over output</h3><p>Anchor the roadmap to behavior, business value, and explicit guardrails.</p></span><span><b>03</b><h3>Evidence over theater</h3><p>Separate measured facts, modeled estimates, and untested assumptions.</p></span></div></section><footer id="contact"><p>LET’S BUILD SOMETHING USEFUL.</p><h2>Seeking a product<br/>management internship.</h2><div><span>Add your email · LinkedIn · GitHub here</span><a href="#top">Back to top ↑</a></div></footer></main>
}

