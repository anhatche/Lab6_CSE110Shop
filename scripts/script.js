// Script.js

window.addEventListener('DOMContentLoaded', () => {
  // TODO
  const myRequest = new Request('https://fakestoreapi.com/products');
  var myStorage = window.localStorage;
  var products;
  var cart;

  if ('productsKey' in myStorage) {
    console.log('Products in storage: '+ myStorage.getItem('productsKey'));
  } else {
    console.log('Products not in storage');
    fetch(myRequest)
      .then(response => response.json())
      .then(data => myStorage.setItem('productsKey', String(JSON.stringify(data))));
    console.log(`Products now in storage: ${myStorage.getItem('productsKey')}`);
  }

  if ('cartKey' in myStorage) {
    console.log('Cart from storage: '+ myStorage.getItem('cartKey'));

    var cartCounter = document.getElementById('cart-count');

    cart = JSON.parse(myStorage.getItem('cartKey'));
    cartCounter.innerHTML = cart.length;

  } else {
    console.log('Cart empty');
  }

  products = JSON.parse(myStorage.getItem('productsKey'));
  products.forEach(product => new ProductItem(product));

});

