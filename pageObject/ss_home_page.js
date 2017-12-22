

var ss_home_page = function() {

    this.searchBar = function(value) {
        element(by.css("input.search-input")).sendKeys(value);
    };
    
    this.hitEnter = function() {
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
    };

    this.mouseOver = function() {
        browser.actions().mouseMove(element(by.buttonText('Sign Up'))).perform(); //dismiss modal
        browser.sleep(5000);
    };

    this.scrollTo = function(choice) {
        browser.executeScript("arguments[0].scrollIntoView();", choice.getWebElement());
    };

    this.discountFilter = function(discount) {
        element(by.css("label[for='"+discount+"']")).click();
    };

    this.colorFilter = function(color) {
        element(by.css("label[for='"+color+"']")).click();
    };

    this.megaHeaders = function(mega) {
        element(by.cssContainingText('a.nav-top-link', mega)).click();
    };

    this.megaHover = function(hover) {
        browser.actions().mouseMove(element(by.cssContainingText('a.nav-top-link', hover))).perform();
    };

    this.secondaryHeaders = function(second) {
        // megaHover('Women');
        element(by.cssContainingText('a.menu-link', second)).click();
    };

    this.brandFilter = function(brand) {
        element(by.css("label[for='"+brand+"']")).click();
    };

    this.seeAllButton = function(button) {
        element(by.buttonText(button)).click();
        expect(element(by.css("div.popup-filter")));
    };

    this.seeProductPage = function() {
        var productCell = element(by.css("div.product-cell-container"));
        var magnifyingGlass = element(by.css("div.product-cell-container")).element(by.css("ss-svg-icon")).isDisplayed();

        productCell.element(by.css(".zoom-icon")).isPresent().then(function(magnifyGlass) {
            if (magnifyGlass == true) {
                element(by.css("div.product-cell-container")).element(by.css("ss-svg-icon")).click();

            } else {
                element(by.css("div.product-cell-container")).element(by.css("a.product-name")).click();
            }
        });
    };

    this.generateNewUser = function() {
        var randomNumbers = Math.random().toString(36).substring(7).toString();
        var userEmail = "bc" + randomNumbers + "@gmail.com";
        var userPassword = "Password1"
        console.log("===> Generating New User ==> email:"+userEmail+"")
        return userEmail;
        return userPassword;
    };
///
    this.newUserSignedUp = function() {
        element(by.buttonText("Sign Up")).click();
        browser.sleep(5000);
        element(by.css('input.full-width.email-input')).sendKeys("rabbabababasdjkg@gmail.com");
        element(by.css('input.full-width.password-input')).sendKeys("Password1");
        element(by.css("button.submit-button")).click();
    };

    this.newUserSignUp = function(newUser) {
        element(by.buttonText("Sign Up")).click();
        element(by.css('input.full-width.email-input')).sendKeys(newUser);
    };

    this.newUserPassword = function(password) {
        element(by.css('input.full-width.password-input')).sendKeys(password);
    };
///
    this.checkIfLoggedIn = function() {
        element(by.css("div.user-link")).$("span").getText().then(function(login) {
        expect(login).toBe("You");
        });
    };

};
module.exports = new ss_home_page();


//     this.clickContinue = function() {
//         element(by.buttonText('CONTINUE')).click();
//         return require('./animal_page.js'); //returns a reference to this page object
//     };

// };