const products = [
    { id: 1, name: "Laptop", price: 999 },
  { id: 2, name: "Phone", price: 499 },
  { id: 3, name: "Headphones", price: 99 },
  { id: 4, name: "Keyboard", price: 49 }
]
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const productList = document.querySelector("#products-list");
function display(){
    productList.innerHTML = products.map(product =>
    `<div class = "product-card">
    <h3> ${product.name} </h3>
    <p> ${product.price} </p>
    <button onclick = "addToCart(${product.id})"> Add To Cart </button>
     </div>`
    ).join(" ")
}
display();
function addToCart(productId){
    const product = products.find(p => p.id === productId);
    const existingItem =  cart.find(item => item.id === productId);
    if (existingItem){
        existingItem.quantity += 1;
  } else {
   
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1
    })
  }  
  displayCart();
  saveCart();
}
function displayCart(){
 
  const cartItems = document.getElementById("cart-list");
   if(cart.length === 0){
  cartItems.innerHTML = "<h3>Your cart is empty</h3>";
  return;
}
     let itemsHTML = cart.map(product => 
    `<div class = "cart-items">
    <h3> ${product.name}</h3>
    <span><button onclick = "reduce(${product.id})">- </button> ${product.quantity} <button onclick = "add(${product.id})">+ </button> </span>
    <p> ${product.quantity * product.price}</p>
    <button onclick= "remove(${product.id})"> remove</button>
    </div>`
    
  ).join("")
  const total = cart.reduce((sum, product) => {
    return sum + (product.quantity * product.price);
  }, 0);

  
  cartItems.innerHTML = itemsHTML + `<h2>Total: ₹${total}</h2>`;
}
function reduce(productid){
  const reduceQuantity = cart.find(product => product.id === productid);
  reduceQuantity.quantity -= 1;
  saveCart();
  displayCart();
}
function add(productid){
  const addQuantity = cart.find(product => product.id === productid);
  addQuantity.quantity += 1;
  saveCart();
  displayCart();
}
function remove(productid){
  cart = cart.filter(product => product.id !== productid);
  saveCart();
  displayCart();
}
function saveCart(){
  localStorage.setItem("cart", JSON.stringify(cart));
}
displayCart();

