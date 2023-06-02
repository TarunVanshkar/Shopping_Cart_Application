// const produtc = {
//   id: 1,
//   title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
//   price: 109.95,
//   description:
//     "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
//   category: "men's clothing",
//   image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
//   rating: { rate: 3.9, count: 120 },
// };

var data = [];
let pageCount = 0;
const menContainer = document.getElementById("man");
const manItemsContainer = document.getElementById("man-items");

const womenContainer = document.getElementById("women");
const womanItemContainer = document.getElementById("woman-items");

const jewelleryContainer = document.getElementById("jewellery");
const jewelleryItemContainer = document.getElementById("jewellery-items");

const electronicsContainer = document.getElementById("electronics");
const electronicsItemContainer = document.getElementById("electronics-items");

// Function to show men's products
function showManProduct(products) {
  // if(products.length==0){
  //   manItemsContainer.innerHTML += `<p>Could not find the item.<p>`
  //   console.log("man empty")
  //   // alert("s")
  // }
  let menProducts = products.filter((item) => {
    return item.category.includes("men's clothing");
  })
  menContainer.children[1] = renderData(menProducts, manItemsContainer);
}

// Function to show women's products
function showWomenProduct(products) {
  let womenProducts = products.filter((item) => {
    return item.category.includes("women's clothing");
  })
  womenContainer.children[1] = renderData(womenProducts, womanItemContainer);
}

// Function to show jwellery products
function showJwelleryProduct(products) {
  let jewelleryProducts = products.filter((item) => {
    return item.category.includes("jewelery");
  })
  jewelleryContainer.children[1] = renderData(jewelleryProducts, jewelleryItemContainer);
}

// Function to show electronic products
function showElectronicProduct(products) {
  let electronicsProducts = products.filter((item) => {
    return item.category.includes("electronics");
  })
  electronicsContainer.children[1] = renderData(electronicsProducts, electronicsItemContainer);
}

//Function to add color and size in the fetched object and save it in local storage
function addColorAndSize(products) {
  for (let i = 0; i < products.length; i++) {
    let currElement = products[i];
    currElement.colours = ["red", "blue", "black"];
    currElement.sizes = ["S", "M", "L"];
  }
  localStorage.setItem("products", JSON.stringify(products))
}

// eventlistener function to store cart item in local storage
function addToCart(cardList) {
  // console.log(btnList[0].children[2])
  for (let i = 0; i < cardList.length; i++) {
    let currNode = cardList[i];
    currNode.addEventListener("click", (event) => {
      console.log(event.target.className);
      addItemToLocalStorage(event.target.className)
    })
  }
}

// Function to unique item key in local storage
function addItemToLocalStorage(key) {
  let currUser = JSON.parse(localStorage.getItem("currUser"));
  let userArray = JSON.parse(localStorage.getItem("user"));
  // let productArray = currUser.items ? currUser.itemsList : [];
  let productArray;
  if (!currUser.itemsList) {
    productArray = [];
    productArray.push(key);
  }
  else {
    productArray = currUser.itemsList;
    if (!productArray.includes(key)) {
      productArray.push(key);
    }
    else {
      alert("product is already added to cart");
    }

  }

  currUser.itemsList = productArray;
  localStorage.setItem("currUser", JSON.stringify(currUser));

  for (let i = 0; i < userArray.length; i++) {
    if (userArray[i].token == currUser.token) {
      userArray[i] = currUser;
    }
  }
  localStorage.setItem("user", JSON.stringify(userArray));

}


// Function to generate tokens
function generateToken() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz0123456789';
  let res = '';
  let length = characters.length;
  for (let i = 1; i <= 16; i++) {
    res += characters.charAt(Math.floor(Math.random() * length));
  }
  return res;
}



// Function to fetch product from API
async function fetchProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const products = await response.json();
    // console.log(products)
    data = products;   // For further implementation
    // console.log(data)
    addColorAndSize(products)

    pageCount++;
    if (pageCount == 1) {
      products.forEach((element) => {
        element.key = generateToken();
      })

      localStorage.setItem("products", JSON.stringify(products));
    }

    // for men's section
    showManProduct(products);

    // for women's section
    showWomenProduct(products);

    // for jewellery section
    showJwelleryProduct(products);

    // for electronics section
    showElectronicProduct(products);

    // adding unique key to product
    const cardList = document.querySelectorAll(".card");
    addToCart(cardList);

  }
  catch (error) {
    console.log(error);
  }
}

fetchProducts();

// Function to render data on screen
function renderData(products, itemsContainer) {
  itemsContainer.innerHTML = '';
  products.forEach((element) => {
    let imageLink = element.image;
    itemsContainer.innerHTML += `<div class="item card" >
    <img src="${imageLink}" alt="Item" />
    <div class="info">
      <div class="row">
        <div class="price">${element.price}</div>
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
      <div class="row">Rating: ${element.rating.rate} Count: ${element.rating.count}</div>
    </div>
    <button id="addBtn" class="${element.key}">Add to Cart</button>
  </div>`
  })

}


// Now adding an event listener to category buttons
const filterContainer = document.querySelector(".filters");
// Event listener for All button
filterContainer.children[0].addEventListener("click", () => {
  let element = filterContainer.children[0];
  let currentChild = 0;

  element.style.backgroundColor = "black";
  element.style.color = "white";

  // Setting all other buttons as default styles
  for (let i = 0; i < filterContainer.children.length; i++) {
    // Invoking function to change the color
    if (i != currentChild) {
      changeButtonColor(filterContainer.children[i]);
    }
  }

  // Rendering data
  menContainer.style.display = "block";
  womenContainer.style.display = "block";
  jewelleryContainer.style.display = "block";
  electronicsContainer.style.display = "block";
  fetchProducts();
})

// Event listener for Mens button
filterContainer.children[1].addEventListener("click", () => {
  let element = filterContainer.children[1];
  let currentChild = 1;

  element.style.backgroundColor = "black";
  element.style.color = "white";

  // Setting all other buttons as default styles
  for (let i = 0; i < filterContainer.children.length; i++) {
    // Invoking function to change the color
    if (i != currentChild) {
      changeButtonColor(filterContainer.children[i]);
    }
  }

  // Rendering data
  menContainer.style.display = "block";
  womenContainer.style.display = "none";
  jewelleryContainer.style.display = "none";
  electronicsContainer.style.display = "none";
})

// Event listener for Womens button
filterContainer.children[2].addEventListener("click", () => {
  let element = filterContainer.children[2];
  let currentChild = 2;

  element.style.backgroundColor = "black";
  element.style.color = "white";

  // Setting all other buttons as default styles
  for (let i = 0; i < filterContainer.children.length; i++) {
    // Invoking function to change the color
    if (i != currentChild) {
      changeButtonColor(filterContainer.children[i]);
    }
  }

  // Rendering data
  menContainer.style.display = "none";
  womenContainer.style.display = "block";
  jewelleryContainer.style.display = "none";
  electronicsContainer.style.display = "none";
})

// Event listener for Jewellery button
filterContainer.children[3].addEventListener("click", () => {
  let element = filterContainer.children[3];
  let currentChild = 3;

  element.style.backgroundColor = "black";
  element.style.color = "white";

  // Setting all other buttons as default styles
  for (let i = 0; i < filterContainer.children.length; i++) {
    // Invoking function to change the color
    if (i != currentChild) {
      changeButtonColor(filterContainer.children[i]);
    }
  }

  // Rendering data
  menContainer.style.display = "none";
  womenContainer.style.display = "none";
  jewelleryContainer.style.display = "block";
  electronicsContainer.style.display = "none";
})

// Event listener for Electronics button
filterContainer.children[4].addEventListener("click", () => {
  let element = filterContainer.children[4];
  let currentChild = 4;

  element.style.backgroundColor = "black";
  element.style.color = "white";

  // Setting all other buttons as default styles
  for (let i = 0; i < filterContainer.children.length; i++) {
    // Invoking function to change the color
    if (i != currentChild) {
      changeButtonColor(filterContainer.children[i]);
    }
  }

  // Rendering data
  menContainer.style.display = "none";
  womenContainer.style.display = "none";
  jewelleryContainer.style.display = "none";
  electronicsContainer.style.display = "block";
})

// Function to change the color of buttons to its initial style
function changeButtonColor(element) {
  element.style.backgroundColor = "white";
  element.style.color = "black";
}


// Implementing search functionality
const searchBox = document.getElementById("search-box");
searchBox.addEventListener("input", () => {
  // console.log(data)
  let inputValue = searchBox.value;
  const filteredData = data.filter((currentData) => {
    // const searchContent = `${currentData.first_name} ${currentData.last_name}`;
    // return fullName.toLowerCase().includes(inputValue) || currentData.email.toLowerCase().includes(inputValue);
    return currentData.category.toLowerCase().includes(inputValue.toLowerCase()) ||
      currentData.description.toLowerCase().includes(inputValue.toLowerCase()) ||
      currentData.title.toLowerCase().includes(inputValue.toLowerCase());
  })

  // for men's section
  showManProduct(filteredData);

  // for women's section
  showWomenProduct(filteredData);

  // for jewellery section
  showJwelleryProduct(filteredData);

  // for electronics section
  showElectronicProduct(filteredData);

  // adding unique key to product
  const cardList = document.querySelectorAll(".card");
  addToCart(cardList);

})

