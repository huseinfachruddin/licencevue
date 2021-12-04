import axios from 'axios'
export default{
    state:{
        product:{
          data:{},
          error:[],
          form:{}
        },
        loading:false
    },
    mutations:{
        setForm(state,data){
            state.product.form=data
        },
        setData(state,data){
            state.product.data=data        
        },
        setErrors(state,data){
            state.product.error=data        
        },
        setLoading(state,set){
            state.loading=set
        },
    },
    actions:{
        async product({commit},data){
            commit('setLoading',true)
            try{
                let response = await axios.get('/api/product?page='+data)
                if (response.status == 200) {
                    commit('setData',response.data.product)
                    commit('setLoading',false)
                }
            }catch(errors){
                commit('setErrors',errors.response.data.errors)
                commit('setLoading',false)
            }
        },
        async createProduct({commit},data){
            commit('setLoading',true)
            try{
                let response = await axios.post('/api/product',data)
                if (response.status == 200) {
                    commit('setLoading',false)
                    alert('Data berhasil disimpan')
                    commit('setErrors',{})
                }
            }catch(errors){
                commit('setErrors',errors.response.data.errors)
                commit('setLoading',false)
            }
        }, 
        async editProduct({commit},data){
            commit('setLoading',true)
            try{
                let response = await axios.put('/api/product/'+data.id,data)
                if (response.status == 200) {
                    commit('setErrors',{})
                    commit('setLoading',false)
                    alert('Data berhasil diubah')

                }
            }catch(errors){
                commit('setErrors',errors.response.data.errors)
                commit('setLoading',false)
            }
        }, 
        async deleteProduct({commit},data){
            commit('setLoading',true)
            try{
                let response = await axios.delete('/api/product/'+data.id)
                if (response.status == 200) {
                    commit('setErrors',{})
                    commit('setLoading',false)
                    alert('Data berhasil dihapus')

                }
            }catch(errors){
                commit('setErrors',errors.response.data.errors)
                commit('setLoading',false)
            }
        }, 
      
    }
}