
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
        /* const addToCardBtn = this.document.getElementsByClassName("add_to_card");
        console.log(addToCardBtn[0]); */
        let lastScrollY = window.scrollY;

        window.addEventListener("scroll", () => {
            if(lastScrollY < window.scrollY) {
                homeSearch.classList.add("search--hidden");
            } else {
                homeSearch.classList.remove("search--hidden");
            }

            lastScrollY = window.scrollY;
        });
    }
});

function addToCardBtn(myElement) {
    const father = myElement.parentElement;
    
    if(father.classList[1] == "clickedBtn") {
        father.classList.remove("clickedBtn");
        myElement.setAttribute('src', "../assets/icons/add_to_cart.svg");
    } else {
        father.classList.add("clickedBtn");
        myElement.setAttribute('src', "../assets/icons/selected-to-buy.svg");
    }
}