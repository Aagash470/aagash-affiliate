// ===========================
// 1. Supabase Connection
// ===========================
const SUPABASE_URL = "https://edqbmdxvpggofifogxlu.supabase.co";
const SUPABASE_KEY = "sb_publishable_H-S0qNZDZZxoUVlpVuizrg_7W9zjx1s";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// ===========================
// 2. Signup Function
// ===========================
async function signup() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const { data, error } = await supabase.auth.signUp({
        email,
        password
    });

    if (error) {
        alert("Signup Failed ❌: " + error.message);
    } else {
        alert("Signup Successful 🎉 Check your email!");
    }
}

// ===========================
// 3. Login Function
// ===========================
async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        alert("Login Failed ❌: " + error.message);
    } else {
        alert("Login Successful 🎉");
        loadDashboard();
    }
}

// Show Dashboard After Login
async function loadDashboard() {
    document.getElementById("auth-box").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
    fetchProducts();
}

// ===========================
// 4. Add Product
// ===========================
async function addProduct() {
    const title = document.getElementById("p_title").value;
    const description = document.getElementById("p_desc").value;
    const image_url = document.getElementById("p_image").value;
    const price = document.getElementById("p_price").value;
    const category = document.getElementById("p_category").value;
    const product_url = document.getElementById("p_url").value;

    const { data, error } = await supabase
        .from("products")
        .insert([
            {
                title,
                description,
                image_url,
                price,
                category,
                product_url,
                clicks: 0,
                earnings: 0
            }
        ]);

    if (error) {
        alert("Product Add Failed ❌: " + error.message);
    } else {
        alert("Product Added Successfully 🎉");
        fetchProducts();
    }
}

// ===========================
// 5. Fetch Products
// ===========================
async function fetchProducts() {
    const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        alert("Error loading products ❌");
        return;
    }

    let list = document.getElementById("product-list");
    list.innerHTML = "";

    data.forEach(p => {
        list.innerHTML += `
            <div class="prod-card">
                <img src="${p.image_url}" />
                <h3>${p.title}</h3>
                <p>${p.description}</p>
                <p>₹${p.price}</p>
                <a href="${p.product_url}" target="_blank">Buy / View</a>
            </div>
        `;
    });
}

// ===========================
// 6. Logout
// ===========================
async function logout() {
    await supabase.auth.signOut();
    location.reload();
}
