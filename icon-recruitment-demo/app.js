"use strict";
// Public-safe, deliberately fictional demo data. No Supabase keys, session,
// CV uploads, analytics, forms, storage, or background network calls.
const FALLBACK_JOBS=[
 {id:"DEMO-PRJ-001-CE",title:"Civil Engineer",department:"Engineering",project:"Project Alpha",projectRef:"DEMO-PRJ-001",location:"Project site · Egypt",type:"Full-time",summary:"Support design coordination, construction quality and technical reporting.",slots:2,tags:["Site engineering","Quality","Documentation"]},
 {id:"DEMO-PRJ-001-PM",title:"Project Manager",department:"Operations",project:"Project Alpha",projectRef:"DEMO-PRJ-001",location:"Project site · Egypt",type:"Full-time",summary:"Plan schedules, budgets, stakeholders and project delivery.",slots:2,tags:["Planning","Stakeholders","Delivery"]},
 {id:"DEMO-PRJ-002-QS",title:"Quantity Surveyor",department:"Commercial",project:"Project Beta",projectRef:"DEMO-PRJ-002",location:"Project site · Egypt",type:"Full-time",summary:"Prepare quantity takeoffs, cost controls and progress reports.",slots:1,tags:["Cost control","Quantity takeoffs","Reporting"]},
 {id:"DEMO-PRJ-002-SS",title:"Site Supervisor",department:"Operations",project:"Project Beta",projectRef:"DEMO-PRJ-002",location:"Project site · Egypt",type:"Full-time",summary:"Coordinate site operations, contractors and safety reporting.",slots:0,tags:["Site management","Safety","Contractors"]},
 {id:"DEMO-PRJ-003-DS",title:"Data Specialist",department:"Engineering",project:"Project Gamma",projectRef:"DEMO-PRJ-003",location:"Project site · Egypt",type:"Temporary",summary:"Maintain operational reports, reconcile data and build dashboards.",slots:1,tags:["Dashboards","Data validation","Reporting"]},
 {id:"DEMO-PRJ-003-PO",title:"Procurement Officer",department:"Procurement",project:"Project Gamma",projectRef:"DEMO-PRJ-003",location:"Project site · Egypt",type:"Full-time",summary:"Manage sourcing requests, supplier comparison and purchase follow-up.",slots:2,tags:["Procurement","Suppliers","Sourcing"]}
];
const els={grid:document.getElementById("job-grid"),empty:document.getElementById("empty-state"),search:document.getElementById("job-search"),department:document.getElementById("department-filter"),type:document.getElementById("type-filter"),results:document.getElementById("results-label"),total:document.getElementById("total-count"),details:document.getElementById("job-dialog"),detailsBody:document.getElementById("job-detail"),apply:document.getElementById("apply-dialog"),applyRole:document.getElementById("apply-role")};
let jobs=FALLBACK_JOBS;
function escapeHtml(input){return String(input??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]));}
function stripUnsafeJobs(data){if(data?.mode!=="demonstration"||!Array.isArray(data.jobs))return null;return data.jobs.filter(j=>j&&typeof j.id==="string"&&typeof j.title==="string"&&typeof j.summary==="string"&&typeof j.department==="string"&&typeof j.project==="string"&&typeof j.slots==="number"&&j.id.startsWith("DEMO-")).slice(0,50);}
function render(){
 const query=els.search.value.trim().toLocaleLowerCase();const dep=els.department.value;const type=els.type.value;
 const visible=jobs.filter(j=>(dep==="all"||j.department===dep)&&(type==="all"||j.type===type)&&[j.title,j.summary,j.department,j.project,j.id,...(j.tags||[])].some(s=>String(s).toLocaleLowerCase().includes(query)));
 els.results.textContent=`Showing ${visible.length} of ${jobs.length} demonstration positions`;
 els.total.textContent=String(jobs.length).padStart(2,"0");els.empty.hidden=visible.length!==0;
 els.grid.replaceChildren();const fragment=document.createDocumentFragment();
 for(const j of visible){const card=document.createElement("article");card.className="job-card"+(j.slots<=0?" is-filled":"");card.innerHTML=`<div class="job-top"><span class="job-reference">${escapeHtml(j.id)}</span><span class="job-pill ${j.slots<=0?"filled":""}">${j.slots<=0?"STAFFING AT CAPACITY":"DEMO ROLE"}</span></div><h3>${escapeHtml(j.title)}</h3><div class="job-meta"><span>${escapeHtml(j.department)}</span><span class="divider-dot" aria-hidden="true">●</span><span>${escapeHtml(j.type)}</span></div><p>${escapeHtml(j.summary)}</p><div class="job-bottom"><span>${escapeHtml(j.project)}</span><button type="button" data-job-id="${escapeHtml(j.id)}" aria-label="View ${escapeHtml(j.title)} demo role details">View details <span aria-hidden="true">→</span></button></div>`;fragment.append(card)}
 els.grid.append(fragment);
}
function updateDepartments(){const previouslySelected=els.department.value;const deps=[...new Set(jobs.map(j=>j.department))].sort();els.department.replaceChildren(new Option("All departments","all"));for(const d of deps){els.department.add(new Option(d,d))}els.department.value=deps.includes(previouslySelected)?previouslySelected:"all";}
function showDetails(job){const filled=job.slots<=0;els.detailsBody.innerHTML=`<h2 id="dialog-title">${escapeHtml(job.title)}</h2><p class="dialog-subtitle">${escapeHtml(job.department)} · ${escapeHtml(job.type)} · ${escapeHtml(job.location)}</p><div class="dialog-facts"><div><small>Sample project</small><strong>${escapeHtml(job.project)}</strong></div><div><small>Staffing example</small><strong>${filled?"At approved headcount capacity":escapeHtml(String(job.slots))+" illustrative available slot"+(job.slots===1?"":"s")}</strong></div></div><h3>About this role</h3><p>${escapeHtml(job.summary)}</p><h3>Sample areas of focus</h3><div class="dialog-tags">${(job.tags||[]).map(t=>`<span>${escapeHtml(t)}</span>`).join("")}</div><div class="dialog-action"><button type="button" class="button ${filled?"button-muted":"button-primary"}" id="start-demo-apply" ${filled?"disabled":""}>${filled?"Sample role at capacity":"Preview candidate application →"}</button><button type="button" class="button button-muted" id="dialog-back">Back to positions</button></div><p class="dialog-disclaimer">This is a fictional demonstration. No vacancy is actually open or accepting applications.</p>`;
 els.detailsBody.querySelector("#dialog-back").addEventListener("click",()=>els.details.close());
 if(!filled){els.detailsBody.querySelector("#start-demo-apply").addEventListener("click",()=>{els.details.close();els.applyRole.textContent=`Selected demo position: ${job.title} · ${job.project}`;els.apply.showModal();document.body.classList.add("modal-open")})}
 els.details.showModal();document.body.classList.add("modal-open");
}
function reset(){els.search.value="";els.department.value="all";els.type.value="all";render()}
for(const e of [els.search,els.department,els.type])e.addEventListener(e===els.search?"input":"change",render);
document.getElementById("clear-filters").addEventListener("click",reset);document.getElementById("empty-reset").addEventListener("click",reset);
els.grid.addEventListener("click",e=>{const b=e.target.closest("button[data-job-id]");if(!b)return;const job=jobs.find(j=>j.id===b.dataset.jobId);if(job)showDetails(job)});
function closeDetails(){els.details.close();document.body.classList.remove("modal-open")}
function closeApply(){els.apply.close();document.body.classList.remove("modal-open")}
document.getElementById("close-dialog").addEventListener("click",closeDetails);
document.getElementById("close-apply").addEventListener("click",closeApply);
document.getElementById("finish-apply").addEventListener("click",()=>{closeApply();document.getElementById("open-roles").scrollIntoView({behavior:"smooth"})});
for(const dlg of [els.details,els.apply]){dlg.addEventListener("click",event=>{if(event.target===dlg){dlg.close();document.body.classList.remove("modal-open")}});dlg.addEventListener("close",()=>document.body.classList.remove("modal-open"))}
document.getElementById("year").textContent=String(new Date().getFullYear());
updateDepartments();render();
// Optional external JSON override ONLY when it explicitly declares demonstration
// mode and DEMO identifiers. No candidate records or secrets are fetched.
fetch("jobs.json",{cache:"no-store"}).then(r=>r.ok?r.json():null).then(data=>{const safe=stripUnsafeJobs(data);if(safe){jobs=safe;updateDepartments();render()}}).catch(()=>{});