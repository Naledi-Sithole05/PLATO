// Home/menu page: order-mode pills, category sidebar, chips and product grid.
// ---- Views
function home() {
    location.hash = '';
    S.q = '';
    $('#q').value = '';
    render();
}
$('#logo').onclick = home;
function modes() {
    $('#modes').innerHTML =
        '<span>How would you like to order?</span>' +
        ['Pick up', 'In-store', 'Delivery']
            .map(
                (m) =>
                    `<button class="pill ${S.mode == m ? 'on' : ''}" onclick="S.mode='${m}';modes()">${m}</button>`,
            )
            .join('');
    $('#modes').style.display = ['#checkout', '#done', '#stores'].includes(location.hash)
        ? 'none'
        : 'flex';
}
function render() {
    modes();
    if (location.hash == '#stores') return locator();
    if (location.hash == '#checkout') return checkout();
    if (location.hash == '#done') return done();
    const q = S.q.trim().toLowerCase(),
        subs = ['All', ...new Set(ITEMS.filter((i) => i.sec == S.sec).map((i) => i.sub))];
    let list = q
        ? ITEMS.filter((i) => (i.name + i.desc).toLowerCase().includes(q))
        : ITEMS.filter((i) => i.sec == S.sec && (S.sub == 'All' || i.sub == S.sub));
    $('#app').innerHTML = `<div class="wrap">
<aside>${SECS.map((s) => `<button class="${!q && s == S.sec ? 'on' : ''}" onclick="S.sec='${s}';S.sub='All';S.q='';$('#q').value='';render()">${s}</button>`).join('')}</aside>
 <section>
<h1>${q ? 'Search results' : S.sec}</h1>${S.api == 'fail' && S.sec == 'Coffee' ? '<div class="note">Couldn’t reach the coffee API, showing saved items instead.</div>' : ''}
 ${q ? '' : `<div class="chips">${subs.length > 2 ? subs.map((s) => `<button class="pill ${S.sub == s ? 'on' : ''}" onclick="S.sub='${s}';render()">${s}</button>`).join('') : ''}</div>`}
 <div class="grid">${
     S.api == 'loading' && S.sec == 'Coffee'
         ? '<p class="msg">Loading menu…</p>'
         : list.length
           ? list
                 .map(
                     (i) => `<div class="card" onclick="open1('${i.id}')">
<div class="im">${i.img ? `<img src="${i.img}" alt="${i.name}" onerror="this.remove()">` : 'Add image'}</div>
<h3>${i.name}</h3>
<p>${R(i.price)}</p>
</div>`,
                 )
                 .join('')
           : '<p class="msg">Nothing here yet.</p>'
 }</div>
</section>
</div>`;
    if (window.gsap) gsap.from('.card', { opacity: 0, y: 20, stagger: 0.05, duration: 0.4 });
}