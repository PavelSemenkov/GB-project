<template>
  <div class="cart-product">
    <div class="cart-product__image">
      <img v-bind:src="image" alt="product"/>
    </div>
    <div class="cart-product__info">
      <div class="cart-product__info__name">
        {{ name }}
      </div>
      <div class="product_id">{{ product_id }}</div>
      <div class="cart-product__info__rating">
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
      </div>
      <div class="cart-product__info__price">
        $ <span>{{ price }}</span>
      </div>
    </div>
    <div class="cart-product__delete">
      <i class="fas fa-times-circle" @click="removeItem"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BasketItem',
  props: ['image', 'price', 'name', 'product_id'],
  methods: {
    removeItem(event) {
      let delButton = event.currentTarget;
      let cartItemBlock = delButton.parentNode.parentNode;
      let cartItemPrice = cartItemBlock.querySelector('.cart-product__info__price > span').innerHTML;
      let cartItemId =  cartItemBlock.querySelector('.product_id').innerHTML;
      for (let i = 0; i < window.localStorage.length; i++) {
        if (window.localStorage.getItem(i.toString()) === cartItemId) {
          window.localStorage.removeItem(i.toString());
          break;
        }
      }
      this.total = parseInt((document.getElementById('cart-total').innerHTML).slice(1, 5)) - parseInt(cartItemPrice);
      document.getElementById('cart-total').innerHTML = ('$' + this.total);
      document.querySelector('.cart__amount').innerHTML--;
      if (document.querySelector('.cart__amount').innerHTML === '0') {
        this.total = 0;
        document.querySelector('.cart__amount').style.display = 'none';
      }
      // fetch(
      //     'http://localhost:8080/data/cart.json',
      //     {
      //       method: 'DELETE',
      //       body: JSON.stringify(cartItemId)
      //     }
      // ).then(res => res.json()).then(res => {
      //   if(res?.result) {
      //     this.goodsList.push(cartItemId);
      //   }
      // }).catch(console.error);
      cartItemBlock.remove;
      // Я не понимаю что здесь происходит. Нигде в гугле не смог найти этому объяснение. Если из выпадающей корзины удалять снизу вверх товары, то всё ок.
      // Но если удалять сверху вниз, то удаляется сразу по 2 дива. Что ещё страннее, если написать remove(), то удаляется по 3 дива сразу. Почему так?
      // Так же пришлось закомментировать фетч потому, что он не работает, пишет 404 ошибку, хотя вручную если прописать путь до джсона, то он вполне открывается.
      // И по аналогии с остальными фетчами он должен работать, но не работает.
    }
  }
};
</script>

<style>

</style>