<template>
  <catalogue :items="items"/>
</template>

<script>
import Catalogue from './Catalogue.vue'
export default {
  name: 'CatalogueSection',
  components: {Catalogue},
  data() {
    return {
      items: []
    }
  },
  mounted() {
    fetch(
        "http://localhost:8080/data/products.json",
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
}
</script>

<style>

</style>

