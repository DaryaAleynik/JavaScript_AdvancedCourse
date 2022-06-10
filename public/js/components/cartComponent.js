Vue.component('cart-comp', {
    data() {
        return {
            cartItems: [],
            showCart: false
        }
    },
    methods: {
        addProduct(product) {
            let find = this.cartItems.find(el => el.id_product === product.id_product);
            if (find) {
                this.$parent.putJson(`/api/cart/${product.id_product}/${product.nameProduct}`, { quantity: 1 })
                    .then(data => {
                        if (data.result) {
                            find.quantity++;
                        }
                    })
            } else {
                let newProduct = Object.assign({ quantity: 1 }, product);
                this.$parent.postJson(`api/cart/${product.id_product}/${product.nameProduct}`, newProduct)
                    .then(data => {
                        if (data.result) {
                            this.cartItems.push(newProduct);
                        }
                    })
            }
        },
        removeProduct(product) {
            if (product.quantity > 1) {
                this.$parent.putJson(`/api/cart/${product.id_product}/${product.nameProduct}`, { quantity: -1 })
                    .then(data => {
                        if (data.result) {
                            product.quantity--;
                        }
                    })
            } else {
                this.$parent.delJson(`/api/cart/${product.id_product}/${product.nameProduct}`, product)
                    .then(data => {
                        if (data.result) {
                            this.cartItems.splice(this.cartItems.indexOf(product), 1);
                        } else {
                            console.log('error');
                        }
                    })
            }
        },
    },
    mounted() {
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                for (let item of data.contents) {
                    this.$data.cartItems.push(item);
                }
            });
    },
    template: `
        <div class="cart content-container" v-show="$root.$refs.showCart.showCart">
            <div class="cart-block">
                <p v-if="!cartItems.length">В корзине ничего нет.</p>
                <cart-item v-for="product of cartItems"
                :key="product.id_product"
                :cartItem="product"
                @remove="removeProduct">
                </cart-item>
            </div>
        </div>
    `
});

Vue.component('cart-item', {
    props: ['cartItem'],
    template: `
        <div class="cart-item">
            <div class="cart-item-left-block">
                <img :src="cartItem.imgProduct" alt="IMG">
                <div class="cart-item-text-wrp">
                    <p class="cart-item-title">{{cartItem.nameProduct}}</p>
                    <p class="cart-item-quantity">Количество: {{cartItem.quantity}}</p>
                    <p class="cart-item-single-price">{{cartItem.price}}$ за шт.</p>
                </div>
            </div>
            <div class="cart-item-right-block">
                <p class="cart-item-price">{{cartItem.quantity * cartItem.price}} $</p>
                <button class="cart-item-del-btn" @click="$emit('remove', cartItem)">&times;</button>
            </div>
        </div>
    `
});