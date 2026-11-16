// MENU DATA: option groups, menu items, sections and store list. Edit prices, items and images here.
const SIZES=[['Small',0],['Medium',8],['Large',14]],MILK=[['Oat Milk',0],['Full Cream',0],['Soy Milk',0],['Almond',0]];
const EXTRAS=[['Vanilla Syrup',20],['Extra Shot',10]];
const G={drink:[['Size',SIZES],['Milk',MILK]],none:[],beans:[['Grind',[['Whole Bean',0],['Espresso',0],['Filter',0]]]],cloth:[['Size',[['S',0],['M',0],['L',0],['XL',0]]]]};

const slug=t=>t.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/&/g,'and').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const I=(id,sec,sub,name,desc,price,g='none',img='')=>({id,sec,sub,name,desc,price,g,img:img||`images/${slug(sec)}/${slug(name)}.png`});
let ITEMS=[
I('f1','Featured','Featured','Iced Latte','Smooth espresso over ice with milk',56,'drink'),
I('f2','Featured','Featured','Cappuccino','Espresso with velvety steamed foam',67,'drink'),
I('f3','Featured','Featured','Americano','Espresso topped with hot water',50,'drink'),
I('n1','Non-Coffee','Matcha','Matcha Latte','Ceremonial matcha with steamed milk',58,'drink'),
I('n2','Non-Coffee','Matcha','Iced Matcha','Matcha shaken over ice',60,'drink'),
I('n3','Non-Coffee','Hot Chocolate','Hot Chocolate','Rich cocoa with steamed milk',48,'drink'),
I('n4','Non-Coffee','Hot Chocolate','Chai Latte','Spiced tea with steamed milk',52,'drink'),
I('s1','Smoothies & Shakes','Smoothies','Berry Smoothie','Mixed berries, banana, yoghurt',62,'drink'),
I('s2','Smoothies & Shakes','Protein Shakes','Chocolate Protein Shake','Chocolate whey protein, milk, ice',70,'drink'),
I('s3','Smoothies & Shakes','Protein Shakes','Vanilla Protein Shake','Vanilla whey protein, milk, ice',70,'drink'),
I('d1','Food','Pastries','Fresh Croissant','Freshly baked pastry',38),
I('d2','Food','Pastries','Almond Croissant','Buttery, filled with almond cream',46),
I('d3','Food','Toasties & Wraps','Ham & Cheese Toastie','Toasted sourdough, ham, cheddar',64),
I('d4','Food','Toasties & Wraps','Chicken Mayo Wrap','Grilled chicken, lettuce, mayo',68),
I('m1','Food','Pastries','Pain au Chocolat','Flaky pastry, dark chocolate',40),
I('m2','Food','Pastries','Blueberry Muffin','Baked fresh daily',38),
I('m3','Food','Pastries','Cinnamon Roll','Warm, iced with cream cheese',42),
I('k1','Food','Cakes & Desserts','Chocolate Cake','Rich, moist chocolate sponge',55),
I('k2','Food','Cakes & Desserts','Cheesecake','Classic baked cheesecake',58),
I('k3','Food','Cakes & Desserts','Carrot Cake','Spiced, with cream cheese frosting',52),
I('k4','Food','Cakes & Desserts','Red Velvet Slice','Cream cheese icing',55),
I('k5','Food','Cakes & Desserts','Chocolate Brownie','Fudgy and dense',38),
I('b1','Food','Breakfast','French Toast','Brioche, berries, maple syrup',72),
I('b2','Food','Breakfast','Eggs Benedict','Poached eggs, hollandaise, muffin',85),
I('b3','Food','Breakfast','Avocado Toast','Sourdough, avo, feta, seeds',78),
I('b4','Food','Breakfast','Breakfast Sandwich','Bacon, egg and cheese',68),
I('t1','Food','Toasties & Wraps','Chicken Toastie','Chicken, mozzarella, pesto',68),
I('t2','Food','Toasties & Wraps','Club Sandwich','Chicken, bacon, egg, tomato',79),
I('y1','Food','Bowls & Healthy','Muesli Bowl','Muesli, yoghurt, seasonal fruit',55),
I('y2','Food','Bowls & Healthy','Açaí Bowl','Açaí, banana, granola, berries',80),
I('y3','Food','Bowls & Healthy','Yoghurt & Granola','Greek yoghurt, honey, granola',52),
I('y4','Food','Bowls & Healthy','Fruit Salad','Fresh seasonal fruit',48),
I('h1','Shop','Coffee Beans','House Blend Beans (250g)','Medium roast, chocolate notes',120,'beans'),
I('h2','Shop','Coffee Beans','Single Origin Beans (250g)','Light roast, bright and fruity',140,'beans'),
I('h3','Shop','Hot Chocolate','Hot Chocolate Mix (400g)','Make it at home',95),
I('h4','Shop','Protein','Protein Shake Mix (900g)','Make it at home',380),
I('h5','Shop','Clothing','Platō Tee','Soft cotton, embroidered logo',260,'cloth'),
I('h6','Shop','Clothing','Platō Cap','Adjustable, forest green',180),
I('h7','Shop','Machines','Home Espresso Machine','15-bar espresso maker',3499)];
const SECS=['Featured','Coffee','Non-Coffee','Smoothies & Shakes','Food','Shop'];

const STORES=[
{n:'Sandton City',a:'83 Rivonia Rd, Sandhurst, Sandton',h:'Open until 21:00',x:62,y:28},
{n:'Plato Gardens',a:'12 Garden Ave, Gardens',h:'Open until 18:00',x:30,y:60},
{n:'Rosebank',a:'50 Bath Ave, Rosebank',h:'Open until 20:00',x:52,y:52},
{n:'Melrose Arch',a:'1 Melrose Blvd, Melrose Arch',h:'Open until 21:00',x:70,y:62},
{n:'Fourways',a:'Cnr Witkoppen & William Nicol Dr, Fourways',h:'Open until 20:00',x:36,y:14},
{n:'Parkhurst',a:'4th Ave, Parkhurst',h:'Open until 18:00',x:44,y:74}];

// Items not listed here show "coming soon" / "ask in store" so nothing wrong is ever shown.
const INFO={
 'Iced Latte':{cal:395,allergens:['Dairy','Gluten'],ingredients:'Espresso, milk, ice',nutrition:{Calories:'395 kcal'}}
 // 'Fresh Croissant':{cal:300,allergens:['Gluten','Dairy','Egg'],ingredients:'Flour, butter, ...',nutrition:{Calories:'300 kcal',Protein:'6 g',Fat:'17 g',Carbs:'31 g'}},
};