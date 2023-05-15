

import {NightwatchTests} from 'nightwatch';

export default function testCase(url:string){

const home: NightwatchTests = {
  // 'Magicbox Title test': () => {
  //   browser
  //     .url(url)
  //     .assert.titleContains('Create Next App');
  // },



  'Magicbox validate parameters ': () => {
    browser
    .windowRect({width: 1920, height: 3000})
    .navigateTo(url)
    .waitForElementPresent("#ViewPowerShellCodeInstance")
    .assert.textContains(
        '#ViewPowerShellCodeInstanceResult',
        'Success'
      )
      .end();
  }
};
return home
}

