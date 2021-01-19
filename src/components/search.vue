<template>
  <label>
    <input
        type="text"
        name="search"
        class="search_bar"
        placeholder="Search for Item..."
        v-model="search"
    />
    <button @click="() => $emit('search', search)"><i class="fas fa-search"></i></button>
  </label>
</template>

<script>
export default {
  name: 'Search',
  data() {
    return {
      search: ''
    };
  }
};
</script>

<style>

</style>