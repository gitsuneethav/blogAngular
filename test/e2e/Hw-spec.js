describe(
		"Hello World Test",
		function() {
			it(
					"should test the main page",
					function() {
						browser
								.get("file:///home/pragati/git/LearningAngularJS_chapter2/");
						expect(browser.getTitle()).toEqual(
								"AngularJS Hello World");
						var msg = element(by.binding("message")).getText();
						expect(msg).toEqual("Hello World");
						browser
								.get("file:///home/pragati/git/LearningAngularJS_chapter2/#!/show");
						expect(browser.getTitle()).toEqual(
								"AngularJS Hello World");
						var msg = element(by.binding("message")).getText();
						expect(msg).toEqual("Show The World");
						browser
								.get("file:///home/pragati/git/LearningAngularJS_chapter2/#!/addCustomer");
						element(by.model("cName")).sendKeys("tester");
						element(by.model("cCity")).sendKeys("Atlanta");
						element(by.id("f1")).click();
						browser
								.get("file:///home/pragati/git/LearningAngularJS_chapter2/#!/addedCustomer/tester/Atlanta");
						var msg = element(by.binding("customerName")).getText();
						expect(msg).toEqual("Customer Name: tester");
						var msg = element(by.binding("customerCity")).getText();
						expect(msg).toEqual("Customer City: Atlanta");
					});
		});