const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        cartUrl: '/getBasket.json',
        imgCatalog: 'https://placehold.it/200x150',
        imgCart: 'https://placehold.it/50x100',
        products: [],
        cartItems: [],
        filtered: [],
        searchLine: '',
        showCart: false,
    
    },
    methods: {
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        addProduct(product) {
            this.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result < 1) {
                        return;
                    }
                    for (i = 0; i < this.cartItems.length; i++) {
                        if (this.cartItems[i].id_product == product.id_product) {
                            this.cartItems[i].quantity++;
                            return;
                        }
                    }
                    this.cartItems.push(Object.assign({quantity:1}, product));
                })
        },

        remove(item) {
            this.getJson(`${API}/deleteFromBasket.json`)
              .then(data => {
                if (data.result < 1) {
                    return;
                }
                if (item.quantity > 1) {
                    item.quantity--;
                } else {
                    this.cartItems.splice(this.cartItems.indexOf(item), 1)
                }
                
              })
          },


        filterGoods() {
            let regexp = new RegExp(this.searchLine, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
            
        }
    },
    beforeCreate() {
        console.log('beforeCreate');
    },
    created() {
        console.log('created');
        
    },
    beforeMount() {
        console.log('beforeMount');
    },
    mounted() {
        this.getJson(`${API + this.cartUrl}`)
      .then(data => {
        for (let el of data.contents) {
          this.cartItems.push(el);
        }
        this.cartItems = [];
      });
      
    this.getJson(`${API + this.catalogUrl}`)
      .then(data => {
        for (let el of data) {
          this.products.push(el);
          this.filtered.push(el);
        }
      });
    },
    beforeUpdate() {
        console.log('beforeUpdate');
    },
    updated() {
        console.log('updated');
    },
    beforeDestroy() {
        console.log('beforeDestroy');
    },
    destroyed() {
        console.log('beforeDestroy');
    }
});
