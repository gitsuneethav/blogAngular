describe(
		"Blog Application Test",
		function() {
			it(
					"should test the main blog page",
					function() {
						browser.get("http://localhost:1337/");
						expect(browser.getTitle()).toEqual("Blog");
						// gets the blog list
						var blogList = element.all(by
								.repeater('blogPost in blogList'));
						// tests the size of the blogList
						expect(blogList.count()).toEqual(1);
						browser
								.get("http://localhost:1337/#!/blogPost/5394e59c4f50850000e6b7ea");
						expect(browser.getTitle()).toEqual("Blog");
						// gets the comment list
						var commentList = element.all(by
								.repeater('comment in blogEntry.comments'));
						// checks the size of the commentList
						expect(commentList.count()).toEqual(2);
					});
		});