'use strict';
window.sessionStorage.clear();
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
      data() {
          return {
              items: []
          }
      },
    mounted() {
        fetch(
        "./data/products.json",
        {
            method: 'GET',
            headers: {},
            }
            ).then(res => {
                return res.json();
            }).then(res => {
                this.items = res;
        });
    }
})


Vue.component('catalogue', {
    template: `<div class="featured-items-box container" id="catalogue">
                    <catalogue-item v-for="(item, id) in items"
                       :key="\`catalogue_\${id}\`"
                       :image="item.product_photo_src"
                       :price="item.price"
                       :name="item.product_name"
                       :product_id="item.id_product"             
                    />
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
                    <div class="product_id">{{product_id}}</div>
                    <div class="featured-item-text">
                      <p>{{name}}</p>
                      <h6>$<span class="index-product-price">{{price}}</span></h6>
                    </div>
               </div>`,
    props: ['image', 'name', 'price', 'product_id'],
    methods: {
        addToCart(event) {
            let button = event.currentTarget;
            let cardMainBlock = button.parentNode.parentNode;
            let orderProductId = cardMainBlock.querySelector('.product_id').innerText;
            window.sessionStorage.setItem(orderProductId, 'id');
            document.querySelector('.cart__amount').style.display = 'flex';
            document.querySelector('.cart__amount').innerHTML++;
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
                    <a class="cart"><img src="img/cart.png" alt="cart" @mouseover="isVisibleCart" v-on:mouseover="cartList"/>
                    <div class="cart__amount"></div></a>
                    <a href="#" class="my_account_box">My Account <i class="fas fa-caret-down fas2"></i></a>
               </div>`,
    data() {
        return {
            goodsList: [],
            listRender: [],
        }
    },
    methods: {
        isVisibleCart() {
            document.querySelector('.cart-box-dropdown').style.display = "block"
            clearTimeout(this.timer);
        },
        isHidingCart() {
            this.timer = setTimeout(() => {
                    document.querySelector('.cart-box-dropdown').style.display = "none"
                },
                1000);
        },
        cartList() {
            let arr = [];
            if (window.sessionStorage.length === 0) {
                return null;
            }
            if (parseInt((document.getElementById('cart-total').innerHTML).slice(1,5)) === 0) {
                this.listRender = [];
            }
            for (let i = 0; i < window.sessionStorage.length; i++) {
                    let key = sessionStorage.key(i);
                    arr.push(key)
                }
                fetch(
                    "./data/products.json",
                    {
                        method: 'GET',
                        headers: {},
                    }
                ).then(res => {
                    return res.json();
                }).then(res => {
                    let goods = res;
                    arr.forEach((id) => {
                        for (let i of goods) {
                            if (i.id_product === parseInt(id)) {
                                this.listRender.push(i)
                            }
                        }
                    });
                });
            window.sessionStorage.clear();
            this.cartSum();
            return this.listRender;
        },
        cartSum() {
            setTimeout(() => {
                let check = n => (n === undefined || isNaN(n)) ? 0 : n;
                this.total = 0;
                this.total = this.listRender.reduce(function(sum, current) {
                    return (check(parseInt(sum)) + (check(parseInt(current.price))));
                }, 0)
                document.getElementById('cart-total').innerHTML = ('$' + this.total);
            }, 10)
        },
    },
});

Vue.component('basket', {
    template: `<div class="cart-contain-box">
                    <div class="cart-contain-box__items">
<!--                      <span class ='empty_cart'>Нет данных</span>-->
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
    },
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
    props:['image', 'price', 'name'],
    methods: {
        removeItem(event) {
            let delButton = event.currentTarget;
            let cartItemBlock = delButton.parentNode.parentNode;
            let cartItemPrice = cartItemBlock.querySelector('.cart-product__info__price > span').innerHTML;
            delButton.parentNode.parentNode.remove();
            this.total = parseInt((document.getElementById('cart-total').innerHTML).slice(1,5)) - parseInt(cartItemPrice);
            document.getElementById('cart-total').innerHTML = ('$' + this.total);
            document.querySelector('.cart__amount').innerHTML--;
            if (document.querySelector('.cart__amount').innerHTML === '0') {
                this.total = 0;
                document.querySelector('.cart__amount').style.display = 'none';
            }
        }
    }
});

// const app = new Vue({
//     el: '#root'
// });

const cart = new Vue ({
    el: "#menucart"
});
