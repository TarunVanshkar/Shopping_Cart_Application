const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-btn");

const email = document.getElementById("email");
const password = document.getElementById("password");

// Adding the event listener to login button
loginButton.addEventListener("click", (event) => {
    event.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));
    // If user array is empty
    if (!user) {
        alert("Please register first!");
        return;
    }

    if (!email.value || !password.value) {
        alert("All fields are mandatory!");
        return;
    }

    for (let i = 0; i < user.length; i++) {
        const element = user[i];
        if (element.email === email.value && element.password === password.value) {
            let currUser = element;

            localStorage.setItem("currUser", JSON.stringify(currUser));

            // Empty the input fields
            email.value = "";
            password.value = "";


            // Redirect to shoping page
            window.location.href = "../shop/index.html";
            return;
        }
        else if (element.email === email.value || element.password === password.value) {
            alert("Either email or password is incorrect");
            return;
        }
    }

    alert("Please register first!");
})