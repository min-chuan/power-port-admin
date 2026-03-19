import App from '@/App.vue';
import permission from '@/directives/permission';
import '@/mock';
import router from '@/router';
import '@/router/guard';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import './style.less';
const pinia = createPinia();
const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.directive('permission', permission);
app.use(pinia);
app.use(ElementPlus);
app.use(router);
app.mount('#app');
