export default class ImageCompress {
  constructor(file, fileSize, maxWH = 1920) {
    this.file = file
    this.fileSize = fileSize
    this.maxWH = maxWH //  zuì dà zhǎng kuān
  }

  compress() {
    //  yā suō
    const fileType = this.file.type
    const fileSize = this.file.size / 1024
    return new Promise(resolve => {
      const reader = new FileReader()
      reader.readAsDataURL(this.file)
      reader.onload = () => {
        const canvas = document.createElement('canvas')
        const img = document.createElement('img')
        img.src = reader.result
        img.onload = () => {
          const ctx = canvas.getContext('2d')
          const _dWH = this.dWH(img.width, img.height, this.maxWH)
          canvas.width = _dWH.width
          canvas.height = _dWH.height

          //  qīng kōng hòu,  zhòng xiě huà bù
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

          const newImgData = canvas.toDataURL(fileType, 0.90)

          //  yā suō kuān gāo hòu de tú xiàng dà xiǎo
          const newImgSize = this.fileSizeKB(newImgData)

          if (newImgSize > this.fileSize) {
            console.log(' tú piàn chǐ cùn tài dà!' + fileSize + ' >> ' + newImgSize)
          }

          const blob = this.dataURLtoBlob(newImgData, fileType)
          const nfile = new File([blob], this.file.name)
          resolve(nfile)
        }
      }
    })
  }

  /**
   *  zhǎng kuān děng bǐ suō xiǎo
   *  tú xiàng de yī biān( zhǎng huò kuān) wèi zuì dà mù biāo zhí
   */
  dWH(srcW, srcH, dMax) {
    const defaults = {
      width: srcW,
      height: srcH
    }
    if (Math.max(srcW, srcH) > dMax) {
      if (srcW > srcH) {
        defaults.width = dMax
        defaults.height = Math.round(srcH * (dMax / srcW))
        return defaults
      } else {
        defaults.height = dMax
        defaults.width = Math.round(srcW * (dMax / srcH))
        return defaults
      }
    } else {
      return defaults
    }
  }

  fileSizeKB(dataURL) {
    let sizeKB = 0
    sizeKB = Math.round((dataURL.split(',')[1].length * 3 / 4) / 1024)
    return sizeKB
  }

  /**
   *  zhuǎn wèiBlob
   */
  dataURLtoBlob(dataURL, fileType) {
    const byteString = atob(dataURL.split(',')[1])
    let mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0]
    const ab = new ArrayBuffer(byteString.length)
    const ia = new Uint8Array(ab)
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i)
    }
    if (fileType) {
      mimeString = fileType
    }
    return new Blob([ab], { type: mimeString, lastModifiedDate: new Date() })
  }
}

const path = import.meta.env.VITE_BASE_API + '/'
export const getUrl = (url) => url && url.slice(0, 4) !== 'http' ? path + url : url
