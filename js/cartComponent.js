Vue.component('cart', {
    props: ['cartItems', 'img', 'visibility'],
    template:
        `
                        <div class="cart-block" v-show="visibility">
                            <p v-if="!cartItems.length">В корзине ничего нет.</p>
                            <cart-item v-for="product of cartItems"
                            :key="product.id_product"
                            :img="img"
                            :cart-item="product">
                            </cart-item>
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
                <button class="cart-item-del-btn" @click="$root.removeProduct(cartItem)">&times;</button>
            </div>
        </div>
    `
})