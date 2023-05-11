
import {NightwatchTests} from 'nightwatch';
const url = "http://localhost:5301/tests/exchange/sharedmailbox:post"
const home: NightwatchTests = {
  'Magicbox Title test': () => {
    browser
      .url(url)
      .assert.titleContains('Create Next App');
  },



  'Magicbox validate parameters ': () => {
    browser
      .url(url)
  //    .debug({preview:true})
      .waitForElementVisible('[value=\'Sign in\']')
      .click('[value=\'Sign in\']')
      .assert.textContains(
        '#js-flash-container .flash.flash-error',
        'Incorrect username or password.'
      )
      .end();
  }
};

export default home;
