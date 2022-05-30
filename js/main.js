const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        imgCatalog: 'https://via.placeholder.com/200x150',
        cartUrl: '/getBasket.json',
        imgCart: 'https://via.placeholder.com/100x50',
        products: [],
        filtered: [],
        cartItems: [],
        showCart: false,
        userSearch: ''
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => { console.log(error); })
        },
        filter(userSearch) {
            let regExp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(el => regExp.test(el.product_name));
        },
        addProduct(product) {
            this.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        let find = this.cartItems.find(el => el.id_product === product.id_product);
                        if (find) {
                            find.quantity++;
                        } else {
                            let newProduct = Object.assign({ quantity: 1 }, product);
                            this.cartItems.push(newProduct);
                        }
                    } else {
                        alert('Error');
                    }
                })
        },
        removeProduct(product) {
            this.getJson(`${API}/deleteFromBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        if (product.quantity > 1) {
                            product.quantity--;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(product), 1);
                        }
                    } else {
                        alert('Error');
                    }
                })
        }
    },
    mounted() {
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let item of data) {
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                }
            });
        this.getJson(`${API + this.cartUrl}`)
            .then(data => {
                for (let item of data.contents) {
                    this.cartItems.push(item);
                }
            });
    }
});
