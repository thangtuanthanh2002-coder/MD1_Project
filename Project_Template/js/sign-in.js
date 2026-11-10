let signInForm = document.getElementById("sign-in-form");
let emailInput = document.getElementById("email");
let passwordInput = document.getElementById("password");
let rememberCheckbox = document.getElementById("save-loggin-checkbox");
let loginValidation = document.getElementById("login-validation");
let loginError = document.getElementById("login-error");
let loginToast = document.getElementById("login-toast");
let users = JSON.parse(localStorage.getItem("userList")) || [];
signInForm.addEventListener("submit", function (event) {
    event.preventDefault();
    let email = emailInput.value.trim();
    let password = passwordInput.value;
    loginValidation.style.display = "none";
    loginError.style.display = "none";
    loginToast.style.display = "none";
    document.querySelector(".email-cannot-blank").style.display = "none";
    document.querySelector(".password-cannot-blank").style.display = "none";
    let hasError = false;
    if (email === "") {
        document.querySelector(".email-cannot-blank").style.display = "block";
        loginValidation.style.display = "block";
        hasError = true;
    }
    if (password === "") {
        document.querySelector(".password-cannot-blank").style.display = "block";
        loginValidation.style.display = "block";
        hasError = true;
    }
    if (hasError) {
        return;
    }
    let loginUser = null;
    for (let i = 0; i < users.length; i++) {
        if (
            users[i].email.toLowerCase() === email.toLowerCase() &&
            users[i].password === password
        ) {
            loginUser = users[i];
            break;
        }
    }
    if (loginUser === null) {
        loginError.style.display = "block";
        return;
    }
    let currentUser = {
        usercode: loginUser.usercode,
        username: loginUser.username,
        email: loginUser.email,
        role: loginUser.role
    };
    localStorage.removeItem("currentUser");
    sessionStorage.removeItem("currentUser");
    if (rememberCheckbox.checked) {
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
        sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
    }
    loginToast.style.display = "block";
    setTimeout(function () {
        window.location.href = "http://127.0.0.1:5500/pages/dashboard.html";
    }, 1000);
});
let eyeIcon = document.querySelector(".input-div .fa-eye");
let eyeSlashIcon = document.querySelector(".input-div .fa-eye-slash");
if (eyeIcon && eyeSlashIcon) {
    eyeSlashIcon.style.display = "none";
    eyeIcon.addEventListener("click", function () {
        passwordInput.type = "text";
        eyeIcon.style.display = "none";
        eyeSlashIcon.style.display = "inline";
    });
    eyeSlashIcon.addEventListener("click", function () {
        passwordInput.type = "password";
        eyeSlashIcon.style.display = "none";
        eyeIcon.style.display = "inline";
    });
}