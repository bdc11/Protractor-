var gliffy_setup = function() {

    this.goToGliffyHomePage = function(choice) {
        browser.driver.get("https://www.gliffy.com/");
    };

	this.scrollTo = function(choice) {
        browser.executeScript("arguments[0].scrollIntoView();", choice.getWebElement());
    };

    this.newUserSignUp = function() {
    	var randomNumbers = Math.random().toString(36).substring(7).toString();
        var userEmail = "bc" + randomNumbers + "@mailinator.com"
        var userPassword = "Password1"
        
        element(by.css('#email')).sendKeys(""+userEmail+"");
        element(by.css('#Password')).sendKeys(""+userPassword+"");
        element(by.css('#org-size')).click();
        element(by.css('option[value="1"]')).click();
        element(by.css('.start-trial-button')).click();
        browser.sleep(5000);
    };

    this.existingUserSignIn = function() {
        var existingUser = "bc123tester@mailinator.com"
        var userPassword = "Password1"

        element(by.cssContainingText('a', 'Log In')).getAttribute("href").then(function(path) {
            //console.log(path);  //prints out href for debug
            element(by.cssContainingText('a', 'Log In')).click();
            expect(browser.driver.getCurrentUrl()).toEqual(path);
            element(by.css('.login-email')).sendKeys(""+existingUser+"");
            element(by.css('.login-password')).sendKeys(""+userPassword+"");
            element(by.css('.submit-button')).click();
            browser.sleep(5000);
        });
    };

    this.checkPath = function(path) {
        expect(browser.driver.getCurrentUrl()).toEqual(path);
    };

    this.checkNewTabPath = function(tab) {
        browser.getAllWindowHandles().then(function (handles) {
            newWindowHandle = handles[1]; // this is your new window
            browser.switchTo().window(newWindowHandle).then(function () {
                expect(browser.driver.getCurrentUrl()).toEqual(tab);
            });
        });
        // browser.restart()
    };
};
module.exports = new gliffy_setup();