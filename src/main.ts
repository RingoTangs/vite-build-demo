import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import {range} from "lodash-es";
import router from "./router";
import hello from "./hello";

hello()
console.log(range(0,10));

createApp(App).use(router).mount("#app");
