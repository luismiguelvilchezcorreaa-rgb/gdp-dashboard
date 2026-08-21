
const state={tab:0,score:0,answered:0,done:{},selected:{},tips:{}};

const symptoms=[
["🤕","I've got a headache.","You should rest and drink some water."],
["🤢","I've got a stomach ache.","You should eat something light."],
["🤧","I've got a cold.","You should keep warm and rest."],
["🌡️","I've got a temperature.","You should rest and check your temperature."],
["🧍","My back hurts.","You should avoid lifting heavy things."],
["🦷","I've got a toothache.","You should see a dentist."]
];

const mini=[
["Marta: You don't ______ today. Are you OK?",["look well","the matter","all right","feel a headache"],"look well","Use 'look well' to talk about someone's appearance."],
["Dan: I'm not sure. I don't ______.",["feel well","look a cold","all right","the matter"],"feel well","Use 'feel well' to describe your physical condition."],
["A: What's ______?  B: I've got a headache.",["the matter","look well","all right","feel a bit tired"],"the matter","'What's the matter?' means 'What's wrong?'"],
["A: Are you ______?  B: Yes, I think so.",["all right","toothache","feel well","a temperature"],"all right","'Are you all right?' is a common way to check if someone is OK."],
["I didn't sleep much last night, so I ______.",["feel a bit tired","the matter","look well","have arm"],"feel a bit tired","'Feel a bit tired' means slightly tired."],
["A: You look pale.  B: Yes, I don't ______.",["feel well","the matter","look hungry","all right?"],"feel well","We say 'I don't feel well' when we are not feeling healthy."]
];

const builders=[
[["got","I've","a","headache"],"I've got a headache."],
[["hurts","My","back"],"My back hurts."],
[["feel","I","tired"],"I feel tired."],
[["you","Are","right","all"],"Are you all right?"],
[["the","What's","matter"],"What's the matter?"],
[["got","I've","a","cold"],"I've got a cold."]
];

const advice=[
["👩🏻","Sofia","I feel sick and I've got a stomach ache.",["You should eat something light and rest.","You should go running.","You should drink five coffees."],"You should eat something light and rest."],
["👨🏽","Mateo","I've got a bad toothache.",["You should see a dentist.","You should play football.","You should stay up late."],"You should see a dentist."],
["👩🏼","Emma","I feel a bit tired today.",["You should get some rest.","You should skip sleep.","You should carry heavy boxes."],"You should get some rest."],
["👨🏻","Leo","I've got a temperature.",["You should rest and drink fluids.","You should exercise hard.","You should wear three jackets indoors."],"You should rest and drink fluids."]
];

const vocab=[
["🤕","headache","dolor de cabeza"],["🤢","stomach ache","dolor de estómago"],
["🤧","a cold","resfriado"],["🌡️","temperature","fiebre / temperatura"],
["🦷","toothache","dolor de muela"],["😴","tired","cansado/a"],
["🤒","sick","enfermo/a"],["🍽️","hungry","hambriento/a"]
];

const dialogues=[
["A: Are you all right?","B: Not really. I don't feel well.","A: What's the matter?","B: I've got a headache."],
["A: You don't look well today.","B: I feel a bit tired.","A: You should get some rest.","B: Yes, I think you're right."]
];

const total=symptoms.length+mini.length+builders.length+advice.length;

function mark(id,ok){
 if(state.done[id])return;
 state.done[id]=true;state.answered++;if(ok)state.score++;
 render();
}
function progress(){return Math.round(state.answered/total*100)}
function nav(){
 const labels=["Vocabulary","Mini-conversations","Build it","Health advice","Model dialogues"];
 return `<nav class="tabs">${labels.map((x,i)=>`<button class="${state.tab===i?'active':''}" onclick="go(${i})"><span class="n">${i+1}</span>${x}</button>`).join("")}</nav>`;
}
function layout(content){
 document.querySelector("#root").innerHTML=`
 <div class="shell">
 <header class="hero"><div><div class="kicker">A2 • USEFUL LANGUAGE</div><h1>Talking about health & how you feel</h1>
 <p>Practise common health expressions, short conversations and simple advice.</p></div>
 <div class="scorebox"><span>Score</span><strong>${state.score}/${total}</strong><small>${progress()}% complete</small></div></header>
 <div class="progress"><div style="width:${progress()}%"></div></div>${nav()}
 <main class="panel">${content}</main>
 <div class="footer"><b>Language focus:</b> Are you all right? • What's the matter? • I don't feel well. • I've got a… • My … hurts. • You should…</div>
 </div>`;
}
function vocabulary(){
 const options=[...symptoms.map(x=>x[2])];
 layout(`<h2>1. Health vocabulary</h2><p class="sub">First review the key words, then match each symptom with the best advice.</p>
 <div class="wordwall">${vocab.map(v=>`<div class="wordtile"><div class="icon">${v[0]}</div><b>${v[1]}</b><small>${v[2]}</small></div>`).join("")}</div>
 <h2 style="margin-top:28px">Match symptom + advice</h2>
 <div class="grid grid3" style="margin-top:15px">${symptoms.map((s,i)=>{
  const id="s"+i,sel=state.selected[id];
  return `<div class="card"><div class="icon">${s[0]}</div><h3>${s[1]}</h3>
  <select ${state.done[id]?'disabled':''} onchange="choose('${id}',this.value,${JSON.stringify(s[2])})">
  <option value="">Choose advice...</option>${options.map(o=>`<option ${sel===o?'selected':''}>${o}</option>`).join("")}</select>
  ${state.done[id]?`<div class="feedback ${sel===s[2]?'good':'bad'}">${sel===s[2]?'✓ Great choice!':'✗ Best answer: '+s[2]}</div>`:''}</div>`
 }).join("")}</div>`);
}
function minis(){
 layout(`<h2>2. Complete the mini-conversations</h2><p class="sub">Choose the phrase that sounds natural.</p>
 ${mini.map((q,i)=>{const id="m"+i,sel=state.selected[id];return `<div class="q"><div class="qnum">${i+1}</div><div class="qbody"><p>${q[0]}</p>
 <div class="options">${q[1].map(o=>`<button ${state.done[id]?'disabled':''} class="${state.done[id]?(o===q[2]?'correct':o===sel?'wrong':''):''}" onclick='pick(${JSON.stringify(id)},${JSON.stringify(o)},${JSON.stringify(q[2])})'>${o}</button>`).join("")}</div>
 ${state.done[id]?`<div class="tiprow"><span>${sel===q[2]?'✓ Correct':'✗ Correct answer: '+q[2]}</span><button class="tipbtn" onclick="tip('${id}')">Why?</button></div>${state.tips[id]?`<div class="tip">${q[3]}</div>`:''}`:''}
 </div></div>`}).join("")}`);
}
function build(){
 layout(`<h2>3. Build the sentence</h2><p class="sub">Click the words in the correct order.</p>
 <div class="grid grid2">${builders.map((b,i)=>{const id="b"+i,p=state.selected[id]||[],done=state.done[id];
 return `<div class="build"><div class="buildtop"><span>Sentence ${i+1}</span><button class="reset" ${done?'disabled':''} onclick="resetBuild('${id}')">Reset</button></div>
 <div class="sentence">${p.length?p.join(" "):"Your sentence will appear here..."}</div>
 <div class="words">${b[0].map((w,idx)=>{const key=id+"-"+idx;const used=(state.selected[key]===true);return `<button ${used||done?'disabled':''} onclick='addWord(${JSON.stringify(id)},${idx},${JSON.stringify(w)},${JSON.stringify(b[1])})'>${w}</button>`}).join("")}</div>
 ${done?`<div class="feedback ${normalize(p.join(" "))===normalize(b[1])?'good':'bad'}">${normalize(p.join(" "))===normalize(b[1])?'✓ '+b[1]:'✗ Correct: '+b[1]}</div>`:''}</div>`}).join("")}</div>`);
}
function health(){
 layout(`<h2>4. What should they do?</h2><p class="sub">Read each situation and choose the best advice.</p>
 <div class="grid grid2">${advice.map((s,i)=>{const id="a"+i,sel=state.selected[id];return `<div class="card"><div class="person"><span>${s[0]}</span><strong>${s[1]}</strong></div><blockquote>“${s[2]}”</blockquote>
 <div class="advice">${s[3].map(o=>`<button ${state.done[id]?'disabled':''} class="${state.done[id]?(o===s[4]?'correct':o===sel?'wrong':''):''}" onclick='pick(${JSON.stringify(id)},${JSON.stringify(o)},${JSON.stringify(s[4])})'>${o}</button>`).join("")}</div></div>`}).join("")}</div>
 ${state.answered===total?finalBox():""}`);
}
function models(){
 layout(`<h2>5. Model dialogues</h2><p class="sub">Read them aloud with a partner. Then personalize the symptoms and advice.</p>
 <div class="grid grid2">${dialogues.map((d,i)=>`<div class="dialogue"><b>Conversation ${i+1}</b>${d.map((l,j)=>`<div class="line ${j%2?'b':'a'}">${l}</div>`).join("")}</div>`).join("")}</div>
 <div class="tip"><b>Speaking challenge:</b> Change at least two details. Example: <i>headache → stomach ache</i>, <i>rest → see a doctor</i>.</div>`);
}
function finalBox(){return `<div class="final"><div class="trophy">🏆</div><h2>Activity complete!</h2><p>You scored <b>${state.score}/${total}</b>.</p><p>${state.score>=total*.85?'Excellent work!':state.score>=total*.65?'Good job — review your mistakes and try again.':'Keep practising the health expressions and try again.'}</p><button onclick="location.reload()">Try again</button></div>`}
function normalize(s){return s.replace(/[?.]/g,"").trim().toLowerCase()}
window.go=(i)=>{state.tab=i;render()}
window.choose=(id,val,ans)=>{if(!val||state.done[id])return;state.selected[id]=val;mark(id,val===ans)}
window.pick=(id,val,ans)=>{if(state.done[id])return;state.selected[id]=val;mark(id,val===ans)}
window.tip=(id)=>{state.tips[id]=!state.tips[id];render()}
window.resetBuild=(id)=>{if(state.done[id])return;state.selected[id]=[];Object.keys(state.selected).filter(k=>k.startsWith(id+"-")).forEach(k=>delete state.selected[k]);render()}
window.addWord=(id,idx,w,ans)=>{if(state.done[id])return;state.selected[id]=state.selected[id]||[];state.selected[id].push(w);state.selected[id+"-"+idx]=true;
 const target=builders[Number(id.slice(1))][0].length;if(state.selected[id].length===target){mark(id,normalize(state.selected[id].join(" "))===normalize(ans))}else render()}
function render(){[vocabulary,minis,build,health,models][state.tab]()}
render();
