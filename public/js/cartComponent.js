Vue.component('cart', {
    data() {
        return {
            cartUrl: '/getBasket.json',
            imgCart: 'https://via.placeholder.com/100x50',
            cartItems: [],
            showCart: false
        }
    },
    mounted() {
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                for (let item of data.contents) {
                    this.$data.cartItems.push(item);
                }
            });
    },
    methods: {
        addProduct(product) {
            let find = this.cartItems.find(el => el.id_product === product.id_product);
            if (find) {
                this.$parent.putJson(`/api/cart/${find.id_product}`, { quantity: 1 })
                    .then(data => {
                        if (data.result === 1) {
                            find.quantity++
                        }
                    })
            } else {
                let newProduct = Object.assign({ quantity: 1 }, product);
                this.$parent.postJson(`/api/cart`, newProduct)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.push(newProduct)
                        }
                    })
            }
        },
        removeProduct(product) {
            this.$parent.getJson(`${API}/addToBasket.json`)
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
    template:
        `
            <div class="cart">
                <button class="cart-btn" type="button" @click="showCart=!showCart">Корзина</button>
                <div class="cart-block" v-show="showCart">
                    <p v-if="!cartItems.length">В корзине ничего нет.</p>
                    <cart-item v-for="product of cartItems"
                    :key="product.id_product"
                    :img="product.imgProduct"
                    :cart-item="product"
                    @removeProduct="removeProduct">
                    </cart-item>
                </div>
            </div>
        `
});

Vue.component('cart-item', {
    props: ['cartItem', 'img'],
    template:
        `
        <div class="cart-item">
            <div class="cart-item-left-block">
                <img :src="img" alt="IMG">
                <div class="cart-item-text-wrp">
                    <p class="cart-item-title">{{cartItem.product_name}}</p>
                    <p class="cart-item-quantity">Количество: {{cartItem.quantity}}</p>
                    <p class="cart-item-single-price">{{cartItem.price}}$ за шт.</p>
                </div>
            </div>
            <div class="cart-item-right-block">
                <p class="cart-item-price">{{cartItem.quantity * cartItem.price}} $</p>
                <button class="cart-item-del-btn" @click="$emit('removeProduct', cartItem)">&times;</button>
            </div>
        </div>
    `
})