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
// const jsonProductParse = () => {
//     fetch(
//         "https://raw.githubusercontent.com/PavelSemenkov/GB-project/JS2Lesson03/response/products.json",
//         {
//             method: 'GET',
//             headers: {},
//             // body: ''
//         }
//     ).then(res => {
//         return res.json();
//     }).then(res => {
//         for (let i of res) {
//             const item = new Goods(i.product_name, i.price, i.product_size, i.product_color, i.product_photo_src, i.id_product);
//             indexApp.innerHTML += item.render();
//         }
//         modifyCartIndex.addToCart();
//     });
// };
//
// jsonProductParse();

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
        this.total = 0;
    }

    /**
     * Метод обработки элемента дом дерева, работает под определенный формат,
     * собирает информацию из карточки товара и передает в метод отрисовки блоков меню корзины.
     * Вызывает расчет суммы товаров после добавления каждого нового товара.
     */
    // Предполагаю, что это очень грубо сделанный метод и по факту в переменные в этом методе
    // должны передаваться данные по индексу напрямую из БД, но пока не знаю как это сделать,
    // сделал заготовку для product__${id} на будущее. Посоветуйте в правильном ли направлении думаю.
    // addToCart() {
    //     document.querySelectorAll(this.goodsCard).forEach((button) => {
    //         button.addEventListener('click', (event) => {
    //             let button = event.currentTarget;
    //             let cardMainBlock = button.parentNode.parentNode;
    //             let orderProductImage = cardMainBlock.querySelector('.product-photo').src;
    //             let orderProductPrice = cardMainBlock.querySelector('.index-product-price').innerText;
    //             let orderProductName = cardMainBlock.querySelector('.featured-item-text > p').innerText;
    //             let orderProductId = cardMainBlock.id;
    //             document.querySelector('.cart-contain-box__items').innerHTML += this.renderCart(orderProductImage, orderProductPrice, orderProductName, orderProductId);
    //
    //             //Вызов расчета суммы при добавления товара
    //             this.goodsSum(orderProductPrice);
    //
    //             //Запросы к апи заглушке при добавлении товара
    //             this.addToApiCart();
    //         });
    //     });
    // };

    /**
     * Обращение к заглушке к addToBasket
     */
    addToApiCart() {
        fetch(
            'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/addToBasket.json',
            {
                method: 'GET',
                headers: {}
            }
        ).then(res => {
            return res.json();
        }).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
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
    goodsSum(orderProductPrice) {
        this.total += parseInt(orderProductPrice);
        document.getElementById('cart-total').innerHTML = ('$' + this.total);
        this.cartItemRemove();
    };

    /**
     * Метон удаления товара из меню корзины
     */
    cartItemRemove() {
        document.querySelector('.cart-contain-box__items').querySelectorAll('.cart-product__delete > i').forEach( (element) => {
            element.addEventListener('click', (event) => {
                let delButton = event.currentTarget;
                this.total -= parseInt(delButton.parentNode.parentNode.querySelector('.cart-product__info__price > span').innerText);
                document.getElementById('cart-total').innerHTML = ('$' + this.total);
                delButton.parentNode.parentNode.remove();
                this.removeFromApiCart();
            });
        });
    };
    /**
     * Обращение к заглушке к deleteFromBasket
     */
    removeFromApiCart() {
        fetch(
            'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/deleteFromBasket.json',
            {
                method: 'GET',
                headers: {}
            }
        ).then(res => {
            return res.json();
        }).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
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
// class CartViewHide {
//     cartView () {
//         document.querySelector('.cart').addEventListener('mouseover', function () {
//             document.querySelector('.cart-box-dropdown').style.display = "block";
//         });
//         document.querySelector('.cart-box').addEventListener('mousemove', function () {
//             document.querySelector('.cart-box-dropdown').style.display = "block";
//         });
//     }
//
//     cartHide() {
//         document.querySelector('.cart-box-dropdown').addEventListener('mouseleave', function t() {
//             setTimeout(() => {
//                 this.style.display = "none";
//             }, 2000);
//         });
//     };
// }

// const showCart = new CartViewHide();
// showCart.cartView();
// showCart.cartHide();

// const api_url = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
//
// function makeGETRequest(url) {
//     return  new Promise((resolve) => {
//         let xhr;
//
//         if (window.XMLHttpRequest) {
//             xhr = new XMLHttpRequest();
//         } else if (window.ActiveXObject) {
//             xhr = new ActiveXObject("Microsoft.XMLHTTP");
//         }
//
//         xhr.onreadystatechange = () => {
//             if (xhr.readyState === 4) {
//                 resolve(xhr.responseText);
//             }
//         }
//         xhr.open('GET', url, true);
//         xhr.send()
//     });
// }
//
// let promise = makeGETRequest(`${api_url}/deleteFromBasket.json`);
// promise.then(res => {
//     return JSON.parse(res)
// }).then(res =>{
//     console.log(res);
// }).catch(err => {
//     console.log(err);
// });

//Регулярные выражения 1-ая часть ДЗ
let str = document.querySelector('.regex-test').innerText;
let replace = function (testObject) {
       return testObject.replace(/(?<=\W)'|'(?=\W)/gm, '"');
}
document.querySelector('.regex-test').innerText = replace(str);

// class Search {
//     constructor() {
//         this.product_name = '';
//         this.searchBar = document.querySelector('.search_bar');
//         this.searchButton = document.querySelector('.header__search > button')
//     }
//
//     init() {
//         this.getSearchText();
//         this.goToItemsList();
//     }
//
//     getSearchText() {
//         setTimeout(
//             () => {
//                 this.searchBar.addEventListener('change', () =>{
//                         this.product_name = this.searchBar.value;
//                         this.changeItemsView();
//                         });
//             },
//             1000
//         );
//     };
//
//     goToItemsList() {
//         this.searchButton.addEventListener('click', (event) => {
//             event.preventDefault();
//             document.querySelector('.featured-items-box').scrollIntoView({block: "center", behavior: "smooth"});
//         })
//     }
//
//     changeItemsView() {
//         let allGoods = document.querySelectorAll('.featured-items');
//         allGoods.forEach((element) => {
//             let orderProductName = element.querySelector('.featured-item-text > p').innerText;
//             if (orderProductName.toUpperCase() === this.product_name.toUpperCase()) {
//                 element.style.display = 'flex';
//             } else if (this.product_name === "") {
//                 element.style.display = 'flex';
//             } else {
//                 element.style.display = 'none';
//             }
//         });
//         this.getSearchText();
//     };
// }
//
// const startSearching = new Search();
// startSearching.init();

function validateContactForm() {
    let name = document.getElementById('name');
    if(name.value.length === 0 || !name.value.match(/[А-Яа-я]/)) {
        document.querySelector('.wrong_name').style.display = 'flex';
        name.style.borderColor = 'red';
        return false;
    }  else {
        document.querySelector('.wrong_name').style.display = 'none';
        name.style.borderColor = 'grey'
    }

    let phone = document.getElementById('tel');
    if(phone.value.length === 0 || phone.value.length > 15 || !phone.value.match(/\+7\(\d{3}\)\d{3}-\d{4}/g)) {
        document.querySelector('.wrong_tel').style.display = 'flex';
        phone.style.borderColor = 'red';
        return false;
    } else {
        document.querySelector('.wrong_tel').style.display = 'none';
        phone.style.borderColor = 'grey'
    }

    let email = document.getElementById('emailforcontact');
    if(email.value.length === 0 || !email.value.match(/^[A-Za-z]+@mail.ru$/g) && !email.value.match(/^[A-Za-z]+\.[A-Za-z]+@mail.ru$/g) && !email.value.match(/^[A-Za-z]+-[A-Za-z]+@mail.ru$/g)) {
        document.querySelector('.wrong_email').style.display = 'flex';
        email.style.borderColor = 'red';
        return false;
    } else {
        document.querySelector('.wrong_email').style.display = 'none';
        phone.style.borderColor = 'grey'
    }
    return true;
}
document.querySelector('.contact_box').setAttribute('onsubmit',"return validateContactForm()");

//У меня похоже мозг плавится. Я не могу понять почему email не проходит проверку, ведь я проверял регулярки через regex101, там все работает.
//Прошу подсказать где я туплю. Благодарю