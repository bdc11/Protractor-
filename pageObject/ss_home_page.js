

var ss_home_page = function() {

    this.dismissBottomBanner = function(value) {
        
        element(by.css("div.slide-up-banner.animate.promo.banner-active")).isPresent().then(function(banner) {
            if (banner == true) {
                element(by.css("div.slide-up-banner")).element(by.css("svg")).click();
            }
        });
    };

    this.searchBar = function(value) {
        element(by.css("input.search-input")).sendKeys(value);
    };
    
    this.hitEnter = function() {
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
    };

    this.mouseOver = function() {
        browser.sleep(1000);
        browser.actions().mouseMove(element(by.buttonText('Sign Up'))).perform(); //dismiss modal
        browser.sleep(1000);
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
        // browser.executeScript('window.scrollTo(0,10000);').then(function () {
        //     console.log('scrolling down to dismiss header and put cells into view');
        // });
    };

    this.megaHover = function(hover) {
        browser.actions().mouseMove(element(by.cssContainingText('a.nav-top-link', hover))).perform();
    };

    this.secondaryHeaders = function(second) {
        // megaHover('Women');
        element.all(by.cssContainingText('a.menu-link', second)).get(0).click();
    };

    this.brandFilter = function(brand) {
        element(by.css("label[for='"+brand+"']")).click();
    };

    this.seeAllButton = function(button) {
        element(by.buttonText(button)).click();
        expect(element(by.css("div.popup-filter")));
    };

    this.seeProductPage = function() {
        var productCell = element.all(by.css("div.product-cell-container")).get(0);
        var magnifyGlass = element.all(by.css("div.product-cell-container")).get(0).element(by.css("a.detail-link"));

        productCell.element(by.css(".zoom-icon")).isPresent().then(function(zoomIcon) {
            if (zoomIcon == true) {
                magnifyGlass.click();

            } else {
                productCell.element(by.css("a.product-name")).click();
            }
        });

        browser.getCurrentUrl().then(function(url){
            console.log("==>Printing out product url for debug: "+url+" ");
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
        element.all(by.css("div.user-link")).get(0).$("span").getText().then(function(login) {
        expect(login).toBe("You");
        });
    };

};
module.exports = new ss_home_page();
