// Step 3: checkout page, validation, place order (hook your order backend in place()) and confirmation page.
function checkout(){if(!S.cart.length){location.hash='';return render()}
 $('#app').innerHTML=`<div class="co"><div><div class="steps"><b>1 Order</b><b class="on">2 Details & Payment</b><b>3 Confirmation</b></div>
 <div class="box"><h3>Order type</h3><div class="opts">${['Pick up','In-store','Delivery'].map(m=>`<button class="pill ${S.mode==m?'on':''}" onclick="S.mode='${m}';checkout()">${m}</button>`).join('')}</div></div>
 <div class="box"><h3>${S.mode=='Delivery'?'Delivery address':'Store'}</h3>${S.mode=='Delivery'?'<input class="f" id="addr" placeholder="Street address, suburb">':`<select class="f" id="store" onchange="S.store=this.value">${STORES.map((s,k)=>`<option value="${k}" ${S.store==k?'selected':''}>${s.n} · ${s.h}</option>`).join('')}</select>`}
 ${S.mode=='In-store'?'<input class="f" id="tbl" placeholder="Table number">':''}
 <select class="f" id="when"><option>As soon as possible</option><option>In 15 minutes</option><option>In 30 minutes</option></select></div>
 <div class="box"><h3>Payment</h3><div class="opts">${['Card','Apple Pay',S.mode=='Delivery'?'':'Pay at counter'].filter(Boolean).map((p,k)=>`<button class="pill ${k?'':'on'}" data-p="${p}" onclick="document.querySelectorAll('[data-p]').forEach(x=>x.classList.remove('on'));this.classList.add('on');pay='${p}';checkout2()">${p}</button>`).join('')}</div><div id="card"></div></div>
 <div class="err" id="err"></div></div>
 <div class="box sum"><h3>Order summary</h3>${S.cart.map(l=>`<div class="row"><span>${l.qty}× ${l.name}</span><span>${R(l.unit*l.qty)}</span></div>`).join('')}<div class="row"><span>Subtotal</span><span>${R(sub())}</span></div>${fee()?`<div class="row"><span>Delivery</span><span>${R(fee())}</span></div>`:''}<div class="row tot"><span>Total</span><span>${R(sub()+fee())}</span></div><br><button class="btn" onclick="place()">Place Order</button><button class="btn alt" style="margin-top:10px" onclick="location.hash='';render()">Back to menu</button></div></div>`;pay='Card';checkout2()}
let pay='Card';
function checkout2(){const c=$('#card');if(c)c.innerHTML=pay=='Card'?'<input class="f" id="cn" placeholder="Card number"><input class="f" placeholder="MM/YY" style="width:48%"> <input class="f" placeholder="CVV" style="width:48%">':''}


function place(){const e=$('#err');e.textContent='';
 if(S.mode=='Delivery'&&!$('#addr').value.trim())return e.textContent='Please enter a delivery address.';
 if(S.mode=='In-store'&&!$('#tbl').value.trim())return e.textContent='Please enter your table number.';
 if(pay=='Card'&&$('#cn').value.replace(/\D/g,'').length<12)return e.textContent='Please enter a valid card number.';
 // → send order to your backend here (fetch POST). Demo only:
 S.num='#'+Math.floor(1000+Math.random()*9000);S.cart=[];save();upd();location.hash='done';render()}
function done(){$('#app').innerHTML=`<div class="done"><div class="steps"><b>1 Order</b><b>2 Details & Payment</b><b class="on">3 Confirmation</b></div><div class="tick">✓</div><h1 style="margin-bottom:8px">Order Confirmed!</h1><p style="color:var(--mut)">Order number <b>${S.num||'#1235'}</b> is being prepared.</p><br><br><div style="max-width:320px;margin:auto"><button class="btn" onclick="home()">Go back home</button></div></div>`}