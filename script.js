// myProducts.filter((item)=>item.title.includes(search.value))

// myCartProductArray = myProducts.filter((item)=> myCartIDs.includes(item.id))

// adding the event listener fot login button of home page
const loginButton = document.getElementById("login");
loginButton.addEventListener("click", () => {
    //Redirect to login page
    window.location.href = "./login/index.html";
})

// adding the event listener fot signup button of home page
const signupButton = document.getElementById("signup");
signupButton.addEventListener("click", () => {
    //Redirect to signup page
    window.location.href = "./signup/index.html";
})