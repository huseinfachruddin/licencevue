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
import Package from '../views/Admin/Package.vue'
import Order from '../views/Admin/Order.vue'
import Account from '../views/Admin/Account.vue'
import Confirm from '../views/Admin/Confirm.vue'
import Channel from '../views/Admin/Channel.vue'
import detailOrder from '../views/Admin/Order-detail.vue'

import userLicence from '../views/User/Licence.vue'
import userProduct from '../views/User/Product.vue'
import userPackage from '../views/User/Package.vue'
import userOrder from '../views/User/Order.vue'
import userDetailOrder from '../views/User/Order-detail.vue'
import userCart from '../views/User/Cart.vue'
import userInvoice from '../views/User/Invoice.vue'
import userConfirm from '../views/User/Confirm.vue'


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
    path: '/account',
    name: 'account',
    component: Account,
    meta:{
      auth:true,
      permision:'admin',
      title:'Data Account'
  }
  },
  {
    path: '/confirm',
    name: 'confirm',
    component: Confirm,
    meta:{
      auth:true,
      permision:'admin',
      title:'Data Confirm'
  }
  },
  {
    path: '/channel',
    name: 'channel',
    component: Channel,
    meta:{
      auth:true,
      permision:'admin',
      title:'Data channel'
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
    path: '/product/:id',
    name: 'product detail',
    component: Package,
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
  {
    path: '/order',
    name: 'order',
    component: Order,
    meta:{
      auth:true,
      permision:'admin',
      title:'Data order'
    },
  },
  {
    path: '/order/:id',
    name: 'order admin',
    component: detailOrder,
    meta:{
      auth:true,
      permision:'admin',
      title:'Data order'
    },
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
    path: '/user/licence',
    name: 'user-licence',
    component:userLicence,
    meta:{
      title:'lisensi Anda'
    }
  },
  {
    path: '/user/product',
    name: 'user-product',
    component:userProduct,
    meta:{
      title:'Produk kami'
    }
  },
  {
    path: '/user/product/:id',
    name: 'detail-product',
    component:userPackage,
    meta:{
      title:'detail product'
    }
  },
  {
    path: '/user/order',
    name: 'user-order',
    component:userOrder,
    meta:{
      auth:true,
      permision:'free',
      title:'Pesanan Anda'
    }
  },
  {
    path: '/user/order/:id',
    name: 'detail-order',
    component:userDetailOrder,
    meta:{
      auth:true,
      permision:'free',
      title:'Pesanan Anda'
    }
  },
  {
    path: '/user/invoice/:id',
    name: 'detail-invoice',
    component:userInvoice,
    meta:{
      auth:true,
      permision:'free',
      title:'Konfirmasi Anda'
    }
  },
  {
    path: '/user/konfirmasi/:id',
    name: 'konfirmasi-user',
    component:userConfirm,
    meta:{
      auth:true,
      permision:'free',
      title:'Pesanan Anda'
    }
  },
  {
    path: '/user/cart',
    name: 'user-cart',
    component:userCart,
    meta:{
      auth:true,
      permision:'free',
      title:'Pesanan Anda'
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
      if (to.meta.permision=='free') {
        return next()
      }
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
