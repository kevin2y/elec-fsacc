import Vue from 'vue'
import Vuex from 'Vuex'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

//import iView from "iview"
//import 'iview/dist/styles/iview.css'

import Corps from "./SysDb";

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.use(ElementUI);
//Vue.use(iView);
//Vue.use(Vuex);

Vue.directive('enterToNext',{
  inserted:function(el,bind,vnode){
    let inputs = el.querySelectorAll('input');
    let lastFunc = bind.value;
    //取当前的VUE，//mainVue.$refs[lastFocus].$el.focus();        
    let mainVue = vnode.context; 
    //绑定回写事件
    for( var i = 0 ;i < inputs.length ; i++ ){
      //设置当前控件的序号
      inputs[i].setAttribute("keyFocusIndex",i);
      inputs[i].addEventListener('keydown', (ev) => { 
        //检查多个表单是否混合在inputs中
        //console.log("inputs.lenght = " + inputs.length);              
        if (ev.keyCode === 13) {          
            var attrIndex = ev.srcElement.getAttribute('keyFocusIndex');          
            var ctlI = parseInt(attrIndex);
            if(ctlI<inputs.length-1){
              inputs[ctlI+1].focus();//非最后一个input，跳下控件  
            }else{              
              if(lastFunc)//最后一个input，如果指定最的方法，执行该方法
                lastFunc();                   
            } 
          }
      });
      inputs[i].addEventListener('focus', (ev) => { 
        //选中所有文本
        ev.srcElement.setSelectionRange(0,ev.srcElement.value.length)
      });
    }
    
  },
});

router.beforeEach((to,from,next)=>{
  window.document.title = to.meta.title + " - fsaccount";
  next();
});

//注册过滤器
Vue.filter("rounding",function(value,showZero) {
  if(!value){
    if(showZero)
      return "￥0.00";
    else
      return "";
  }     

  let amt = value.toFixed(2);
  let regExpInfo = /(\d{1,3})(?=(\d{3})+(?:$|\.))/g;
  return "￥" + amt.toString().replace(regExpInfo, "$1,");  
});

new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
