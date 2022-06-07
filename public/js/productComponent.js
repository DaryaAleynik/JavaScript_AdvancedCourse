Vue.component('products', {
    data() {
        return {
            catalogUrl: '/catalogData.json',
            filtered: [],
            products: [],
            imgProduct: 'https://placehold.it/200x150'
        }
    },
    mounted() {
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for (let item of data) {
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                }
            });
    },
    methods: {
        filter(userSearch) {
            let regExp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(el => regExp.test(el.product_name));
        }
    },
    template:
        `
            <div class="products-list">
                <product v-for="product of filtered" 
                :key="product.id_product"
                :img="product.imgProduct"
                :product="product">    
                @add-product="$parent.$refs.cart.addProduct">      
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
            <button class="product-item-buy-btn" @click="$emit('add-product', product)">Купить</button>
        </article> 
        `
})