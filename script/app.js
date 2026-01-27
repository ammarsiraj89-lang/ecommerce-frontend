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

// Load products from Firestore
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
        <div class="card h-100 shadow-sm product-card" data-id="${doc.id}">
          <img src="${p.Product_Image}" class="card-img-top" alt="${p.Product_Name}">
          <div class="card-body text-center">
            <h5 class="card-title">${p.Product_Name}</h5>
            <p class="text-muted">${p.Category}</p>
            <p class="fw-bold">₹${p.Price}</p>
            <p class="small">Available: ${p.Quantity}</p>

            <div class="d-flex gap-2">
              <button class="btn btn-primary flex-grow-1">Add to Cart</button>

              <button class="btn btn-outline-danger wishlist-btn">
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


// PRODUCT CLICK → REDIRECT
productsContainer.addEventListener("click", (e) => {
  const card = e.target.closest(".product-card");
  if (!card) return;

  const id = card.dataset.id;
  window.location.href = `products.html?id=${id}`;
});


// WISHLIST BUTTON
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".wishlist-btn");
  if (btn) {
    const icon = btn.querySelector("i");
    icon.classList.toggle("fa-regular");
    icon.classList.toggle("fa-solid");
  }
});


// MOBILE NAVBAR TOGGLE
document.getElementById("hamburger").addEventListener("click", () => {
  document.getElementById("nav").classList.toggle("active");
});

// Replace the card variable inside your loadProducts() function with this:
snapshot.forEach((doc) => {
  const p = doc.data();
  const card = `
    <div class="col-lg-3 col-md-4 col-6">
      <div class="product-card border-0 bg-white h-100" data-id="${doc.id}">
        <div class="card-img-wrapper position-relative overflow-hidden rounded-4">
          <img src="${p.Product_Image}" class="img-fluid product-img" alt="${p.Product_Name}">
          <div class="card-actions">
             <button class="btn btn-white btn-icon wishlist-btn shadow-sm">
               <i class="fa-regular fa-heart"></i>
             </button>
          </div>
        </div>
        <div class="card-body px-0 pt-3">
          <p class="text-uppercase small fw-bold text-muted mb-1" style="letter-spacing: 1px;">${p.Category}</p>
          <h6 class="fw-bold mb-2">${p.Product_Name}</h6>
          <div class="d-flex justify-content-between align-items-center">
            <span class="h5 fw-bold text-primary mb-0">₹${p.Price}</span>
            <button class="btn btn-sm btn-outline-primary rounded-pill px-3">Add +</button>
          </div>
        </div>
      </div>
    </div>
  `;
  productsContainer.insertAdjacentHTML("beforeend", card);
});