let signUpForm = document.getElementById("sign-up-form");
let emailInput = document.getElementById("email");
let usernameInput = document.getElementById("username");
let passwordInput = document.getElementById("password");
let signUpValidation = document.getElementById("sign-up-validation");
let signUpError = document.getElementById("sign-up-error");
let signUpToast = document.getElementById("sign-up-toast");
let users = JSON.parse(localStorage.getItem("userList")) || [];
signUpForm.addEventListener("submit", function (event) {
    event.preventDefault();
    let email = emailInput.value;
    let username = usernameInput.value;
    let password = passwordInput.value;
    signUpValidation.style.display = "none";
    signUpError.style.display = "none";
    signUpToast.style.display = "none";
    let hasError = false;
    if (email === "") {
        document.querySelector(".email-cannot-blank").style.display = "block";
        signUpValidation.style.display = "block";
        hasError = true;
    }
    if (username === "") {
        document.querySelector(".username-cannot-blank").style.display = "block";
        signUpValidation.style.display = "block";
        hasError = true;
    }
    if (password === "") {
        document.querySelector(".password-cannot-blank").style.display = "block";
        signUpValidation.style.display = "block";
        hasError = true;
    }
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email !== "" && !emailRegex.test(email)) {
        document.querySelector(".email-error").style.display = "block";
        signUpError.style.display = "block";
        hasError = true;
    }
    if (email !== "") {
        for (let i = 0; i < users.length; i++) {
            if (users[i].email === email) {
                document.querySelector(".email-exist").style.display = "block";
                signUpError.style.display = "block";
                hasError = true;
                break;
            }
        }
    }
    if (password !== "" && password.length < 8) {
        document.querySelector(".password-min-length-error").style.display = "block";
        signUpError.style.display = "block";
        hasError = true;
    }
   
    let maxCode = 0;
    for (let i = 0; i < users.length; i++) {
        let codeNumber = Number(users[i].usercode.substring(1));

        if (codeNumber > maxCode) {
            maxCode = codeNumber;
        }
    }
    let userCode = "U" + String(maxCode + 1).padStart(3, "0");
    let newUser = {
        usercode: userCode,
        username: username,
        email: email,
        password: password,
        role: "user",
        birthday: "",
        status: "Active",
        description: ""
    };
    users.push(newUser);
    localStorage.setItem("userList", JSON.stringify(users));
    signUpToast.style.display = "block";
    signUpForm.reset();
    setTimeout(function () {
        window.location.href = "http://127.0.0.1:5500/pages/sign-in.html";
    }, 1200);
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