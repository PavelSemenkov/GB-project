'use strict';
const app = new Vue({
    el: '#root',
    data: {
        searchLine: '',
    },
    computed: {
    },
    methods: {
        filteredGoods(event) {
            let allGoods = document.querySelectorAll('.featured-items');
            event.preventDefault();
            allGoods.forEach((element) => {
                    let orderProductName = element.querySelector('.featured-item-text > p').innerText;
                    if (orderProductName.toUpperCase().includes(this.searchLine.toUpperCase())) {
                        document.querySelector('.featured-items-box').scrollIntoView({
                            block: "center",
                            behavior: "smooth"
                        });
                        element.style.display = 'flex';
                    } else if (this.searchLine === "") {
                        element.style.display = 'flex';
                    } else {
                        element.style.display = 'none';
                    }
            });
        }
    }
});


