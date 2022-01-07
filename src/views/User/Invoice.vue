<template>
<div>
  <v-container>
    <v-row>
      <v-col v-if="active">
          <Transfer v-if="data.method=='transfer'"/>
          <Xendit v-else/>
      </v-col>
    </v-row>
  </v-container>
</div>
</template>

<script>
import Xendit from '../../components/User/Xendit'
import Transfer from '../../components/User/Transfer'

import axios from 'axios'

export default{
  components:{
    Xendit,
    Transfer
  },
  data(){
    return{
      data:{},
      active:false
    }
  },
  methods:{
    async getOrder(){
            try{
                let response = await axios.get('/api/order/'+this.$route.params.id,{headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
                if (response.status == 200) {
                  this.data=response.data.order
                  this.active=true
                }
            }catch(errors){
                console.log(errors)            
            }
      },
  },
  mounted(){
    this.getOrder()
  }
}
</script>


