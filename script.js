/* =========================================
   LOADER EXIT
=========================================*/
window.addEventListener("load",()=>{
setTimeout(()=>{
const loader=document.getElementById("loaderScreen");
if(loader){
loader.style.opacity="0";
setTimeout(()=>loader.remove(),600);
}
},800);
});



/* =========================================
   GOLD RIPPLE TOUCH (LIGHTWEIGHT)
=========================================*/
document.addEventListener("click",e=>{
const r=document.createElement("span");
r.style.cssText=`
left:${e.clientX}px;
top:${e.clientY}px;
position:fixed;
width:12px;
height:12px;
border-radius:50%;
background:radial-gradient(circle,#ffd27a,#d4a017);
transform:translate(-50%,-50%);
pointer-events:none;
z-index:9999;
animation:ripple .6s linear;
`;
document.body.appendChild(r);
setTimeout(()=>r.remove(),600);
});



/* =========================================
   CART SYSTEM
=========================================*/
let cart=[];

const cartIcon=document.getElementById("cartIcon");
const count=document.getElementById("cartCount");
const panel=document.getElementById("cartPanel");
const cartItems=document.getElementById("cartItems");
const total=document.getElementById("totalPrice");



/* ADD ITEM */
document.querySelectorAll(".orderBtn").forEach(btn=>{
btn.addEventListener("click",e=>{

e.stopPropagation();

let card=btn.closest(".card");
let name=card.querySelector("h3").innerText;
let price=parseInt(card.querySelector("span").innerText);

let exist=cart.find(i=>i.name===name);

exist ? exist.qty++ : cart.push({name,price,qty:1});

updateCount();
bounceCart();

});
});



function updateCount(){
count.innerText=cart.reduce((a,b)=>a+b.qty,0);
}



function bounceCart(){
cartIcon.animate([
{transform:"scale(1)"},
{transform:"scale(1.3)"},
{transform:"scale(1)"}
],{duration:250});
}



/* OPEN CART */
cartIcon.onclick=()=>{
panel.classList.toggle("show");
renderCart();
};



/* CLOSE CART */
document.getElementById("closeCart").onclick=()=>{
panel.classList.remove("show");
};



/* RENDER CART */
function renderCart(){

cartItems.innerHTML="";
let sum=0;

cart.forEach((item,i)=>{

sum+=item.price*item.qty;

let row=document.createElement("div");
row.className="cartItem";

row.innerHTML=`
<div class="cartLeft">
<div>${item.name}</div>
<div class="qtyBox">
<button class="qtyBtn" onclick="changeQty(${i},-1)">−</button>
<div class="qtyNum">${item.qty}</div>
<button class="qtyBtn" onclick="changeQty(${i},1)">+</button>
</div>
</div>

<div class="price">₹${item.price*item.qty}</div>

<button class="removeBtn" onclick="removeItem(${i})">🗑</button>
`;

cartItems.appendChild(row);

});

total.innerText="₹"+sum;
}



/* QTY CHANGE */
function changeQty(i,val){
cart[i].qty+=val;
if(cart[i].qty<=0) cart.splice(i,1);
updateCount();
renderCart();
}



/* REMOVE */
function removeItem(i){
cart.splice(i,1);
updateCount();
renderCart();
}



/* =========================================
   WHATSAPP ORDER
=========================================*/
document.getElementById("whatsappOrder").onclick=()=>{

if(cart.length===0){
cartIcon.classList.add("shake");
setTimeout(()=>cartIcon.classList.remove("shake"),300);
return;
}

let msg="Order:%0A";
cart.forEach(i=>{
msg+=`${i.name} x${i.qty} = ₹${i.price*i.qty}%0A`;
});
msg+=`Total ${total.innerText}`;

window.open(`https://wa.me/987654321?text=${msg}`);
};



/* =========================================
   SEE ALL DRAWER MODE
=========================================*/
document.querySelectorAll(".seeAllBtn").forEach(btn=>{
btn.onclick=()=>{

let section=btn.closest(".menuSection");
let row=section.querySelector(".cardRow");

section.classList.toggle("active");
row.classList.toggle("expanded");

btn.innerText=row.classList.contains("expanded")?"Close":"See All";
};
});



/* =========================================
   TOUCH SCALE FEEDBACK
=========================================*/
document.querySelectorAll("button,.card,#cartIcon").forEach(el=>{
el.addEventListener("touchstart",()=>el.style.transform="scale(.94)");
el.addEventListener("touchend",()=>el.style.transform="scale(1)");
});



/* =========================================
   SWIPE DOWN CLOSE CART
=========================================*/
let startY=0;
panel.addEventListener("touchstart",e=>startY=e.touches[0].clientY);

panel.addEventListener("touchmove",e=>{
if(e.touches[0].clientY-startY>80)
panel.classList.remove("show");
});



/* =========================================
   DOUBLE TAP BLOCK
=========================================*/
let lastTouch=0;
document.addEventListener("touchend",e=>{
let now=Date.now();
if(now-lastTouch<=300)e.preventDefault();
lastTouch=now;
},{passive:false});



/* =========================================
   LIGHTWEIGHT PARTICLES (OPTIMIZED)
=========================================*/
const canvas=document.getElementById("particles");
if(canvas){
const ctx=canvas.getContext("2d");

let w=canvas.width=innerWidth;
let h=canvas.height=innerHeight;

window.addEventListener("resize",()=>{
w=canvas.width=innerWidth;
h=canvas.height=innerHeight;
});

let particles=[];
for(let i=0;i<25;i++){
particles.push({
x:Math.random()*w,
y:Math.random()*h,
r:Math.random()*2,
dx:(Math.random()-.5)*.25,
dy:(Math.random()-.5)*.25
});
}

function draw(){
ctx.clearRect(0,0,w,h);
particles.forEach(p=>{
p.x+=p.dx;
p.y+=p.dy;

if(p.x<0||p.x>w)p.dx*=-1;
if(p.y<0||p.y>h)p.dy*=-1;

ctx.beginPath();
ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
ctx.fillStyle="rgba(255,210,122,.5)";
ctx.fill();
});
requestAnimationFrame(draw);
}
draw();
}



/* =========================================
   SPOTLIGHT (THROTTLED)
=========================================*/
const light=document.getElementById("spotlight");
let ticking=false;

document.addEventListener("mousemove",e=>{
if(!light)return;
if(!ticking){
requestAnimationFrame(()=>{
light.style.left=e.clientX+"px";
light.style.top=e.clientY+"px";
ticking=false;
});
ticking=true;
}
});



/* =========================================
   READY
=========================================*/
console.log("☕ Premium Menu Ready");
/* ADD ITEM — FAST TOUCH FIX */
function handleAdd(btn){

let card = btn.closest(".card");
if(!card) return;

let name = card.querySelector("h3").innerText;
let price = parseInt(card.querySelector(".price, span").innerText);

let exist = cart.find(i=>i.name===name);

exist ? exist.qty++ : cart.push({name,price,qty:1});

updateCount();
bounceCart();
}

/* MOBILE FIRST */
document.querySelectorAll(".orderBtn").forEach(btn=>{

btn.addEventListener("touchstart",e=>{
e.preventDefault();
handleAdd(btn);
},{passive:false});

btn.addEventListener("click",e=>{
e.preventDefault();
handleAdd(btn);
});

});