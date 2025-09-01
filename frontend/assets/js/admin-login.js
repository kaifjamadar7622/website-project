// admin-login.js

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const errorMessage = document.getElementById("errorMessage");

    // Dummy credentials for testing (replace with backend auth later)
    const validUsername = "admin";
    const validPassword = "admin123";

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        // Simple validation
        if (!username || !password) {
            errorMessage.textContent = "Please enter both username and password.";
            errorMessage.style.display = "block";
            return;
        }

        // Check credentials
        if (username === validUsername && password === validPassword) {
            // Clear error
            errorMessage.style.display = "none";

            // Optionally store login state (localStorage/sessionStorage)
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("adminName", "Yashraj Admin");

            // Redirect to dashboard
            window.location.href = "dashboard.html";
        } else {
            errorMessage.textContent = "Invalid username or password.";
            errorMessage.style.display = "block";
        }
    });
});
