// Supabase config
const SUPABASE_URL = "https://edqbmdxvpggofifogxlu.supabase.co";
const SUPABASE_KEY = "sb_publishable_H-S0qNZDZZxoUVlpVuizrg_7W9zjx1s";

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Login function
async function loginUser() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    alert("Login failed ❌: " + error.message);
  } else {
    alert("Login successful! 🎉");
  }
}

// Signup function
async function signupUser() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { data, error } = await supabaseClient.auth.signUp({
    email,
    password,
  });

  if (error) {
    alert("Signup failed ❌: " + error.message);
  } else {
    alert("Signup successful! 🎉 Check your email.");
  }
}
