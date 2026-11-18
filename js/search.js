// Header search with dropdown (categories + products with images).
const thumb = (i) =>
    `<span class="th">${i && i.img ? `<img src="${i.img}" alt="" onerror="this.remove()">` : ''}</span>`;
function suggest() {
    const v = $('#q').value.trim().toLowerCase(),
        d = $('#dd');
    if (!v) return d.classList.remove('show');
    const cats = [];
    SECS.forEach((sc) => {
        if (sc.toLowerCase().includes(v)) cats.push([sc, 'All']);
        [...new Set(ITEMS.filter((i) => i.sec == sc).map((i) => i.sub))].forEach((u) => {
            if (u != sc && u.toLowerCase().includes(v)) cats.push([sc, u]);
        });
    });
    const prods = ITEMS.filter((i) =>
        (i.name + ' ' + i.sub + ' ' + i.sec).toLowerCase().includes(v),
    ).slice(0, 6);
    d.innerHTML =
        (cats.length
            ? '<h5>Categories</h5>' +
              cats
                  .slice(0, 4)
                  .map(
                      ([
                          sc,
                          u,
                      ]) => `<button class="dr" onclick="goCat('${sc}','${u}')">${thumb(ITEMS.find((i) => i.sec == sc && (u == 'All' || i.sub == u)))}<span>${u == 'All' ? sc : u}<small>in ${sc}</small>
</span>
</button>`,
                  )
                  .join('')
            : '') +
            (prods.length
                ? '<h5>Products</h5>' +
                  prods
                      .map(
                          (
                              i,
                          ) => `<button class="dr" onclick="goItem('${i.id}')">${thumb(i)}<span>${i.name}<small>${R(i.price)} · ${i.sub}</small>
</span>
</button>`,
                      )
                      .join('')
                : '') || '<p class="msg" style="padding:20px">No matches.</p>';
    d.classList.add('show');
}
function goCat(sc, u) {
    S.sec = sc;
    S.sub = u;
    S.q = '';
    $('#q').value = '';
    $('#dd').classList.remove('show');
    location.hash = '';
    render();
    scrollTo(0, 0);
}
function goItem(id) {
    $('#dd').classList.remove('show');
    open1(id);
}
$('#q').oninput = suggest;
$('#q').onfocus = suggest;
$('#q').onkeydown = (e) => {
    if (e.key == 'Enter') {
        S.q = $('#q').value;
        $('#dd').classList.remove('show');
        location.hash = '';
        render();
    }
};
document.addEventListener('click', (e) => {
    if (!e.target.closest('.sw')) $('#dd').classList.remove('show');
});