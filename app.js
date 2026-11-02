const products = [
 {id:1,name:"iPhone 16 Pro",category:"phone",label:"Smartfon",price:14999000,old:15999000,rating:"4.9",image:"https://images.unsplash.com/photo-1592750651405-0e3d9d8b6b3f?auto=format&fit=crop&w=600&q=80",sale:"-6%"},
 {id:2,name:"MacBook Air M3",category:"laptop",label:"Noutbuk",price:16999000,old:18499000,rating:"4.8",image:"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80",sale:"-8%"},
 {id:3,name:"AirPods Pro 2",category:"audio",label:"Audio",price:3299000,old:3799000,rating:"4.9",image:"https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=600&q=80",sale:"-13%"},
 {id:4,name:"Smart Watch Series 9",category:"accessory",label:"Aksessuar",price:4599000,old:5199000,rating:"4.7",image:"https://images.unsplash.com/photo-1544117519-31a4b719223d?auto=format&fit=crop&w=600&q=80",sale:"-12%"},
 {id:5,name:"Samsung Galaxy S24",category:"phone",label:"Smartfon",price:11999000,old:12999000,rating:"4.8",image:"https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=600&q=80",sale:"-8%"},
 {id:6,name:"Gaming Laptop",category:"laptop",label:"Noutbuk",price:18999000,old:20999000,rating:"4.8",image:"https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=80",sale:"-10%"},
 {id:7,name:"Wireless Headphones",category:"audio",label:"Audio",price:1299000,old:1599000,rating:"4.6",image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",sale:"-19%"},
 {id:8,name:"Portable Speaker",category:"accessory",label:"Aksessuar",price:899000,old:1099000,rating:"4.7",image:"https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=600&q=80",sale:"-18%"}
];
const money = n => n.toLocaleString("uz-UZ") + " so‘m";
let cart = [];
let currentCategory = "all";
let searchTerm = "";
const grid = document.getElementById("productGrid");

function renderProducts(){
 const list = products.filter(p => (currentCategory==="all"||p.category===currentCategory) && p.name.toLowerCase().includes(searchTerm.toLowerCase()));
 grid.innerHTML = list.length ? list.map(p=>`<article class="product-card">
  <div class="product-image"><span class="sale">${p.sale}</span><button class="heart" aria-label="Sevimlilar">♡</button><img src="${p.image}" alt="${p.name}" onerror="this.src='https://placehold.co/400x300/f3f2ff/6957e8?text=TECHZONE'"></div>
  <div class="product-info"><div class="category">${p.label}</div><h3>${p.name}</h3><div class="rating">★★★★★ <span>${p.rating} (128)</span></div>
  <div class="price-row"><div><span class="price">${money(p.price)}</span><span class="old-price">${money(p.old)}</span></div><button class="add-btn" data-add="${p.id}" aria-label="Savatga qo‘shish">+</button></div></div></article>`).join("") : `<p>Mahsulot topilmadi.</p>`;
}
function renderCart(){
 document.getElementById("cartCount").textContent=cart.reduce((s,i)=>s+i.qty,0);
 document.getElementById("cartItems").innerHTML=cart.length?cart.map(i=>`<div class="cart-item"><img src="${i.image}" alt=""><div class="cart-item-info"><b>${i.name}</b><strong>${money(i.price)}</strong><div class="qty"><button data-qty="${i.id}" data-step="-1">−</button><span>${i.qty}</span><button data-qty="${i.id}" data-step="1">+</button></div></div><button data-remove="${i.id}">✕</button></div>`).join(""):`<div class="cart-empty">🛍️<br><br>Savatingiz hozircha bo‘sh</div>`;
 document.getElementById("cartTotal").textContent=money(cart.reduce((s,i)=>s+i.price*i.qty,0));
}
function toast(msg){const el=document.getElementById("toast");el.textContent=msg;el.classList.add("show");setTimeout(()=>el.classList.remove("show"),2000)}
function openCart(){document.getElementById("cartPanel").classList.add("open");document.getElementById("overlay").classList.add("show")}
function closeCart(){document.getElementById("cartPanel").classList.remove("open");document.getElementById("overlay").classList.remove("show")}
grid.addEventListener("click",e=>{
 const add=e.target.closest("[data-add]"); if(add){const p=products.find(x=>x.id===+add.dataset.add);const found=cart.find(x=>x.id===p.id);found?found.qty++:cart.push({...p,qty:1});renderCart();toast("Mahsulot savatga qo‘shildi!")}
 const heart=e.target.closest(".heart");if(heart){heart.classList.toggle("liked");heart.textContent=heart.classList.contains("liked")?"♥":"♡"}
});
document.getElementById("filters").addEventListener("click",e=>{const b=e.target.closest(".filter");if(!b)return;document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));b.classList.add("active");currentCategory=b.dataset.category;renderProducts()});
document.getElementById("cartToggle").onclick=openCart;document.getElementById("cartClose").onclick=closeCart;document.getElementById("overlay").onclick=closeCart;
document.getElementById("cartItems").addEventListener("click",e=>{const q=e.target.closest("[data-qty]");const r=e.target.closest("[data-remove]");if(q){const item=cart.find(i=>i.id===+q.dataset.qty);item.qty+=+q.dataset.step;if(item.qty<=0)cart=cart.filter(i=>i.id!==item.id);renderCart()}if(r){cart=cart.filter(i=>i.id!==+r.dataset.remove);renderCart()}});
document.getElementById("checkout").onclick=()=>{if(!cart.length){toast("Avval savatga mahsulot qo‘shing");return}toast("Buyurtma uchun telefon orqali bog‘laning");};
document.getElementById("searchToggle").onclick=()=>{document.getElementById("searchWrap").classList.toggle("show");document.getElementById("searchInput").focus()};
document.getElementById("searchClose").onclick=()=>{document.getElementById("searchWrap").classList.remove("show");searchTerm="";document.getElementById("searchInput").value="";renderProducts()};
document.getElementById("searchInput").addEventListener("input",e=>{searchTerm=e.target.value;renderProducts()});
document.getElementById("menuToggle").onclick=()=>document.querySelector(".header nav").classList.toggle("open");
renderProducts();renderCart();
