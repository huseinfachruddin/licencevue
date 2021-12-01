import Vue from 'vue'
import store from '../store'
import vuerouter from 'vue-router'

import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

import Profile from '../views/Profile.vue'

import Home from '../views/Home.vue'
import Admin from '../views/Admin/Admin.vue'
import User from '../views/Admin/User.vue'
import Role from '../views/Admin/Role.vue'

import Product from '../views/Admin/Product.vue'
import Licence from '../views/Admin/Licence.vue'


Vue.use(vuerouter)

const routes = [

  {
    path: '/login',
    name: 'login',
    component:Login,
    meta:{
      title:'Login'
    }
  },
  {
    path: '/register',
    name: 'register',
    component:Register,
    meta:{
      title:'Register'
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component:Profile,
    meta:{
      title:'Profile Anda'
    }
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    meta:{
      title:'Admin'
    }
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
    meta:{
      auth:true,
      permision:'admin',
      title:'Admin'
    }
  },
  {
    path: '/user',
    name: 'user',
    component: User,
    meta:{
      auth:true,
      permision:'admin',
      title:'Data User'
    }
  },
  {
    path: '/role',
    name: 'role',
    component: Role,
    meta:{
      auth:true,
      permision:'admin',
      title:'Data Role'
    }
  },
  {
      path: '/product',
      name: 'product',
      component: Product,
      meta:{
        auth:true,
        permision:'admin',
        title:'Data Product'
    }
  },
  {
    path: '/licence',
    name: 'licence',
    component: Licence,
    meta:{
      auth:true,
      permision:'admin',
      title:'Data licence'
  }
  },
    { path: '/404', component: Home },  
    { path: '*', redirect: '/404' },

];



const router = new vuerouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach( async (to,from, next) => {
  document.title=to.meta.title;
    if (to.meta.auth == true) {
      try {
        await store.dispatch('profile');
        let role = store.state.auth.profile.data.roles
        if (role.length > 0) {
          role.filter(role=>{
            if (role.name == to.meta.permision) {
              console.log('masuk')
              return next()
            }else{
              return next('/login')
            }
        })
        }else{
          console.log('pindah')
          return next('/login')
        }
        
      }catch (error) {
        return ('/')
      }
    }else{
      return next()
    }

 

  });


export default router
