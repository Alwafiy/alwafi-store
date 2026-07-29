let cart = JSON.parse(localStorage.getItem('alwafiCart')) || [];

const buttons = document.querySelectorAll('.add-cart');
const count = document.getElementById('cart-count');
const items = document.getElementById('cart-items');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    cart.push({ name: button.dataset.name, price: Number(button.dataset.price) });
    saveCart();
    updateCart();
  });
});

function saveCart() {
  localStorage.setItem('alwafiCart', JSON.stringify(cart));
}

function updateCart() {
  if (!count || !items) return;
  count.textContent = cart.length;
  items.innerHTML = '';
  let total = 0;

  cart.forEach((product, index) => {
    total += product.price;
    const li = document.createElement('li');
    li.innerHTML = `${product.name} - ${product.price}$ <button onclick="removeProduct(${index})">حذف</button>`;
    items.appendChild(li);
  });

  const totalElement = document.getElementById('cart-total');
  if (totalElement) totalElement.textContent = `الإجمالي: ${total}$`;
  updateWhatsApp(total);
}

function updateWhatsApp(total) {
  const button = document.getElementById('whatsapp-order');
  if (!button) return;

  let message = 'طلب جديد من متجر الوافي:%0A%0A';
  cart.forEach(product => {
    message += `- ${product.name}: ${product.price}$%0A`;
  });
  message += `%0Aالإجمالي: ${total}$`;
  button.href = `https://wa.me/967730705315?text=${message}`;
}

function removeProduct(index) {
  cart.splice(index, 1);
  saveCart();
  updateCart();
}

const searchInput = document.getElementById('search-input');
const products = document.querySelectorAll('#products .product');
const categoryButtons = document.querySelectorAll('.category-btn');
let selectedCategory = 'all';

function filterProducts() {
  const value = searchInput ? searchInput.value.toLowerCase() : '';

  products.forEach(product => {
    const name = product.dataset.name.toLowerCase();
    const category = product.dataset.category;
    const matchesSearch = name.includes(value);
    const matchesCategory = selectedCategory === 'all' || category === selectedCategory;

    product.style.display = matchesSearch && matchesCategory ? 'block' : 'none';
  });
}

if (searchInput) {
  searchInput.addEventListener('input', filterProducts);
}

categoryButtons.forEach(button => {
  button.addEventListener('click', () => {
    selectedCategory = button.dataset.category;
    filterProducts();
  });
});

updateCart();
