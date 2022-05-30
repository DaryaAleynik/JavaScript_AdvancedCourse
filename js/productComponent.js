Vue.component('products', {
    props: ['products', 'img'],
    template:
        `
            <div class="products-list">
                <product v-for="product of products" 
                :key="product.id_product"
                :img="img"
                :product="product">          
                </product>
            </div>
        `
});

Vue.component('product', {
    props: ['product', 'img'],
    template:
        `
        <article class="product-item">
            <div class="product-item-photo">
                <img :src="img" alt="IMG">
            </div>
            <div class="product-item-text-wrp">
                <h3 class="product-item-title">{{product.product_name}}</h3>
                <p class="product-item-price">{{product.price}} $</p>
            </div>
            <button class="product-item-buy-btn" @click="$parent.$emit('add-product', product)">Купить</button>
        </article> 
        `
})