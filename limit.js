//  yùn xíng xiàng mù qián tōng guònode zhí xíng cǐ jiǎo běn （ cǐ jiǎo běn yǔ node_modules  mù lù tóng jí）
const fs = require('fs')
const path = require('path')
const wfPath = path.resolve(__dirname, './node_modules/.bin')

fs.readdir(wfPath, (err, files) => {
  if (err) {
    console.log(err)
  } else {
    if (files.length !== 0) {
      files.forEach((item) => {
        if (item.split('.')[1] === 'cmd') {
          replaceStr(`${wfPath}/${item}`, /"%_prog%"/, '%_prog%')
        }
      })
    }
  }
})

//  cān shù：[ wén jiàn lù jìng、  xū yào xiū gǎi de zì fú chuàn、 xiū gǎi hòu de zì fú chuàn] ( tì huàn duì yīng wén jiàn nèi zì fú chuàn de gōng gòng hán shù)
function replaceStr(filePath, sourceRegx, targetSrt) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.log(err)
    } else {
      let str = data.toString()
      str = str.replace(sourceRegx, targetSrt)
      fs.writeFile(filePath, str, (err) => {
        if (err) {
          console.log(err)
        } else {
          console.log('\x1B[42m%s\x1B[0m', ' wén jiàn xiū gǎi chéng gōng')
        }
      })
    }
  })
}
