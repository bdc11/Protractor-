describe('When testing the shopstyle website', function() {
    var randomNumbers = Math.random().toString(36).substring(7).toString();
    var userEmail = "bc" + randomNumbers + "@gmail.com";
    var userPassword = "Password1"


    beforeEach(function() {
      browser.driver.get("https://www.shopstyle.com/");
      // browser.waitForAngular();
      // browser.sleep(1000);
    });

    afterEach(function() {
      browser.restart()
    });

    var ss_home_page = require('./pageObject/ss_home_page.js');
    var headerTable = require('./pageObject/header_table.js');
    var colorTable = require('./pageObject/color_filters.js');
    var using = require('jasmine-data-provider');

    // using(headerTable.megaheaderPick, function (headers) {

    //     it ("a user should be able to click on "+headers+" megaheader", function() {
    //         element(by.cssContainingText('a.nav-top-link', headers)).getAttribute("href").then(function(text) {
    //             console.log(text);
    //             ss_home_page.megaHeaders(headers);
    //             browser.sleep(2200);
    //             expect(browser.driver.getCurrentUrl()).toEqual(text);
    //         });
    //     }); 
    // });

    // WIP TODO
    //    using(dataTable.secondLevelHeaders, function (headers, second) {

    //     it ("a user should be able to click on megaheaders", function() {
    //         // element(by.cssContainingText('a.nav-top-link', headers)).getAttribute("href").then(function(text) {
    //         //     console.log(text);
    //             ss_home_page.megaHover(headers);
    //             browser.sleep(1000);
    //             ss_home_page.secondaryHeaders(second);
    //             // browser.sleep(1100);
    //             // expect(browser.driver.getCurrentUrl()).toEqual(text);
    //         // });
    //     });
    // });

    // it ("a user should be able to click on secondary headers", function() {
    //     ss_home_page.megaHover('Women');
    //     browser.sleep(1000);
    //     ss_home_page.secondaryHeaders('Activewear')
    // });

    // it ("a user should be able to use the search bar", function() {
    //     ss_home_page.searchBar('gucci');
    //     element(by.css("ss-svg-icon.search-icon")).click();
    //     ss_home_page.mouseOver();
    // });

    // using(colorTable.colorSideFilters, function (colors) {

    //     it ("a user should be able to click on color filters", function() {
    //         element(by.css("ss-svg-icon.search-icon")).click();

    //         var colorFilter = element(by.cssContainingText("h6", "Brand"));
    //         ss_home_page.scrollTo(colorFilter); //scroll color filter into view
    //         browser.sleep(1500);
    //         ss_home_page.mouseOver();
    //         ss_home_page.dismissBottomBanner();

    //         element(by.css("label[for='"+colors+"']")).element(by.css("a")).getAttribute("href").then(function(text) {
    //              console.log(text);
    //              ss_home_page.colorFilter(colors);
    //              browser.sleep(1500);
    //              expect(browser.driver.getCurrentUrl()).toEqual(text);
    //         });
    //     });   
    // });
    

    it ("a user should be able to click on price filters", function() {
        element(by.css("ss-svg-icon.search-icon")).click();
        var priceFilter = element(by.cssContainingText("h6", "Size"));
        ss_home_page.scrollTo(priceFilter);
        ss_home_page.mouseOver();
        ss_home_page.discountFilter('0discount');
        browser.sleep(2500);
        element.all(by.css(".struckout")).get(0).isDisplayed().then(function(discount) {
            expect(discount);
        });
    });

    // it ("a user should be able to use the See All Stores button", function() {
    //     element(by.css("ss-svg-icon.search-icon")).click();
    //     var priceFilter = element(by.cssContainingText("h6", "Color"));
    //     ss_home_page.scrollTo(priceFilter);
    //     ss_home_page.seeAllButton('See All Stores');
    //     browser.sleep(1000);
    //     element(by.css(".search-filter-input")).isDisplayed().then(function(filter) {
    //         expect(filter);
    //     });
    // });

    it ("a user can click on cell to redirect to product page", function() {
        element(by.css("ss-svg-icon.search-icon")).click();
        ss_home_page.seeProductPage();
    });

    // it ("a new user can use the Get Sale Alert from product page to favorite items", function() {
    //     ss_home_page.megaHeaders("Men");
    //     ss_home_page.mouseOver();
    //     ss_home_page.seeProductPage();
    //     element.all(by.css(".label")).get(0).click();
    //     browser.sleep(1000);

    //     element(by.css("button.step-button")).isPresent().then(function(button) {
    //         if (button == true) {
    //             element(by.css('input.full-width.email-input')).sendKeys(""+userEmail+"");
    //             $("button.step-button").click();
    //             element(by.css('input.full-width.password-input')).sendKeys(""+userPassword+"");
    //             $("button.step-button").click();

    //         } else {
    //             element(by.css('input.full-width.email-input')).sendKeys(""+userEmail+"");
    //             element(by.css('input.full-width.password-input')).sendKeys(""+userPassword+"");
    //             element(by.css("button.submit-button")).click();
    //         }
    //     });
    // });

    // it ("a new user can use the Get Sale Alert from product cell to favorite items", function() {
    //     ss_home_page.megaHeaders("Men");
    //     ss_home_page.mouseOver();
    //     element.all(by.css("div.product-cell-container")).get(0).element(by.css(".save-item-icon")).click();
    //     element(by.css('input.full-width.email-input')).sendKeys(""+userEmail+"");
    //     $("button.step-button").click();
    //     element(by.css('input.full-width.password-input')).sendKeys(""+userPassword+"");
    //     $("button.step-button").click();
    // });

    // it ("a new user can sign up", function() {
    //     element(by.buttonText("Sign Up")).click();
    //     element(by.css('input.full-width.email-input')).sendKeys(""+userEmail+"");
    //     element(by.css('input.full-width.password-input')).sendKeys(""+userPassword+"");
    //     element(by.css("button.submit-button")).click();
    //     browser.sleep(1500);
    //     ss_home_page.checkIfLoggedIn();
    // });

    it ("a user should see that the price is the same for the product cell and product page", function() {
        ss_home_page.megaHeaders("Men");
        var firstProductCell = element.all(by.css("div.product-cell-container")).get(0);
        
        firstProductCell.element(by.css(".struckout")).isPresent().then(function(discountPrice) {
            if (discountPrice == true) {
                var cellPrice = element.all(by.css("div.product-cell-container")).get(0).element(by.css(".product-price.deal")).getText().then(function(cellPrice) {
                console.log("first cell item price is "+cellPrice+"");
                ss_home_page.seeProductPage();
                    var pagePrice = element(by.css("span.price")).getText().then(function(productPrice) {
                    console.log("first product page item price is "+productPrice+"");
                    console.log("found two prices: cell price = "+cellPrice+" and page price = "+productPrice+" ")
                    expect(cellPrice).toEqual(productPrice);
                    });
                });

            } else {
                var cellPrice = element.all(by.css("div.product-cell-container")).get(0).element(by.css(".product-price")).getText().then(function(cellPrice) {
                console.log("first cell item price is "+cellPrice+"");
                ss_home_page.seeProductPage();
                    var pagePrice = element(by.css("span.price")).getText().then(function(productPrice) {
                    console.log("first product page item price is "+productPrice+"");
                    console.log("found two prices: cell price = "+cellPrice+" and page price = "+productPrice+" ")
                    expect(cellPrice).toEqual(productPrice);
                    });
                });
            }
        });
    });

    // it ("a user can click on Buy Now from product page to redirect to retailer website", function() {
    //     ss_home_page.megaHeaders("Men");
    //     element(by.css("ss-svg-icon.search-icon")).click();
    //     ss_home_page.seeProductPage();
    //     element(by.css(".buy-button")).click();
    //     browser.sleep(2500);
    // });
});