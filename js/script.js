
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
        const homeSearch = this.document.querySelector(".search-home-section");
        let lastScrollY = window.scrollY;

        window.addEventListener("scroll", () => {
            if(lastScrollY < window.scrollY) {
                console.log("going down");
                homeSearch.classList.add("search--hidden");
            } else {
                console.log("going up");
                homeSearch.classList.remove("search--hidden");
            }

            lastScrollY = window.scrollY;
        });
    }
});