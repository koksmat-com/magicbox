
/* eslint-disable turbo/no-undeclared-env-vars */

import {NightwatchTests} from 'nightwatch';

const url = process.env.ENDPOINT + "tests/components/storage"
const home : NightwatchTests = {
    // 'Magicbox Title test': () => {
    //   browser
    //     .url(url)
    //     .assert.titleContains('Create Next App');
    // },
  
  
  
    'Database validate connection ': () => {
      browser
      .windowRect({width: 1920, height: 3000})
      .navigateTo(url)
      .waitForElementPresent("#TestTitle")
      .assert.textContains(
          '#TestTitle',
          'Databases'
        )
        .end();
    }
  };

export default home;
