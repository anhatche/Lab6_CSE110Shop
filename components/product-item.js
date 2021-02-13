// product-item.js

class ProductItem extends HTMLElement {
  // TODO
  constructor(product) {
    super();

    this.title = product['title'];
    this.price = product['price'];
    this.description = product['description'];
    this.category = product['category'];
    this.imgSrc = product['image'];
    this.ID = product['id'];
    this.buttonText = "";
    this.alert = "";

    var myStorage = window.localStorage;
    var cart;

    if ('cartKey' in myStorage) {

      cart = JSON.parse(myStorage.getItem('cartKey'));

      if (cart.includes(this.ID)) {
        this.buttonText = 'Remove from Cart';
      }
      else {
        this.buttonText = 'Add to Cart';
        this.alert = "alert('Added to Cart!')";
      }
    }
    else {
      this.buttonText = 'Add to Cart';
      this.alert = "alert('Added to Cart!')";
    }

    this.template = `
      <img src="${this.imgSrc}" alt="${this.title}" width=200>
      <p class="title">${this.title}</p>
      <p class="price">${this.price}</p>
      <button onclick=${this.alert}>${this.buttonText}</button>
    `;

    var productList = document.getElementById('product-list');
    var li = document.createElement("li");

    li.classList.add('product');
    li.innerHTML = this.template;

    productList.appendChild(li);

    const [addItemButton] = li.querySelectorAll('button');
    
    addItemButton.addEventListener('click', () => {
      if (addItemButton.innerHTML == 'Add to Cart') {
        this.changeCart('add', this.ID);
        addItemButton.innerHTML = 'Remove from Cart';
        addItemButton.onclick = "";
      }
      else {
        this.changeCart('remove', this.ID);
        addItemButton.innerHTML = 'Add to Cart';
        addItemButton.onclick = "alert('Added to Cart!')";
      }
      
    });

  }

  changeCart(action, ID) {

    var cartCounter = document.getElementById('cart-count');
    var cartCount = Number(cartCounter.innerHTML);
    var myStorage = window.localStorage;
    var cart;

    if ('cartKey' in myStorage) {
      console.log('Original cart: ' + myStorage.getItem('cartKey'));

      cart = JSON.parse(myStorage.getItem('cartKey'));
      
    } 
    else {
      cart = [];
    }

    if (action == 'add') {
      cartCounter.innerHTML = cartCount + 1;
      cart.push(this.ID);
      myStorage.setItem('cartKey', String(JSON.stringify(cart)));
      console.log('New cart: ' + myStorage.getItem('cartKey'));
    }
    else {
      cartCounter.innerHTML = cartCount - 1;
      const index = cart.indexOf(this.ID);
      if (index > -1) {
        cart.splice(index, 1);
      }
      myStorage.setItem('cartKey', String(JSON.stringify(cart)));
      console.log('New cart: ' + myStorage.getItem('cartKey'));
    }

  }

  
}

customElements.define('product-item', ProductItem);