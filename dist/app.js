'use strict';
const $ = (s) => document.querySelector(s);
const escapeHTML = (v) => String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const sourceById = Object.fromEntries(SOURCES.map(s=>[s.id,s]));
const industryById = Object.fromEntries(INDUSTRIES.map(i=>[i.id,i]));
const state = {industry:'all',grade:1,q:''};
const sourceLinks = (ids) => `<div class="source-links">${ids.map(id=>{const s=sourceById[id];return `<a href="${escapeHTML(s.url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(s.org)} · ${escapeHTML(s.kind)} ↗</a>`}).join('')}</div>`;
const list = (items) => `<ul>${items.map(x=>`<li>${escapeHTML(x)}</li>`).join('')}</ul>`;
$('#industry-filters').innerHTML = [{id:'all',short:'전체 산업'},...INDUSTRIES].map(i=>`<button type="button" data-industry="${i.id}" aria-pressed="${i.id==='all'}">${i.short}</button>`).join('');
$('#industry-list').innerHTML = INDUSTRIES.map(i=>`<details class="industry ${i.color}" id="industry-${i.id}"><summary><span class="industry-name"><span class="dot" aria-hidden="true"></span>${i.name}</span><span class="industry-hook">${i.hook}</span><span class="expand-icon" aria-hidden="true"></span></summary><div class="industry-body"><div><p>${i.why}</p><p>${i.limit}</p><p class="career"><strong>진로 연결</strong><br>${i.career}</p></div><div><div class="evidence"><p class="small-label">${i.status}</p><strong>${i.evidence}</strong>${sourceLinks(i.sources)}</div><button type="button" class="text-button" data-explore="${i.id}">${i.short} 발표 주제 살펴보기 ↗</button></div></div></details>`).join('');
$('#source-list').innerHTML = SOURCES.map(s=>`<li id="source-${s.id}"><p class="source-meta">${escapeHTML(s.org)} · ${escapeHTML(s.kind)} · ${escapeHTML(s.date)}</p><h3><a href="${escapeHTML(s.url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(s.title)} ↗</a></h3><p>${escapeHTML(s.note)}</p></li>`).join('');

function renderTopics(){
  const topics=matchingTopics(TOPICS,state);
  document.querySelectorAll('[data-industry]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.industry===state.industry)));
  document.querySelectorAll('[data-grade]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.grade)===state.grade)));
  $('#search').value=state.q;
  $('#result-count').textContent=`${state.industry==='all'?'전체 산업':industryById[state.industry].short} · ${state.grade?`고${state.grade}`:'모든 학년'} · ${topics.length}개 주제`;
  $('#empty').hidden=topics.length>0;
  $('#topic-list').innerHTML=topics.map(t=>{const i=industryById[t.industry];return `<details class="topic ${i.color}" id="topic-${t.id}"><summary><span class="topic-meta"><strong>${i.short}</strong><span>고${t.grade} 권장</span></span><span class="topic-main"><h3>${escapeHTML(t.title)}</h3><p>${escapeHTML(t.question)}</p></span><span class="expand-icon" aria-hidden="true"></span></summary><div class="topic-body"><p class="subject">교과 연결 · ${escapeHTML(t.subject)}<br>아래 설명은 발표를 위한 개념 해설이며 실제 장치의 모든 조건을 다루지는 않습니다.</p><h4>탐구의 출발점</h4><p>${escapeHTML(t.motivation)}</p><h4>먼저 이해할 원리</h4><p>${escapeHTML(t.principle)}</p><h4>같은 기준으로 비교하기</h4>${list(t.compare)}<h4>발표에서 짚을 세 가지</h4>${list(t.points)}<div class="insight"><h4>나만의 설명이 되는 지점</h4><p>${escapeHTML(t.difference)}</p></div><h4>결론에 붙일 조건</h4><p>${escapeHTML(t.limit)}</p><p><strong>결론의 방향</strong><br>${escapeHTML(t.conclusion)}</p>${sourceLinks(t.sources)}<div class="topic-actions"><button type="button" class="button primary" data-plan="${t.id}">이 주제로 10분 발표안 보기 ↗</button><a href="#sources">출처의 범위와 날짜 확인하기</a></div></div></details>`}).join('');
}
function selectPlan(id,scroll=false){
  const t=TOPICS.find(t=>t.id===id);if(!t)return;
  $('#talk-title').textContent=t.title;
  $('#talk-question').textContent=`탐구 질문 · ${t.question}`;
  const steps=[
    ['0:00–1:00','탐구 동기',t.motivation,'생활 속 궁금증 → 질문 한 문장'],
    ['1:00–3:30','원리',t.principle,'핵심 개념 2~3개 · 흐름도 또는 개념 그림 1개'],
    ['3:30–6:00','기술 비교',t.compare.join(' '),'같은 기준 3개로 비교표 · 발표 포인트 중 핵심 하나'],
    ['6:00–8:30','한계·전망',`${t.limit} ${t.difference}`,'어떤 조건에서 결론이 바뀌는지 · 사실과 전망 구분'],
    ['8:30–10:00','결론',t.conclusion,'질문에 답하기 → 생각이 달라진 점 → 다음 질문 1개']
  ];
  $('#timeline').innerHTML=steps.map(s=>`<li><time>${s[0]}</time><h4>${s[1]}</h4><p>${escapeHTML(s[2])}<span class="cue">${s[3]}</span></p></li>`).join('');
  $('#talk-sources').innerHTML=sourceLinks(t.sources);
  if(scroll){history.replaceState(null,'','#presentation');$('#presentation').scrollIntoView({block:'start'});$('#talk-title').setAttribute('tabindex','-1');$('#talk-title').focus({preventScroll:true});}
}
function reset(all=false){state.industry='all';state.grade=all?0:1;state.q='';renderTopics()}
function openTopic(id,scroll=true){
  const t=TOPICS.find(t=>t.id===id);if(!t)return;
  state.industry=t.industry;state.grade=t.grade;state.q='';renderTopics();selectPlan(id);
  const detail=$(`#topic-${id}`);detail.open=true;
  if(scroll){history.replaceState(null,'',`#topic-${id}`);detail.scrollIntoView({block:'start'});detail.querySelector('summary').focus({preventScroll:true})}
}
document.addEventListener('click',event=>{
  const button=event.target.closest('button,a');if(!button)return;
  if(button.dataset.industry){state.industry=button.dataset.industry;renderTopics()}
  if(button.dataset.grade!==undefined){state.grade=Number(button.dataset.grade);renderTopics()}
  if(button.dataset.open){event.preventDefault();openTopic(button.dataset.open)}
  if(button.dataset.explore){state.industry=button.dataset.explore;state.q='';renderTopics();$('#topics').scrollIntoView({block:'start'})}
  if(button.dataset.plan)selectPlan(button.dataset.plan,true);
});
$('#search').addEventListener('input',e=>{state.q=e.target.value;renderTopics()});
$('#reset').addEventListener('click',()=>reset());
$('#empty-reset').addEventListener('click',()=>reset(true));
$('#print').addEventListener('click',()=>window.print());
window.addEventListener('hashchange',()=>{const id=location.hash.replace('#topic-','');if(location.hash.startsWith('#topic-'))openTopic(id)});
renderTopics();selectPlan('data-1');
if(location.hash.startsWith('#topic-'))openTopic(location.hash.slice(7));
