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
const card = `
  <div class="col-lg-3 col-md-4 col-sm-6 flip-card-container">
    <div class="product-card flip-card" data-id="${doc.id}">
      <div class="flip-card-inner">
        
        <div class="flip-card-front">
          <img src="${p.Product_Image}" class="card-img-top" alt="${p.Product_Name}">
          <div class="card-body text-center">
            <h5 class="card-title">${p.Product_Name}</h5>
            <p class="fw-bold text-primary">₹${p.Price}</p>
            <div class="mobile-hint d-md-none text-muted small">Tap to see details</div>
          </div>
        </div>

        <div class="flip-card-back text-center p-3">
          <h5 class="mb-2">${p.Product_Name}</h5>
          <p class="text-light small mb-1">Category: ${p.Category}</p>
          <p class="text-light small mb-3">Stock: ${p.Quantity} units</p>
          
          <div class="d-grid gap-2">
            <button class="btn btn-light btn-sm fw-bold">Add to Cart</button>
            <button class="btn btn-outline-light btn-sm wishlist-btn">
              <i class="fa-regular fa-heart"></i> Wishlist
            </button>
          </div>
          <div class="mobile-hint d-md-none text-light small mt-3">Tap to flip back</div>
        </div>

      </div>
    </div>
  </div>
`;