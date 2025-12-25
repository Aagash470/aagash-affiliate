// ------------------------
// SUPABASE CONNECTION
// ------------------------
const SUPABASE_URL = "https://edqbmdxvpggofifogxlu.supabase.co";
const SUPABASE_KEY = "sb_publishable_H-S0qNZDZZxoUVlpVuizrg_7W9zjx1s";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// ------------------------
// LOGIN FUNCTION
// ------------------------
async function login() {
    let email = document.getElementById("email").value;
    let pass = document.getElementById("password").value;

    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: pass
    });

    if (error) {
        alert("Login failed: " + error.message);
    } else {
        alert("Logged in successfully!");
        showDashboard();
    }
}

// ------------------------
// SIGNUP FUNCTION
// ------------------------
async function signup() {
    let email = document.getElementById("email").value;
    let pass = document.getElementById("password").value;

    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: pass
    });

    if (error) {
        alert("Signup failed: " + error.message);
    } else {
        alert("Signup success! Now login.");
    }
}

// ------------------------
// LOGOUT
// ------------------------
async function logout() {
    await supabase.auth.signOut();
    document.getElementById("dashboard").style.display = "none";
    document.getElementById("auth-box").style.display = "block";
}

// ------------------------
// SHOW DASHBOARD
// ------------------------
function showDashboard() {
    document.getElementById("auth-box").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
    loadProducts();
}

// ------------------------
// ADD PRODUCT
// ------------------------
async function addProduct() {

    let title = document.getElementById("p_title").value;
    let desc = document.getElementById("p_desc").value;
    let image = document.getElementById("p_image").value;
    let price = document.getElementById("p_price").value;
    let category = document.getElementById("p_category").value;
    let url = document.getElementById("p_url").value;

    const { data, error } = await supabase.from("products").insert([
        {
            title: title,
            description: desc,
            image_url: image,
            price: price,
            category: category,
            product_url: url,
            clicks: 0,
            earnings: 0
        }
    ]);

    if (error) {
        alert("Error adding product: " + error.message);
    } else {
        alert("Product added!");
        loadProducts();
    }
}

// ------------------------
// LOAD PRODUCTS
// ------------------------
async function loadProducts() {
    const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

    let list = document.getElementById("product-list");
    list.innerHTML = "";

    data.forEach(item => {
        let card = `
            <div class="prod-card">
                <img src="${item.image_url}">
                <h4>${item.title}</h4>
                <p>${item.price} ₹</p>
                <a href="${item.product_url}" target="_blank">Buy Now</a>
            </div>
        `;
        list.innerHTML += card;
    });
}
