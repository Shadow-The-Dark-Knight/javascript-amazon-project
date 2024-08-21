import {cart, removeFromCart, calculateCartQuantity, updateDeliveryOption} from '../../data/cart.js';
import {products, getProduct} from '../../data/products.js';
import { formatCurrency} from '../utils/money.js';
import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions, getDeliveryOption} from '../../data/deliveryOptions.js'
import {renderPaymentSummary} from './paymentSummary.js';


// add first parameter is amount and second is units
// if out of another folder use ../


export function renderOrderSummary () {
   let cartSummaryHTML = '';
   
   cart.forEach((cartItem) => {
     const productId = cartItem.productId;
     

     const matchingProduct = getProduct(productId);

     const deliveryOptionId = cartItem.
     deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);

     const today = dayjs();
     const deliveryDate = today.add(
       deliveryOption.deliveryDays, 
       'days'
     );
     const dateString = deliveryDate.format(
       'dddd, MMMM D'
     );


     
     // for to fixed to work you have to put brackets for 
     // getting the price 
     // input type radio you have to give a different name so you can more than one

     cartSummaryHTML += `
     <div class="cart-item-container 
        js-cart-item-container
         js-cart-item-container-${matchingProduct.id}">
               <div class="delivery-date">
             ${dateString}
               </div>

               <div class="cart-item-details-grid">
                 <img class="product-image"
                   src="${matchingProduct.image}">

                 <div class="cart-item-details">
                   <div class="product-name">
                     ${matchingProduct.name}
                   </div>
                   <div class="product-price">
                     ${formatCurrency(matchingProduct.priceCents)}
                   </div>
                   <div class="product-quantity
                   js-product-quantity-${matchingProduct.id}">
                     <span>
                       Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                     </span>
                     <span class="update-quantity-link link-primary"
                       data-product-id="${matchingProduct.id}">
                       Update
                     </span>
                     <input class="quantity-input">
                     <span class="save-quantity-link link-primary js-save-link">
                     Save
                     </span>
                     <span class="delete-quantity-link link-primary js-delete-link 
                     js-delete-link-${matchingProduct.id}"
                     data-product-id="${matchingProduct.id}">
                       Delete
                     </span>
                   </div>
                 </div>

                 <div class="delivery-options">
                   <div class="delivery-options-title">
                     Choose a delivery option:
                   </div>
                   ${deliveryOptionsHTML(matchingProduct, cartItem)}
                 </div>
               </div>
             </div>`
   });

   function deliveryOptionsHTML (matchingProduct, cartItem) {

     let html = '';

     // const isChecked = cartItemdeliveryOption.id === cartItem.deliveryOption.id;

     deliveryOptions.forEach((deliveryOption) => {
       const today = dayjs();
       const deliveryDate = today.add(
         deliveryOption.deliveryDays, 
         'days'
       );
       const dateString = deliveryDate.format(
         'dddd, MMMM D'
       );

       const priceString = deliveryOption.priceCents
       === 0
       ? 'FREE'
       : `$${formatCurrency(deliveryOption.priceCents)} -`;

       // Turner operator first part is true then its whatever is question mark
       // if false then next to :

       const isChecked = deliveryOption.id ===
       cartItem.deliveryOptionId;

     
     html +=
       `
         <div class="delivery-option js-delivery-option"
         data-product-id="${matchingProduct.id}"
         data-delivery-option-id="${deliveryOption.id}">
           <input type="radio"
         ${isChecked ? 'checked' : ''}
             class="delivery-option-input"
             name="delivery-option-${matchingProduct.id}">
           <div>
             <div class="delivery-option-date">
               ${dateString}
             </div>
             <div class="delivery-option-price">
           ${priceString} Shipping
             </div>
           </div>
         </div>
       `
     });

     return html;
   }

     document.querySelector('.js-order-summary')
       .innerHTML = cartSummaryHTML;

   document.querySelectorAll('.js-delete-link')
   .forEach((link) => {
     link.addEventListener('click', () => {
       const productId = link.dataset.productId;
       removeFromCart(productId);

       const container = document.querySelector(`.js-cart-item-container-${productId}`)
       container.remove()

       renderPaymentSummary();
     });
     // updateCartQuantity();
   });


   function updateCartQuantity () {

     const cartQuantity = calculateCartQuantity();

     document.querySelector('.js-return-to-home-link')
       .innerHTML = `${cartQuantity} items`;
   }

   // updateCartQuantity();


   document.querySelectorAll('.js-update-link')
   .forEach((link) => {
     link.addEventListener('click', () => {
       const productId = link.dataset.productId;
       
       const container = document.querySelector(`.js-cart-item-container-${productId}`)
       container.classList.add('is-editing-quantity');

     });
   });


   document.querySelectorAll('.js-save-link')
   .forEach((link) => {
     link.addEventListener(('click'), () => {
       const productId = link.dataset.productId;

       const container = document.querySelector.apply(`.js-cart-item-container-${productId}`)
       container.classList.remove('is-editing-quantity');
     });
   })

   // dataset class is used where each object has 
   // the same attributes

   document.querySelectorAll('.js-delivery-option')
   .forEach((element) => {
     element.addEventListener('click', () => {
       const {productId, deliveryOptionId} = element.dataset;
       updateDeliveryOption(productId, deliveryOptionId);
       renderOrderSummary();
       renderPaymentSummary();
     });
   });
 }



 //update the data
 // regenerate all the HTML = MVC model-view-controller  
 // function rerun itself recursion 
