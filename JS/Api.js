
const API = 'https://api.sampleapis.com/coffee'; 

const FB = {
    hot: ['Americano', 'Cappuccino', 'Latte', 'Flat White', 'Espresso', 'Mocha'],
    iced: ['Iced Latte', 'Iced Americano', 'Iced Mocha', 'Cold Brew'],
};

const MEAL = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
async function loadFood() {
    for (const [c, sub, base] of [
        ['Breakfast', 'Breakfast Specials', 70],
        ['Dessert', 'Sweet Treats', 52],
    ]) {
        try {
            const r = await fetch(MEAL + c);
            if (!r.ok) throw 0;
            const j = await r.json();
            // prices are hardcoded (API has none); same item shape as every other product → same modal, cart & checkout
            ITEMS = ITEMS.concat(
                j.meals
                    .slice(0, 8)
                    .map((m, k) =>
                        I(
                            'a' + m.idMeal,
                            'Food',
                            sub,
                            m.strMeal,
                            'Chef’s special',
                            base + (k % 4) * 6,
                            'none',
                            m.strMealThumb,
                        ),
                    ),
            );
        } catch (e) {
            console.warn('Food API failed:', c);
        }
    }
    render();
}
async function loadCoffee() {
    const mk = (arr, sub) =>
        arr.map((c, i) =>
            I(
                'c' + sub + (c.id || i),
                'Coffee',
                sub,
                c.title || c,
                c.description || 'Freshly brewed',
                48 + (((c.id || i) * 3) % 5) * 4 + (sub === 'Iced' ? 6 : 0),
                'drink',
                c.image || '',
            ),
        );
    try {
        const [h, i] = await Promise.all(
            ['hot', 'iced'].map((p) =>
                fetch(`${API}/${p}`).then((r) => {
                    if (!r.ok) throw 0;
                    return r.json();
                }),
            ),
        );
        ITEMS = ITEMS.concat(mk(h.slice(0, 8), 'Hot'), mk(i.slice(0, 8), 'Iced'));
        S.api = 'ok';
    } catch (e) {
        ITEMS = ITEMS.concat(mk(FB.hot, 'Hot'), mk(FB.iced, 'Iced'));
        S.api = 'fail';
    }
    render();
}