describe("Recording 11/05/2023 at 05:51:37", function () {
it("tests Recording 11/05/2023 at 05:51:37", function (browser) {
  browser.windowRect({width: 988, height: 1006})
  .navigateTo("http://localhost:5301/tests/exchange/sharedmailbox:post")
  .click("li:nth-of-type(3) > a")
  .click("div.bg-green-600")
  .end();
  });
});
