import axios from 'axios'
export default{
    state:{
        licence:{
          data:{},
          error:[],
          form:{}
        },
        loading:false
    },
    mutations:{
        setForm(state,data){
            state.licence.form=data
        },
        setData(state,data){
            state.licence.data=data        
        },
        setErrors(state,data){
            state.licence.error=data        
        },
        setLoading(state,set){
            state.loading=set
        },
    },
    actions:{
        async licence({commit},data){
            commit('setLoading',true)
            try{
                let response = await axios.get('/api/licence?page='+data,data)
                if (response.status == 200) {
                    commit('setData',response.data.licence)
                    commit('setLoading',false)
                }
            }catch(errors){
                commit('setErrors',errors.response.data.errors)
                commit('setLoading',false)
            }
        },
        async createLicence({commit},data){
            commit('setLoading',true)
            try{
                let response = await axios.post('/api/licence',data)
                if (response.status == 200) {
                    commit('setData',response.data.licence)
                    commit('setLoading',false)
                    commit('setErrors',{})
                    alert('Berhasil menyimpan lisensi')

                }
            }catch(errors){
                commit('setErrors',errors.response.data.errors)
                commit('setLoading',false)
            }
        },
        async editLicence({commit},data){
            commit('setLoading',true)
            try{
                let response = await axios.put('/api/licence/'+data.id,data)
                if (response.status == 200) {
                    commit('setData',response.data.licence)
                    commit('setLoading',false)
                    commit('setErrors',{})
                    alert('Berhasil menyimpan lisensi')
                }
            }catch(errors){
                commit('setErrors',errors.response.data.errors)
                commit('setLoading',false)
            }
        },
        async deleteLicence({commit},data){
            commit('setLoading',true)
            try{
                let response = await axios.delete('/api/licence/'+data.id)
                if (response.status == 200) {
                    commit('setErrors',{})
                    commit('setData',response.data.licence)
                    commit('setLoading',false)
                }
            }catch(errors){
                commit('setErrors',errors.response.data.errors)
                commit('setLoading',false)
            }
        },
    }
}