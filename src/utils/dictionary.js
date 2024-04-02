import { useDictionaryStore } from '@/pinia/modules/dictionary'
//   huò qǔ zì diǎn fāng fǎ  shǐ yòng shì lì getDict('sex').then(res)   huò zhě async hán shù xià const res = await getDict('sex')
export const getDict = async(type) => {
  const dictionaryStore = useDictionaryStore()
  await dictionaryStore.getDictionary(type)
  return dictionaryStore.dictionaryMap[type]
}

//   zì diǎn wén zì zhǎn shì fāng fǎ
export const showDictLabel = (dict, code) => {
  if (!dict) {
    return ''
  }
  const dictMap = {}
  dict.forEach(item => {
    dictMap[item.value] = item.label
  })
  return dictMap[code]
}
