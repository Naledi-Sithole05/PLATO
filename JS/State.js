// App state (current section, mode, cart, selected store). Cart is saved to localStorage.
let S = {
    sec: 'Featured',
    sub: 'All',
    q: '',
    mode: 'Pick up',
    cart: (() => {
        try {
            return JSON.parse(localStorage.getItem('plato_cart') || '[]');
        } catch (e) {
            return [];
        }
    })(),
    store: 0,
    api: 'loading',
};
const save = () => {
    try {
        localStorage.setItem('plato_cart', JSON.stringify(S.cart));
    } catch (e) {}
};
S.you = { x: 50, y: 45 };
S.sel = null; // fake "you are here" position + selected store on locator map