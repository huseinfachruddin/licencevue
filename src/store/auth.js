import axios from 'axios'
import router from '../router'
export default{
    state:{
        profile:{
          data:{},
          error:[],
          form:{}
        },
        loading:false
    },
    getters: {
        getForm: (state) => (id) => {
            return state.todos.find(todo => todo.id === id)
          }
    },
    mutations:{
        setForm(state,data){
            state.profile.form=data
        },
        setData(state,data){
            state.profile.data=data        
        },
        setErrors(state,data){
            state.profile.error=data        
        },
        setLoading(state,set){
            state.loading=set
        },
    },
    actions:{
        async login({commit},data) {
            commit('setLoading',true)
            try {
              let response = await axios.post("/api/login",data);
              if (response.status == 200) {
                commit('setData',response.data.user)
                localStorage.setItem("token", response.data.token)
                commit('setLoading',false)
                let role = response.data.user.roles
                if (role.length > 0) {
                  role.filter(role => {
                      if (role.name == 'admin') {
                          return router.push('/admin');
                      }else{
                          return router.push('/');
                      }
                  })
                }else{
                  return router.push('/')
                }
                
              }
            } catch (errors) {
                commit('setErrors',errors.response.data.errors)
                commit('setLoading',false)
            }
        },
        async forgot({commit},data) {
            commit('setLoading',true)
            try {
              let response = await axios.post("/api/forgot",data);
              if (response.status == 200) {
                confirm('Password baru telah dikirimkan ke nomor whatsapp '+response.data.user.phone+', silahkan cek dan login kembali.');
                commit('setLoading',false)
                return router.push('/login');
                }
            } catch (errors) {
                commit('setErrors',errors.response.data.errors)
                commit('setLoading',false)
            }
        },
        async register({commit},data){
            commit('setLoading',true)
            try {
              let response = await axios.post('/api/register',data);
              if (response.status==200){
                alert('Registrasi Berhasil')
                commit('setForm',{})
                commit('setErrors',{})
                commit('setLoading',false)
                return router.push('/login');
              }
            } catch (errors) {
              commit('setErrors',errors.response.data.errors)
              commit('setLoading',false)
            }
      
          },
        async logout({commit}){
          commit('setLoading',true)
          try{
            let response = await axios.get('/api/logout',{headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}});
            if (response.status == 200) {
                localStorage.removeItem("token")
                commit('setData',{})
                commit('setLoading',false)
                return router.push({ name: 'login' })                
            }
          }catch (errors) {
            commit('setErrors',errors.response.data.errors)
            commit('setLoading',false)
        }
        },
        async profile({commit}){
            commit('setLoading',true)
            try{
                let response = await axios.get('/api/profile',{headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
                if (response.status == 200) {
                    commit('setData',response.data.profile)
                    commit('setLoading',false)
                }
            }catch(errors){
                commit('setLoading',false)
                return router.push('/login');
            }
        },
        async editProfile({commit},data){
            commit('setLoading',true)
            try{
                let response = await axios.put('/api/profile',data,{headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
                if (response.status == 200) {
                    commit('setData',response.data.profile)
                    commit('setLoading',false)
                    commit('setErrors',{})
                    alert('Data berhasil disimpan')
                }
            }catch(errors){
              console.log(errors.response.data)
                commit('setErrors',errors.response.data.errors)
                commit('setLoading',false)
            }
        }, 
        async editPassword({commit},data){
            commit('setLoading',true)
            try{
                let response = await axios.put('/api/profile/password',data,{headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
                if (response.status == 200) {
                    commit('setData',response.data.profile)
                    commit('setLoading',false)
                    commit('setForm',{})
                    commit('setErrors',{})
                    alert('Password berhasil diganti')
                }
            }catch(errors){
                commit('setErrors',errors.response.data.errors)
                commit('setLoading',false)
            }
        }, 
      
    }
}