class Cart {
    constructor(container = '.cart') {
        this.container = container;
    }

    // Метод для добавления товара в корзину
    addToCart(product) { }

    // Метод для удаления товара из корзины
    removeFromCart(product) { }

    // Метод для подсчёта количества товаров в корзине
    _getCartTotalCount() { }

    // Метод для подсчёта итоговой цены всех товаров в корзине
    _getCartTotalPrice() { }
}


class CartItem {
    constructor(product) {
        this.id = product.id;
        this.title = product.title;
        this.price = product.price;
    }

    // Метод для получения разметки для товара в корзине
    render() { }
}