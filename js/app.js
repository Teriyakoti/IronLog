const P={A1:[["pecs","Développé couché",4,6,10],["dos","Barbell Row",4,8,12],["epaules","Développé assis haltères",3,8,12],["biceps","Curl haltère unilatéral contre banc",3,8,12],["triceps","Extension triceps à la poulie",3,10,15]],A2:[["pecs","Développé incliné haltères",4,8,12],["dos","Tirage vertical",4,8,12],["epaules","Élévations latérales",3,12,20],["biceps","Hammer Curl",3,8,12],["triceps","Skull Crusher",3,8,12]],B1:[["pecs","Poulie haute pectoraux",3,10,15],["dos","Dumbbell Row",4,8,12],["epaules","Développé assis haltères",3,8,12],["biceps","Curl barre EZ",3,8,12],["triceps","Dips classiques",3,6,12]],B2:[["pecs","Développé haltères",4,8,12],["dos","Tirage horizontal",4,8,12],["epaules","Élévations latérales",3,12,20],["biceps","Curl haltère unilatéral",3,8,12],["triceps","Dips banc",3,10,15]]};
const cycle=["A1","A2","B1","B2"];let S=JSON.parse(localStorage.getItem("gymV3")||"null")||{session:"A1",theme:"dark",active:false,start:null,history:[],values:{}};
const save=()=>{localStorage.setItem("gymV3",JSON.stringify(S));stats();hist();status()};
const key=i=>S.session+"-"+i;const val=i=>S.values[key(i)]||(S.values[key(i)]={charge:0,reps:[0,0,0,0],done:false});
function elapsed(){return S.active?Math.floor((Date.now()-S.start)/1000):0}function fmt(x){return String(Math.floor(x/60)).padStart(2,"0")+":"+String(x%60).padStart(2,"0")}
function begin(){if(!S.active){S.active=true;S.start=Date.now();save()}}
function volume(){let v=0;P[S.session].forEach((e,i)=>{const x=val(i);v+=(+x.charge||0)*x.reps.slice(0,e[2]).reduce((a,b)=>a+(+b||0),0)});return Math.round(v)}
function end(){
const has=P[S.session].some((e,i)=>{const x=val(i);return x.done||x.reps.some(r=>r>0)||x.charge>0});if(!has){alert("Aucune donnée à enregistrer.");return}
if(!S.active)begin();const old=S.session;const snap=P[old].map((e,i)=>({...val(i),name:e[1]}));
S.history.unshift({date:new Date().toISOString(),session:old,duration:elapsed(),volume:volume(),completed:snap.filter(x=>x.done).length,exercises:snap});S.history=S.history.slice(0,50);
S.active=false;S.start=null;P[old].forEach((e,i)=>{const x=val(i);x.reps=[0,0,0,0];x.done=false});S.session=cycle[(cycle.indexOf(old)+1)%4];save();render();alert("Séance "+old+" enregistrée. Prochaine séance : "+S.session+".")}
function render(){
document.documentElement.dataset.theme=S.theme;document.getElementById("theme").textContent=S.theme==="dark"?"☀️":"🌙";
tabs.innerHTML="";cycle.forEach(s=>{const b=document.createElement("button");b.className="tab"+(s===S.session?" active":"");b.textContent=s;b.onclick=()=>{S.session=s;save();render()};tabs.appendChild(b)});
list.innerHTML="";P[S.session].forEach((e,i)=>{const x=val(i),c=document.createElement("div");c.className="card";
c.innerHTML=`<div class="head"><i class="bar ${e[0]}"></i><div><b>${e[1]}</b><div class="meta">${e[2]} × ${e[3]}-${e[4]}</div></div><input class="complete" type="checkbox" ${x.done?"checked":""}></div><div class="controls"><div class="field"><label>Charge (kg)</label><div class="charge"><button class="small minus">−</button><input class="kg" type="number" step=".5" value="${x.charge||""}"><button class="small plus">+</button></div></div><div class="field"><label>Répétitions</label><div class="reps">${[0,1,2,3].map(n=>`<input class="rep" data-n="${n}" type="number" value="${x.reps[n]||""}" ${n>=e[2]?"disabled":""}>`).join("")}</div></div></div><div class="note"></div>`;
c.querySelector(".minus").onclick=()=>{x.charge=Math.max(0,(+x.charge||0)-.5);save();render()};c.querySelector(".plus").onclick=()=>{x.charge=(+x.charge||0)+.5;save();render()};
c.querySelector(".kg").oninput=a=>{x.charge=+a.target.value||0;save()};c.querySelector(".complete").onchange=a=>{begin();x.done=a.target.checked;save()};
c.querySelectorAll(".rep").forEach(a=>a.oninput=()=>{if(+a.value>0)begin();x.reps[+a.dataset.n]=+a.value||0;save()});
const used=x.reps.slice(0,e[2]);c.querySelector(".note").textContent=used.every(r=>r>=e[4])&&used.some(r=>r>0)?"Charge validée : augmente légèrement la prochaine fois.":"Progresse jusqu’au haut de la fourchette sur toutes les séries.";
list.appendChild(c)});stats();hist();status()}
function stats(){let d=0;P[S.session].forEach((e,i)=>{if(val(i).done)d++});done.textContent=d+"/5";volumeEl.textContent=volume().toLocaleString("fr-FR")}
function status(){statusEl.className="status"+(S.active?" live":"");statusEl.textContent=S.active?"Séance en cours depuis "+fmt(elapsed())+".":"Séance non démarrée. Elle commencera aussi à la première répétition."}
function hist(){historyEl.innerHTML=S.history.length?S.history.slice(0,8).map(h=>`<div class="history-item"><b>${h.session}</b> · ${new Date(h.date).toLocaleString("fr-FR")}<div class="meta">${fmt(h.duration)} · ${h.volume.toLocaleString("fr-FR")} kg · ${h.completed}/5 exercices</div></div>`).join(""):'<div class="meta">Aucune séance enregistrée.</div>'}
const tabs=document.getElementById("tabs"),list=document.getElementById("list"),done=document.getElementById("done"),volumeEl=document.getElementById("volume"),statusEl=document.getElementById("status"),historyEl=document.getElementById("history");
document.getElementById("start").onclick=begin;document.getElementById("finish").onclick=end;document.getElementById("theme").onclick=()=>{S.theme=S.theme==="dark"?"light":"dark";save();render()};
let t=0,id=null;document.querySelectorAll("[data-s]").forEach(b=>b.onclick=()=>{t=+b.dataset.s;clearInterval(id);tick();id=setInterval(()=>{t--;tick();if(t<=0){clearInterval(id);navigator.vibrate?.([200,100,200])}},1000)});function tick(){timer.textContent=t>0?t+" s":"Prêt"}
setInterval(()=>{duration.textContent=fmt(elapsed());if(S.active)status()},1000);
if("serviceWorker"in navigator)navigator.serviceWorker.register("service-worker.js");render();