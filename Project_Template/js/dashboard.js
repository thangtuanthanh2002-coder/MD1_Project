let searchInput = document.getElementById("search-box");
let tableBody = document.getElementById("table-body");
let users = JSON.parse(localStorage.getItem("userList")) || [];

function renderUsers() {
    let keyword = searchInput.value;
    let filteredUsers = [];
    for (let i = 0; i < users.length; i++) {
        if (users[i].username.toLowerCase().includes(keyword)) {
            filteredUsers.push(users[i]);
        }
    }

    tableBody.innerHTML = "";

    if (filteredUsers.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center;">
                    Không tìm thấy người dùng
                </td>
            </tr>
        `;
        return;
    }

    for (let i = 0; i < filteredUsers.length; i++) {
        let user = filteredUsers[i];
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${user.usercode}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td>${user.birthday || "-"}</td>
            <td>${user.status}</td>
            <td>
                <button class="edit-user-btn" data-code="${user.usercode}">
                    Edit
                </button>
                <button class="delete-user-btn" data-code="${user.usercode}">
                    Delete
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    }
}

searchInput.addEventListener("input", function () {
    renderUsers();
});

tableBody.addEventListener("click", function (event) {
    let userCode = event.target.getAttribute("data-code");

    if (event.target.classList.contains("edit-user-btn")) {
        window.location.href = "./edit-user.html?usercode=" + userCode;
    }

    if (event.target.classList.contains("delete-user-btn")) {
        let confirmDelete = confirm("Bạn có chắc chắn muốn xóa người dùng này không?");

        if (confirmDelete) {
            for (let i = 0; i < users.length; i++) {
                if (users[i].usercode === userCode) {
                    users.splice(i, 1);
                    break;
                }
            }

            localStorage.setItem("userList", JSON.stringify(users));

            renderUsers();
        }
    }
});
renderUsers();