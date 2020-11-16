"use strict";

document.querySelectorAll('.cart-order').forEach(function (button){
    button.addEventListener('click', function (event){
        let button = event.currentTarget;
        let orderProductImage = button.parentNode.parentNode.querySelector('.product-photo').src;
        let orderProductPrice = (button.parentNode.parentNode.querySelector('.index-product-price').innerText)-'.00';
        let orderProductName = button.parentNode.parentNode.querySelector('.featured-item-text > p').innerText;
        document.querySelector('.cart-contain-box__items').insertAdjacentHTML('afterbegin',
            `<div class="cart-product">
                    <div class="cart-product__image">
                        <img src="${orderProductImage}" alt="product"/>
                    </div>
                    <div class="cart-product__info">
                       <div class="cart-product__info__name">
                        ${orderProductName}
                       </div>
                       <div class="cart-product__info__rating">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                       </div>
                       <div class="cart-product__info__price">
                        $ <span>${orderProductPrice}</span>
                       </div>                  
                    </div>
                    <div class="cart-product__delete">
                      <i class="fas fa-times-circle"></i>
                    </div> 
                  </div>`);
        let total = 0;
        document.querySelector('.cart-contain-box__items').querySelectorAll('.cart-product__info__price > span').forEach(function (price) {
            total += parseInt(price.innerText);
            document.getElementById('cart-total').innerHTML = ('$' + total);
        });
        document.querySelector('.cart-box-dropdown').style.display = "block";
        setTimeout(function (){
            document.querySelector('.cart-box-dropdown').style.display = "none";
        }, 3000);
        document.querySelector('.cart-contain-box__items').querySelectorAll('.cart-product__delete > i').forEach(function (del) {
            del.addEventListener('click', function (event) {
                let delButton = event.currentTarget;
                total -= parseInt(delButton.parentNode.parentNode.querySelector('.cart-product__info__price > span').innerText);
                document.getElementById('cart-total').innerHTML = ('$' + total);
                delButton.parentNode.parentNode.remove();
            });
        });
    });
});

document.querySelector('.cart').addEventListener('mousemove', function (){
    document.querySelector('.cart-box-dropdown').style.display = "block";
    document.querySelector('.cart-box-dropdown').addEventListener('mouseleave', function () {
        setTimeout(() => {
            this.style.display = "none";
        }, 2000);
    })
});