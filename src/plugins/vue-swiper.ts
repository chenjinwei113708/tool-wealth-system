import Vue from "vue";
import 'swiper/css/swiper.css';

if (process.client) {
  // const isIE = !!(window as any).ActiveXObject || 'ActiveXObject' in window;
  // if (!isIE) {
    const VueAwesomeSwiper = require("vue-awesome-swiper");
    Vue.use(VueAwesomeSwiper);
  // }
}