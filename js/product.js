// Step 1 of ordering: product customisation window (size, milk, extras, quantity) then Add to Order.
let cur;
function open1(id) {
    try {
        const i = ITEMS.find((x) => x.id == id);
        if (!i) return;
        cur = { i, pick: {}, ex: {}, qty: 1 };
        G[i.g].forEach(([n]) => (cur.pick[n] = 0));
        const inf = INFO[i.name] || {};
        const grp = G[i.g]
            .map(
                ([n, o]) => `<div class="grp">
<h4>${n}</h4>
<div class="opts">${o.map((v, k) => `<button class="pill" data-g="${n}" data-k="${k}" onclick="pickOpt(this)">${v[0]}${v[1] ? ' +' + R(v[1]) : ''}</button>`).join('')}</div>
</div>`,
            )
            .join('');
        const ex =
            i.g == 'drink'
                ? `<div class="grp">
<h4>Extras</h4>${EXTRAS.map(
                      (e, k) => `<div class="ex">
<label>
<input type="checkbox" onchange="cur.ex[${k}]=this.checked;price()"> ${e[0]}</label>
<span>+${R(e[1])}</span>
</div>`,
                  ).join('')}</div>`
                : '';
        const tags = [inf.cal ? inf.cal + ' Cal' : '', ...(inf.allergens || [])]
            .filter(Boolean)
            .map((t) => `<span class="tag2">${t}</span>`)
            .join('');
        const nut = inf.nutrition
            ? Object.entries(inf.nutrition)
                  .map(
                      ([k, v]) => `<div class="row">
<span>${k}</span>
<span>${v}</span>
</div>`,
                  )
                  .join('')
            : 'Nutritional information coming soon.';
        $('#modal').innerHTML = `<div class="row" style="justify-content:flex-end">
<button onclick="hide()" aria-label="Close" style="font-size:20px">✕</button>
</div>
 <div class="pm">
<div class="big ${i.img ? '' : 'noimg'}">${i.img ? `<img src="${i.img}" alt="${i.name}" onerror="this.parentNode.classList.add('noimg');this.remove()">` : ''}<span>Add image</span>
</div>
 <div>
<h2>${i.name}</h2>
<div class="pr">${R(i.price)}</div>
<p class="d">${i.desc}</p>
<div class="tags">${tags}</div>
 <details>
<summary>Ingredients</summary>
<p>${inf.ingredients || i.desc}</p>
</details>
 <details>
<summary>Nutritional Information</summary>
<div>${nut}</div>
</details>
 <details>
<summary>Allergens</summary>
<p>${inf.allergens ? inf.allergens.join(', ') : 'Please ask in store for allergen information.'}</p>
</details>
</div>
</div>
 ${grp}${ex}
 <div class="row" style="margin:22px 0 14px">
<b>Quantity</b>
<div class="qty">
<button onclick="cur.qty=Math.max(1,cur.qty-1);price()">−</button>
<span id="qn">1</span>
<button onclick="cur.qty++;price()">+</button>
</div>
</div>
 <div class="row" style="gap:10px">
<button class="btn alt" style="width:32%" onclick="hide()">Not now</button>
<button class="btn" id="addb" onclick="add()">
</button>
</div>`;
        document.querySelectorAll('#modal .pill[data-k="0"]').forEach((b) => b.classList.add('on'));
        price();
        show();
    } catch (e) {
        console.error('Could not open product popup:', e);
    }
}
function pickOpt(b) {
    b.parentNode.querySelectorAll('.pill').forEach((x) => x.classList.remove('on'));
    b.classList.add('on');
    cur.pick[b.dataset.g] = +b.dataset.k;
    price();
}
function unit() {
    let u = cur.i.price;
    G[cur.i.g].forEach(([n, o]) => (u += o[cur.pick[n]][1]));
    EXTRAS.forEach((e, k) => {
        if (cur.ex[k] && cur.i.g == 'drink') u += e[1];
    });
    return u;
}
function price() {
    $('#qn').textContent = cur.qty;
    $('#addb').textContent = `Add to Order · ${R(unit() * cur.qty)}`;
}
function add() {
    const sp = G[cur.i.g]
        .map(([n, o]) => o[cur.pick[n]][0])
        .concat(EXTRAS.filter((e, k) => cur.ex[k] && cur.i.g == 'drink').map((e) => e[0]))
        .join(' · ');
    const key = cur.i.id + sp,
        l = S.cart.find((x) => x.key == key);
    l ? (l.qty += cur.qty) : S.cart.push({ key, name: cur.i.name, sp, unit: unit(), qty: cur.qty });
    save();
    hide();
    upd();
    toast(`Added ${cur.i.name} to your order`);
}