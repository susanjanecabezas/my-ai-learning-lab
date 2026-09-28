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
const lessons=["What is generative AI?","How an LLM answers you","Why AI can be confidently wrong","Prompting experiment","Weekly challenge"];
export default function Home(){
 const [tab,setTab]=useState("Home");
 const [done,setDone]=useState<boolean[]>(()=>JSON.parse(typeof window!=="undefined"&&localStorage.getItem("ai-lab-done")||"[false,false,false,false,false]"));
 const [notes,setNotes]=useState(()=>typeof window!=="undefined"?localStorage.getItem("ai-lab-notes")||"":"");
 const pct=Math.round(done.filter(Boolean).length/done.length*100);
 const toggle=(i:number)=>{const n=[...done];n[i]=!n[i];setDone(n);localStorage.setItem("ai-lab-done",JSON.stringify(n));};
 const saveNotes=(v:string)=>{setNotes(v);localStorage.setItem("ai-lab-notes",v)};
 const content=useMemo(()=>{
  if(tab==="Roadmap") return <section><h2>12-Week Roadmap</h2><div className="grid">{weeks.map((w,i)=><article className="card" key={w[0]}><div className="eyebrow">Week {i+1}</div><h3>{w[0]}</h3><p>{w[1]}</p></article>)}</div></section>;
  if(tab==="Prompt Library") return <section><h2>Prompt Library</h2><div className="card"><p>Save prompts that are worth reusing. For v1, use the notes box below to collect your favorites.</p><textarea value={notes} onChange={e=>saveNotes(e.target.value)} placeholder="Paste a prompt, what it helped with, and any tweaks that improved it."/></div></section>;
  if(tab==="Portfolio") return <section><h2>Portfolio</h2><div className="grid"><article className="card"><h3>AI Technical Support Assistant</h3><p>Build a repeatable troubleshooting workflow and document the before/after impact.</p></article><article className="card"><h3>AI Creator Workflow</h3><p>Turn product information into review talking points, scripts and repurposed content.</p></article><article className="card"><h3>AI Research Workflow</h3><p>Create a method for source checking, comparison and concise recommendations.</p></article></div></section>;
  if(tab==="Certification") return <section><h2>Certification</h2><article className="card"><h3>Credential track</h3><p>Target: one recognizable, assessment-based AI credential after the foundations are solid.</p><div className="progress"><span style={{width:"0%"}}/></div><small>We’ll choose the credential together once you’ve sampled the material.</small></article></section>;
  return <section><div className="hero"><div><div className="eyebrow">Week 1 of 12</div><h2>AI Foundations</h2><p>Understand what generative AI is doing, where it shines, and where it can fool you.</p></div><div className="score">{pct}%<span>this week</span></div></div><div className="progress"><span style={{width:pct+"%"}}/></div><div className="grid two"><article className="card"><h3>Continue Learning</h3>{lessons.map((l,i)=><label className="lesson" key={l}><input type="checkbox" checked={done[i]} onChange={()=>toggle(i)}/><span>{l}</span></label>)}</article><article className="card"><h3>Today’s first lesson</h3><p><strong>Generative AI predicts useful outputs from patterns.</strong> It does not “know” facts the same way a person does, which is why verification matters.</p><p>Try this: ask the same question three ways, changing the context and constraints. Compare how much the answer improves.</p><div className="callout">Goal: notice that better context usually beats “magic prompt” tricks.</div></article></div></section>
 },[tab,done,notes,pct]);
 return <main><header><div><div className="brand">🧠 My AI Learning Lab</div><p className="sub">Learn it. Try it. Save what works.</p></div></header><nav>{["Home","Roadmap","Prompt Library","Portfolio","Certification"].map(x=><button className={tab===x?"active":""} onClick={()=>setTab(x)} key={x}>{x}</button>)}</nav>{content}</main>
}