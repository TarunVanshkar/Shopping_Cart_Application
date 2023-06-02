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

// Function to fetch products from API
async function fetchProducts() {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    const products = await response.json();
    console.log(products)
    // Display products on the page
    // displayProducts(products);
  } catch (error) {
    console.log('Error fetching products:', error);
  }
}

/*
// Function to display products on the page
function displayProducts(products) {
  // Get the container element where the products will be displayed
  const container = document.getElementById('product-container');
  
  // Clear the container
  container.innerHTML = '';
  
  // Loop through the products and create HTML elements to display them
  products.forEach(product => {
    const productElement = document.createElement('div');
    // Add the necessary HTML and CSS to display the product information
    // You can use the product properties to populate the elements
    // Append the product element to the container
    container.appendChild(productElement);
  });
}
*/
// Call the fetchProducts() function when the shop page loads
fetchProducts();


// shop.html

// Function to fetch products from the API
async function fetchProducts() {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    const products = await response.json();
    // Display products on the page
    displayProducts(products);
  } catch (error) {
    console.log('Error fetching products:', error);
  }
}

// Function to display products on the page
function displayProducts(products) {
  // Get the container element where the products will be displayed
  const productContainer = document.getElementById('product-container');

  // Clear the container
  productContainer.innerHTML = '';

  // Check if there are any products
  if (products.length === 0) {
    productContainer.innerHTML = 'No products found.';
    return;
  }

  // Loop through the products and create HTML elements to display them
  products.forEach(product => {
    const productElement = document.createElement('div');
    productElement.classList.add('product');
    // Add necessary HTML and CSS to display the product information
    // You can use the product properties to populate the elements
    productElement.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p>${product.price}</p>
    `;
    // Append the product element to the container
    productContainer.appendChild(productElement);
  });
}

// Call the fetchProducts() function when the shop page loads
fetchProducts();





// ---------------------------------------

// shop.html

// Function to filter products by name
function filterProductsByName(products, searchTerm) {
  return products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
}

// Function to handle search input change event
function handleSearchInputChange(products) {
  const searchInput = document.getElementById('search-input');
  const searchTerm = searchInput.value;

  // Filter products by name
  const filteredProducts = filterProductsByName(products, searchTerm);

  // Display the filtered products
  displayProducts(filteredProducts);
}

// Add an event listener to the search input
const searchInput = document.getElementById('search-input');
searchInput.addEventListener('input', () => {
  handleSearchInputChange(products);
});

// Function to filter products by sidebar filters
function filterProductsBySidebar(products, filters) {
  // Implement filtering logic based on the selected filters (e.g., color, price, etc.)
  // Return the filtered products array
}

// Function to handle sidebar filter click event
function handleSidebarFilterClick(products) {
  const sidebarFilters = document.querySelectorAll('.sidebar-filter');
  const selectedFilters = Array.from(sidebarFilters)
    .filter(filter => filter.checked)
    .map(filter => filter.value);

  // Filter products by sidebar filters
  const filteredProducts = filterProductsBySidebar(products, selectedFilters);

  // Display the filtered products
  displayProducts(filteredProducts);
}

// Add event listeners to the sidebar filters
const sidebarFilters = document.querySelectorAll('.sidebar-filter');
sidebarFilters.forEach(filter => {
  filter.addEventListener('change', () => {
    handleSidebarFilterClick(products);
  });
});


// -------------------------------------------

// shop.html

// Function to toggle product types
function toggleProductType(products, productType) {
  const productContainer = document.getElementById('product-container');

  // Clear the container
  productContainer.innerHTML = '';

  // Filter products by type
  const filteredProducts = products.filter(product => product.category.toLowerCase() === productType);

  // Display the filtered products
  displayProducts(filteredProducts);
}

// Function to handle toggle button click event
function handleToggleButton(event) {
  const productType = event.target.value;
  const toggleButtons = document.querySelectorAll('.toggle-button');

  // Update the background color of the active toggle button
  toggleButtons.forEach(button => {
    if (button === event.target) {
      button.style.backgroundColor = 'black';
    } else {
      button.style.backgroundColor = '';
    }
  });

  // Toggle product types
  toggleProductType(products, productType);
}

// Add event listeners to the toggle buttons
const toggleButtons = document.querySelectorAll('.toggle-button');
toggleButtons.forEach(button => {
  button.addEventListener('click', handleToggleButton);
});

