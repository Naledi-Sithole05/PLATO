// Shared UI helpers: modal show/hide and toast messages.
// ---- helpers
function show(){$('#ov').classList.add('show')}
function hide(){$('#ov').classList.remove('show')}$('#ov').onclick=e=>{if(e.target.id=='ov')hide()};
function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2200)}
document.addEventListener('keydown',e=>{if(e.key=='Escape'){hide();cart(0)}});