export const downloadImage = (imgsrc, name) => { //  xià zài tú piàn dì zhǐ hé tú piàn míng
  var image = new Image()
  image.setAttribute('crossOrigin', 'anonymous')
  image.onload = function() {
    var canvas = document.createElement('canvas')
    canvas.width = image.width
    canvas.height = image.height
    var context = canvas.getContext('2d')
    context.drawImage(image, 0, 0, image.width, image.height)
    var url = canvas.toDataURL('image/png') //  dé dào tú piàn debase64 biān mǎ shù jù

    var a = document.createElement('a') //  shēng chéng yī gèa yuán sù
    var event = new MouseEvent('click') //  chuàng jiàn yī gè dān jī shì jiàn
    a.download = name || 'photo' //  shè zhì tú piàn míng chēng
    a.href = url //  jiāng shēng chéng deURL shè zhì wèia.href shǔ xìng
    a.dispatchEvent(event) //  chù fāa de dān jī shì jiàn
  }
  image.src = imgsrc
}
