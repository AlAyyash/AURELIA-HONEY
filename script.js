let cart = [];
let orders = JSON.parse(localStorage.getItem("orders")) || [];

function addToCart(name, price) {
  cart.push({ name, price });
  renderCart();
}

function renderCart() {
  let box = document.getElementById("cartItems");
  let total = 0;

  box.innerHTML = "";

  cart.forEach((i, index) => {
    total += i.price;

    box.innerHTML += `
      <div>
        ${i.name} - ${i.price}
        <button onclick="removeItem(${index})">حذف</button>
      </div>
    `;
  });

  document.getElementById("total").innerText = "الإجمالي: " + total;
}

function removeItem(i) {
  cart.splice(i, 1);
  renderCart();
}

function orderId() {
  return "AUR-" + Date.now();
}

/* 💳 إنشاء الطلب + واتساب */
function checkout() {

  let phone = document.getElementById("phone").value;

  if (!phone || cart.length === 0) return;

  let total = cart.reduce((s, i) => s + i.price, 0);

  let order = {
    id: orderId(),
    phone,
    items: cart,
    total,
    status: "جديد"
  };

  orders.push(order);
  localStorage.setItem("orders", JSON.stringify(orders));

  let msg =
`🍯 طلب أوريليا
رقم: ${order.id}
جوال: ${phone}
الإجمالي: ${total}`;

  let admin = "9665XXXXXXXX";

  window.open(
    `https://wa.me/${admin}?text=${encodeURIComponent(msg)}`
  );

  cart = [];
  renderCart();
}

/* 📦 تتبع */
function trackOrder() {

  let id = document.getElementById("trackId").value;

  let order = orders.find(o => o.id === id);

  let box = document.getElementById("trackResult");

  if (!order) {
    box.innerHTML = "❌ غير موجود";
    return;
  }

  box.innerHTML = `
    <p>رقم: ${order.id}</p>
    <p>الحالة: ${order.status}</p>
    <p>الإجمالي: ${order.total}</p>
  `;
}

/* 🧠 لوحة التحكم */
function loadOrders() {

  let box = document.getElementById("ordersList");
  box.innerHTML = "";

  orders.forEach((o, i) => {

    box.innerHTML += `
      <div class="order">
        <p>${o.id}</p>
        <p>${o.phone}</p>
        <p>${o.total}</p>

        <button onclick="setStatus(${i},'تم الشحن')">شحن</button>
        <button onclick="setStatus(${i},'تم التوصيل')">توصيل</button>
      </div>
    `;
  });
}

function setStatus(i, status) {
  orders[i].status = status;
  localStorage.setItem("orders", JSON.stringify(orders));
  loadOrders();
}
