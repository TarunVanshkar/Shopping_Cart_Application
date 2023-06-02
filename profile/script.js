// Write your script here
const form = document.getElementById("profile-form");

const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const saveInfoButton = document.getElementById("save-info-btn");
const oldPassword = document.getElementById("old-password");
const newPassword = document.getElementById("new-password");
const confirmNewPassword = document.getElementById("confirm-password");
const changePasswordButton = document.getElementById("change-password-btn");
const logoutButton = document.getElementById("logout-btn");

// Fetch current user from local storage in JSON format
const currUser = JSON.parse(localStorage.getItem("currUser"));
const allUserArray = JSON.parse(localStorage.getItem("user"));

if (!currUser) {
    alert("You are authorized to access this page. Please signup or login to continue!");
    window.location.href = "../index.html";
}


// Set up the value in respective field of profile page
firstName.value = currUser.firstName;
lastName.value = currUser.lastName;

// Function for saving user info
function saveInfo(event) {
    event.preventDefault();

    // Update the currUser object present in local storage and save it
    currUser.firstName = firstName.value;
    currUser.lastName = lastName.value;

    localStorage.setItem("currUser", JSON.stringify(currUser));

    // Iterate the allUserArray and update the currUser there also
    for (let i = 0; i < allUserArray.length; i++) {
        let currentUser = allUserArray[i];

        // Compare the unique token id to identify currUser
        if (currentUser.token === currUser.token) {
            currentUser.firstName = currUser.firstName;
            currentUser.lastName = currUser.lastName;
        }
    }

    // Save the update allUserArray
    localStorage.setItem("user", JSON.stringify(allUserArray));

    // Display the success alert on screen
    alert("User info has updated");
}

// Adding an event listener to save info button
saveInfoButton.addEventListener("click", saveInfo);


// Defining changePassword function
function changePassword(event) {
    event.preventDefault();

    if (oldPassword.value == "" || newPassword.value == "" || confirmNewPassword.value == "") {
        alert("All fields are mandatory!");
        return;
    }
    // To the old password
    if (oldPassword.value !== currUser.password) {
        alert("Plase enter the correct password");
        return;
    }

    // To check the new password and confirm password
    if (newPassword.value !== confirmNewPassword.value) {
        alert("New password does not match with confirm password!");
        return;
    }

    // To change the password--> below condition should be satisfied
    if (oldPassword.value === currUser.password && newPassword.value === confirmNewPassword.value) {
        // Now we can update the password
        currUser.password = newPassword.value;

        // save the updated currUser in localStorage
        localStorage.setItem("currUser", JSON.stringify(currUser));

        // Iterate the allUserArray and update the currUser there also
        for (let i = 0; i < allUserArray.length; i++) {
            let currentUser = allUserArray[i];

            // Compare the unique token id to identify currUser
            if (currentUser.token === currUser.token) {
                currentUser.password = currUser.password;
            }
        }

        // Save the update allUserArray
        localStorage.setItem("user", JSON.stringify(allUserArray));

        // Display the success alert on screen
        alert("password has updated");

        // Empty the password fields for security purpose
        oldPassword.value = "";
        newPassword.value = "";
        confirmNewPassword.value = "";
    }
}

// Adding an event listener to change password button
changePasswordButton.addEventListener("click", changePassword);


// Adding an event listener to logout button
logoutButton.addEventListener("click", (event) => {
    event.preventDefault();

    localStorage.removeItem("currUser");
    window.location.href = "../index.html";
    alert("Logged out successfully!");
})