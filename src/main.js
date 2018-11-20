import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Toast } from 'vant';
import axios from 'axios'
Vue.prototype.$http = axios

Vue.config.productionTip = false

Vue.prototype.$Get = function(url, config, success, fail=function(err){console.log(err);Toast.fail(err)}){
  this.$http.get(url,config).then(function(res){
      if(res.data.msgCode == "40000"){
          success(res)
      }else{
          if(res.data.msg){
              Toast.fail(res.data.msg)
          }else{
              console.error(res)
          }
          fail(res.data.msg)
      }
  }).catch(function(err){
      fail(err)
      console.error(err)
  })
}

Vue.prototype.$Post = function(url, config, success, fail){
  this.$http.post(url,config).then(function(res){
      if(res.data.msgCode == "40000"){
          if(res.data.msg){
            Toast.success(res.data.msg)
          }
          success(res)
      }else{
          fail(res)
          console.warn(res)
      }
  }).catch(function(err){
      fail(err)
    //   Toast.fail(err)
      console.error(err)
  })
}


router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }else{
    document.title = "e账柜"
  }
  next()
})

router.beforeEach((to, from, next) => {
    let query
    if(to.name == "taxAccount"){
        query = "6a65d06ab5a698f143e31c1db0ddec13"
    }else if(to.name == "nameTestTool"){
        query = "cd8fe9f7caf9fff5c7036bdf7638f458"
    }else if(to.name == "nameCheckTool"){
        query = "b5f4d5510d1376d002fa68fa1a6a0051"
    }
        setTimeout(()=>{
            let _hmt = _hmt || [];
            (function() {
                //每次执行前，先移除上次插入的代码
                document.getElementById('baidu_tj') && document.getElementById('baidu_tj').remove();
                let hm = document.createElement("script");
                hm.src = "https://hm.baidu.com/hm.js?" + query;
                hm.id = "baidu_tj"
                let s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(hm, s);
            })();
        },0);
    next();
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

