# IDO's management platform for web 

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```


 zhěng lǐ dài mǎ jié gòu
``` lua
web
 ├── babel.config.js
 ├── Dockerfile
 ├── favicon.ico
 ├── index.html                 --  zhǔ yè miàn
 ├── limit.js                   --  zhù shǒu dài mǎ
 ├── package.json               --  bāo guǎn lǐ qì dài mǎ
 ├── src                        --  yuán dài mǎ
 │   ├── api                    -- api  zǔ
 │   ├── App.vue                --  zhǔ yè miàn
 │   ├── assets                 --  jìng tài zī yuán
 │   ├── components             --  quán jú zǔ jiàn
 │   ├── core                   -- gva  zǔ jiàn bāo
 │   │   ├── config.js          -- gva wǎng zhàn pèi zhì wén jiàn
 │   │   ├── gin-vue-admin.js   --  zhù cè huān yíng wén jiàn
 │   │   └── global.js          --  tǒng yī dǎo rù wén jiàn
 │   ├── directive              -- v-auth  zhù cè wén jiàn
 │   ├── main.js                --  zhǔ wén jiàn
 │   ├── permission.js          --  lù yóu zhōng jiān jiàn
 │   ├── pinia                  -- pinia  zhuàng tài guǎn lǐ qì， qǔ dàivuex
 │   │   ├── index.js           --  rù kǒu wén jiàn
 │   │   └── modules            -- modules
 │   │       ├── dictionary.js
 │   │       ├── router.js
 │   │       └── user.js
 │   ├── router                 --  lù yóu shēng míng wén jiàn
 │   │   └── index.js
 │   ├── style                  --  quán jú yàng shì
 │   │   ├── base.scss
 │   │   ├── basics.scss
 │   │   ├── element_visiable.scss  --  cǐ chù kě yǐ quán jú fù gài element-plus  yàng shì
 │   │   ├── iconfont.css           --  dǐng bù jǐ gèicon de yàng shì wén jiàn
 │   │   ├── main.scss
 │   │   ├── mobile.scss
 │   │   └── newLogin.scss
 │   ├── utils                  --  fāng fǎ bāo kù
 │   │   ├── asyncRouter.js     --  dòng tài lù yóu xiāng guān
 │   │   ├── btnAuth.js         --  dòng tài quán xiàn àn niǔ xiāng guān
 │   │   ├── bus.js             --  quán júmitt shēng míng wén jiàn
 │   │   ├── date.js            --  rì qī xiāng guān
 │   │   ├── dictionary.js      --  huò qǔ zì diǎn fāng fǎ 
 │   │   ├── downloadImg.js     --  xià zài tú piàn fāng fǎ
 │   │   ├── format.js          --  gé shì zhěng lǐ xiāng guān
 │   │   ├── image.js           --  tú piàn xiāng guān fāng fǎ
 │   │   ├── page.js            --  shè zhì yè miàn biāo tí
 │   │   ├── request.js         --  qǐng qiú
 │   │   └── stringFun.js       --  zì fú chuàn wén jiàn
 |   ├── view --  zhǔ yàoview dài mǎ
 |   |   ├── about --  guān yú wǒ men
 |   |   ├── dashboard --  miàn bǎn
 |   |   ├── error --  cuò wù
 |   |   ├── example -- shàng chuán àn lì
 |   |   ├── iconList -- icon liè biǎo
 |   |   ├── init --  chū shǐ huà shù jù  
 |   |   |   ├── index --  xīn bǎn běn
 |   |   |   ├── init --  jiù bǎn běn
 |   |   ├── layout  --  layout yuē shù yè miàn 
 |   |   |   ├── aside 
 |   |   |   ├── bottomInfo     -- bottomInfo
 |   |   |   ├── screenfull     --  quán píng shè zhì
 |   |   |   ├── setting        --  xì tǒng shè zhì
 |   |   |   └── index.vue      -- base  yuē shù
 |   |   ├── login              -- dēng lù 
 |   |   ├── person             -- gè rén zhōng xīn 
 |   |   ├── superAdmin         --  chāo jí guǎn lǐ yuán cāo zuò
 |   |   ├── system             --  xì tǒng jiǎn cè yè miàn
 |   |   ├── systemTools        --  xì tǒng pèi zhì xiāng guān yè miàn
 |   |   └── routerHolder.vue   -- page  rù kǒu yè miàn 
 ├── vite.config.js             -- vite  pèi zhì wén jiàn
 └── yarn.lock

```
