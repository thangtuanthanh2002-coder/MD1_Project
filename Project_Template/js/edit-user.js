
let editUserForm = document.getElementById("edit-user-form");
let userCodeInput = document.getElementById("user-code");
let usernameInput = document.getElementById("username");
let emailInput = document.getElementById("email");
let passwordInput = document.getElementById("password");
let roleInput = document.getElementById("role");
let dobInput = document.getElementById("dob");
let statusActive = document.getElementById("status-active");
let statusDeactive = document.getElementById("status-deactive");
let descriptionInput = document.querySelector(".description-text-input");
let editToast = document.getElementById("edit-toast");
let editError = document.getElementById("edit-error");
let backButton = document.querySelector(".back-btn");

let users = JSON.parse(localStorage.getItem("userList")) || [];
let urlParams = new URLSearchParams(window.location.search);
let userCode = urlParams.get("usercode");
let editUser = null;
for (let i = 0; i < users.length; i++) {
    if (users[i].usercode === userCode) {
        editUser = users[i];
        break;
    }
}
editUserForm.addEventListener("submit", function (event) {
    event.preventDefault();

    let username = usernameInput.value.trim();
    let email = emailInput.value.trim();
    let password = passwordInput.value;
    let role = roleInput.value;
    let birthday = dobInput.value;
    let description = descriptionInput.value;

    if (username === "" || password === "") {
        document.querySelector(".username-and-password-empty").style.display = "block";
        editError.style.display = "block";
        hasError = true;
    }
    if (password !== "" && password.length < 8) {
        document.querySelector(".password-min-length-error").style.display = "block";
        editError.style.display = "block";
        hasError = true;
    }
    
    let status = "Active";

    if (statusDeactive.checked) {
        status = "Deactive";
    }

    for (let i = 0; i < users.length; i++) {
        if (users[i].usercode === userCode) {
            users[i].username = username;
            users[i].email = email;
            users[i].password = password;
            users[i].role = role;
            users[i].birthday = birthday;
            users[i].status = status;
            users[i].description = description;

            break;
        }
    }

    localStorage.setItem("userList", JSON.stringify(users));

    setTimeout(function () {
        window.location.href = "http://127.0.0.1:5500/pages/dashboard.html";
    }, 1000);
});