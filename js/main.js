const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class List {
    constructor(url, container, list = defList) {
        this.list = list;
        this.container = container;
        this.url = url;
        this.goods = [];
    }

    // Метод для получения json-файла
    getJson(url) {
        return fetch(url ? url : `${API + this.url}`)
            .then(result => result.json())
            .catch(error => { console.log(error); })
    }

    // Метод для обработки данных о товарах
    handleData(data) {
        this.goods = [...data];
        this.render();
    }

    // Метод для вывода списка
    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new this.list[this.constructor.name](product);
            block.insertAdjacentHTML("beforeend", productObj.render());
        }
    }

    // Метод для определения сумарной стоимости всех товаров
    _sumProducts() {
        return this.goods.reduce((sum, item) => sum += item.price, 0);
    }
}


class Item {
    constructor(item, img = 'https://placehold.it/200x150') {
        this.id = item.id_product;
        this.name = item.product_name;
        this.price = item.price;
        this.img = img;
    }

    // Метод для формирования верстки каждого товара
    render() {
        return `<article class="product-item" data-id="${this.id}">
                <div class="product-item-photo">
                    <img src="${this.img}" alt="${this.name}">
                </div>
                <div class="product-item-text-wrp">
                    <h3 class="product-item-title">${this.name}</h3>
                    <p class="product-item-price">${this.price} $</p>
                </div>
                <button class="product-item-buy-btn"
                  data-id="${this.id}" data-name="${this.name}"
                  data-price="${this.price}">Купить</button>
            </article>`
    }
}


class ProductList extends List {
    constructor(cart, container = '.products-list', url = "/catalogData.json") {
        super(url, container);
        this.cart = cart;
        this.getJson().then(data => this.handleData(data));
    }

    // Метод для привязки событий
    _init() {
        document.querySelector(this.container).addEventListener('click', e => {
            if (e.target.classList.contains('product-item-buy-btn')) {
                this.cart.addToCart(e.target);
            }
        });
    }
}

class ProductItem extends Item { }


class Cart extends List {
    constructor(container = ".cart-block", url = "/getBasket.json") {
        super(url, container);
        this.getJson().then(data => { this.handleData(data.contents); });
        this._init();
    }

    // Метод для добавления товара в корзину
    addToCart(product) { }

    // Метод для удаления товара из корзины
    removeFromCart(product) { }

    // Метод для обновления информации о продукте в корзине
    _updateCart(product) { }

    // Метод для привязки событий
    _init() {
        document.querySelector('.cart-btn').addEventListener('click', () => {
            document.querySelector(this.container).classList.toggle('invisible');
        });

        document.querySelector(this.container).addEventListener('click', e => {
            if (e.target.classList.contains('cart-item-del-btn')) {
                this.cart.removeFromCart(e.target);
            }
        });
    }
}

class CartItem extends Item {
    constructor(item, img = 'https://placehold.it/50x100') {
        super(item, img);
        this.quantity = item.quantity;
    }

    // Метод для формирования верстки каждого товара
    render() {
        return `<div class="cart-item" data-id="${this.id}">
                    <div class="cart-item-left-block">
                        <img src="${this.img}" alt="${this.name}">
                        <div class="cart-item-text-wrp">
                            <p class="cart-item-title">${this.name}</p>
                            <p class="cart-item-quantity">Количество: ${this.quantity}</p>
                            <p class="cart-item-single-price">${this.price}$ за шт.</p>
                        </div>
                    </div>
                    <div class="cart-item-right-block">
                        <p class="cart-item-price">${this.quantity * this.price} $</p>
                        <button class="cart-item-del-btn" data-id="${this.id}">&times;</button>
                    </div>                    
                </div>`
    }
}

const defList = {
    ProductList: ProductItem,
    Cart: CartItem
}


let cart = new Cart();
let products = new ProductList(cart);
products.getJson(`${API}/catalogData.json`).then(data => products.handleData(data));