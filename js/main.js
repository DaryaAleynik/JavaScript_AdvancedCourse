const products = [
    { id: 1, title: 'Notebook', price: 2000, imgPath: 'img/notebook.jpg' },
    { id: 2, title: 'Mouse', price: 20, imgPath: 'img/mouse.jpg' },
    { id: 3, title: 'Keyboard', price: 200, imgPath: 'img/keyboard.jpg' },
    { id: 4, title: 'Gamepad', price: 50, imgPath: 'img/gamepad.jpg' },
];

//Функция для формирования верстки каждого товара
const renderProduct = (item) => {
    return `<article class="product-item">
                <div class="product-item-photo">
                    <img src="${item.imgPath}" alt="${item.title}">
                </div>
                <div class="product-item-text-wrp">
                    <h3 class="product-item-title">${item.title}</h3>
                    <p class="product-item-price">${item.price} $</p>
                </div>
                <button class="product-item-buy-btn">Купить</button>
            </article>`
};

const renderPage = list => {
    const productsList = list.map(item => renderProduct(item));
    document.querySelector('.products-list').innerHTML = productsList.join('');
};

renderPage(products);

// 3. * Сейчас после каждого товара на странице выводится запятая. Из-за чего это происходит? Как это исправить?
/*
 При присваивании массива свойству .innerHTML, у него автоматически вызывается метод .toString, который эквивалентен вызову метода .join(',').
 Чтобы исправить это, нужно вызвать .join явно, передав ему в качества параметра пустую строку:.innerHTML = productsList.join('');
*/