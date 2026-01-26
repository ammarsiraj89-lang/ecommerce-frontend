const notifications = [
  {
    id: 1,
    message: "Your profile has been updated successfully.",
    time: "2 min ago",
    read: false
  },
  {
    id: 2,
    message: "New comment on your post.",
    time: "10 min ago",
    read: false
  },
  {
    id: 3,
    message: "Password changed successfully.",
    time: "1 hour ago",
    read: true
  }
];

const list = document.getElementById("notificationList");
const markAllBtn = document.getElementById("markAllBtn");

function renderNotifications() {
  list.innerHTML = "";

  notifications.forEach((notification) => {
    const li = document.createElement("li");
    li.className = `notification-item ${notification.read ? "" : "unread"}`;

    li.innerHTML = `
      <div>
        <p>${notification.message}</p>
        <span>${notification.time}</span>
      </div>
      ${
        !notification.read
          ? `<button onclick="markAsRead(${notification.id})">Mark as read</button>`
          : ""
      }
    `;

    list.appendChild(li);
  });
}

function markAsRead(id) {
  const notification = notifications.find(n => n.id === id);
  if (notification) notification.read = true;
  renderNotifications();
}

markAllBtn.addEventListener("click", () => {
  notifications.forEach(n => n.read = true);
  renderNotifications();
});

renderNotifications();
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