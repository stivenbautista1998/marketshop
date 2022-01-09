var btnHomeMenu = null, userData = null, arrayProducts = [], btnShowShoppingCard = null, textLogo, 
wrapperHomeShoppItems, totalTable, lastIds = "", inputsAccount, wrapperProducts, productDetailWrapper, currentProductFilter = "all";
var detailImgProduct, detailPriceProduct, detailTittleProduct, detailDescripProduct, detailBtn, detailBtnText, searchInputElement,
previousId = "", homeSearchInput, searchCleanIcon, getTotalLoadedProducts = 0, userText, passText, errorMessage,
labelsLogin, btnLogin, firstChange = false, menuNav, itemAllMobile, itemAllDesk, leftNav, headerHomeNav, counter;
// another way of getting attributes:  element.getAttribute('attribute-name'); 
// document.getElementById("myBtn").click();  -- code to click a determined button.
//myStyle = window.getComputedStyle(headerHomeNav) || headerHomeNav.currentStyle;

userData = Login[0];
arrayProducts = Products;

/* fetch("../data/products.json")
.then(data => data.json())
.then(result => {
    arrayProducts = result.product;
}).catch(err => console.log(err));
 */

// execute the application code depending of the current web page when the whole app loaded.
window.addEventListener("load", function() {
    if(window.location.href == "https://stivenbautista1998.github.io/marketshop/") {
        userText = document.getElementById("js-user-txt");
        passText = document.getElementById("js-password-txt");
        errorMessage = document.getElementById("js-error-message");
        labelsLogin = document.getElementsByTagName("label");
        btnLogin = this.document.getElementById("login-btn");
    
        btnLogin.addEventListener("click", validateLogin);
        userText.addEventListener("input", changeUserLogin);
        passText.addEventListener("input", changeUserLogin);
        passText.addEventListener("keyup", checkLoginText);
    }

    if(window.location.href == "https://stivenbautista1998.github.io/marketshop/views/home.html") {
        const homeSearch = this.document.querySelector(".search-home-section");
        btnHomeMenu = this.document.getElementById("js-menu-tab");
        btnShowShoppingCard = this.document.getElementById("js-shopping-card-tab");
        textLogo = this.document.getElementById("js-tittle-logo");
        wrapperHomeShoppItems =  this.document.getElementById("js-shopping-container-items");
        totalTable = this.document.getElementById("js-shopping-total");
        wrapperProducts = document.getElementById("js-products-container");
        productDetailWrapper = document.getElementById("js-product-detail");
        detailBtn = document.getElementById("js-detail-btn");
        detailBtnText = document.getElementById("js-detail-btn-text");
        itemAllMobile = document.getElementById("js-all-mobile");
        itemAllDesk = document.getElementById("js-all-desk");
        homeSearchInput = document.getElementById("search-input");
        searchCleanIcon = document.getElementById("js-clean-search");
        menuNav = document.getElementById("js-menu-nav");
        leftNav = document.getElementById("js-left-nav");
        headerHomeNav = document.querySelector(".header-home-nav");
        counter = document.getElementById("js-counter-circle");
        searchInputElement = document.querySelector(".search-home-section");

        detailImgProduct = document.getElementById("js-detail-img");
        detailPriceProduct = document.getElementById("js-detail-price");
        detailTittleProduct = document.getElementById("js-detail-tittle");
        detailDescripProduct = document.getElementById("js-detail-descrip");
        loadProducts();
        calcShoppingTabRightMargin();
        
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

    if(window.location.href == "https://stivenbautista1998.github.io/marketshop/views/my-account.html") {
        inputsAccount = document.getElementsByClassName("general-input");
    }
});

// when the screen is hugger than 499px then it will remove the text "Shopping cart" and will show the image icon.
window.addEventListener("resize", () => {
    if(window.location.href == "https://stivenbautista1998.github.io/marketshop/views/home.html") {
        if(this.innerWidth >= 500) {
            if(textLogo.classList[0] != "hide-logo") {
                textLogo.classList.add("hide-logo");
                leftNav.classList.remove("hide-logo");
            }
        }
        calcShoppingTabRightMargin();
    }
});

// function that set the margin right of the shopping cart tab depending of the screen size.
function calcShoppingTabRightMargin() {
    if(this.innerWidth < 500) {
        btnShowShoppingCard.style.right = 0;
        productDetailWrapper.style.right = 0;
        searchInputElement.style.left = "5%";
    } else if(this.innerWidth < 1187) {
        btnShowShoppingCard.style.right = "5px";
        productDetailWrapper.style.right = "5px";
        searchInputElement.style.left = "5%";
    } else {
        const shoppingTabMarginRight = (window.innerWidth - headerHomeNav.offsetWidth) / 2;
        btnShowShoppingCard.style.right = shoppingTabMarginRight + "px";
        productDetailWrapper.style.right = shoppingTabMarginRight + "px";
        searchInputElement.style.left = shoppingTabMarginRight + 15 + "px";
    }
}

// function that change the url of the webpage to the create account view.
function showMyAccount() {
    window.location.href = "../views/create-account.html";
}

// function that change the url of the webpage to the login view.
function showLogin() {
    window.location.href = "../index.html";
}


// update the state of the product and change the "add to cart" image of the home section according to it.
function addToCardBtn(idMyElement) {
    if(document.getElementById(idMyElement) === null) {
        let filteredProducts = userData.currentSelectedProducts.filter((item) => item.idProduct != idMyElement);
        userData.currentSelectedProducts = filteredProducts;
        counter.textContent = userData.currentSelectedProducts.length;
    } else {
        const myElement = document.getElementById(idMyElement);
        const father = myElement.parentElement;
        
        if(father.classList[1] == "clickedBtn") {
            father.classList.remove("clickedBtn");
            myElement.setAttribute('src', "../assets/icons/add_to_cart.svg");
            let filteredProducts = userData.currentSelectedProducts.filter((item) => item.idProduct != idMyElement);
            userData.currentSelectedProducts = filteredProducts;
            counter.textContent = userData.currentSelectedProducts.length;
        } else {
            father.classList.add("clickedBtn");
            myElement.setAttribute('src', "../assets/icons/selected-to-buy.svg");
            userData.currentSelectedProducts.push({ idProduct: idMyElement });
            counter.textContent = userData.currentSelectedProducts.length;
        }
    }
}

// function that show the menu of the home section
function showMenu() {
    btnHomeMenu.classList.add("menu-active");
    document.body.classList.add("no-scroll");
}

// function that hide the menu of the home section
function hideMenu() {
    btnHomeMenu.classList.remove("menu-active");
    document.body.classList.remove("no-scroll");
}

// change the look of the nav list on the home section when a different item of the list is clicked.
function handleHomeList(myElement) {
    const fater = myElement.parentElement;
    if(!myElement.classList[1]) { // execute the code when the item clicked is not selected.
        const oldSelectedItemMobile = document.querySelector(".selected-item-mobile");
        const oldSelectedItemDesk = document.querySelector(".selected-item-desk");
        oldSelectedItemDesk.classList.remove("selected-item-desk");
        oldSelectedItemMobile.classList.remove("selected-item-mobile");
        if(fater.id == "home-nav-mobile") {
            myElement.classList.add("selected-item-mobile");
            const mobileItem = document.getElementById("js-" + myElement.innerHTML.toLowerCase() + "-desk");
            mobileItem.classList.add("selected-item-desk");
        } else if(fater.id == "home-nav-desk") {
            myElement.classList.add("selected-item-desk");
            const deskItem = document.getElementById("js-" + myElement.innerHTML.toLowerCase() + "-mobile");
            deskItem.classList.add("selected-item-mobile");
        }

        currentProductFilter = myElement.innerHTML.toLowerCase();
        homeSearchInput.value = "";
        searchCleanIcon.classList.remove("close-vissible");
        loadProducts(myElement.innerHTML.toLowerCase());
        
    } else if(myElement.innerHTML == "All" && arrayProducts.length != getTotalLoadedProducts) {
        console.log("All item is been reoladed!!");
        loadProducts(); // is executed when the All filter is selected but not all the products are being shown.
    }
}

// function created to remove the styles added when showing the shopping cart tab.
function removeShoppingTabStyle() {
    btnShowShoppingCard.classList.remove("menu-active");
    document.body.classList.remove("no-scroll");
    textLogo.classList.add("hide-logo");
    leftNav.classList.remove("hide-logo");
}

// the function shows or hides the shopping cart tab when the shopping cart button of the home section is clicked.
function showShoppingCard() {
    if(window.innerWidth < 500) { // if the screen size is more less than 500px then work with the mobile class for menu.  
        btnShowShoppingCard.classList.remove("show-section");
        if(btnShowShoppingCard.classList[1] == "menu-active") {
            removeShoppingTabStyle();
        } else {
            btnShowShoppingCard.classList.add("menu-active");
            document.body.classList.add("no-scroll");
            leftNav.classList.add("hide-logo");
            textLogo.classList.remove("hide-logo");
            showProductsSelected();
        }
    } else { // if screen size >= 500px then work with the menu class for larger devices.
        if(btnShowShoppingCard.classList[1] == "show-section") {
            btnShowShoppingCard.classList.remove("show-section");
        } else if(btnShowShoppingCard.classList[1] == "menu-active") {
            removeShoppingTabStyle();
            calcShoppingTabRightMargin();
        } else {
            btnShowShoppingCard.classList.add("show-section");
            calcShoppingTabRightMargin();
            showProductsSelected();
        }
    }
}

// the function loads all the products of the home section depending of the filter parameter.
function loadProducts(filter = "all", searchInput = "") {
    let infoProduct = null, concatArticles = "";
    let newFilterOfProducts = filterHomeProducts(filter, searchInput);
    getTotalLoadedProducts = newFilterOfProducts.length;

    for(let productItem in newFilterOfProducts) {
        infoProduct = newFilterOfProducts[productItem];

        // this code is used to check if the product has been selected or not by the user and affect the style according of it.
        let isSelected = userData.currentSelectedProducts.filter(item => item.idProduct == infoProduct.id);
        let imgUrl = (isSelected[0] ? "../assets/icons/selected-to-buy.svg" : "../assets/icons/add_to_cart.svg");

        concatArticles += `<article data-product="${infoProduct.id}" class="article-section-item">
                                <div onclick="showProductDetails('${infoProduct.id}')" class="article-section-item__img new-img" style="background-image: url('${infoProduct.imgs[0].img}');">
                                </div>
                                <div class="article-section-item__content ${isSelected[0] ? 'clickedBtn' : ''}">
                                    <div class="card-text">
                                        <span class="grey__message price-product">${becomeDollar(infoProduct.price)}</span>
                                        <span class="green__message name-product">${capitalizeAll(infoProduct.name)}</span>
                                    </div>
                                    <div class="circle-border"></div>
                                    <img id="${infoProduct.id}" class="add_to_card" onclick="addToCardBtn('${infoProduct.id}')" src="${imgUrl}" alt="image of a shopping car">
                                </div>
                            </article>`;
    }
    const fiveTails = `<div class="filler"></div><div class="filler"></div><div class="filler"></div><div class="filler"></div><div class="filler"></div>`;
    wrapperProducts.innerHTML = concatArticles + fiveTails;
    if(concatArticles == "") {
        wrapperProducts.innerHTML = `<img src="../assets/icons/noresults.png" class="not-found-icon" alt="icon that indicates that there are no results">`;
    }
}


// this function validate what products are selected and show them into the shopping cart tab.
function showProductsSelected() {
    let concatArticles = "", count = 0;

    if(getCurrentIds() == "") { // showing an image when there is no items to show.
        wrapperHomeShoppItems.innerHTML = `<img class="noshop-icon" src="../assets/icons/noshop.svg" alt="image of shopping car">`;
        totalTable.innerHTML = "$ 0,00";
    }

    if(lastIds != getCurrentIds()) { // ask if the items had had any update.
        lastIds = "";

        for(let current in userData.currentSelectedProducts) {
            var infoProduct = null;
            let currentID = userData.currentSelectedProducts[current].idProduct;
            lastIds += currentID;
    
            for(let obj in arrayProducts) {
                if(arrayProducts[obj].id == currentID) {
                    infoProduct = arrayProducts[obj];
                    count += infoProduct.price;
                    concatArticles += "<article class='shopping-card-item'>" +
                                            "<div class='front-container'>" +
                                                "<div class='image-border' style='background-image: url(" + infoProduct.imgs[0].img + ");'></div>" +
                                                "<span class='name-product'>" + capitalizeAll(infoProduct.name) + "</span>" +
                                            "</div>" +
                                            "<div class='back-container'>" +
                                                "<span class='price-product'>" + becomeDollar(infoProduct.price) + "</span>" +
                                                "<img onclick='deleteItem(this)' data-product='" + infoProduct.id + "' class='close-icon close-item' src='../assets/icons/x-icon.svg' alt='close item'>" +
                                            "</div>" +
                                        "</article>";
                    break;
                }
            }
        }
        if(concatArticles != "") { // if there is a change show it in the screen
            wrapperHomeShoppItems.innerHTML = concatArticles;
            totalTable.innerHTML = becomeDollar(count);
        }
    }
}

// the function update the state of the product to "not selected" and remove it from the shopping cart tab view.
function deleteItem(myItem) {
    const father = myItem.parentElement;
    const article = father.parentElement;
    let itemID = myItem.dataset.product;
    let newFilter = userData.currentSelectedProducts.filter(item => item.idProduct != itemID);
    userData.currentSelectedProducts = newFilter;
    article.classList.add("deleted-item");
    setTimeout(() => {
        showProductsSelected();
        addToCardBtn(itemID);
    }, 300);
}

// function that returns an string with all the ids of the products that are currently selected by the user.
function getCurrentIds() {
    let stringIds = "";
    for(let current in userData.currentSelectedProducts) {
        stringIds +=  userData.currentSelectedProducts[current].idProduct;
    }
    return stringIds;
}

// function that update the look of the my account view and allows to edit its fields.
function editAccount(myElement) {
    if(myElement.innerHTML != "Save") {
        myElement.innerHTML = "Save";
        myElement.classList.remove("white--btn");
        myElement.classList.add("green--btn");

        for(let input in inputsAccount) {
            if(!isNaN(input)) { // validating that just proceed when the index is a number.
                inputsAccount[input].style.backgroundColor = "#F7F7F7";
                inputsAccount[input].style.paddingLeft = ".7em";
                inputsAccount[input].value = inputsAccount[input].placeholder;
                inputsAccount[input].readOnly = false;
            } else {
                break;
            }
        }
    } else {
        window.location.href = "../views/home.html";
    }
}

// function that change the url of the webpage to my-order view.
function showDetails() {
    window.location.href = "http://127.0.0.1:5500/views/my-order.html";
}

// function that validates if the login info is correct.
function validateLogin() {
    console.log("trying!!");
    if(validateEmail(userText.value)) { // checking if the email has the correct format.
        if((userText.value == userData.email) && (passText.value == userData.password)) {
            console.log("Is correct!!");
            window.location.href = "/views/home.html";
        } else {
            console.log("Is wrong!!");
            labelsLogin[0].textContent = "Email address";
            userText.focus();
            showErrorLook(true);
            firstChange = true;
        }
    } else {
        console.log("wrong email given!!");
        labelsLogin[0].textContent = "Enter a valid email address";
        userText.focus();
        showErrorLook(true);
        firstChange = true;
    }
}

// shows the error look in the login section when the firstChange variable is set to true. (which means is the first time)
function changeUserLogin() {
    if(firstChange) {
        showErrorLook(false);
        firstChange = false;
        console.log("is changing =)!!");
    }
}

// track when the user press enter to execute the login function.
function checkLoginText(event) {
    if(event.keyCode == 13) { // keyCode:13 means the enter key.
        validateLogin();
    }
}

// function that shows the styles the user will see when typing wrong information in the login section.
function showErrorLook(showError) {
    userText.style.border = (showError ? "1px solid #D25050" : "none");
    passText.style.border = (showError ? "1px solid #D25050" : "none");
    btnLogin.disabled = (showError ? "disabled" : false);
    labelsLogin[0].style.color = (showError ? "#D25050" : "#000");
    labelsLogin[1].style.color = (showError ? "#D25050" : "#000");

    if(showError) {
        btnLogin.classList.add("disabled-btn");
        errorMessage.classList.add("show-error-message");
    } else {
        btnLogin.classList.remove("disabled-btn");
        errorMessage.classList.remove("show-error-message");
    }
}

// function that shows and update the values of the product detail view.
function showProductDetails(idProduct) {
    if(idProduct != previousId) {
        const productInfo = arrayProducts.filter(item => item.id == idProduct);
        detailImgProduct.style.backgroundImage = `url('${productInfo[0].imgs[0].img}')`;
        detailPriceProduct.innerHTML = becomeDollar(productInfo[0].price);
        detailTittleProduct.innerHTML = capitalizeAll(productInfo[0].name);
        detailDescripProduct.innerHTML = productInfo[0].description;
        detailBtn.setAttribute("data-product", idProduct);
        previousId = productInfo[0].id;
    }
    let selected = userData.currentSelectedProducts.filter((item) => item.idProduct == idProduct);
    if(selected[0] != undefined) { // I verify if the product has been added to the cart or not.
        detailBtnText.innerHTML = "Remove from cart";
    } else {
        detailBtnText.innerHTML = "Add to cart";
    }
    productDetailWrapper.classList.add("show-product-detail");
    document.body.classList.add("no-scroll");
    calcShoppingTabRightMargin();
}

// function that hides the product detail view.
function hideProductDetail() {
    productDetailWrapper.classList.remove("show-product-detail");
    document.body.classList.remove("no-scroll");
}

// function that updates the text of the button on the product detail view according to the state of the product.
function addToShopp(myElement) {
    addToCardBtn(myElement.dataset.product);
    if(detailBtnText.innerHTML == "Remove from cart") {
        detailBtnText.innerHTML = "Add to cart";
    } else {
        detailBtnText.innerHTML = "Remove from cart";
    }
}

// function that filters the list of products depending on the filter type passed passed as parameter.  
function filterHomeProducts(filterType, searchInput) {
    if(filterType != "all") {
        return arrayProducts.filter(item => item.type == filterType);
    } else {
        if(searchInput != "") {
            return getFilteredBySearchProducts(searchInput);
        } else {
            return arrayProducts;
        }
    }
}

// function that execute the filter on the home section and close the nav tab.
function changeFilterSinceNav(filter) {
    const newElement = document.getElementById("js-" + filter + "-mobile");
    handleHomeList(newElement);
    hideMenu();
}

// function that makes a filter besed on the value of the search input of the home section.
function getFilteredBySearchProducts(inputFilter) {
    return arrayProducts.filter(item => item.name.includes(inputFilter));
}

// function that make search of products depending on what the user wrote in the input search field.
function searchHandler(event) {
    if(event.target.value == "") {
        if(searchCleanIcon.classList[2]) {
            searchCleanIcon.classList.remove("close-vissible");
        }
    } else if(!searchCleanIcon.classList[2]) {
        searchCleanIcon.classList.add("close-vissible");
    }

    if(event.keyCode == 13) { // keyCode:13 means the enter key.
        event.preventDefault(); // Cancel the default action, if needed        
        if(!itemAllMobile.classList[1]) { // add class selected if the all item is not selected.
            const oldSelectedItemMobile = document.querySelector(".selected-item-mobile");
            oldSelectedItemMobile.classList.remove("selected-item-mobile");
            const oldSelectedItemDesk = document.querySelector(".selected-item-desk");
            oldSelectedItemDesk.classList.remove("selected-item-desk");
            itemAllMobile.classList.add("selected-item-mobile");
            itemAllDesk.classList.add("selected-item-desk");
        }
        loadProducts("all", event.target.value);
    }
}

// function that cleans the search input field in the home section.
function cleanSearchInput() {
    homeSearchInput.value = "";
    searchCleanIcon.classList.remove("close-vissible");
    homeSearchInput.focus();
}

// function that shows the little tab of options for larger devices when the user email is clicked in the home section.
function handleMenuNav() {
    if(menuNav.classList[1]) {
        menuNav.classList.remove("show-section");
    } else {
        menuNav.classList.add("show-section");
    }
}

// function that converts a number passed as a parameter to a string in currency format and returns it.
function becomeDollar(value) {
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    return formatter.format(value);  
}

// function that returns a string with the first letter of each word in upper-case and the rest of it in lower-case
function capitalizeAll(str) {
    let arrWords = str.split(" "), result = "";
    for(let i in arrWords) {
        const lower = arrWords[i].toLowerCase();
        result += arrWords[i].charAt(0).toUpperCase() + lower.slice(1) + (arrWords.length - 1 != i ? " " : "");
    }
    return result;
}

// the function checks if the string given as a parameter is a correct email or not.
function validateEmail(elementValue){      
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(elementValue); 
}