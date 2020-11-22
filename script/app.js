"use strict";

/**
 * Класс карточек товаров с запасом параметров для дополнения и будущих фильтров
 */
class Goods {
    constructor(name, price, size, color, photo, id) {
        this.name = name;
        this.price = price;
        this.size = size;
        this.color = color;
        this.photo = photo;
        this.id = id;
    };

    /**
     * Метод отрисовки блоков товара
     * @returns {string} возвращает разметку с параметрами
     */
    render() {
        return `<div class="featured-items" id="product__${this.id}">
            <img
              src="${this.photo}"
              alt="product"
              class="product-photo"
            />
            <div class="layers">
              <div class="hover-layer">
                <img src="img/dark_layer.png" alt="hover" />
              </div>
              <a class="cart-order">
                <div class="">
                  <img src="img/cart.svg" alt="cart" />
                </div>
                <p>Add to cart</p>
              </a>
              <div class="white-layer"></div>
            </div>
            <div class="featured-item-text">
              <p>${this.name}</p>
              <h6>$<span class="index-product-price">${this.price}</span></h6>
            </div>
          </div>`;
    };
}
// Список товаров на странице Index, добавлены 'лишние' параметры для возможных будущих фильртов
// страницы product
// const arrGoods = [
//     new Goods('T-shirt', 50, 'M', 'black', 'img/featured_item_1.png', 1),
//     new Goods('Bag', 60, 'M', 'black', 'img/featured_item_2.png', 2),
//     new Goods('Shoes', 70, 'M', 'black', 'img/featured_item_3.png', 3),
//     new Goods('T-shirt', 54, 'M', 'black', 'img/featured_item_4.png', 4),
//     new Goods('T-shirt', 52, 'M', 'black', 'img/featured_item_5.png', 5),
//     new Goods('T-shirt', 51, 'M', 'black', 'img/featured_item_6.png', 6),
//     new Goods('T-shirt', 150, 'M', 'black', 'img/featured_item_7.png', 7),
//     new Goods('T-shirt', 250, 'M', 'black', 'img/featured_item_8.png', 8),
// ];

const indexApp = document.querySelector('.featured-items-box');

// for (let el of arrGoods) {
//     indexApp.innerHTML += el.render();
// }

/**
 * Функция парсера из json файла заместо массива arrGoods
 */
const jsonProductParse = () => {
    fetch(
        "response/products.json",
        {
            method: 'GET',
            headers: {},
            // body: ''
        }
    ).then(res => {
        return res.json();
    }).then(res => {
        for (let i of res) {
            const item = new Goods(i.product_name, i.price, i.product_size, i.product_color, i.product_photo_src, i.id_product);
            indexApp.innerHTML += item.render();
        }
        modifyCartIndex.addToCart();
    });
}

jsonProductParse();

/**
 * Не совсем понял 2. задание второго ДЗ. Где добавить расчет суммы всех товаров, в корзине или просто в консоль вывести лог?
 * В любом случае сделал функцию расчета отдельно с записью в лог и в корзине расчет суммы товаров добавленных.
 * @param arrGoods
 */
// function goodsSum (arrGoods) {
//     let Sum = 0;
//     for (let i = 0; i < arrGoods.length; i++) {
//         Sum += arrGoods[i].price;
//     }
//     console.log(Sum);
// }
//
// goodsSum(arrGoods);

/**
 * Класс для модификации корзины, добавления товара, удаления, вычисления суммы.
 * получает на вход имя класса из дом дерева для обработки карточек товаров и кнопок добавления в корзину
 */
class ModifyCart {
    constructor(goodsCard) {
        this.goodsCard = goodsCard;
    }

    /**
     * Метод обработки элемента дом дерева, работает под определенный формат,
     * собирает информацию из карточки товара и передает в метод отрисовки блоков меню корзины.
     * Вызывает расчет суммы товаров после добавления каждого нового товара.
     */
    // Предполагаю, что это очень грубо сделанный метод и по факту в переменные в этом методе
    // должны передаваться данные по индексу напрямую из БД, но пока не знаю как это сделать,
    // сделал заготовку для product__${id} на будущее. Посоветуйте в правильном ли направлении думаю.
    addToCart() {
        document.querySelectorAll(this.goodsCard).forEach((button) =>{
            button.addEventListener('click', (event) => {
                let button = event.currentTarget;
                let cardMainBlock = button.parentNode.parentNode;
                let orderProductImage = cardMainBlock.querySelector('.product-photo').src;
                let orderProductPrice = cardMainBlock.querySelector('.index-product-price').innerText;
                let orderProductName = cardMainBlock.querySelector('.featured-item-text > p').innerText;
                let orderProductId = cardMainBlock.id;
                document.querySelector('.cart-contain-box__items').innerHTML += this.renderCart(orderProductImage, orderProductPrice, orderProductName, orderProductId);

                //Вызов расчета суммы при добавления товара
                this.goodsSum();
            });
        });
    };

    /**
     * Метод отрисовки блоков товаров меню корзины.
     * Получает на вход параметры из карточек товаров
     * @param orderProductImage Ссылка на фото товара для аттрибута src
     * @param orderProductPrice Стоимость товара из карточки товара
     * @param orderProductName Имя товара из карточки товара
     * @param orderProductId Идентификационный номер, по которму из БД вытаскивается информация. *на будущее*
     * @returns {string} Возвращает разметку для верхнего меню корзины.
     */
    renderCart(orderProductImage, orderProductPrice, orderProductName, orderProductId) {
        return `<div class="cart-product" id="${orderProductId}">
                    <div class="cart-product__image">
                        <img src="${orderProductImage}" alt="product"/>
                    </div>
                    <div class="cart-product__info">
                       <div class="cart-product__info__name">
                        ${orderProductName}
                       </div>
                       <div class="cart-product__info__rating">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                       </div>
                       <div class="cart-product__info__price">
                        $ <span>${orderProductPrice}</span>
                       </div>                  
                    </div>
                    <div class="cart-product__delete">
                      <i class="fas fa-times-circle"></i>
                    </div> 
                  </div>`;
    };

    /**
     * Метод расчета суммы товаров в меню корзины
     */
    goodsSum() {
        let total = 0;
        document.querySelector('.cart-contain-box__items').querySelectorAll('.cart-product__info__price > span').forEach((price) => {
            total += parseInt(price.innerText);
            document.getElementById('cart-total').innerHTML = ('$' + total);

            // При добавлении товара цепляем к крестику метод удаления товара и передаем сумму товаров
            // для редактирования при удалении.
            this.cartItemRemove(total);
        });

    };

    /**
     * Метон удаления товара из меню корзины
     * @param total Сумма товаров
     */
    cartItemRemove(total) {
        document.querySelector('.cart-contain-box__items').querySelectorAll('.cart-product__delete > i').forEach( function (element) {
            element.addEventListener('click', function (event) {
                let delButton = event.currentTarget;
                total -= parseInt(delButton.parentNode.parentNode.querySelector('.cart-product__info__price > span').innerText);
                document.getElementById('cart-total').innerHTML = ('$' + total);
                delButton.parentNode.parentNode.remove();
            });
        });
    };
}

const modifyCartIndex = new ModifyCart('.cart-order');

/**
 * Класс для скрытия и показа окна в меню корзины при наведении мышки.
 */
//Прошу подсказать как тут обнулить таймаут при повторном наведении мышки.
//мучаюсь и не могу понять как указать на таймаут стрелочной функции извне, чтобы его обнулять.
//Пробовал clearTimeout, но похоже не понимаю где точно находится таймаут, чтобы на него указать.
class CartViewHide {
    cartView () {
        document.querySelector('.cart').addEventListener('mouseover', function () {
            document.querySelector('.cart-box-dropdown').style.display = "block";
        });
        document.querySelector('.cart-box').addEventListener('mousemove', function () {
            document.querySelector('.cart-box-dropdown').style.display = "block";
        });
    }

    cartHide() {
        document.querySelector('.cart-box-dropdown').addEventListener('mouseleave', function t() {
            setTimeout(() => {
                this.style.display = "none";
            }, 2000);
        });
    };
}

const showCart = new CartViewHide();
showCart.cartView();
showCart.cartHide();


/*  В Методичке куча неиспользуемых и не представленных на уроке XML запросов:
    if (window.ActiveXObject) {
    new ActiveXObject("Microsoft.XMLHTTP");
    К тому же там var использован.
    Я загрузил и посмотрел ответ в консоли, в итоге я сделал вот этот код по аналогии с промисами.
    Похоже работает, но возможно я что-о неверно сделал.
    Буду благодарен за поправки и советы.
*/
let errorCounter = 0;
const makeGETRequest = (url) => {
    fetch(
        url,
        {
            method: 'GET',
            headers: {}
        }
    ).then(res => {
        return res.json();
    }).then(res => {
        errorCounter = 0;
        console.log(res);
    }).catch(error => {
        setTimeout(
            () => {
                if (errorCounter < 4)
                {
                    makeGETRequest(url);
                    errorCounter++;
                } else {
                    return(alert(`Превышен лимит ошибок ${error}`));
                }
            },
            2000
        );
    });
}
const api_url = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

//Специально стерта последняя буква для проверки .catch с таймером
makeGETRequest(`${api_url}/AddToBaske.json`);