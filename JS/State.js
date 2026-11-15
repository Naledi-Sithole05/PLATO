
let S={sec:'Featured',sub:'All',q:'',mode:'Pick up',cart:JSON.parse(localStorage.getItem('plato_cart')||'[]'),store:0,api:'loading'};
const save=()=>{try{localStorage.setItem('plato_cart',JSON.stringify(S.cart))}catch(e){}};
S.you={x:50,y:45};S.sel=null;   