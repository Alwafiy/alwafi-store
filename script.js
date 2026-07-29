let cart = [];

const buttons = document.querySelectorAll('.add-cart');
const count = document.getElementById('cart-count');
const items = document.getElementById('cart-items');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    cart.push({
      name: button.dataset.name,
      price: Number(button.dataset.price)
    });

    updateCart();
  });
});

function updateCart() {
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
  if (totalElement) {
    totalElement.textContent = `الإجمالي: ${total}$`;
  }
}

function removeProduct(index) {
  cart.splice(index, 1);
  updateCart();
}
