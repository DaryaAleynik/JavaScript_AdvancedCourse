class ProductList {
    constructor(container = '.products-list') {
        this.container = container;
        this.goods = [];
        this._fetchProducts();
        this.render();
    }

    // Метод для получения списка продуктов
    _fetchProducts() {
        this.goods = [
            { id: 1, title: 'Notebook', price: 2000, imgPath: 'img/notebook.jpg' },
            { id: 2, title: 'Mouse', price: 20, imgPath: 'img/mouse.jpg' },
            { id: 3, title: 'Keyboard', price: 200, imgPath: 'img/keyboard.jpg' },
            { id: 4, title: 'Gamepad', price: 50, imgPath: 'img/gamepad.jpg' },
        ];
    }

    // Метод для вывода списка товаров на страницу
    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const item = new ProductItem(product);
            block.insertAdjacentHTML("beforeend", item.render());
        }
    }

    // Метод для определения сумарной стоимости всех товаров
    _sumProducts() {
        let sum = 0;
        for (let product of this.goods) {
            sum += product.price;
        }
        return sum;
    }
}


class ProductItem {
    constructor(product) {
        this.title = product.title;
        this.id = product.id;
        this.price = product.price;
        this.img = product.imgPath;
    }

    // Функция для формирования верстки каждого товара
    render() {
        return `<article class="product-item">
                <div class="product-item-photo">
                    <img src="${this.img}" alt="${this.title}">
                </div>
                <div class="product-item-text-wrp">
                    <h3 class="product-item-title">${this.title}</h3>
                    <p class="product-item-price">${this.price} $</p>
                </div>
                <button class="product-item-buy-btn">Купить</button>
            </article>`
    }
}

let list = new ProductList();

console.log(`Суммарна стоимость всех товаров = ${list._sumProducts()} $.`);


// const products = [
//     { id: 1, title: 'Notebook', price: 2000, imgPath: 'img/notebook.jpg' },
//     { id: 2, title: 'Mouse', price: 20, imgPath: 'img/mouse.jpg' },
//     { id: 3, title: 'Keyboard', price: 200, imgPath: 'img/keyboard.jpg' },
//     { id: 4, title: 'Gamepad', price: 50, imgPath: 'img/gamepad.jpg' },
// ];

// //Функция для формирования верстки каждого товара
// const renderProduct = (item) => {
//     return `< article class= "product-item" >
//                 <div class="product-item-photo">
//                     <img src="${item.imgPath}" alt="${item.title}">
//                 </div>
//                 <div class="product-item-text-wrp">
//                     <h3 class="product-item-title">${item.title}</h3>
//                     <p class="product-item-price">${item.price} $</p>
//                 </div>
//                 <button class="product-item-buy-btn">Купить</button>
//             </article>`
// };

// const renderPage = list => {
//     const productsList = list.map(item => renderProduct(item));
//     document.querySelector('.products-list').innerHTML = productsList.join('');
// };

// renderPage(products);