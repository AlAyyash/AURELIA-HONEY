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
        ${i.name} - ${i.price} ريال
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
  return "ORD-" + Math.floor(Math.random() * 1000000);
}

function checkout() {

  let phone = document.getElementById("phone").value;

  if (!phone || cart.length === 0) return;

  let total = cart.reduce((s, i) => s + i.price, 0);
  let id = orderId();

  let order = { id, phone, items: cart, total, status: "قيد المعالجة" };

  orders.push(order);
  localStorage.setItem("orders", JSON.stringify(orders));

  let msg =
`🍯 طلب جديد
رقم: ${id}
جوال: ${phone}
الإجمالي: ${total}`;

  let myNumber = "9665XXXXXXXX";

  window.open(
    `https://wa.me/${myNumber}?text=${encodeURIComponent(msg)}`
  );

  cart = [];
  renderCart();
}

function trackOrder() {
  let id = document.getElementById("trackId").value;

  let order = orders.find(o => o.id === id);

  let result = document.getElementById("trackResult");

  if (!order) {
    result.innerHTML = "❌ غير موجود";
    return;
  }

  result.innerHTML = `
    <p>رقم الطلب: ${order.id}</p>
    <p>الحالة: ${order.status}</p>
    <p>الإجمالي: ${order.total}</p>
  `;
}