const cartContainer = document.getElementById("cart-section");

const currUser = JSON.parse(localStorage.getItem("currUser"));

if (!currUser) {
    alert("Please login first!");
    window.location.href = "../index.html";
    // return;
}

const cartItemList = currUser.itemsList;
// console.log(cartItemList);

// If no items in cart
if (!cartItemList) {
    alert("No item in cart!");
    window.location.href = "../shop/index.html"
}

let currPorductList = [];
// Function for getting products from local storage
let products = [];
const productsList = JSON.parse(localStorage.getItem("products"));
products = productsList.filter((item) => {
    if(cartItemList.includes(item.key)){
        let obj = {
            currProductKey : item.key,
            currPorductId : item.id
        }
        currPorductList.push(obj);
    }
    return cartItemList.includes(item.key);
})
// console.log(products)
// console.log(currPorductList)


// Function for rendering items on screen
const cardContainer = document.getElementById("cart-items");
function renderData(items) {
    if(!items){
        return
    }
    items.forEach((item) => {
        cardContainer.innerHTML += `
   <div class="item ${item.id}">
   <div id="img-div">
   <img src=${item.image} alt="Item" />
   </div>
     <div class="info" id="info-div">
     <div class="title">${item.title}</div>
     <div class="row">
       <div class="price">$${item.price}</div>
       <div class="sized">S,M,L</div>
     </div>
     <div class="colors">
       Colors:
       <div class="row">
         <div class="circle" style="background-color: #000"></div>
         <div class="circle" style="background-color: #4938af"></div>
         <div class="circle" style="background-color: #203d3e"></div>
       </div>
     </div>
     <div class="row">Rating: ${item.rating.rate}⭐</div>
   </div>
   <div id="btn-div">
   <button id="removeBtn">Remove from cart</button>
   </div>
  </div>`;
    })
}
renderData(products);


//function for rendering items in bill
const itemListContainer = document.getElementById("list-items");
const totalPriceField = document.getElementById("total-price");
function renderPriceList(items) {
    let totalPrice = Number(totalPriceField.innerText);
    if(!items){
        itemListContainer.innerHTML = "";
        totalPriceField.innerText = "";
    }
    items.forEach((item) => {
        itemListContainer.innerHTML += `
    <div id="itemOfList"> 
    <div>${item.title.slice(0, 15)}..</div>
    <div>$${item.price}</div>
    </div>`;

    totalPrice += item.price;
    });
    totalPriceField.innerText = `$${totalPrice}`;
}
renderPriceList(products)

// Function to find product key based on id
function getKey(id){
    let key;
    productsList.forEach((item) => {
        if(item.id == id){
            key = item.key;
        }
    })
    return key
}

//function for removing items from cart
const removeItemsList = document.querySelectorAll(".item");
// console.log(products);
function removeItems(list){
    let newProductList = [];
    list.forEach((item) => {
        item.children[2].addEventListener("click", () => {
            // console.log(item.classList[1]);
            item.style.display = "none"
            const key = getKey(item.classList[1]);
            let newProductList = products.filter((item) => {
                return item.key !=key
            })
            renderPriceList(newProductList);

            const currUser = JSON.parse(localStorage.getItem("currUser"));
            currUser.itemsList = newProductList;
            localStorage.setItem("currUser", JSON.stringify(currUser));

            const allUser = JSON.parse(localStorage.getItem("user"));
            for(let i=0; i<allUser.length; i++){
                if(allUser[i].token == currUser.token){
                    allUser[i] = currUser
                }
            }
            localStorage.setItem("user", JSON.stringify(allUser));
        })
        
    })
}
removeItems(removeItemsList)


//redirecting to the payments page
document.querySelector("#pay-btn").addEventListener("click", () => {
    localStorage.setItem("cart", JSON.stringify([]))
    alert("The items were purchased")
    window.location.href = "../razorpay/index.html"
})