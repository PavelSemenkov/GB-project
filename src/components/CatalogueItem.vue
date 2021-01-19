<template>
  <div class="featured-items">
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
    <div class="product_id">{{ product_id }}</div>
    <div class="featured-item-text">
      <p>{{ name }}</p>
      <h6>$<span class="index-product-price">{{ price }}</span></h6>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CatalogueItem',
  props: ['image', 'name', 'price', 'product_id'],
  data () {
    return {
      goodsList: []
    }
  },
  methods: {
    addToCart(event) {
      let button = event.currentTarget;
      let cardMainBlock = button.parentNode.parentNode;
      let orderProductId = cardMainBlock.querySelector('.product_id').innerText;
      window.localStorage.setItem(localStorage.length.toString(), orderProductId);
      document.querySelector('.cart__amount').style.display = 'flex';
      document.querySelector('.cart__amount').innerHTML++;
      // fetch(
      //     'http://localhost:8080/data/cart.json',
      //     {
      //       method: 'POST',
      //       body: JSON.stringify(orderProductId)
      //     }
      // ).then(res => res.json()).then(res => {
      //   if(res?.result) {
      //     this.goodsList.push(orderProductId);
      //   }
      // }).catch(console.error);
      // Пришлось закомментировать фетч потому, что он не работает, пишет 404 ошибку, хотя вручную если прописать путь до джсона, то он вполне открывается.
      // И по аналогии с остальными фетчами он должен работать, но не работает.
    },
  }
};
</script>

<style>

</style>