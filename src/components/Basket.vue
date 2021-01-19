<template>
  <div class="cart-contain-box">
    <div class="cart-contain-box__items">
      <!--                      <span class ='empty_cart'>Нет данных</span>-->
      <BasketItem v-for="(item, id) in listRender"
                  :key="`catalogue_${id}`"
                  :image="item.product_photo_src"
                  :price="item.price"
                  :name="item.product_name"
                  :product_id="item.id_product"
      />
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
  </div>
</template>

<script>
import BasketItem from './BasketItem.vue';

export default {
  name: 'Basket',
  components: {
    BasketItem
  },
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
};
</script>

<style>

</style>