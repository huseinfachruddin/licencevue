<template>
<div>
  <v-container>
    <v-row>
      <v-col>
          <Order v-if="data.status==null"/>
          <Orderpayment v-if="data.status!=null"/>
      </v-col>
    </v-row>
  </v-container>
</div>
</template>

<script>
import Order from '../../components/User/Order-detail'
import Orderpayment from '../../components/User/Order-payment'

import axios from 'axios'

export default{
  components:{
    Order,
    Orderpayment
  },
  data(){
    return{
      data:{}
    }
  },
  methods:{
    async getOrder(){
            try{
                let response = await axios.get('/api/order/'+this.$route.params.id,{headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
                if (response.status == 200) {
                  this.data=response.data.order
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


