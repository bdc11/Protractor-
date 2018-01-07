describe('When testing the gliffy website', function() {
    var randomNumbers = Math.random().toString(36).substring(7).toString();
    var userEmail = "bc" + randomNumbers + "@gmail.com"
    var existingUser = "bc123tester@mailinator.com"
    var userPassword = "Password1"


    beforeEach(function() {
      browser.driver.get("https://www.gliffy.com/");
      browser.ignoreSynchronization = true;
      // browser.sleep(1000);
    });

    afterEach(function() {
      // browser.restart()
      browser.driver.manage().deleteAllCookies();
    });
    
    var using = require('jasmine-data-provider');
    var gliffy_setup = require('./gliffyPageObject/gliffy_setup.js');
    var diagramTable = require('./gliffyPageObject/newDiagramTable.js');
    var newTabFooters = require('./gliffyPageObject/homepageNewTabFooters.js');
    var homepageFooters = require('./gliffyPageObject/homepageFooters.js');
    var megaHeaders = require('./gliffyPageObject/gliffyMegaHeaders.js');
    var allMegaHeaders = require('./gliffyPageObject/mainMegaHeaders.js');

    it ("a new user should be able to sign up for a free trial", function() {
        // element(by.css('#email')).sendKeys(""+userEmail+"");
        // element(by.css('#Password')).sendKeys(""+userPassword+"");
        // element(by.css('#org-size')).click();
        // element(by.css('option[value="1"]')).click();
        // element(by.css('.start-trial-button')).click();
        // browser.sleep(5000);
        gliffy_setup.newUserSignUp();
    });

    it ("an existing user can Log In their account", function() {
        // element(by.cssContainingText('a', 'Log In')).getAttribute("href").then(function(path) {
        //     console.log(path);
        //     element(by.cssContainingText('a', 'Log In')).click();
        //     expect(browser.driver.getCurrentUrl()).toEqual(path);
        //     element(by.css('.login-email')).sendKeys(""+existingUser+"");
        //     element(by.css('.login-password')).sendKeys(""+userPassword+"");
        //     element(by.css('.submit-button')).click();
        //     browser.sleep(5000);
        // });
        gliffy_setup.existingUserSignIn();
    });

    using(megaHeaders.productHeaderOptions, function (headers) {
        it ("a user can click on different the "+headers+" product under the Product header", function() {
            element(by.cssContainingText('a', 'Products')).click();
            browser.sleep(1000);

            element(by.cssContainingText('a', headers)).getAttribute("href").then(function(href) {
                 console.log(href);
                 element(by.cssContainingText('a', headers)).click();
                 expect(browser.driver.getCurrentUrl()).toEqual(href);
            });
        });
    });


    using(megaHeaders.exampleHeaderOptions, function (headers) {
        it ("a user can click on different the "+headers+" product under the Examples header", function() {
            element(by.cssContainingText('a', 'Examples')).click();
            browser.sleep(1000);

            element(by.cssContainingText('a', headers)).getAttribute("href").then(function(href) {
                 console.log(href);
                 element(by.cssContainingText('a', headers)).click();
                 expect(browser.driver.getCurrentUrl()).toEqual(href);
            });
        });
    });

    using(megaHeaders.moreHeaderOptions, function (headers) {
        it ("a user can click on different the "+headers+" product under the More header", function() {
            element(by.cssContainingText('a', 'More')).click();
            browser.sleep(1000);

            element(by.cssContainingText('a', headers)).getAttribute("href").then(function(href) {
                 console.log(href);
                 element(by.cssContainingText('a', headers)).click();
                 expect(browser.driver.getCurrentUrl()).toEqual(href);
            });
        });
    });

    it ("a user can buy now from the pricing header", function() {
        element(by.cssContainingText('a', 'Pricing')).click();
        browser.sleep(1000);
        var professionalPlan = element.all(by.css('.plan-padding')).get(0);
        
        professionalPlan.element(by.css('a')).getAttribute("href").then(function(href) {
            console.log(href);
            professionalPlan.element(by.css('a.hs-btn-blue')).click();
            expect(browser.driver.getCurrentUrl()).toEqual(href);
        });
    });

    it ("an existing user can choose a new diagram", function() {
        gliffy_setup.existingUserSignIn();
        element(by.cssContainingText('div.template', 'Org Chart')).click();
        browser.sleep(5000);
    });

    using(diagramTable.createNewDiagram, function (diagram) {

        it ("an existing user selects to make a new "+diagram+"", function() {
    	    gliffy_setup.existingUserSignIn();
            element(by.cssContainingText('div.template', diagram)).click();
            browser.sleep(1000);
        }); 
    });

    using(newTabFooters.newPageFooters, function (footerLinks) {
       it ("visiters can use the "+footerLinks+" footer link on the homepage", function() {
            var viewfooters = element(by.cssContainingText('h4', 'Useful Links'));
            gliffy_setup.scrollTo(viewfooters);
            browser.sleep(5000);

            element(by.cssContainingText('a', footerLinks)).getAttribute("href").then(function(footerHref) {
                console.log(footerHref);
                element(by.cssContainingText('a', footerLinks)).click();
                
                browser.getAllWindowHandles().then(function (handles) {
                    newWindowHandle = handles[1]; // this is your new window
                    browser.switchTo().window(newWindowHandle).then(function () {
                        expect(browser.driver.getCurrentUrl()).toEqual(footerHref);
                        browser.restart()
                    });
                });
        });
    });
    });

    using(homepageFooters.gliffyFooters, function (footerPick) {
       it ("visiters can use the "+footerPick+" footer link on the homepage", function() {
            var viewfooters = element(by.cssContainingText('h4', 'Useful Links'));
            gliffy_setup.scrollTo(viewfooters);
            browser.sleep(5000);

            var footerSection = element(by.css('div.row-fluid'));
            element(by.cssContainingText('a', footerPick)).getAttribute("href").then(function(footer) {
                console.log(footer);
                element(by.cssContainingText('a', footerPick)).click();
                // expect(browser.driver.getCurrentUrl()).toEqual(footer);  
        });
    });
    });

});