export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
  cart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
  }, {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1
  }];
}



function saveToStorage () {
  localStorage.setItem('cart', JSON.stringify(cart));
} 
// id is useful bc you (normailize the data)
//JSON.stringify convert things to strings
// as localStorage can only be used when it has a string

//JSON.parse is used when using getItem while JSON.stringify
// is used for setItem

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

   saveToStorage();
}


export function calculateCartQuantity () {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity
  });

  return cartQuantity
}

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  saveToStorage();
}