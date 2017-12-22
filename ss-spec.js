describe('When testing the shopstyle website', function() {
    var randomNumbers = Math.random().toString(36).substring(7).toString();
    var userEmail = "bc" + randomNumbers + "@gmail.com";
    var userPassword = "Password1"


    beforeEach(function() {
      browser.driver.get("https://www.shopstyle.com/");
      // browser.waitForAngular();
      // browser.sleep(1000);
    });

    var ss_home_page = require('./pageObject/ss_home_page.js');

    xit ("a user should be able to click on megaheaders", function() {
        element(by.cssContainingText('a.nav-top-link', 'Men')).getAttribute("href").then(function(text) {
            console.log(text);
        });
        ss_home_page.megaHeaders("Men");
    });

    xit ("a user should be able to use the search bar", function() {
        ss_home_page.searchBar('gucci');
        element(by.css("ss-svg-icon.search-icon")).click();
        ss_home_page.mouseOver();
    });

    xit ("a user should be able to click on secondary headers", function() {
        ss_home_page.megaHover('Women');
        browser.sleep(1000);
        ss_home_page.secondaryHeaders('Activewear')
    });

    xit ("a user should be able to click on color filters", function() {
        ss_home_page.searchBar('gucci');
        element(by.css("ss-svg-icon.search-icon")).click();
        ss_home_page.mouseOver();

        var priceFilter = element(by.cssContainingText("h6", "Brand"));
        ss_home_page.scrollTo(priceFilter);
        ss_home_page.colorFilter('20color');
    });
    

    it ("a user should be able to click on price filters", function() {
        element(by.css("ss-svg-icon.search-icon")).click();
        var priceFilter = element(by.cssContainingText("h6", "Size"));
        ss_home_page.scrollTo(priceFilter);
        ss_home_page.discountFilter('0discount');
    });

    it ("a user should be able to use the See All Stores button", function() {
        element(by.css("ss-svg-icon.search-icon")).click();
        var priceFilter = element(by.cssContainingText("h6", "Color"));
        ss_home_page.scrollTo(priceFilter);
        ss_home_page.seeAllButton('See All Stores');
        browser.sleep(1000);
    });

    xit ("a user can click on cell to redirect to product page", function() {
        ss_home_page.searchBar('');
        element(by.css("ss-svg-icon.search-icon")).click();
        ss_home_page.seeProductPage();
    });

    xit ("a new user can use the Get Sale Alert from product page to favorite items", function() {
        ss_home_page.megaHeaders("Men");
        // browser.sleep(1000);
        ss_home_page.seeProductPage();
        // browser.sleep(2500);
        element(by.css(".label")).click();

        element(by.css("button.step-button")).isPresent().then(function(button) {
            if (button == true) {
                element(by.css('input.full-width.email-input')).sendKeys(""+userEmail+"");
                $("button.step-button").click();
                element(by.css('input.full-width.password-input')).sendKeys(""+userPassword+"");
                $("button.step-button").click();

            } else {
                element(by.css('input.full-width.email-input')).sendKeys(""+userEmail+"");
                element(by.css('input.full-width.password-input')).sendKeys(""+userPassword+"");
                element(by.css("button.submit-button")).click();
            }
        });
    });

    xit ("a new user can use the Get Sale Alert from product cell to favorite items", function() {
        ss_home_page.megaHeaders("Men");
        element.all(by.css("div.product-cell-container")).get(0).element(by.css(".save-item-icon")).click();
        element(by.css('input.full-width.email-input')).sendKeys(""+userEmail+"");
        $("button.step-button").click();
        element(by.css('input.full-width.password-input')).sendKeys(""+userPassword+"");
        $("button.step-button").click();
    });

    xit ("a new user can sign up", function() {
        element(by.buttonText("Sign Up")).click();
        element(by.css('input.full-width.email-input')).sendKeys(""+userEmail+"");
        element(by.css('input.full-width.password-input')).sendKeys(""+userPassword+"");
        element(by.css("button.submit-button")).click();
        browser.sleep(1000);
        ss_home_page.checkIfLoggedIn();
    });

    xit ("a user can click on Buy Now from product page to redirect to retailer website", function() {
        ss_home_page.megaHeaders("Men");
        element(by.css("ss-svg-icon.search-icon")).click();
        ss_home_page.seeProductPage();
        element(by.css(".buy-button")).click();
        browser.sleep(1000);
    });


});
