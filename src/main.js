//引入初始化样式文件
import "@/styles/common.scss";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

//import 懒加载指令插件并注册
import { lazyPlugin } from "./directives";
//import 全局组件插件
import { componentPlugin } from "@/components";

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(lazyPlugin); //注册
app.mount("#app");
app.use(componentPlugin);
//定义全局指令
