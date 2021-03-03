const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
// Перевести на Promise НЕ ИСПОЛЬЗОВАТЬ fetch


const getRequest = (url) => {
  return new Promise ((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status !== 200) {
          reject(xhr.status);
        } else {
          resolve(xhr.responseText);
        }
      }
    }  
  });
}



///////////////////////////////////////

class ProductList {
  #goods;
  #allProducts;

  constructor(container = '.products') {
    console.log('constructor');
    this.container = container;
    this.#goods = [];
    this.#allProducts = [];

    // this.#fetchGoods();
    // this.#render();
    this.#getProducts()
        .then((data) => {
          this.#goods = [...data];
          this.#render();
        });
  }

  goodsTotalPrice() {
    return this.#goods.reduce((sum, { price }) => sum + price, 0);
  }

  // #fetchGoods() {
  //   getRequest(`${API}/catalogData.json`, (data) => {
  //     // console.log(data);
  //     this.#goods = JSON.parse(data);
  //     this.#render();
  //     console.log(this.#goods);
  //     console.log(this.#allProducts);
  //   });
  // }
#fetchGoods() {
     getRequest(`${API}/catalogData.json`).then((data) => {
  //     // console.log(data);
     this.#goods = JSON.parse(data);
      this.#render();
      console.log(this.#goods);
      console.log(this.#allProducts);
     }).catch((err) => {
       console.log(err)
     });
    }
  #getProducts() {
    return fetch(`${API}/catalogData.json`)
        .then((response) => response.json())
        .catch((err) => {
          console.log(err);
        });
  }

  #render() {
    const block = document.querySelector(this.container);

    this.#goods.forEach((product) => {
      const productObject = new ProductItem(product);
      console.log(productObject);
      this.#allProducts.push(productObject);
      block.insertAdjacentHTML('beforeend', productObject.render());
    });
  }
}

class ProductItem {
  constructor(product, img='https://placehold.it/200x150') {
    this.title = product.product_name;
    this.price = product.price;
    this.id = product.id;
    this.img = img;
  }

  render() {
    return `<div class="product-item" data-id="${this.id}">
              <img src="${this.img}" alt="Some img">
              <div class="desc">
                  <h3>${this.title}</h3>
                  <p>${this.price} \u20bd</p>
                  <button class="buy-btn">Купить</button>
              </div>
          </div>`;
  }
}

const productList = new ProductList();

class Cart {
  #cartItems;
  goodsTotalPrice() {}
  getTotalWithDiscount() {}

  constructor() {
    this.#cartItems = [];
  }

  addToCart(cartItem) {
    for (i = 0; i < this.#cartItems.length; i++) {
      if (this.#cartItems[i].getGoodId() == cartItem.getGoodId()) {
        this.#cartItems[i].addQuantityOfGoods(1);
        return;
      }
    };
    this.#cartItems.push(cartItem);
  }

  removeFromCart(cartItem) {
    let removedItemIndex = 0;
    for (i = 0; i < this.#cartItems.length; i++) {
      if (this.#cartItems[i].getGoodId() == cartItem.getGoodId()) {
        break;
      }
      removedItemIndex++;
    };
    this.#cartItems.splice(removedItemIndex, 1);
  }

  getCartItems() {
    return this.#cartItems;
  }
}

class CartItem {
  #good;
  #quantityOfGoods;
  #goodDiscount;
  
  countPriceWithDiscount() {
    return this.good.price * (100 - this.goodDiscount) / 100;
  }

  countTotalPriceWithDiscount() {
    return this.quantityOfGoods * this.countPriceWithDiscount();
  }

  getGoodId() {
    return this.#good.id;
  }

  addQuantityOfGoods(num) {
    this.#quantityOfGoods += num;
  }
}
