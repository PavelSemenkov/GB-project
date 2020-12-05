'use strict';

Vue.component('header-main', {
    template: '<header>New Header</header>'
});

const catalogueRender = new Vue ({
   el: "#catalogue",
   data: {
       items: [],
       goodsCard: '.cart-order',
   },
    methods: {
       getData() {
           fetch(
               "https://raw.githubusercontent.com/PavelSemenkov/GB-project/JS2Lesson03/response/products.json",
               {
                   method: 'GET',
                   headers: {},
                   // body: ''
               }
           ).then(res => res.json()).then(res =>{
               this.items = res;
           });
       },
        addToCart(event) {
                    let button = event.currentTarget;
                    let cardMainBlock = button.parentNode.parentNode;
                    let orderProductImage = cardMainBlock.querySelector('.product-photo').src;
                    let orderProductPrice = cardMainBlock.querySelector('.index-product-price').innerText;
                    let orderProductName = cardMainBlock.querySelector('.featured-item-text > p').innerText;
                    let orderItem = {"product_name": orderProductName,"price": orderProductPrice,"product_photo_src": orderProductImage};
                    cart.goodsList.push(orderItem);
                    cart.cartRender();
                    this.goodsSum();
        },
        goodsSum() {
           let check = n => (n === undefined || isNaN(n)) ? 0 : n;
           cart.total = 0;
           cart.total = cart.goodsList.reduce(function(sum, current) {
               return (check(parseInt(sum)) + (check(parseInt(current.price))));
            }, 0)
            document.getElementById('cart-total').innerHTML = ('$' + cart.total);
        }
    }
});
catalogueRender.getData();

const app = new Vue({
    el: '#root',
    data: {
        searchLine: '',
    },
    computed: {
    },
    methods: {
        filteredGoods(event) {
            event.preventDefault();
            let allGoods = document.querySelectorAll('.featured-items');
            let regexSearch = new RegExp(this.searchLine, "gi");
            allGoods.forEach((element) => {
                    let orderProductName = element.querySelector('.featured-item-text > p').innerText;
                    if (orderProductName.match(regexSearch)) {
                        document.querySelector('.featured-items-box').scrollIntoView({
                            block: "center",
                            behavior: "smooth"
                        });
                        element.style.display = 'flex';
                    } else if (this.searchLine === "") {
                        element.style.display = 'flex';
                    } else {
                        element.style.display = 'none';
                    }
            });
        }
    }
});

const cart = new Vue ({
    el: "#menucart",
    data: {
        goodsList: [],
        listRender: [],
        total: 0,
        timer: 0
    },
    methods: {
        cartRender() {
            if (this.goodsList.length === 0) {
                return true;
            } else {
                this.listRender = this.goodsList;
                return false;
            }
        },
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
        },
        isVisibleCart() {
            document.querySelector('.cart-box-dropdown').style.display = "block"
            clearTimeout(this.timer);
        },
        isHidingCart(){
            this.timer = setTimeout(() => {
                document.querySelector('.cart-box-dropdown').style.display = "none"
            },
                1000);
        }
    }
});
