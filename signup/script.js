const signupForm = document.getElementById("Signup-form");

const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");

const signupButton = document.getElementById("signup-btn");

// Fetching user array from local storage or creating it if it is not present
const user = JSON.parse(localStorage.getItem("user")) || [];       // Getting it in json format array


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

// Regular expressions function to validate email
function validateEmail(email) {
    // Regular expression pattern for email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Test the email against the pattern
    const isValid = emailPattern.test(email);

    return isValid;
}

// Function to check email is already present in local storage or not
function duplicateEmail(email) {
    return user.some((user) => {
        return user.email === email;
    });
}

// Function to do signup task
function signup(event) {
    // To prevent default behaviour on form submission
    event.preventDefault();

    // Getting input fields
    const firstNameValue = firstName.value;
    const lastNameValue = lastName.value;
    const emailValue = email.value;
    const passwordValue = password.value;
    const confirmPasswordValue = confirmPassword.value;

    // To check input
    if (!firstNameValue || !lastNameValue || !emailValue || !passwordValue || !confirmPasswordValue) {
        alert("All fields are mandatory!");
        return;
    }

    // To match the password
    if (passwordValue !== confirmPasswordValue) {
        alert("Password does not match!");
        return;
    }

    // To validate email
    if (!validateEmail(emailValue)) {
        alert('Please enter a valid email address!');
        return;
    }

    // Check for duplicacy of email in local storage
    if(duplicateEmail(emailValue)){
        alert("User is already registered with given email!");
        return;
    }

    // If above conditions satisfied then we can create a new user object and add it to localStorage
    const newUser = {
        firstName : firstNameValue,
        lastName : lastNameValue,
        email : emailValue,
        password : passwordValue,
        token : generateToken()
    }
    user.push(newUser);

    // Save updated user array in localStorage in stringified format
    localStorage.setItem("user", JSON.stringify(user));

    // To clear the input fields
    firstName.value = "";
    lastName.value = "";
    email.value = "";
    password.value = "";
    confirmPassword.value = "";

    // After signing up redirecting to login page
    window.location.href = "../login/index.html";

}

// Adding event listener for signup button of form
signupButton.addEventListener("click", signup);