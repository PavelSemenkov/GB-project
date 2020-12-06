'use strict';

Vue.component('main-page', {
    template: `<search v-on:search="filteredGoods"/>`,
    data() {
        return {
            searchText: ''
        }
    },
    methods: {
        filteredGoods(searchText) {
            let allGoods = document.querySelectorAll('.featured-items');
            let regexSearch = new RegExp(searchText, "gi");
            allGoods.forEach((element) => {
                let orderProductName = element.querySelector('.featured-item-text > p').innerText;
                if (orderProductName.match(regexSearch)) {
                    document.querySelector('.featured-items-box').scrollIntoView({
                        block: "center",
                        behavior: "smooth"
                    });
                    element.style.display = 'flex';
                } else if (searchText === "") {
                    element.style.display = 'flex';
                } else {
                    element.style.display = 'none';
                }
            });
        }
    }
})

Vue.component('search', {
    template: `<label>
                  <input
                    type="text"
                    name="search"
                    class="search_bar"
                    placeholder="Search for Item..."
                    v-model="search"
                  />
                  <button @click="() => $emit('search', search)"><i class="fas fa-search"></i></button>
                </label>`,
    data() {
        return {
            search: ''
        };
    }
});



Vue.component('catalogue-section', {
    template: `<catalogue :items="items"/>`,
    data () {
        return {
            items: [
                {
                    product_name: "Куртка",
                    price: 120,
                    product_photo_src: "img/featured_item_1.png",
                },
                {
                    product_name: "Рубашка",
                    price: 50,
                    product_photo_src: "img/featured_item_2.png",
                },
                {
                    product_name: "Брюки",
                    price: 70,
                    product_photo_src: "img/featured_item_3.png",
                },
                {
                    product_name: "Футболка",
                    price: 150,
                    product_photo_src: "img/featured_item_4.png",

                },
                {
                    product_name: "Куртка",
                    price: 230,
                    product_photo_src: "img/featured_item_5.png",
                },
                {
                    product_name: "Футболка",
                    price: 45,
                    product_photo_src: "img/featured_item_6.png",
                },
                {
                    product_name: "Брюки",
                    price: 120,
                    product_photo_src: "img/featured_item_7.png",
                },
                {
                    product_name: "Футболка",
                    price: 77,
                    product_photo_src: "img/featured_item_8.png",
                }
            ]
        };
    }
})


Vue.component('catalogue', {
    template: `<div class="featured-items-box container" id="catalogue">
                    <catalogue-item v-for="(item, id) in items"
                       :key="\`catalogue_\${id}\`"
                       :image="item.product_photo_src"
                       :price="item.price"
                       :name="item.product_name"/>
               </div>`,
    props: {
        items: {
            type: Array,
            required: false,
            default: () => []
        }
    }
});

Vue.component('catalogue-item', {
    template: `<div class="featured-items">
                    <img v-bind:src="image" alt="product" class="product-photo">
                    <div class="layers">
                      <div class="hover-layer">
                        <img src="img/dark_layer.png" alt="hover">
                      </div>
                      <a class="cart-order" @click="addToCart">
                        <div class="">
                          <img src="img/cart.svg" alt="cart">
                        </div>
                        <p>Add to cart</p>
                      </a>
                      <div class="white-layer"></div>
                    </div>
                    <div class="featured-item-text">
                      <p>{{name}}</p>
                      <h6>$<span class="index-product-price">{{price}}</span></h6>
                    </div>
               </div>`,
    props: ['image', 'name', 'price'],
    methods: {
        addToCart(event) {
            let button = event.currentTarget;
            let cardMainBlock = button.parentNode.parentNode;
            let orderProductImage = cardMainBlock.querySelector('.product-photo').src;
            let orderProductPrice = cardMainBlock.querySelector('.index-product-price').innerText;
            let orderProductName = cardMainBlock.querySelector('.featured-item-text > p').innerText;
            let orderItem = {product_name: orderProductName, price: orderProductPrice, product_photo_src: orderProductImage};
            // this.goodsList.push(orderItem);
            this.$root.$emit('addToBasket', orderItem);
            this.$root.$emit('cartRender');
            this.$root.$emit('goodsSum');
        },
    }
});

const catalogueBox = new Vue ({
    el: "#catalogue-box"
});

Vue.component('basket-box', {
    template: `<div>
                    <div class="cart-box-dropdown" @mouseover="isVisibleCart">
                        <div class="cart-box" @mouseleave="isHidingCart">
                            <basket :listRender="listRender"/>
                        </div>
                    </div>
                    <a href="shopping_cart.html" class="cart"><img src="img/cart.png" alt="cart" @mouseover="isVisibleCart"/></a>
                    <a href="#" class="my_account_box">My Account <i class="fas fa-caret-down fas2"></i></a>
               </div>`,
    data() {
        return {
            goodsList: [],
            listRender: []
        }
    },
    methods: {
        isVisibleCart() {
            document.querySelector('.cart-box-dropdown').style.display = "block"
            clearTimeout(this.timer);
        },
        isHidingCart(){
            this.timer = setTimeout(() => {
                    document.querySelector('.cart-box-dropdown').style.display = "none"
                },
                1000);
        },
        cartRender(orderItem) {
            if (this.goodsList.length === 0) {
                return true;
            } else {
                this.goodsList.push(orderItem);
                this.listRender = this.goodsList;
                return false;
            }
        },
    },
    mounted() {
        this.$root.$on('addToBasket', (orderItem) => {
            this.goodsList.push(orderItem);
        });
    }
});

Vue.component('basket', {
    template: `<div class="cart-contain-box">
                    <div class="cart-contain-box__items">
                      <span v-if="() => $root.$on('cartRender')">Нет данных</span>
                      <basket-item v-for="(item, id) in listRender"
                       :key="\`catalogue_\${id}\`"
                       :image="item.product_photo_src"
                       :price="item.price"
                       :name="item.product_name"/>
                    </div>
                    <div class="cart-contain-box__total">
                      <div>TOTAL</div>
                      <span id="cart-total"></span>
                    </div>
                    <button class="cart-contain-box__button-checkout">
                      Checkout
                    </button>
                    <button class="cart-contain-box__button-go-to-cart">
                      Go to cart
                    </button>
                  </div>`,
    data() {
        return {
            total: 0,
            timer: 0
        }
    },
    props: {
        listRender: {
            type: Array,
            required: false,
            default: () => []
        },
        goodsList: {
            type: Array,
            required: false,
            default: () => []
        }
    },
    methods: {
        removeItem(event) {
            let delButton = event.currentTarget;
            let cartItemBlock = delButton.parentNode.parentNode;
            let cartProductName = cartItemBlock.querySelector('.cart-product__info__name').innerText;
            delButton.parentNode.parentNode.remove;
            let index = this.goodsList.findIndex(n => n.product_name === cartProductName);
            if (index !== -1) {
                this.goodsList.splice(index, 1)
            }
            let check = n => (n === undefined || isNaN(n)) ? 0 : n;
            this.total = 0;
            this.total = this.goodsList.reduce(function(sum, current) {
                return (check(parseInt(sum)) + (check(parseInt(current.price))));
            }, 0)
            document.getElementById('cart-total').innerHTML = ('$' + this.total);
        }
    },
    mounted() {
        this.$root.$on('cartRender', () => {
            if (this.goodsList.length === 0) {
                return true;
            } else {
                this.listRender = this.goodsList;
                return false;
            }
        });
    },
    function() {
        this.$root.$on('goodsSum', () => {
            let check = n => (n === undefined || isNaN(n)) ? 0 : n;
            this.total = 0;
            this.total = this.goodsList.reduce(function(sum, current) {
                return (check(parseInt(sum)) + (check(parseInt(current.price))));
            }, 0)
            document.getElementById('cart-total').innerHTML = ('$' + this.total);
        });
    }
});

Vue.component('basket-item', {
    template: `<div class="cart-product">
                        <div class="cart-product__image">
                          <img v-bind:src="image" alt="product"/>
                        </div>
                        <div class="cart-product__info">
                          <div class="cart-product__info__name">
                            {{name}}
                          </div>
                          <div class="cart-product__info__rating">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                          </div>
                          <div class="cart-product__info__price">
                            $ <span>{{price}}</span>
                          </div>
                        </div>
                        <div class="cart-product__delete">
                          <i class="fas fa-times-circle" @click="removeItem"></i>
                        </div>
                      </div>`,
    props:['image', 'price', 'name']
});

// const catalogueRender = new Vue ({
//    el: "#catalogue",
//    data: {
//        items: [],
//        goodsCard: '.cart-order',
//    },
//     methods: {
//        getData() {
//            fetch(
//                "https://raw.githubusercontent.com/PavelSemenkov/GB-project/JS2Lesson03/response/products.json",
//                {
//                    method: 'GET',
//                    headers: {},
//                    // body: ''
//                }
//            ).then(res => res.json()).then(res =>{
//                this.items = res;
//            });
//        },
//         addToCart(event) {
//                     let button = event.currentTarget;
//                     let cardMainBlock = button.parentNode.parentNode;
//                     let orderProductImage = cardMainBlock.querySelector('.product-photo').src;
//                     let orderProductPrice = cardMainBlock.querySelector('.index-product-price').innerText;
//                     let orderProductName = cardMainBlock.querySelector('.featured-item-text > p').innerText;
//                     let orderItem = {"product_name": orderProductName,"price": orderProductPrice,"product_photo_src": orderProductImage};
//                     cart.goodsList.push(orderItem);
//                     cart.cartRender();
//                     this.goodsSum();
//         },
//         goodsSum() {
//            let check = n => (n === undefined || isNaN(n)) ? 0 : n;
//            cart.total = 0;
//            cart.total = cart.goodsList.reduce(function(sum, current) {
//                return (check(parseInt(sum)) + (check(parseInt(current.price))));
//             }, 0)
//             document.getElementById('cart-total').innerHTML = ('$' + cart.total);
//         }
//     }
// });
// catalogueRender.getData();

const app = new Vue({
    el: '#root'
});

const cart = new Vue ({
    el: "#menucart"
    // data: {
    //     goodsList: [],
    //     listRender: [],
    //     total: 0,
    //     timer: 0
    // },
    // methods: {
    //     cartRender() {
    //         if (this.goodsList.length === 0) {
    //             return true;
    //         } else {
    //             this.listRender = this.goodsList;
    //             return false;
    //         }
    //     },
    //     removeItem(event) {
    //         let delButton = event.currentTarget;
    //         let cartItemBlock = delButton.parentNode.parentNode;
    //         let cartProductName = cartItemBlock.querySelector('.cart-product__info__name').innerText;
    //         delButton.parentNode.parentNode.remove;
    //         let index = this.goodsList.findIndex(n => n.product_name === cartProductName);
    //         if (index !== -1) {
    //             this.goodsList.splice(index, 1)
    //         }
    //         let check = n => (n === undefined || isNaN(n)) ? 0 : n;
    //         this.total = 0;
    //         this.total = this.goodsList.reduce(function(sum, current) {
    //             return (check(parseInt(sum)) + (check(parseInt(current.price))));
    //         }, 0)
    //         document.getElementById('cart-total').innerHTML = ('$' + this.total);
    //     },
    //     isVisibleCart() {
    //         document.querySelector('.cart-box-dropdown').style.display = "block"
    //         clearTimeout(this.timer);
    //     },
    //     isHidingCart(){
    //         this.timer = setTimeout(() => {
    //             document.querySelector('.cart-box-dropdown').style.display = "none"
    //         },
    //             1000);
    //     }
    // }
});
