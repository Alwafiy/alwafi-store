let cart = [];

const buttons = document.querySelectorAll('.add-cart');
const count = document.getElementById('cart-count');
const items = document.getElementById('cart-items');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    cart.push({
      name: button.dataset.name,
      price: button.dataset.price
    });

    updateCart();
  });
});

function updateCart() {
  count.textContent = cart.length;
  items.innerHTML = '';

  cart.forEach(product => {
    const li = document.createElement('li');
    li.textContent = `${product.name} - ${product.price}$`;
    items.appendChild(li);
  });
}
