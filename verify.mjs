// Run with: node verify.mjs. No installed packages required.
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
const content=readFileSync(new URL('./dist/content.js',import.meta.url),'utf8');
runInNewContext(content+`
function assert(ok,message){if(!ok)throw Error(message)}
assert(INDUSTRIES.length===6 && TOPICS.length===18,'Six industries and 18 topics required');
assert(new Set(TOPICS.map(t=>t.id)).size===18,'Topic IDs must be unique');
assert(new Set(SOURCES.map(s=>s.id)).size===SOURCES.length,'Source IDs must be unique');
for(const i of INDUSTRIES){
  assert([1,2,3].every(g=>TOPICS.filter(t=>t.industry===i.id&&t.grade===g).length===1),'Missing grade in '+i.id);
}
for(const record of [...INDUSTRIES,...TOPICS]){
  assert(record.sources.length>0 && record.sources.every(id=>SOURCES.some(s=>s.id===id)),'Missing source');
}
for(const t of TOPICS){
  assert(['question','subject','motivation','principle','difference','limit','conclusion'].every(k=>t[k]?.length>8),'Incomplete topic '+t.id);
  assert(t.compare.length===3 && t.points.length===3,'Incomplete presentation points');
}
for(const s of SOURCES)assert(s.url.startsWith('https://'),'HTTPS source required');
const filter={industry:'all',grade:1,q:''};
assert(matchingTopics(TOPICS,filter).length===6,'Default view');
assert(matchingTopics(TOPICS,{...filter,grade:0}).length===18,'All grades');
assert(matchingTopics(TOPICS,{industry:'chips',grade:2,q:'  hbm  '})[0]?.id==='chips-2','Combined industry, grade, normalized search');
assert(matchingTopics(TOPICS,{...filter,q:'배터리'}).some(t=>t.id==='ev-1'),'Korean search');
assert(matchingTopics(TOPICS,{...filter,q:'없는검색결과1234'}).length===0,'Empty state');
assert(matchingTopics(TOPICS,{industry:'comms',grade:3,q:'센싱'})[0]?.id==='comms-3','Advanced topic filtering');
console.log('PASS: content coverage, source references and combined filters');
`,{console});
