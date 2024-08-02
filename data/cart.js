export const cart = [];

export function addTocart (productId) {
  let matchingItem;


  cart.forEach((cartItem) => {
   if(productId === cartItem.productId) {
       matchingItem = cartItem;
   }
   // checks if item is already in cart
   
   });

   if (matchingItem) {
       matchingItem.quantity += 1;
   } else {
       cart.push({
           productId: productId,
           quantity: 1
       });
   }
}