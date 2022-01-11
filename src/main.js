import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from "./plugins/vuetify";
import axios from 'axios'
import wysiwyg from "vue-wysiwyg";
import "vue-wysiwyg/dist/vueWysiwyg.css";

Vue.config.productionTip = false;
Vue.use(wysiwyg, {});
new Vue({
  router,
  vuetify,
  store,
  render: h => h(App),
}).$mount('#app')

async function inject() {
try{
  let response = await axios.get('/api/html/header')
  let footer = await axios.get('/api/html/footer')
  if (response.status == 200) {
      const h = response.data.html.html
      const f = footer.data.html.html
      let head =document.getElementsByTagName('head')
      let body =document.getElementsByTagName('body')
      head[0].insertAdjacentHTML( 'beforeend', h )
      body[0].insertAdjacentHTML( 'beforeend', f )
    }
  }catch(errors){
    console.log(errors);
  }
}
inject()

