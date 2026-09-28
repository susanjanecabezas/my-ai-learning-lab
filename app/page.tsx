"use client";
import {useMemo,useState} from "react";

const weeks=[
["AI Foundations","How generative AI works, strengths, limits, hallucinations and verification."],
["Prompting Essentials","Clear instructions, context, constraints, examples and iteration."],
["Prompting for Real Work","Reusable prompts for support, writing, analysis and decision support."],
["Research & Verification","Source checking, comparison, uncertainty and fact-checking habits."],
["AI at Work","Technical support, summaries, documentation and customer communication."],
["AI for Personal Projects","Planning, creator workflows, organization and everyday tasks."],
["Files & Data","Use AI with documents, CSVs, tables and structured information."],
["Workflow Design","Turn repeat tasks into repeatable AI-assisted systems."],
["Automation & Connectors","Understand tool use, integrations and lightweight automation."],
["Agents & App Building","How AI agents work and how to build useful AI-powered tools."],
["Responsible AI","Privacy, bias, security, hallucinations and workplace judgment."],
["Certification & Portfolio","Prepare for a credential and package your strongest projects."]
];

const lessons=[
{
 title:"What is generative AI?",time:"25–30 min",tag:"Learn",
 summary:"Build the mental model that makes the rest of the course easier.",
 body:<>
  <p><strong>Generative AI creates new output by predicting what should come next based on patterns learned from huge amounts of data.</strong> With text models, that output is usually a sequence of tokens: pieces of words, punctuation, numbers and symbols.</p>
  <p>That means an AI can sound confident without possessing human-style understanding. It can be brilliant at pattern-based work and still be wrong about a simple fact.</p>
  <div className="mini-grid">
   <div className="mini"><strong>Great at</strong><span>Drafting, summarizing, transforming, brainstorming, pattern finding.</span></div>
   <div className="mini"><strong>Needs checking</strong><span>Facts, dates, citations, current information, high-stakes decisions.</span></div>
  </div>
  <h4>🧪 Try it</h4>
  <p>Ask your AI assistant this vague request:</p>
  <div className="prompt">Help me write a response to a customer.</div>
  <p>Then improve it with context:</p>
  <div className="prompt">I work in WordPress technical support. A customer says their custom domain suddenly stopped loading after they changed DNS records yesterday. Give me 5 diagnostic questions to ask before suggesting a fix. Keep them concise and customer-friendly.</div>
  <p>Compare the answers. Notice what changed when you supplied <strong>role + situation + task + constraints</strong>.</p>
  <div className="check"><strong>Quick check:</strong> Why can an AI produce a convincing answer that is still wrong?<details><summary>Reveal answer</summary><p>Because it generates a likely response from learned patterns. Producing plausible language is not the same thing as verifying a fact.</p></details></div>
 </>,
 challenge:"Write one sentence describing the biggest difference you noticed between the vague prompt and the detailed prompt."
},
{
 title:"How an LLM answers you",time:"20 min",tag:"Learn",
 summary:"See what happens between your prompt and the response.",
 body:<>
  <p>Think of an LLM as a very large pattern engine. Your prompt creates a temporary context. The model repeatedly predicts a useful next token, then the next one, until it has constructed a response.</p>
  <p>Three things heavily shape the answer: <strong>your instructions, the context available in the conversation, and the model's learned patterns.</strong></p>
  <div className="callout">This is why changing one sentence in a prompt can noticeably change the output. You changed the model's context, not a hidden secret command.</div>
  <h4>🧪 Try it</h4><p>Ask the same question three times, but change the audience: explain DNS to a 10-year-old, a new support agent, and an experienced developer. Compare vocabulary, assumptions and detail.</p>
 </>,
 challenge:"Save one example where changing the audience dramatically improved the answer."
},
{
 title:"Why AI can be confidently wrong",time:"25 min",tag:"Verify",
 summary:"Learn the habit that separates strong AI users from careless ones.",
 body:<>
  <p>An AI can invent names, links, statistics, quotes or technical explanations. These errors are often called <strong>hallucinations</strong>. The dangerous part is that incorrect text can be written with exactly the same polished tone as correct text.</p>
  <h4>A simple verification habit</h4>
  <ol><li>Ask: <strong>Could this fact have changed?</strong></li><li>Ask: <strong>Does the answer depend on a source?</strong></li><li>Ask the model to identify uncertainty.</li><li>Verify important claims using authoritative sources.</li></ol>
  <div className="callout">Treat AI confidence as writing style, not evidence.</div>
 </>,
 challenge:"Find one claim from an AI answer today that deserves verification and note how you would check it."
},
{
 title:"Prompting experiment",time:"20 min",tag:"Practice",
 summary:"Discover what actually improves a prompt.",
 body:<>
  <p>Use one real task from your day. Run it four ways: vague request, added context, added constraints, then added example/output format.</p>
  <p>Score each result from 1–5 for usefulness. You are testing which information actually changes quality.</p>
  <div className="prompt">Task + Context + Constraints + Desired Output</div>
  <p>Don't chase a perfect formula. Good prompting is closer to giving a smart coworker a good brief.</p>
 </>,
 challenge:"Save the best version in your Prompt Library."
},
{
 title:"Weekly challenge",time:"30 min",tag:"Build",
 summary:"Turn Week 1 into something useful for your real life.",
 body:<>
  <p>Choose one recurring task from work or personal life and design a reusable AI prompt for it.</p>
  <p>Good candidates: troubleshooting intake, product-review talking points, research comparison, meeting summary, difficult email, or planning.</p>
  <h4>Your deliverable</h4>
  <ol><li>The task.</li><li>Your reusable prompt.</li><li>One test result.</li><li>One thing you changed after testing.</li></ol>
 </>,
 challenge:"Add the finished workflow to your Portfolio. Week 1 complete. 🎉"
}
];

export default function Home(){
 const [tab,setTab]=useState("Home");
 const [activeLesson,setActiveLesson]=useState<number|null>(null);
 const [done,setDone]=useState<boolean[]>(()=>JSON.parse(typeof window!=="undefined"&&localStorage.getItem("ai-lab-done")||"[false,false,false,false,false]"));
 const [notes,setNotes]=useState(()=>typeof window!=="undefined"?localStorage.getItem("ai-lab-notes")||"":"");
 const [reflection,setReflection]=useState(()=>typeof window!=="undefined"?localStorage.getItem("ai-lab-reflection")||"":"");
 const pct=Math.round(done.filter(Boolean).length/done.length*100);
 const next=done.findIndex(x=>!x);
 const toggle=(i:number)=>{const n=[...done];n[i]=!n[i];setDone(n);localStorage.setItem("ai-lab-done",JSON.stringify(n));};
 const saveNotes=(v:string)=>{setNotes(v);localStorage.setItem("ai-lab-notes",v)};
 const saveReflection=(v:string)=>{setReflection(v);localStorage.setItem("ai-lab-reflection",v)};
 const openLesson=(i:number)=>{setActiveLesson(i);setTab("Lesson");window.scrollTo({top:0,behavior:"smooth"})};

 const content=useMemo(()=>{
  if(tab==="Lesson"&&activeLesson!==null){
   const l=lessons[activeLesson];
   return <section className="lesson-page"><button className="back" onClick={()=>setTab("Home")}>← Back to dashboard</button><div className="lesson-shell"><div className="eyebrow">Week 1 · Lesson {activeLesson+1}</div><h2>{l.title}</h2><div className="meta"><span>⏱ {l.time}</span><span>🏷 {l.tag}</span></div><p className="lead">{l.summary}</p><div className="lesson-body">{l.body}</div><div className="reflection"><h3>✍️ Lab note</h3><p>{l.challenge}</p><textarea value={reflection} onChange={e=>saveReflection(e.target.value)} placeholder="Write a quick note here. It saves automatically in this browser."/></div><button className="primary" onClick={()=>{if(!done[activeLesson])toggle(activeLesson);setTab("Home")}}>{done[activeLesson]?"Return to dashboard":"Mark complete & return"}</button></div></section>
  }
  if(tab==="Roadmap") return <section><h2>12-Week Roadmap</h2><p className="lead">The path is structured, but not rigid. We’ll adjust it based on what proves most useful.</p><div className="grid">{weeks.map((w,i)=><article className="card" key={w[0]}><div className="eyebrow">Week {i+1}</div><h3>{w[0]}</h3><p>{w[1]}</p>{i===0&&<button className="text-btn" onClick={()=>{setTab("Home");window.scrollTo(0,0)}}>Open current week →</button>}</article>)}</div></section>;
  if(tab==="Prompt Library") return <section><h2>Prompt Library</h2><div className="card wide"><p>Save prompts worth reusing. Include what the prompt is for and what made it work.</p><textarea value={notes} onChange={e=>saveNotes(e.target.value)} placeholder={"Example:\nCustomer troubleshooting intake\nPrompt: ...\nWhy it works: gives role, context and desired output."}/><small>Saved automatically in this browser.</small></div></section>;
  if(tab==="Portfolio") return <section><h2>Portfolio</h2><p className="lead">By Week 12, these become concrete examples you can discuss on LinkedIn or in interviews.</p><div className="grid"><article className="card"><div className="project-icon">🛠️</div><h3>AI Technical Support Assistant</h3><p>Build a repeatable troubleshooting workflow and document the before/after impact.</p></article><article className="card"><div className="project-icon">🎥</div><h3>AI Creator Workflow</h3><p>Turn product information into review talking points, scripts and repurposed content.</p></article><article className="card"><div className="project-icon">🔎</div><h3>AI Research Workflow</h3><p>Create a method for source checking, comparison and concise recommendations.</p></article></div></section>;
  if(tab==="Certification") return <section><h2>Certification</h2><article className="card wide"><div className="eyebrow">Planned for later in the roadmap</div><h3>One credential that actually adds signal</h3><p>We’ll choose a recognizable, assessment-based credential after you’ve built enough foundations to know which direction fits you best.</p><div className="progress"><span style={{width:"0%"}}/></div><small>Current focus: build practical AI fluency first.</small></article></section>;

  return <section>
   <div className="today-card">
    <div><div className="eyebrow">Monday · Day 1</div><h2>Today’s Mission</h2><p>Understand what generative AI actually is, then test how context changes an answer.</p><div className="mission-meta"><span>⏱ 25–30 min</span><span>📖 Learn</span><span>🧪 Experiment</span></div></div>
    <button className="primary" onClick={()=>openLesson(next===-1?4:next)}>{next===-1?"Review Week 1":"Start Today’s Lesson"} →</button>
   </div>
   <div className="hero"><div><div className="eyebrow">Week 1 of 12</div><h2>AI Foundations</h2><p>Understand what generative AI is doing, where it shines, and where it can fool you.</p></div><div className="score">{pct}%<span>this week</span></div></div>
   <div className="progress"><span style={{width:pct+"%"}}/></div>
   <div className="grid two">
    <article className="card"><h3>Continue Learning</h3>{lessons.map((l,i)=><div className={"lesson-row "+(done[i]?"completed":"")} key={l.title}><button className="lesson-open" onClick={()=>openLesson(i)}><span className="lesson-num">{done[i]?"✓":i+1}</span><span><strong>{l.title}</strong><small>{l.time} · {l.tag}</small></span><span className="arrow">→</span></button></div>)}</article>
    <article className="card"><div className="eyebrow">Week 1 outcome</div><h3>What you'll be able to explain</h3><ul className="clean-list"><li>What generative AI is actually doing</li><li>Why context improves results</li><li>Why polished answers still need verification</li><li>How to create a reusable prompt for a real task</li></ul><div className="callout">You do not need to memorize AI jargon. The goal is to build useful instincts.</div></article>
   </div>
  </section>
 },[tab,activeLesson,done,notes,reflection,pct,next]);

 return <main><header><div><div className="brand">🧠 My AI Learning Lab</div><p className="sub">Learn it. Try it. Save what works.</p></div></header><nav>{["Home","Roadmap","Prompt Library","Portfolio","Certification"].map(x=><button className={tab===x?"active":""} onClick={()=>{setTab(x);setActiveLesson(null)}} key={x}>{x}</button>)}</nav>{content}</main>
}