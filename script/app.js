// Firebase SDK imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyAeSNIxXzWSjjrI0FouZjQZIN2-6wH-a2Y",
  authDomain: "comfort-desk.firebaseapp.com",
  databaseURL: "https://comfort-desk-default-rtdb.firebaseio.com",
  projectId: "comfort-desk",
  storageBucket: "comfort-desk.firebasestorage.app",
  messagingSenderId: "109687131068",
  appId: "1:109687131068:web:f42451da43c01ac5e479b9",
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// UI container
const productsContainer = document.getElementById("products");

/* =======================
   LOAD PRODUCTS
======================= */
async function loadProducts() {
  productsContainer.innerHTML = "<p class='text-center'>Loading...</p>";

  const snapshot = await getDocs(collection(db, "products"));

  if (snapshot.empty) {
    productsContainer.innerHTML = "<p class='text-center'>No products found</p>";
    return;
  }

  productsContainer.innerHTML = "";

  snapshot.forEach((doc) => {
    const p = doc.data();

    const card = `
      <div class="col-lg-3 col-md-4 col-sm-6">
<div class="product-card card h-100 shadow-sm" data-id="${doc.id}">
          <img src="${p.Product_Image}" class="card-img-top" alt="${p.Product_Name}">
          <div class="card-body text-center">
            <p class="text-muted small">${p.Category}</p>
            <h6 class="fw-bold">${p.Product_Name}</h6>
            <p class="fw-bold text-primary">₹${p.Price}</p>

            <div class="d-flex justify-content-center gap-2">
              <button class="btn btn-sm btn-outline-primary rounded-pill px-3 add-to-cart-btn">Add +</button>
              <button class="btn btn-sm btn-outline-danger wishlist-btn">
                <i class="fa-regular fa-heart"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    productsContainer.insertAdjacentHTML("beforeend", card);
  });
}

loadProducts();

/* =======================
   PRODUCT CARD CLICK
======================= */
productsContainer.addEventListener("click", (e) => {
  // Block buttons from triggering navigation
  if (
    e.target.closest(".add-to-cart-btn") ||
    e.target.closest(".wishlist-btn")
  ) return;

  const card = e.target.closest(".product-card");
  if (!card) return;

  window.location.href = `products.html?id=${card.dataset.id}`;
});


/* =======================
   ADD TO CART (MULTIPLE ITEMS FIXED)
======================= */
/* =======================
   ADD TO CART (FIXED)
======================= */
document.addEventListener("click", (e) => {
  // 1. Identify if the clicked element is the Add to Cart button
  const btn = e.target.closest(".add-to-cart-btn");
  if (!btn) return;

  // 2. Prevent the card's general click (navigation) from firing
  e.preventDefault();
  e.stopImmediatePropagation(); 

  const card = btn.closest(".product-card");
  if (!card) return;

  // 3. Extract Data
  const id = card.dataset.id;
  const name = card.querySelector("h6").innerText;
  // Use a regex to get only numbers/decimals for the price
  const priceText = card.querySelector(".text-primary").innerText;
  const price = parseFloat(priceText.replace(/[^0-9.]/g, ""));
  const image = card.querySelector("img").src;

  // 4. Save to LocalStorage
  addToCart({ id, name, price, image });

  // 5. UI feedback
  const originalText = btn.innerHTML;
  btn.innerText = "Added ✓";
  btn.classList.replace("btn-outline-primary", "btn-success");

  setTimeout(() => {
    btn.innerHTML = originalText;
    btn.classList.replace("btn-success", "btn-outline-primary");
  }, 1000);
});


function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    existing.qty += 1; // ✅ quantity increases
  } else {
    product.qty = 1;
    cart.push(product);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
}

/* =======================
   WISHLIST
======================= */
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".wishlist-btn");
  if (!btn) return;

  e.stopPropagation();

  const card = btn.closest(".product-card");
  const id = card.dataset.id;
  const icon = btn.querySelector("i");

  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  if (wishlist.includes(id)) {
    wishlist = wishlist.filter((item) => item !== id);
    icon.classList.replace("fa-solid", "fa-regular");
  } else {
    wishlist.push(id);
    icon.classList.replace("fa-regular", "fa-solid");
  }

  localStorage.setItem("wishlist", JSON.stringify(wishlist));
});

/* =======================
   MOBILE NAVBAR
======================= */
document.getElementById("hamburger")?.addEventListener("click", () => {
  document.getElementById("nav").classList.toggle("active");
});
