import axios from 'axios'
export default{
    state:{
        role:{
          role:[],
          error:[],
          form:{}
        },
        loading:false
    },
    mutations:{
        setForm(state,data){
            state.role.form=data
        },
        setData(state,data){
            state.role.role=data        
        },
        setErrors(state,data){
            state.role.error=data        
        },
        setLoading(state,set){
            state.loading=set
        },
    },
    actions:{
        async role({commit}){
            commit('setLoading',true)
            try{
                let response = await axios.get('/api/role',{headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
                if (response.status == 200) {
                    commit('setData',response.data.role)
                    commit('setLoading',false)
                }
            }catch(errors){
                commit('setErrors',errors.response.data.errors)
                commit('setLoading',false)
            }
        },
        async createRole({commit},data){
            commit('setLoading',true)
            try{
                let response = await axios.post('/api/role',data,{headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
                if (response.status == 200) {
                    commit('setData',response.data.role)
                    commit('setLoading',false)
                    commit('setForm',{})
                    commit('setErrors',{})
                    alert('Role berhasil disimpan')
                }
            }catch(errors){
                commit('setLoading',errors.response.data.errors)
                commit('setErrors',errors.response.data.errors)
            }
        }, 
        async editRole({commit},data){
            commit('setLoading',true)
            try{
                let response = await axios.put('/api/role/'+data.id,data,{headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
                if (response.status == 200) {
                    commit('setData',response.data.role)
                    commit('setLoading',false)
                    commit('setForm',{})
                    commit('setErrors',{})
                    alert('Role berhasil disimpan')
                }
            }catch(errors){
                commit('setLoading',errors.response.data.errors)
                commit('setErrors',errors.response.data.errors)
            }
        }, 
        async deleteRole({commit},data){
            commit('setLoading',true)
            try{
                let response = await axios.delete('/api/role/'+data,{headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
                if (response.status == 200) {
                    commit('setData',response.data.role)
                    commit('setLoading',false)
                    commit('setForm',{})
                    commit('setErrors',{})
                    alert('Role berhasil dihapus')
                }
            }catch(errors){
                commit('setLoading',errors.response.data.errors)
                commit('setErrors',errors.response.data.errors)
            }
        },
      
    }
}