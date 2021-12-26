
window.addEventListener("load", function() {
    console.log("working!!");
    const btnLogin = this.document.getElementById("login-btn");

    btnLogin.addEventListener("click", function() {
        window.location.href = "/views/home.html";
    });
});