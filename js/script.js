var btnHomeMenu = null, userData = null, arrayProducts = [], btnShowShoppingCard = null, linkLogo, textLogo, 
wrapperHomeShoppItems;

fetch("../data/users.json")
.then(data => data.json())
.then(result => {
    userData = result.login[0];
});

fetch("../data/products.json")
.then(data => data.json())
.then(result => {
    arrayProducts = result.product;
    console.log(arrayProducts);
}).catch(err => console.log(err));

window.addEventListener("load", function() {
    /* console.log(window.location.href); */
    if(window.location.href == "http://127.0.0.1:5500/index.html") {
        const btnLogin = this.document.getElementById("login-btn");
    
        btnLogin.addEventListener("click", function() {
            window.location.href = "/views/home.html";
        });
    }

    if(window.location.href == "http://127.0.0.1:5500/views/home.html") {
        const homeSearch = this.document.querySelector(".search-home-section");
        btnHomeMenu = this.document.getElementById("js-menu-tab");
        btnShowShoppingCard = this.document.getElementById("js-shopping-card-tab");
        linkLogo = this.document.getElementById("js-link-logo");
        textLogo = this.document.getElementById("js-tittle-logo");
        wrapperHomeShoppItems =  this.document.getElementById("js-shopping-container-items");
        
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

function showMyAccount() {
    window.location.href = "../views/my-account.html";
}

function showLogin() {
    window.location.href = "../index.html";
}

function addToCardBtn(myElement) {
    const father = myElement.parentElement;
    const article = father.parentElement;
    
    if(father.classList[1] == "clickedBtn") {
        father.classList.remove("clickedBtn");
        myElement.setAttribute('src', "../assets/icons/add_to_cart.svg");
        let filteredProducts = userData.currentSelectedProducts.filter((item) => item.idProduct != article.dataset.product);
        userData.currentSelectedProducts = filteredProducts;
    } else {
        father.classList.add("clickedBtn");
        myElement.setAttribute('src', "../assets/icons/selected-to-buy.svg");
        userData.currentSelectedProducts.push({ idProduct: article.dataset.product });
    }
}

function showMenu() {
    btnHomeMenu.classList.add("menu-active");
    document.body.style.overflow = "hidden";
}

function hideMenu() {
    btnHomeMenu.classList.remove("menu-active");
    document.body.style.overflow = "scroll";
}

function handleHomeList(myElement) {
    if(!myElement.classList[1]) { // execute the code when the item clicked is not selected.
        const oldSelectedItem = document.getElementsByClassName("selected");
        oldSelectedItem[0].classList.remove("selected");
        myElement.classList.add("selected");
    }
}

function showShoppingCard() {
    if(btnShowShoppingCard.classList[1] == "menu-active") {
        btnShowShoppingCard.classList.remove("menu-active");
        document.body.style.overflow = "scroll";
        textLogo.classList.add("hide-logo");
        linkLogo.classList.remove("hide-logo");
    } else {
        btnShowShoppingCard.classList.add("menu-active");
        document.body.style.overflow = "hidden";
        linkLogo.classList.add("hide-logo");
        textLogo.classList.remove("hide-logo");
        showProductsSelected();
    }
}

function showProductsSelected() {
    let concatArticles = "";
    let shoppingCardItems = userData.currentSelectedProducts.map(item => {
        var infoProduct = null;
        for(let obj in arrayProducts) {
            if(arrayProducts[obj].id == item.idProduct) {
                infoProduct = arrayProducts[obj];
                console.log(infoProduct);
                concatArticles += "<article class='shopping-card-item'>" +
                                        "<div class='front-container'>" +
                                            "<div class='image-border'>" +
                                                "<img class='image-shopping-card' src='" + infoProduct.imgs[0].img + "' alt='image of product'>" +
                                            "</div>" +
                                            "<span class='name-product'>" + infoProduct.name + "</span>" +
                                        "</div>" +
                                        "<div class='back-container'>" +
                                            "<span class='price-product'>$ " + infoProduct.price + ",00</span>" +
                                            "<img onclick='deleteItem(this)' data-product='" + infoProduct.id + "' class='close-icon close-item' src='../assets/icons/x-icon.svg' alt='close item'>" +
                                        "</div>" +
                                    "</article>";
                break;
            }
        }
        return concatArticles;
    });
    wrapperHomeShoppItems.innerHTML = concatArticles;
}

function deleteItem(idElement) {
    console.log("It works");
}





