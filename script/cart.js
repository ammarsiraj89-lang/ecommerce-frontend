// Example order data
const orders = [
    {
      id: '12345',
      date: '2026-01-20',
      status: 'delivered',
      items: [
        { name: 'Wireless Headphones', quantity: 1, price: 120, image: 'https://via.placeholder.com/80' },
        { name: 'Bluetooth Speaker', quantity: 2, price: 60, image: 'https://via.placeholder.com/80' }
      ]
    },
    {
      id: '12346',
      date: '2026-01-15',
      status: 'pending',
      items: [
        { name: 'Smart Watch', quantity: 1, price: 200, image: 'https://via.placeholder.com/80' }
      ]
    }
  ];
  
  const cartHistory = document.getElementById('cart-history');
  
  orders.forEach((order, index) => {
    const totalPrice = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
    const orderHTML = `
      <div class="accordion-item">
        <h2 class="accordion-header" id="heading${index}">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="false" aria-controls="collapse${index}">
            Order #${order.id} - ${order.date} - 
            <span class="badge ${order.status === 'delivered' ? 'order-status-delivered' : 'order-status-pending'} ms-2">${order.status.toUpperCase()}</span>
          </button>
        </h2>
        <div id="collapse${index}" class="accordion-collapse collapse" aria-labelledby="heading${index}" data-bs-parent="#cart-history">
          <div class="accordion-body">
            <div class="list-group">
              ${order.items.map(item => `
                <div class="list-group-item d-flex align-items-center">
                  <img src="${item.image}" alt="${item.name}" class="order-item-img me-3">
                  <div>
                    <h5 class="mb-1">${item.name}</h5>
                    <p class="mb-1">Quantity: ${item.quantity}</p>
                    <p class="mb-0">Price: $${item.price}${item.quantity > 1 ? ' each' : ''}</p>
                  </div>
                </div>
              `).join('')}
            </div>
            <div class="text-end mt-3"><strong>Total: $${totalPrice}</strong></div>
          </div>
        </div>
      </div>
    `;
    
    cartHistory.innerHTML += orderHTML;
  });
  