// Firebase SDK imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Firebase Config
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAeSNIxXzWSjjrI0FouZjQZIN2-6wH-a2Y",
  authDomain: "comfort-desk.firebaseapp.com",
  databaseURL: "https://comfort-desk-default-rtdb.firebaseio.com",
  projectId: "comfort-desk",
  storageBucket: "comfort-desk.firebasestorage.app",
  messagingSenderId: "109687131068",
  appId: "1:109687131068:web:f42451da43c01ac5e479b9",
  measurementId: "G-ZJVVZYYNET"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// UI container
const productsContainer = document.getElementById("products");

// Fetch products
async function loadProducts() {
  productsContainer.innerHTML = "<p class='text-center'>Loading...</p>";

  try {
    const snapshot = await getDocs(collection(db, "products"));

    if (snapshot.empty) {
      productsContainer.innerHTML = "<p class='text-center'>No products found</p>";
      return;
    }

    productsContainer.innerHTML = "";

    snapshot.forEach((doc) => {
      const data = doc.data();

      const productCard = `
        <div class="col-lg-3 col-md-4 col-sm-6">
          <div class="card h-100 shadow-sm">
            <img src="${data.Product_Image}" class="card-img-top" alt="${data.Product_Name}">
            <div class="card-body text-center">
              <h5 class="card-title">${data.Product_Name}</h5>
              <p class="text-muted">${data.Category}</p>
              <p class="fw-bold">₹${data.Price}</p>
              <p class="small">Available: ${data.Quantity}</p>
              <button class="btn btn-primary w-100">Add to Cart</button>
            </div>
          </div>
        </div>
      `;

      productsContainer.insertAdjacentHTML("beforeend", productCard);
    });

  } catch (error) {
    console.error("Error fetching products:", error);
    productsContainer.innerHTML =
      "<p class='text-danger text-center'>Failed to load products</p>";
  }
}

// Load on page open
window.addEventListener("DOMContentLoaded", loadProducts);

document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');

  hamburger.addEventListener('click', () => {
    nav.classList.toggle('active');
  });
});
