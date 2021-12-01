import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import user from './user'
import role from './role'
import product from './product'
import licence from './licence'



Vue.use(Vuex)

export default new Vuex.Store({
    state:{

    },
    mutations:{

    },
    actions:{

    },
    modules:{
        auth,
        user,
        role,
        product,
        licence,
    }
})