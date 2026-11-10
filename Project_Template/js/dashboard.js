
 // 1. Lấy các phần tử HTML
let searchInput = document.getElementById("search-box");
let tableBody = document.getElementById("table-body");

// 2. Lấy danh sách user từ Local Storage
let users = JSON.parse(localStorage.getItem("userList")) || [];

// 3. Hàm hiển thị danh sách user
function renderUsers() {
    // Lấy từ khóa tìm kiếm
    let keyword = searchInput.value.trim().toLowerCase();

    // Tạo mảng chứa user tìm được
    let filteredUsers = [];

    // Duyệt danh sách user
    for (let i = 0; i < users.length; i++) {
        if (users[i].username.toLowerCase().includes(keyword)) {
            filteredUsers.push(users[i]);
        }
    }

    // Xóa dữ liệu cũ trong bảng
    tableBody.innerHTML = "";

    // Kiểm tra danh sách có dữ liệu không
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

    // Hiển thị danh sách user lên bảng
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

// 4. Xử lý chức năng tìm kiếm
searchInput.addEventListener("input", function () {
    renderUsers();
});

// 5. Xử lý chức năng Edit và Delete
tableBody.addEventListener("click", function (event) {
    let userCode = event.target.getAttribute("data-code");

    // Chuyển đến trang Edit User
    if (event.target.classList.contains("edit-user-btn")) {
        window.location.href = "./edit-user.html?usercode=" + userCode;
    }

    // Xóa user
    if (event.target.classList.contains("delete-user-btn")) {
        let confirmDelete = confirm("Bạn có chắc chắn muốn xóa người dùng này không?");

        if (confirmDelete) {
            for (let i = 0; i < users.length; i++) {
                if (users[i].usercode === userCode) {
                    users.splice(i, 1);
                    break;
                }
            }

            // Cập nhật Local Storage
            localStorage.setItem("userList", JSON.stringify(users));

            // Hiển thị lại danh sách
            renderUsers();
        }
    }
});

// 6. Hiển thị danh sách khi mở Dashboard
renderUsers();
