import 'lib-flexible';
import Vue from 'vue';
import constant from '@/modules/constant';
import * as filters from '@/modules/filters';
import services from '@/modules/services';

window.CT = constant;

// register global utility filters.
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

Vue.config.productionTip = process.env.NODE_ENV === 'production';

// 将services挂载到vue的原型上
// views引用的方法：this.$services.接口名（小驼峰）
Object.defineProperty(Vue.prototype, '$services', {value: services});
