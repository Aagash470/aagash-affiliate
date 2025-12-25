// Aagash Market Hub - Script.js

// Initialize Supabase Client const SUPABASE_URL = "https://edqbmdxvpggofifogxlu.supabase.co"; const SUPABASE_KEY = "sb_publishable_H-S0qNZDZZxoUVlpVuizrg_7W9zjx1s";

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

//------------------------------------------------------ // USER AUTHENTICATION //------------------------------------------------------ async function signupUser() { const email = document.getElementById("signupEmail").value; const password = document.getElementById("signupPassword").value;

let { data, error } = await supabase.auth.signUp({ email: email, password: password, });

if (error) { alert("Signup Failed: " + error.message); } else { alert("Signup Successful! Check your email."); } }

async function loginUser() { const email = document.getElementById("loginEmail").value; const password = document.getElementById("loginPassword").value;

let { data, error } = await supabase.auth.signInWithPassword({ email: email, password: password, });

if (error) { alert("Login Failed: " + error.message); } else { alert("Login Successful!"); window.location.href = "#dashboard"; } }

//------------------------------------------------------ // REAL PRODUCT IMPORT //------------------------------------------------------ async function importProduct() { const productName = document.getElementById("productName").value; const productLink = document.getElementById("productLink").value;

let { data, error } = await supabase.from("products").insert([ { name: productName, link: productLink, clicks: 0, earnings: 0, }, ]);

if (error) { alert("Product Import Failed: " + error.message); } else { alert("Product Added Successfully!"); } }

//------------------------------------------------------ // CLICK TRACKER //------------------------------------------------------ async function trackClick(productId) { await supabase.rpc("increment_clicks", { pid: productId }); }

//------------------------------------------------------ // LOAD PRODUCTS FROM DATABASE //------------------------------------------------------ async function loadProducts() { let { data, error } = await supabase.from("products").select("*");

const list = document.getElementById("productList"); list.innerHTML = "";

data.forEach((p) => { list.innerHTML += <div class="product-card"> <h3>${p.name}</h3> <a href="${p.link}" onclick="trackClick(${p.id})" target="_blank" class="btn">Open Link</a> </div>; }); }

//------------------------------------------------------ // LOAD STATS //------------------------------------------------------ async function loadStats() { let { data, error } = await supabase.from("products").select("clicks, earnings");

let totalClicks = 0; let totalEarnings = 0;

data.forEach((p) => { totalClicks += p.clicks; totalEarnings += p.earnings; });

document.getElementById("totalClicks").innerText = totalClicks; document.getElementById("totalEarnings").innerText = "$" + totalEarnings; }

//------------------------------------------------------ // AUTO REFRESH DASHBOARD //------------------------------------------------------ setInterval(() => { loadStats(); loadProducts(); }, 5000);
