<template>
  <Search v-on:search="filteredGoods"/>
</template>

<script>
import Search from './Search.vue';
export default {
  name: 'MainPage',
  components: {
    Search
  },
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
};
</script>

<style>

</style>