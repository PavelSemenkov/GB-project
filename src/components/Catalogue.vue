<template>
  <div class="featured-items-box container" id="catalogue">
    <CatalogueItem v-for="(item, id) in items"
                    :key="`catalogue_${id}`"
                    :image="item.product_photo_src"
                    :price="item.price"
                    :name="item.product_name"
                    :product_id="item.id_product"
    />
  </div>
</template>

<script>
import CatalogueItem from './CatalogueItem.vue';
export default {
  name: 'Catalogue',
  components: {
    CatalogueItem
  },
  props: {
    items: {
      type: Array,
      required: false,
      default: () => []
    }
  }
};
</script>

<style>

</style>