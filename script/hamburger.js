'use strict';

//Я решил сделать с визуальной частью, хоть и без верстки.
//Решил сделать расчет в реальном времени при любом изменении, с возможностью
//многократных добавок и удалений. С адаптивными методами и масштабируемым массивом начинок.

/**
 * Класс для выбора гамбургера с начинкой.
 */
class Hamburger {
    constructor() {
        this.size = '';
        this.stuffing = [];
        this.totalCalories = 0;
        this.totalPrice = 0;
        this.orderPrice = [];
        this.orderCalories = [];
        this.toppings = {

            Сыр :
                {
                    price: 10,
                    calories: 20
                },
            Салат:
                {
                    price: 20,
                    calories: 5
                },
            Картофель:
                {
                    price: 15,
                    calories: 10
                },
            Приправа:
                {
                    price: 15,
                    calories: 0
                },
            Майонез:
                {
                    price: 20,
                    calories: 5
                },
            };
        };

    /**
     * Запускаем методы выбора размера гамбургера и начинок
     */
    init() {
        this.addSizeButtons();
        this.getStuffing()
    }

    /**
     * Считываем выбор размера гамбургера и в реальном времени меняем цены и калорийность заказа
     */
    addSizeButtons(){
        let buttonSmallSize = document.getElementById('choose_size_small');
        let buttonBigSize = document.getElementById('choose_size_big');
        buttonSmallSize.addEventListener('change', () => {
            this.size = 'Small';
            this.orderPrice[0] = 50;
            this.orderCalories[0] = 20;
            this.getTotalPrice(this.orderPrice);
            this.getTotalCalories(this.orderCalories);
        });

        buttonBigSize.addEventListener('change', () => {
            this.size = 'Big';
            this.orderPrice[0] = 100;
            this.orderCalories[0] = 40;
            this.getTotalPrice(this.orderPrice);
            this.getTotalCalories(this.orderCalories);
        })

    }

    /**
     * Считываем массив с начинками, передаем данные из массива в метод отрисовки
     * после чего подвешиваем ко всем кнопкам добавления и удаления начинок методы.
     */
    getStuffing() {
        document.querySelector('.show_stuffing').addEventListener('click', () => {
            for (let i in this.toppings) {
                document.querySelector('.stuffing').innerHTML += this.renderStuffing(i, this.toppings[i].price, this.toppings[i].calories);
            }
            document.querySelector('.show_stuffing').remove();
            this.addTopping();
            this.removeTopping();
        });
    }

    /**
     * Метод отрисовки начинок с конпками на странице
     * @param stuffingName - название начинки из массива
     * @param stuffingPrice - цена начинки из массива
     * @param stuffingCalories - калорийность начинки из массива
     * @returns {string} - возвращает разметку с нужными параметрами из массива
     */
    renderStuffing(stuffingName, stuffingPrice, stuffingCalories) {
        return `<div class="stuffing"><span>Название: <span class="stuff_name">${stuffingName}</span>&nbsp</span>
                <span>Цена: <span class="stuff_price">${stuffingPrice}</span>&nbsp</span>
                <span">Калорийность: <span class="stuff_calories">${stuffingCalories}</span>&nbsp</span>
            <button class="add_stuffing">Добавить эту начинку</button>
            <button class="remove_stuffing">Убрать эту начинку</button><br></div>`;
    }

    /**
     * Обработка нажатия добавления соответствующей начинки в обший состав.
     * После чего передаем стоимость и калорийность в массивы и эти массивы передаем в методы расчета цены и калорийности
     */
    addTopping() {
        document.querySelectorAll('.add_stuffing').forEach((button) => {
            button.addEventListener('click', (event) => {
                let target = event.currentTarget;
                let mainBlock = target.parentNode.parentNode
                let stuffName = mainBlock.querySelector('.stuff_name').innerText;
                let stuffPrice = parseInt(mainBlock.querySelector('.stuff_price').innerText);
                let stuffCalories = parseInt(mainBlock.querySelector('.stuff_calories').innerText);
                this.stuffing.push(stuffName);
                document.querySelector('.details').innerText = this.stuffing.join(' ');
                this.orderPrice.push(stuffPrice);
                this.orderCalories.push(stuffCalories);
                this.getTotalPrice(this.orderPrice);
                this.getTotalCalories(this.orderCalories);
            });
        });
    }

    /**
     * Обработка нажатия удаления соответствующей начинки из общего состава. Удаляет в любом порядке.
     * После чего удаляем стоимость и калорийность из массивов и передем измененные в методы расчета цены и калорийности
     */
    removeTopping() {
        document.querySelectorAll('.remove_stuffing').forEach((button) => {
            button.addEventListener('click',  (event) => {
                let target = event.currentTarget;
                let mainBlock = target.parentNode.parentNode
                let stuffName = mainBlock.querySelector('.stuff_name').innerText;
                let stuffPrice = parseInt(mainBlock.querySelector('.stuff_price').innerText);
                let stuffCalories = parseInt(mainBlock.querySelector('.stuff_calories').innerText);
                for (let i = 0; i < this.stuffing.length; i++) {
                    if (this.stuffing[i] === stuffName) {
                        this.stuffing.splice(i, 1);
                        break;
                    }
                }
                document.querySelector('.details').innerText = this.stuffing.join(' ');
                for (let i = 1; i < this.orderPrice.length; i++) {
                    if (this.orderPrice[i] === stuffPrice) {
                        this.orderPrice.splice(i, 1);
                        break;
                    }
                }
                for (let i = 1; i < this.orderCalories.length; i++) {
                    if (this.orderCalories[i] === stuffCalories) {
                        this.orderCalories.splice(i, 1);
                        break;
                    }
                }
                this.getTotalPrice(this.orderPrice);
                this.getTotalCalories(this.orderCalories);
            });
        });
    }

    /**
     * Метод расчета общей цены заказа
     * @param array получаем на вход массив из цифр соответствующих выбору пользователя
     */
    getTotalPrice(array) {
        let totalPrice = 0;
        for (let i = 0; i < array.length; i++) {
            totalPrice += array[i];
        }
        this.totalPrice = totalPrice;
        document.querySelector('.price').innerHTML = this.totalPrice;
    }

    /**
     * Метод расчета общей калорийности заказа
     * @param array получаем на вход массив из цифр соответствующих выбору пользователя
     */
    getTotalCalories(array) {
        let totalCalories = 0;
        for (let i = 0; i < array.length; i++) {
            totalCalories += array[i];
        }
        this.totalCalories = totalCalories;
        document.querySelector('.calories').innerHTML = this.totalCalories;
    };
}

const hamb = new Hamburger();
hamb.init();