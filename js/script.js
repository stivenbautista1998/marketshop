
window.addEventListener("load", function() {
    console.log("working!!");
    /* console.log(window.location.href); */
    if(window.location.href == "http://127.0.0.1:5500/index.html") {
        const btnLogin = this.document.getElementById("login-btn");
    
        btnLogin.addEventListener("click", function() {
            window.location.href = "/views/home.html";
        });
    }

    if(window.location.href == "http://127.0.0.1:5500/views/home.html") {
        /* const homeNav = this.document.getElementById("home-nav"); */
    }
});