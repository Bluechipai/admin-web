# ido-admin web 

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


Overall code structure
``` lua
web
 ├── babel.config.js
 ├── Dockerfile
 ├── favicon.ico
 ├── index.html                 -- Main page
 ├── limit.js                   -- Assistant code
 ├── package.json               -- Package Manager Code
 ├── src                        -- source code
 │   ├── api                    -- api group
 │   ├── App.vue                -- Main page
 │   ├── assets                 -- Static resources
 │   ├── components             -- Global components
 │   ├── core                   -- gva Component package
 │   │   ├── config.js          -- config file
 │   │   ├── gin-vue-admin.js   -- Registration Welcome File
 │   │   └── global.js          -- Unified import of files
 │   ├── directive              -- v-auth Registration file
 │   ├── main.js                -- Main file
 │   ├── permission.js          -- Routing middleware
 │   ├── pinia                  -- piniaState Manager, replacing  vuex
 │   │   ├── index.js           -- Entry file
 │   │   └── modules            -- modules
 │   │       ├── dictionary.js
 │   │       ├── router.js
 │   │       └── user.js
 │   ├── router                 -- Routing declaration file
 │   │   └── index.js
 │   ├── style                  -- Global Style
 │   │   ├── base.scss
 │   │   ├── basics.scss
 │   │   ├── element_visiable.scss  -- You can globally override the element plus style here
 │   │   ├── iconfont.css           -- Style files for the top few icons
 │   │   ├── main.scss
 │   │   ├── mobile.scss
 │   │   └── newLogin.scss
 │   ├── utils                  -- Method Package Library
 │   │   ├── asyncRouter.js     -- Dynamic routing related
 │   │   ├── bus.js             -- Global mitt declaration file
 │   │   ├── date.js            -- date
 │   │   ├── dictionary.js      -- dictionary 
 │   │   ├── downloadImg.js     -- downloadImg method
 │   │   ├── format.js          -- format method
 │   │   ├── image.js           -- image method
 │   │   ├── page.js            -- Set Page Title
 │   │   ├── request.js         -- request
 │   │   └── stringFun.js       -- String file
 |   ├── view -- Main view code
 |   |   ├── about -- About Us
 |   |   ├── dashboard -- panel
 |   |   ├── error
 |   |   ├── example
 |   |   ├── iconList
 |   |   ├── init -- Initialize data 
 |   |   |   ├── index -- New version
 |   |   |   ├── init -- Old version
 |   |   ├── layout  --  layout
 |   |   |   ├── aside 
 |   |   |   ├── bottomInfo     -- bottomInfo
 |   |   |   ├── screenfull     -- Full screen settings
 |   |   |   ├── setting        -- System settings
 |   |   |   └── index.vue      -- base constraint
 |   |   ├── login              --login 
 |   |   ├── person             --Personal Center 
 |   |   ├── superAdmin         -- Super administrator operation
 |   |   ├── system             -- System detection page
 |   |   ├── systemTools        -- System configuration related pages
 |   |   └── routerHolder.vue   -- page Entrance page 
 ├── vite.config.js             -- vite configuration file
 └── yarn.lock

```
