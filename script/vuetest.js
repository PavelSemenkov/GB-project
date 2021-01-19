import Main from '../src/components/Main.vue';
import BasketBox from '../src/components/BasketBox.vue';
import CatalogueBox from '../src/components/CatalogueBox.vue';
import Vue from 'vue';


new Vue({
    el: '#root',
    render: h => h(Main),
    components: {Main},
    template: '<Main/>'
});

new Vue ({
    el: "#menucart",
    render: h => h(BasketBox),
    components: {BasketBox},
    template: '<BasketBox/>'
});

new Vue ({
    el: "#catalogue-box",
    render: h => h(CatalogueBox),
    components: {CatalogueBox},
    templates: '<CatalogueBox/>'
});