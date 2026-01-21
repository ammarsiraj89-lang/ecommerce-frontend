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
