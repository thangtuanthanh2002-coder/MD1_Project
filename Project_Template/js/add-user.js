let addUserForm = document.getElementById("add-new-user-form");
let userCodeInput = document.getElementById("user-code");
let usernameInput = document.getElementById("username");
let emailInput = document.getElementById("email");
let passwordInput = document.getElementById("password");
let roleInput = document.getElementById("role");
let dobInput = document.getElementById("dob");
let statusActive = document.getElementById("status-active");
let statusDeactive = document.getElementById("status-deactive");
let descriptionInput = document.querySelector(".description-text-input");
let addToast = document.getElementById("add-toast");
let addError = document.getElementById("add-error");
let backButton = document.querySelector(".back-btn");
let users = JSON.parse(localStorage.getItem("userList")) || [];

addUserForm.addEventListener("submit", function (event) {
    event.preventDefault();

    let username = usernameInput.value.trim();
    let email = emailInput.value.trim();
    let password = passwordInput.value;
    let role = roleInput.value;
    let birthday = dobInput.value;
    let description = descriptionInput.value;

    if (username === "" || email === "" || password === "") {
        document.querySelector(".email-username-password-empty").style.display = "block";
        addError.style.display = "block";
        hasError = true;
    }

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email !== "" && !emailPattern.test(email)) {
        document.querySelector(".email-error").style.display = "block";
        addError.style.display = "block";
        hasError = true;
    }
    for (let i = 0; i < users.length; i++) {
        if (users[i].email.toLowerCase() === email.toLowerCase()) {
            document.querySelector(".email-exist").style.display = "block";
            addError.style.display = "block";
            hasError = true;
            break;
        }
    }

    if (password !== "" && password.length < 8) {
        document.querySelector(".password-min-length-error").style.display = "block";
        addError.style.display = "block";
        hasError = true;
    }

    let maxCode = 0;

    for (let i = 0; i < users.length; i++) {
        let codeNumber = Number(users[i].usercode.substring(1));

        if (codeNumber > maxCode) {
            maxCode = codeNumber;
        }
    }

    let newUserCode = "U" + String(maxCode + 1).padStart(3, "0");

    userCodeInput.value = newUserCode;

    let status = "Active";

    if (statusDeactive.checked) {
        status = "Deactive";
    }

    let newUser = {
        usercode: newUserCode,
        username: username,
        email: email,
        password: password,
        role: role,
        birthday: birthday,
        status: status,
        description: description
    };

    users.push(newUser);

    localStorage.setItem("userList", JSON.stringify(users));

    addToast.style.display = "block";

    setTimeout(function () {
        window.location.href = "http://127.0.0.1:5500/pages/dashboard.html";
    }, 1000);
});