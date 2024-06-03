var loginHeader = document.querySelector('#login-modal-header-html');
var signinButton = document.querySelector('#signin-btn');
var btnFollow = document.querySelectorAll('#btn-follow');
var joinGroupButton = document.querySelector('#join-group-btn');
var locationInputContainer = document.querySelector('.location-input-container');
var locationInput = document.querySelector('#location-input');
var locationInputClose = document.querySelector('#input-close-btn');

// Selecting DOM elements
var signUpButton = document.querySelector('.btn-createaccount');
var signInButtons = document.querySelectorAll('#sign-in-button');
var signupContainer = document.querySelector('.signup-container');
var loginContainer = document.querySelector('.loggedIn-container');
var recommendedGroupsSection = document.getElementById('recommended-groups-section');

// Utility function to get input value by placeholder
function getInputValue(modal, placeholder) {
    return modal.querySelector(`input[placeholder='${placeholder}']`).value;
}

// Utility function to clear input values
function clearInputValues(modal) {
    var inputs = modal.querySelectorAll('input');
    inputs.forEach(input => input.value = '');
}

// Utility function to validate email format
function isValidEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Utility function to validate name format (non-empty and alphabetic characters only)
function isValidName(name) {
    var nameRegex = /^[A-Za-z]+$/;
    return nameRegex.test(name) && name.length > 0;
}

// Function to handle sign up
function handleSignUp() {
    var signUpModal = document.getElementById('signUpModal');
    var firstName = getInputValue(signUpModal, 'First Name');
    var lastName = getInputValue(signUpModal, 'Last Name');
    var email = getInputValue(signUpModal, 'Email');
    var password = getInputValue(signUpModal, 'Password');
    var confirmPassword = getInputValue(signUpModal, 'Confirm Password');

    // Validate inputs
    if (!isValidName(firstName)) {
        alert("Please enter a valid first name (alphabetic characters only).");
        return;
    }
    if (!isValidName(lastName)) {
        alert("Please enter a valid last name (alphabetic characters only).");
        return;
    }
    if (!isValidEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }
    if (password.length < 8) {
        alert("Password must be at least 8 characters long.");
        return;
    }
    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    // Create an account object
    var account = { firstName, lastName, email, password };

    // Store the account object in localStorage
    localStorage.setItem('account', JSON.stringify(account));

    // Clear input fields
    clearInputValues(signUpModal);

    // Display logged-in user
    displayLoggedInUser(account);

    // Close the modal
    bootstrap.Modal.getInstance(signUpModal).hide();
}

// Function to handle sign in
function handleSignIn() {
    var logInModal = document.getElementById('logInModal');
    var email = getInputValue(logInModal, 'Email');
    var password = getInputValue(logInModal, 'Password');
    
    // Validate inputs
    if (!isValidEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }
    if (password.length === 0) {
        alert("Please enter a password.");
        return;
    }

    // Retrieve the stored account from localStorage
    var storedAccount = JSON.parse(localStorage.getItem('account'));

    // Check if account exists and credentials match
    if (!storedAccount || storedAccount.email !== email || storedAccount.password !== password) {
        alert("Invalid email or password.");
        return;
    }

    // Display logged-in user
    displayLoggedInUser(storedAccount);

    // Close the modal
    bootstrap.Modal.getInstance(logInModal).hide();
}

// Function to display logged-in user
function displayLoggedInUser(account) {
    var profileImage = loginContainer.querySelector('img');
    var userNameSpan = loginContainer.querySelector('span');

    // Update profile image and username
    profileImage.src = "./assets/images/profileimg4.jpeg"; // Update this path if needed
    userNameSpan.textContent = `${account.firstName} ${account.lastName}`;

    // Hide signup container and show login container
    signupContainer.classList.add('display-off');
    loginContainer.classList.remove('display-off');
    
    // Show the recommended groups section
    recommendedGroupsSection.style.display = 'block';
}

// Event listener for sign up button
signUpButton.addEventListener('click', handleSignUp);

// Event listener for sign in button
signInButtons.forEach(button => {
    button.addEventListener('click', handleSignIn);
});

// Event listener for navigation links
document.addEventListener("DOMContentLoaded", function() {
    var navLinks = document.querySelectorAll(".nav-link");
    var cards = document.querySelectorAll(".card");

    navLinks.forEach(function(link, index) {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            cards.forEach(function(card) {
                card.style.display = "none";
            });

            let cardIndex = -1;
            switch (index) {
                case 0:
                    cards.forEach(function(card) {
                        card.style.display = "block";
                    });
                    break;
                case 1:
                    cardIndex = 0;
                    break;
                case 2:
                    cardIndex = 2;
                    break;
                case 3:
                    cardIndex = 1;
                    break;
                case 4:
                    cardIndex = 3;
                    break;
            }

            if (cardIndex !== -1) {
                cards[cardIndex].style.display = "block";
            }
        });
    });
});

let joinGroupButtonHtml = '<i class="bi bi-people-fill"></i><span class="ms-2">Join Group</span>'
let leaveGroupButtonHtml = '<i class="bi bi-box-arrow-right"></i><span class="ms-2">Leave Group</span>'
let locationInputContainerHTML = `<button><i class="bi bi-geo-alt"></i></button><input id="location-input" type="search" placeholder="Noida, India"><button><i class="bi bi-pencil-fill"></i></button>`
let locationInputContainerHTMLnew = `<button><i class="bi bi-geo-alt"></i></button><input id="location-input" type="search" placeholder="Enter your location"><button id="input-close-btn"><i class="bi bi-x-lg"></i></button>`

btnFollow.forEach((element)=>{
    element.addEventListener('click',()=>{
        element.classList.toggle('btn-connect');
        element.classList.toggle('btn-connect-active');
        if(element.innerHTML === "Follow"){
            element.innerHTML = "Followed";
        } else if(element.innerHTML === "Followed"){
            element.innerHTML = "Follow";
        }
    });
})

joinGroupButton.addEventListener('click',()=>{
    if(joinGroupButton.innerHTML === joinGroupButtonHtml ){
        joinGroupButton.innerHTML = leaveGroupButtonHtml;
        joinGroupButton.classList.remove('btn-primary');
        joinGroupButton.classList.add('btn-outline-secondary');
    } else if(joinGroupButton.innerHTML === leaveGroupButtonHtml){
        joinGroupButton.innerHTML = joinGroupButtonHtml;
        joinGroupButton.classList.remove('btn-outline-secondary');
        joinGroupButton.classList.add('btn-primary');
    }
})

locationInputContainer.addEventListener('click',()=>{
    locationInputContainer.innerHTML = locationInputContainerHTMLnew;
})
