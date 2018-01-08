describe('When testing the gliffy website', function() {
    var randomNumbers = Math.random().toString(36).substring(7).toString();
    var userEmail = "bc" + randomNumbers + "@gmail.com"
    var existingUser = "bc123tester@mailinator.com"
    var userPassword = "Password1"


    beforeEach(function() {
      browser.driver.get("https://www.gliffy.com/");
      browser.ignoreSynchronization = true;
    });

    afterEach(function() {
      // browser.restart()
      browser.driver.manage().deleteAllCookies();
    });
    
    var using = require('jasmine-data-provider');
    var gliffy_setup = require('./gliffyPageObject/gliffy_setup.js');
    var diagramTable = require('./gliffyPageObject/newDiagramTable.js');
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

    using(homepageFooters.gliffyFooters, function (footerLinks) {
       it ("visiters can use the "+footerLinks+" footer link on the homepage", function() {
            var viewfooters = element(by.cssContainingText('h4', 'Useful Links'));
            gliffy_setup.scrollTo(viewfooters);

            element(by.cssContainingText('a', footerLinks)).getAttribute("href").then(function(footerHref) {
                console.log(footerHref);
                element(by.cssContainingText('a', footerLinks)).click();
                
                switch (footerLinks) {
                    case "Support Desk":
                        gliffy_setup.checkNewTabPath(footerHref); 

                    case "User Manual":
                        gliffy_setup.checkNewTabPath(footerHref);

                    default: 
                        gliffy_setup.checkPath(footerHref);  
                }
        });
    });
    });

    //WIP
    it ("visiters click on all footer looks and redirected to corresponding page", function() {
            var viewfooters = element(by.cssContainingText('h4', 'Useful Links'));
            gliffy_setup.scrollTo(viewfooters);
            browser.sleep(1500);          

            // element.all(by.css('.footer_col3 a')).each(function (size) { 
            //     size.getText().then(function (array) {
            //     console.log(array);
            // });
            // });

            element.all(by.css('.footer_col3 a')).then(function(size){
                console.log(size.length);

                var footerArray = size.length
                
                for (var i = 0; i < size.length; ++i) {
                    element.all(by.css('.footer_col3 a')).get([i]).click();
                }
            });

            browser.sleep(2000);
                
    });

});