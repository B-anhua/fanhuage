import { createApp } from 'vue'
import App from './App.vue'

import ElementPlus from 'element-plus'

// import locale  from 'element-plus/lib/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import router from './router'
// const App = {};
const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.use(ElementPlus);
// app.use(ElementPlus,{locale})
app.use(router) 
app.mount("#app");



// Vue.protoytype.x=
//  createApp(App).use(ElementPlus).use(router).mount('#app')
// const vm=createApp(App)
