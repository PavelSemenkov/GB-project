<template>
  <div>
    <div class="cart-box-dropdown" @mouseover="isVisibleCart">
      <div class="cart-box" @mouseleave="isHidingCart">
        <Basket :listRender="listRender"/>
      </div>
    </div>
    <a class="cart"><img src="img/cart.png" alt="cart" @mouseover="isVisibleCart"/> <!--v-on:mouseover="cartList"-->
      <div class="cart__amount"></div>
    </a>
    <a href="#" class="my_account_box">My Account <i class="fas fa-caret-down fas2"></i></a>
  </div>
</template>

<script>
import Basket from './Basket.vue';

export default {
  name: 'BasketBox',
  components: {
    Basket
  },
  data() {
    return {
      goodsList: [],
      listRender: [],
    }
  },
  mounted() {
    setTimeout(() => {
      if (window.localStorage.getItem('loglevel:webpack-dev-server')) {
        window.localStorage.removeItem('loglevel:webpack-dev-server');
      }
      if (window.localStorage.length !== 0) {
        let arr = [];
        document.querySelector('.cart__amount').innerHTML = window.localStorage.length.toString();
        if (document.querySelector('.cart__amount').innerHTML === '0') {
          this.total = 0;
          document.querySelector('.cart__amount').style.display = 'none';
        } else {
          document.querySelector('.cart__amount').style.display = 'flex';
        }
        for (let i = 0; i < window.localStorage.length; i++) {
          let key = window.localStorage.getItem(i.toString());
          arr.push(key)
        }
        fetch(
            "http://localhost:8080/data/products.json",
            {
              method: 'GET',
              headers: {},
            }
        ).then(res => {
          return res.json();
        }).then(res => {
          this.listRender = [];
          arr.forEach((id) => {
            for (let i of res) {
              if (i.id_product === parseInt(id)) {
                this.listRender.push(i)
              }
            }
          });
        });
        this.cartSum();
        return this.listRender;
      }
    }, 1000);
    document.querySelector('.cart__amount').addEventListener('DOMSubtreeModified', () => {
      let arr = [];
      if (window.localStorage.length === 0) {
        this.listRender = [];
        return this.listRender;
      }
      if (parseInt((document.getElementById('cart-total').innerHTML).slice(1, 5)) === 0) {
        this.listRender = [];
      }
      for (let i = 0; i < window.localStorage.length; i++) {
        let key = window.localStorage.getItem(i.toString());
        arr.push(key)
      }
      fetch(
          "http://localhost:8080/data/products.json",
          {
            method: 'GET',
            headers: {},
          }
      ).then(res => {
        return res.json();
      }).then(res => {
        this.listRender = [];
        arr.forEach((id) => {
          for (let i of res) {
            if (i.id_product === parseInt(id)) {
              this.listRender.push(i)
            }
          }
        });
      });
      this.cartSum();
      return this.listRender;
    });
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
    cartSum() {
      setTimeout(() => {
        let check = n => (n === undefined || isNaN(n)) ? 0 : n;
        this.total = 0;
        this.total = this.listRender.reduce(function (sum, current) {
          return (check(parseInt(sum)) + (check(parseInt(current.price))));
        }, 0)
        document.getElementById('cart-total').innerHTML = ('$' + this.total);
      }, 10)
    },
  },
};
</script>

<style>

</style>