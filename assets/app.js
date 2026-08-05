
const COURSES={
 itt101:{title:'ITT101 Final Exam Mastery Review',file:'courses/itt101.html'},
 itt102:{title:'ITT102 Final Exam Mastery Review 2.0',file:'courses/itt102.html'},
 itt103:{title:'ITT103 Final Exam Mastery Review 2.0',file:'courses/itt103.html'},
 itt104:{title:'ITT104 Software Development Workspace',file:'courses/itt104.html'}
};
const HUB_KEY='nccHubProfessionalV3';
let hub=JSON.parse(localStorage.getItem(HUB_KEY)||'{"dark":false,"launches":{},"lastCourse":""}');
if(hub.dark)document.body.classList.add('dark');
function save(){localStorage.setItem(HUB_KEY,JSON.stringify(hub))}
function toggleTheme(){document.body.classList.toggle('dark');hub.dark=document.body.classList.contains('dark');save();document.getElementById('themeText').textContent=hub.dark?'Light':'Dark'}
function openCourse(id){const c=COURSES[id];hub.launches[id]=(hub.launches[id]||0)+1;hub.lastCourse=id;save();document.getElementById('viewerTitle').textContent=c.title;document.getElementById('courseFrame').src=c.file;document.getElementById('viewer').classList.add('open');document.body.style.overflow='hidden';refreshMetrics()}

function openDirect(file,title,id){
  hub.launches[id]=(hub.launches[id]||0)+1;
  hub.lastCourse=id;
  save();
  document.getElementById('viewerTitle').textContent=title;
  document.getElementById('courseFrame').src=file;
  document.getElementById('viewer').classList.add('open');
  document.body.style.overflow='hidden';
  refreshMetrics();
}
function closeCourse(){document.getElementById('viewer').classList.remove('open');document.getElementById('courseFrame').src='about:blank';document.body.style.overflow='';}
function refreshMetrics(){const total=Object.values(hub.launches).reduce((a,b)=>a+b,0);document.getElementById('launchMetric').textContent=total;document.getElementById('activeMetric').textContent=Object.keys(hub.launches).length;document.getElementById('lastActivity').textContent=hub.lastCourse?COURSES[hub.lastCourse].title:'No course launched yet';document.querySelectorAll('[data-launches]').forEach(el=>{el.textContent=(hub.launches[el.dataset.launches]||0)+' launches'})}
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeCourse()});document.getElementById('viewer').addEventListener('click',e=>{if(e.target.id==='viewer')closeCourse()});document.getElementById('themeText').textContent=hub.dark?'Light':'Dark';refreshMetrics();
