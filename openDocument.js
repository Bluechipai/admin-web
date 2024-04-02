/*
                     shāng yòng dài mǎ gōng sī zì yòng chǎn pǐn wú xū shòu quán
     ruò zuò wèi dài mǎ chū shòu de chǎn pǐn（ rèn hé shè jí dài mǎ jiāo fù dì sān fāng zuò wèi hòu xù kāi fā） bì xū bǎo liú cǐ jiǎo běn
                          huò biāo zhù yuán zuò zhě xìn xī
                           fǒu zé jiāng yī fǎ wéi quán
*/

var child_process = require('child_process')

var url = 'https://www.gin-vue-admin.com'
var cmd = ''
console.log(process.platform)
switch (process.platform) {
  case 'win32':
    cmd = 'start'
    child_process.exec(cmd + ' ' + url)
    break

  case 'darwin':
    cmd = 'open'
    child_process.exec(cmd + ' ' + url)
    break
}
