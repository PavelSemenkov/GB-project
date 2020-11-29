'use strict';
const app = new Vue({
    el: '#root',
    data: {
        name: ''
    },
    computed: {
        title(){
            return 'Hello!' + this.name;
        }
    },
    methods: {
        clear(event){
            this.name = '';
        },
        getData(){
            fetch(
                "https://raw.githubusercontent.com/PavelSemenkov/GB-project/JS2Lesson03/response/products.json",
                {
                    method: 'GET',
                    headers: {},
                    // body: ''
                }
            ).then(res => res.json()).then(res => {
                    this.itemms = res;
            });
        }
    }
});

console.log(app);

